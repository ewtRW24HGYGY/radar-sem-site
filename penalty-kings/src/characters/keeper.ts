import { Quaternion, Vector3 } from 'three';
import { KeeperProfile } from '../ai/profiles';
import { BODY, BOOT, Capsule, GLOVE } from '../physics/colliders';
import { GOAL, GRAVITY } from '../physics/constants';
import { BoneName, Rig } from './rig';
import { clamp, damp, lerp, smooth } from './motion';

export type KeeperPhase = 'ready' | 'hop' | 'push' | 'air' | 'ground' | 'recover' | 'hold' | 'react';
export type SaveMode = 'dive' | 'collapse' | 'stand' | 'jump' | 'foot';
type Side = 'L' | 'R';

const UP = new Vector3(0, 1, 0);
const FWD = new Vector3(0, 0, 1);
const LEFT = new Vector3(1, 0, 0); // keeper faces +Z, so his left is +X

export interface DiveCommand {
  /** Where the hands should be when the ball arrives (world). */
  target: Vector3;
  /** Time from now until the ball is expected (s). */
  arrival: number;
  mode: SaveMode;
}

/** Ready-position line: the keeper stands with his heels on the goal line. */
export const KEEPER_LINE_Z = 0.12;

/**
 * Goalkeeper body. The centre of mass follows Newtonian dynamics: a leg push of
 * finite duration accelerates it up to a take-off velocity bounded by the
 * keeper's power, then it flies ballistically and lands. Arms reach with a
 * bounded hand speed. Collision capsules are built from the posed skeleton so
 * the save happens only if a hand, arm, leg or the body actually meets the ball.
 */
export class KeeperBody {
  phase: KeeperPhase = 'ready';
  t = 0;
  com = new Vector3(0, 0.95, KEEPER_LINE_Z);
  vel = new Vector3();
  roll = 0;
  pitch = 0.18;
  readyHeight = 0.92;
  feet: Record<Side, Vector3> = { L: new Vector3(0.27, 0, KEEPER_LINE_Z - 0.05), R: new Vector3(-0.27, 0, KEEPER_LINE_Z - 0.05) };
  private feetGround: Record<Side, boolean> = { L: true, R: true };
  shuffleTarget = 0;
  private pushDur = 0.18;
  private launch = new Vector3();
  private pushStartVel = new Vector3();
  private diveSign = 0;
  private rollTarget = 0;
  private mode: SaveMode = 'dive';
  /** Desired hand positions (world). null = default posture. */
  handTarget: Record<Side, Vector3 | null> = { L: null, R: null };
  /** Current hand offsets from the shoulders (world axes). */
  private handOff: Record<Side, Vector3> = { L: new Vector3(0.12, -0.42, 0.28), R: new Vector3(-0.12, -0.42, 0.28) };
  private footBlock: Vector3 | null = null;
  private footBlockSide: Side = 'L';
  private pendingDive: DiveCommand | null = null;
  holding = false;
  reaction: 'save' | 'goal' | null = null;
  private reactT = 0;
  private idleT = 0;
  /** True from the moment both feet leave the line before the kick (encroachment check). */
  airborneAt = -1;
  capsules: Capsule[] = [];
  private capDefs: { cap: Capsule; a: BoneName; b: BoneName | null; ext?: number; offA?: number }[] = [];
  /** Wall-clock of the body (s). */
  clock = 0;

  constructor(public rig: Rig, public profile: KeeperProfile) {
    this.buildCapsules();
    this.resetToLine(0);
  }

  resetToLine(x: number): void {
    this.phase = 'ready';
    this.t = 0;
    this.com.set(x, this.readyHeight, KEEPER_LINE_Z);
    this.vel.set(0, 0, 0);
    this.roll = 0;
    this.pitch = 0.18;
    this.feet.L.set(x + 0.27, 0, KEEPER_LINE_Z - 0.04);
    this.feet.R.set(x - 0.27, 0, KEEPER_LINE_Z - 0.04);
    this.feetGround.L = this.feetGround.R = true;
    this.shuffleTarget = x;
    this.handTarget.L = this.handTarget.R = null;
    this.handOff.L.set(0.14, -0.42, 0.26);
    this.handOff.R.set(-0.14, -0.42, 0.26);
    this.footBlock = null;
    this.pendingDive = null;
    this.holding = false;
    this.reaction = null;
    this.airborneAt = -1;
    this.diveSign = 0;
    this.pose();
    for (const d of this.capDefs) d.cap.settle();
  }

