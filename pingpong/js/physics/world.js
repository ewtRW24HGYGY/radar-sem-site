// Physics world: fixed-step simulation of the ball against the table, net, posts, floor,
// arena barriers and two kinematic rackets, with continuous (swept) collision detection.
import { V3, Quat, angularVelocity, clamp } from './math.js';
import { BallState, integrateBall, impact } from './ball.js';
import {
  BALL_RADIUS as R, TABLE_HALF_W, TABLE_HALF_L, TABLE_HEIGHT, TABLE_THICKNESS,
  NET_HEIGHT, NET_HALF_LENGTH, NET_HALF_THICK, NET_TAPE, BLADE_A, BLADE_B, PADDLE_HALF_THICK,
  MATERIALS, MAX_MICRO_MOVE, ARENA_HALF_X, ARENA_HALF_Z,
} from './constants.js';

const ZERO = new V3();
const UP = new V3(0, 1, 0);

// Axis aligned collision boxes
const TABLE_BOX = { min: new V3(-TABLE_HALF_W, TABLE_HEIGHT - TABLE_THICKNESS, -TABLE_HALF_L), max: new V3(TABLE_HALF_W, TABLE_HEIGHT, TABLE_HALF_L) };
const NET_BOX = { min: new V3(-NET_HALF_LENGTH, TABLE_HEIGHT, -NET_HALF_THICK), max: new V3(NET_HALF_LENGTH, TABLE_HEIGHT + NET_HEIGHT, NET_HALF_THICK) };
const POST_BOXES = [-1, 1].map((s) => ({
  min: new V3(s > 0 ? NET_HALF_LENGTH : -NET_HALF_LENGTH - 0.022, TABLE_HEIGHT - 0.045, -0.012),
  max: new V3(s > 0 ? NET_HALF_LENGTH + 0.022 : -NET_HALF_LENGTH, TABLE_HEIGHT + NET_HEIGHT + 0.004, 0.012),
}));

const _q = new V3(), _d = new V3(), _n = new V3();

// Sphere vs box. Pushes the ball out and returns the contact normal/point when overlapping.
function sphereBox(s, box, outN, outQ) {
  _q.set(clamp(s.p.x, box.min.x, box.max.x), clamp(s.p.y, box.min.y, box.max.y), clamp(s.p.z, box.min.z, box.max.z));
  _d.subVectors(s.p, _q);
  const dist2 = _d.lengthSq();
  if (dist2 >= R * R) return false;
  const dist = Math.sqrt(dist2);
  if (dist > 1e-9) {
    outN.copy(_d).scale(1 / dist);
  } else {
    // Centre inside the box (should not happen with micro-steps): push out through the nearest face
    const c = s.p;
    const opts = [
      [c.x - box.min.x, -1, 0, 0], [box.max.x - c.x, 1, 0, 0],
      [c.y - box.min.y, 0, -1, 0], [box.max.y - c.y, 0, 1, 0],
      [c.z - box.min.z, 0, 0, -1], [box.max.z - c.z, 0, 0, 1],
    ].sort((a, b) => a[0] - b[0]);
    outN.set(opts[0][1], opts[0][2], opts[0][3]);
  }
  outQ.copy(_q);
  s.p.copy(_q).addScaled(outN, R);
  return true;
}

const _cn = new V3(), _cq = new V3();
const EVENT_MIN_SPEED = 0.06;

