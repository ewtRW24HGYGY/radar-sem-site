import {
  BufferAttribute,
  BufferGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshDepthMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  RGBADepthPacking,
  SphereGeometry,
  Vector3,
} from 'three';
import { BALL, GOAL } from '../physics/constants';
import { NET_PANELS } from '../physics/net';
import { netTexture } from './textures';

function tube(a: Vector3, b: Vector3, r: number, mat: MeshPhysicalMaterial | MeshStandardMaterial, seg = 24): Mesh {
  const len = a.distanceTo(b);
  const g = new CylinderGeometry(r, r, len, seg, 1, true);
  const m = new Mesh(g, mat);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), b.clone().sub(a).normalize());
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/**
 * Visual net: a position-based-dynamics cloth on the same four pinned panels used
 * by the physics membrane. The ball pushes the particles out of its volume, so the
 * rendered bulge is exactly where the physical membrane is deflected.
 */
export class NetCloth {
  readonly n: number;
  pos: Float32Array;
  prev: Float32Array;
  pinned: Uint8Array;
  private cons: Int32Array;
  private rest: Float32Array;
  geometry: BufferGeometry;
  mesh: Mesh;
  awake = 1.5;
  private quiet = 0;
  /** Particle spacing (m). */
  constructor(spacing: number) {
    const verts: number[] = [];
    const pins: number[] = [];
    const uvs: number[] = [];
    const idx: number[] = [];
    const cons: number[] = [];
    const tex = 0.24; // texture tile size (two mesh cells)
    for (const pan of NET_PANELS) {
      const [c00, c10, c01, c11] = pan.corners;
      const la = Math.max(c00.distanceTo(c10), c01.distanceTo(c11));
      const lb = Math.max(c00.distanceTo(c01), c10.distanceTo(c11));
      const nu = Math.max(3, Math.round(la / spacing));
      const nv = Math.max(3, Math.round(lb / spacing));
      const base = verts.length / 3;
      const p = new Vector3();
      const qa = new Vector3();
      const qb = new Vector3();
      for (let j = 0; j <= nv; j++) {
        for (let i = 0; i <= nu; i++) {
          const a = i / nu;
          const b = j / nv;
          qa.copy(c00).lerp(c10, a);
          qb.copy(c01).lerp(c11, a);
          p.copy(qa).lerp(qb, b);
          verts.push(p.x, p.y, p.z);
          pins.push(i === 0 || j === 0 || i === nu || j === nv ? 1 : 0);
          uvs.push((a * la) / tex, (b * lb) / tex);
        }
      }
      const id = (i: number, j: number) => base + j * (nu + 1) + i;
      for (let j = 0; j <= nv; j++) {
        for (let i = 0; i <= nu; i++) {
          if (i < nu) cons.push(id(i, j), id(i + 1, j));
          if (j < nv) cons.push(id(i, j), id(i, j + 1));
          if (i < nu && j < nv) {
            cons.push(id(i, j), id(i + 1, j + 1));
            idx.push(id(i, j), id(i + 1, j), id(i + 1, j + 1), id(i, j), id(i + 1, j + 1), id(i, j + 1));
          }
        }
      }
    }
    this.n = verts.length / 3;
    this.pos = new Float32Array(verts);
    this.prev = new Float32Array(verts);
    this.pinned = new Uint8Array(pins);
    this.cons = new Int32Array(cons);
    this.rest = new Float32Array(cons.length / 2);
    for (let c = 0; c < this.rest.length; c++) {
      const a = this.cons[2 * c] * 3;
      const b = this.cons[2 * c + 1] * 3;
      const d = Math.hypot(this.pos[a] - this.pos[b], this.pos[a + 1] - this.pos[b + 1], this.pos[a + 2] - this.pos[b + 2]);
      this.rest[c] = d * 1.035; // a little slack so the net hangs
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(this.pos, 3));
    g.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    this.geometry = g;
    const tex = netTexture();
    const mat = new MeshStandardMaterial({
      color: 0xf4f4f0,
      map: tex,
      alphaMap: tex,
      alphaTest: 0.45,
      transparent: false,
      side: DoubleSide,
      roughness: 0.85,
      metalness: 0,
    });
    mat.alphaToCoverage = true;
    this.mesh = new Mesh(g, mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.frustumCulled = false;
    this.mesh.customDepthMaterial = new MeshDepthMaterial({ depthPacking: RGBADepthPacking, alphaMap: tex, alphaTest: 0.45, side: DoubleSide });
    this.mesh.name = 'net';
    this.snapshot0 = new Float32Array(this.pos);
    // Let it settle under gravity once.
    for (let i = 0; i < 360; i++) this.step(1 / 240, null, null);
    this.snapshot0.set(this.pos);
    this.prev.set(this.pos);
    this.awake = 0;
  }
  snapshot0: Float32Array;

  reset(): void {
    this.pos.set(this.snapshot0);
    this.prev.set(this.snapshot0);
    this.awake = 0;
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
  }

  wake(): void {
    this.awake = 1.6;
  }

  /** One fixed step with the ball moving from b0 to b1 during it. */
  step(dt: number, b0: Vector3 | null, b1: Vector3 | null): void {
    if (b1) {
      const near = b1.z < 0.4 && b1.z > -3 && Math.abs(b1.x) < GOAL.postX + 0.6 && b1.y < GOAL.barY + 0.5;
      if (near) this.awake = Math.max(this.awake, 0.8);
    }
    if (this.awake <= 0) return;
    const sub = 2;
    const h = dt / sub;
    const g = -9.81 * h * h;
    const P = this.pos;
    const Q = this.prev;
    const pin = this.pinned;
    const n = this.n;
    const r = BALL.radius + 0.014;
    let energy = 0;
    for (let s = 0; s < sub; s++) {
      for (let i = 0; i < n; i++) {
        if (pin[i]) continue;
        const k = i * 3;
        const vx = (P[k] - Q[k]) * 0.985;
        const vy = (P[k + 1] - Q[k + 1]) * 0.985;
        const vz = (P[k + 2] - Q[k + 2]) * 0.985;
        Q[k] = P[k];
        Q[k + 1] = P[k + 1];
        Q[k + 2] = P[k + 2];
        P[k] += vx;
        P[k + 1] += vy + g;
        P[k + 2] += vz;
        energy += vx * vx + vy * vy + vz * vz;
      }
      for (let it = 0; it < 4; it++) {
        const C = this.cons;
        const R = this.rest;
        for (let c = 0, m = R.length; c < m; c++) {
          const a = C[2 * c];
          const b = C[2 * c + 1];
          const ka = a * 3;
          const kb = b * 3;
          const dx = P[kb] - P[ka];
          const dy = P[kb + 1] - P[ka + 1];
          const dz = P[kb + 2] - P[ka + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d <= R[c] || d < 1e-9) continue; // cords resist stretching, not compression
          const wa = pin[a] ? 0 : 1;
          const wb = pin[b] ? 0 : 1;
          const w = wa + wb;
          if (w === 0) continue;
          const f = (d - R[c]) / (d * w);
          P[ka] += dx * f * wa;
          P[ka + 1] += dy * f * wa;
          P[ka + 2] += dz * f * wa;
          P[kb] -= dx * f * wb;
          P[kb + 1] -= dy * f * wb;
          P[kb + 2] -= dz * f * wb;
        }
      }
      // Ball (kinematic sphere) and ground.
      let cx = 0, cy = 0, cz = 0;
      const hasBall = !!(b0 && b1);
      if (hasBall) {
        const t = (s + 1) / sub;
        cx = b0!.x + (b1!.x - b0!.x) * t;
        cy = b0!.y + (b1!.y - b0!.y) * t;
        cz = b0!.z + (b1!.z - b0!.z) * t;
      }
      for (let i = 0; i < n; i++) {
        if (pin[i]) continue;
        const k = i * 3;
        if (P[k + 1] < 0.01) P[k + 1] = 0.01;
        if (!hasBall) continue;
        const dx = P[k] - cx;
        const dy = P[k + 1] - cy;
        const dz = P[k + 2] - cz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < r * r && d2 > 1e-12) {
          const d = Math.sqrt(d2);
          const f = r / d;
          P[k] = cx + dx * f;
          P[k + 1] = cy + dy * f;
          P[k + 2] = cz + dz * f;
        }
      }
    }
    if (energy < 1e-7 * n) this.quiet += dt;
    else this.quiet = 0;
    this.awake -= dt;
    if (this.quiet < 0.3) this.awake = Math.max(this.awake, 0.05);
    this.geometry.attributes.position.needsUpdate = true;
  }

