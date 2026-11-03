import { Quaternion, Vector3 } from 'three';
import { BALL } from '../physics/constants';
import { Foot, FootStrike, TECHNIQUES, Technique, dirFromAngles } from '../physics/kick';
import { Rig } from './rig';
import { clamp, damp, hermite, hermiteVel, lerp, smooth, smoother, yawOf } from './motion';

export type KickerPhase = 'idle' | 'run' | 'swing' | 'follow' | 'react';
type Side = 'L' | 'R';

export interface RunUpSetup {
  ball: Vector3;
  foot: Foot;
  /** Distance from the ball to the start of the run (m). */
  distance: number;
  /** Approach angle (rad). 0 = straight behind the ball; positive = from the kicking foot's natural side. */
  angle: number;
  /** Base running speed (m/s). */
  tempo: number;
  technique: Technique;
}

interface FootState {
  pos: Vector3;
  yaw: number;
  grounded: boolean;
}

export interface KickerCues {
  phase: KickerPhase;
  runYaw: number;
  /** Plant foot yaw once landed (the strongest body-language cue), else null. */
  plantYaw: number | null;
  approachSpeed: number;
  /** Time to contact the keeper can infer from the current motion (s). */
  inferredTimeToContact: number;
  /** True during the paradinha. */
  stuttering: boolean;
  /** Hip opening at the plant, signed like yaw. */
  hipYaw: number;
  foot: Foot;
}

const UP = new Vector3(0, 1, 0);

/**
 * Procedural penalty taker. The run-up is driven by a footstep planner: each foot
 * lands on a planned spot and stays there while in stance (no sliding). Step
 * lengths adapt to speed; when the stride pattern cannot end with the support
 * foot exactly at the planned plant spot, the plant error is measured and fed to
 * the kick execution model. The kicking foot follows a Hermite path that meets
 * the ball at the exact velocity used by the physics impulse.
 */
export class KickerController {
  phase: KickerPhase = 'idle';
  t = 0;
  setup!: RunUpSetup;
  start = new Vector3();
  plantIdeal = new Vector3();
  runDir = new Vector3(0, 0, -1);
  pathLen = 0;
  s = 0;
  v = 0;
  vTarget = 3.5;
  speedInput = 0; // −1 slow … +1 fast
  stutterTimer = 0;
  stutterUsed = false;
  feet: Record<Side, FootState> = {
    L: { pos: new Vector3(), yaw: 0, grounded: true },
    R: { pos: new Vector3(), yaw: 0, grounded: true },
  };
  private swingFoot: Side = 'R';
  private swingFrom = new Vector3();
  private swingTo = new Vector3();
  private swingFromYaw = 0;
  private swingToYaw = 0;
  private stepStartS = 0;
  private stepEndS = 1;
  private stepLen = 1;
  private isPlantStep = false;
  /** Measured plant misplacement along the run (m). + = too far behind. */
  plantError = 0;
  plantYaw = 0;
  hipOpen = 0;
  plantTime = -1;
  contactTime = -1;
  contactDone = false;
  approachSpeedAtPlant = 0;
  /** Intended kick (set by the game before the plant). */
  aimYaw = 0;
  aimPitch = 0.1;
  plannedStrike: FootStrike | null = null;
  executedStrike: FootStrike | null = null;
  private kickGround = new Vector3();
  private apex = new Vector3();
  private apexVel = new Vector3();
  private contactAnkle = new Vector3();
  private followEnd = new Vector3();
  private followVel = new Vector3();
  private pelvis = new Vector3();
  private pelvisAtPlant = new Vector3();
  private bodyYaw = 0;
  private lean = 0;
  reaction: 'goal' | 'miss' | 'save' | 'post' | null = null;
  private reactT = 0;
  private breath = 0;
  lookTarget = new Vector3(0, 1.2, 0);
  /** Lean-back cue from early timing (rad), set when the strike is executed. */
  leanBack = 0;
  footSign = 1;

  constructor(public rig: Rig) {}

  get kickSide(): Side {
    return this.setup.foot === 'right' ? 'R' : 'L';
  }
  get supportSide(): Side {
    return this.setup.foot === 'right' ? 'L' : 'R';
  }

  stepLenFor(v: number): number {
    const s = this.rig.dims.height / 1.83;
    return clamp(0.4 + 0.24 * v, 0.42, 1.6) * s;
  }

