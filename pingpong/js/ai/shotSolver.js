// Shot planning on top of the real physics model.
//  • solveLaunch: finds the launch velocity that lands a spinning ball on a target point
//    (shooting method using the same aerodynamic integrator as the game).
//  • solveImpact: inverts the racket/ball impact model to get the racket normal and the racket
//    velocity that turn an incoming ball into the desired outgoing velocity and spin.
// Nothing here moves the ball directly: the AI only decides how to swing its racket.
import { V3, clamp } from '../physics/math.js';
import { BallState, integrateBall, restitution, SPIN_FACTOR } from '../physics/ball.js';
import { BALL_RADIUS as R, TABLE_HEIGHT, NET_HEIGHT, NET_HALF_LENGTH } from '../physics/constants.js';

// World spin vector from topspin/sidespin components for a ball travelling along (dx, dz).
// Topspin axis = up × direction; sidespin is the vertical component.
export function spinVector(dx, dz, top, side, out = new V3()) {
  const l = Math.hypot(dx, dz) || 1;
  return out.set((top * dz) / l, side, (-top * dx) / l);
}
// Inverse of spinVector: topspin component (rad/s, positive = topspin) given velocity.
export function topspinOf(v, w) {
  const l = Math.hypot(v.x, v.z) || 1;
  return (w.x * v.z - w.z * v.x) / l;
}

const _s = new BallState();
const SURFACE_Y = TABLE_HEIGHT + R;

// Free flight until the ball comes down to the table plane on the far side of `p0`
// (or on the same side when sameSide is true). Returns landing point, flight time and the
// clearance over the net tape (negative = would hit the net).
export function flyToTable(p0, v0, w0, sameSide = false, dt = 0.002, maxT = 2.0) {
  const s = _s; s.p.copy(p0); s.v.copy(v0); s.w.copy(w0);
  const startSide = Math.sign(p0.z) || 1;
  let t = 0, clearance = Infinity, crossed = false, px = 0, py = 0, pz = 0;
  while (t < maxT) {
    px = s.p.x; py = s.p.y; pz = s.p.z;
    integrateBall(s, dt); t += dt;
    if (!crossed && Math.sign(s.p.z) !== startSide && pz !== 0) {
      crossed = true;
      const f = pz / (pz - s.p.z);
      const yNet = py + (s.p.y - py) * f, xNet = px + (s.p.x - px) * f;
      clearance = Math.abs(xNet) < NET_HALF_LENGTH + R ? yNet - R - (TABLE_HEIGHT + NET_HEIGHT) : 1;
    }
    if (s.v.y < 0 && s.p.y <= SURFACE_Y && (sameSide || crossed)) {
      const f = (py - SURFACE_Y) / (py - s.p.y || 1);
      return {
        x: px + (s.p.x - px) * f, z: pz + (s.p.z - pz) * f, t: t - dt + dt * f,
        clearance: sameSide ? Infinity : clearance, crossed, v: s.v.clone(), w: s.w.clone(),
      };
    }
    if (s.p.y < 0) break;
  }
  return null;
}

function launchVel(speed, theta, phi, out) {
  const c = Math.cos(theta);
  return out.set(speed * c * Math.sin(phi), speed * Math.sin(theta), speed * c * Math.cos(phi));
}

