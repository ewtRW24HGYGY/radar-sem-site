import {
  ACESFilmicToneMapping,
  BackSide,
  Color,
  DirectionalLight,
  FogExp2,
  Group,
  HalfFloatType,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { FXAAPass } from 'three/examples/jsm/postprocessing/FXAAPass.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { BALL } from '../physics/constants';
import { GoalMesh } from './goal';
import { Pitch } from './pitch';
import { Stadium } from './stadium';
import { ballTextures } from './textures';
import { AimMarker, BallTrail, Confetti, ContactShadow, TargetHoops, TrajectoryGuide, TurfSpray } from './effects';

export type Quality = 'low' | 'high' | 'ultra';
export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface QualitySpec {
  pixelRatio: number;
  shadowMap: number;
  shells: number;
  crowd: number;
  msaa: number;
  bloom: boolean;
  gtao: boolean;
  dof: boolean;
  netSpacing: number;
  nightShadows: number;
  ballGhosts: number;
}

export const QUALITY: Record<Quality, QualitySpec> = {
  low: { pixelRatio: 1, shadowMap: 1024, shells: 0, crowd: 9000, msaa: 0, bloom: false, gtao: false, dof: false, netSpacing: 0.2, nightShadows: 1, ballGhosts: 0 },
  high: { pixelRatio: 1.5, shadowMap: 2048, shells: 10, crowd: 26000, msaa: 4, bloom: true, gtao: false, dof: true, netSpacing: 0.12, nightShadows: 2, ballGhosts: 5 },
  ultra: { pixelRatio: 2, shadowMap: 4096, shells: 20, crowd: 48000, msaa: 4, bloom: true, gtao: true, dof: true, netSpacing: 0.1, nightShadows: 3, ballGhosts: 8 },
};

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 0.32 },
    uTension: { value: 0 },
    uPulse: { value: 0 },
    uSat: { value: 1.06 },
    uGrain: { value: 0.025 },
    uFlash: { value: 0 },
    uResolution: { value: new Vector2(1, 1) },
  },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uVignette; uniform float uTension; uniform float uPulse;
    uniform float uSat; uniform float uGrain; uniform float uFlash; uniform vec2 uResolution;
    varying vec2 vUv;
    float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }
    void main() {
      vec2 c = vUv - 0.5;
      float r2 = dot(c, c);
      float ca = (0.0015 + 0.004 * uTension) * r2 * 4.0;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c * ca).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c * ca).b;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSat - 0.35 * uTension);
      float vig = 1.0 - (uVignette + 0.35 * uTension + 0.12 * uPulse) * smoothstep(0.1, 0.75, r2 * 2.0);
      col *= vig;
      col += (rand(vUv * uResolution + uTime) - 0.5) * uGrain * (0.5 + l);
      col += vec3(uFlash);
      gl_FragColor = vec4(col, 1.0);
    }`,
};

/** Night sky dome with stars and the glow of the stadium lights. */
function nightSky(): Mesh {
  const mat = new ShaderMaterial({
    side: BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      float h(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      void main(){
        float y = max(vDir.y, 0.0);
        vec3 top = vec3(0.006, 0.01, 0.025);
        vec3 hor = vec3(0.07, 0.065, 0.075);
        vec3 col = mix(hor, top, pow(y, 0.45));
        vec3 q = floor(vDir * 420.0);
        float s = step(0.9975, h(q)) * smoothstep(0.15, 0.5, y);
        col += vec3(s) * 0.9;
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  return new Mesh(new SphereGeometry(3000, 32, 16), mat);
}

export class RenderSystem {
  renderer: WebGLRenderer;
  scene = new Scene();
  camera: PerspectiveCamera;
  composer: EffectComposer;
  grade: ShaderPass;
  bloom: UnrealBloomPass | null = null;
  bokeh: BokehPass | null = null;
  gtao: GTAOPass | null = null;
  spec: QualitySpec;
  pitch: Pitch;
  goal: GoalMesh;
  stadium: Stadium;
  ball: Mesh;
  ballGhosts: Mesh[] = [];
  ballShadow: ContactShadow;
  footShadows: ContactShadow[] = [];
  aim = new AimMarker();
  trail = new BallTrail();
  spray = new TurfSpray();
  confetti = new Confetti();
  hoops = new TargetHoops();
  guide = new TrajectoryGuide();
  lights: DirectionalLight[] = [];
  hemi: HemisphereLight;
  sky: Object3D | null = null;
  characters = new Group();
  dofEnabled = false;
  dofFocus = 10;
  private pmrem: PMREMGenerator;
  private time = 0;
  private flash = 0;

  constructor(public container: HTMLElement, public quality: Quality, public timeOfDay: TimeOfDay, teamColors: { home: string[]; away: string[] }) {
    const spec = (this.spec = QUALITY[quality]);
    this.renderer = new WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, spec.pixelRatio));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFShadowMap;
    container.appendChild(this.renderer.domElement);
    this.camera = new PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.05, 4000);
    this.camera.position.set(0, 1.7, 15.5);
    this.camera.lookAt(0, 1.2, 0);
    this.pmrem = new PMREMGenerator(this.renderer);

    // World
    this.pitch = new Pitch({ shells: spec.shells });
    this.scene.add(this.pitch.group);
    this.goal = new GoalMesh(spec.netSpacing);
    this.scene.add(this.goal.group);
    this.stadium = new Stadium({ crowd: spec.crowd, homeColors: teamColors.home, awayColors: teamColors.away, detail: 1 });
    this.scene.add(this.stadium.group);
    this.scene.add(this.characters);

    // Ball
    const bt = ballTextures();
    const ballMat = new MeshPhysicalMaterial({
      map: bt.map,
      bumpMap: bt.bump,
      bumpScale: 0.6,
      roughness: 0.38,
      metalness: 0,
      clearcoat: 0.7,
      clearcoatRoughness: 0.28,
    });
    this.ball = new Mesh(new SphereGeometry(BALL.radius, 64, 48), ballMat);
    this.ball.castShadow = true;
    this.ball.receiveShadow = true;
    this.scene.add(this.ball);
    for (let i = 0; i < spec.ballGhosts; i++) {
      const gm = ballMat.clone();
      gm.transparent = true;
      gm.depthWrite = false;
      gm.opacity = 0.0;
      const g = new Mesh(this.ball.geometry, gm);
      g.visible = false;
      this.ballGhosts.push(g);
      this.scene.add(g);
    }
    this.ballShadow = new ContactShadow(0.42, 0.8);
    this.scene.add(this.ballShadow.mesh);
    for (let i = 0; i < 4; i++) {
      const s = new ContactShadow(0.36, 0.55);
      this.footShadows.push(s);
      this.scene.add(s.mesh);
    }
    this.scene.add(this.aim.group, this.trail.mesh, this.spray.points, this.confetti.mesh, this.hoops.group, this.guide.mesh);

    // Lighting & atmosphere
    this.hemi = new HemisphereLight(0xbfd6ff, 0x2a4a22, 0.8);
    this.scene.add(this.hemi);
    this.setupAtmosphere(timeOfDay);

    // Post-processing
    const size = this.renderer.getDrawingBufferSize(new Vector2());
    const rt = new WebGLRenderTarget(size.x, size.y, { type: HalfFloatType, samples: spec.msaa });
    this.composer = new EffectComposer(this.renderer, rt);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    if (spec.gtao) {
      this.gtao = new GTAOPass(this.scene, this.camera, size.x / 2, size.y / 2);
      this.gtao.blendIntensity = 0.85;
      this.gtao.updateGtaoMaterial({ radius: 0.35, distanceExponent: 1.4, thickness: 1.2, scale: 1 });
      this.composer.addPass(this.gtao);
    }
    if (spec.dof) {
      this.bokeh = new BokehPass(this.scene, this.camera, { focus: 10, aperture: 0.0025, maxblur: 0.008 });
      this.bokeh.enabled = false;
      this.composer.addPass(this.bokeh);
    }
    if (spec.bloom) {
      this.bloom = new UnrealBloomPass(new Vector2(size.x / 2, size.y / 2), 0.32, 0.55, 0.95);
      this.composer.addPass(this.bloom);
    }
    this.grade = new ShaderPass(GradeShader);
    this.composer.addPass(this.grade);
    this.composer.addPass(new OutputPass());
    if (!spec.msaa) this.composer.addPass(new FXAAPass());
    this.resize();
    window.addEventListener('resize', this.onResize);
  }

  private onResize = () => this.resize();

  resize(): void {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.composer.setSize(w, h);
    const pr = this.renderer.getPixelRatio();
    (this.grade.uniforms.uResolution.value as Vector2).set(w * pr, h * pr);
  }

  setupAtmosphere(tod: TimeOfDay): void {
    this.timeOfDay = tod;
    for (const l of this.lights) {
      this.scene.remove(l);
      this.scene.remove(l.target);
      l.dispose();
    }
    this.lights = [];
    if (this.sky) this.scene.remove(this.sky);
    const spec = this.spec;
    const mkLight = (pos: Vector3, color: number, intensity: number, shadow: boolean, mapSize: number) => {
      const l = new DirectionalLight(color, intensity);
      l.position.copy(pos);
      l.target.position.set(0, 0, 6);
      if (shadow) {
        l.castShadow = true;
        l.shadow.mapSize.set(mapSize, mapSize);
        const c = l.shadow.camera;
        c.left = -15;
        c.right = 15;
        c.top = 16;
        c.bottom = -12;
        c.near = 1;
        c.far = 220;
        l.shadow.bias = -0.00025;
        l.shadow.normalBias = 0.025;
        l.shadow.radius = 2.5;
      }
      this.scene.add(l, l.target);
      this.lights.push(l);
      return l;
    };
    let envScene: Scene;
    if (tod === 'night') {
      this.sky = nightSky();
      this.scene.add(this.sky);
      this.scene.fog = new FogExp2(0x05070c, 0.0035);
      this.hemi.color.set(0x8fa2c4);
      this.hemi.groundColor.set(0x1c2a18);
      this.hemi.intensity = 0.55;
      const corners = [new Vector3(-55, 48, -30), new Vector3(55, 48, -30), new Vector3(-50, 50, 60), new Vector3(50, 50, 60)];
      corners.forEach((p, i) => mkLight(p, 0xf4f1ff, i < 2 ? 1.9 : 1.3, i < spec.nightShadows, spec.shadowMap));
      this.stadium.lightMat.color.setRGB(9, 9, 8.4);
      this.stadium.setCrowdLight(new Color(0.75, 0.75, 0.8));
      envScene = new Scene();
      const dome = nightSky();
      envScene.add(dome);
      const ring = new Mesh(new SphereGeometry(60, 32, 8, 0, Math.PI * 2, Math.PI * 0.18, 0.08), new MeshBasicMaterial({ color: new Color(14, 14, 13), side: BackSide }));
      envScene.add(ring);
      this.renderer.toneMappingExposure = 1.05;
    } else {
      const sky = new Sky();
      sky.scale.setScalar(3500);
      const u = sky.material.uniforms;
      const sunset = tod === 'sunset';
      u.turbidity.value = sunset ? 6 : 2.2;
      u.rayleigh.value = sunset ? 2.4 : 1.1;
      u.mieCoefficient.value = sunset ? 0.009 : 0.004;
      u.mieDirectionalG.value = 0.82;
      if (u.cloudCoverage) u.cloudCoverage.value = sunset ? 0.35 : 0.3;
      const elev = sunset ? 5.5 : 48;
      const azim = sunset ? -128 : -140;
      const sunDir = new Vector3().setFromSphericalCoords(1, MathUtils.degToRad(90 - elev), MathUtils.degToRad(azim));
      u.sunPosition.value.copy(sunDir);
      this.sky = sky;
      this.scene.add(sky);
      this.scene.fog = new FogExp2(sunset ? 0x8a6a58 : 0xb8c8dc, sunset ? 0.0016 : 0.0011);
      const sun = mkLight(sunDir.clone().multiplyScalar(120), sunset ? 0xffb27a : 0xfff4e0, sunset ? 2.4 : 3.3, true, spec.shadowMap);
      sun.target.position.set(0, 0, 6);
      if (sunset) mkLight(new Vector3(40, 45, -20), 0xe8eeff, 0.9, spec.nightShadows > 1, spec.shadowMap / 2);
      this.hemi.color.set(sunset ? 0xffc9a0 : 0xbcd4ff);
      this.hemi.groundColor.set(0x2c4a22);
      this.hemi.intensity = sunset ? 0.6 : 0.9;
      this.stadium.lightMat.color.setRGB(sunset ? 7 : 2.2, sunset ? 7 : 2.2, sunset ? 6.6 : 2.1);
      this.stadium.setCrowdLight(sunset ? new Color(0.85, 0.72, 0.62) : new Color(0.95, 0.95, 0.95));
      envScene = new Scene();
      const s2 = new Sky();
      s2.scale.setScalar(1000);
      Object.assign(s2.material.uniforms.sunPosition.value, sunDir);
      s2.material.uniforms.turbidity.value = u.turbidity.value;
      s2.material.uniforms.rayleigh.value = u.rayleigh.value;
      envScene.add(s2);
      this.renderer.toneMappingExposure = sunset ? 0.95 : 0.82;
    }
    const env = this.pmrem.fromScene(envScene, 0.02).texture;
    this.scene.environment = env;
    this.scene.environmentIntensity = tod === 'night' ? 0.55 : 0.75;
    this.pitch.setPalette(tod === 'night' ? 0x2c6a2c : 0x2f6a28, tod === 'night' ? 0x3b7d36 : 0x3e7b30);
  }

  /** Called every rendered frame. */
  updateBall(p: Vector3, q: { x: number; y: number; z: number; w: number }, v: Vector3, visible = true): void {
    this.ball.position.copy(p);
    this.ball.quaternion.set(q.x, q.y, q.z, q.w);
    this.ball.visible = visible;
    this.ballShadow.update(p.x, p.z, p.y - BALL.radius, 0.6);
    // Shutter motion blur: ghosts spread over a 1/120 s exposure.
    const sp = v.length();
    const n = this.ballGhosts.length;
    const show = visible && sp > 7;
    for (let i = 0; i < n; i++) {
      const g = this.ballGhosts[i];
      g.visible = show;
      if (!show) continue;
      const f = (i + 1) / (n + 1);
      g.position.copy(p).addScaledVector(v, -f / 120);
      g.quaternion.copy(this.ball.quaternion);
      (g.material as MeshPhysicalMaterial).opacity = (0.55 / n) * (1 - f * 0.6);
    }
  }

  flashScreen(amount: number): void {
    this.flash = Math.max(this.flash, amount);
  }

  render(dt: number, tension: number, pulse: number): void {
    this.time += dt;
    this.stadium.update(this.time, dt);
    this.pitch.update(this.time, this.ball.position);
    this.trail.update(this.camera);
    this.spray.update(dt);
    this.confetti.update(dt, this.time);
    this.hoops.update(dt, this.time);
    this.goal.net.refresh();
    this.flash *= Math.exp(-dt * 6);
    const g = this.grade.uniforms;
    g.uTime.value = this.time;
    g.uTension.value = tension;
    g.uPulse.value = pulse;
    g.uFlash.value = this.flash;
    if (this.bokeh) {
      this.bokeh.enabled = this.dofEnabled;
      const u = this.bokeh.uniforms as Record<string, { value: number }>;
      u.focus.value = this.dofFocus;
      u.aperture.value = 0.0018;
      u.maxblur.value = 0.007;
    }
    this.composer.render(dt);
  }

  dispose(): void {
    window.removeEventListener('resize', this.onResize);
    this.composer.dispose();
    this.renderer.dispose();
    this.pmrem.dispose();
    this.renderer.domElement.remove();
  }
}
