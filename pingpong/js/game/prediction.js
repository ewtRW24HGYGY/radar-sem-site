// Trajectory prediction with the real physics (table, net, floor) — used by the AI to decide where
// to move and by the optional height/aim assist for human players.
import { simulate } from '../physics/world.js';

const STRIDE = 13; // t, p(3), v(3), w(3), bounces side0, bounces side1, flags

export class Trajectory {
  constructor() { this.data = new Float64Array(STRIDE * 1600); this.count = 0; this.events = []; this.dt = 0.002; }
  t(i) { return this.data[i * STRIDE]; }
  get(i, out) {
    const d = this.data, o = i * STRIDE;
    out.t = d[o];
    out.p.set(d[o + 1], d[o + 2], d[o + 3]);
    out.v.set(d[o + 4], d[o + 5], d[o + 6]);
    out.w.set(d[o + 7], d[o + 8], d[o + 9]);
    out.b0 = d[o + 10]; out.b1 = d[o + 11]; out.flags = d[o + 12];
    return out;
  }
  px(i) { return this.data[i * STRIDE + 1]; }
  py(i) { return this.data[i * STRIDE + 2]; }
  pz(i) { return this.data[i * STRIDE + 3]; }
  vz(i) { return this.data[i * STRIDE + 6]; }
  bounces(i, side) { return this.data[i * STRIDE + 10 + side]; }
  flags(i) { return this.data[i * STRIDE + 12]; }
}

export const FLAG_FLOOR = 1, FLAG_NET = 2, FLAG_SIDE = 4;

// Fills `traj` with samples of the ball's future (no rackets).
export function predict(start, traj = new Trajectory(), maxT = 2.4, dt = 0.002) {
  traj.count = 0; traj.events.length = 0; traj.dt = dt;
  const maxCount = Math.min(Math.floor(maxT / dt), traj.data.length / STRIDE);
  let b0 = 0, b1 = 0, flags = 0;
  simulate(start, maxT, dt, (t, s) => {
    if (traj.count >= maxCount) return true;
    const o = traj.count * STRIDE, d = traj.data;
    d[o] = t; d[o + 1] = s.p.x; d[o + 2] = s.p.y; d[o + 3] = s.p.z;
    d[o + 4] = s.v.x; d[o + 5] = s.v.y; d[o + 6] = s.v.z;
    d[o + 7] = s.w.x; d[o + 8] = s.w.y; d[o + 9] = s.w.z;
    d[o + 10] = b0; d[o + 11] = b1; d[o + 12] = flags;
    traj.count++;
    return (flags & FLAG_FLOOR) !== 0 && s.p.y < 0.03;
  }, (ev, t) => {
    if (ev.type === 'table') { if (ev.side === 0) b0++; else b1++; }
    else if (ev.type === 'floor') flags |= FLAG_FLOOR;
    else if (ev.type === 'net') flags |= FLAG_NET;
    else if (ev.type === 'tableSide') flags |= FLAG_SIDE;
    traj.events.push({ type: ev.type, t, side: ev.side, part: ev.part, x: ev.pos?.x, z: ev.pos?.z });
    return false;
  });
  return traj;
}

// Index range where a player on `sideIndex` can legally hit the ball: after the bounce on their
// side (`need` = bounces still required, 1 normally, 0 if it already bounced) and before a second
// bounce or floor contact. `otherNeed` = bounces expected on the hitter's side first (serves).
export function hittableWindow(traj, sideIndex, need = 1, otherNeed = 0) {
  let start = -1, end = -1;
  for (let i = 0; i < traj.count; i++) {
    const b = traj.bounces(i, sideIndex), fl = traj.flags(i);
    if (b === need && (fl & (FLAG_FLOOR | FLAG_SIDE)) === 0 && traj.bounces(i, 1 - sideIndex) === otherNeed) {
      if (start < 0) start = i;
      end = i;
    } else if (start >= 0) break;
  }
  return start < 0 ? null : { start, end };
}