// Collisions with everything that does not move. `emit(type, data)` receives contact events.
export function collideStatic(s, emit) {
  // Table (top surface, edges and sides)
  if (s.p.y < TABLE_HEIGHT + R + 0.001 && s.p.y > TABLE_HEIGHT - TABLE_THICKNESS - R &&
      Math.abs(s.p.x) < TABLE_HALF_W + R && Math.abs(s.p.z) < TABLE_HALF_L + R) {
    if (sphereBox(s, TABLE_BOX, _cn, _cq)) {
      const res = impact(s, _cn, ZERO, MATERIALS.table);
      if (res && emit && res.vn > EVENT_MIN_SPEED) {
        const onTop = _cq.y >= TABLE_HEIGHT - 1e-4;
        emit(onTop ? 'table' : 'tableSide', { pos: _cq.clone(), side: _cq.z >= 0 ? 0 : 1, speed: res.vn, edge: onTop && _cn.y < 0.999, res });
      }
    }
  }
  // Net mesh + tape, and the posts
  if (Math.abs(s.p.z) < NET_HALF_THICK + R + 0.02 && s.p.y < TABLE_HEIGHT + NET_HEIGHT + R + 0.01 && s.p.y > TABLE_HEIGHT - 0.06) {
    if (Math.abs(s.p.x) < NET_HALF_LENGTH + R && sphereBox(s, NET_BOX, _cn, _cq)) {
      const tape = _cq.y >= TABLE_HEIGHT + NET_HEIGHT - NET_TAPE;
      const res = impact(s, _cn, ZERO, tape ? MATERIALS.netTape : MATERIALS.net);
      if (res && emit) emit('net', { pos: _cq.clone(), part: tape ? 'tape' : 'mesh', speed: res.vn, normal: _cn.clone(), res });
    }
    for (const box of POST_BOXES) {
      if (sphereBox(s, box, _cn, _cq)) {
        const res = impact(s, _cn, ZERO, MATERIALS.post);
        if (res && emit) emit('net', { pos: _cq.clone(), part: 'post', speed: res.vn, normal: _cn.clone(), res });
      }
    }
  }
  // Floor
  if (s.p.y < R) {
    s.p.y = R;
    const res = impact(s, UP, ZERO, MATERIALS.floor);
    if (res && emit && res.vn > EVENT_MIN_SPEED) emit('floor', { pos: s.p.clone(), speed: res.vn, res });
    // rolling resistance on the sports floor
    if (s.v.y < 0.05) { s.v.x *= 0.9995; s.v.z *= 0.9995; s.w.scale(0.9995); }
  }
  // Barriers (court surrounds)
  if (Math.abs(s.p.x) > ARENA_HALF_X - R) {
    const sg = Math.sign(s.p.x);
    s.p.x = sg * (ARENA_HALF_X - R);
    _cn.set(-sg, 0, 0);
    const res = impact(s, _cn, ZERO, MATERIALS.barrier);
    if (res && emit && res.vn > EVENT_MIN_SPEED) emit('barrier', { pos: s.p.clone(), speed: res.vn });
  }
  if (Math.abs(s.p.z) > ARENA_HALF_Z - R) {
    const sg = Math.sign(s.p.z);
    s.p.z = sg * (ARENA_HALF_Z - R);
    _cn.set(0, 0, -sg);
    const res = impact(s, _cn, ZERO, MATERIALS.barrier);
    if (res && emit && res.vn > EVENT_MIN_SPEED) emit('barrier', { pos: s.p.clone(), speed: res.vn });
  }
}

// Kinematic racket. Controllers write the pose for the end of each physics step;
// velocities are derived from the motion so contacts use the racket's true speed.
export class PaddleBody {
  constructor(index) {
    this.index = index;
    this.pos = new V3(0, 1, index === 0 ? 2 : -2);
    this.quat = new Quat();
    this.prevPos = this.pos.clone();
    this.prevQuat = this.quat.clone();
    this.vel = new V3();
    this.angVel = new V3();
    this.enabled = true;
    this.lastHitTime = -10;
  }
  beginStep() { this.prevPos.copy(this.pos); this.prevQuat.copy(this.quat); }
  // Safety net: a human arm cannot move the racket faster than MAX_SPEED or spin it faster than
  // MAX_SPIN, so whatever a controller asks for, the physical racket never teleports.
  endStep(dt) {
    this.vel.subVectors(this.pos, this.prevPos).scale(1 / dt);
    const sp = this.vel.length();
    if (sp > PaddleBody.MAX_SPEED) {
      this.vel.scale(PaddleBody.MAX_SPEED / sp);
      this.pos.copy(this.prevPos).addScaled(this.vel, dt);
    }
    angularVelocity(this.prevQuat, this.quat, dt, this.angVel);
    const w = this.angVel.length();
    if (w > PaddleBody.MAX_SPIN) {
      const f = PaddleBody.MAX_SPIN / w;
      this.quat.slerpQuats(this.prevQuat, this.quat, f);
      this.angVel.scale(f);
    }
  }
  teleport(pos, quat) {
    this.pos.copy(pos); this.prevPos.copy(pos);
    if (quat) { this.quat.copy(quat); this.prevQuat.copy(quat); }
    this.vel.set(0, 0, 0); this.angVel.set(0, 0, 0);
  }
  poseAt(f, outPos, outQuat) {
    outPos.lerpVectors(this.prevPos, this.pos, f);
    outQuat.slerpQuats(this.prevQuat, this.quat, f);
  }
}

