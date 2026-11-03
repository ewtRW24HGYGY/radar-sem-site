import { DIFFICULTY_ORDER, Difficulty, KEEPERS } from '../ai/profiles';
import { CAMERA_LABELS, CameraMode, KEEPER_CAMERAS, KICKER_CAMERAS } from '../camera/cameras';
import { TECHNIQUES, TECHNIQUE_ORDER, Technique } from '../physics/kick';
import { GOAL } from '../physics/constants';
import { Drill, DRILL_LABEL, STAGES, Scoreboard, Summary } from '../game/modes';
import type { ShotStats, TakerAttributes } from '../game/penaltySim';
import { CareerState, Settings, ShotRecord, load } from '../game/storage';
import { TEAMS } from '../game/teams';
import './styles.css';

const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector(sel) as T;

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

export interface MenuHandlers {
  quick(): void;
  training(level: Difficulty | 'none', drill: Drill): void;
  shootout(team: number, level: Difficulty, first: 0 | 1): void;
  precision(level: 'easy' | 'medium' | 'hard', keeper: Difficulty | 'none'): void;
  career(): void;
  settingsChanged(s: Settings, needsRebuild: boolean): void;
  resetStats(): void;
  careerSpend(attr: keyof TakerAttributes): void;
  careerRename(name: string): void;
  audioUnlock(): void;
}

const OUTCOME_CLASS: Record<string, string> = { goal: 'goal', saved: 'saved', post: 'post', wide: 'wide', over: 'over', retake: 'retake' };

export class UI {
  root: HTMLElement;
  hud: HTMLElement;
  private menu: HTMLElement;
  private panelEl: HTMLElement | null = null;
  private result: HTMLElement;
  private replayBar: HTMLElement;
  private touch: HTMLElement;
  private pause: HTMLElement | null = null;
  private bannerEl: HTMLElement | null = null;
  private toastTimer = 0;
  handlers!: MenuHandlers;
  techClick: ((t: Technique) => void) | null = null;
  setupClick: ((k: string) => void) | null = null;

  constructor(app: HTMLElement) {
    this.root = document.createElement('div');
    this.root.className = 'ui';
    app.appendChild(this.root);
    this.root.innerHTML = `
      <div id="loading"><div><div class="crest"><span class="crown"></span>PENALTY<br><b style="color:var(--gold)">KINGS</b><small>SIMULADOR DE PÊNALTIS</small></div><div class="bar"><i></i></div></div></div>
      <div id="hud" class="hidden"></div>
      <div id="menu" class="hidden"></div>
      <div id="result" class="hidden"></div>
      <div id="replay-bar" class="hidden"></div>
      <div id="touch" class="hidden"></div>`;
    this.hud = $('#hud', this.root);
    this.menu = $('#menu', this.root);
    this.result = $('#result', this.root);
    this.replayBar = $('#replay-bar', this.root);
    this.touch = $('#touch', this.root);
    this.buildHud();
  }

  loading(p: number): void {
    const i = $('#loading .bar i', this.root);
    if (i) i.style.width = `${Math.round(p * 100)}%`;
  }
  hideLoading(): void {
    const l = $('#loading', this.root);
    if (!l) return;
    l.style.opacity = '0';
    setTimeout(() => l.remove(), 500);
  }

  // ---------------------------------------------------------------- menu

  showMenu(): void {
    this.closePanel();
    this.hud.classList.add('hidden');
    this.result.classList.add('hidden');
    this.replayBar.classList.add('hidden');
    this.touch.classList.add('hidden');
    this.menu.classList.remove('hidden');
    const d = load();
    const shots = d.shots.length;
    const goals = d.shots.filter((s) => s.outcome === 'goal').length;
    this.menu.innerHTML = `
      <div class="col">
        <div class="logo"><span class="crown"></span>Penalty<br><b>Kings</b><small>Física real · 11 metros · nenhuma animação decide o gol</small></div>
        <ul class="menu-list">
          <li><button data-m="quick">Jogar <span>Disputa rápida · ${KEEPERS[d.settings.difficulty].label}</span></button></li>
          <li><button data-m="training">Treinamento <span>Livre, precisão, potência, efeito</span></button></li>
          <li><button data-m="shootout">Disputa de pênaltis <span>5 cobranças + morte súbita</span></button></li>
          <li><button data-m="precision">Desafio de precisão <span>Alvos no gol</span></button></li>
          <li><button data-m="career">Carreira <span>Etapa ${Math.min(d.career.stage + 1, STAGES.length)} de ${STAGES.length}</span></button></li>
          <li><button data-m="stats">Estatísticas <span>${shots} cobranças · ${shots ? Math.round((100 * goals) / shots) : 0}% de gols</span></button></li>
          <li><button data-m="settings">Configurações <span>Gráficos ${d.settings.quality.toUpperCase()} · ${d.settings.timeOfDay === 'night' ? 'noite' : d.settings.timeOfDay === 'day' ? 'dia' : 'pôr do sol'}</span></button></li>
        </ul>
        <div class="menu-foot">Mouse ou <kbd>WASD</kbd> mira · segure <kbd>Espaço</kbd>/clique para a potência · solte para correr · aperte de novo no pé de apoio (anel dourado) · <kbd>Shift</kbd> paradinha · <kbd>1-7</kbd> técnica · <kbd>C</kbd> câmera · controle de videogame e toque também funcionam.</div>
      </div><div></div>`;
    this.menu.querySelectorAll<HTMLButtonElement>('[data-m]').forEach((b) =>
      b.addEventListener('click', () => {
        this.handlers.audioUnlock();
        const m = b.dataset.m!;
        if (m === 'quick') this.handlers.quick();
        else if (m === 'training') this.trainingPanel();
        else if (m === 'shootout') this.shootoutPanel();
        else if (m === 'precision') this.precisionPanel();
        else if (m === 'career') this.careerPanel();
        else if (m === 'stats') this.statsPanel();
        else if (m === 'settings') this.settingsPanel();
      }),
    );
    (this.menu.querySelector('[data-m]') as HTMLButtonElement)?.focus();
  }
  hideMenu(): void {
    this.menu.classList.add('hidden');
    this.closePanel();
  }

