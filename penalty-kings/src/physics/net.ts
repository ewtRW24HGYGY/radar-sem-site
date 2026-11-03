import { Vector3 } from 'three';
import { BALL, GOAL } from './constants';

/**
 * Goal net, physics side.
 *
 * The net is modelled as four pinned elastic membranes (roof, back, two sides).
 * A membrane pinned on its border and pushed by the ball at depth δ resists with
 * a stiffening force F = κ(a,b)·(k₁δ + k₃δ³) — the cubic term is the stretch of
 * the mesh — plus viscous losses from the knots and cords, and strong tangential
 * grip. κ grows towards the frame, so the net "gives" most in the middle of the
 * back panel and very little next to the posts. The ball therefore decelerates
 * over a realistic 0.3–0.6 m of bulge and drops instead of bouncing back.
 *
 * The visual cloth (render/netCloth.ts) is pushed by the same ball so the
 * rendered bulge matches the deflection used here.
 */

export interface NetPanel {
  id: 'roof' | 'back' | 'left' | 'right';
  /** Unit normal pointing into the goal interior. */
  n: Vector3;
  /** A point on the panel plane. */
  o: Vector3;
  /** Map a world point (on/near the plane) to panel coords (a,b) ∈ [0,1]² if inside, else null. */
  toAB(p: Vector3): [number, number] | null;
  /** Corner points c00, c10, c01, c11 (bilinear patch, used by the cloth too). */
  corners: [Vector3, Vector3, Vector3, Vector3];
  /** Which b-edge lies loose on the grass (net slack at the ground), if any. */
  looseB: 0 | 1 | -1;
}

const FRONT_Z = GOAL.postZ - GOAL.postRadius; // net hangs right behind the frame
const TOP_Y = GOAL.barY;
const X = GOAL.postX;
const ZT = FRONT_Z - GOAL.netDepthTop;
const ZB = FRONT_Z - GOAL.netDepthBottom;

function bilinearPanel(
  id: NetPanel['id'],
  c00: Vector3,
  c10: Vector3,
  c01: Vector3,
  c11: Vector3,
  interiorPoint: Vector3,
  looseB: 0 | 1 | -1 = -1,
): NetPanel {
  // All our panels are planar; build a plane basis from the corners.
  const ea = new Vector3().subVectors(c10, c00);
  const eb = new Vector3().subVectors(c01, c00);
  const n = new Vector3().crossVectors(ea, eb).normalize();
  if (n.dot(new Vector3().subVectors(interiorPoint, c00)) < 0) n.negate();
  const o = c00.clone();
  const tmp = new Vector3();
  const lerpA = new Vector3();
  const lerpB = new Vector3();
  // Inverse bilinear by Newton iterations (panels are quads, possibly trapezoids).
  const toAB = (p: Vector3): [number, number] | null => {
    let a = 0.5;
    let b = 0.5;
    for (let i = 0; i < 6; i++) {
      // P(a,b) = (1-a)(1-b)c00 + a(1-b)c10 + (1-a)b c01 + ab c11
      lerpA.copy(c00).lerp(c10, a);
      lerpB.copy(c01).lerp(c11, a);
      const P = tmp.copy(lerpA).lerp(lerpB, b);
      const r = P.sub(p);
      const dPa = new Vector3()
        .subVectors(c10, c00)
        .multiplyScalar(1 - b)
        .addScaledVector(new Vector3().subVectors(c11, c01), b);
      const dPb = new Vector3().subVectors(lerpB, lerpA);
      // Solve least squares 2x2: [dPa dPb] [da db]^T = -r (projected on plane)
      const A11 = dPa.dot(dPa);
      const A12 = dPa.dot(dPb);
      const A22 = dPb.dot(dPb);
      const r1 = -r.dot(dPa);
      const r2 = -r.dot(dPb);
      const det = A11 * A22 - A12 * A12;
      if (Math.abs(det) < 1e-12) break;
      a += (r1 * A22 - r2 * A12) / det;
      b += (A11 * r2 - A12 * r1) / det;
    }
    if (a < 0 || a > 1 || b < 0 || b > 1) return null;
    return [a, b];
  };
  return { id, n, o, toAB, corners: [c00, c10, c01, c11], looseB };
}

const interior = new Vector3(0, 1.0, (FRONT_Z + ZB) / 2);

export const NET_PANELS: NetPanel[] = [
  // Roof: a along x, b from the crossbar backwards.
  bilinearPanel(
    'roof',
    new Vector3(-X, TOP_Y, FRONT_Z),
    new Vector3(X, TOP_Y, FRONT_Z),
    new Vector3(-X, TOP_Y, ZT),
    new Vector3(X, TOP_Y, ZT),
    interior,
  ),
  // Back: a along x, b from the top-back bar down to the ground.
  bilinearPanel(
    'back',
    new Vector3(-X, TOP_Y, ZT),
    new Vector3(X, TOP_Y, ZT),
    new Vector3(-X, 0, ZB),
    new Vector3(X, 0, ZB),
    interior,
    1,
  ),
  // Sides: a from the post backwards, b from the ground up.
  bilinearPanel(
    'left',
    new Vector3(-X, 0, FRONT_Z),
    new Vector3(-X, 0, ZB),
    new Vector3(-X, TOP_Y, FRONT_Z),
    new Vector3(-X, TOP_Y, ZT),
    interior,
    0,
  ),
  bilinearPanel(
    'right',
    new Vector3(X, 0, FRONT_Z),
    new Vector3(X, 0, ZB),
    new Vector3(X, TOP_Y, FRONT_Z),
    new Vector3(X, TOP_Y, ZT),
    interior,
    0,
  ),
];

