// AI opponent. It reads the ball (with level-dependent spin-reading error), predicts the trajectory
// with the physics engine, picks a contact point it can reach, chooses a stroke and a target,
// solves the racket angle/speed with the inverse impact model and then physically swings its
// racket. Human-like errors (reaction time, footwork speed, angle/speed/timing noise, misread spin)
// make it miss sometimes; the ball itself is never scripted.
import { V3, Quat, clamp, lerp, makeRng, smoothstep } from '../physics/math.js';
import { BallState, integrateBall } from '../physics/ball.js';
import {
  MATERIALS, TABLE_HALF_L as HL, TABLE_HALF_W as HW, TABLE_HEIGHT, BALL_RADIUS as R, PADDLE_HALF_THICK,
} from '../physics/constants.js';
import { simulate } from '../physics/world.js';
import { solveLaunch, solveLaunchAdaptive, solveImpact, topspinOf } from './shotSolver.js';
import { predict, hittableWindow, Trajectory } from '../game/prediction.js';
import { paddleQuatFromNormal, naturalTip, aimNormal } from '../game/paddlePose.js';

const DEG = Math.PI / 180;
const RPS = 2 * Math.PI;

export const LEVELS = {
  beginner: {
    label: 'Iniciante', reaction: 0.30, move: 2.2, reach: 0.62, angleErr: 3.1 * DEG, speedErr: 0.09, timingErr: 0.006,
    spinRead: 0.45, power: 0.55, spin: 0.5, margin: 0.24, minClear: 0.10, aggression: 0.1, exploit: 0.0, contactPhase: 0.75,
  },
  intermediate: {
    label: 'Intermediário', reaction: 0.23, move: 2.9, reach: 0.72, angleErr: 2.0 * DEG, speedErr: 0.06, timingErr: 0.0045,
    spinRead: 0.28, power: 0.72, spin: 0.72, margin: 0.17, minClear: 0.07, aggression: 0.3, exploit: 0.35, contactPhase: 0.55,
  },
  advanced: {
    label: 'Avançado', reaction: 0.17, move: 3.6, reach: 0.82, angleErr: 1.3 * DEG, speedErr: 0.04, timingErr: 0.003,
    spinRead: 0.14, power: 0.88, spin: 0.9, margin: 0.11, minClear: 0.05, aggression: 0.55, exploit: 0.65, contactPhase: 0.4,
  },
  pro: {
    label: 'Profissional', reaction: 0.13, move: 4.3, reach: 0.9, angleErr: 0.85 * DEG, speedErr: 0.025, timingErr: 0.002,
    spinRead: 0.06, power: 1.0, spin: 1.0, margin: 0.075, minClear: 0.035, aggression: 0.8, exploit: 0.9, contactPhase: 0.3,
  },
};

const _tmp = new V3(), _tmp2 = new V3(), _q = new Quat();
const sample = () => ({ t: 0, p: new V3(), v: new V3(), w: new V3(), b0: 0, b1: 0, flags: 0 });

export class AIController {
  constructor(world, index, level = 'intermediate', opts = {}) {
    this.world = world;
    this.index = index;
    this.side = index === 0 ? 1 : -1;     // z sign of this player's half
    this.rightX = this.side;              // x direction of the player's right hand
    this.pd = world.paddles[index];
    this.rng = makeRng(opts.seed ?? ((Math.random() * 1e9) | 0));
    this.coop = !!opts.coop;
    this.model = opts.model || null;
    this.traj = new Trajectory();
    this.pos = new V3(); this.vel = new V3(); this.quat = new Quat();
    this.body = new V3();
    this.readyQuat = new Quat();
    this.onToss = null;
    this.setLevel(level);
    this.reset();
  }
  setLevel(level) { this.levelName = level; this.lv = LEVELS[level] || LEVELS.intermediate; }