  private openPanel(html: string): HTMLElement {
    this.closePanel();
    const p = document.createElement('div');
    p.className = 'panel';
    p.innerHTML = `<div class="card">${html}</div>`;
    this.root.appendChild(p);
    this.panelEl = p;
    p.addEventListener('click', (e) => {
      if (e.target === p) this.closePanel();
    });
    p.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => this.closePanel()));
    return p;
  }
  closePanel(): void {
    this.panelEl?.remove();
    this.panelEl = null;
  }

  private seg<T extends string>(p: HTMLElement, name: string, initial: T, onChange?: (v: T) => void): () => T {
    let val = initial;
    const wrap = p.querySelector(`[data-seg="${name}"]`)!;
    const btns = wrap.querySelectorAll<HTMLButtonElement>('button');
    const sync = () => btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === val)));
    btns.forEach((b) =>
      b.addEventListener('click', () => {
        val = b.dataset.v as T;
        sync();
        onChange?.(val);
      }),
    );
    sync();
    return () => val;
  }

  private levelSeg(withNone: boolean): string {
    return (withNone ? `<button data-v="none">Sem goleiro</button>` : '') + DIFFICULTY_ORDER.map((d) => `<button data-v="${d}">${KEEPERS[d].label}</button>`).join('');
  }

  trainingPanel(): void {
    const s = load().settings;
    const p = this.openPanel(`
      <h2>Treinamento</h2>
      <p>Cobranças ilimitadas. Cada chute é uma colisão real entre a chuteira e a bola: mude técnica, ponto de contato e ritmo e observe o efeito.</p>
      <div class="field"><label>Goleiro</label><div class="seg" data-seg="lvl">${this.levelSeg(true)}</div></div>
      <div class="field"><label>Exercício</label><div class="seg" data-seg="drill">${(['free', 'precision', 'power', 'curl'] as Drill[]).map((d) => `<button data-v="${d}">${DRILL_LABEL[d]}</button>`).join('')}</div></div>
      <div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn primary" data-go>Começar treino</button></div>`);
    const lvl = this.seg<Difficulty | 'none'>(p, 'lvl', s.difficulty);
    const drill = this.seg<Drill>(p, 'drill', 'free');
    $('[data-go]', p).addEventListener('click', () => this.handlers.training(lvl(), drill()));
  }

  shootoutPanel(): void {
    const s = load().settings;
    const p = this.openPanel(`
      <h2>Disputa de pênaltis</h2>
      <p>Regras oficiais: cinco cobranças alternadas para cada lado, encerramento antecipado quando não há mais como empatar, e morte súbita se continuar empatado. Você cobra pelo seu time e defende o gol nas cobranças do adversário.</p>
      <div class="grid2">
        <div class="field"><label>Seu time</label><div class="seg" data-seg="team">${TEAMS.map((t, i) => `<button data-v="${i}">${esc(t.name)}</button>`).join('')}</div></div>
        <div class="field"><label>Quem começa</label><div class="seg" data-seg="first"><button data-v="0">Batendo</button><button data-v="1">Defendendo</button></div></div>
      </div>
      <div class="field"><label>Goleiro adversário</label><div class="seg" data-seg="lvl">${this.levelSeg(false)}</div></div>
      <div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn primary" data-go>Ir para a marca</button></div>`);
    const team = this.seg(p, 'team', '0');
    const first = this.seg(p, 'first', '0');
    const lvl = this.seg<Difficulty>(p, 'lvl', s.difficulty);
    $('[data-go]', p).addEventListener('click', () => this.handlers.shootout(Number(team()), lvl(), Number(first()) as 0 | 1));
  }

  precisionPanel(): void {
    const best = load().records.precisionBest;
    const p = this.openPanel(`
      <h2>Desafio de precisão</h2>
      <p>Oito alvos em regiões diferentes do gol. Pontos pela distância ao centro do alvo; bônus na mosca. Só vale se for gol.</p>
      <div class="field"><label>Dificuldade</label><div class="seg" data-seg="lvl"><button data-v="easy">Fácil</button><button data-v="medium">Médio</button><button data-v="hard">Difícil</button></div></div>
      <div class="field"><label>Goleiro</label><div class="seg" data-seg="gk">${this.levelSeg(true)}</div></div>
      <p class="num">Recordes: fácil ${best['easy-8'] ?? 0} · médio ${best['medium-8'] ?? 0} · difícil ${best['hard-8'] ?? 0} pts</p>
      <div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn primary" data-go>Começar</button></div>`);
    const lvl = this.seg<'easy' | 'medium' | 'hard'>(p, 'lvl', 'medium');
    const gk = this.seg<Difficulty | 'none'>(p, 'gk', 'none');
    $('[data-go]', p).addEventListener('click', () => this.handlers.precision(lvl(), gk()));
  }

  careerPanel(): void {
    const c = load().career;
    const stages = STAGES.map((st, i) => {
      const cls = i < c.stage || (i === STAGES.length - 1 && c.best[99]) ? 'done' : i === c.stage ? 'current' : 'locked';
      return `<div class="stage ${cls}"><div class="n">${i + 1}</div><div><b>${esc(st.name)}</b><small>${esc(st.desc)}</small></div><div class="chip ${st.keeper !== 'none' ? 'lvl-' + st.keeper : ''}">${st.keeper === 'none' ? 'sem goleiro' : KEEPERS[st.keeper].label}</div></div>`;
    }).join('');
    const attr = (k: keyof TakerAttributes, label: string) =>
      `<div class="attr"><span>${label}</span><div class="meter"><i style="width:${c.attrs[k]}%"></i></div><b class="num">${c.attrs[k]}</b><button data-attr="${k}" ${c.points > 0 && c.attrs[k] < 99 ? '' : 'disabled'} aria-label="Melhorar ${label}">+</button></div>`;
    const p = this.openPanel(`
      <h2>Carreira de cobrador</h2>
      <div class="field"><label for="career-name">Nome do jogador</label><input id="career-name" type="text" maxlength="14" value="${esc(c.name)}"></div>
      <div class="grid2">
        <div class="field"><h3>Atributos · ${c.points} ponto(s) para distribuir</h3>
          ${attr('precision', 'Precisão')}${attr('power', 'Potência')}${attr('curl', 'Efeito')}${attr('composure', 'Frieza')}
          <p style="font-size:12.5px">Precisão reduz o erro de execução, potência aumenta a velocidade do pé, efeito aumenta o giro, frieza controla os nervos nas cobranças decisivas. XP: ${c.xp}/100.</p>
        </div>
        <div class="field"><h3>Etapas</h3><div class="stage-list">${stages}</div></div>
      </div>
      <div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn primary" data-go>${c.best[99] ? 'Rejogar a final' : 'Jogar etapa ' + (c.stage + 1)}</button></div>`);
    p.querySelectorAll<HTMLButtonElement>('[data-attr]').forEach((b) =>
      b.addEventListener('click', () => {
        this.handlers.careerSpend(b.dataset.attr as keyof TakerAttributes);
        this.careerPanel();
      }),
    );
    const nameIn = $<HTMLInputElement>('#career-name', p);
    nameIn.addEventListener('change', () => this.handlers.careerRename(nameIn.value.trim() || 'Você'));
    $('[data-go]', p).addEventListener('click', () => {
      this.handlers.careerRename(nameIn.value.trim() || 'Você');
      this.handlers.career();
    });
  }

  statsPanel(): void {
    const d = load();
    const shots = d.shots;
    const n = shots.length;
    const goals = shots.filter((s) => s.outcome === 'goal').length;
    const avgSpeed = n ? shots.reduce((a, s) => a + s.speed, 0) / n : 0;
    const maxSpeed = shots.reduce((a, s) => Math.max(a, s.speed), 0);
    const byTech = new Map<string, { n: number; g: number; sp: number }>();
    for (const s of shots) {
      const e = byTech.get(s.technique) ?? { n: 0, g: 0, sp: 0 };
      e.n++;
      if (s.outcome === 'goal') e.g++;
      e.sp += s.speed;
      byTech.set(s.technique, e);
    }
    const byKeeper = new Map<string, { n: number; g: number }>();
    for (const s of shots) {
      const e = byKeeper.get(s.keeper) ?? { n: 0, g: 0 };
      e.n++;
      if (s.outcome === 'goal') e.g++;
      byKeeper.set(s.keeper, e);
    }
    const out = (o: string) => shots.filter((s) => s.outcome === o).length;
    const p = this.openPanel(`
      <h2>Estatísticas</h2>
      <div class="kpis">
        <div class="kpi"><b>${n}</b><span>cobranças</span></div>
        <div class="kpi"><b>${n ? Math.round((100 * goals) / n) : 0}%</b><span>conversão</span></div>
        <div class="kpi"><b>${avgSpeed.toFixed(0)}</b><span>km/h médios</span></div>
        <div class="kpi"><b>${maxSpeed.toFixed(0)}</b><span>km/h máx.</span></div>
      </div>
      <div class="grid2">
        <div class="field"><h3>Onde suas bolas cruzaram a linha</h3><canvas class="chart" id="st-map" width="640" height="300"></canvas></div>
        <div class="field"><h3>Erro médio de mira (cm, média móvel de 10)</h3><canvas class="chart" id="st-prec" width="640" height="300"></canvas></div>
      </div>
      <div class="grid2">
        <div class="field"><h3>Por técnica</h3><table class="tbl"><thead><tr><th>Técnica</th><th>Chutes</th><th>Gols</th><th>km/h</th></tr></thead><tbody>
          ${[...byTech.entries()].map(([k, e]) => `<tr><td>${esc(k)}</td><td>${e.n}</td><td>${Math.round((100 * e.g) / e.n)}%</td><td>${(e.sp / e.n).toFixed(0)}</td></tr>`).join('') || '<tr><td colspan="4">Nenhuma cobrança ainda</td></tr>'}
        </tbody></table></div>
        <div class="field"><h3>Resultados</h3><table class="tbl"><tbody>
          <tr><td>Gols</td><td>${goals}</td></tr><tr><td>Defesas</td><td>${out('saved')}</td></tr><tr><td>Trave/travessão</td><td>${out('post')}</td></tr><tr><td>Para fora / por cima</td><td>${out('wide') + out('over')}</td></tr>
          ${[...byKeeper.entries()].map(([k, e]) => `<tr><td>vs ${k === 'none' ? 'gol vazio' : KEEPERS[k as Difficulty].label}</td><td>${Math.round((100 * e.g) / e.n)}% (${e.n})</td></tr>`).join('')}
        </tbody></table></div>
      </div>
      <div class="actions"><button class="btn ghost" data-reset>Apagar estatísticas</button><button class="btn primary" data-close>Fechar</button></div>`);
    drawShotMap($<HTMLCanvasElement>('#st-map', p), shots.slice(-400));
    drawPrecisionChart($<HTMLCanvasElement>('#st-prec', p), shots);
    let armed = false;
    const reset = $<HTMLButtonElement>('[data-reset]', p);
    reset.addEventListener('click', () => {
      if (!armed) {
        armed = true;
        reset.textContent = 'Clique de novo para confirmar';
        return;
      }
      this.handlers.resetStats();
      this.statsPanel();
    });
  }

  settingsPanel(): void {
    const s = { ...load().settings };
    const p = this.openPanel(`
      <h2>Configurações</h2>
      <div class="grid2">
        <div class="field"><label>Gráficos</label><div class="seg" data-seg="quality"><button data-v="low">LOW</button><button data-v="high">HIGH</button><button data-v="ultra">ULTRA</button></div><p style="font-size:12px">A física é a mesma em todas as opções.</p></div>
        <div class="field"><label>Horário</label><div class="seg" data-seg="tod"><button data-v="day">Dia</button><button data-v="sunset">Pôr do sol</button><button data-v="night">Noite</button></div></div>
        <div class="field"><label>Vento</label><div class="seg" data-seg="wind"><button data-v="none">Sem vento</button><button data-v="light">Leve</button><button data-v="strong">Forte</button></div></div>
        <div class="field"><label>Pé preferido (treino e carreira)</label><div class="seg" data-seg="foot"><button data-v="right">Direito</button><button data-v="left">Esquerdo</button></div></div>
        <div class="field"><label>Câmera do cobrador</label><div class="seg" data-seg="kcam">${KICKER_CAMERAS.map((c) => `<button data-v="${c}">${CAMERA_LABELS[c]}</button>`).join('')}</div></div>
        <div class="field"><label>Câmera do goleiro</label><div class="seg" data-seg="gcam">${KEEPER_CAMERAS.map((c) => `<button data-v="${c}">${CAMERA_LABELS[c]}</button>`).join('')}</div></div>
        <div class="field"><label>Dificuldade padrão</label><div class="seg" data-seg="diff">${this.levelSeg(false)}</div></div>
        <div class="field"><label>Opções</label><div class="seg">
          <button data-t="followBall">Seguir a bola</button><button data-t="autoReplay">Replay automático</button><button data-t="guide">Guia de trajetória (treino)</button><button data-t="narrator">Narrador</button></div></div>
        <div class="field"><label for="v-master">Volume geral</label><input id="v-master" type="range" min="0" max="1" step="0.05" value="${s.master}"></div>
        <div class="field"><label for="v-crowd">Torcida</label><input id="v-crowd" type="range" min="0" max="1" step="0.05" value="${s.crowd}"></div>
        <div class="field"><label for="v-sfx">Efeitos</label><input id="v-sfx" type="range" min="0" max="1" step="0.05" value="${s.sfx}"></div>
      </div>
      <div class="actions"><button class="btn primary" data-close>Pronto</button></div>`);
    const orig = { quality: s.quality, timeOfDay: s.timeOfDay };
    const changed = () => this.handlers.settingsChanged({ ...s }, s.quality !== orig.quality || s.timeOfDay !== orig.timeOfDay);
    this.seg(p, 'quality', s.quality, (v) => { s.quality = v; changed(); });
    this.seg(p, 'tod', s.timeOfDay, (v) => { s.timeOfDay = v; changed(); });
    this.seg(p, 'wind', s.wind, (v) => { s.wind = v; changed(); });
    this.seg(p, 'foot', s.foot, (v) => { s.foot = v; changed(); });
    this.seg<CameraMode>(p, 'kcam', s.kickerCamera, (v) => { s.kickerCamera = v; changed(); });
    this.seg<CameraMode>(p, 'gcam', s.keeperCamera, (v) => { s.keeperCamera = v; changed(); });
    this.seg<Difficulty>(p, 'diff', s.difficulty, (v) => { s.difficulty = v; changed(); });
    p.querySelectorAll<HTMLButtonElement>('[data-t]').forEach((b) => {
      const k = b.dataset.t as 'followBall' | 'autoReplay' | 'guide' | 'narrator';
      b.setAttribute('aria-pressed', String(s[k]));
      b.addEventListener('click', () => {
        s[k] = !s[k];
        b.setAttribute('aria-pressed', String(s[k]));
        changed();
      });
    });
    for (const k of ['master', 'crowd', 'sfx'] as const) {
      const el = $<HTMLInputElement>(`#v-${k}`, p);
      el.addEventListener('input', () => {
        s[k] = Number(el.value);
        changed();
      });
    }
  }

  // ---------------------------------------------------------------- HUD

  private buildHud(): void {
    this.hud.innerHTML = `
      <div class="scorebug"><div class="sb-main" id="sb"></div><div class="sb-info" id="sb-info"></div><div id="sb-marks"></div></div>
      <div class="help" id="help"></div>
      <div class="card-p" id="keeper-card"></div>
      <div class="card-p" id="kicker-card"></div>
      <div class="label-top" id="label-top"></div>
      <div class="kick-ctl" id="kick-ctl">
        <div class="techs" id="techs"></div>
        <div class="setup-line" id="setup-line"></div>
        <div class="power" id="power"><div class="red"></div><i></i></div>
      </div>
      <div class="indicators" id="indicators">
        <div class="ind"><span>Efeito</span><div class="spinball" id="spinball"><i></i></div></div>
        <div class="ind"><span>Altura</span><div class="hbar" id="hbar"><div class="bar-top"></div><i></i></div><b id="h-val">0,0</b></div>
        <div class="ind"><span>Direção</span><b class="dir" id="dir-val">0°</b><span id="dist-val"></span></div>
      </div>
      <div class="timing hidden" id="timing"><div class="target"></div><div class="closing"></div></div>
      <div class="timing-label hidden" id="timing-label"></div>`;
    const bar = $('#hbar', this.hud);
    const top = $('.bar-top', bar);
    top.style.bottom = `${(GOAL.height / 3.2) * 100}%`;
    const techs = $('#techs', this.hud);
    techs.innerHTML = TECHNIQUE_ORDER.map((t, i) => `<button data-t="${t}" title="${esc(TECHNIQUES[t].description)}"><kbd>${i + 1}</kbd>${TECHNIQUES[t].label}</button>`).join('');
    techs.querySelectorAll<HTMLButtonElement>('button').forEach((b) =>
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        this.techClick?.(b.dataset.t as Technique);
        b.blur();
      }),
    );
    const power = $('#power', this.hud);
    for (const f of [0.25, 0.5, 0.75]) {
      const t = document.createElement('div');
      t.className = 'tick';
      t.style.left = `${(f / 1.15) * 100}%`;
      power.appendChild(t);
    }
  }

  showHud(role: 'kick' | 'keep', touch: boolean): void {
    this.hud.classList.remove('hidden');
    $('#kick-ctl', this.hud).classList.toggle('hidden', role !== 'kick');
    $('#indicators', this.hud).classList.toggle('hidden', role !== 'kick');
    this.touch.classList.toggle('hidden', !touch);
    this.buildTouch(role);
  }
  hideHud(): void {
    this.hud.classList.add('hidden');
    this.touch.classList.add('hidden');
  }
  setKickControlsVisible(v: boolean): void {
    $('#kick-ctl', this.hud).style.opacity = v ? '1' : '0.0';
    $('#indicators', this.hud).style.opacity = v ? '1' : '0.25';
  }

  touchHandlers: { action(down: boolean): void; stutter(): void; faster(down: boolean): void; slower(down: boolean): void; camera(): void; pause(): void } | null = null;

  private buildTouch(role: 'kick' | 'keep'): void {
    this.touch.innerHTML = `
      <button id="t-action">${role === 'kick' ? 'Chutar' : 'Saltar'}</button>
      ${role === 'kick' ? '<button id="t-stutter">Paradinha</button><button id="t-faster">+</button><button id="t-slower">−</button>' : ''}
      <button id="t-cam">Cam</button><button id="t-pause" aria-label="Pausar">II</button>`;
    const h = () => this.touchHandlers!;
    const hold = (id: string, f: (d: boolean) => void) => {
      const el = this.touch.querySelector('#' + id);
      if (!el) return;
      el.addEventListener('pointerdown', (e) => { e.preventDefault(); f(true); });
      el.addEventListener('pointerup', (e) => { e.preventDefault(); f(false); });
      el.addEventListener('pointercancel', () => f(false));
      el.addEventListener('pointerleave', () => f(false));
    };
    hold('t-action', (d) => h().action(d));
    hold('t-faster', (d) => h().faster(d));
    hold('t-slower', (d) => h().slower(d));
    this.touch.querySelector('#t-stutter')?.addEventListener('pointerdown', () => h().stutter());
    this.touch.querySelector('#t-cam')?.addEventListener('click', () => h().camera());
    this.touch.querySelector('#t-pause')?.addEventListener('click', () => h().pause());
  }

  setScoreboard(sb: Scoreboard): void {
    const team = (t: Scoreboard['left']) => `<div class="sb-team"><span class="sh">${esc(t.short)}</span><span class="g">${t.goals}</span></div>`;
    $('#sb', this.hud).innerHTML = team(sb.left) + (sb.right ? `<div class="sb-sep"></div>${team(sb.right)}` : '');
    $('#sb-info', this.hud).textContent = sb.info;
    const marks = (t: Scoreboard['left']) =>
      t.marks.length ? `<div class="marks-row"><span style="width:34px">${esc(t.short.slice(0, 3))}</span><div class="marks">${t.marks.map((m) => `<i class="${m}"></i>`).join('')}</div></div>` : '';
    $('#sb-marks', this.hud).innerHTML = marks(sb.left) + (sb.right ? marks(sb.right) : '');
  }

  setKickerCard(name: string, number: number, foot: string, attrs: TakerAttributes, team: string, isUser: boolean): void {
    $('#kicker-card', this.hud).innerHTML = `<div class="no">${number}</div><div><div class="nm">${esc(name)}</div><div class="sub">${esc(team)} · pé ${foot === 'right' ? 'direito' : 'esquerdo'}${isUser ? '' : ' · CPU'}</div>
      <div class="attrs"><span>PRE <b>${attrs.precision}</b></span><span>POT <b>${attrs.power}</b></span><span>EFE <b>${attrs.curl}</b></span><span>FRI <b>${attrs.composure}</b></span></div></div>`;
  }
  setKeeperCard(name: string, level: Difficulty | 'none' | 'user'): void {
    const el = $('#keeper-card', this.hud);
    if (level === 'none') {
      el.innerHTML = `<div><div class="nm">Gol vazio</div><div class="sub">treino sem goleiro</div></div>`;
      return;
    }
    const prof = level === 'user' ? null : KEEPERS[level];
    el.innerHTML = `<div class="no">GK</div><div><div class="nm">${esc(name)}</div><div class="sub">${level === 'user' ? 'Você defende' : `<span class="chip lvl-${level}">${prof!.label}</span> &nbsp;rating ${prof!.rating}`}</div>
      ${prof ? `<div class="attrs"><span>REAÇÃO <b>${Math.round(prof.reaction * 1000)} ms</b></span><span>IMPULSO <b>${prof.maxLateral.toFixed(1)} m/s</b></span></div>` : ''}</div>`;
  }
  setTechnique(t: Technique): void {
    $('#techs', this.hud).querySelectorAll<HTMLButtonElement>('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.t === t)));
  }
  setSetup(v: { distance: number; angle: number; tempo: number; foot: string; editable: boolean }): void {
    const el = $('#setup-line', this.hud);
    const deg = Math.round((v.angle * 180) / Math.PI);
    el.innerHTML = `<span>Corrida <b>${v.distance.toFixed(1)} m</b>${v.editable ? ' <button data-s="d-">−</button><button data-s="d+">+</button>' : ''}</span>
      <span>Ângulo <b>${deg}°</b>${v.editable ? ' <button data-s="a-">−</button><button data-s="a+">+</button>' : ''}</span>
      <span>Ritmo <b>${v.tempo.toFixed(1)} m/s</b>${v.editable ? ' <button data-s="t-">−</button><button data-s="t+">+</button>' : ''}</span>
      <span>Pé <b>${v.foot === 'right' ? 'D' : 'E'}</b>${v.editable ? ' <button data-s="f">⇄</button>' : ''}</span>`;
    el.querySelectorAll<HTMLButtonElement>('button').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); this.setupClick?.(b.dataset.s!); }));
  }
  setPower(p: number): void {
    ($('#power i', this.hud) as HTMLElement).style.width = `${Math.min(1, p / 1.15) * 100}%`;
  }
  setIndicators(height: number, dirDeg: number, distM: number, spin: { x: number; y: number }): void {
    const i = $('#hbar i', this.hud);
    i.style.bottom = `${Math.max(0, Math.min(1, height / 3.2)) * 100}%`;
    $('#h-val', this.hud).textContent = height.toFixed(2).replace('.', ',') + ' m';
    $('#dir-val', this.hud).textContent = `${dirDeg > 0 ? '→' : dirDeg < 0 ? '←' : ''} ${Math.abs(dirDeg).toFixed(1)}°`;
    $('#dist-val', this.hud).textContent = distM > 0 ? `${distM.toFixed(2)} m` : '';
    const s = $('#spinball i', this.hud);
    s.style.left = `${50 + spin.x * 40}%`;
    s.style.top = `${50 - spin.y * 40}%`;
  }
  setTiming(visible: boolean, closing: number, label?: string, color?: string): void {
    const t = $('#timing', this.hud);
    t.classList.toggle('hidden', !visible);
    if (visible) ($('.closing', t) as HTMLElement).style.transform = `scale(${0.37 + closing * 0.63})`;
    const l = $('#timing-label', this.hud);
    l.classList.toggle('hidden', !label);
    if (label) {
      l.textContent = label;
      l.style.color = color ?? '#fff';
    }
  }
  setHelp(text: string): void {
    $('#help', this.hud).innerHTML = text;
  }
  setLabel(sub: string, title: string): void {
    const el = $('#label-top', this.hud);
    el.innerHTML = title ? `<small>${esc(sub)}</small>${esc(title)}` : '';
    el.style.opacity = title ? '1' : '0';
  }
  banner(text: string, kind: 'goal' | 'save' | 'miss'): void {
    this.bannerEl?.remove();
    const b = document.createElement('div');
    b.className = `banner ${kind}`;
    b.textContent = text;
    this.root.appendChild(b);
    this.bannerEl = b;
    setTimeout(() => {
      if (this.bannerEl === b) {
        b.remove();
        this.bannerEl = null;
      }
    }, 1900);
  }
  toast(text: string, ms = 2200): void {
    let t = this.root.querySelector('.toast') as HTMLElement | null;
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      this.root.appendChild(t);
    }
    t.textContent = text;
    clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => t?.remove(), ms);
  }

  // ---------------------------------------------------------------- result

  showResult(s: ShotStats, modeMsg: string | null, h: { replay(): void; next(): void; menu(): void }, nextLabel = 'Próxima cobrança'): void {
    const el = this.result;
    el.classList.remove('hidden');
    const dir = `${s.dirH >= 0 ? 'Direita' : 'Esquerda'} ${Math.abs(s.dirH).toFixed(1)}° · ${s.dirV.toFixed(1)}°↑`;
    const timing = s.timing === null ? 'sem timing' : Math.abs(s.timing) < 0.12 ? 'perfeito' : s.timing < 0 ? `cedo ${Math.round(-s.timing * 100)}%` : `tarde ${Math.round(s.timing * 100)}%`;
    el.innerHTML = `
      <div class="out ${OUTCOME_CLASS[s.outcome]}">${esc(s.outcomeLabel)}</div>
      ${modeMsg ? `<div class="mode-msg">${esc(modeMsg)}</div>` : ''}
      <div class="stat-grid">
        <div><b>${s.speedKmh.toFixed(1)}</b><span>km/h</span></div>
        <div><b>${s.flightTime.toFixed(2)} s</b><span>voo até o gol</span></div>
        <div><b>${s.distance.toFixed(1)} m</b><span>percorridos</span></div>
        <div><b>${s.maxHeight.toFixed(2)} m</b><span>altura máx.</span></div>
        <div><b>${Math.round(s.precisionCm)} cm</b><span>da mira</span></div>
        <div><b>${Math.round(s.spinRpm)}</b><span>rpm</span></div>
        <div><b>${Math.round(s.curveCm)} cm</b><span>curva</span></div>
        <div><b>${Math.round(s.quality)}</b><span>qualidade</span></div>
        <div><b style="font-size:15px">${esc(s.technique)}</b><span>${timing}</span></div>
      </div>
      <div style="font-size:12.5px;color:var(--mute)">${dir}${s.keeperRead ? ' · goleiro leu: ' + esc(s.keeperRead) : ''}</div>
      <div class="maps"><canvas id="goalmap" width="400" height="160"></canvas><canvas id="ballmap" width="84" height="84" title="Ponto de contato na bola"></canvas></div>
      ${s.notes.length ? `<div class="notes">${s.notes.map((n) => `<span>${esc(n)}</span>`).join('')}</div>` : ''}
      <div class="actions"><button class="btn ghost" data-menu>Menu</button><button class="btn" data-replay>Replay <kbd>R</kbd></button><button class="btn primary" data-next>${esc(nextLabel)}</button></div>`;
    drawGoalMap($<HTMLCanvasElement>('#goalmap', el), s);
    drawBallContact($<HTMLCanvasElement>('#ballmap', el), s.contactOffset);
    $('[data-replay]', el).addEventListener('click', h.replay);
    $('[data-next]', el).addEventListener('click', h.next);
    $('[data-menu]', el).addEventListener('click', h.menu);
  }
  hideResult(): void {
    this.result.classList.add('hidden');
  }

  showSummary(sum: Summary, h: { again(): void; menu(): void }): void {
    const p = this.openPanel(`
      <h3>Fim de jogo</h3><h2 style="color:${sum.win ? 'var(--gold)' : 'var(--text)'}">${esc(sum.title)}</h2>
      <table class="tbl"><tbody>${sum.lines.map(([a, b]) => `<tr><td>${esc(a)}</td><td><b>${esc(b)}</b></td></tr>`).join('')}</tbody></table>
      <div class="actions"><button class="btn ghost" data-menu>Menu principal</button><button class="btn primary" data-again>Jogar de novo</button></div>`);
    $('[data-again]', p).addEventListener('click', () => { this.closePanel(); h.again(); });
    $('[data-menu]', p).addEventListener('click', () => { this.closePanel(); h.menu(); });
  }

  // ---------------------------------------------------------------- replay

  showReplayBar(h: { toggle(): void; speed(s: number): void; angle(): void; seek(t: number): void; contact(): void; trail(): void; close(): void }, duration: number): void {
    const el = this.replayBar;
    el.classList.remove('hidden');
    el.innerHTML = `<span class="lbl">REPLAY</span>
      <button class="btn" data-a="play" aria-label="Pausar ou continuar">⏯</button>
      <div class="seg" data-seg="speed"><button data-v="0.1">0,1×</button><button data-v="0.25">0,25×</button><button data-v="0.5">0,5×</button><button data-v="1">1×</button></div>
      <input type="range" id="rp-seek" min="0" max="${duration.toFixed(2)}" step="0.005" value="0" aria-label="Linha do tempo">
      <button class="btn" data-a="angle">Ângulo</button><button class="btn" data-a="contact">Contato</button><button class="btn" data-a="trail">Trajetória</button><button class="btn primary" data-a="close">Fechar</button>`;
    let tag = this.root.querySelector('.replay-tag') as HTMLElement | null;
    if (!tag) {
      tag = document.createElement('div');
      tag.className = 'replay-tag';
      tag.textContent = 'REPLAY';
      this.root.appendChild(tag);
    }
    this.seg(el, 'speed', '0.25', (v) => h.speed(Number(v)));
    el.querySelector('[data-a="play"]')!.addEventListener('click', h.toggle);
    el.querySelector('[data-a="angle"]')!.addEventListener('click', h.angle);
    el.querySelector('[data-a="contact"]')!.addEventListener('click', h.contact);
    el.querySelector('[data-a="trail"]')!.addEventListener('click', h.trail);
    el.querySelector('[data-a="close"]')!.addEventListener('click', h.close);
    const seek = $<HTMLInputElement>('#rp-seek', el);
    seek.addEventListener('input', () => h.seek(Number(seek.value)));
  }
  updateReplayTime(t: number): void {
    const s = this.replayBar.querySelector('#rp-seek') as HTMLInputElement | null;
    if (s && document.activeElement !== s) s.value = String(t);
  }
  hideReplayBar(): void {
    this.replayBar.classList.add('hidden');
    this.root.querySelector('.replay-tag')?.remove();
  }

  // ---------------------------------------------------------------- pause

  showPause(h: { resume(): void; restart(): void; settings(): void; menu(): void }): void {
    this.hidePause();
    const p = document.createElement('div');
    p.className = 'panel';
    p.innerHTML = `<div class="card" style="width:min(380px,100%)"><h2>Pausa</h2>
      <button class="btn primary" data-r>Continuar</button><button class="btn" data-s>Configurações</button><button class="btn" data-x>Recomeçar modo</button><button class="btn ghost" data-m>Menu principal</button></div>`;
    this.root.appendChild(p);
    this.pause = p;
    $('[data-r]', p).addEventListener('click', h.resume);
    $('[data-s]', p).addEventListener('click', h.settings);
    $('[data-x]', p).addEventListener('click', h.restart);
    $('[data-m]', p).addEventListener('click', h.menu);
  }
  hidePause(): void {
    this.pause?.remove();
    this.pause = null;
  }
  get paused(): boolean {
    return !!this.pause;
  }
  get panelOpen(): boolean {
    return !!this.panelEl;
  }
}

