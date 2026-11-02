// GameCore: deterministic, fixed-step game simulation shared by the browser game and the headless
// tests. Owns the physics world, the two player controllers, the referee and the score, and runs
// the serve → rally → point flow for every mode.
import { V3, makeRng } from '../physics/math.js';
import { World } from '../physics/world.js';
import { PHYSICS_DT, TABLE_HALF_L, TABLE_HALF_W } from '../physics/constants.js';
import { Referee, MatchScore } from './rules.js';
import { topspinOf } from '../ai/shotSolver.js';

export const MODES = {
  match: { label: 'Partida contra IA', scored: true },
  pro: { label: 'Modo profissional', scored: true },
  versus: { label: '2 jogadores', scored: true },
  rally: { label: 'Rally infinito', scored: false },
  free: { label: 'Treino livre', scored: false },
  precision: { label: 'Desafio de precisão', scored: false },
};

export class GameCore {
  constructor(opts = {}) {
    this.mode = opts.mode || 'match';
    this.world = opts.world || new World();
    this.controllers = [null, null];
    this.referee = new Referee();
    this.referee.strictToss = this.mode === 'pro';
    this.score = new MatchScore({ bestOf: opts.bestOf ?? (this.mode === 'pro' ? 5 : 3), firstServer: opts.firstServer ?? 0 });
    this.time = 0;
    this.phase = 'idle';
    this.phaseUntil = 0;
    this.listeners = {};
    this.rng = makeRng(opts.seed ?? 99);
    this.stats = this.newStats();
    this.lastShot = null;
    this.rallyHits = 0;
    this.bestRally = 0;
    this.stillTime = 0;
    this.lastContactTime = 0;
    this.training = null;
    this.world.on((ev) => this.onContact(ev));
    this.referee.onDecision((d) => this.onDecision(d));
  }
  newStats() {
    return { points: [0, 0], longestRally: 0, fastest: [0, 0], shots: [0, 0], winners: [0, 0], errors: [0, 0], speedSum: [0, 0] };
  }
  on(name, fn) { (this.listeners[name] ||= []).push(fn); }
  emit(name, data) { const l = this.listeners[name]; if (l) for (const fn of l) fn(data); }

  setControllers(c0, c1) {
    this.controllers = [c0, c1];
    for (const c of this.controllers) if (c) c.onToss = (i) => this.onToss(i);
  }

  start() {
    this.time = 0;
    this.stats = this.newStats();
    this.rallyHits = 0;
    for (const c of this.controllers) c?.reset?.();
    if (this.mode === 'free' || this.mode === 'precision') this.startTraining();
    else this.startPoint();
  }

  // ——— Serve / point flow ———
  get server() { return this.mode === 'rally' ? 0 : this.score.server; }

  startPoint() {
    const s = this.server;
    this.phase = 'serve';
    this.rallyHits = 0;
    this.stillTime = 0;
    this.lastContactTime = this.time;
    this.referee.startServe(s);
    this.controllers[1 - s]?.cancel?.();
    this.controllers[1 - s]?.prepareReceive?.(this.time);
    this.controllers[s]?.startServe(this.time);
    this.emit('serve', { server: s });
  }
  onToss(i) {
    if (this.phase !== 'serve') return;
    this.referee.toss(this.time);
    this.lastContactTime = this.time;
    this.emit('toss', { index: i });
  }

  onDecision(d) {
    this.phase = 'pointOver';
    this.phaseUntil = this.time + (d.let ? 1.3 : 1.9);
    const rally = this.rallyHits;
    this.stats.longestRally = Math.max(this.stats.longestRally, rally);
    if (this.mode === 'rally') {
      this.bestRally = Math.max(this.bestRally, rally);
      this.emit('rallyEnd', { hits: rally, reason: d.reason });
      return;
    }
    let result = null;
    if (!d.let) {
      this.stats.points[d.winner]++;
      const lastHitter = this.referee.lastHitter;
      if (lastHitter === d.winner && this.referee.bounces[1 - d.winner] >= 1) this.stats.winners[d.winner]++;
      else this.stats.errors[1 - d.winner]++;
      result = this.score.pointWon(d.winner);
    }
    // adaptation: did the human (index 0) handle the AI's last ball?
    const ai = this.controllers[1];
    if (ai?.model && !d.let) ai.model.result(!(d.winner === 1 && this.referee.lastHitter === 1));
    this.emit('point', { ...d, result, score: this.score });
  }

  update(frameDt) {
    // fixed-step physics; returns number of steps run
    let n = 0;
    this.acc = (this.acc || 0) + Math.min(frameDt, 0.1);
    while (this.acc >= PHYSICS_DT) { this.step(PHYSICS_DT); this.acc -= PHYSICS_DT; n++; }
    return n;
  }

  step(dt) {
    const w = this.world;
    this.time += dt;
    for (const pd of w.paddles) pd.beginStep();
    for (const c of this.controllers) c?.update(dt, this.time);
    for (const pd of w.paddles) pd.endStep(dt);
    w.step(dt);

    // stalled ball (rolling on the table, stuck on the net…)
    if (w.ballActive && (this.phase === 'serve' || this.phase === 'rally')) {
      if (w.ball.v.length() < 0.08) this.stillTime += dt; else this.stillTime = 0;
      if (this.stillTime > 0.8 || this.time - this.lastContactTime > 6) {
        this.stillTime = 0;
        this.referee.stalled(w.ball.p);
      }
    }
    if (this.phase === 'pointOver' && this.time >= this.phaseUntil) {
      if (this.score.over && this.mode !== 'rally') { this.phase = 'matchOver'; this.emit('matchOver', { winner: this.score.winner, score: this.score, stats: this.stats }); }
      else this.startPoint();
    }
    if (this.training) this.stepTraining(dt);
  }

