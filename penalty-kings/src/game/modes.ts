import { Difficulty, KEEPERS } from '../ai/profiles';
import { ShotStats, TakerAttributes } from './penaltySim';
import { Player, TEAMS, Team, userPlayer } from './teams';
import { CareerState, load, save } from './storage';

export type Role = 'kick' | 'keep';

export interface KickSpec {
  role: Role;
  kickerTeam: Team;
  kicker: Player;
  keeperTeam: Team;
  keeperLevel: Difficulty | 'none';
  attrs: TakerAttributes;
  pressure: number;
  label: string;
  targets?: { x: number; y: number; r: number }[];
  cpuSeed: number;
  userTeamIsKicking: boolean;
}

export interface Scoreboard {
  left: { name: string; short: string; goals: number; marks: ('goal' | 'miss' | 'pending')[] };
  right?: { name: string; short: string; goals: number; marks: ('goal' | 'miss' | 'pending')[] };
  info: string;
  points?: number;
}

export interface Summary {
  title: string;
  lines: [string, string][];
  win: boolean;
  confetti: boolean;
}

export interface ModeController {
  id: string;
  title: string;
  next(): KickSpec | null;
  onResult(s: ShotStats, spec: KickSpec): string | null;
  scoreboard(): Scoreboard;
  summary(): Summary;
  /** The current kick must be retaken (keeper encroachment). */
  retake?: boolean;
}

export type Drill = 'free' | 'precision' | 'power' | 'curl';

const isGoal = (s: ShotStats) => s.outcome === 'goal';

// ------------------------------------------------------------------- training

export class TrainingMode implements ModeController {
  id = 'training';
  title = 'Treinamento';
  shots = 0;
  goals = 0;
  best = { speed: 0, curve: 0, precision: Infinity };
  private targets: { x: number; y: number; r: number }[] = [];
  private tIdx = 0;
  constructor(public level: Difficulty | 'none', public drill: Drill, public user: Player, public team: Team, public opp: Team) {
    if (drill === 'precision') this.targets = PRECISION_LAYOUT.medium;
  }
  next(): KickSpec {
    const spec: KickSpec = {
      role: 'kick',
      kickerTeam: this.team,
      kicker: this.user,
      keeperTeam: this.opp,
      keeperLevel: this.level,
      attrs: this.user.attrs,
      pressure: 0,
      label: `Treino · ${DRILL_LABEL[this.drill]}`,
      cpuSeed: this.shots,
      userTeamIsKicking: true,
    };
    if (this.drill === 'precision') spec.targets = [this.targets[this.tIdx % this.targets.length]];
    return spec;
  }
  onResult(s: ShotStats): string | null {
    if (s.outcome === 'retake') return 'Goleiro adiantado — cobrança repetida';
    this.shots++;
    if (isGoal(s)) this.goals++;
    this.best.speed = Math.max(this.best.speed, s.speedKmh);
    if (isGoal(s)) this.best.curve = Math.max(this.best.curve, s.curveCm);
    if (this.drill === 'precision') {
      const t = this.targets[this.tIdx % this.targets.length];
      const d = Math.hypot(s.crossing.x - t.x, s.crossing.y - t.y);
      this.tIdx++;
      if (isGoal(s) && d < t.r) return `Alvo acertado! ${Math.round(d * 100)} cm do centro`;
      return `Fora do alvo (${Math.round(d * 100)} cm)`;
    }
    if (this.drill === 'power') return `${s.speedKmh.toFixed(1)} km/h — recorde da sessão ${this.best.speed.toFixed(1)} km/h`;
    if (this.drill === 'curl') return `Curva de ${Math.round(s.curveCm)} cm · ${Math.round(s.spinRpm)} rpm`;
    return null;
  }
  scoreboard(): Scoreboard {
    return {
      left: { name: this.user.name, short: 'TREINO', goals: this.goals, marks: [] },
      info: `${this.goals}/${this.shots} gols · ${this.level === 'none' ? 'sem goleiro' : KEEPERS[this.level].label}`,
    };
  }
  summary(): Summary {
    return {
      title: 'Sessão de treino',
      win: true,
      confetti: false,
      lines: [
        ['Cobranças', String(this.shots)],
        ['Gols', `${this.goals} (${this.shots ? Math.round((100 * this.goals) / this.shots) : 0}%)`],
        ['Maior velocidade', `${this.best.speed.toFixed(1)} km/h`],
        ['Maior curva (gol)', `${Math.round(this.best.curve)} cm`],
      ],
    };
  }
}