  reset() {
    this.plan = null; this.pendingPlanAt = -1; this.serve = null;
    this.needBounce = 1; this.otherNeed = 0;
    this.pos.set(0, 0.98, this.side * (HL + 0.5));
    this.vel.set(0, 0, 0);
    this.computeReadyQuat(0);
    this.quat.copy(this.readyQuat);
    this.body.set(this.pos.x, 0, this.pos.z + this.side * 0.35);
    this.pd.teleport(this.pos, this.quat);
  }

  computeReadyQuat(x) {
    const forehand = x * this.rightX > -0.05;
    const n = aimNormal(this.side, 0.15, 0, _tmp);
    paddleQuatFromNormal(n, forehand ? 1 : -1, naturalTip(this.side, forehand, _tmp2, 0.9), this.readyQuat);
  }

  // ——— Events from the game ———
  onPaddleHit(ev, t, isServe) {
    if (ev.index === this.index) {
      if (this.plan) this.plan.hit = true;
      // follow-through must not chase the ball: cap the racket speed along the ball's path
      // and pull the racket slightly back from the contact
      const d = ev.vOut.clone(), sp = d.length();
      if (sp > 0.1) {
        d.scale(1 / sp);
        const comp = this.vel.dot(d);
        if (comp > 0.55 * sp) this.vel.addScaled(d, 0.55 * sp - comp);
      }
      this.vel.addScaled(ev.normal, -0.8);
      if (this.model && this.plan?.zone) this.model.attempt(this.plan.zone);
      this.serve = null;
      return;
    }
    this.plan = null;
    this.pendingPlanAt = t + this.lv.reaction * (0.85 + 0.3 * this.rng());
    this.needBounce = 1;
    this.otherNeed = isServe ? 1 : 0;
  }
  onNet(t) {
    // the net changes the path unpredictably: look again
    if (this.plan && !this.plan.hit) { this.plan = null; this.pendingPlanAt = t + 0.06; }
  }
  onBounce(ev, t) {
    if (ev.side === this.index && this.otherNeed === 0 && this.needBounce === 1) this.needBounce = 0;
    else if (ev.side !== this.index && this.otherNeed === 1) this.otherNeed = 0;
  }
  cancel() { this.plan = null; this.pendingPlanAt = -1; this.serve = null; }

  // ——— Main update, called every physics step ———
  update(dt, t) {
    const ball = this.world.ball;
    if (this.pendingPlanAt > 0 && t >= this.pendingPlanAt) {
      this.pendingPlanAt = -1;
      if (this.world.ballActive) this.makePlan(t, ball, this.lv.spinRead);
    }
    if (this.plan && !this.plan.refined && !this.plan.serve && t >= this.plan.refineAt && this.world.ballActive) {
      this.refinePlan(t, ball);
    }
    if (this.serve) this.updateServe(t);
    this.move(dt, t);
    this.pd.pos.copy(this.pos);
    this.pd.quat.copy(this.quat);
  }

  // ——— Rally planning ———
  perceive(ball, spinErr) {
    const s = new BallState().copy(ball);
    const k = 1 + this.rng.gauss() * spinErr;
    s.w.scale(k);
    s.w.y += this.rng.gauss() * spinErr * 40;
    return s;
  }