  onContact(ev) {
    this.lastContactTime = this.time;
    const w = this.world;
    if (ev.type === 'paddle') {
      const isServe = this.referee.phase === 'tossed';
      const speed = ev.vOut.length();
      const top = topspinOf(ev.vOut, ev.wOut);
      this.lastShot = { index: ev.index, speed, kmh: speed * 3.6, top, rps: top / (2 * Math.PI), side: ev.wOut.y / (2 * Math.PI), part: ev.part };
      if (this.phase === 'serve' || this.phase === 'rally') {
        this.rallyHits++;
        this.stats.shots[ev.index]++;
        this.stats.speedSum[ev.index] += speed;
        this.stats.fastest[ev.index] = Math.max(this.stats.fastest[ev.index], speed);
      }
      // AI learns from the human's strokes
      const ai = this.controllers[1];
      if (ev.index === 0 && ai?.model) ai.model.shot(speed, top, Math.max(0, ev.pos.z - TABLE_HALF_L));
      this.referee.event(ev, w.ball.p);
      if (this.phase === 'serve' || this.phase === 'rally') this.phase = this.referee.phase === 'serve' ? 'serve' : 'rally';
      for (const c of this.controllers) c?.onPaddleHit?.(ev, this.time, isServe);
      if (this.training) this.trainingHit(ev);
      this.emit('shot', this.lastShot);
    } else {
      this.referee.event(ev, w.ball.p);
      if (ev.type === 'table') for (const c of this.controllers) c?.onBounce?.(ev, this.time);
      if (ev.type === 'net') for (const c of this.controllers) c?.onNet?.(this.time);
      if (this.training) this.trainingContact(ev);
    }
    this.emit('contact', ev);
  }

  // ——— Training modes (ball machine on side 1) ———
  startTraining() {
    this.phase = 'training';
    this.training = {
      state: 'wait', nextFeed: this.time + 1.2, balls: 0, returned: 0, good: 0, score: 0, combo: 0,
      maxBalls: this.mode === 'precision' ? 20 : Infinity, target: null, awaiting: false, done: false,
    };
    if (this.mode === 'precision') this.newTarget();
    this.emit('training', this.training);
  }
  newTarget() {
    const r = this.rng;
    const t = this.training;
    const sizes = [0.22, 0.17, 0.13];
    const size = sizes[Math.min(2, Math.floor(t.balls / 7))];
    t.target = { x: (r() - 0.5) * 2 * (TABLE_HALF_W - size - 0.04), z: -(0.35 + r() * (TABLE_HALF_L - 0.45 - size)), r: size };
    this.emit('target', t.target);
  }
  stepTraining() {
    const t = this.training;
    if (t.done) return;
    if (t.state === 'wait' && this.time >= t.nextFeed) {
      if (t.balls >= t.maxBalls) { t.done = true; this.phase = 'matchOver'; this.emit('trainingOver', t); return; }
      const robot = this.controllers[1];
      if (robot?.feed) { robot.feed(this.time); t.balls++; t.state = 'flight'; t.awaiting = true; t.hitByPlayer = false; t.feedTime = this.time; }
    }
    if (t.state === 'flight' && this.time - t.feedTime > 3.5) this.finishBall(false);
  }
  trainingHit(ev) {
    const t = this.training;
    if (ev.index === 0 && t.state === 'flight') { t.hitByPlayer = true; }
  }
  trainingContact(ev) {
    const t = this.training;
    if (t.state !== 'flight') return;
    if (!t.hitByPlayer) {
      if (ev.type === 'floor') this.finishBall(false, 'Sem devolução');
      return;
    }
    if (ev.type === 'table') {
      if (ev.side === 1) {
        let pts = 1, hitTarget = false;
        if (t.target) {
          const d = Math.hypot(ev.pos.x - t.target.x, ev.pos.z - t.target.z);
          hitTarget = d <= t.target.r;
          pts = hitTarget ? Math.round(100 * (1 - 0.5 * d / t.target.r)) : (d < t.target.r * 2.2 ? 20 : 5);
        }
        this.finishBall(true, null, { pos: ev.pos, pts, hitTarget });
      } else this.finishBall(false, 'Bola do próprio lado');
    } else if (ev.type === 'floor' || ev.type === 'tableSide') this.finishBall(false, 'Fora');
  }
  finishBall(ok, reason, info = {}) {
    const t = this.training;
    if (t.state !== 'flight') return;
    t.state = 'wait';
    t.nextFeed = this.time + (this.controllers[1]?.interval ?? 1.8);
    if (ok) {
      t.returned++;
      if (t.target) {
        if (info.hitTarget) { t.combo++; t.good++; } else t.combo = 0;
        t.score += Math.round(info.pts * (1 + Math.min(t.combo, 5) * 0.2));
      } else t.score++;
    } else t.combo = 0;
    this.emit('trainingBall', { ok, reason, ...info, training: t, shot: this.lastShot });
    if (t.target && ok) this.newTarget();
  }
}

export { V3 };
