import { Quaternion, Vector3 } from 'three';
import { AIR_DENSITY, AIR_KINEMATIC_VISCOSITY, BALL, GRAVITY } from './constants';

/**
 * Rigid-body state of the ball. Position of the centre, linear velocity,
 * angular velocity (world frame, rad/s) and orientation.
 */
export class BallState {
  p = new Vector3();
  v = new Vector3();
  w = new Vector3();
  q = new Quaternion();

  copy(o: BallState): this {
    this.p.copy(o.p);
    this.v.copy(o.v);
    this.w.copy(o.w);
    this.q.copy(o.q);
    return this;
  }
  clone(): BallState {
    return new BallState().copy(this);
  }
}

export interface AeroEnv {
  /** Wind velocity (m/s, world frame). */
  wind: Vector3;
  airDensity: number;
}

export const defaultEnv = (): AeroEnv => ({ wind: new Vector3(), airDensity: AIR_DENSITY });

/** Reynolds number for the ball at a given airspeed. */
export function reynolds(speed: number): number {
  return (speed * 2 * BALL.radius) / AIR_KINEMATIC_VISCOSITY;
}

/**
 * Drag coefficient with the drag crisis of a modern 6–20 panel ball:
 * subcritical Cd ≈ 0.47, supercritical Cd ≈ 0.20 above Re ≈ 2.4e5 (≈ 17 m/s).
 * Spinning balls carry a small extra drag (Goff & Carré 2009; Asai et al. 2007).
 */
export function dragCoefficient(speed: number, spinParam: number): number {
  const re = reynolds(speed);
  const base = 0.2 + 0.27 / (1 + Math.exp((re - 2.0e5) / 2.5e4));
  return base + 0.12 * Math.min(spinParam, 0.6);
}

/** Magnus lift coefficient as a function of spin parameter S = rω/v. */
export function liftCoefficient(spinParam: number): number {
  const s = Math.min(spinParam, 1.2);
  return (1.2 * s) / (1 + 1.8 * s);
}

/**
 * Seam (knuckle) side-force coefficient. Only relevant with very little spin
 * near and above the drag crisis: the boundary layer separates asymmetrically
 * depending on where the panel seams sit relative to the airflow.
 * It is driven by the ball's real orientation — no randomness.
 */
export function knuckleCoefficient(speed: number, spinParam: number): number {
  const t = Math.min(1, Math.max(0, (speed - 14) / 8));
  const ramp = t * t * (3 - 2 * t);
  return 0.05 * Math.exp(-spinParam / 0.012) * ramp;
}

/** Body-frame axis describing the seam asymmetry of the ball design. */
const SEAM_AXIS = new Vector3(0.80, 0.36, 0.48).normalize();

const _vr = new Vector3();
const _tmp = new Vector3();
const _tmp2 = new Vector3();

/**
 * Aerodynamic + gravitational acceleration on the ball.
 * Returns linear acceleration into `out`.
 */
export function aeroAcceleration(
  v: Vector3,
  w: Vector3,
  q: Quaternion,
  env: AeroEnv,
  out: Vector3,
): Vector3 {
  out.set(0, -GRAVITY, 0);
  _vr.copy(v).sub(env.wind);
  const speed = _vr.length();
  if (speed < 1e-4) return out;
  const wMag = w.length();
  const S = (BALL.radius * wMag) / speed;
  const k = (0.5 * env.airDensity * BALL.area) / BALL.mass;

  // Drag: opposite to the relative airflow, ∝ v².
  const cd = dragCoefficient(speed, S);
  out.addScaledVector(_vr, -k * cd * speed);

  // Magnus: along ω × v, magnitude ½ρA·C_L·v².
  if (wMag > 1e-3) {
    const cl = liftCoefficient(S);
    _tmp.crossVectors(w, _vr);
    const n = _tmp.length();
    if (n > 1e-9) out.addScaledVector(_tmp, (k * cl * speed * speed) / n);
  }

  // Knuckle: seam axis projected on the plane normal to the flow.
  const ck = knuckleCoefficient(speed, S);
  if (ck > 1e-5) {
    _tmp2.copy(SEAM_AXIS).applyQuaternion(q);
    const along = _tmp2.dot(_vr) / speed;
    _tmp2.addScaledVector(_vr, -along / speed);
    // sin(3θ)-like modulation: the side force flips as panels rotate past the flow.
    const m = Math.sin(3 * Math.acos(Math.max(-1, Math.min(1, along))));
    out.addScaledVector(_tmp2, k * ck * speed * speed * m);
  }
  return out;
}

/** Spin decay from air friction torque (1/s). */
export function spinDecayRate(speed: number): number {
  return 0.03 + 0.0045 * speed;
}

const k1v = new Vector3();
const k2v = new Vector3();
const k3v = new Vector3();
const k4v = new Vector3();
const k1a = new Vector3();
const k2a = new Vector3();
const k3a = new Vector3();
const k4a = new Vector3();
const vt = new Vector3();
const _dq = new Quaternion();

/** Optional extra force field (e.g. net membrane). Writes acceleration into out (added). */
export type ForceField = (p: Vector3, v: Vector3, outAcc: Vector3) => void;

const _extra = new Vector3();

function accel(p: Vector3, v: Vector3, s: BallState, env: AeroEnv, field: ForceField | null, out: Vector3) {
  aeroAcceleration(v, s.w, s.q, env, out);
  if (field) {
    _extra.set(0, 0, 0);
    field(p, v, _extra);
    out.add(_extra);
  }
  return out;
}

const pt = new Vector3();

/**
 * Classic RK4 for translation in free flight; spin decays exponentially and
 * orientation is integrated from ω. Fixed dt, no allocation.
 */
export function integrateFlight(s: BallState, dt: number, env: AeroEnv, field: ForceField | null = null): void {
  const p = s.p;
  const v = s.v;
  // k1
  accel(p, v, s, env, field, k1a);
  k1v.copy(v);
  // k2
  pt.copy(p).addScaledVector(k1v, dt / 2);
  vt.copy(v).addScaledVector(k1a, dt / 2);
  k2v.copy(vt);
  accel(pt, vt, s, env, field, k2a);
  // k3
  pt.copy(p).addScaledVector(k2v, dt / 2);
  vt.copy(v).addScaledVector(k2a, dt / 2);
  k3v.copy(vt);
  accel(pt, vt, s, env, field, k3a);
  // k4
  pt.copy(p).addScaledVector(k3v, dt);
  vt.copy(v).addScaledVector(k3a, dt);
  k4v.copy(vt);
  accel(pt, vt, s, env, field, k4a);

  p.addScaledVector(k1v, dt / 6).addScaledVector(k2v, dt / 3).addScaledVector(k3v, dt / 3).addScaledVector(k4v, dt / 6);
  v.addScaledVector(k1a, dt / 6).addScaledVector(k2a, dt / 3).addScaledVector(k3a, dt / 3).addScaledVector(k4a, dt / 6);

  s.w.multiplyScalar(Math.exp(-spinDecayRate(_vr.copy(v).sub(env.wind).length()) * dt));
  integrateOrientation(s, dt);
}

export function integrateOrientation(s: BallState, dt: number): void {
  const w = s.w;
  const wm = w.length();
  if (wm < 1e-9) return;
  const ang = wm * dt;
  _dq.setFromAxisAngle(_tmp.copy(w).divideScalar(wm), ang);
  s.q.premultiply(_dq).normalize();
}