export const DRILL_LABEL: Record<Drill, string> = {
  free: 'Livre',
  precision: 'Precisão',
  power: 'Potência',
  curl: 'Efeito',
};

// ------------------------------------------------------------------- shoot-out

interface Kick {
  team: 0 | 1;
  goal: boolean;
}

export class ShootoutMode implements ModeController {
  id = 'shootout';
  title = 'Disputa de pênaltis';
  kicks: Kick[] = [];
  private order: [Player[], Player[]];
  private idx: [number, number] = [0, 0];
  private seed: number;
  finished = false;
  winner: 0 | 1 | null = null;
  retake = false;
  /** teams[0] is the user's team. first: which team kicks first. */
  constructor(public teams: [Team, Team], public first: 0 | 1, public level: Difficulty, seed: number) {
    const sortTakers = (t: Team) =>
      [...t.players].sort((a, b) => (b.attrs.precision + b.attrs.composure) - (a.attrs.precision + a.attrs.composure));
    this.order = [sortTakers(teams[0]), sortTakers(teams[1])];
    this.seed = seed;
  }
  private taken(team: 0 | 1) {
    return this.kicks.filter((k) => k.team === team).length;
  }
  private goals(team: 0 | 1) {
    return this.kicks.filter((k) => k.team === team && k.goal).length;
  }
  private nextTeam(): 0 | 1 {
    const n = this.kicks.length;
    return (n % 2 === 0 ? this.first : 1 - this.first) as 0 | 1;
  }
  /** Would scoring or missing this kick end the shoot-out? */
  private decisive(team: 0 | 1): boolean {
    const test = (goal: boolean) => {
      const saved = this.kicks.slice();
      this.kicks.push({ team, goal });
      const w = this.computeWinner();
      this.kicks = saved;
      return w !== null;
    };
    return test(true) || test(false);
  }
  next(): KickSpec | null {
    if (this.finished) return null;
    const team = this.nextTeam();
    const other = (1 - team) as 0 | 1;
    const list = this.order[team];
    const kicker = list[this.idx[team] % list.length];
    const round = Math.floor(this.kicks.length / 2) + 1;
    const sudden = round > 5;
    const pressure = this.decisive(team) ? 0.9 : sudden ? 0.7 : 0.2 + round * 0.08;
    const userKicks = team === 0;
    return {
      role: userKicks ? 'kick' : 'keep',
      kickerTeam: this.teams[team],
      kicker,
      keeperTeam: this.teams[other],
      keeperLevel: userKicks ? this.level : this.teams[0].keeper.level,
      attrs: kicker.attrs,
      pressure,
      label: sudden ? `Morte súbita · rodada ${round}` : `Rodada ${round} de 5`,
      cpuSeed: this.seed * 977 + this.kicks.length * 31 + 7,
      userTeamIsKicking: userKicks,
    };
  }
  onResult(s: ShotStats, spec: KickSpec): string | null {
    if (s.outcome === 'retake') {
      this.retake = true;
      return 'Goleiro adiantado: cobrança repetida (regra 14)';
    }
    this.retake = false;
    const team = spec.kickerTeam === this.teams[0] ? 0 : 1;
    this.kicks.push({ team, goal: isGoal(s) });
    this.idx[team]++;
    const w = this.computeWinner();
    if (w !== null) {
      this.finished = true;
      this.winner = w;
    }
    return null;
  }
  computeWinner(): 0 | 1 | null {
    const a = this.goals(0);
    const b = this.goals(1);
    const ta = this.taken(0);
    const tb = this.taken(1);
    if (ta <= 5 && tb <= 5) {
      const remA = 5 - ta;
      const remB = 5 - tb;
      if (a > b + remB) return 0;
      if (b > a + remA) return 1;
      if (ta === 5 && tb === 5 && a !== b) return a > b ? 0 : 1;
      return null;
    }
    // Sudden death: decided after both teams kicked the same number of times.
    if (ta === tb && a !== b) return a > b ? 0 : 1;
    return null;
  }
  scoreboard(): Scoreboard {
    const marks = (t: 0 | 1) => {
      const ks = this.kicks.filter((k) => k.team === t).map((k) => (k.goal ? 'goal' : 'miss') as 'goal' | 'miss');
      const out: ('goal' | 'miss' | 'pending')[] = ks.slice(-Math.max(5, ks.length));
      while (out.length < 5) out.push('pending');
      return out;
    };
    return {
      left: { name: this.teams[0].name, short: this.teams[0].short, goals: this.goals(0), marks: marks(0) },
      right: { name: this.teams[1].name, short: this.teams[1].short, goals: this.goals(1), marks: marks(1) },
      info: this.kicks.length >= 10 ? 'Morte súbita' : 'Disputa de pênaltis',
    };
  }
  summary(): Summary {
    const a = this.goals(0);
    const b = this.goals(1);
    const win = this.winner === 0;
    const conv = (t: 0 | 1) => {
      const n = this.taken(t);
      return n ? `${this.goals(t)}/${n} (${Math.round((100 * this.goals(t)) / n)}%)` : '-';
    };
    return {
      title: win ? `${this.teams[0].name} vence!` : `${this.teams[1].name} vence`,
      win,
      confetti: win,
      lines: [
        ['Placar', `${this.teams[0].short} ${a} × ${b} ${this.teams[1].short}`],
        ['Cobranças', String(this.kicks.length)],
        [`Aproveitamento ${this.teams[0].short}`, conv(0)],
        [`Aproveitamento ${this.teams[1].short}`, conv(1)],
        ['Morte súbita', this.kicks.length > 10 ? 'Sim' : 'Não'],
      ],
    };
  }
}