  /** Lateral unit vector to the left of a facing direction. */
  static leftOf(d: Vector3, out = new Vector3()): Vector3 {
    return out.set(d.z, 0, -d.x).normalize();
  }

  /** Places the kicker at the start of the run-up. */
  place(setup: RunUpSetup, aimYaw: number): void {
    this.setup = setup;
    this.footSign = setup.foot === 'right' ? 1 : -1;
    this.aimYaw = aimYaw;
    this.updatePlantIdeal();
    const a = setup.angle;
    this.start.set(setup.ball.x - this.footSign * Math.sin(a) * setup.distance, 0, setup.ball.z + Math.cos(a) * setup.distance);
    this.recomputePath();
    this.s = 0;
    this.v = 0;
    this.vTarget = setup.tempo;
    this.phase = 'idle';
    this.t = 0;
    this.stutterUsed = false;
    this.stutterTimer = 0;
    this.plantTime = -1;
    this.contactTime = -1;
    this.contactDone = false;
    this.plantError = 0;
    this.executedStrike = null;
    this.reaction = null;
    this.leanBack = 0;
    const left = KickerController.leftOf(this.runDir);
    const yaw = yawOf(this.runDir);
    this.feet.L.pos.copy(this.start).addScaledVector(left, 0.12);
    this.feet.R.pos.copy(this.start).addScaledVector(left, -0.12);
    this.feet.L.yaw = this.feet.R.yaw = yaw;
    this.feet.L.grounded = this.feet.R.grounded = true;
    this.bodyYaw = yaw;
    this.pelvis.copy(this.start);
    this.pose(0);
  }

  /** Plant spot beside the ball, depending on technique and the intended direction. */
  updatePlantIdeal(): void {
    const spec = TECHNIQUES[this.setup.technique];
    const d = dirFromAngles(this.aimYaw, 0);
    d.y = 0;
    d.normalize();
    const left = KickerController.leftOf(d);
    const lat = spec.surface === 'inside' ? 0.27 : spec.surface === 'outside' ? 0.3 : spec.surface === 'toeUnder' ? 0.22 : 0.21;
    const back = spec.surface === 'laces' ? 0.13 : spec.surface === 'toeUnder' ? 0.08 : 0.05;
    // Support foot is on the side opposite to the kicking foot.
    this.plantIdeal
      .copy(this.setup.ball)
      .setY(0)
      .addScaledVector(left, this.footSign * lat)
      .addScaledVector(d, -back);
  }

  private recomputePath(): void {
    const d = new Vector3().subVectors(this.plantIdeal, this.start);
    d.y = 0;
    this.pathLen = d.length();
    this.runDir.copy(d.normalize());
  }

  /** Begin the run-up. */
  go(): void {
    if (this.phase !== 'idle') return;
    this.phase = 'run';
    this.t = 0;
    // First step: pick the foot so that the parity ends on the support foot.
    const L = this.stepLenFor(this.vTarget * 0.6);
    let n = Math.max(2, Math.round(this.pathLen / L));
    // Steps alternate; the last (n-th) must be the support foot.
    const first: Side = n % 2 === 1 ? this.supportSide : this.kickSide;
    this.beginStep(first, 0, Math.min(0.55, this.pathLen / n));
    void n;
  }

  stutter(): boolean {
    if (this.phase !== 'run' || this.stutterUsed) return false;
    if (this.pathLen - this.s < 1.9) return false; // too late: would be an illegal feint
    this.stutterUsed = true;
    this.stutterTimer = 0.55;
    return true;
  }

  private beginStep(foot: Side, landS: number, len: number): void {
    this.swingFoot = foot;
    const f = this.feet[foot];
    this.swingFrom.copy(f.pos);
    this.swingFromYaw = f.yaw;
    f.grounded = false;
    this.stepLen = len;
    const remaining = this.pathLen - landS;
    this.isPlantStep = foot === this.supportSide && Math.abs(remaining - len) < 1e-6;
    const left = KickerController.leftOf(this.runDir);
    const side = foot === 'L' ? 1 : -1;
    if (this.isPlantStep) {
      this.swingTo.copy(this.plantIdeal).addScaledVector(this.runDir, -this.plantError);
      this.swingToYaw = this.plantYaw;
    } else {
      this.swingTo
        .copy(this.start)
        .addScaledVector(this.runDir, landS + len)
        .addScaledVector(left, side * 0.085);
      this.swingToYaw = yawOf(this.runDir) + side * 0.12;
    }
    this.stepStartS = this.s;
    this.stepEndS = Math.max(this.s + 0.05, landS + len - 0.18 * len);
  }

