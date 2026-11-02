// Ball rendering: plastic material with a printed logo, perceptible spin, subtle motion trail and a
// soft contact shadow that sharpens as the ball approaches a surface.
import * as THREE from 'three';
import { BALL_RADIUS, TABLE_HEIGHT, TABLE_HALF_W, TABLE_HALF_L } from '../physics/constants.js';
import { ballTexture, radialTexture } from './textures.js';

const TRAIL = 18;

export class BallView {
  constructor(scene) {
    this.textures = { white: ballTexture('#f6f4ef', '#c0392b'), orange: ballTexture('#ff8a1f', '#3b2a1c') };
    this.material = new THREE.MeshPhysicalMaterial({
      map: this.textures.white, roughness: 0.36, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.35, sheen: 0.15,
    });
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(BALL_RADIUS, 40, 28), this.material);
    this.mesh.castShadow = true;
    scene.add(this.mesh);

    // contact shadow (blob)
    this.blob = new THREE.Mesh(
      new THREE.PlaneGeometry(0.1, 0.1),
      new THREE.MeshBasicMaterial({ map: radialTexture('rgba(0,0,0,0.75)'), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
    );
    this.blob.rotation.x = -Math.PI / 2;
    this.blob.renderOrder = 2;
    scene.add(this.blob);

    // trail ribbon
    this.trailPts = [];
    const geo = new THREE.BufferGeometry();
    this.trailPos = new Float32Array(TRAIL * 2 * 3);
    this.trailAlpha = new Float32Array(TRAIL * 2);
    geo.setAttribute('position', new THREE.BufferAttribute(this.trailPos, 3));
    geo.setAttribute('alpha', new THREE.BufferAttribute(this.trailAlpha, 1));
    const idx = [];
    for (let i = 0; i < TRAIL - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    geo.setIndex(idx);
    this.trail = new THREE.Mesh(geo, new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uColor: { value: new THREE.Color(0xffffff) }, uOpacity: { value: 0 } },
      vertexShader: 'attribute float alpha; varying float vA; void main(){ vA = alpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 uColor; uniform float uOpacity; varying float vA; void main(){ gl_FragColor = vec4(uColor, vA * uOpacity); }',
    }));
    this.trail.frustumCulled = false;
    scene.add(this.trail);
    this.visQuat = new THREE.Quaternion();
    this._q = new THREE.Quaternion(); this._ax = new THREE.Vector3();
    this.showTrail = true;
  }

  setColor(name) {
    this.material.map = this.textures[name] || this.textures.white;
    this.material.needsUpdate = true;
    this.trail.material.uniforms.uColor.value.set(name === 'orange' ? 0xffb066 : 0xffffff);
  }

  update(dt, pos, vel, spin, camera, visible = true) {
    this.mesh.visible = visible; this.blob.visible = visible;
    this.mesh.position.set(pos.x, pos.y, pos.z);
    // perceptible spin: same axis, rate compressed so it does not alias at 60 fps
    const w = Math.hypot(spin.x, spin.y, spin.z);
    if (w > 0.5 && dt > 0) {
      const wv = 32 * (1 - Math.exp(-w / 110));
      this._ax.set(spin.x / w, spin.y / w, spin.z / w);
      this._q.setFromAxisAngle(this._ax, wv * dt);
      this.visQuat.premultiply(this._q);
    }
    this.mesh.quaternion.copy(this.visQuat);

    // blob shadow on the table top or on the floor
    const overTable = Math.abs(pos.x) < TABLE_HALF_W && Math.abs(pos.z) < TABLE_HALF_L && pos.y > TABLE_HEIGHT - 0.01;
    const surf = overTable ? TABLE_HEIGHT + 0.0008 : 0.0015;
    const h = Math.max(0, pos.y - BALL_RADIUS - surf);
    const s = 0.55 + h * 2.4;
    this.blob.position.set(pos.x, surf, pos.z);
    this.blob.scale.set(s, s, s);
    this.blob.material.opacity = Math.max(0, 0.75 * (1 - h / 0.9)) / (1 + h * 3);

    // trail
    const speed = Math.hypot(vel.x, vel.y, vel.z);
    this.trailPts.unshift([pos.x, pos.y, pos.z]);
    if (this.trailPts.length > TRAIL) this.trailPts.pop();
    const op = this.showTrail && visible ? Math.max(0, Math.min(1, (speed - 6) / 12)) * 0.32 : 0;
    this.trail.material.uniforms.uOpacity.value = op;
    if (op > 0 && this.trailPts.length > 2 && camera) {
      const cp = camera.position;
      for (let i = 0; i < TRAIL; i++) {
        const p = this.trailPts[Math.min(i, this.trailPts.length - 1)];
        const q = this.trailPts[Math.min(i + 1, this.trailPts.length - 1)];
        let dx = p[0] - q[0], dy = p[1] - q[1], dz = p[2] - q[2];
        const vx = cp.x - p[0], vy = cp.y - p[1], vz = cp.z - p[2];
        let sx = dy * vz - dz * vy, sy = dz * vx - dx * vz, sz = dx * vy - dy * vx;
        const sl = Math.hypot(sx, sy, sz) || 1;
        const wdt = BALL_RADIUS * 0.9 * (1 - i / TRAIL);
        sx = (sx / sl) * wdt; sy = (sy / sl) * wdt; sz = (sz / sl) * wdt;
        const o = i * 6;
        this.trailPos[o] = p[0] + sx; this.trailPos[o + 1] = p[1] + sy; this.trailPos[o + 2] = p[2] + sz;
        this.trailPos[o + 3] = p[0] - sx; this.trailPos[o + 4] = p[1] - sy; this.trailPos[o + 5] = p[2] - sz;
        const a = (1 - i / TRAIL) ** 1.6;
        this.trailAlpha[i * 2] = a; this.trailAlpha[i * 2 + 1] = a;
      }
      this.trail.geometry.attributes.position.needsUpdate = true;
      this.trail.geometry.attributes.alpha.needsUpdate = true;
    }
  }
  resetTrail() { this.trailPts.length = 0; }
}