PaddleBody.MAX_SPEED = 28;   // m/s, fastest smash swings
PaddleBody.MAX_SPIN = 60;    // rad/s, wrist + forearm rotation

const _P0 = new V3(), _P1 = new V3(), _Q0 = new Quat(), _Q1 = new Quat();
const _l0 = new V3(), _l1 = new V3(), _lc = new V3(), _nl = new V3(), _nw = new V3();
const _cp = new V3(), _u = new V3(), _r = new V3(), _tmpQ = new Quat(), _tmpP = new V3();

export class World {
  constructor() {
    this.ball = new BallState();
    this.ballActive = false;       // false while held in a hand / machine
    this.paddles = [new PaddleBody(0), new PaddleBody(1)];
    this.time = 0;
    this.listeners = [];
    this.lastPaddleHit = { index: -1, time: -10 };
    this._p0 = new V3();
    this._pending = [];
    this._emit = (type, data) => { data.type = type; data.time = this.time; this._pending.push(data); };
  }
  on(fn) { this.listeners.push(fn); }

  step(dt) {
    const s = this.ball;
    this.time += dt;
    if (!this.ballActive) return;
    // Number of micro-steps from the fastest relative motion (ball and nearby rackets)
    let rel = s.v.length();
    for (const pd of this.paddles) {
      if (!pd.enabled) continue;
      if (pd.pos.distanceTo(s.p) < 0.6) rel = Math.max(rel, s.v.length() + pd.vel.length() + pd.angVel.length() * 0.12);
    }
    const n = clamp(Math.ceil((rel * dt) / MAX_MICRO_MOVE), 1, 24);
    const h = dt / n;
    for (let k = 0; k < n; k++) {
      const f0 = k / n, f1 = (k + 1) / n;
      this._p0.copy(s.p);
      integrateBall(s, h);
      for (const pd of this.paddles) if (pd.enabled) this.collidePaddle(pd, f0, f1, h);
      collideStatic(s, this._emit);
    }
    if (this._pending.length) {
      const evs = this._pending; this._pending = [];
      for (const ev of evs) for (const fn of this.listeners) fn(ev);
    }
  }