  /** Called at each footfall to plan the next step. */
  private planNext(landedFoot: Side, landS: number): void {
    const next: Side = landedFoot === 'L' ? 'R' : 'L';
    const R = this.pathLen - landS;
    const L = this.stepLenFor(Math.max(0.6, this.v));
    const minStep = 0.55 * L;
    const maxStep = 1.32 * L + 0.08;
    if (next === this.supportSide && R <= maxStep) {
      // This is the plant step.
      let len = R;
      this.plantError = 0;
      if (R < minStep) this.plantError = -(minStep - R) * 0.6; // cramped
      this.decidePlantYaw();
      this.beginStepPlant(next, landS, len);
      return;
    }
    // Choose a number of steps with the right parity, closest to the comfortable length.
    let bestN = 1;
    let bestCost = Infinity;
    for (let n = 1; n < 40; n++) {
      const lastFoot: Side = n % 2 === 1 ? next : landedFoot;
      if (lastFoot !== this.supportSide) continue;
      const len = R / n;
      const cost = Math.abs(len - L);
      if (cost < bestCost) {
        bestCost = cost;
        bestN = n;
      }
      if (len < 0.35) break;
    }
    let len = R / bestN;
    if (bestN === 1) {
      // Support foot must reach the plant spot in one step but it's too far: land short.
      len = Math.min(R, maxStep);
      this.plantError = R - len;
      this.decidePlantYaw();
      this.beginStepPlant(next, landS, len);
      return;
    }
    this.beginStep(next, landS, clamp(len, 0.35, maxStep));
  }

  private beginStepPlant(foot: Side, landS: number, len: number): void {
    this.swingFoot = foot;
    const f = this.feet[foot];
    this.swingFrom.copy(f.pos);
    this.swingFromYaw = f.yaw;
    f.grounded = false;
    this.stepLen = len;
    this.isPlantStep = true;
    this.updatePlantIdeal();
    this.swingTo.copy(this.plantIdeal).addScaledVector(this.runDir, -this.plantError);
    this.swingToYaw = this.plantYaw;
    this.stepStartS = this.s;
    this.stepEndS = Math.max(this.s + 0.05, landS + len - 0.22 * len);
    // Kick foot leaves the ground during this step: remember where it is.
    this.kickGround.copy(this.feet[this.kickSide].pos);
  }

  /** The support foot points where the hips will face: the main tell for a goalkeeper. */
  private decidePlantYaw(): void {
    const spec = TECHNIQUES[this.setup.technique];
    const runYaw = yawOf(this.runDir);
    // yawOf works on +Z-forward; the aim yaw is relative to the −Z shooting axis.
    const aimDir = dirFromAngles(this.aimYaw, 0);
    const aimY = yawOf(aimDir.setY(0).normalize());
    let dy = aimY - runYaw;
    while (dy > Math.PI) dy -= 2 * Math.PI;
    while (dy < -Math.PI) dy += 2 * Math.PI;
    const tellW = 0.35 + 0.55 * spec.tell;
    this.plantYaw = runYaw + dy * tellW;
    this.hipOpen = dy * (0.3 + 0.5 * spec.tell);
  }

  /** Planned impulse (perfect execution) used to shape the swing. */
  setPlannedStrike(strike: FootStrike, aimYaw: number, aimPitch: number): void {
    this.plannedStrike = strike;
    this.aimYaw = aimYaw;
    this.aimPitch = aimPitch;
    if (this.phase === 'idle' || this.phase === 'run') {
      this.updatePlantIdeal();
      if (this.phase === 'idle') this.recomputePath();
    }
  }

  get timeToContact(): number {
    if (this.phase === 'swing') return Math.max(0, this.contactTime - this.t);
    if (this.phase !== 'run') return Infinity;
    const rem = Math.max(0, this.pathLen - this.s);
    return rem / Math.max(0.3, this.v) + this.swingDuration;
  }

