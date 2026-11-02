// Ball state, aerodynamics (gravity + buoyancy, quadratic drag, Magnus lift, spin decay)
// and the rigid-body impact model with Coulomb friction shared by every surface.
import { V3 } from './math.js';
import {
  GRAVITY, AIR_DENSITY, BALL_RADIUS as R, BALL_MASS, BALL_AREA, BALL_VOLUME, DRAG_CD,
  BALL_INERTIA_FACTOR,
} from './constants.js';

export class BallState {
  constructor() {
    this.p = new V3();   // position (m)
    this.v = new V3();   // velocity (m/s)
    this.w = new V3();   // angular velocity (rad/s)
  }
  copy(o) { this.p.copy(o.p); this.v.copy(o.v); this.w.copy(o.w); return this; }
  clone() { return new BallState().copy(this); }
}

const KD = (0.5 * AIR_DENSITY * DRAG_CD * BALL_AREA) / BALL_MASS;   // ≈ 0.134 1/m
const KL = (0.5 * AIR_DENSITY * BALL_AREA) / BALL_MASS;             // lift factor
const G_EFF = GRAVITY * (1 - (AIR_DENSITY * BALL_VOLUME) / BALL_MASS); // buoyancy ≈ 1.5 %

// Lift coefficient as a function of the spin parameter S = rω⊥/v.
// Linear for small S (classic Magnus k·ω×v) and saturating towards 0.5 for very high spin.
export function liftCoefficient(S) { return S / (1 + 2 * S); }

const _c = new V3();
export function acceleration(v, w, out) {
  out.set(0, -G_EFF, 0);
  const speed = v.length();
  if (speed < 1e-6) return out;
  // Quadratic drag
  out.addScaled(v, -KD * speed);
  // Magnus force, perpendicular to both ω and v
  _c.crossVectors(w, v);                       // |ω×v| = ω⊥·v
  const cross = _c.length();
  if (cross > 1e-6) {
    const wPerp = cross / speed;
    const S = (R * wPerp) / speed;
    const CL = liftCoefficient(S);
    // a = ½ρA·CL·v² / m in direction ω×v
    out.addScaled(_c, (KL * CL * speed * speed) / cross);
  }
  return out;
}

const _a1 = new V3(), _a2 = new V3(), _vm = new V3();
// Midpoint (RK2) integration – second-order accurate, stable at 1 kHz.
export function integrateBall(s, dt) {
  acceleration(s.v, s.w, _a1);
  _vm.copy(s.v).addScaled(_a1, dt * 0.5);
  acceleration(_vm, s.w, _a2);
  s.p.addScaled(_vm, dt);
  s.v.addScaled(_a2, dt);
  // Aerodynamic torque slowly bleeds spin (≈ 5–12 %/s depending on speed)
  const speed = s.v.length();
  const decay = Math.exp(-(0.03 + 0.0055 * speed) * dt);
  s.w.scale(decay);
}

export function restitution(mat, vn) {
  const e = mat.e0 - mat.k * vn;
  return e < mat.eMin ? mat.eMin : e;
}

// Impulse-based impact between the ball and a surface whose contact point moves with velocity u.
// n: unit normal pointing from the surface towards the ball centre.
// Models normal restitution plus tangential Coulomb friction that drives the contact point
// towards rolling (grip). Spin and velocity are coupled through the shell's moment of inertia.
// Returns null when the ball is separating, otherwise details of the impulse.
const _rn = new V3(), _vc = new V3(), _vt = new V3(), _t = new V3(), _nt = new V3();
const SLIP_TO_IMPULSE = 1 / (1 + 1 / BALL_INERTIA_FACTOR);   // shell: 1/2.5 = 0.4
const SPIN_FACTOR = 1 / (BALL_INERTIA_FACTOR * R);           // shell: 3/(2r)

export function impact(s, n, u, mat) {
  // velocity of the ball's contact point relative to the surface
  _rn.copy(n).scale(-R);
  _vc.crossVectors(s.w, _rn).add(s.v).sub(u);
  const vn = _vc.dot(n);
  if (vn >= 0) return null;
  const e = restitution(mat, -vn);
  const jn = -(1 + e) * vn;                       // Δv along the normal
  _vt.copy(_vc).addScaled(n, -vn);                // tangential slip velocity
  const slip = _vt.length();
  let jt = 0;
  if (slip > 1e-7) {
    jt = Math.min(mat.mu * jn, slip * SLIP_TO_IMPULSE);
    _t.copy(_vt).scale(-1 / slip);
  } else {
    _t.set(0, 0, 0);
  }
  s.v.addScaled(n, jn).addScaled(_t, jt);
  // Δω = (r_c × J)/I with r_c = -r n  →  -(1/(k r)) jt (n × t)
  _nt.crossVectors(n, _t);
  s.w.addScaled(_nt, -SPIN_FACTOR * jt);
  if (mat.tangentKeep !== undefined) {
    // Soft surfaces (the net mesh) swallow most of the tangential energy
    const vrn = s.v.dot(n) - u.dot(n);
    _vt.copy(s.v).sub(u).addScaled(n, -vrn);
    s.v.copy(u).addScaled(n, vrn).addScaled(_vt, mat.tangentKeep);
    s.w.scale(mat.tangentKeep);
  }
  return { vn: -vn, jn, jt, slip, e, gripped: jt < mat.mu * jn - 1e-9 };
}

export { KD, KL, G_EFF, SLIP_TO_IMPULSE, SPIN_FACTOR };