  makePlan(t, ball, spinErr) {
    const perceived = this.perceive(ball, spinErr);
    predict(perceived, this.traj, 2.2, 0.002);
    const win = hittableWindow(this.traj, this.index, this.needBounce, this.otherNeed);
    if (!win) { this.plan = null; return; }
    const tr = this.traj, s = this.side, lv = this.lv;
    // Valid contact region: above table height, not too far behind the table
    const cand = [];
    let peakY = -1;
    for (let i = win.start; i <= win.end; i += 2) {
      const y = tr.py(i), zr = s * tr.pz(i);
      if (y < TABLE_HEIGHT + 0.06 || y > 1.75) continue;
      if (zr < HL - 0.35 || zr > HL + 1.6) continue;
      if (Math.abs(tr.px(i)) > HW + 0.9) continue;
      cand.push(i);
      peakY = Math.max(peakY, y);
    }
    if (!cand.length) { this.plan = null; return; }
    // pick the contact sample: preferred phase, comfortable height, reachable in time
    let best = -1, bestScore = -Infinity, bestShort = Infinity, bestShortI = cand[0];
    const n = cand.length;
    for (let k = 0; k < n; k++) {
      const i = cand[k];
      const tRel = tr.t(i);
      const phase = n > 1 ? k / (n - 1) : 0.5;
      const dx = tr.px(i) - this.pos.x, dz = tr.pz(i) - this.pos.z;
      const need = Math.hypot(dx, dz) - lv.reach;
      const avail = lv.move * Math.max(0, tRel - 0.12);
      const shortfall = need - avail;
      const y = tr.py(i);
      const comfort = -Math.abs(y - Math.min(peakY, TABLE_HEIGHT + 0.32)) * 2.5;
      const score = -Math.abs(phase - lv.contactPhase) * 1.5 + comfort - Math.max(0, shortfall) * 10;
      if (score > bestScore && shortfall <= 0) { bestScore = score; best = i; }
      if (shortfall < bestShort) { bestShort = shortfall; bestShortI = i; }
    }
    const stretch = best < 0;
    if (stretch) best = bestShortI;
    const bc = tr.get(best, sample());
    this.buildPlan(t, bc, { stretch, spinErr });
  }

  refinePlan(t, ball) {
    const old = this.plan;
    const perceived = this.perceive(ball, this.lv.spinRead * 0.35);
    predict(perceived, this.traj, Math.max(0.05, old.ballTc - t + 0.1), 0.002);
    // the sample at the same contact time
    let idx = -1, bestD = Infinity;
    for (let i = 0; i < this.traj.count; i++) {
      const d = Math.abs(t + this.traj.t(i) - old.ballTc);
      if (d < bestD) { bestD = d; idx = i; }
    }
    if (idx < 0) { old.refined = true; return; }
    const bc = this.traj.get(idx, sample());
    this.buildPlan(t, bc, { stretch: old.stretch, keep: old });
  }

  chooseShot(bc) {
    const lv = this.lv, rng = this.rng, m = this.model;
    const h = bc.p.y - TABLE_HEIGHT;
    const depth = this.side * bc.p.z - HL;
    const vin = bc.v.length();
    const topIn = topspinOf(bc.v, bc.w);
    let kind;
    if (this.coop) kind = 'drive';
    else if (h > 0.3 && depth < 1.0 && rng() < 0.3 + lv.aggression * 0.6) kind = 'smash';
    else if (topIn < -90 && h < 0.17 && depth < 0.4 && rng() > lv.aggression * 0.7) kind = 'push';
    else if (topIn < -40) kind = 'loop';
    else if (vin > 11 && topIn > 110) kind = rng() < 0.6 ? 'block' : 'counter';
    else if (depth > 1.25 && rng() < 0.35) kind = 'chop';
    else kind = rng() < 0.4 + lv.aggression * 0.4 ? 'loop' : 'drive';
    if (m && !this.coop && lv.exploit > 0) {
      if (m.topShare > 0.45 && kind === 'drive' && rng() < lv.exploit * 0.5) kind = 'block';
      if (m.backShare > 0.4 && kind === 'push' && rng() < lv.exploit * 0.6) kind = 'loop';
    }
    const P = lv.power, S = lv.spin, r = rng();
    let speed, top;
    switch (kind) {
      case 'smash': speed = 15 + 8 * P * r; top = 10 + 12 * rng(); break;
      case 'loop': speed = 8.5 + 5 * P * r; top = 30 + 35 * S * rng(); break;
      case 'counter': speed = 10 + 4 * P * r; top = 20 + 15 * rng(); break;
      case 'block': speed = Math.max(6, 0.5 * vin); top = 5 + 10 * rng(); break;
      case 'push': speed = 4.2 + 1.5 * r; top = -(18 + 25 * S * rng()); break;
      case 'chop': speed = 6.5 + 1.5 * r; top = -(28 + 25 * S * rng()); break;
      default: speed = 8.5 + 4 * P * r; top = 15 + 18 * S * rng();
    }
    if (this.coop) { speed = 7.2 + rng() * 1.2; top = 18 + rng() * 8; }
    const side = !this.coop && rng() < 0.3 ? (rng() < 0.5 ? -1 : 1) * (5 + 15 * rng()) : 0;
    return { kind, speed, top: top * RPS, side: side * RPS };
  }

