import {
  Color,
  DoubleSide,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Vector2,
  Vector3,
} from 'three';
import { grassNoise, grassNormal } from './textures';

/**
 * Turf colour + painted markings, analytic in world space (resolution independent).
 * Mow stripes run parallel to the goal line; wear patches around the spot and the
 * six-yard box; lines are anti-aliased SDFs of the Laws of the Game markings.
 */
export const TURF_GLSL = /* glsl */ `
uniform sampler2D uGrassNoise;
uniform vec3 uGrassA;
uniform vec3 uGrassB;
uniform float uWear;
varying vec3 vTurfWorld;

float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}
float endMarkings(vec2 p) {
  // p.x lateral, p.y distance from that end's goal line (>= 0 on the field)
  float d = 1e4;
  d = min(d, segDist(p, vec2(-34.0, 0.0), vec2(34.0, 0.0)));
  d = min(d, segDist(p, vec2(-20.16, 0.0), vec2(-20.16, 16.5)));
  d = min(d, segDist(p, vec2(20.16, 0.0), vec2(20.16, 16.5)));
  d = min(d, segDist(p, vec2(-20.16, 16.5), vec2(20.16, 16.5)));
  d = min(d, segDist(p, vec2(-9.16, 0.0), vec2(-9.16, 5.5)));
  d = min(d, segDist(p, vec2(9.16, 0.0), vec2(9.16, 5.5)));
  d = min(d, segDist(p, vec2(-9.16, 5.5), vec2(9.16, 5.5)));
  float arc = abs(length(p - vec2(0.0, 11.0)) - 9.15);
  if (p.y > 16.5) d = min(d, arc);
  // corner arcs
  d = min(d, max(abs(length(p - vec2(-34.0, 0.0)) - 1.0), -min(p.y, 34.0 + p.x) ));
  d = min(d, max(abs(length(p - vec2(34.0, 0.0)) - 1.0), -min(p.y, 34.0 - p.x) ));
  return d;
}
float pitchLineMask(vec3 w) {
  vec2 p = vec2(w.x, w.z);
  float d = 1e4;
  if (p.y > -0.5 && p.y < 105.5 && abs(p.x) < 34.5) {
    d = min(d, endMarkings(p));
    d = min(d, endMarkings(vec2(p.x, 105.0 - p.y)));
    d = min(d, abs(abs(p.x) - 34.0) + max(0.0, max(-p.y, p.y - 105.0)));
    d = min(d, abs(p.y - 52.5) + max(0.0, abs(p.x) - 34.0));
    d = min(d, abs(length(p - vec2(0.0, 52.5)) - 9.15));
  }
  float hw = 0.06;
  float spot = length(p - vec2(0.0, 11.0)) - 0.11;
  float spot2 = length(p - vec2(0.0, 94.0)) - 0.11;
  float cs = length(p - vec2(0.0, 52.5)) - 0.15;
  float aa = max(fwidth(d), 0.002) * 0.8;
  float m = 1.0 - smoothstep(hw - aa, hw + aa, d);
  float s = min(min(spot, spot2), cs);
  m = max(m, 1.0 - smoothstep(-aa, aa, s));
  return m;
}
vec3 turfColor(vec3 w, out float lineM) {
  vec2 p = w.xz;
  // Mow stripes: 5.5 m bands parallel to the goal line, slightly sheared highlights.
  float band = mod(floor((p.y + 0.0) / 5.5), 2.0);
  float edge = abs(fract(p.y / 5.5) - 0.5);
  vec3 base = mix(uGrassA, uGrassB, band);
  base = mix(base, (uGrassA + uGrassB) * 0.5, smoothstep(0.5, 0.47, edge) * 0.0);
  vec4 nFine = texture2D(uGrassNoise, p / 0.45);
  vec4 nMid = texture2D(uGrassNoise, p / 3.7 + 0.13);
  vec4 nMac = texture2D(uGrassNoise, p / 31.0 + 0.71);
  float v = (nFine.r - 0.5) * 0.18 + (nMid.g - 0.5) * 0.22 + (nMac.b - 0.5) * 0.28;
  vec3 col = base * (1.0 + v);
  // Hue drift towards yellow/blue greens
  col = mix(col, col * vec3(1.08, 1.02, 0.82), clamp(nMac.g - 0.45, 0.0, 1.0) * 0.6);
  // Wear: penalty spot, six-yard box front, keeper's line.
  float wearSpot = exp(-pow(length(p - vec2(0.0, 11.3)) / 0.9, 2.0));
  float wearRun = exp(-pow(length((p - vec2(-1.2, 13.0)) * vec2(1.0, 0.6)) / 1.4, 2.0)) * 0.6;
  float wearKeeper = exp(-pow(p.y / 0.9, 2.0)) * exp(-pow(p.x / 2.6, 2.0));
  float wear = clamp((wearSpot + wearRun + wearKeeper) * uWear * (0.6 + 0.8 * nMid.r), 0.0, 1.0);
  col = mix(col, vec3(0.30, 0.27, 0.17), wear * 0.55);
  lineM = pitchLineMask(w);
  col = mix(col, vec3(0.92, 0.93, 0.9) * (0.92 + 0.08 * nFine.r), lineM * 0.95);
  return col;
}
`;

