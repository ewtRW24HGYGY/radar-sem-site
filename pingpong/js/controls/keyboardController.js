// Second local player on the keyboard (desktop "2 players" mode).
// W/A/S/D move, Space/F = drive, Q = topspin, E = backspin/push, R or Space = toss when serving.
// The player chooses WHEN to swing: the stroke takes ~0.2 s and the timing error turns into face
// angle / contact errors, so badly timed swings miss or fly off the table.
import { V3, clamp } from '../physics/math.js';
import { TABLE_HALF_L as HL, TABLE_HALF_W as HW, TABLE_HEIGHT } from '../physics/constants.js';
import { AIController } from '../ai/aiController.js';
import { predict, hittableWindow } from '../game/prediction.js';

const RPS = 2 * Math.PI;
const SWING_TIME = 0.2;

export class KeyboardController extends AIController {
  constructor(world, index, opts = {}) {
    super(world, index, 'advanced', opts);
    this.manual = true;
    this.manualTarget = new V3(0, 0.98, this.side * (HL + 0.5));
    this.keys = { left: false, right: false, fwd: false, rev: false };
    this.incomingBall = false;
    this.aim = 0;
  }
  reset() {
    super.reset();
    if (this.manualTarget) this.manualTarget.set(0, 0.98, this.side * (HL + 0.5));
  }
  onPaddleHit(ev, t, isServe) {
    super.onPaddleHit(ev, t, isServe);
    this.pendingPlanAt = -1;
    this.incomingBall = ev.index !== this.index;
  }
  prepareReceive() { this.incomingBall = false; }
  setKeys(k, t) {
    Object.assign(this.keys, k);
    if (k.toss && this.serve && this.serve.phase === 'hold') this.serve.tossAt = t;
    const kind = k.top ? 'top' : k.cut ? 'back' : k.drive ? 'drive' : null;
    if (kind && !this.plan) {
      if (this.serve && this.serve.phase === 'hold') this.serve.tossAt = t;
      else if (this.incomingBall && this.world.ballActive) this.swing(kind, t);
    }
  }
  update(dt, t) {
    const k = this.keys, sp = 2.8;
    const fwd = -this.side;          // towards the net
    const right = this.rightX;
    let mx = (k.right ? 1 : 0) - (k.left ? 1 : 0), mz = (k.fwd ? 1 : 0) - (k.rev ? 1 : 0);
    this.manualTarget.x = clamp(this.manualTarget.x + mx * right * sp * dt, -HW - 0.9, HW + 0.9);
    this.manualTarget.z = this.side * clamp(this.side * (this.manualTarget.z + mz * fwd * sp * dt), HL + 0.15, HL + 1.8);
    this.aim = mx;
    super.update(dt, t);
  }
  swing(kind, t) {
    const lv = this.lv;
    predict(this.perceive(this.world.ball, lv.spinRead), this.traj, 1.6, 0.002);
    const win = hittableWindow(this.traj, this.index, this.needBounce, this.otherNeed);
    let best = -1, bestErr = Infinity;
    if (win) {
      for (let i = win.start; i <= win.end; i += 2) {
        const dx = this.traj.px(i) - this.manualTarget.x, dz = this.traj.pz(i) - this.manualTarget.z;
        if (Math.hypot(dx, dz) > 0.85 || this.traj.py(i) < TABLE_HEIGHT + 0.03) continue;
        const err = Math.abs(this.traj.t(i) - SWING_TIME);
        if (err < bestErr) { bestErr = err; best = i; }
      }
    }
    if (best < 0) {
      // whiff: swing at the air in front of the racket
      const pc = this.pos.clone(); pc.z += -this.side * 0.25;
      const u = new V3(0, 1, -this.side * 5);
      this.plan = { ballTc: t + SWING_TIME, tc: t + SWING_TIME, pc, u, n: new V3(0, 0, -this.side), quat: this.quat.clone(), face: 1, T: 0.16, shot: { kind, top: 1 }, target: null, zone: null, stretch: true, serve: false, hit: false, refined: true, anchored: false, ts: t + SWING_TIME - 0.16 };
      return;
    }
    const bc = this.traj.get(best, { t: 0, p: new V3(), v: new V3(), w: new V3() });
    const shot = kind === 'top' ? { kind: 'loop', speed: 10.5, top: 45 * RPS, side: 0 }
      : kind === 'back' ? { kind: 'push', speed: 4.8, top: -30 * RPS, side: 0 }
        : { kind: 'drive', speed: 10, top: 20 * RPS, side: 0 };
    const opp = -this.side, oppRight = -this.rightX;
    const target = { x: clamp(this.aim * -oppRight * 0.45 + (this.rng() - 0.5) * 0.2, -0.6, 0.6), z: opp * (kind === 'back' ? 0.6 : 1.0), zone: null };
    this.buildPlan(t, bc, { shot, target, stressAdd: bestErr * 22, stretch: false });
  }
}
