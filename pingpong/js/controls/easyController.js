// "Easy" controls (default). The player only moves the racket sideways — with the mouse, or by
// dragging a finger anywhere on the screen — and picks the stroke (drive / topspin / cut).
// Depth, height and the moment of the swing are automatic: the arm swings through the ball when it
// arrives. Being badly placed sideways still misses or sprays the ball, and the swing direction
// (moving sideways while hitting) aims the shot. The ball itself is simulated as always.
import { V3, clamp } from '../physics/math.js';
import { TABLE_HALF_L as HL, TABLE_HALF_W as HW, TABLE_HEIGHT } from '../physics/constants.js';
import { KeyboardController } from './keyboardController.js';
import { predict, hittableWindow } from '../game/prediction.js';

const REACH = 0.42;        // how far sideways the arm reaches from where you put the racket
const LEAD = 0.2;          // swing duration (s)

export class EasyController extends KeyboardController {
  constructor(world, index, opts = {}) {
    super(world, index, opts);
    this.easy = true;
    this.pointerX = 0;
    this.aimVel = 0;
    this.stroke = 'normal';
    this.nextLook = 0;
    this.contactZ = null;
  }
  reset() {
    super.reset();
    this.pointerX = 0; this.aimVel = 0; this.nextLook = 0; this.contactZ = null;
  }
  // x: desired racket x (world metres); buttons: { top, back, toss }
  setPointer(x, buttons, t, dt) {
    const nx = clamp(x, -HW - 0.8, HW + 0.8);
    const v = (nx - this.pointerX) / Math.max(dt, 1 / 240);
    this.aimVel += (v - this.aimVel) * (1 - Math.exp(-dt / 0.08));
    this.pointerX = nx;
    this.stroke = buttons.top ? 'top' : buttons.back ? 'back' : 'normal';
    if (buttons.toss && this.serve && this.serve.phase === 'hold') this.serve.tossAt = t;
  }
  onPaddleHit(ev, t, isServe) {
    super.onPaddleHit(ev, t, isServe);
    this.contactZ = null;
  }
  update(dt, t) {
    const s = this.side;
    this.manualTarget.x = this.pointerX;
    // depth is automatic: wait just behind where the ball will be comfortable to hit
    const zWait = this.contactZ !== null ? this.contactZ + s * 0.32 : s * (HL + 0.5);
    this.manualTarget.z = s * clamp(s * zWait, HL + 0.12, HL + 1.6);
    if (this.incomingBall && !this.plan && this.world.ballActive && t >= this.nextLook) {
      this.nextLook = t + 0.02;
      this.look(t);
    }
    // skip KeyboardController's key movement: go straight to the shared AI motion
    Object.getPrototypeOf(KeyboardController.prototype).update.call(this, dt, t);
  }
  // Find the comfortable contact point; swing when it is LEAD seconds away and within reach.
  look(t) {
    predict(this.world.ball, this.traj, 1.6, 0.003);
    const win = hittableWindow(this.traj, this.index, this.needBounce, this.otherNeed);
    if (!win) { this.contactZ = null; return; }
    const tr = this.traj, s = this.side;
    let best = -1;
    for (let i = win.start + 1; i <= win.end; i++) {
      const y = tr.py(i);
      if (y < TABLE_HEIGHT + 0.08) continue;
      // near the top of the bounce, at or just behind the end line
      if (s * tr.pz(i) > HL - 0.25 && tr.py(i) <= tr.py(i - 1) + 0.0005) { best = i; break; }
      if (s * tr.pz(i) > HL + 0.35) { best = i; break; }
    }
    if (best < 0) best = win.end;
    this.contactZ = tr.pz(best);
    const tLeft = tr.t(best);
    if (tLeft > LEAD + 0.01) return;
    const lateral = Math.abs(tr.px(best) - this.pointerX);
    if (lateral > REACH + 0.25) return;           // too far: the ball goes by
    this.aim = clamp(this.aimVel / 2.5, -1, 1) * this.rightX;
    const kind = this.stroke === 'top' ? 'top' : this.stroke === 'back' ? 'back' : 'drive';
    this.swing(kind, t, { reach: REACH + 0.35, lateralStress: lateral > REACH ? 6 : 1.5 });
  }
}