  // Swept test in the racket's local frame: catches the ball even when the racket and the ball
  // cross each other inside one micro-step.
  collidePaddle(pd, f0, f1, h) {
    const s = this.ball;
    pd.poseAt(f0, _P0, _Q0);
    pd.poseAt(f1, _P1, _Q1);
    _l0.subVectors(this._p0, _P0).applyQuatInverse(_Q0);
    _l1.subVectors(s.p, _P1).applyQuatInverse(_Q1);
    if (Math.min(_l0.lengthSq(), _l1.lengthSq()) > 0.04) return; // > 20 cm away
    const HT = PADDLE_HALF_THICK, RR = HT + R;
    let hit = false, frac = 1, part = 'edge';
    const side = _l0.z >= 0 ? 1 : -1;
    const d0 = side * _l0.z, d1 = side * _l1.z;
    if (d0 >= RR * 0.6 && d1 < RR) {
      const f = d0 > RR ? (d0 - RR) / (d0 - d1) : 0;
      _lc.lerpVectors(_l0, _l1, f);
      const ex = _lc.x / BLADE_A, ey = _lc.y / BLADE_B;
      if (ex * ex + ey * ey <= 1) {
        hit = true; frac = f; _nl.set(0, 0, side); _lc.z = side * RR;
        part = side > 0 ? 'fh' : 'bh';
      }
    }
    if (!hit) {
      // Rim / overlap test at the end of the micro-step
      const ex = _l1.x / BLADE_A, ey = _l1.y / BLADE_B, e2 = ex * ex + ey * ey;
      let qx = _l1.x, qy = _l1.y;
      if (e2 > 1) { const k = 1 / Math.sqrt(e2); qx *= k; qy *= k; }
      const qz = clamp(_l1.z, -HT, HT);
      _r.set(_l1.x - qx, _l1.y - qy, _l1.z - qz);
      const dist = _r.length();
      if (dist < R) {
        hit = true; frac = 1;
        if (dist > 1e-6) _nl.copy(_r).scale(1 / dist); else _nl.set(0, 0, side);
        _lc.set(qx, qy, qz).addScaled(_nl, R);
        if (e2 <= 1 && Math.abs(_nl.z) > 0.7) part = _nl.z > 0 ? 'fh' : 'bh';
      }
    }
    if (!hit) return;
    const fHit = f0 + (f1 - f0) * frac;
    pd.poseAt(fHit, _tmpP, _tmpQ);
    _nw.copy(_nl).applyQuat(_tmpQ);
    s.p.copy(_lc).applyQuat(_tmpQ).add(_tmpP);
    _cp.copy(s.p).addScaled(_nw, -R);
    // velocity of the racket surface at the contact point
    _r.subVectors(_cp, _tmpP);
    _u.crossVectors(pd.angVel, _r).add(pd.vel);
    const mat = part === 'fh' ? MATERIALS.rubberFH : part === 'bh' ? MATERIALS.rubberBH : MATERIALS.wood;
    const vIn = s.v.clone(), wIn = s.w.clone();
    const res = impact(s, _nw, _u, mat);
    // keep integrating the remainder of the micro-step with the new velocity
    if (frac < 1) integrateBall(s, h * (1 - frac));
    if (res) {
      // tiny separation so the next micro-step starts outside the racket
      s.p.addScaled(_nw, 0.0005);
      pd.lastHitTime = this.time;
      this._emit('paddle', {
        index: pd.index, part, pos: _cp.clone(), normal: _nw.clone(), paddleVel: _u.clone(),
        speed: res.vn, slip: res.slip, vIn, wIn, vOut: s.v.clone(), wOut: s.w.clone(), res,
      });
    }
  }

  holdBall(pos) {
    this.ballActive = false;
    this.ball.p.copy(pos); this.ball.v.set(0, 0, 0); this.ball.w.set(0, 0, 0);
  }
  launchBall(pos, vel, spin) {
    this.ball.p.copy(pos); this.ball.v.copy(vel); this.ball.w.copy(spin || ZERO);
    this.ballActive = true;
  }
}

// Fast-forward a copy of a ball state through the static world (no rackets).
// onStep(t, state) is called after every step; onEvent(ev, t, state) for contacts.
// Either callback can return true to stop.
export function simulate(start, maxTime, dt, onStep, onEvent) {
  const s = new BallState().copy(start);
  let t = 0, stop = false;
  const emit = onEvent ? (type, data) => { data.type = type; if (onEvent(data, t, s)) stop = true; } : null;
  const p0 = new V3();
  while (t < maxTime && !stop) {
    const n = clamp(Math.ceil((s.v.length() * dt) / (MAX_MICRO_MOVE * 2)), 1, 16);
    const hh = dt / n;
    for (let k = 0; k < n && !stop; k++) {
      p0.copy(s.p);
      integrateBall(s, hh);
      collideStatic(s, emit);
    }
    t += dt;
    if (onStep && onStep(t, s)) break;
  }
  return s;
}