  chooseTarget(shot) {
    const lv = this.lv, rng = this.rng, opp = -this.side, oppRight = -this.rightX;
    const margin = lv.margin;
    if (this.coop) return { x: (rng() - 0.5) * 0.3, z: opp * (0.85 + rng() * 0.2), zone: null };
    let zone = this.model ? this.model.pickZone(rng, lv.exploit) : ['fh', 'bh', 'mid'][(rng() * 3) | 0] + (rng() < 0.5 ? '-short' : '-long');
    let [wing, depth] = zone.split('-');
    if (shot.kind === 'push' && rng() < 0.6) depth = 'short';
    if (shot.kind === 'smash' || shot.kind === 'loop') depth = rng() < 0.85 ? 'long' : depth;
    zone = `${wing}-${depth}`;
    const wide = HW - margin;
    let x = wing === 'fh' ? oppRight * (wide - rng() * 0.3) : wing === 'bh' ? -oppRight * (wide - rng() * 0.3) : oppRight * (0.1 + (rng() - 0.5) * 0.2);
    let zz = depth === 'short' ? 0.32 + rng() * 0.35 : HL - margin - rng() * 0.35;
    x = clamp(x, -wide, wide);
    zz = clamp(zz, 0.28, HL - margin);
    return { x, z: opp * zz, zone };
  }

  buildPlan(t, bc, opts) {
    const lv = this.lv, rng = this.rng;
    const keep = opts.keep;
    const shot = keep ? keep.shot : this.chooseShot(bc);
    const target = keep ? keep.target : this.chooseTarget(shot);
    const forehand = keep ? keep.face > 0 : bc.p.x * this.rightX > -0.12 - lv.aggression * 0.12;
    const mat = forehand ? MATERIALS.rubberFH : MATERIALS.rubberBH;
    let sol = solveLaunchAdaptive(bc.p, shot.speed, shot.top, shot.side, target.x, target.z, { minClear: lv.minClear });
    if (!sol) sol = solveLaunchAdaptive(bc.p, 6, 15 * RPS, 0, 0, -this.side * 0.9, { minClear: 0.04, factors: [1, 0.8, 0.6, 0.45, 0.35] });
    let imp = null;
    if (sol) {
      imp = solveImpact(bc.v, bc.w, sol.v, sol.w, mat);
      if (imp && imp.limited) {
        const top2 = topspinOf(sol.v, imp.wOut);
        const sol2 = solveLaunch(bc.p, sol.v.length(), top2, imp.wOut.y, target.x, target.z, { minClear: lv.minClear });
        if (sol2) { const imp2 = solveImpact(bc.v, bc.w, sol2.v, sol2.w, mat); if (imp2) { imp = imp2; sol = sol2; } }
      }
    }
    let n, u;
    if (imp && imp.u.length() < 26 && imp.approach > 0.2) { n = imp.n.clone(); u = imp.u.clone(); }
    else {
      // emergency block: face the centre of the other half
      n = aimNormal(this.side, -0.1, 0, new V3());
      u = n.clone().scale(1.5);
    }
    // ——— human-like execution errors ———
    const topIn = Math.abs(topspinOf(bc.v, bc.w));
    let stress = 1 + 0.045 * Math.max(0, bc.v.length() - 8) + 0.0025 * Math.max(0, topIn - 150);
    if (opts.stretch) stress += 1.4;
    if (shot.kind === 'smash') stress += 0.5;
    if (this.coop) stress *= 0.3;
    if (opts.serve) stress *= 0.6;
    if (!keep) {
      this.errAxis = new V3(rng.gauss(), rng.gauss(), rng.gauss());
      this.errAng = rng.gauss() * lv.angleErr * stress;
      this.errSpeed = rng.gauss() * lv.speedErr * stress;
      this.errTime = rng.gauss() * lv.timingErr * stress;
    }
    const ax = this.errAxis.clone().addScaled(n, -this.errAxis.dot(n)).normalize();
    if (ax.lengthSq() > 0.5) { _q.setFromAxisAngle(ax, this.errAng); n.applyQuat(_q); }
    u.scale(1 + this.errSpeed);

    const pc = bc.p.clone().addScaled(n, -(PADDLE_HALF_THICK + R));
    const quat = paddleQuatFromNormal(n, forehand ? 1 : -1, naturalTip(this.side, forehand, new V3(), shot.top < 0 ? 0.9 : 0.5));
    const T = clamp(0.1 + 0.011 * u.length(), 0.12, 0.27);
    const tc = t + bc.t + this.errTime;
    const plan = {
      ballTc: t + bc.t, tc, pc, u, n, quat, face: forehand ? 1 : -1, T, shot, target, zone: target.zone,
      stretch: opts.stretch, serve: !!opts.serve, hit: false,
      refineAt: t + bc.t - 0.2, refined: !!keep || bc.t < 0.26,
      anchored: false, ts: tc - T,
    };
    if (keep && keep.anchored) {
      // re-anchor the swing from the current racket state to keep the motion continuous
      plan.anchored = true; plan.ts = t; plan.p0 = this.pos.clone(); plan.v0 = this.vel.clone(); plan.q0 = this.quat.clone();
    }
    this.plan = plan;
  }