export interface TurfOptions {
  shells: number;
}

function patchTurf(mat: MeshStandardMaterial, uniforms: Record<string, { value: unknown }>, shell: boolean): void {
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, uniforms);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vTurfWorld;\n' + (shell ? 'varying float vLayer;\nuniform float uShellH;\n' : ''))
      .replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
        vec4 tw = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          tw = instanceMatrix * tw;
        #endif
        tw = modelMatrix * tw;
        vTurfWorld = tw.xyz;
        ${shell ? 'vLayer = clamp(tw.y / uShellH, 0.0, 1.0);' : ''}`,
      );
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\n' + TURF_GLSL + (shell ? 'varying float vLayer;\nuniform float uTime;\nuniform vec3 uBall;\n' : ''))
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        float lineM;
        vec3 turf = turfColor(vTurfWorld, lineM);
        diffuseColor.rgb = turf;
        ${
          shell
            ? `
        // Shell grass: each layer keeps only blades taller than its height.
        vec2 wp = vTurfWorld.xz;
        vec2 sway = vec2(sin(uTime * 1.3 + wp.y * 0.7), cos(uTime * 1.1 + wp.x * 0.5)) * 0.004 * vLayer * vLayer;
        vec4 bl = texture2D(uGrassNoise, (wp + sway) / 0.09);
        vec4 cl = texture2D(uGrassNoise, wp / 1.7);
        float height = bl.a * (0.75 + 0.5 * cl.g);
        // Blades are pressed down under the ball.
        float dBall = length(wp - uBall.xz);
        height *= mix(0.25, 1.0, smoothstep(0.06, 0.16, dBall + max(0.0, uBall.y - 0.12) * 3.0));
        if (height < vLayer) discard;
        diffuseColor.rgb *= mix(0.55, 1.12, vLayer);
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.06, 1.08, 0.86), vLayer * 0.5);
        `
            : `
        diffuseColor.rgb *= 0.86;
        `
        }`,
      );
  };
}

export class Pitch {
  group = new Group();
  shells: InstancedMesh | null = null;
  private uniforms = {
    uGrassNoise: { value: grassNoise() },
    uGrassA: { value: new Color(0x2e6a2a) },
    uGrassB: { value: new Color(0x3d7c33) },
    uWear: { value: 1.0 },
    uShellH: { value: 0.032 },
    uTime: { value: 0 },
    uBall: { value: new Vector3(0, 0.11, 11) },
  };

  constructor(opts: TurfOptions) {
    const nrm = grassNormal();
    const mat = new MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.93,
      metalness: 0,
      normalMap: nrm,
      normalScale: new Vector2(0.55, 0.55),
    });
    nrm.repeat.set(1, 1);
    patchTurf(mat, this.uniforms, false);
    // Normal map in world space tiling: scale UVs via the geometry.
    const geo = new PlaneGeometry(220, 280, 1, 1);
    const uv = geo.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 220 / 0.6, uv.getY(i) * 280 / 0.6);
    const ground = new Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, 0, 52.5);
    ground.receiveShadow = true;
    ground.name = 'turf';
    this.group.add(ground);

    if (opts.shells > 0) {
      const sgeo = new PlaneGeometry(44, 40, 1, 1);
      sgeo.rotateX(-Math.PI / 2);
      sgeo.translate(0, 0, 14);
      const smat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0, side: DoubleSide });
      patchTurf(smat, this.uniforms, true);
      const n = opts.shells;
      const inst = new InstancedMesh(sgeo, smat, n);
      const m = new Matrix4();
      for (let i = 0; i < n; i++) {
        m.makeTranslation(0, ((i + 1) / n) * this.uniforms.uShellH.value, 0);
        inst.setMatrixAt(i, m);
      }
      inst.receiveShadow = true;
      inst.castShadow = false;
      inst.frustumCulled = false;
      inst.renderOrder = 1;
      this.shells = inst;
      this.group.add(inst);
    }
  }

  update(time: number, ball: { x: number; y: number; z: number }): void {
    this.uniforms.uTime.value = time;
    this.uniforms.uBall.value.set(ball.x, ball.y, ball.z);
  }

  setPalette(a: number, b: number): void {
    this.uniforms.uGrassA.value.set(a);
    this.uniforms.uGrassB.value.set(b);
  }
}
