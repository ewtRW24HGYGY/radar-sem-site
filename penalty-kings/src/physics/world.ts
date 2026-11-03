import { Vector3 } from 'three';
import { AeroEnv, BallState, defaultEnv, integrateFlight } from './ball';
import {
  AD_BOARD,
  ALUMINIUM_POST,
  Capsule,
  ContactResult,
  GRASS,
  capsuleAt,
  closestPointOnSegment,
  resolveContact,
  separation,
} from './colliders';
import { BALL, GOAL, GOAL_LINE_CROSS_Z, MAX_SUBSTEP_TRAVEL } from './constants';
import { NetContactEvent, NetMembrane } from './net';

export type PhysicsEventType = 'ground' | 'post' | 'bar' | 'net' | 'keeper' | 'board' | 'goalLine';

export interface PhysicsEvent {
  type: PhysicsEventType;
  /** Simulation time (s) since the world was reset. */
  time: number;
  /** Impact normal speed (m/s). */
  speed: number;
  point: Vector3;
  normal?: Vector3;
  part?: string;
  /** For goalLine events: whether the crossing happened inside the goal mouth. */
  inside?: boolean;
}

/** Distance at which the goal-mouth plane is considered for goal detection. */
const BOARD_Z = -5.2;
const BOARD_H = 0.95;

/**
 * Ball world: fixed-step, sub-stepped integration with continuous collision
 * detection against the goal frame, ground, advertising boards, the net
 * membranes and the (kinematic) goalkeeper capsules.
 */
export class PhysicsWorld {
  ball = new BallState();
  env: AeroEnv = defaultEnv();
  net = new NetMembrane();
  time = 0;
  /** Static goal frame. */
  frame: Capsule[] = [];
  /** Kinematic capsules supplied each step (goalkeeper body parts). */
  dynamic: Capsule[] = [];
  events: PhysicsEvent[] = [];
  /** When set, the ball is held (e.g. caught) and follows this target. */
  holder: { target: Vector3; velocity: Vector3 } | null = null;
  /** Ball is considered at rest on the grass. */
  resting = false;
  onGround = false;
  crossedLine = false;
  /** Sub-steps used during the last step (diagnostics). */
  lastSubsteps = 0;

  private netEvents: NetContactEvent[] = [];
  private contact: ContactResult = { vn: 0, slip: 0, impulse: 0, point: new Vector3(), normal: new Vector3() };

  constructor() {
    const X = GOAL.postX;
    const Z = GOAL.postZ;
    const r = GOAL.postRadius;
    const left = new Capsule(r, 'post', ALUMINIUM_POST, Infinity, 'leftPost').set(
      new Vector3(-X, -0.5, Z),
      new Vector3(-X, GOAL.barY, Z),
    );
    const right = new Capsule(r, 'post', ALUMINIUM_POST, Infinity, 'rightPost').set(
      new Vector3(X, -0.5, Z),
      new Vector3(X, GOAL.barY, Z),
    );
    const bar = new Capsule(r, 'bar', ALUMINIUM_POST, Infinity, 'crossbar').set(
      new Vector3(-X, GOAL.barY, Z),
      new Vector3(X, GOAL.barY, Z),
    );
    this.frame.push(left, right, bar);
  }

  reset(p: Vector3): void {
    this.ball.p.copy(p);
    this.ball.v.set(0, 0, 0);
    this.ball.w.set(0, 0, 0);
    this.ball.q.identity();
    this.time = 0;
    this.events.length = 0;
    this.holder = null;
    this.resting = true;
    this.onGround = true;
    this.crossedLine = false;
    this.net.reset(p);
  }

  /** Wake the ball after a kick. */
  wake(): void {
    this.resting = false;
  }