  /** Recompute normals (call once per rendered frame when awake). */
  refresh(): void {
    if (this.awake > 0) this.geometry.computeVertexNormals();
  }

  /** Copies particle positions (for replay snapshots). */
  capture(out?: Float32Array): Float32Array {
    const o = out ?? new Float32Array(this.pos.length);
    o.set(this.pos);
    return o;
  }
  restore(src: Float32Array): void {
    this.pos.set(src);
    this.prev.set(src);
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
  }
}

export class GoalMesh {
  group = new Group();
  net: NetCloth;
  frameMat: MeshPhysicalMaterial;

  constructor(netSpacing: number) {
    const X = GOAL.postX;
    const Z = GOAL.postZ;
    const r = GOAL.postRadius;
    const top = GOAL.barY;
    this.frameMat = new MeshPhysicalMaterial({
      color: 0xf6f7f8,
      roughness: 0.32,
      metalness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.0,
    });
    const g = this.group;
    g.add(tube(new Vector3(-X, -0.02, Z), new Vector3(-X, top, Z), r, this.frameMat, 40));
    g.add(tube(new Vector3(X, -0.02, Z), new Vector3(X, top, Z), r, this.frameMat, 40));
    g.add(tube(new Vector3(-X, top, Z), new Vector3(X, top, Z), r, this.frameMat, 40));
    for (const sx of [-1, 1]) {
      const joint = new Mesh(new SphereGeometry(r, 32, 16), this.frameMat);
      joint.position.set(sx * X, top, Z);
      joint.castShadow = true;
      g.add(joint);
    }
    // Back frame: thin supports behind the net.
    const sup = new MeshPhysicalMaterial({ color: 0xe8eaec, roughness: 0.45, metalness: 0.3, clearcoat: 0.5 });
    const F = Z - r;
    const ZT = F - GOAL.netDepthTop;
    const ZB = F - GOAL.netDepthBottom;
    const rr = 0.022;
    for (const sx of [-1, 1]) {
      g.add(tube(new Vector3(sx * X, top, F), new Vector3(sx * X, top, ZT), rr, sup, 12));
      g.add(tube(new Vector3(sx * X, top, ZT), new Vector3(sx * X, 0.02, ZB), rr, sup, 12));
      g.add(tube(new Vector3(sx * X, 0.02, F), new Vector3(sx * X, 0.02, ZB), rr, sup, 12));
    }
    g.add(tube(new Vector3(-X, top, ZT), new Vector3(X, top, ZT), rr, sup, 12));
    g.add(tube(new Vector3(-X, 0.02, ZB), new Vector3(X, 0.02, ZB), rr, sup, 12));
    this.net = new NetCloth(netSpacing);
    g.add(this.net.mesh);
  }
}