// ------------------------------------------------------------------- precision

export const PRECISION_LAYOUT: Record<'easy' | 'medium' | 'hard', { x: number; y: number; r: number }[]> = {
  easy: [
    { x: -2.6, y: 0.6, r: 0.6 }, { x: 2.6, y: 1.7, r: 0.6 }, { x: 0, y: 1.6, r: 0.6 }, { x: 2.5, y: 0.6, r: 0.6 },
    { x: -2.5, y: 1.7, r: 0.6 }, { x: -1.2, y: 0.5, r: 0.6 }, { x: 1.3, y: 1.9, r: 0.6 }, { x: 0, y: 0.5, r: 0.6 },
  ],
  medium: [
    { x: -2.9, y: 0.5, r: 0.45 }, { x: 2.9, y: 1.9, r: 0.45 }, { x: -2.8, y: 1.9, r: 0.45 }, { x: 2.8, y: 0.45, r: 0.45 },
    { x: 0, y: 2.0, r: 0.45 }, { x: -1.7, y: 1.2, r: 0.45 }, { x: 1.7, y: 0.9, r: 0.45 }, { x: 0, y: 0.45, r: 0.45 },
  ],
  hard: [
    { x: -3.25, y: 2.1, r: 0.32 }, { x: 3.25, y: 0.35, r: 0.32 }, { x: 3.2, y: 2.05, r: 0.32 }, { x: -3.2, y: 0.35, r: 0.32 },
    { x: -1.5, y: 2.05, r: 0.32 }, { x: 1.6, y: 2.05, r: 0.32 }, { x: -2.4, y: 1.2, r: 0.32 }, { x: 2.4, y: 1.2, r: 0.32 },
  ],
};