  // ——— Serve ———
  startServe(t) {
    this.plan = null; this.pendingPlanAt = -1;
    const stance = this.side * 0.0 + this.rightX * (-0.35 + this.rng() * 0.5);
    this.serve = { phase: 'hold', tossAt: t + 1.0 + this.rng() * 0.7, stance };
  }
  handPos(out) {
    return out.set(clamp(this.pos.x - this.rightX * 0.3, -HW + 0.05, HW - 0.05), TABLE_HEIGHT + 0.2, this.side * (HL + 0.14));
  }
  updateServe(t) {
    const sv = this.serve;
    if (sv.phase === 'hold') {
      this.world.holdBall(this.handPos(_tmp));
      if (t >= sv.tossAt) {
        const vy = 2.3 + this.rng() * 0.25;
        const hp = this.handPos(new V3());
        this.world.launchBall(hp, new V3(0, vy, 0), new V3());
        sv.phase = 'tossed';
        if (this.onToss) this.onToss(this.index);
        this.planServe(t, hp, vy);
      }
    }
  }
  planServe(t, hp, vy) {
    const lv = this.lv, rng = this.rng, s = this.side;
    // when does the tossed ball come down to the contact height?
    const st = new BallState(); st.p.copy(hp); st.v.set(0, vy, 0);
    const yc = TABLE_HEIGHT + 0.22 + rng() * 0.07;
    let tc = 0;
    for (; tc < 1.5; tc += 0.001) { integrateBall(st, 0.001); if (st.v.y < 0 && st.p.y <= yc) break; }
    const bc = { t: tc, p: st.p.clone(), v: st.v.clone(), w: new V3() };
    const types = this.coop ? ['long-top'] : ['short-back', 'long-top', 'side', 'short-back', 'fast-long'];
    let type = types[(rng() * types.length) | 0];
    if (this.levelName === 'beginner' && type === 'fast-long') type = 'long-top';
    const S = lv.spin;
    const cfg = {
      'short-back': { sp: 3.6, top: -(25 + 25 * S * rng()), side: 0, z1: 1.12, z2: 0.5 },
      'long-top': { sp: 5.4, top: 20 + 15 * rng(), side: 0, z1: 1.2, z2: 1.1 },
      side: { sp: 4.4, top: -10, side: (rng() < 0.5 ? -1 : 1) * (25 + 20 * S * rng()), z1: 1.12, z2: 0.85 },
      'fast-long': { sp: 6.6, top: 15 + 10 * rng(), side: 0, z1: 1.25, z2: 1.2 },
    }[type];
    const oppRight = -this.rightX;
    const x2 = this.coop ? 0 : (rng() < 0.5 ? oppRight : -oppRight) * (0.15 + rng() * 0.4);
    const x1 = lerp(bc.p.x, x2, 0.35);
    let best = null, bestScore = Infinity;
    for (const f of [0.8, 0.9, 1, 1.1, 1.2, 1.32, 1.45, 1.6]) {
      for (const z1f of [1, 0.92, 1.06, 0.84, 0.76]) {
        const sol = solveLaunch(bc.p, cfg.sp * f, cfg.top * RPS, cfg.side * RPS, x1, s * clamp(cfg.z1 * z1f, 0.3, HL - 0.06), { sameSide: true });
        if (!sol) continue;
        const res = this.checkServe(bc.p, sol.v, sol.w);
        if (!res) continue;
        const score = Math.abs(Math.abs(res.z2) - cfg.z2) + 0.5 * Math.abs(res.x2 - x2) + (res.clear < 0.03 ? 1 : 0);
        if (score < bestScore) { bestScore = score; best = sol; }
      }
      if (best && bestScore < 0.15) break;
    }
    if (!best) { this.serve.failed = true; return; }
    const imp = solveImpact(bc.v, bc.w, best.v, best.w, MATERIALS.rubberFH);
    if (!imp) return;
    const plan0 = { stretch: false, serve: true };
    // fake a kept shot so buildPlan uses our solved values
    this.plan = null;
    const n = imp.n.clone(), u = imp.u.clone();
    this.errAxis = new V3(rng.gauss(), rng.gauss(), rng.gauss());
    const errAng = rng.gauss() * lv.angleErr * 0.5 * (this.coop ? 0.3 : 1);
    const ax = this.errAxis.addScaled(n, -this.errAxis.dot(n)).normalize();
    _q.setFromAxisAngle(ax, errAng); n.applyQuat(_q);
    u.scale(1 + rng.gauss() * lv.speedErr * 0.4);
    const pc = bc.p.clone().addScaled(n, -(PADDLE_HALF_THICK + R));
    const quat = paddleQuatFromNormal(n, 1, naturalTip(this.side, true, new V3(), 0.35));
    const T = clamp(0.12 + 0.01 * u.length(), 0.14, 0.22);
    this.plan = {
      ballTc: t + bc.t, tc: t + bc.t, pc, u, n, quat, face: 1, T, shot: { kind: type }, target: { x: x2, z: -s * cfg.z2 },
      zone: null, stretch: false, serve: true, hit: false, refined: true, anchored: false, ts: t + bc.t - T, ...plan0,
    };
  }
  checkServe(p, v, w) {
    const st = new BallState(); st.p.copy(p); st.v.copy(v); st.w.copy(w);
    const bounces = [];
    let net = false, floor = false, clear = Infinity, pz = p.z, py = p.y;
    simulate(st, 2, 0.002, (t, s2) => {
      if (Math.sign(s2.p.z) !== Math.sign(pz)) clear = Math.min(clear, (py + s2.p.y) / 2 - R - (TABLE_HEIGHT + 0.1525));
      pz = s2.p.z; py = s2.p.y;
    }, (ev) => {
      if (ev.type === 'table') bounces.push({ side: ev.side, x: ev.pos.x, z: ev.pos.z });
      else if (ev.type === 'net') net = true;
      else if (ev.type === 'floor' || ev.type === 'tableSide') floor = true;
      return bounces.length >= 2 || floor;
    });
    if (net || bounces.length < 2) return null;
    if (bounces[0].side !== this.index || bounces[1].side === this.index) return null;
    const b = bounces[1];
    if (Math.abs(b.x) > HW - 0.04 || Math.abs(b.z) > HL - 0.04) return null;
    if (clear < 0.015) return null;
    return { x2: b.x, z2: b.z, clear };
  }