// ---------------------------------------------------------------- drawings

function goalFrame(g: CanvasRenderingContext2D, W: number, H: number, margin = 0.9) {
  // Maps goal-plane metres to canvas pixels; shows a margin around the frame.
  const spanX = (GOAL.halfWidth + margin) * 2;
  const spanY = GOAL.height + margin * 0.8;
  const s = Math.min(W / spanX, H / spanY);
  const ox = W / 2;
  const oy = H - 6;
  const toPx = (x: number, y: number) => [ox + x * s, oy - y * s] as [number, number];
  g.fillStyle = 'rgba(255,255,255,0.04)';
  g.fillRect(0, 0, W, H);
  // net hatch
  g.strokeStyle = 'rgba(255,255,255,0.08)';
  g.lineWidth = 1;
  const [x0, y0] = toPx(-GOAL.halfWidth, 0);
  const [x1, y1] = toPx(GOAL.halfWidth, GOAL.height);
  for (let x = x0; x < x1; x += 9) {
    g.beginPath();
    g.moveTo(x, y0);
    g.lineTo(x, y1);
    g.stroke();
  }
  for (let y = y1; y < y0; y += 9) {
    g.beginPath();
    g.moveTo(x0, y);
    g.lineTo(x1, y);
    g.stroke();
  }
  g.strokeStyle = '#f4f6f8';
  g.lineWidth = Math.max(2, 0.12 * s);
  g.beginPath();
  g.moveTo(x0, y0);
  g.lineTo(x0, y1);
  g.lineTo(x1, y1);
  g.lineTo(x1, y0);
  g.stroke();
  g.strokeStyle = 'rgba(255,255,255,0.3)';
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(0, y0 + 0.5);
  g.lineTo(W, y0 + 0.5);
  g.stroke();
  return { toPx, s };
}