export class PrecisionMode implements ModeController {
  id = 'precision';
  title = 'Desafio de precisão';
  shots = 0;
  points = 0;
  hits = 0;
  history: ('goal' | 'miss')[] = [];
  lastHit = -1;
  constructor(public level: 'easy' | 'medium' | 'hard', public kicksTotal: number, public user: Player, public team: Team, public opp: Team, public keeper: Difficulty | 'none') {}
  get layout() {
    return PRECISION_LAYOUT[this.level];
  }
  next(): KickSpec | null {
    if (this.shots >= this.kicksTotal) return null;
    const t = this.layout[this.shots % this.layout.length];
    return {
      role: 'kick',
      kickerTeam: this.team,
      kicker: this.user,
      keeperTeam: this.opp,
      keeperLevel: this.keeper,
      attrs: this.user.attrs,
      pressure: this.shots === this.kicksTotal - 1 ? 0.4 : 0.1,
      label: `Alvo ${this.shots + 1} de ${this.kicksTotal}`,
      targets: [t],
      cpuSeed: this.shots,
      userTeamIsKicking: true,
    };
  }
  onResult(s: ShotStats): string | null {
    if (s.outcome === 'retake') return 'Goleiro adiantado — repita';
    const t = this.layout[this.shots % this.layout.length];
    this.shots++;
    const d = Math.hypot(s.crossing.x - t.x, s.crossing.y - t.y);
    let pts = 0;
    let msg: string;
    if (isGoal(s) && d < t.r) {
      pts = Math.round(100 - 70 * (d / t.r)) + (d < t.r / 3 ? 25 : 0);
      this.hits++;
      this.lastHit = 0;
      msg = `+${pts} pts · ${Math.round(d * 100)} cm do centro${d < t.r / 3 ? ' · NA MOSCA!' : ''}`;
    } else if (isGoal(s)) {
      pts = 10;
      this.lastHit = -1;
      msg = `+10 pts · gol fora do alvo (${Math.round(d * 100)} cm)`;
    } else {
      this.lastHit = -1;
      msg = 'Sem pontos';
    }
    this.points += pts;
    this.history.push(isGoal(s) ? 'goal' : 'miss');
    return msg;
  }
  scoreboard(): Scoreboard {
    const marks: ('goal' | 'miss' | 'pending')[] = [...this.history];
    while (marks.length < this.kicksTotal) marks.push('pending');
    return {
      left: { name: 'Precisão', short: 'PTS', goals: this.points, marks },
      info: `Nível ${this.level === 'easy' ? 'fácil' : this.level === 'medium' ? 'médio' : 'difícil'} · ${this.hits} alvos`,
      points: this.points,
    };
  }
  summary(): Summary {
    const max = this.kicksTotal * 125;
    const stars = this.points > max * 0.55 ? 3 : this.points > max * 0.35 ? 2 : this.points > max * 0.15 ? 1 : 0;
    const d = load();
    const key = `${this.level}-${this.kicksTotal}`;
    const prev = d.records.precisionBest[key] ?? 0;
    if (this.points > prev) {
      d.records.precisionBest[key] = this.points;
      save();
    }
    return {
      title: `${this.points} pontos`,
      win: stars >= 2,
      confetti: stars === 3,
      lines: [
        ['Alvos acertados', `${this.hits}/${this.kicksTotal}`],
        ['Classificação', '★'.repeat(stars) + '☆'.repeat(3 - stars)],
        ['Recorde', `${Math.max(prev, this.points)} pts`],
      ],
    };
  }
}

// ------------------------------------------------------------------- career

export interface Stage {
  name: string;
  desc: string;
  kind: 'convert' | 'precision' | 'power' | 'curl';
  kicks: number;
  need: number;
  keeper: Difficulty | 'none';
  level?: 'easy' | 'medium' | 'hard';
  minSpeed?: number;
  minCurve?: number;
  pressure?: number;
}

export const STAGES: Stage[] = [
  { name: 'Peneira', desc: 'Marque 3 de 5 contra um goleiro iniciante', kind: 'convert', kicks: 5, need: 3, keeper: 'beginner' },
  { name: 'Base sub-17', desc: 'Precisão fácil: some 350 pontos em 8 alvos', kind: 'precision', kicks: 8, need: 350, keeper: 'none', level: 'easy' },
  { name: 'Sub-20', desc: 'Marque 4 de 5 contra um goleiro intermediário', kind: 'convert', kicks: 5, need: 4, keeper: 'intermediate' },
  { name: 'Teste de potência', desc: 'Marque 3 gols acima de 95 km/h', kind: 'power', kicks: 6, need: 3, keeper: 'beginner', minSpeed: 95 },
  { name: 'Estreia profissional', desc: 'Marque 4 de 5 sob pressão de estreia', kind: 'convert', kicks: 5, need: 4, keeper: 'intermediate', pressure: 0.45 },
  { name: 'Mestre do efeito', desc: 'Marque 2 gols com curva acima de 45 cm', kind: 'curl', kicks: 6, need: 2, keeper: 'intermediate', minCurve: 45 },
  { name: 'Clássico estadual', desc: 'Marque 4 de 5 contra um goleiro avançado', kind: 'convert', kicks: 5, need: 4, keeper: 'advanced', pressure: 0.5 },
  { name: 'Precisão de elite', desc: 'Precisão difícil: some 420 pontos', kind: 'precision', kicks: 8, need: 420, keeper: 'beginner', level: 'hard' },
  { name: 'Semifinal continental', desc: 'Marque 5 de 6 contra avançado, estádio lotado', kind: 'convert', kicks: 6, need: 5, keeper: 'advanced', pressure: 0.7 },
  { name: 'Final mundial', desc: 'Marque 4 de 5 contra um profissional. Decisivo.', kind: 'convert', kicks: 5, need: 4, keeper: 'pro', pressure: 0.95 },
];