  get swingDuration(): number {
    const spec = TECHNIQUES[this.setup.technique];
    return spec.surface === 'toeUnder' ? 0.13 : spec.surface === 'laces' ? 0.095 : 0.105;
  }

  cues(): KickerCues {
    return {
      phase: this.phase,
      runYaw: yawOf(this.runDir),
      plantYaw: this.plantTime >= 0 ? this.plantYaw : null,
      approachSpeed: this.v,
      inferredTimeToContact: this.timeToContact,
      stuttering: this.stutterTimer > 0,
      hipYaw: this.hipOpen,
      foot: this.setup.foot,
    };
  }

  /**
   * Advances the motion. Returns 'contact' on the sim step the foot meets the ball.
   */
  update(dt: number): 'contact' | null {
    this.t += dt;
    this.breath += dt;
    let event: 'contact' | null = null;
    if (this.phase === 'run') {
      // Speed control (player input) and the paradinha.
      let target = this.setup.tempo * (1 + 0.35 * this.speedInput);
      if (this.stutterTimer > 0) {
        this.stutterTimer -= dt;
        target = 0.35;
      }
      const acc = target > this.v ? 4.2 : 7.5;
      this.v += clamp(target - this.v, -acc * dt, acc * dt);
      this.s += this.v * dt;
      // Swing progress.
      const u = clamp((this.s - this.stepStartS) / Math.max(1e-3, this.stepEndS - this.stepStartS), 0, 1);
      const f = this.feet[this.swingFoot];
      const su = smoother(u);
      f.pos.copy(this.swingFrom).lerp(this.swingTo, su);
      f.pos.y = Math.sin(Math.PI * u) * (0.08 + 0.05 * this.v) * (this.isPlantStep ? 0.7 : 1);
      f.yaw = lerp(this.swingFromYaw, this.swingToYaw, su);
      if (u >= 1) {
        f.pos.copy(this.swingTo);
        f.pos.y = 0;
        f.grounded = true;
        const landS = this.isPlantStep ? this.pathLen : this.s + 0.18 * this.stepLen;
        if (this.isPlantStep) {
          this.enterSwing();
        } else {
          this.planNext(this.swingFoot, landS);
        }
      }
      this.updateRunBody(dt, u);
    } else if (this.phase === 'swing') {
      const tc = this.contactTime;
      if (!this.contactDone && this.t >= tc) {
        this.contactDone = true;
        event = 'contact';
      }
      if (this.t > tc + 0.55) {
        this.phase = 'follow';
        this.t = 0;
      }
      this.updateSwingBody(dt);
    } else if (this.phase === 'follow') {
      this.updateFollow(dt);
    } else if (this.phase === 'react') {
      this.reactT += dt;
    }
    this.pose(dt);
    return event;
  }

  private enterSwing(): void {
    this.phase = 'swing';
    this.approachSpeedAtPlant = this.v;
    this.plantTime = this.t;
    this.contactTime = this.t + this.swingDuration;
    this.pelvisAtPlant.copy(this.pelvis);
    this.computeSwingKeys(this.plannedStrike);
  }

  private computeSwingKeys(strike: FootStrike | null): void {
    const spec = TECHNIQUES[this.setup.technique];
    const ball = this.setup.ball;
    const n = strike ? strike.normal.clone() : dirFromAngles(this.aimYaw, this.aimPitch);
    const vf = strike ? strike.footVelocity.clone() : n.clone().multiplyScalar(18);
    const contactPt = ball.clone().addScaledVector(n, -BALL.radius);
    const { fwd, up } = this.footBasisAtContact(n);
    // Ankle position such that the striking surface touches the contact point.
    const a = this.contactAnkle.copy(contactPt);
    switch (spec.surface) {
      case 'laces':
        a.addScaledVector(up, -0.04).addScaledVector(fwd, -0.1);
        break;
      case 'inside':
        a.addScaledVector(n, -0.045).addScaledVector(fwd, -0.06).addScaledVector(UP, 0.035);
        break;
      case 'outside':
        a.addScaledVector(n, -0.045).addScaledVector(fwd, -0.11).addScaledVector(UP, 0.03);
        break;
      case 'toeUnder':
        a.addScaledVector(fwd, -0.2).addScaledVector(UP, 0.02);
        break;
    }
    a.y = Math.max(0.065, a.y);
    const speed = vf.length();
    const back = spec.surface === 'toeUnder' ? 0.32 : 0.28 + 0.022 * speed;
    const high = spec.surface === 'toeUnder' ? 0.22 : 0.18 + 0.018 * speed;
    const hd = vf.clone().setY(0).normalize();
    const left = KickerController.leftOf(hd);
    this.apex.copy(a).addScaledVector(hd, -back).addScaledVector(UP, high).addScaledVector(left, -this.footSign * 0.08);
    this.apexVel.copy(a).sub(this.apex).divideScalar(this.swingDuration).multiplyScalar(0.35);
    this.followVel.copy(vf);
    const ft = spec.surface === 'toeUnder' ? 0.35 : 0.45 + 0.02 * speed;
    this.followEnd
      .copy(a)
      .addScaledVector(vf.clone().normalize(), ft)
      .addScaledVector(UP, spec.surface === 'laces' ? 0.35 + 0.012 * speed : 0.2);
    this.followEnd.y = Math.max(0.15, this.followEnd.y);
  }