export function drawGoalMap(c: HTMLCanvasElement, s: ShotStats): void {
  const g = c.getContext('2d')!;
  const { toPx, s: sc } = goalFrame(g, c.width, c.height);
  // aim
  const [ax, ay] = toPx(s.aim.x, s.aim.y);
  g.strokeStyle = '#f2b636';
  g.lineWidth = 2;
  g.beginPath();
  g.arc(ax, ay, 7, 0, Math.PI * 2);
  g.moveTo(ax - 11, ay);
  g.lineTo(ax + 11, ay);
  g.moveTo(ax, ay - 11);
  g.lineTo(ax, ay + 11);
  g.stroke();
  // crossing (projected)
  const [cx, cy] = toPx(s.crossing.x, Math.max(0, s.crossing.y));
  g.fillStyle = s.outcome === 'goal' ? '#3ddc8f' : '#ff5d5d';
  g.beginPath();
  g.arc(cx, cy, Math.max(4, 0.11 * sc), 0, Math.PI * 2);
  g.fill();
  if (s.contactMark) {
    const [mx, my] = toPx(s.contactMark.x, s.contactMark.y);
    g.strokeStyle = s.contactMark.kind === 'keeper' ? '#6cb8ff' : '#ffffff';
    g.lineWidth = 2.5;
    g.beginPath();
    g.moveTo(mx - 6, my - 6);
    g.lineTo(mx + 6, my + 6);
    g.moveTo(mx + 6, my - 6);
    g.lineTo(mx - 6, my + 6);
    g.stroke();
  }
  g.fillStyle = '#93a1b5';
  g.font = '600 11px Archivo, sans-serif';
  g.fillText(s.contactMark?.kind === 'keeper' ? '✕ defesa   ● direção da bola   ⊕ mira' : '● cruzamento   ⊕ mira', 8, 14);
}