  get grounded(): boolean {
    return this.phase === 'ready' || this.phase === 'push' || this.phase === 'ground' || this.phase === 'recover' || this.phase === 'hold';
  }

  /** At least part of one foot on (or above) the goal line? */
  feetOnLine(): boolean {
    const lineBack = -GOAL.lineWidth - 0.05;
    const lineFront = 0.3; // heel on the line, toes in front
    const ok = (s: Side) => this.feetGround[s] && this.feet[s].z > lineBack && this.feet[s].z < lineFront + 0.1;
    return ok('L') || ok('R');
  }

  /** Lateral movement along the line before the kick. */
  setShuffle(x: number): void {
    this.shuffleTarget = clamp(x, -2.5, 2.5);
  }

  /** Small split-step hop timed with the strike: keeps the body loaded. */
  splitStep(): void {
    if (this.phase !== 'ready') return;
    this.phase = 'hop';
    this.t = 0;
    this.vel.y = 1.15;
  }

  dive(cmd: DiveCommand): void {
    if (this.phase === 'hop') {
      this.pendingDive = cmd; // must land first: cannot push in the air
      return;
    }
    if (this.phase !== 'ready' && !(this.phase === 'push' && this.profile.adjustPush)) return;
    this.mode = cmd.mode;
    const P = this.profile;
    const c = this.com;
    const tgt = cmd.target;
    const dx = tgt.x - c.x;
    const reach = this.rig.prop.hipsY * 0.0 + 1.12 * (this.rig.dims.height / 1.86);
    if (cmd.mode === 'stand' || cmd.mode === 'foot') {
      this.footBlock = cmd.mode === 'foot' ? tgt.clone() : null;
      this.footBlockSide = dx > 0 ? 'L' : 'R';
      this.phase = 'ready';
      this.shuffleTarget = clamp(c.x + dx * 0.4, -3, 3);
      return;
    }
    this.diveSign = cmd.mode === 'jump' ? Math.sign(dx) * 0.2 : Math.sign(dx) || 1;
    const demand = Math.min(1, Math.abs(dx) / 3);
    this.pushDur = cmd.mode === 'collapse' ? P.pushTime * 0.6 : P.pushTime * (0.75 + 0.3 * demand);
    if (this.phase === 'push') this.pushDur = Math.max(this.t + 0.04, this.pushDur);
    // Where the hips need to be so that extended arms reach the target.
    const toT = new Vector3(dx, tgt.y - c.y, 0);
    const dist = toT.length();
    const useReach = cmd.mode === 'collapse' ? reach * 0.85 : reach * 0.97;
    const hipGoal = new Vector3().copy(c);
    if (dist > useReach) hipGoal.addScaledVector(toT.normalize(), dist - useReach);
    const Tf = Math.max(0.06, cmd.arrival - this.pushDur * 0.55);
    const total = Tf + this.pushDur * 0.5;
    let vx = (hipGoal.x - c.x) / total;
    let vy = (hipGoal.y - c.y + 0.5 * GRAVITY * Tf * Tf) / Tf;
    if (cmd.mode === 'collapse') vy = Math.min(vy, 0.6);
    if (cmd.mode === 'jump') vx *= 0.6;
    vx = clamp(vx, -P.maxLateral, P.maxLateral);
    vy = clamp(vy, -0.6, P.maxVertical);
    // Total leg power bound.
    const vmax = Math.hypot(P.maxLateral, P.maxVertical * 0.8);
    const vm = Math.hypot(vx, vy);
    if (vm > vmax) {
      vx *= vmax / vm;
      vy *= vmax / vm;
    }
    const vz = clamp((tgt.z - c.z) / Math.max(0.2, total), -0.3, 1.1);
    this.launch.set(vx, vy, vz);
    // Body orientation in flight: axis from hips to the target.
    const ang = Math.atan2(Math.abs(dx), Math.max(-0.4, tgt.y - c.y + 0.25));
    this.rollTarget = Math.sign(dx) * clamp(ang, 0, cmd.mode === 'jump' ? 0.5 : 1.62);
    if (this.phase !== 'push') {
      this.phase = 'push';
      this.t = 0;
      this.pushStartVel.copy(this.vel);
    }
  }

