// Human racket controller.
// The pointer (mouse / finger) sets where the racket should be on the floor plan; the racket follows
// it physically (critically damped spring with velocity feed-forward at 1 kHz), so the speed of your
// hand IS the speed of the racket at impact. Stroke buttons change the face angle and add the brush
// (upward for topspin, downward for backspin, sideways for sidespin). Optional assists help with the
// racket height and face angle, computed with the same physics the ball uses.
import { V3, Quat, clamp, lerp } from '../physics/math.js';
import { BallState, impact } from '../physics/ball.js';
import {
  MATERIALS, TABLE_HALF_L as HL, TABLE_HALF_W as HW, TABLE_HEIGHT, BALL_RADIUS as R, PADDLE_HALF_THICK,
} from '../physics/constants.js';
import { predict, hittableWindow, Trajectory } from '../game/prediction.js';
import { paddleQuatFromNormal, naturalTip, aimNormal } from '../game/paddlePose.js';
import { flyToTable } from '../ai/shotSolver.js';

const RR = PADDLE_HALF_THICK + R;
const REST_Y = TABLE_HEIGHT + 0.2;

// Stroke modes: base face pitch (positive = closed), vertical brush coupling, label
export const STROKES = {
  normal: { pitch: 0.2, brush: 0.28, label: 'Drive' },
  top: { pitch: 0.5, brush: 0.6, label: 'Topspin' },
  back: { pitch: -0.75, brush: -0.32, label: 'Corte' },
};

const _a = new V3(), _n = new V3(), _tip = new V3(), _q = new Quat();
const _bs = new BallState();

export class HumanController {
  constructor(world, index, settings) {
    this.world = world;
    this.index = index;
    this.side = index === 0 ? 1 : -1;
    this.rightX = this.side;
    this.pd = world.paddles[index];
    this.settings = settings;          // { assist: 'full'|'partial'|'off', sensitivity }
    this.traj = new Trajectory();
    this.pos = new V3(); this.vel = new V3(); this.quat = new Quat();
    this.body = new V3();
    this.target0 = { x: 0, z: 0 }; this.target1 = { x: 0, z: 0 };
    this.targetVel = new V3();
    this.inputT0 = 0; this.inputDur = 1 / 60;
    this.input = { top: false, back: false, sideL: false, sideR: false, tilt: 0, height: 0, aimX: 0, active: false };
    this.onToss = null;
    this.stroke = 'normal';
    this.reset();
  }

  reset() {
    this.serve = null; this.incoming = false; this.need = 1; this.otherNeed = 0;
    this.window = null; this.nextPredict = 0; this.lastHit = -10; this.followUntil = 0;
    this.face = 1; this.pitch = STROKES.normal.pitch; this.yaw = 0; this.assistPitch = null; this.assistYaw = null;
    this.nextAssist = 0; this.speedCap = Infinity; this.contactT = Infinity;
    this.brushPrev = 0; this.yHatPrev = REST_Y;
    this.pos.set(0.15 * this.rightX, REST_Y, this.side * (HL + 0.5));
    this.vel.set(0, 0, 0);
    this.target0 = { x: this.pos.x, z: this.pos.z }; this.target1 = { ...this.target0 };
    this.body.set(this.pos.x - 0.25 * this.rightX, 0, this.pos.z + this.side * 0.4);
    this.computeQuat(1, 1);
    this.pd.teleport(this.pos, this.quat);
  }
  cancel() { this.serve = null; this.incoming = false; this.window = null; }
  prepareReceive() { this.cancel(); }

