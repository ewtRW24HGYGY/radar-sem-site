import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  DynamicDrawUsage,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Quaternion,
  RingGeometry,
  ShaderMaterial,
  SphereGeometry,
  TorusGeometry,
  Vector3,
  Camera,
  Group,
} from 'three';
import { mulberry32 } from './textures';

export function radialTexture(inner = 'rgba(0,0,0,0.85)', outer = 'rgba(0,0,0,0)'): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, inner);
  gr.addColorStop(1, outer);
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

/** Soft contact shadow (ambient occlusion blob) projected on the turf. */
export class ContactShadow {
  mesh: Mesh;
  constructor(size: number, strength = 0.75) {
    const mat = new MeshBasicMaterial({ map: radialTexture(`rgba(0,0,0,${strength})`), transparent: true, depthWrite: false, color: 0xffffff });
    this.mesh = new Mesh(new PlaneGeometry(size, size), mat);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.renderOrder = 2;
  }
  update(x: number, z: number, height: number, reach = 0.5): void {
    const k = Math.max(0, 1 - height / reach);
    this.mesh.position.set(x, 0.036, z);
    (this.mesh.material as MeshBasicMaterial).opacity = k;
    this.mesh.scale.setScalar(1 + height * 1.5);
    this.mesh.visible = k > 0.01;
  }
}