  /** Visual feedback after the outcome. */
  react(kind: 'save' | 'goal'): void {
    this.reaction = kind;
    this.reactT = 0;
  }

  update(dt: number, ballPos: Vector3 | null): void {
    this.clock += dt;
    this.t += dt;
    this.idleT += dt;
    const P = this.profile;
    const c = this.com;
    switch (this.phase) {
      case 'ready': {
        // Footwork along the line; ready stance with a soft bounce.
        const dx = this.shuffleTarget - c.x;
        const vx = clamp(dx * 6, -P.shuffleSpeed, P.shuffleSpeed);
        this.vel.x += (vx - this.vel.x) * damp(dt, 0.08);
        this.vel.y = 0;
        this.vel.z = 0;
        c.x += this.vel.x * dt;
        const bob = 0.012 * Math.sin(this.idleT * 4.2);
        c.y += (this.readyHeight + bob - (this.footBlock ? 0.25 : 0) - c.y) * damp(dt, 0.1);
        c.z += (KEEPER_LINE_Z + (this.footBlock ? 0.1 : 0) - c.z) * damp(dt, 0.2);
        this.roll += (0 - this.roll) * damp(dt, 0.15);
        this.updateFeetShuffle(dt);
        if (this.reaction) this.reactT += dt;
        break;
      }
      case 'hop': {
        this.vel.y -= GRAVITY * dt;
        c.y += this.vel.y * dt;
        this.feetGround.L = this.feetGround.R = false;
        for (const s of ['L', 'R'] as Side[]) this.feet[s].y = Math.max(0, c.y - this.readyHeight);
        if (c.y <= this.readyHeight - 0.03 && this.vel.y < 0) {
          c.y = this.readyHeight - 0.03;
          this.vel.y = 0;
          this.feet.L.y = this.feet.R.y = 0;
          this.feetGround.L = this.feetGround.R = true;
          this.phase = 'ready';
          this.t = 0;
          if (this.pendingDive) {
            const d = this.pendingDive;
            this.pendingDive = null;
            d.arrival -= 0.0;
            this.dive(d);
          }
        }
        break;
      }
      case 'push': {
        const u = clamp(this.t / this.pushDur, 0, 1);
        // Load (COM drops) then explosive extension.
        const k = smooth(u);
        this.vel.lerpVectors(this.pushStartVel, this.launch, k);
        if (u < 0.35) this.vel.y = lerp(this.pushStartVel.y, -0.6, u / 0.35) * (this.mode === 'collapse' ? 1.5 : 1);
        else this.vel.y = lerp(-0.6, this.launch.y, (u - 0.35) / 0.65);
        c.addScaledVector(this.vel, dt);
        this.roll += clamp(this.rollTarget * 0.35 * k - this.roll, -P.rollRate * dt, P.rollRate * dt);
        // Near foot steps out, far foot pushes.
        const near: Side = this.diveSign > 0 ? 'L' : 'R';
        const far: Side = near === 'L' ? 'R' : 'L';
        if (u < 0.6) {
          this.feet[near].x += this.diveSign * 1.2 * dt;
          this.feet[near].y = Math.sin(Math.PI * u / 0.6) * 0.06;
          this.feetGround[near] = u > 0.5;
        }
        this.feetGround[far] = true;
        if (u >= 1) {
          this.phase = 'air';
          this.t = 0;
          this.vel.copy(this.launch);
          this.feetGround.L = this.feetGround.R = false;
        }
        break;
      }
      case 'air': {
        this.vel.y -= GRAVITY * dt;
        c.addScaledVector(this.vel, dt);
        this.roll += clamp(this.rollTarget - this.roll, -P.rollRate * dt, P.rollRate * dt);
        const lying = 0.17 + 0.6 * Math.cos(clamp(Math.abs(this.roll), 0, Math.PI / 2));
        if (c.y <= lying && this.vel.y < 0) {
          c.y = lying;
          this.phase = 'ground';
          this.t = 0;
          this.vel.y = 0;
        }
        break;
      }
      case 'ground': {
        // Sliding on the turf.
        const vh = Math.hypot(this.vel.x, this.vel.z);
        const dec = Math.min(vh, 7 * dt);
        if (vh > 1e-4) {
          this.vel.x *= (vh - dec) / vh;
          this.vel.z *= (vh - dec) / vh;
        }
        c.addScaledVector(this.vel, dt);
        const rt = Math.sign(this.roll || this.diveSign || 1) * 1.45;
        this.roll += clamp(rt - this.roll, -3 * dt, 3 * dt);
        c.y += (0.2 - c.y) * damp(dt, 0.08);
        if (this.t > (this.holding ? 0.9 : 0.8)) {
          this.phase = 'recover';
          this.t = 0;
        }
        break;
      }
      case 'recover': {
        const u = clamp(this.t / 1.0, 0, 1);
        this.roll = lerp(this.roll, 0, smooth(u) * 0.15);
        c.y = lerp(c.y, this.readyHeight + 0.05, damp(dt, 0.25));
        this.vel.set(0, 0, 0);
        if (u >= 1) {
          this.phase = this.holding ? 'hold' : 'ready';
          this.t = 0;
          this.shuffleTarget = c.x;
          this.feet.L.set(c.x + 0.22, 0, c.z - 0.05);
          this.feet.R.set(c.x - 0.22, 0, c.z - 0.05);
          this.feetGround.L = this.feetGround.R = true;
        }
        break;
      }
      case 'hold':
      case 'react':
        this.reactT += dt;
        c.y += (this.readyHeight + 0.06 - c.y) * damp(dt, 0.3);
        this.roll += (0 - this.roll) * damp(dt, 0.2);
        break;
    }
    if (this.airborneAt < 0 && !this.feetGround.L && !this.feetGround.R) this.airborneAt = this.clock;
    if (this.feetGround.L || this.feetGround.R) this.airborneAt = -1;
    this.updateHands(dt, ballPos);
    this.pose();
    this.updateCapsules();
  }