  // ——— Input (once per rendered frame) ———
  // tx, tz: desired racket position on the floor plan (world metres)
  setFrameInput(tx, tz, buttons, t, frameDt) {
    this.target0 = { ...this.lastTarget() };
    this.target1 = { x: tx, z: tz };
    this.inputT0 = t; this.inputDur = Math.max(1 / 240, Math.min(frameDt, 0.05));
    const vx = (this.target1.x - this.target0.x) / this.inputDur, vz = (this.target1.z - this.target0.z) / this.inputDur;
    const k = 1 - Math.exp(-frameDt / 0.025);
    this.targetVel.x += (vx - this.targetVel.x) * k;
    this.targetVel.z += (vz - this.targetVel.z) * k;
    Object.assign(this.input, buttons);
    this.stroke = buttons.top ? 'top' : buttons.back ? 'back' : 'normal';
    if (buttons.toss && this.serve && this.serve.phase === 'hold') this.toss(t);
  }
  lastTarget() { return this.target1; }
  currentTarget(t) {
    const a = clamp((t - this.inputT0) / this.inputDur, 0, 1);
    return { x: lerp(this.target0.x, this.target1.x, a), z: lerp(this.target0.z, this.target1.z, a) };
  }

  // ——— Serve ———
  startServe(t) { this.cancel(); this.serve = { phase: 'hold', since: t }; }
  handPos(out) {
    const x = clamp(this.pos.x - this.rightX * 0.32, -HW + 0.05, HW - 0.05);
    return out.set(x, TABLE_HEIGHT + 0.2, this.side * Math.max(HL + 0.12, this.side * this.pos.z - 0.1));
  }
  toss(t) {
    const hp = this.handPos(new V3());
    this.world.launchBall(hp, new V3(0, 2.35, 0), new V3());
    this.serve.phase = 'tossed'; this.serve.tossT = t;
    if (this.onToss) this.onToss(this.index);
  }

  // ——— Game events ———
  onPaddleHit(ev, t, isServe) {
    if (ev.index === this.index) {
      this.lastHit = t; this.followUntil = t + 0.3; this.incoming = false; this.window = null; this.serve = null;
      return;
    }
    this.incoming = true; this.need = 1; this.otherNeed = isServe ? 1 : 0; this.nextPredict = 0;
  }
  onBounce(ev) {
    if (!this.incoming) return;
    if (ev.side === this.index && this.otherNeed === 0 && this.need === 1) this.need = 0;
    else if (ev.side !== this.index && this.otherNeed === 1) this.otherNeed = 0;
    this.nextPredict = 0;
  }
  onNet() { if (this.incoming) this.nextPredict = 0; }

  refreshPrediction(t) {
    this.nextPredict = t + 0.1;
    this.window = null;
    if (!this.world.ballActive) return;
    predict(this.world.ball, this.traj, 1.6, 0.003);
    const w = hittableWindow(this.traj, this.index, this.need, this.otherNeed);
    if (!w) return;
    this.window = { t0: t, start: w.start, end: w.end };
  }

  // Predicted ball sample when it reaches the racket's depth (index into traj), or -1
  contactIndex(zp) {
    const w = this.window; if (!w) return -1;
    const tr = this.traj, s = this.side;
    let last = -1;
    for (let i = w.start; i <= w.end; i++) {
      if (tr.py(i) < TABLE_HEIGHT - 0.1) break;
      last = i;
      if (s * tr.pz(i) >= s * zp - RR) return i;
    }
    return last;
  }