/** Grass and soil kicked up by the strike or a dive. */
export class TurfSpray {
  points: Points;
  private pos: Float32Array;
  private vel: Float32Array;
  private life: Float32Array;
  private n = 220;
  private next = 0;
  constructor() {
    this.pos = new Float32Array(this.n * 3).fill(-100);
    this.vel = new Float32Array(this.n * 3);
    this.life = new Float32Array(this.n);
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(this.pos, 3).setUsage(DynamicDrawUsage));
    const col = new Float32Array(this.n * 3);
    const r = mulberry32(5);
    for (let i = 0; i < this.n; i++) {
      const soil = r() < 0.3;
      const c = soil ? new Color(0x4a3b26) : new Color(0x3f7a2e).multiplyScalar(0.7 + r() * 0.5);
      col.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute('color', new BufferAttribute(col, 3));
    this.points = new Points(g, new PointsMaterial({ size: 0.025, vertexColors: true, sizeAttenuation: true }));
    this.points.frustumCulled = false;
  }
  burst(at: Vector3, dir: Vector3, count: number, speed: number): void {
    // Deterministic spread pattern (visual only).
    for (let k = 0; k < count; k++) {
      const i = this.next;
      this.next = (this.next + 1) % this.n;
      const a = k * 2.399963;
      const s = 0.4 + ((k * 37) % 11) / 11;
      this.pos.set([at.x, at.y + 0.02, at.z], i * 3);
      this.vel.set(
        [dir.x * speed * s + Math.cos(a) * 0.9, 1.2 + s * 1.6, dir.z * speed * s + Math.sin(a) * 0.9],
        i * 3,
      );
      this.life[i] = 0.9 + s * 0.6;
    }
  }
  update(dt: number): void {
    for (let i = 0; i < this.n; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      const k = i * 3;
      this.vel[k + 1] -= 9.81 * dt;
      this.vel[k] *= 0.985;
      this.vel[k + 2] *= 0.985;
      this.pos[k] += this.vel[k] * dt;
      this.pos[k + 1] += this.vel[k + 1] * dt;
      this.pos[k + 2] += this.vel[k + 2] * dt;
      if (this.pos[k + 1] < 0.01) {
        this.pos[k + 1] = 0.01;
        this.vel[k] = this.vel[k + 1] = this.vel[k + 2] = 0;
      }
      if (this.life[i] <= 0) this.pos[k + 1] = -100;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
  }
}

/** Confetti for trophies. */
export class Confetti {
  mesh: InstancedMesh;
  private p: Float32Array;
  private v: Float32Array;
  private rot: Float32Array;
  private n = 700;
  active = 0;
  private m = new Matrix4();
  private q = new Quaternion();
  constructor() {
    const mat = new MeshStandardMaterial({ side: DoubleSide, roughness: 0.4, metalness: 0.3 });
    this.mesh = new InstancedMesh(new PlaneGeometry(0.06, 0.035), mat, this.n);
    this.p = new Float32Array(this.n * 3);
    this.v = new Float32Array(this.n * 3);
    this.rot = new Float32Array(this.n * 3);
    const r = mulberry32(9);
    const cols = ['#f2b636', '#ffffff', '#d62839', '#2a9d8f', '#457b9d'];
    for (let i = 0; i < this.n; i++) this.mesh.setColorAt(i, new Color(cols[Math.floor(r() * cols.length)]));
    this.mesh.visible = false;
    this.mesh.frustumCulled = false;
  }
  fire(center: Vector3): void {
    const r = mulberry32(13);
    for (let i = 0; i < this.n; i++) {
      this.p.set([center.x + (r() - 0.5) * 16, 14 + r() * 10, center.z + (r() - 0.5) * 16], i * 3);
      this.v.set([(r() - 0.5) * 1.2, -0.6 - r() * 0.8, (r() - 0.5) * 1.2], i * 3);
      this.rot.set([r() * 6, r() * 6, r() * 6], i * 3);
    }
    this.active = 9;
    this.mesh.visible = true;
  }
  update(dt: number, t: number): void {
    if (this.active <= 0) return;
    this.active -= dt;
    const o = new Object3D();
    for (let i = 0; i < this.n; i++) {
      const k = i * 3;
      this.p[k] += (this.v[k] + Math.sin(t * 2 + i) * 0.4) * dt;
      this.p[k + 1] = Math.max(0.01, this.p[k + 1] + this.v[k + 1] * dt);
      this.p[k + 2] += (this.v[k + 2] + Math.cos(t * 1.7 + i) * 0.4) * dt;
      o.position.set(this.p[k], this.p[k + 1], this.p[k + 2]);
      const fl = this.p[k + 1] > 0.02 ? 1 : 0;
      o.rotation.set(this.rot[k] + t * 3 * fl, this.rot[k + 1] + t * 2 * fl, this.rot[k + 2]);
      o.updateMatrix();
      this.mesh.setMatrixAt(i, o.matrix);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.active <= 0) this.mesh.visible = false;
    void this.m;
    void this.q;
  }
}

/** Camera-facing ribbon of recent ball positions (broadcast-style trail). */
export class BallTrail {
  mesh: Mesh;
  private pts: Vector3[] = [];
  private max = 90;
  private geo: BufferGeometry;
  private posArr: Float32Array;
  private alphaArr: Float32Array;
  enabled = true;
  constructor(color = new Color(1.6, 1.25, 0.4)) {
    this.geo = new BufferGeometry();
    this.posArr = new Float32Array(this.max * 2 * 3);
    this.alphaArr = new Float32Array(this.max * 2);
    this.geo.setAttribute('position', new BufferAttribute(this.posArr, 3).setUsage(DynamicDrawUsage));
    this.geo.setAttribute('alpha', new BufferAttribute(this.alphaArr, 1).setUsage(DynamicDrawUsage));
    const idx: number[] = [];
    for (let i = 0; i < this.max - 1; i++) {
      const a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    this.geo.setIndex(idx);
    const mat = new ShaderMaterial({
      uniforms: { uColor: { value: color } },
      vertexShader: 'attribute float alpha; varying float vA; void main(){ vA = alpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 uColor; varying float vA; void main(){ gl_FragColor = vec4(uColor * vA, vA); }',
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      side: DoubleSide,
    });
    this.mesh = new Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 5;
  }
  clear(): void {
    this.pts.length = 0;
    this.geo.setDrawRange(0, 0);
  }
  push(p: Vector3): void {
    const last = this.pts[this.pts.length - 1];
    if (last && last.distanceToSquared(p) < 0.0009) return;
    this.pts.push(p.clone());
    if (this.pts.length > this.max) this.pts.shift();
  }
  setPoints(pts: Vector3[]): void {
    this.pts = pts.slice(-this.max).map((p) => p.clone());
  }
  update(camera: Camera): void {
    const n = this.pts.length;
    this.mesh.visible = this.enabled && n > 1;
    if (n < 2) return;
    const camPos = new Vector3().setFromMatrixPosition(camera.matrixWorld);
    const side = new Vector3();
    for (let i = 0; i < n; i++) {
      const p = this.pts[i];
      const q = this.pts[Math.min(n - 1, i + 1)];
      const o = this.pts[Math.max(0, i - 1)];
      const t = q.clone().sub(o).normalize();
      const v = camPos.clone().sub(p).normalize();
      side.crossVectors(t, v).normalize();
      const w = 0.045 * (i / n);
      this.posArr.set([p.x + side.x * w, p.y + side.y * w, p.z + side.z * w, p.x - side.x * w, p.y - side.y * w, p.z - side.z * w], i * 6);
      const a = Math.pow(i / n, 1.6) * 0.8;
      this.alphaArr[i * 2] = this.alphaArr[i * 2 + 1] = a;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.alpha.needsUpdate = true;
    this.geo.setDrawRange(0, (n - 1) * 6);
  }
}

/** Aim reticle drawn on the goal plane. */
export class AimMarker {
  group = new Group();
  private ring: Mesh;
  private dot: Mesh;
  constructor() {
    const mat = new MeshBasicMaterial({ color: new Color(2.2, 1.6, 0.4), transparent: true, opacity: 0.9, depthWrite: false, side: DoubleSide });
    this.ring = new Mesh(new RingGeometry(0.15, 0.19, 48), mat);
    this.dot = new Mesh(new RingGeometry(0, 0.035, 16), mat);
    const tickMat = mat;
    for (let i = 0; i < 4; i++) {
      const t = new Mesh(new PlaneGeometry(0.02, 0.09), tickMat);
      const a = (i * Math.PI) / 2;
      t.position.set(Math.cos(a) * 0.24, Math.sin(a) * 0.24, 0);
      t.rotation.z = a + Math.PI / 2;
      this.group.add(t);
    }
    this.group.add(this.ring, this.dot);
    this.group.renderOrder = 10;
  }
  set(x: number, y: number, z: number, pulse: number, scale = 1): void {
    this.group.position.set(x, y, z);
    this.group.scale.setScalar(scale * (1 + 0.06 * Math.sin(pulse * 6)));
  }
}

/** Precision-challenge targets: glowing hoops on the goal plane. */
export class TargetHoops {
  group = new Group();
  hoops: { mesh: Mesh; x: number; y: number; r: number; hit: number }[] = [];
  private mat = new MeshBasicMaterial({ color: new Color(0.4, 2.2, 1.8), transparent: true, opacity: 0.85, depthWrite: false });
  private hitMat = new MeshBasicMaterial({ color: new Color(2.6, 2.0, 0.5), transparent: true, opacity: 0.95, depthWrite: false });
  set(list: { x: number; y: number; r: number }[], z: number): void {
    for (const h of this.hoops) this.group.remove(h.mesh);
    this.hoops = list.map((t) => {
      const mesh = new Mesh(new TorusGeometry(t.r, 0.022, 10, 64), this.mat);
      mesh.position.set(t.x, t.y, z);
      this.group.add(mesh);
      return { mesh, ...t, hit: 0 };
    });
  }
  flash(i: number): void {
    const h = this.hoops[i];
    if (!h) return;
    h.mesh.material = this.hitMat;
    h.hit = 1.2;
  }
  update(dt: number, t: number): void {
    for (const h of this.hoops) {
      h.mesh.rotation.z = t * 0.3;
      if (h.hit > 0) {
        h.hit -= dt;
        h.mesh.scale.setScalar(1 + 0.15 * Math.sin(h.hit * 20));
        if (h.hit <= 0) {
          h.mesh.material = this.mat;
          h.mesh.scale.setScalar(1);
        }
      }
    }
  }
}

/** Dotted trajectory guide (training). */
export class TrajectoryGuide {
  mesh: InstancedMesh;
  private n = 40;
  constructor() {
    this.mesh = new InstancedMesh(new SphereGeometry(0.025, 8, 6), new MeshBasicMaterial({ color: new Color(1.8, 1.8, 1.8), transparent: true, opacity: 0.7 }), this.n);
    this.mesh.frustumCulled = false;
    this.mesh.count = 0;
  }
  set(path: Vector3[]): void {
    const m = new Matrix4();
    const n = Math.min(this.n, path.length);
    const step = path.length / Math.max(1, n);
    for (let i = 0; i < n; i++) {
      const p = path[Math.floor(i * step)];
      m.makeTranslation(p.x, p.y, p.z);
      this.mesh.setMatrixAt(i, m);
    }
    this.mesh.count = n;
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