export class CareerMode implements ModeController {
  id = 'career';
  title = 'Carreira de cobrador';
  stage: Stage;
  shots = 0;
  score = 0;
  marks: ('goal' | 'miss')[] = [];
  xpGained = 0;
  passed = false;
  private precision: PrecisionMode | null = null;
  constructor(public state: CareerState, public team: Team, public opp: Team) {
    this.stage = STAGES[Math.min(state.stage, STAGES.length - 1)];
    if (this.stage.kind === 'precision') {
      this.precision = new PrecisionMode(this.stage.level ?? 'medium', this.stage.kicks, this.player, team, opp, this.stage.keeper);
    }
  }
  get player(): Player {
    return userPlayer(this.state.name, this.state.attrs, load().settings.foot);
  }
  next(): KickSpec | null {
    if (this.shots >= this.stage.kicks) return null;
    if (this.precision) {
      const s = this.precision.next();
      if (s) s.label = `${this.stage.name} · ${s.label}`;
      return s;
    }
    const p = this.player;
    return {
      role: 'kick',
      kickerTeam: this.team,
      kicker: p,
      keeperTeam: this.opp,
      keeperLevel: this.stage.keeper,
      attrs: p.attrs,
      pressure: (this.stage.pressure ?? 0.2) * (this.shots === this.stage.kicks - 1 ? 1.2 : 1),
      label: `${this.stage.name} · ${this.shots + 1}/${this.stage.kicks}`,
      cpuSeed: this.shots,
      userTeamIsKicking: true,
    };
  }
  onResult(s: ShotStats, spec: KickSpec): string | null {
    if (s.outcome === 'retake') return 'Goleiro adiantado — repita';
    this.shots++;
    let msg: string | null = null;
    if (this.precision) {
      msg = this.precision.onResult(s);
      this.score = this.precision.points;
    } else {
      let ok = isGoal(s);
      if (this.stage.kind === 'power') ok = ok && s.speedKmh >= (this.stage.minSpeed ?? 0);
      if (this.stage.kind === 'curl') ok = ok && s.curveCm >= (this.stage.minCurve ?? 0);
      if (ok) this.score++;
      if (this.stage.kind === 'power' && isGoal(s)) msg = `${s.speedKmh.toFixed(1)} km/h ${ok ? '✓' : `(mín. ${this.stage.minSpeed})`}`;
      if (this.stage.kind === 'curl' && isGoal(s)) msg = `Curva ${Math.round(s.curveCm)} cm ${ok ? '✓' : `(mín. ${this.stage.minCurve})`}`;
      this.marks.push(ok ? 'goal' : 'miss');
    }
    this.xpGained += isGoal(s) ? 12 + Math.round(s.quality / 10) : 3;
    void spec;
    if (this.shots >= this.stage.kicks) this.finish();
    return msg;
  }
  private finish(): void {
    this.passed = this.score >= this.stage.need;
    const st = this.state;
    st.xp += this.xpGained + (this.passed ? 60 : 0);
    while (st.xp >= 100) {
      st.xp -= 100;
      st.points += 1;
    }
    if (this.passed) {
      st.points += 3;
      st.best[st.stage] = Math.max(st.best[st.stage] ?? 0, this.score);
      if (st.stage < STAGES.length - 1) st.stage++;
      else st.best[99] = 1;
    }
    save();
  }
  scoreboard(): Scoreboard {
    if (this.precision) {
      const sb = this.precision.scoreboard();
      sb.info = `${this.stage.name} · meta ${this.stage.need} pts`;
      return sb;
    }
    const marks: ('goal' | 'miss' | 'pending')[] = [...this.marks];
    while (marks.length < this.stage.kicks) marks.push('pending');
    return {
      left: { name: this.state.name, short: 'CARREIRA', goals: this.score, marks },
      info: `${this.stage.name} · meta ${this.stage.need}/${this.stage.kicks}`,
    };
  }
  summary(): Summary {
    return {
      title: this.passed ? 'Etapa concluída!' : 'Etapa não concluída',
      win: this.passed,
      confetti: this.passed && this.state.stage >= STAGES.length - 1,
      lines: [
        ['Etapa', this.stage.name],
        ['Resultado', `${this.score} / meta ${this.stage.need}`],
        ['XP ganho', `+${this.xpGained + (this.passed ? 60 : 0)}`],
        ['Pontos de atributo', String(this.state.points)],
      ],
    };
  }
}

export function teamById(id: string): Team {
  return TEAMS.find((t) => t.id === id) ?? TEAMS[0];
}