  // ——— Physics step ———
  update(dt, t) {
    const S = this.settings, side = this.side;
    const ball = this.world.ball;
    if (this.serve && this.serve.phase === 'hold') this.world.holdBall(this.handPos(_a));
    if (this.incoming && t >= this.nextPredict) this.refreshPrediction(t);

    // horizontal target from the pointer (interpolated within the frame)
    const tg = this.currentTarget(t);
    let tx = clamp(tg.x, -HW - 1.1, HW + 1.1);
    let tz = side * clamp(side * tg.z, 0.25, HL + 1.8);

    // vertical target
    const stroke = STROKES[this.stroke];
    let yHat = REST_Y + this.input.height;
    let tracking = false, ci = -1;
    const s = side * (this.pos.z - ball.p.z);  // distance of the ball in front of the racket
    if (this.serve && this.serve.phase === 'tossed') {
      yHat = ball.p.y; tracking = true;
    } else if (this.incoming && this.window) {
      ci = this.contactIndex(this.pos.z);
      if (ci >= 0) this.contactT = this.window.t0 + this.traj.t(ci);
      if (ci >= 0 && S.assist !== 'off') { yHat = clamp(this.traj.py(ci), TABLE_HEIGHT - 0.05, 1.8); tracking = true; }
    }
    let brush = 0;
    if (tracking) {
      // smooth brush profile: the racket starts below (topspin) / above (backspin) the ball and sweeps
      // through it; at contact its vertical speed is brush × closing speed
      const A = stroke.brush > 0.4 ? 0.16 : 0.12;
      brush = -Math.sign(stroke.brush) * A * Math.tanh(((s - RR) * Math.abs(stroke.brush)) / A);
      // sidespin: sweep the racket across the ball
      const sd = (this.input.sideR ? 1 : 0) - (this.input.sideL ? 1 : 0);
      if (sd) tx += clamp(sd * 0.32 * (s - RR), -0.22, 0.22);
    }
    if (this.serve && this.serve.phase === 'tossed') this.contactT = t + 0.1;
    if (t < this.followUntil) brush = this.brushPrev + (stroke.brush > 0 ? 0.6 : stroke.brush < 0 ? -0.3 : 0.15) * dt;
    let yT = yHat + brush;
    if (Math.abs(tx) < HW + 0.05 && side * tz < HL + 0.05) yT = Math.max(yT, TABLE_HEIGHT + 0.1);
    const vyT = clamp((yT - (this.yHatPrev + this.brushPrev)) / dt, -12, 12);
    this.yHatPrev = yHat; this.brushPrev = brush;

    // critically damped spring with feed-forward of the target velocity
    const wXZ = 36, wY = 34;
    const tvx = this.targetVel.x, tvz = this.targetVel.z;
    _a.set(
      wXZ * wXZ * (tx - this.pos.x) + 2 * wXZ * (tvx - this.vel.x),
      wY * wY * (yT - this.pos.y) + 2 * wY * ((tracking ? vyT : 0) - this.vel.y),
      wXZ * wXZ * (tz - this.pos.z) + 2 * wXZ * (tvz - this.vel.z),
    );
    // separate acceleration budgets: a fast forward swing must not starve the vertical tracking
    const ah = Math.hypot(_a.x, _a.z), ahMax = 450;
    if (ah > ahMax) { _a.x *= ahMax / ah; _a.z *= ahMax / ah; }
    _a.y = clamp(_a.y, -380, 380);
    this.vel.addScaled(_a, dt);
    const vl = this.vel.length();
    if (vl > 24) this.vel.scale(24 / vl);
    // full assist: the arm does not over-hit (horizontal speed only, vertical tracking stays free)
    if (S.assist === 'full' && t > this.contactT - 0.16 && t < this.contactT + 0.05) {
      const vh = Math.hypot(this.vel.x, this.vel.z);
      if (vh > this.speedCap) { this.vel.x *= this.speedCap / vh; this.vel.z *= this.speedCap / vh; }
    }
    this.pos.addScaled(this.vel, dt);
    // the racket cannot go through the table or past the net: soft constraints (no teleporting)
    const overTable = Math.abs(this.pos.x) < HW + 0.02 && side * this.pos.z < HL + 0.02;
    if (overTable && this.pos.y < TABLE_HEIGHT + 0.09) {
      this.pos.y += Math.min(TABLE_HEIGHT + 0.09 - this.pos.y, 3 * dt);
      if (this.vel.y < 0) this.vel.y = 0;
    }
    if (side * this.pos.z < 0.12) {
      this.pos.z += side * Math.min(0.12 - side * this.pos.z, 3 * dt);
      if (side * this.vel.z < 0) this.vel.z = 0;
    }
    if (this.pos.y < 0.12) { this.pos.y += Math.min(0.12 - this.pos.y, 3 * dt); this.vel.y = Math.max(0, this.vel.y); }
    // body (feet) follows the racket
    const kb = 1 - Math.exp(-dt / 0.35);
    this.body.x += (this.pos.x - 0.22 * this.rightX - this.body.x) * kb;
    this.body.z += (this.pos.z + side * 0.42 - this.body.z) * kb;

    this.updateOrientation(dt, t, ci);
    this.pd.pos.copy(this.pos);
    this.pd.quat.copy(this.quat);
  }