  step(dt: number): void {
    this.events.length = 0;
    const b = this.ball;
    if (this.holder) {
      b.v.subVectors(this.holder.target, b.p).divideScalar(dt);
      b.p.copy(this.holder.target);
      b.w.multiplyScalar(Math.exp(-8 * dt));
      this.time += dt;
      return;
    }
    if (this.resting) {
      this.time += dt;
      return;
    }
    const speed = b.v.length();
    let n = Math.ceil((speed * dt) / MAX_SUBSTEP_TRAVEL);
    n = Math.max(4, Math.min(96, n));
    this.lastSubsteps = n;
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      this.substep(h, (i + 1) / n, i / n);
    }
    this.time += dt;
    // Rest detection.
    if (this.onGround && b.v.lengthSq() < 0.0004 && b.w.lengthSq() < 0.04) {
      b.v.set(0, 0, 0);
      b.w.set(0, 0, 0);
      this.resting = true;
    }
  }

  private p0 = new Vector3();
  private tmpA = new Vector3();
  private tmpB = new Vector3();
  private tmpC = new Vector3();
  private tmpN = new Vector3();
  private tmpV = new Vector3();

  private substep(h: number, s1: number, s0: number): void {
    const b = this.ball;
    const R = BALL.radius;
    this.p0.copy(b.p);
    const field = this.anyNetEngaged() || this.nearNet(b.p) ? this.net.field : null;
    integrateFlight(b, h, this.env, field);

    this.netEvents.length = 0;
    this.net.updateState(b.p, b.v, this.netEvents);
    for (const e of this.netEvents) {
      this.events.push({ type: 'net', time: this.time, speed: e.speed, point: e.point, part: e.panel });
    }

    // Goal line crossing (whole ball beyond the whole line).
    if (!this.crossedLine && this.p0.z >= GOAL_LINE_CROSS_Z && b.p.z < GOAL_LINE_CROSS_Z) {
      const t = (this.p0.z - GOAL_LINE_CROSS_Z) / (this.p0.z - b.p.z);
      const cx = this.p0.x + (b.p.x - this.p0.x) * t;
      const cy = this.p0.y + (b.p.y - this.p0.y) * t;
      this.crossedLine = true;
      const inside = Math.abs(cx) < GOAL.halfWidth && cy < GOAL.height && cy > -0.01;
      this.events.push({
        type: 'goalLine',
        time: this.time,
        speed: b.v.length(),
        point: new Vector3(cx, cy, GOAL_LINE_CROSS_Z),
        inside,
      });
    }

    // Capsules: static frame then kinematic keeper parts.
    for (const c of this.frame) this.collideCapsule(c, s0, s1, h);
    for (const c of this.dynamic) this.collideCapsule(c, s0, s1, h);

    // Advertising boards behind the goal (vertical wall).
    if (b.p.z - R < BOARD_Z && this.p0.z - R >= BOARD_Z && b.p.y < BOARD_H + R && Math.abs(b.p.x) < 30) {
      b.p.z = BOARD_Z + R;
      const res = resolveContact(b, this.tmpN.set(0, 0, 1), this.tmpV.set(0, 0, 0), AD_BOARD, Infinity, this.contact);
      if (res) this.events.push({ type: 'board', time: this.time, speed: res.vn, point: res.point.clone() });
    }

    // Ground.
    this.onGround = false;
    if (b.p.y <= R + 1e-4) {
      b.p.y = R;
      this.onGround = true;
      if (b.v.y < -0.25) {
        const res = resolveContact(b, this.tmpN.set(0, 1, 0), this.tmpV.set(0, 0, 0), GRASS, Infinity, this.contact);
        if (res && res.vn > 0.6) {
          this.events.push({ type: 'ground', time: this.time, speed: res.vn, point: res.point.clone() });
        }
      } else {
        this.rollOnGrass(h);
      }
    }
  }

  /** Sustained contact with the turf: rolling friction, slip friction, grass drag. */
  private rollOnGrass(h: number): void {
    const b = this.ball;
    const R = BALL.radius;
    const m = BALL.mass;
    if (b.v.y < 0) b.v.y = 0;
    // Slip velocity of the contact point.
    const vc = this.tmpV.set(b.v.x + b.w.z * R, 0, b.v.z - b.w.x * R);
    // (ω × (−R ŷ)) = (−R)(ω × ŷ) = (−R)(−ωz, 0, ωx) = (Rωz, 0, −Rωx)
    const slip = vc.length();
    if (slip > 1e-5) {
      const N = m * 9.81;
      const jStick = slip / (1 / m + (R * R) / BALL.inertia);
      const j = Math.min(jStick, GRASS.friction * N * h);
      const jx = (-vc.x / slip) * j;
      const jz = (-vc.z / slip) * j;
      b.v.x += jx / m;
      b.v.z += jz / m;
      // τ = r × J with r = (0,−R,0)
      b.w.x += (-R * jz) / BALL.inertia;
      b.w.z += (R * jx) / BALL.inertia;
    }
    // Rolling resistance of natural grass (deceleration ≈ 0.45 m/s² + grass drag).
    const vh = Math.hypot(b.v.x, b.v.z);
    if (vh > 1e-5) {
      const dec = Math.min(vh, (0.45 + 0.05 * vh) * h);
      const f = (vh - dec) / vh;
      b.v.x *= f;
      b.v.z *= f;
      b.w.x *= f;
      b.w.z *= f;
    }
    // Spin around the vertical axis is quickly killed by the turf.
    b.w.y *= Math.exp(-4 * h);
  }

  private collideCapsule(c: Capsule, s0: number, s1: number, h: number): void {
    const b = this.ball;
    if (separation(c, s1, b.p) >= 0) return;
    // Time of impact inside the sub-step by bisection on the swept motion.
    let lo = 0;
    let hi = 1;
    const pEnd = this.tmpC.copy(b.p);
    const pS = new Vector3();
    if (separation(c, s0, this.p0) < 0) {
      lo = 0;
      hi = 0; // already overlapping at the start: resolve in place
    } else {
      for (let k = 0; k < 18; k++) {
        const mid = (lo + hi) / 2;
        pS.copy(this.p0).lerp(pEnd, mid);
        if (separation(c, s0 + (s1 - s0) * mid, pS) < 0) hi = mid;
        else lo = mid;
      }
    }
    const tImpact = hi;
    const sImpact = s0 + (s1 - s0) * tImpact;
    pS.copy(this.p0).lerp(pEnd, tImpact);
    capsuleAt(c, sImpact, this.tmpA, this.tmpB);
    const cp = closestPointOnSegment(this.tmpA, this.tmpB, pS, new Vector3());
    const nrm = this.tmpN.subVectors(pS, cp);
    const dist = nrm.length();
    if (dist < 1e-6) nrm.set(0, 0, 1);
    else nrm.divideScalar(dist);
    // Place the ball exactly at contact distance.
    b.p.copy(cp).addScaledVector(nrm, BALL.radius + c.radius + 1e-4);
    // Velocity of the capsule surface at the contact point.
    const vel = this.capsulePointVelocity(c, cp, h);
    const res = resolveContact(b, nrm, vel, c.material, c.effectiveMass, this.contact);
    if (res) {
      this.events.push({
        type: c.kind === 'frame' ? 'post' : (c.kind as PhysicsEventType),
        time: this.time,
        speed: res.vn,
        point: res.point.clone(),
        normal: nrm.clone(),
        part: c.part,
      });
    }
    // Spend the rest of the sub-step with the new velocity.
    b.p.addScaledVector(b.v, h * (1 - tImpact));
    // Never leave the ball penetrating (e.g. a fast moving hand).
    capsuleAt(c, s1, this.tmpA, this.tmpB);
    const cp2 = closestPointOnSegment(this.tmpA, this.tmpB, b.p, new Vector3());
    const d2 = b.p.distanceTo(cp2);
    const minD = BALL.radius + c.radius;
    if (d2 < minD) {
      const dir = new Vector3().subVectors(b.p, cp2);
      if (dir.lengthSq() < 1e-12) dir.copy(nrm);
      dir.normalize();
      b.p.copy(cp2).addScaledVector(dir, minD + 1e-4);
    }
  }

  /** Linear velocity of the point of capsule c closest to `cp`, over the current step. */
  private capsulePointVelocity(c: Capsule, cp: Vector3, h: number): Vector3 {
    const out = new Vector3();
    const da = new Vector3().subVectors(c.a, c.prevA);
    const db = new Vector3().subVectors(c.b, c.prevB);
    if (da.lengthSq() + db.lengthSq() < 1e-14) return out;
    const ab = new Vector3().subVectors(c.b, c.a);
    const len2 = ab.lengthSq();
    const t = len2 > 1e-12 ? Math.max(0, Math.min(1, new Vector3().subVectors(cp, c.a).dot(ab) / len2)) : 0;
    // The capsule moved over one full sim step; h is the sub-step, so recover the step length.
    const stepDt = this.stepDt;
    out.copy(da).lerp(db, t).divideScalar(stepDt);
    void h;
    return out;
  }

  /** Sim-step length used to turn kinematic displacements into velocities. */
  stepDt = 1 / 240;

  private anyNetEngaged(): boolean {
    const e = this.net.engaged;
    for (let i = 0; i < e.length; i++) if (e[i] !== 0) return true;
    return false;
  }

  private nearNet(p: Vector3): boolean {
    return p.z < 0.2 && p.z > -3 && Math.abs(p.x) < GOAL.postX + 0.5 && p.y < GOAL.barY + 0.4;
  }
}
