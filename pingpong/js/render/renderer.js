// WebGL renderer, lights, environment reflections, quality presets and optional ambient occlusion.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { TABLE_HEIGHT } from '../physics/constants.js';

export const QUALITY = {
  low: { pixelRatio: 1, shadow: 1024, soft: false, ao: false, antialias: false },
  medium: { pixelRatio: 1.5, shadow: 2048, soft: true, ao: false, antialias: true },
  high: { pixelRatio: 2, shadow: 2048, soft: true, ao: true, antialias: true },
};

export function autoQuality() {
  const mobile = matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  const cores = navigator.hardwareConcurrency || 4;
  if (mobile) return cores >= 8 ? 'medium' : 'low';
  return cores >= 6 ? 'high' : 'medium';
}

export class Renderer {
  constructor(container, qualityName) {
    this.container = container;
    this.qualityName = qualityName;
    const q = QUALITY[qualityName];
    this.renderer = new THREE.WebGLRenderer({ antialias: q.antialias, powerPreference: 'high-performance', alpha: false });
    const r = this.renderer;
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 0.95;
    r.shadowMap.enabled = true;
    r.shadowMap.type = q.soft ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
    container.appendChild(r.domElement);
    r.domElement.className = 'gl';

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c1018);
    this.scene.fog = new THREE.Fog(0x0c1018, 22, 46);
    const pmrem = new THREE.PMREMGenerator(r);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.22;

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.03, 80);
    this.camera.position.set(0, 2, 4);

    // Gym lighting: a bright rig above the table (soft shadows) plus hall lights
    const hemi = new THREE.HemisphereLight(0xc9d6ef, 0x3a2a22, 0.28);
    this.scene.add(hemi);
    const key = new THREE.SpotLight(0xfff6ea, 230, 0, 0.42, 0.75, 2);
    key.position.set(0.25, 6.8, 0.5);
    key.target.position.set(0, TABLE_HEIGHT, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(q.shadow, q.shadow);
    key.shadow.camera.near = 3; key.shadow.camera.far = 9;
    key.shadow.bias = -0.00012; key.shadow.normalBias = 0.012;
    key.shadow.radius = 3;
    this.scene.add(key, key.target);
    this.key = key;
    const fillA = new THREE.SpotLight(0xe8efff, 60, 0, 0.7, 0.9, 2);
    fillA.position.set(-3.5, 6.5, 3.5); fillA.target.position.set(0, 0.5, 0);
    const fillB = fillA.clone(); fillB.position.set(3.5, 6.5, -3.5); fillB.target = new THREE.Object3D(); fillB.target.position.set(0, 0.5, 0);
    this.scene.add(fillA, fillA.target, fillB, fillB.target);
    const hall = new THREE.DirectionalLight(0xdfe7ff, 0.18);
    hall.position.set(-6, 10, 4);
    this.scene.add(hall);

    this.composer = null;
    this.setupComposer();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  setupComposer() {
    const q = QUALITY[this.qualityName];
    if (this.composer) { this.composer.dispose?.(); this.composer = null; }
    if (!q.ao) return;
    try {
      const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
      const rt = new THREE.WebGLRenderTarget(Math.max(1, size.x), Math.max(1, size.y), { type: THREE.HalfFloatType, samples: 4 });
      this.composer = new EffectComposer(this.renderer, rt);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      const gtao = new GTAOPass(this.scene, this.camera, size.x, size.y);
      gtao.updateGtaoMaterial({ radius: 0.35, distanceExponent: 1.2, thickness: 1.0, scale: 1.0, samples: 12 });
      gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
      gtao.blendIntensity = 0.85;
      this.composer.addPass(gtao);
      this.composer.addPass(new OutputPass());
      this.gtao = gtao;
    } catch (e) {
      console.warn('AO disabled:', e);
      this.composer = null;
    }
  }

  setQuality(name) {
    this.qualityName = name;
    const q = QUALITY[name];
    this.renderer.shadowMap.type = q.soft ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
    this.key.shadow.mapSize.set(q.shadow, q.shadow);
    if (this.key.shadow.map) { this.key.shadow.map.dispose(); this.key.shadow.map = null; }
    this.renderer.shadowMap.needsUpdate = true;
    this.scene.traverse((o) => { if (o.material) { const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach((m) => { m.needsUpdate = true; }); } });
    this.resize();
    this.setupComposer();
  }

  resize() {
    const w = this.container.clientWidth || window.innerWidth, h = this.container.clientHeight || window.innerHeight;
    const q = QUALITY[this.qualityName];
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.pixelRatio));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.composer) {
      const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
      this.composer.setSize(w, h);
      this.composer.setPixelRatio(this.renderer.getPixelRatio());
      this.gtao?.setSize(size.x, size.y);
    }
  }

  render() {
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }
}