  updateOrientation(dt, t, ci) {
    const S = this.settings, side = this.side, stroke = STROKES[this.stroke];
    // forehand / backhand from where the racket is relative to the body (with hysteresis)
    const rel = (this.pos.x - this.body.x) * this.rightX;
    if (this.face > 0 && rel < -0.14) this.face = -1;
    else if (this.face < 0 && rel > 0.02) this.face = 1;

    // manual face: stroke pitch + wheel tilt; yaw follows the lateral swing and points at the table
    let pitch = stroke.pitch + this.input.tilt;
    const aimX = clamp(this.vel.x * 0.06 + this.input.aimX * 0.5, -0.6, 0.6);
    const aimZ = -side * (this.stroke === 'back' ? 0.7 : clamp(0.82 + 0.012 * Math.max(0, -side * this.vel.z), 0.75, 1.0));
    let yaw;
    if (S.assist === 'off') yaw = clamp(this.vel.x * 0.04, -0.5, 0.5);
    else {
      const dx = aimX - this.pos.x, dz = aimZ - this.pos.z;
      yaw = Math.atan2(dx, -side * dz);
    }
    if (this.input.sideL) yaw -= 0.18;
    if (this.input.sideR) yaw += 0.18;

    // full assist: solve the face angle that lands the ball on the aim point with the current swing
    const serving = this.serve && this.serve.phase === 'tossed';
    if ((S.assist === 'full' || (S.assist === 'partial' && (serving || this.incoming))) && (this.incoming || serving)) {
      if (t >= this.nextAssist) {
        const near = this.contactT - t < 0.25;
        this.nextAssist = t + (near ? 0.012 : 0.04);
        const sol = this.solveAssist(ci, pitch, yaw, aimX, aimZ);
        if (sol) { this.assistPitch = sol.pitch; this.assistYaw = sol.yaw; this.speedCap = sol.cap; }
      }
      if (this.assistPitch !== null) {
        const wgt = S.assist === 'partial' && !serving ? 0.5 : this.contactT - t < 0.2 ? 1 : 0.85;
        pitch = lerp(pitch, this.assistPitch, wgt);
        yaw = lerp(yaw, this.assistYaw, wgt);
      }
    } else { this.assistPitch = null; this.assistYaw = null; }
    if (t < this.followUntil) { pitch = this.pitch; yaw = this.yaw; }
    const near = this.contactT - t < 0.15 && this.contactT - t > -0.02;
    // near contact the wrist goes straight to the face angle (only limited by its max rotation speed)
    const k = near ? 1 : 1 - Math.exp(-28 * dt);
    this.pitch += (pitch - this.pitch) * k;
    this.yaw += (yaw - this.yaw) * k;
    this.computeQuat(this.face, near ? 0.999 : k, dt);
  }

  computeQuat(face, k, dt = 0.001) {
    aimNormal(this.side, this.pitch, this.yaw, _n);
    naturalTip(this.side, face > 0, _tip, this.stroke === 'back' ? 0.95 : 0.5);
    paddleQuatFromNormal(_n, face, _tip, _q);
    if (k >= 1) { this.quat.copy(_q); return; }
    // a wrist cannot rotate the racket faster than ~35 rad/s
    const ang = this.quat.angleTo(_q);
    if (ang < 1e-6) return;
    const step = Math.min(ang * Math.min(1, k * 2.5), 40 * dt);
    this.quat.slerpQuats(this.quat, _q, step / ang);
  }