export const NET_PARAMS = {
  k1: 260, // N/m
  k3: 3200, // N/m³
  /** Damping ratios of the ball-on-membrane oscillator: nets absorb most of the energy. */
  zetaIn: 0.8,
  zetaOut: 2.6,
  grip: 0.55, // tangential friction coefficient of the mesh
  /** Deflection at which the cords are fully taut and the net acts like a rigid wall. */
  maxDeflection: 0.95,
};

/** Membrane stiffness scale over the panel: 1 in the middle, stiff near the frame. */
export function edgeStiffness(a: number, b: number, looseB: 0 | 1 | -1 = -1): number {
  // A loose edge (net lying on the grass) does not pin the membrane: remap b so that edge sits mid-span.
  const bb = looseB === 1 ? b * 0.5 : looseB === 0 ? 0.5 + b * 0.5 : b;
  const g = 16 * a * (1 - a) * bb * (1 - bb);
  return 1 / (0.12 + 0.88 * g);
}

const _d = new Vector3();
const _vt = new Vector3();

export interface NetContactEvent {
  panel: NetPanel['id'];
  speed: number;
  point: Vector3;
}

/**
 * Per-ball net interaction state. `engaged[i]` stores from which side (+1 interior,
 * −1 exterior, 0 none) the ball is pressing membrane i.
 */
export class NetMembrane {
  engaged = new Int8Array(NET_PANELS.length);
  lastSide = new Int8Array(NET_PANELS.length);
  /** Current deflection per panel, for audio/visual intensity. */
  deflection = new Float32Array(NET_PANELS.length);

  reset(p: Vector3): void {
    for (let i = 0; i < NET_PANELS.length; i++) {
      const pan = NET_PANELS[i];
      const d = _d.subVectors(p, pan.o).dot(pan.n);
      this.lastSide[i] = d >= 0 ? 1 : -1;
      this.engaged[i] = 0;
      this.deflection[i] = 0;
    }
  }

  /**
   * Update contact state after a sub-step. Returns a contact event when the ball
   * starts pressing a panel.
   */
  updateState(p: Vector3, v: Vector3, events: NetContactEvent[] | null): void {
    const R = BALL.radius;
    for (let i = 0; i < NET_PANELS.length; i++) {
      const pan = NET_PANELS[i];
      const d = _d.subVectors(p, pan.o).dot(pan.n);
      const side = this.engaged[i];
      if (side !== 0) {
        const delta = R - side * d;
        if (delta <= 0) {
          this.engaged[i] = 0;
          this.lastSide[i] = side;
          this.deflection[i] = 0;
        } else {
          this.deflection[i] = delta;
        }
        continue;
      }
      if (Math.abs(d) < R) {
        const ab = pan.toAB(p);
        if (ab) {
          const s = this.lastSide[i];
          this.engaged[i] = s;
          this.deflection[i] = R - s * d;
          if (events) events.push({ panel: pan.id, speed: Math.abs(v.dot(pan.n)), point: p.clone() });
          continue;
        }
      }
      this.lastSide[i] = d >= 0 ? 1 : -1;
    }
  }

  /** Force field (acceleration) applied inside the integrator. */
  field = (p: Vector3, v: Vector3, outAcc: Vector3): void => {
    const R = BALL.radius;
    for (let i = 0; i < NET_PANELS.length; i++) {
      const side = this.engaged[i];
      if (side === 0) continue;
      const pan = NET_PANELS[i];
      const d = _d.subVectors(p, pan.o).dot(pan.n);
      const delta = R - side * d;
      if (delta <= 0) continue;
      const ab = pan.toAB(_d.copy(p).addScaledVector(pan.n, -d));
      const a = ab ? ab[0] : 0.02;
      const b = ab ? ab[1] : 0.02;
      const kap = edgeStiffness(a, b, pan.looseB);
      const P = NET_PARAMS;
      let fn = kap * (P.k1 * delta + P.k3 * delta * delta * delta);
      // Normal velocity in the push direction (positive = going deeper into the membrane).
      const vIn = -side * v.dot(pan.n);
      // Viscous losses expressed as a damping ratio of the local (tangent) stiffness.
      const kEff = kap * (P.k1 + 3 * P.k3 * delta * delta);
      const cCrit = 2 * Math.sqrt(kEff * BALL.mass);
      fn += (vIn > 0 ? P.zetaIn : P.zetaOut) * cCrit * vIn;
      if (delta > P.maxDeflection) fn += 4e4 * (delta - P.maxDeflection) + 60 * Math.max(0, vIn);
      if (fn < 0) fn = 0;
      outAcc.addScaledVector(pan.n, (side * fn) / BALL.mass);
      // Grip of the mesh: tangential friction, bounded so it cannot reverse the motion.
      _vt.copy(v).addScaledVector(pan.n, -v.dot(pan.n));
      const vtm = _vt.length();
      if (vtm > 1e-4) {
        const ft = Math.min(P.grip * fn, (BALL.mass * vtm) / 0.004);
        outAcc.addScaledVector(_vt, -ft / (BALL.mass * vtm));
      }
    }
  };
}