export function drawBallContact(c: HTMLCanvasElement, off: { x: number; y: number }): void {
  const g = c.getContext('2d')!;
  const W = c.width;
  const r = W / 2 - 6;
  g.clearRect(0, 0, W, W);
  const grd = g.createRadialGradient(W * 0.4, W * 0.36, 2, W / 2, W / 2, r);
  grd.addColorStop(0, '#ffffff');
  grd.addColorStop(1, '#9aa3ad');
  g.fillStyle = grd;
  g.beginPath();
  g.arc(W / 2, W / 2, r, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = 'rgba(0,0,0,0.25)';
  g.beginPath();
  g.moveTo(W / 2, 6);
  g.lineTo(W / 2, W - 6);
  g.moveTo(6, W / 2);
  g.lineTo(W - 6, W / 2);
  g.stroke();
  const px = W / 2 + (off.x / 0.11) * r;
  const py = W / 2 - (off.y / 0.11) * r;
  g.fillStyle = '#c98d12';
  g.beginPath();
  g.arc(px, py, 5.5, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#0b1018';
  g.font = '700 9px Archivo, sans-serif';
  g.textAlign = 'center';
  g.fillText('CONTATO', W / 2, W - 2);
}

function drawShotMap(c: HTMLCanvasElement, shots: ShotRecord[]): void {
  const g = c.getContext('2d')!;
  const { toPx } = goalFrame(g, c.width, c.height, 1.2);
  for (const s of shots) {
    const [x, y] = toPx(s.x, Math.max(0, Math.min(3.4, s.y)));
    g.fillStyle = s.outcome === 'goal' ? 'rgba(61,220,143,0.75)' : s.outcome === 'saved' ? 'rgba(108,184,255,0.75)' : 'rgba(255,93,93,0.75)';
    g.beginPath();
    g.arc(x, y, 4, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#93a1b5';
  g.font = '600 13px Archivo, sans-serif';
  g.fillText('● gol   ● defesa   ● fora/trave', 10, 18);
  if (!shots.length) {
    g.fillText('Sem cobranças registradas', c.width / 2 - 80, c.height / 2);
  }
}

function drawPrecisionChart(c: HTMLCanvasElement, shots: ShotRecord[]): void {
  const g = c.getContext('2d')!;
  const W = c.width;
  const H = c.height;
  g.clearRect(0, 0, W, H);
  const pts: number[] = [];
  for (let i = 9; i < shots.length; i++) {
    let s = 0;
    for (let k = i - 9; k <= i; k++) s += Math.min(300, shots[k].precision);
    pts.push(s / 10);
  }
  const pad = 34;
  const maxV = Math.max(60, ...pts) * 1.1;
  g.strokeStyle = 'rgba(255,255,255,0.08)';
  g.fillStyle = '#93a1b5';
  g.font = '600 12px Archivo, sans-serif';
  for (let i = 0; i <= 4; i++) {
    const v = (maxV * i) / 4;
    const y = H - pad - ((H - 2 * pad) * i) / 4;
    g.beginPath();
    g.moveTo(pad, y);
    g.lineTo(W - 10, y);
    g.stroke();
    g.fillText(String(Math.round(v)), 4, y + 4);
  }
  if (pts.length < 2) {
    g.fillText('Faça pelo menos 11 cobranças', W / 2 - 90, H / 2);
    return;
  }
  const X = (i: number) => pad + ((W - pad - 10) * i) / (pts.length - 1);
  const Y = (v: number) => H - pad - ((H - 2 * pad) * v) / maxV;
  g.beginPath();
  g.moveTo(X(0), Y(pts[0]));
  pts.forEach((v, i) => g.lineTo(X(i), Y(v)));
  g.lineTo(X(pts.length - 1), H - pad);
  g.lineTo(X(0), H - pad);
  g.closePath();
  g.fillStyle = 'rgba(242,182,54,0.12)';
  g.fill();
  g.beginPath();
  pts.forEach((v, i) => (i ? g.lineTo(X(i), Y(v)) : g.moveTo(X(i), Y(v))));
  g.strokeStyle = '#f2b636';
  g.lineWidth = 2;
  g.stroke();
  g.fillStyle = '#f2b636';
  g.beginPath();
  g.arc(X(pts.length - 1), Y(pts[pts.length - 1]), 4, 0, Math.PI * 2);
  g.fill();
}

export type { CareerState };