  // Face angle that sends the ball to the aim point, using the racket velocity expected at contact
  // (the hand leads the racket). With full assist, if no angle works at this speed the arm is
  // allowed to swing slower (returned as `cap`).
  solveAssist(ci, pitch0, yaw0, aimX, aimZ) {
    let sameSide = false, tx = aimX, tz = aimZ;
    const bc = new BallState();
    if (this.serve && this.serve.phase === 'tossed') {
      bc.copy(this.world.ball);
      sameSide = true; tx = lerp(this.pos.x, aimX, 0.3); tz = this.side * 1.08;
    } else {
      if (ci < 0) return null;
      const s = { t: 0, p: new V3(), v: new V3(), w: new V3() };
      this.traj.get(ci, s);
      bc.p.copy(s.p); bc.v.copy(s.v); bc.w.copy(s.w);
    }
    const mat = this.face > 0 ? MATERIALS.rubberFH : MATERIALS.rubberBH;
    const brush = STROKES[this.stroke].brush;
    // expected racket velocity at contact: the hand's velocity, or a nominal swing while preparing
    const nominal = this.stroke === 'back' ? 2.5 : sameSide ? 3.5 : 4.5;
    let uz = this.targetVel.z, ux = this.targetVel.x;
    if (-this.side * uz < nominal) uz = -this.side * nominal;
    const u0 = new V3(ux, -brush * this.side * (uz - bc.v.z), uz);
    if (sameSide) u0.y = -brush * this.side * uz;
    // in the last instants of the swing the racket's own velocity is the best estimate
    const tLeft = this.contactT - this.world.time;
    if (tLeft < 0.06 && -this.side * this.vel.z > nominal * 0.6) u0.copy(this.vel);
    if (u0.y > 0 && this.stroke === 'back') u0.y = 0;
    const tmp = new BallState();
    const u = new V3();
    const evalAt = (p, y) => {
      tmp.copy(bc);
      aimNormal(this.side, p, y, _n);
      if (!impact(tmp, _n, u, mat)) return null;
      return flyToTable(tmp.p, tmp.v, tmp.w, sameSide, 0.004, 1.5);
    };
    const good = (r) => r && Math.abs(r.x) < HW - 0.03 && this.side * r.z * (sameSide ? 1 : -1) > 0.1 &&
      Math.abs(r.z) < HL - 0.03 && (sameSide || r.clearance > 0.015);
    const newton = (p, y) => {
      let r = null;
      for (let it = 0; it < 6; it++) {
        r = evalAt(p, y);
        if (!r) return null;
        const ex = r.x - tx, ez = r.z - tz;
        if (ex * ex + ez * ez < 4e-4) break;
        const h = 0.008;
        const rp = evalAt(p + h, y), ry = evalAt(p, y + h);
        if (!rp || !ry) return null;
        const a = (rp.x - r.x) / h, b = (ry.x - r.x) / h, c = (rp.z - r.z) / h, d = (ry.z - r.z) / h;
        const det = a * d - b * c;
        if (Math.abs(det) < 1e-7) return null;
        let dp = (d * ex - b * ez) / det, dy = (-c * ex + a * ez) / det;
        const m = Math.max(Math.abs(dp), Math.abs(dy));
        if (m > 0.25) { dp *= 0.25 / m; dy *= 0.25 / m; }
        p = clamp(p - dp, -1.25, 1.25); y = clamp(y - dy, -0.9, 0.9);
      }
      r = evalAt(p, y);
      return good(r) ? { pitch: p, yaw: y } : null;
    };
    const factors = this.settings.assist === 'full' ? [1, 0.82, 0.66, 0.52, 0.4] : [1];
    const starts = [this.assistPitch ?? pitch0, 0.25, -0.2, 0.6, -0.6];
    const useActual = tLeft < 0.06 && -this.side * this.vel.z > nominal * 0.6;
    for (const f of factors) {
      // only the horizontal swing is slowed down; the vertical brush follows from it
      u.set(u0.x * f, useActual ? u0.y : -brush * this.side * (u0.z * f - bc.v.z), u0.z * f);
      if (sameSide && !useActual) u.y = -brush * this.side * u.z;
      if (u.y > 0 && this.stroke === 'back') u.y = 0;
      for (const p0 of starts) {
        const sol = newton(p0, this.assistYaw ?? yaw0);
        if (sol) { sol.cap = f < 1 ? Math.max(1.5, Math.hypot(u0.x, u0.z) * f * 1.05) : Infinity; return sol; }
      }
    }
    return null;
  }
}