  /** Orientation of the kicking boot at impact for each foot surface. */
  footBasisAtContact(n: Vector3): { fwd: Vector3; up: Vector3 } {
    const spec = TECHNIQUES[this.setup.technique];
    const d = n.clone().setY(0).normalize();
    const left = KickerController.leftOf(d);
    const s = this.footSign;
    let fwd: Vector3;
    let up: Vector3;
    switch (spec.surface) {
      case 'laces': {
        const pf = 0.95; // plantar flexion ≈ 55°
        fwd = d.clone().multiplyScalar(Math.cos(pf)).addScaledVector(UP, -Math.sin(pf));
        up = d.clone().multiplyScalar(Math.sin(pf)).addScaledVector(UP, Math.cos(pf));
        break;
      }
      case 'inside':
        // Toes turned out (~75°), slightly raised.
        fwd = d.clone().multiplyScalar(0.26).addScaledVector(left, -s * 0.96).addScaledVector(UP, 0.08).normalize();
        up = UP.clone();
        break;
      case 'outside':
        fwd = d.clone().multiplyScalar(0.7).addScaledVector(left, s * 0.45).addScaledVector(UP, -0.55).normalize();
        up = left.clone().multiplyScalar(-s * 0.6).addScaledVector(UP, 0.8).normalize();
        break;
      default:
        fwd = d.clone().multiplyScalar(0.94).addScaledVector(UP, -0.34).normalize();
        up = UP.clone();
    }
    return { fwd, up };
  }

  /** The game executes the strike at contact; the follow-through then uses it. */
  applyExecutedStrike(strike: FootStrike, leanBack: number): void {
    this.executedStrike = strike;
    this.leanBack = leanBack;
    this.followVel.copy(strike.footVelocity);
    const spec = TECHNIQUES[this.setup.technique];
    const speed = strike.footVelocity.length();
    this.followEnd
      .copy(this.contactAnkle)
      .addScaledVector(strike.footVelocity.clone().normalize(), spec.surface === 'toeUnder' ? 0.35 : 0.45 + 0.02 * speed)
      .addScaledVector(UP, spec.surface === 'laces' ? 0.35 + 0.012 * speed : 0.2);
    this.followEnd.y = Math.max(0.15, this.followEnd.y);
  }

  /** Kick-foot (ankle) world position during the swing phase (time-based). */
  kickAnkleAt(t: number, out: Vector3, vel?: Vector3): Vector3 {
    const tp = this.plantTime;
    const tc = this.contactTime;
    const zero = new Vector3();
    if (t < tc) {
      const T = tc - tp;
      const u = clamp((t - tp) / T, 0, 1);
      hermite(this.apex, this.apexVel, this.contactAnkle, this.followVel, T, u, out);
      if (vel) hermiteVel(this.apex, this.apexVel, this.contactAnkle, this.followVel, T, u, vel);
    } else {
      const T = 0.3;
      const u = clamp((t - tc) / T, 0, 1);
      hermite(this.contactAnkle, this.followVel, this.followEnd, zero, T, u, out);
      if (vel) hermiteVel(this.contactAnkle, this.followVel, this.followEnd, zero, T, u, vel);
      if (t > tc + T) {
        // Leg comes down in front.
        const u2 = clamp((t - tc - T) / 0.25, 0, 1);
        const land = this.plantIdeal.clone().addScaledVector(this.runDir, 0.55);
        land.addScaledVector(KickerController.leftOf(this.runDir), -this.footSign * 0.15);
        out.copy(this.followEnd).lerp(land, smooth(u2));
        out.y = lerp(this.followEnd.y, 0.075, smooth(u2));
      }
    }
    return out;
  }