  private updateFeetShuffle(dt: number): void {
    // Footsteps follow the hips without sliding: one foot moves at a time.
    const c = this.com;
    const want: Record<Side, number> = { L: c.x + 0.27, R: c.x - 0.27 };
    for (const s of ['L', 'R'] as Side[]) {
      const f = this.feet[s];
      const err = want[s] - f.x;
      const other = this.feet[s === 'L' ? 'R' : 'L'];
      if (Math.abs(err) > 0.08 && other.y <= 0.001) {
        const step = clamp(err, -3.2 * dt, 3.2 * dt);
        f.x += step;
        f.y = Math.min(0.06, f.y + 0.6 * dt);
        this.feetGround[s] = false;
      } else {
        f.y = Math.max(0, f.y - 0.8 * dt);
        this.feetGround[s] = f.y <= 0.001;
      }
      f.z += (KEEPER_LINE_Z - 0.04 - f.z) * damp(dt, 0.1);
    }
  }

  private shoulder(side: Side, out: Vector3): Vector3 {
    return this.rig.worldPos(side === 'L' ? 'upperArmL' : 'upperArmR', out);
  }

  private _sh = new Vector3();
  private _d = new Vector3();

  private updateHands(dt: number, _ball: Vector3 | null): void {
    const P = this.profile;
    const armLen = this.rig.prop.upperArm + this.rig.prop.foreArm + 0.1;
    const bodyUp = new Vector3(0, 1, 0).applyAxisAngle(FWD, -this.roll);
    const bodyLeft = new Vector3(1, 0, 0).applyAxisAngle(FWD, -this.roll);
    for (const s of ['L', 'R'] as Side[]) {
      const sgn = s === 'L' ? 1 : -1;
      const sh = this.shoulder(s, this._sh);
      let desired: Vector3;
      const tgt = this.handTarget[s];
      if (this.holding) {
        desired = new Vector3(sgn * -0.08, -0.25, 0.3).applyAxisAngle(FWD, -this.roll);
      } else if (tgt) {
        desired = this._d.subVectors(tgt, sh).clone();
      } else if (this.phase === 'air' || this.phase === 'push') {
        // Arms lead the dive along the body axis.
        desired = bodyUp.clone().multiplyScalar(0.62).addScaledVector(bodyLeft, sgn * 0.08).addScaledVector(FWD, 0.15);
      } else if (this.phase === 'ground') {
        desired = bodyUp.clone().multiplyScalar(0.45).addScaledVector(FWD, 0.2);
      } else if (this.reaction === 'save' && this.reactT > 0.3) {
        const pump = Math.sin(clamp((this.reactT - 0.3) * 6, 0, Math.PI));
        desired = new Vector3(sgn * 0.15, -0.35 + (s === 'L' ? 0.75 * pump : 0), 0.2);
      } else if (this.reaction === 'goal') {
        desired = new Vector3(sgn * 0.18, -0.55, 0.05);
      } else {
        desired = new Vector3(sgn * 0.17, -0.4, 0.27);
      }
      if (desired.length() > armLen) desired.setLength(armLen);
      const cur = this.handOff[s];
      const delta = desired.sub(cur);
      const maxStep = P.armSpeed * dt;
      if (delta.length() > maxStep) delta.setLength(maxStep);
      cur.add(delta);
    }
  }