  // ——— Racket motion ———
  approach(target, dt, maxSpeed, omega = 14) {
    _tmp.subVectors(target, this.pos).scale(omega * omega).addScaled(this.vel, -2 * omega);
    this.vel.addScaled(_tmp, dt);
    const sp = this.vel.length();
    if (sp > maxSpeed) this.vel.scale(maxSpeed / sp);
    this.pos.addScaled(this.vel, dt);
  }

  move(dt, t) {
    const p = this.plan, lv = this.lv;
    if (p && !p.hit && t < p.ts) {
      // footwork + backswing preparation
      const prep = _tmp2.copy(p.pc).addScaled(p.u, -p.T * 0.5);
      prep.y = Math.max(prep.y, TABLE_HEIGHT - 0.1);
      this.approach(prep, dt, lv.move + 1.2, 13);
      this.quat.slerpQuats(this.quat, p.quat, 1 - Math.exp(-7 * dt));
    } else if (p && t <= p.tc + 1e-9 && !p.hit) {
      if (!p.anchored) {
        p.anchored = true; p.ts = t;
        p.p0 = this.pos.clone(); p.v0 = this.vel.clone(); p.q0 = this.quat.clone();
        // can the arm get there?
        const dist = p.pc.distanceTo(p.p0);
        const allowed = p.u.length() * p.T * 0.75 + lv.reach * 0.6;
        if (dist > allowed) p.pc = p.p0.clone().addScaled(_tmp.subVectors(p.pc, p.p0), allowed / dist);
      }
      const T = Math.max(1e-3, p.tc - p.ts);
      const tau = clamp((t - p.ts) / T, 0, 1);
      const t2 = tau * tau, t3 = t2 * tau;
      const h00 = 2 * t3 - 3 * t2 + 1, h10 = t3 - 2 * t2 + tau, h01 = -2 * t3 + 3 * t2, h11 = t3 - t2;
      const d00 = 6 * t2 - 6 * tau, d10 = 3 * t2 - 4 * tau + 1, d01 = -6 * t2 + 6 * tau, d11 = 3 * t2 - 2 * tau;
      this.pos.set(0, 0, 0).addScaled(p.p0, h00).addScaled(p.v0, h10 * T).addScaled(p.pc, h01).addScaled(p.u, h11 * T);
      this.vel.set(0, 0, 0).addScaled(p.p0, d00 / T).addScaled(p.v0, d10).addScaled(p.pc, d01 / T).addScaled(p.u, d11);
      this.quat.slerpQuats(p.q0, p.quat, smoothstep(0, 0.7, tau));
    } else if (p && t < p.tc + 0.38) {
      // follow-through: the arm keeps travelling and decelerates, wrist rises
      this.vel.scale(Math.exp(-7.5 * dt));
      this.vel.y += (p.shot.top > 0 ? 3 : 0.5) * dt;
      this.pos.addScaled(this.vel, dt);
      if (this.pos.y < TABLE_HEIGHT + 0.03 && Math.abs(this.pos.z) < HL + 0.05) { this.pos.y += Math.min(TABLE_HEIGHT + 0.03 - this.pos.y, 3 * dt); this.vel.y = Math.max(0, this.vel.y); }
    } else {
      if (p) this.plan = null;
      // ready position: anticipate the ball's lateral position
      const b = this.world.ball.p;
      const tx = this.serve ? (this.serve.stance + this.rightX * 0.18) : clamp(b.x * 0.35, -0.45, 0.45);
      const tz = this.side * (HL + (this.serve ? 0.32 : 0.5));
      const ty = this.serve ? TABLE_HEIGHT + 0.12 : 0.98 + Math.sin(t * 1.7 + this.index) * 0.012;
      _tmp2.set(tx, ty, tz);
      this.approach(_tmp2, dt, lv.move, 8);
      this.computeReadyQuat(this.pos.x);
      this.quat.slerpQuats(this.quat, this.readyQuat, 1 - Math.exp(-6 * dt));
    }
    // body follows the racket (feet), used by the camera and the avatar
    const bx = this.pos.x - this.rightX * 0.25, bz = this.pos.z + this.side * 0.35;
    this.body.x += (bx - this.body.x) * (1 - Math.exp(-5 * dt));
    this.body.z += (bz - this.body.z) * (1 - Math.exp(-5 * dt));
  }
}