  // ---------------------------------------------------------------- body

  private updateRunBody(dt: number, u: number): void {
    const left = KickerController.leftOf(this.runDir);
    // Pelvis sways over the stance foot.
    const stance = this.swingFoot === 'L' ? 'R' : 'L';
    const sway = (stance === 'L' ? 1 : -1) * 0.025 * Math.sin(Math.PI * u);
    this.pelvis.copy(this.start).addScaledVector(this.runDir, this.s).addScaledVector(left, sway);
    this.bodyYaw += (yawOf(this.runDir) - this.bodyYaw) * damp(dt, 0.12);
    this.lean += (0.07 + 0.035 * this.v - this.lean) * damp(dt, 0.15);
    if (this.isPlantStep) {
      // Long last stride: body drops and leans back slightly to prepare the strike.
      this.lean += (-0.05 - this.lean) * smooth(u) * damp(dt, 0.05);
    }
  }

  private updateSwingBody(dt: number): void {
    const t = this.t;
    const tp = this.plantTime;
    const tc = this.contactTime;
    const u = clamp((t - tp) / (tc - tp), 0, 1);
    const plant = this.feet[this.supportSide].pos;
    const dShot = dirFromAngles(this.aimYaw, 0).setY(0).normalize();
    const left = KickerController.leftOf(dShot);
    // Hips travel over the support foot by contact, then beyond.
    const overSupport = plant.clone().addScaledVector(left, -this.footSign * 0.09).addScaledVector(dShot, -0.04);
    if (t < tc) {
      this.pelvis.copy(this.pelvisAtPlant).lerp(overSupport, smooth(u));
    } else {
      const u2 = clamp((t - tc) / 0.5, 0, 1);
      this.pelvis.copy(overSupport).addScaledVector(dShot, 0.45 * smooth(u2));
    }
    const target = yawOf(dShot);
    this.bodyYaw += (target + this.hipOpen * 0.2 - this.bodyYaw) * damp(dt, 0.08);
    this.lean += (-0.12 - this.leanBack * 1.6 - this.lean) * damp(dt, 0.06);
    // Kick foot.
    const kf = this.feet[this.kickSide];
    kf.grounded = false;
    this.kickAnkleAt(t, kf.pos);
  }

  private updateFollow(dt: number): void {
    // Decelerate with two jogging steps, then stand and react.
    const T = 0.9;
    const u = clamp(this.t / T, 0, 1);
    const dShot = dirFromAngles(this.aimYaw, 0).setY(0).normalize();
    const land = this.plantIdeal.clone().addScaledVector(this.runDir, 0.55);
    const kf = this.feet[this.kickSide];
    const sf = this.feet[this.supportSide];
    kf.grounded = true;
    kf.pos.y = 0;
    if (u < 1) {
      const base = land.clone().addScaledVector(dShot, 0.6 * smooth(u));
      this.pelvis.lerp(base, damp(dt, 0.15));
      const stepU = clamp((u - 0.2) / 0.5, 0, 1);
      const target = land.clone().addScaledVector(KickerController.leftOf(dShot), this.footSign * 0.28).addScaledVector(dShot, 0.35);
      if (stepU > 0 && stepU < 1) {
        sf.grounded = false;
        sf.pos.lerpVectors(sf.pos, target, smooth(stepU) * 0.3);
        sf.pos.y = Math.sin(Math.PI * stepU) * 0.12;
      } else if (stepU >= 1) {
        sf.pos.copy(target);
        sf.pos.y = 0;
        sf.grounded = true;
      }
    } else if (this.reaction) {
      this.phase = 'react';
      this.reactT = 0;
    }
    this.lean += (0.02 - this.lean) * damp(dt, 0.25);
  }

  react(kind: 'goal' | 'miss' | 'save' | 'post'): void {
    this.reaction = kind;
    if (this.phase === 'react') this.reactT = 0;
  }

  // ---------------------------------------------------------------- pose

  private _q = new Quaternion();
  private _v1 = new Vector3();
  private _v2 = new Vector3();

