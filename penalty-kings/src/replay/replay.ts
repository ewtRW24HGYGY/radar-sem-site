import { Quaternion, Vector3 } from 'three';
import { BoneName, Rig } from '../characters/rig';

const BONES: BoneName[] = [
  'hips', 'spine', 'chest', 'neck', 'head',
  'clavL', 'upperArmL', 'foreArmL', 'handL', 'clavR', 'upperArmR', 'foreArmR', 'handR',
  'thighL', 'shinL', 'footL', 'toeL', 'thighR', 'shinR', 'footR', 'toeR',
];
const RIG_FLOATS = 3 + BONES.length * 4;
const FRAME = 7 + 3 + RIG_FLOATS * 2;

export const REPLAY_HZ = 120;

export interface ReplayMarker {
  t: number;
  type: string;
}

/**
 * Records the exact simulated state (ball, both skeletons, net cloth) so a replay
 * is a faithful playback of what happened, not a re-enactment.
 */
export class ReplayRecorder {
  frames: Float32Array[] = [];
  net: (Float32Array | null)[] = [];
  markers: ReplayMarker[] = [];
  kickT = -1;
  contactT = -1;
  private stepCount = 0;
  private netEvery = 2;

  clear(): void {
    this.frames = [];
    this.net = [];
    this.markers = [];
    this.kickT = -1;
    this.contactT = -1;
    this.stepCount = 0;
  }

  get duration(): number {
    return this.frames.length / REPLAY_HZ;
  }

  /** Call every sim step (240 Hz); stores at 120 Hz. */
  record(ball: { p: Vector3; q: Quaternion; v: Vector3 }, kicker: Rig, keeper: Rig, netPos: Float32Array | null, netAwake: boolean): void {
    this.stepCount++;
    if (this.stepCount % 2) return;
    if (this.frames.length > REPLAY_HZ * 14) return;
    const f = new Float32Array(FRAME);
    f.set([ball.p.x, ball.p.y, ball.p.z, ball.q.x, ball.q.y, ball.q.z, ball.q.w, ball.v.x, ball.v.y, ball.v.z]);
    writeRig(kicker, f, 10);
    writeRig(keeper, f, 10 + RIG_FLOATS);
    this.frames.push(f);
    const idx = this.frames.length - 1;
    if (netPos && netAwake && idx % this.netEvery === 0) this.net[idx] = new Float32Array(netPos);
    else this.net[idx] = null;
  }

  mark(type: string): void {
    const t = this.frames.length / REPLAY_HZ;
    this.markers.push({ t, type });
    if (type === 'kick') this.contactT = t;
  }

  /** Applies the state at time t (s). Returns ball position, quaternion and velocity. */
  apply(t: number, kicker: Rig, keeper: Rig, outBall: { p: Vector3; q: Quaternion; v: Vector3 }): void {
    const n = this.frames.length;
    if (!n) return;
    const x = Math.max(0, Math.min(n - 1.001, t * REPLAY_HZ));
    const i = Math.floor(x);
    const u = x - i;
    const a = this.frames[i];
    const b = this.frames[Math.min(n - 1, i + 1)];
    outBall.p.set(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u);
    outBall.q.set(a[3], a[4], a[5], a[6]).slerp(_q.set(b[3], b[4], b[5], b[6]), u);
    outBall.v.set(a[7], a[8], a[9]);
    readRig(kicker, a, b, u, 10);
    readRig(keeper, a, b, u, 10 + RIG_FLOATS);
  }

  /** Latest stored net snapshot at or before t. */
  netAt(t: number): Float32Array | null {
    let i = Math.min(this.net.length - 1, Math.floor(t * REPLAY_HZ));
    for (; i >= 0; i--) {
      const s = this.net[i];
      if (s) return s;
      // Before the net woke up the rest pose applies.
      if (i < this.firstNet()) return null;
    }
    return null;
  }

  private _first = -2;
  private firstNet(): number {
    if (this._first !== -2 && this.frames.length === this._len) return this._first;
    this._len = this.frames.length;
    this._first = this.net.findIndex((x) => !!x);
    return this._first;
  }
  private _len = 0;

  /** Ball path from the strike up to time t, for the trajectory overlay. */
  path(fromT: number, toT: number): Vector3[] {
    const out: Vector3[] = [];
    const i0 = Math.max(0, Math.floor(fromT * REPLAY_HZ));
    const i1 = Math.min(this.frames.length - 1, Math.floor(toT * REPLAY_HZ));
    for (let i = i0; i <= i1; i += 2) {
      const f = this.frames[i];
      out.push(new Vector3(f[0], f[1], f[2]));
    }
    return out;
  }
}

const _q = new Quaternion();
const _q2 = new Quaternion();

function writeRig(rig: Rig, f: Float32Array, o: number): void {
  const h = rig.bones.hips.position;
  f[o] = h.x;
  f[o + 1] = h.y;
  f[o + 2] = h.z;
  let k = o + 3;
  for (const name of BONES) {
    const q = rig.bones[name].quaternion;
    f[k++] = q.x;
    f[k++] = q.y;
    f[k++] = q.z;
    f[k++] = q.w;
  }
}

function readRig(rig: Rig, a: Float32Array, b: Float32Array, u: number, o: number): void {
  rig.bones.hips.position.set(a[o] + (b[o] - a[o]) * u, a[o + 1] + (b[o + 1] - a[o + 1]) * u, a[o + 2] + (b[o + 2] - a[o + 2]) * u);
  let k = o + 3;
  for (const name of BONES) {
    _q.set(a[k], a[k + 1], a[k + 2], a[k + 3]);
    _q2.set(b[k], b[k + 1], b[k + 2], b[k + 3]);
    rig.bones[name].quaternion.copy(_q).slerp(_q2, u);
    k += 4;
  }
  rig.root.updateMatrixWorld(true);
}