const _v = new V3(), _w = new V3();
// Find launch direction for a given speed so the ball lands on (tx, tz).
// Prefers the flattest trajectory that clears the net by at least minClear.
export function solveLaunch(p0, speed, top, side, tx, tz, opts = {}) {
  const minClear = opts.minClear ?? 0.03;
  const sameSide = opts.sameSide ?? false;
  const phi0 = Math.atan2(tx - p0.x, tz - p0.z);
  const dist = Math.hypot(tx - p0.x, tz - p0.z);
  const evalAt = (theta, phi) => {
    launchVel(speed, theta, phi, _v);
    spinVector(_v.x, _v.z, top, side, _w);
    return flyToTable(p0, _v, _w, sameSide);
  };
  // 1. coarse scan of elevation (low to high) for a landing beyond / at the target distance
  let best = null, prev = null;
  for (let th = -0.6; th <= 1.0; th += 0.04) {
    const r = evalAt(th, phi0);
    const d = r ? Math.hypot(r.x - p0.x, r.z - p0.z) : null;
    if (r && prev && prev.d !== null && d !== null && (prev.d - dist) * (d - dist) <= 0) {
      const f = (dist - prev.d) / (d - prev.d || 1);
      best = { th: prev.th + (th - prev.th) * f };
      break;
    }
    prev = { th, d };
  }
  if (!best) return null;
  // 2. Newton refinement on (theta, phi)
  let th = best.th, phi = phi0, r = null;
  for (let it = 0; it < 10; it++) {
    r = evalAt(th, phi);
    if (!r) return null;
    const ex = r.x - tx, ez = r.z - tz;
    if (ex * ex + ez * ez < 1e-6) break;
    const h = 1e-3;
    const rt = evalAt(th + h, phi), rp = evalAt(th, phi + h);
    if (!rt || !rp) return null;
    const a = (rt.x - r.x) / h, b = (rp.x - r.x) / h, c = (rt.z - r.z) / h, d = (rp.z - r.z) / h;
    const det = a * d - b * c;
    if (Math.abs(det) < 1e-9) break;
    let dth = (d * ex - b * ez) / det, dph = (-c * ex + a * ez) / det;
    const m = Math.max(Math.abs(dth), Math.abs(dph));
    if (m > 0.15) { dth *= 0.15 / m; dph *= 0.15 / m; }
    th -= dth; phi -= dph;
  }
  if (!r) return null;
  const err = Math.hypot(r.x - tx, r.z - tz);
  if (err > 0.03) return null;
  if (!sameSide && r.clearance < minClear) return null;
  const v = launchVel(speed, th, phi, new V3());
  return { v, w: spinVector(v.x, v.z, top, side, new V3()), theta: th, phi, land: r, clearance: r.clearance, err };
}

// Tries the requested speed and progressively slower ones until a safe trajectory exists.
export function solveLaunchAdaptive(p0, speed, top, side, tx, tz, opts = {}) {
  const factors = opts.factors || [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.42, 0.35];
  for (const f of factors) {
    const sol = solveLaunch(p0, speed * f, top * (0.6 + 0.4 * f), side, tx, tz, opts);
    if (sol) { sol.speedFactor = f; return sol; }
  }
  return null;
}

// Invert the impact model (see physics/ball.js#impact).
// Δω = −(3/2r)·(n × Δv)  and, when the contact grips, the contact point leaves with the racket.
// Returns the racket normal n, racket velocity u and the spin actually achievable.
export function solveImpact(vIn, wIn, vOut, wOut, mat) {
  const dv = new V3().subVectors(vOut, vIn);
  const dvLen = dv.length();
  if (dvLen < 1e-6) return null;
  const dvh = dv.clone().scale(1 / dvLen);
  const dw = new V3().subVectors(wOut, wIn);
  const k = dw.clone().scale(-1 / SPIN_FACTOR);           // required n × Δv
  k.addScaled(dvh, -k.dot(dvh));                           // only the part ⟂ Δv is reachable
  let s = k.length() / dvLen;
  const sMax = (mat.mu / Math.sqrt(1 + mat.mu * mat.mu)) * 0.96; // friction cone limit
  let limited = false;
  if (s > sMax) { k.scale(sMax / s); s = sMax; limited = true; }
  const n = new V3().crossVectors(dv, k).scale(1 / (dvLen * dvLen)).addScaled(dvh, Math.sqrt(Math.max(0, 1 - s * s)));
  n.normalize();
  const wAch = new V3().crossVectors(n, dv).scale(-SPIN_FACTOR).add(wIn);
  // normal component of the racket velocity: (vOut-u)·n = -e (vIn-u)·n
  const vInN = vIn.dot(n), vOutN = vOut.dot(n);
  let e = 0.85, un = 0;
  for (let i = 0; i < 6; i++) {
    un = (vOutN + e * vInN) / (1 + e);
    e = restitution(mat, Math.max(0, un - vInN));
  }
  // tangential component: contact point leaves gripped (no slip)
  const vOutT = vOut.clone().addScaled(n, -vOutN);
  const wxn = new V3().crossVectors(wAch, n);
  const u = vOutT.addScaled(wxn, -R).addScaled(n, un);
  return { n, u, wOut: wAch, limited, approach: un - vInN };
}

export const NET_TOP = TABLE_HEIGHT + NET_HEIGHT;
export { clamp };