  private pose(): void {
    const rig = this.rig;
    const P = rig.prop;
    rig.resetPose();
    const c = this.com;
    rig.root.position.set(0, 0, 0);
    rig.root.quaternion.identity();
    const hips = rig.bones.hips;
    hips.position.copy(c);
    const qRoll = new Quaternion().setFromAxisAngle(FWD, -this.roll);
    const pitch = this.phase === 'air' || this.phase === 'ground' ? 0.05 : this.pitch;
    const qPitch = new Quaternion().setFromAxisAngle(LEFT, pitch);
    hips.quaternion.copy(qRoll).multiply(qPitch);
    rig.bones.spine.quaternion.setFromAxisAngle(LEFT, this.phase === 'air' ? -0.05 : 0.12);
    rig.bones.chest.quaternion.setFromAxisAngle(LEFT, this.phase === 'air' ? -0.05 : 0.1);
    rig.root.updateMatrixWorld(true);
    const bodyDown = new Vector3(0, -1, 0).applyQuaternion(qRoll);
    const bodyLeft = new Vector3(1, 0, 0).applyQuaternion(qRoll);
    // Legs.
    for (const s of ['L', 'R'] as Side[]) {
      const sgn = s === 'L' ? 1 : -1;
      let ankle: Vector3;
      let footFwd = FWD.clone();
      let footUp = UP.clone();
      if (this.footBlock && s === this.footBlockSide && this.phase === 'ready') {
        ankle = this.footBlock.clone();
        ankle.y = Math.max(0.09, ankle.y);
        footFwd = new Vector3(sgn, 0.0, 0.4).normalize();
      } else if (this.phase === 'air' || this.phase === 'ground' || (this.phase === 'push' && !this.feetGround[s])) {
        // Legs trail below the body axis, top leg slightly bent.
        const top = Math.sign(this.roll) === sgn;
        ankle = c
          .clone()
          .addScaledVector(bodyDown, P.thigh + P.shin - (top ? 0.12 : 0.04))
          .addScaledVector(bodyLeft, sgn * (top ? 0.16 : 0.1))
          .addScaledVector(FWD, top ? 0.12 : -0.05);
        if (ankle.y < 0.07) ankle.y = 0.07;
        footFwd = FWD.clone().addScaledVector(bodyDown, 0.5).normalize();
        footUp = bodyDown.clone().negate().addScaledVector(FWD, 0.3).normalize();
      } else {
        ankle = this.feet[s].clone();
        ankle.y += P.ankleH;
        footFwd = new Vector3(sgn * 0.18, 0, 1).normalize();
      }
      const pole = FWD.clone().addScaledVector(bodyLeft, sgn * 0.35);
      rig.twoBoneIK(s === 'L' ? 'thighL' : 'thighR', s === 'L' ? 'shinL' : 'shinR', s === 'L' ? 'footL' : 'footR', ankle, pole, P.thigh, P.shin);
      rig.setWorldBasis(s === 'L' ? 'footL' : 'footR', footUp, footFwd);
    }
    // Arms.
    for (const s of ['L', 'R'] as Side[]) {
      const sgn = s === 'L' ? 1 : -1;
      const sh = this.shoulder(s, this._sh);
      const target = sh.clone().add(this.handOff[s]);
      const pole = new Vector3(sgn * 0.6, -0.4, -0.6).applyQuaternion(qRoll);
      rig.twoBoneIK(s === 'L' ? 'upperArmL' : 'upperArmR', s === 'L' ? 'foreArmL' : 'foreArmR', s === 'L' ? 'handL' : 'handR', target, pole, P.upperArm, P.foreArm);
      // Palm faces the direction of reach, fingers continue the forearm.
      const fa = rig.worldPos(s === 'L' ? 'foreArmL' : 'foreArmR', new Vector3());
      const hd = rig.worldPos(s === 'L' ? 'handL' : 'handR', new Vector3());
      const dir = hd.clone().sub(fa).normalize();
      rig.setWorldBasis(s === 'L' ? 'handL' : 'handR', dir.clone().negate(), FWD.clone().addScaledVector(dir, -dir.z));
    }
    // Head watches the ball (or forward).
    rig.setWorldBasis('head', new Vector3(0, 1, 0).applyQuaternion(qRoll).lerp(UP, 0.5).normalize(), FWD);
    rig.update();
  }

