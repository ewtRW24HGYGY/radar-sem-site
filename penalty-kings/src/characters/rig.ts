import { Matrix4, Object3D, Quaternion, Vector3 } from 'three';

/**
 * Humanoid rig shared by rendering and collision. Character local frame:
 * faces +Z, up +Y, its left side is +X. Limb bones point along their local −Y.
 */

export type BoneName =
  | 'hips' | 'spine' | 'chest' | 'neck' | 'head'
  | 'clavL' | 'upperArmL' | 'foreArmL' | 'handL'
  | 'clavR' | 'upperArmR' | 'foreArmR' | 'handR'
  | 'thighL' | 'shinL' | 'footL' | 'toeL'
  | 'thighR' | 'shinR' | 'footR' | 'toeR';

export interface BodyDims {
  height: number;
  /** Lean/strong build multiplier for girth. */
  build: number;
}

export interface Proportions {
  hipsY: number;
  spine: number;
  chest: number;
  neck: number;
  head: number;
  shoulderX: number;
  shoulderY: number;
  upperArm: number;
  foreArm: number;
  hand: number;
  hipX: number;
  hipDrop: number;
  thigh: number;
  shin: number;
  ankleH: number;
  footLen: number;
}

export function proportions(d: BodyDims): Proportions {
  const s = d.height / 1.83;
  return {
    hipsY: 0.985 * s,
    spine: 0.1 * s,
    chest: 0.17 * s,
    neck: 0.215 * s,
    head: 0.09 * s,
    shoulderX: 0.19 * s * (0.94 + 0.06 * d.build),
    shoulderY: 0.165 * s,
    upperArm: 0.29 * s,
    foreArm: 0.26 * s,
    hand: 0.19 * s,
    hipX: 0.092 * s,
    hipDrop: 0.075 * s,
    thigh: 0.44 * s,
    shin: 0.405 * s,
    ankleH: 0.075 * s,
    footLen: 0.26 * s,
  };
}

const _m = new Matrix4();
const _q = new Quaternion();
const _qp = new Quaternion();
const _x = new Vector3();
const _y = new Vector3();
const _z = new Vector3();
const _v = new Vector3();
const _w = new Vector3();

export class Rig {
  root = new Object3D();
  bones = {} as Record<BoneName, Object3D>;
  prop: Proportions;
  rest = {} as Record<BoneName, Vector3>;

  constructor(public dims: BodyDims) {
    const p = (this.prop = proportions(dims));
    const mk = (name: BoneName, parent: Object3D, x: number, y: number, z: number) => {
      const b = new Object3D();
      b.name = name;
      b.position.set(x, y, z);
      parent.add(b);
      this.bones[name] = b;
      this.rest[name] = new Vector3(x, y, z);
      return b;
    };
    const hips = mk('hips', this.root, 0, p.hipsY, 0);
    const spine = mk('spine', hips, 0, p.spine, -0.005);
    const chest = mk('chest', spine, 0, p.chest, -0.01);
    const neck = mk('neck', chest, 0, p.neck, -0.005);
    mk('head', neck, 0, p.head, 0.012);
    for (const side of ['L', 'R'] as const) {
      const sx = side === 'L' ? 1 : -1;
      const clav = mk(`clav${side}`, chest, sx * 0.035, p.shoulderY - 0.005, -0.005);
      const ua = mk(`upperArm${side}`, clav, sx * (p.shoulderX - 0.035), 0.0, 0);
      const fa = mk(`foreArm${side}`, ua, 0, -p.upperArm, 0);
      mk(`hand${side}`, fa, 0, -p.foreArm, 0);
      const th = mk(`thigh${side}`, hips, sx * p.hipX, -p.hipDrop, 0);
      const sh = mk(`shin${side}`, th, 0, -p.thigh, 0);
      const ft = mk(`foot${side}`, sh, 0, -p.shin, 0);
      mk(`toe${side}`, ft, 0, -p.ankleH * 0.4, p.footLen * 0.62);
    }
    this.root.updateMatrixWorld(true);
  }

