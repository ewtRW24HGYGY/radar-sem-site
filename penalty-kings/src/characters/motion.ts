import { Vector3 } from 'three';

export const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};
export const smoother = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
/** Exponential approach factor for a time constant tau. */
export const damp = (dt: number, tau: number) => 1 - Math.exp(-dt / Math.max(1e-4, tau));

/** Cubic Hermite position at u ∈ [0,1] for segment duration T (velocities in units per second). */
export function hermite(p0: Vector3, v0: Vector3, p1: Vector3, v1: Vector3, T: number, u: number, out: Vector3): Vector3 {
  const u2 = u * u;
  const u3 = u2 * u;
  const h00 = 2 * u3 - 3 * u2 + 1;
  const h10 = u3 - 2 * u2 + u;
  const h01 = -2 * u3 + 3 * u2;
  const h11 = u3 - u2;
  return out
    .copy(p0)
    .multiplyScalar(h00)
    .addScaledVector(v0, h10 * T)
    .addScaledVector(p1, h01)
    .addScaledVector(v1, h11 * T);
}

/** Derivative (velocity) of the Hermite segment at u. */
export function hermiteVel(p0: Vector3, v0: Vector3, p1: Vector3, v1: Vector3, T: number, u: number, out: Vector3): Vector3 {
  const u2 = u * u;
  const d00 = 6 * u2 - 6 * u;
  const d10 = 3 * u2 - 4 * u + 1;
  const d01 = -6 * u2 + 6 * u;
  const d11 = 3 * u2 - 2 * u;
  return out
    .copy(p0)
    .multiplyScalar(d00 / T)
    .addScaledVector(v0, d10)
    .addScaledVector(p1, d01 / T)
    .addScaledVector(v1, d11);
}

/** Rotate a vector around Y. */
export function rotY(v: Vector3, a: number, out = new Vector3()): Vector3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return out.set(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
}

/** Yaw (around +Y) such that local +Z maps to the horizontal direction d. */
export function yawOf(d: Vector3): number {
  return Math.atan2(d.x, d.z);
}

export function horizontal(v: Vector3, out = new Vector3()): Vector3 {
  return out.set(v.x, 0, v.z);
}