  // ------------------------------------------------------------ collision

  private buildCapsules(): void {
    const P = this.profile;
    const def = (r: number, a: BoneName, b: BoneName | null, part: string, mass: number, mat = BODY, ext = 0) => {
      const cap = new Capsule(r, 'keeper', mat, mass, part);
      this.capDefs.push({ cap, a, b, ext });
      this.capsules.push(cap);
    };
    def(0.068, 'handL', null, 'handL', P.handMass, GLOVE, 0.17);
    def(0.068, 'handR', null, 'handR', P.handMass, GLOVE, 0.17);
    def(0.046, 'foreArmL', 'handL', 'foreArmL', 2.4);
    def(0.046, 'foreArmR', 'handR', 'foreArmR', 2.4);
    def(0.056, 'upperArmL', 'foreArmL', 'upperArmL', 4);
    def(0.056, 'upperArmR', 'foreArmR', 'upperArmR', 4);
    def(0.155, 'hips', 'neck', 'torso', 32);
    def(0.105, 'head', null, 'head', 5, BODY, 0.08);
    def(0.078, 'thighL', 'shinL', 'thighL', 9);
    def(0.078, 'thighR', 'shinR', 'thighR', 9);
    def(0.058, 'shinL', 'footL', 'shinL', 4.5);
    def(0.058, 'shinR', 'footR', 'shinR', 4.5);
    def(0.052, 'footL', 'toeL', 'footL', 1.6, BOOT, 0.05);
    def(0.052, 'footR', 'toeR', 'footR', 1.6, BOOT, 0.05);
  }

  private _a = new Vector3();
  private _b = new Vector3();

  updateCapsules(): void {
    for (const d of this.capDefs) {
      this.rig.worldPos(d.a, this._a);
      if (d.b) {
        this.rig.worldPos(d.b, this._b);
        if (d.ext) this._b.addScaledVector(this._b.clone().sub(this._a).normalize(), d.ext);
      } else {
        // Single bone: extend along the bone's local −Y (hands/fingers) or +Y (head).
        const q = this.rig.bones[d.a].getWorldQuaternion(new Quaternion());
        const axis = new Vector3(0, d.a === 'head' ? 1 : -1, 0).applyQuaternion(q);
        if (d.a === 'head') this._a.addScaledVector(axis, 0.06);
        this._b.copy(this._a).addScaledVector(axis, d.ext ?? 0.1);
      }
      d.cap.moveTo(this._a, this._b);
    }
  }

  /** Midpoint between the gloves (for holding the ball). */
  handsMid(out: Vector3): Vector3 {
    const a = this.capsules[0];
    const b = this.capsules[1];
    return out.copy(a.a).add(a.b).add(b.a).add(b.b).multiplyScalar(0.25);
  }

  handsGap(): number {
    const a = this.capsules[0];
    const b = this.capsules[1];
    const ma = a.a.clone().add(a.b).multiplyScalar(0.5);
    const mb = b.a.clone().add(b.b).multiplyScalar(0.5);
    return ma.distanceTo(mb);
  }
}