  /** Builds the full-body pose from the controller state. */
  pose(dt: number): void {
    const rig = this.rig;
    const P = rig.prop;
    rig.resetPose();
    const hips = rig.bones.hips;
    const root = rig.root;
    root.position.set(0, 0, 0);
    root.quaternion.identity();
    let hipY = P.hipsY;
    const phase = this.phase;
    let crouch = 0;
    if (phase === 'run') {
      const u = clamp((this.s - this.stepStartS) / Math.max(1e-3, this.stepEndS - this.stepStartS), 0, 1);
      crouch = 0.03 + 0.012 * this.v + 0.025 * Math.cos(2 * Math.PI * u) * Math.min(1, this.v / 2);
      if (this.isPlantStep) crouch += 0.06 * smooth(u);
    } else if (phase === 'swing') {
      const tc = this.contactTime;
      crouch = this.t < tc ? 0.1 : 0.1 - 0.06 * clamp((this.t - tc) / 0.4, 0, 1);
    } else if (phase === 'idle') {
      crouch = 0.01 + 0.004 * Math.sin(this.breath * 1.7);
    } else if (phase === 'react') {
      crouch = this.reaction === 'miss' || this.reaction === 'save' ? 0.04 : 0;
    }
    hipY -= crouch;
    hips.position.set(this.pelvis.x, hipY, this.pelvis.z);
    // Body orientation: yaw from run, pitch = lean forward, small roll from stance.
    const yaw = this.bodyYaw;
    let lean = this.lean;
    let celebrateArms = 0;
    let handsOnHead = 0;
    if (phase === 'react') {
      const k = smooth(this.reactT / 0.4);
      if (this.reaction === 'goal') celebrateArms = k;
      else if (this.reaction === 'miss' || this.reaction === 'post') handsOnHead = k;
      else handsOnHead = k * 0.6;
      lean = lerp(lean, this.reaction === 'goal' ? -0.12 : 0.12, k);
    }
    let pelvisTwist = 0;
    if (phase === 'swing') {
      const u = clamp((this.t - this.plantTime) / (this.contactTime - this.plantTime), 0, 1);
      // Hip rotation: kick-side hip back during backswing, forward through contact.
      pelvisTwist = this.footSign * lerp(-0.35, 0.3, smooth(u)) + this.hipOpen * 0.4;
    }
    this._q.setFromAxisAngle(UP, yaw + pelvisTwist);
    const qLean = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), lean * 0.5);
    hips.quaternion.copy(this._q).multiply(qLean);
    rig.bones.spine.quaternion.setFromAxisAngle(new Vector3(1, 0, 0), lean * 0.3);
    const chestTwist = new Quaternion().setFromAxisAngle(UP, -pelvisTwist * 0.7);
    rig.bones.chest.quaternion.copy(chestTwist).multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), lean * 0.3));
    if (phase === 'idle') {
      rig.bones.chest.rotateX(0.015 * Math.sin(this.breath * 1.7));
    }
    root.updateMatrixWorld(true);

    // Legs.
    const fwd = new Vector3(Math.sin(yaw), 0, Math.cos(yaw));
    for (const side of ['L', 'R'] as Side[]) {
      const f = this.feet[side];
      const ankle = this._v1.copy(f.pos);
      ankle.y += P.ankleH;
      let footFwd: Vector3;
      let footUp: Vector3 = UP.clone();
      const isKick = side === this.kickSide && (phase === 'swing');
      if (isKick) {
        const n = (this.executedStrike ?? this.plannedStrike)?.normal ?? fwd.clone().negate();
        const basis = this.footBasisAtContact(n);
        // Ankle path is the swing curve itself (already includes ankle height).
        ankle.copy(f.pos);
        const u = clamp((this.t - this.plantTime) / (this.contactTime - this.plantTime + 0.15), 0, 1);
        footFwd = new Vector3().lerpVectors(fwd, basis.fwd, smooth(u * 1.6)).normalize();
        footUp = new Vector3().lerpVectors(UP, basis.up, smooth(u * 1.6)).normalize();
      } else {
        footFwd = new Vector3(Math.sin(f.yaw), 0, Math.cos(f.yaw));
        if (!f.grounded && phase === 'run') {
          // Toe-off then dorsiflexion during swing.
          const pitch = -0.5 * Math.min(1, f.pos.y / 0.1);
          footFwd.applyAxisAngle(KickerController.leftOf(footFwd), -pitch).normalize();
          footUp.applyAxisAngle(KickerController.leftOf(footFwd), -pitch).normalize();
        }
      }
      const thigh = side === 'L' ? 'thighL' : 'thighR';
      const shin = side === 'L' ? 'shinL' : 'shinR';
      const foot = side === 'L' ? 'footL' : 'footR';
      const pole = fwd.clone().addScaledVector(UP, 0.1);
      if (isKick) pole.copy(footFwd).setY(0).normalize().lerp(fwd, 0.5).addScaledVector(UP, 0.2);
      rig.twoBoneIK(thigh, shin, foot, ankle, pole, P.thigh, P.shin);
      rig.setWorldBasis(foot, footUp, footFwd);
    }

    // Arms: counter-swing in the run, balance arm in the strike, reactions.
    const leftV = KickerController.leftOf(fwd);
    for (const side of ['L', 'R'] as Side[]) {
      const sgn = side === 'L' ? 1 : -1;
      const ua = side === 'L' ? 'upperArmL' : 'upperArmR';
      const fa = side === 'L' ? 'foreArmL' : 'foreArmR';
      const hand = side === 'L' ? 'handL' : 'handR';
      const sh = rig.worldPos(ua, new Vector3());
      let target: Vector3;
      if (celebrateArms > 0) {
        target = sh.clone().addScaledVector(UP, 0.5 * celebrateArms + (1 - celebrateArms) * -0.5)
          .addScaledVector(leftV, sgn * 0.25).addScaledVector(fwd, 0.1);
        target.y += 0.05 * Math.sin(this.reactT * 9 + sgn);
      } else if (handsOnHead > 0) {
        const head = rig.worldPos('head', new Vector3());
        const onHead = head.clone().addScaledVector(UP, 0.1).addScaledVector(leftV, sgn * 0.08);
        const down = sh.clone().addScaledVector(UP, -0.52);
        target = down.lerp(onHead, handsOnHead);
      } else if (phase === 'run' || phase === 'follow') {
        const u = phase === 'run' ? clamp((this.s - this.stepStartS) / Math.max(1e-3, this.stepEndS - this.stepStartS), 0, 1) : 0.5;
        const legForward = this.swingFoot === side ? 1 : -1; // swing leg forward → same-side arm back
        const amp = Math.min(1, this.v / 3) * 0.32;
        const sw = -legForward * amp * Math.cos(Math.PI * u);
        target = sh.clone().addScaledVector(UP, -0.43).addScaledVector(fwd, 0.1 + sw).addScaledVector(leftV, sgn * 0.12);
      } else if (phase === 'swing') {
        const isSupportArm = (side === this.supportSide);
        const u = clamp((this.t - this.plantTime) / 0.25, 0, 1);
        if (isSupportArm) {
          target = sh.clone().addScaledVector(leftV, sgn * 0.5).addScaledVector(UP, -0.12 + 0.1 * u).addScaledVector(fwd, 0.15);
        } else {
          target = sh.clone().addScaledVector(UP, -0.4).addScaledVector(fwd, -0.25 + 0.4 * u).addScaledVector(leftV, sgn * 0.2);
        }
      } else {
        target = sh.clone().addScaledVector(UP, -0.55).addScaledVector(fwd, 0.04).addScaledVector(leftV, sgn * 0.08);
      }
      const pole = fwd.clone().multiplyScalar(-1).addScaledVector(leftV, sgn * 0.4).addScaledVector(UP, -0.2);
      rig.twoBoneIK(ua, fa, hand, target, pole, P.upperArm, P.foreArm);
      void hand;
    }
    // Head looks at the ball before contact, then follows the look target.
    const headTarget = this.phase === 'swing' && this.t < this.contactTime + 0.05 ? this.setup.ball : this.lookTarget;
    const head = rig.bones.head;
    const hp = head.getWorldPosition(this._v2);
    const dir = new Vector3().subVectors(headTarget, hp).normalize();
    const hf = dir.clone();
    hf.y = clamp(hf.y, -0.8, 0.5);
    rig.setWorldBasis('head', UP.clone().addScaledVector(hf, -0.15).normalize(), hf);
    void dt;
  }
}
