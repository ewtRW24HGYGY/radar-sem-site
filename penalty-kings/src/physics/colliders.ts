import { Vector3 } from 'three';
import { BALL } from './constants';
import type { BallState } from './ball';

export interface ContactMaterial {
  /** Coefficient of restitution as a function of normal impact speed (m/s). */
  restitution: (vn: number) => number;
  /** Coulomb friction coefficient. */
  friction: number;
}

export type ColliderKind = 'post' | 'bar' | 'frame' | 'keeper' | 'board';

/**
 * Capsule collider (a segment swept by a radius). Kinematic capsules store the
 * previous endpoints so the contact velocity can be computed and the segment
 * interpolated inside sub-steps.
 */
export class Capsule {
  a = new Vector3();
  b = new Vector3();
  prevA = new Vector3();
  prevB = new Vector3();
  constructor(
    public radius: number,
    public kind: ColliderKind,
    public material: ContactMaterial,
    /** Effective mass of the body part behind the capsule (Infinity for the goal frame). */
    public effectiveMass = Infinity,
    public part = '',
  ) {}
  set(a: Vector3, b: Vector3): this {
    this.a.copy(a);
    this.b.copy(b);
    this.prevA.copy(a);
    this.prevB.copy(b);
    return this;
  }
  /** Moves the capsule; previous endpoints become the old ones (kinematic motion). */
  moveTo(a: Vector3, b: Vector3): void {
    this.prevA.copy(this.a);
    this.prevB.copy(this.b);
    this.a.copy(a);
    this.b.copy(b);
  }
  /** Ends motion: velocity becomes zero. */
  settle(): void {
    this.prevA.copy(this.a);
    this.prevB.copy(this.b);
  }
}

const _ab = new Vector3();
const _ap = new Vector3();

/** Parameter t ∈ [0,1] of the closest point on segment [a,b] to p. */
export function closestParamOnSegment(a: Vector3, b: Vector3, p: Vector3): number {
  _ab.subVectors(b, a);
  const len2 = _ab.lengthSq();
  if (len2 < 1e-12) return 0;
  _ap.subVectors(p, a);
  return Math.max(0, Math.min(1, _ap.dot(_ab) / len2));
}

export function closestPointOnSegment(a: Vector3, b: Vector3, p: Vector3, out: Vector3): Vector3 {
  const t = closestParamOnSegment(a, b, p);
  return out.copy(a).lerp(b, t);
}

const _ia = new Vector3();
const _ib = new Vector3();
const _cp = new Vector3();

/** Capsule endpoints interpolated at sub-step fraction s ∈ [0,1] within the current sim step. */
export function capsuleAt(c: Capsule, s: number, outA: Vector3, outB: Vector3): void {
  outA.copy(c.prevA).lerp(c.a, s);
  outB.copy(c.prevB).lerp(c.b, s);
}

/** Signed separation between the ball surface and the capsule surface (negative = penetrating). */
export function separation(c: Capsule, s: number, p: Vector3): number {
  capsuleAt(c, s, _ia, _ib);
  closestPointOnSegment(_ia, _ib, p, _cp);
  return _cp.distanceTo(p) - (BALL.radius + c.radius);
}

export interface ContactResult {
  /** Normal impact speed (m/s, positive when approaching). */
  vn: number;
  /** Tangential slip speed before the impulse. */
  slip: number;
  /** Impulse magnitude (N·s). */
  impulse: number;
  point: Vector3;
  normal: Vector3;
}

const _r = new Vector3();
const _vc = new Vector3();
const _vt = new Vector3();
const _jt = new Vector3();
const _tq = new Vector3();

/**
 * Impulse-based contact between the ball and a body moving with velocity
 * `otherVel` at the contact point. Normal n points from the other body to the
 * ball centre. Handles restitution, Coulomb friction and the spin coupling of a
 * hollow sphere (tangential effective mass m/(1 + mR²/I) = m/2.5).
 */
export function resolveContact(
  ball: BallState,
  n: Vector3,
  otherVel: Vector3,
  mat: ContactMaterial,
  otherMass: number,
  out?: ContactResult,
): ContactResult | null {
  const m = BALL.mass;
  const R = BALL.radius;
  const I = BALL.inertia;
  // Contact point relative to the ball centre.
  _r.copy(n).multiplyScalar(-R);
  // Velocity of the ball surface at the contact, relative to the other body.
  _vc.crossVectors(ball.w, _r).add(ball.v).sub(otherVel);
  const vn = _vc.dot(n);
  if (vn >= 0) return null; // separating
  const invOther = Number.isFinite(otherMass) ? 1 / otherMass : 0;
  const e = mat.restitution(-vn);
  const jn = (-(1 + e) * vn) / (1 / m + invOther);
  ball.v.addScaledVector(n, jn / m);

  // Friction: drive slip to zero, bounded by the Coulomb cone.
  _vt.copy(_vc).addScaledVector(n, -vn);
  const slip = _vt.length();
  if (slip > 1e-6) {
    const invEffT = 1 / m + (R * R) / I + invOther;
    const jtStick = slip / invEffT;
    const jt = Math.min(jtStick, mat.friction * jn);
    _jt.copy(_vt).multiplyScalar(-jt / slip);
    ball.v.addScaledVector(_jt, 1 / m);
    _tq.crossVectors(_r, _jt);
    ball.w.addScaledVector(_tq, 1 / I);
  }
  const res = out ?? { vn: 0, slip: 0, impulse: 0, point: new Vector3(), normal: new Vector3() };
  res.vn = -vn;
  res.slip = slip;
  res.impulse = jn;
  res.point.copy(ball.p).add(_r);
  res.normal.copy(n);
  return res;
}

// ---------------------------------------------------------------- materials

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

/** Natural grass: COR ≈ 0.65 for slow impacts falling to ≈ 0.5 for hard ones. */
export const GRASS: ContactMaterial = {
  restitution: (vn) => (vn < 0.25 ? 0 : clamp(0.68 - 0.012 * vn, 0.48, 0.68)),
  friction: 0.55,
};

/** Painted aluminium posts (12 cm round). */
export const ALUMINIUM_POST: ContactMaterial = {
  restitution: (vn) => clamp(0.74 - 0.008 * vn, 0.5, 0.74),
  friction: 0.28,
};

export const AD_BOARD: ContactMaterial = {
  restitution: (vn) => clamp(0.45 - 0.006 * vn, 0.25, 0.45),
  friction: 0.4,
};

/** Latex goalkeeper glove on a hand (soft, very grippy). */
export const GLOVE: ContactMaterial = {
  restitution: (vn) => clamp(0.42 - 0.006 * vn, 0.18, 0.42),
  friction: 0.85,
};

/** Body / jersey / shin pads. */
export const BODY: ContactMaterial = {
  restitution: (vn) => clamp(0.5 - 0.007 * vn, 0.25, 0.5),
  friction: 0.5,
};

export const BOOT: ContactMaterial = {
  restitution: (vn) => clamp(0.55 - 0.006 * vn, 0.3, 0.55),
  friction: 0.45,
};