  resetPose(): void {
    for (const k of Object.keys(this.bones) as BoneName[]) {
      this.bones[k].quaternion.identity();
      this.bones[k].position.copy(this.rest[k]);
    }
  }

  worldPos(name: BoneName, out = new Vector3()): Vector3 {
    return this.bones[name].getWorldPosition(out);
  }

  update(): void {
    this.root.updateMatrixWorld(true);
  }

  /**
   * Sets the bone's world orientation from a basis: local +Y → yAxis, local +Z ≈ zHint.
   * The parent's world matrix must be current.
   */
  setWorldBasis(name: BoneName, yAxis: Vector3, zHint: Vector3): void {
    const b = this.bones[name];
    _y.copy(yAxis).normalize();
    _z.copy(zHint).addScaledVector(_y, -zHint.dot(_y));
    if (_z.lengthSq() < 1e-8) {
      _z.set(0, 0, 1).addScaledVector(_y, -_y.z);
      if (_z.lengthSq() < 1e-8) _z.set(1, 0, 0);
    }
    _z.normalize();
    _x.crossVectors(_y, _z).normalize();
    _m.makeBasis(_x, _y, _z);
    _q.setFromRotationMatrix(_m);
    b.parent!.getWorldQuaternion(_qp);
    b.quaternion.copy(_qp.invert().multiply(_q));
    b.updateMatrixWorld(true);
  }

  /** Points a limb bone (local −Y) along `dir` with its local +Z towards `zHint`. */
  aimLimb(name: BoneName, dir: Vector3, zHint: Vector3): void {
    _v.copy(dir).negate();
    this.setWorldBasis(name, _v, zHint);
  }

  /** Sets a bone's world rotation directly. */
  setWorldQuat(name: BoneName, q: Quaternion): void {
    const b = this.bones[name];
    b.parent!.getWorldQuaternion(_qp);
    b.quaternion.copy(_qp.invert().multiply(q));
    b.updateMatrixWorld(true);
  }

  /**
   * Analytic two-bone IK. Bends in the plane containing `pole`.
   * Returns the reach ratio (>1 means the target was out of reach and was clamped).
   */
  twoBoneIK(upper: BoneName, lower: BoneName, end: BoneName, target: Vector3, pole: Vector3, lenA: number, lenB: number): number {
    const a = this.bones[upper];
    a.parent!.updateMatrixWorld(true);
    const root = a.getWorldPosition(new Vector3());
    const toT = _w.subVectors(target, root);
    let d = toT.length();
    const ratio = d / (lenA + lenB);
    const maxD = (lenA + lenB) * 0.9995;
    const minD = Math.abs(lenA - lenB) + 0.01;
    d = Math.max(minD, Math.min(maxD, d));
    const dir = toT.normalize();
    // Angle at the root between the target direction and the upper bone (law of cosines).
    const cosA = (lenA * lenA + d * d - lenB * lenB) / (2 * lenA * d);
    const angA = Math.acos(Math.max(-1, Math.min(1, cosA)));
    // Bending direction: component of the pole orthogonal to dir.
    const bend = new Vector3().copy(pole).addScaledVector(dir, -pole.dot(dir));
    if (bend.lengthSq() < 1e-8) bend.set(0, 0, 1).addScaledVector(dir, -dir.z);
    bend.normalize();
    const upperDir = new Vector3().copy(dir).multiplyScalar(Math.cos(angA)).addScaledVector(bend, Math.sin(angA));
    const mid = root.clone().addScaledVector(upperDir, lenA);
    const endPos = root.clone().addScaledVector(dir, d);
    const lowerDir = endPos.sub(mid).normalize();
    this.aimLimb(upper, upperDir, bend);
    this.aimLimb(lower, lowerDir, bend);
    void end;
    return ratio;
  }
}
