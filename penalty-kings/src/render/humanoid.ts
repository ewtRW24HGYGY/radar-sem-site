import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
  Vector2,
} from 'three';
import { BoneName, Rig } from '../characters/rig';
import { KitColors, faceTexture, jerseyTexture } from './textures';

/**
 * Builds a ring-swept body segment. Rings run along the bone (−Y for limbs, +Y for
 * the trunk); each ring is an ellipse (rx lateral, rz front/back) with a z offset.
 * The ends are rounded so joints read continuously when segments rotate.
 */
function segment(
  len: number,
  profile: (t: number) => [number, number, number],
  opts: { dir?: 1 | -1; t0?: number; t1?: number; capStart?: boolean; capEnd?: boolean; radial?: number; rings?: number } = {},
): BufferGeometry {
  const dir = opts.dir ?? -1;
  const t0 = opts.t0 ?? 0;
  const t1 = opts.t1 ?? 1;
  const N = opts.radial ?? 20;
  const M = opts.rings ?? 14;
  const ts: number[] = [];
  const capRings = 5;
  const [r0x, r0z] = profile(t0);
  const [r1x, r1z] = profile(t1);
  const capLen0 = Math.min(r0x, r0z) / len;
  const capLen1 = Math.min(r1x, r1z) / len;
  if (opts.capStart) for (let k = capRings; k >= 1; k--) ts.push(-k);
  for (let j = 0; j <= M; j++) ts.push(t0 + ((t1 - t0) * j) / M);
  if (opts.capEnd) for (let k = 1; k <= capRings; k++) ts.push(100 + k);
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let r = 0; r < ts.length; r++) {
    const code = ts[r];
    let t: number;
    let scale = 1;
    if (code < 0) {
      const k = -code / capRings; // 1 → tip
      t = t0 - capLen0 * Math.sin((k * Math.PI) / 2) * 0.9;
      scale = Math.cos((k * Math.PI) / 2) * 0.98 + 0.02;
    } else if (code > 50) {
      const k = (code - 100) / capRings;
      t = t1 + capLen1 * Math.sin((k * Math.PI) / 2) * 0.9;
      scale = Math.cos((k * Math.PI) / 2) * 0.98 + 0.02;
    } else t = code;
    const tc = Math.max(t0, Math.min(t1, t));
    const [rx, rz, zo] = profile(tc);
    for (let i = 0; i <= N; i++) {
      const phi = (i / N) * Math.PI * 2;
      pos.push(Math.sin(phi) * rx * scale, dir * t * len, Math.cos(phi) * rz * scale + zo);
      uv.push(i / N, (tc - t0) / Math.max(1e-6, t1 - t0));
    }
  }
  for (let r = 0; r < ts.length - 1; r++) {
    for (let i = 0; i < N; i++) {
      const a = r * (N + 1) + i;
      const b = a + N + 1;
      if (dir < 0) idx.push(a, a + 1, b, a + 1, b + 1, b);
      else idx.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Maps a segment's v range onto [v0, v1] of a shared texture. */
function remapV(g: BufferGeometry, v0: number, v1: number): void {
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setY(i, v0 + (v1 - v0) * uv.getY(i));
  uv.needsUpdate = true;
}

/** Smooth bump for muscle bellies. */
const bump = (t: number, c: number, w: number) => Math.exp(-((t - c) * (t - c)) / (w * w));

export interface Appearance {
  kit: KitColors;
  number: number;
  name: string;
  skin: string;
  hair: string;
  hairStyle: 'short' | 'buzz' | 'long' | 'bald' | 'curly';
  boots: string;
  keeper: boolean;
  gloves?: string;
  seed: number;
}

interface MatSet {
  jersey: Material;
  sleeve: Material;
  shorts: Material;
  socks: Material;
  skin: Material;
  face: Material;
  hair: Material;
  boots: Material;
  sole: Material;
  gloves: Material;
}

function fabric(color: string, map?: THREE_Texture): MeshPhysicalMaterial {
  return new MeshPhysicalMaterial({
    color: new Color(color),
    map: map ?? null,
    roughness: 0.78,
    metalness: 0,
    sheen: 0.6,
    sheenRoughness: 0.5,
    sheenColor: new Color(color).lerp(new Color('#ffffff'), 0.4),
  });
}
type THREE_Texture = import('three').Texture;

function materials(a: Appearance): MatSet {
  const jt = jerseyTexture(a.kit, a.number, a.name);
  const jersey = fabric('#ffffff', jt);
  const skinMat = new MeshPhysicalMaterial({
    color: new Color(a.skin),
    roughness: 0.52,
    metalness: 0,
    sheen: 0.25,
    sheenColor: new Color(a.skin).lerp(new Color('#ff9a7a'), 0.4),
    sheenRoughness: 0.6,
  });
  const faceMat = new MeshPhysicalMaterial({
    map: faceTexture(a.skin, a.hair, a.seed),
    roughness: 0.5,
    sheen: 0.25,
    sheenColor: new Color(a.skin).lerp(new Color('#ff9a7a'), 0.4),
  });
  return {
    jersey,
    sleeve: fabric(a.kit.primary),
    shorts: fabric(a.kit.shorts),
    socks: fabric(a.kit.socks),
    skin: skinMat,
    face: faceMat,
    hair: new MeshStandardMaterial({ color: new Color(a.hair), roughness: 0.85 }),
    boots: new MeshPhysicalMaterial({ color: new Color(a.boots), roughness: 0.28, metalness: 0.05, clearcoat: 0.8, clearcoatRoughness: 0.2 }),
    sole: new MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 }),
    gloves: new MeshPhysicalMaterial({ color: new Color(a.gloves ?? '#e9f542'), roughness: 0.6, sheen: 0.3, sheenColor: new Color('#ffffff') }),
  };
}

function add(bone: Object3D, geo: BufferGeometry, mat: Material, name = ''): Mesh {
  const m = new Mesh(geo, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  m.name = name;
  bone.add(m);
  return m;
}

/** Attaches a full athlete body to the rig bones. */
export function buildHumanoid(rig: Rig, a: Appearance): Mesh[] {
  const P = rig.prop;
  const b = rig.bones;
  const M = materials(a);
  const s = rig.dims.height / 1.83;
  const g = rig.dims.build;
  const meshes: Mesh[] = [];
  const put = (bone: BoneName, geo: BufferGeometry, mat: Material, name = '') => meshes.push(add(b[bone], geo, mat, name));

  // Pelvis / shorts
  put('hips', segment(0.2 * s, (t) => [(0.155 + 0.02 * bump(t, 0.6, 0.3)) * s * g, (0.105 + 0.015 * bump(t, 0.5, 0.3)) * s * g, -0.004], { dir: -1, t0: -0.45, t1: 0.75, capEnd: true, radial: 24 }), M.shorts);
  // Abdomen
  const abdomen = segment(P.spine + 0.03 * s, (t) => [(0.148 + 0.006 * t) * s * g, (0.098 + 0.004 * t) * s * g, 0.004], { dir: 1, t0: -0.35, t1: 1.05, radial: 24 });
  remapV(abdomen, 0, 0.2);
  put('spine', abdomen, M.jersey);
  // Chest: wide at the lats, rounding into the shoulders.
  put(
    'chest',
    segment(
      0.24 * s,
      (t) => {
        const rx = (0.152 + 0.04 * Math.sin(Math.min(1, t * 1.2) * Math.PI * 0.75) - 0.06 * Math.pow(Math.max(0, t - 0.82) / 0.18, 2)) * s * g;
        const rz = (0.102 + 0.022 * bump(t, 0.5, 0.35) - 0.035 * Math.pow(Math.max(0, t - 0.85) / 0.15, 2)) * s * g;
        return [rx, rz, 0.008 * bump(t, 0.55, 0.3)];
      },
      { dir: 1, t0: -0.05, t1: 1.0, capEnd: true, radial: 28, rings: 18 },
    ),
    M.jersey,
    'chest',
  );
  remapV(meshes[meshes.length - 1].geometry, 0.2, 1);
  // Trapezius/shoulder caps
  for (const side of ['L', 'R'] as const) {
    const sx = side === 'L' ? 1 : -1;
    const cap = new Mesh(new SphereGeometry(0.056 * s * g, 18, 12), a.keeper ? M.sleeve : M.sleeve);
    cap.position.set(sx * (P.shoulderX - 0.03 * s), P.shoulderY - 0.035 * s, -0.005);
    cap.scale.set(1.05, 0.9, 1);
    cap.castShadow = true;
    b.chest.add(cap);
    meshes.push(cap);
  }
  // Neck
  put('neck', segment(0.12 * s, (t) => [(0.056 - 0.006 * t) * s, (0.058 - 0.006 * t) * s, 0.005], { dir: 1, t0: -0.2, t1: 1, radial: 16 }), M.skin);
  // Head
  const head = new Mesh(new SphereGeometry(1, 32, 24), M.face);
  head.scale.set(0.083 * s, 0.112 * s, 0.098 * s);
  head.position.set(0, 0.085 * s, 0.012 * s);
  head.rotation.y = Math.PI / 2; // face texture u=0 → +Z
  head.castShadow = true;
  b.head.add(head);
  meshes.push(head);
  const jaw = new Mesh(new SphereGeometry(1, 20, 14), M.skin);
  jaw.scale.set(0.07 * s, 0.06 * s, 0.075 * s);
  jaw.position.set(0, 0.035 * s, 0.03 * s);
  jaw.castShadow = true;
  b.head.add(jaw);
  meshes.push(jaw);
  const nose = new Mesh(new SphereGeometry(1, 10, 8), M.skin);
  nose.scale.set(0.014 * s, 0.022 * s, 0.018 * s);
  nose.position.set(0, 0.08 * s, 0.108 * s);
  b.head.add(nose);
  for (const sx of [-1, 1]) {
    const ear = new Mesh(new SphereGeometry(1, 10, 8), M.skin);
    ear.scale.set(0.012 * s, 0.03 * s, 0.022 * s);
    ear.position.set(sx * 0.084 * s, 0.085 * s, 0.0);
    b.head.add(ear);
  }
  if (a.hairStyle !== 'bald') {
    const hs = a.hairStyle;
    const hair = new Mesh(new SphereGeometry(1, 28, 16, 0, Math.PI * 2, 0, hs === 'long' ? Math.PI * 0.62 : Math.PI * 0.5), M.hair);
    const puff = hs === 'curly' ? 1.14 : hs === 'buzz' ? 1.02 : 1.07;
    hair.scale.set(0.088 * s * puff, 0.118 * s * puff, 0.104 * s * puff);
    hair.position.set(0, 0.092 * s, 0.0);
    hair.rotation.x = -0.25;
    hair.castShadow = true;
    b.head.add(hair);
    meshes.push(hair);
  }
  // Arms
  for (const side of ['L', 'R'] as const) {
    const ua = `upperArm${side}` as BoneName;
    const fa = `foreArm${side}` as BoneName;
    const hd = `hand${side}` as BoneName;
    const upper = (t: number): [number, number, number] => [
      (0.05 - 0.012 * t + 0.008 * bump(t, 0.35, 0.25)) * s * g,
      (0.05 - 0.01 * t + 0.01 * bump(t, 0.4, 0.25)) * s * g,
      0,
    ];
    const sleeveEnd = a.keeper ? 1 : 0.5;
    put(ua, segment(P.upperArm, upper, { t0: -0.05, t1: sleeveEnd, capStart: true, radial: 16, capEnd: sleeveEnd === 1 }), M.sleeve);
    if (sleeveEnd < 1) put(ua, segment(P.upperArm, upper, { t0: sleeveEnd, t1: 1, capEnd: true, radial: 16 }), M.skin);
    const fore = (t: number): [number, number, number] => [
      (0.041 - 0.012 * t + 0.006 * bump(t, 0.25, 0.2)) * s * g,
      (0.037 - 0.012 * t + 0.008 * bump(t, 0.25, 0.2)) * s * g,
      0,
    ];
    put(fa, segment(P.foreArm, fore, { t0: 0, t1: 1, capStart: true, capEnd: true, radial: 14 }), a.keeper ? M.sleeve : M.skin);
    // Hand / glove: flattened paddle.
    const gl = a.keeper ? 1.35 : 1;
    const hand = segment(
      0.17 * s * gl,
      (t) => [(0.043 + 0.008 * bump(t, 0.45, 0.3)) * s * gl, (0.02 + 0.004 * bump(t, 0.3, 0.3)) * s * gl, 0.006],
      { t0: 0, t1: 1, capStart: true, capEnd: true, radial: 12 },
    );
    put(hd, hand, a.keeper ? M.gloves : M.skin);
  }
  // Legs
  for (const side of ['L', 'R'] as const) {
    const th = `thigh${side}` as BoneName;
    const sh = `shin${side}` as BoneName;
    const ft = `foot${side}` as BoneName;
    const thigh = (t: number): [number, number, number] => [
      (0.083 - 0.028 * t + 0.01 * bump(t, 0.3, 0.25)) * s * g,
      (0.085 - 0.03 * t + 0.012 * bump(t, 0.25, 0.25)) * s * g,
      0.006 * bump(t, 0.3, 0.3),
    ];
    const shortsEnd = a.keeper ? 0.45 : 0.36;
    put(th, segment(P.thigh, (t) => { const r = thigh(t); return [r[0] * 1.08, r[1] * 1.08, r[2]]; }, { t0: -0.08, t1: shortsEnd, radial: 18, capStart: true }), M.shorts);
    put(th, segment(P.thigh, thigh, { t0: shortsEnd, t1: 1, capEnd: true, radial: 18 }), M.skin);
    const shin = (t: number): [number, number, number] => [
      (0.05 - 0.016 * t + 0.008 * bump(t, 0.3, 0.2)) * s * g,
      (0.052 - 0.02 * t + 0.014 * bump(t, 0.28, 0.18)) * s * g,
      -0.012 * bump(t, 0.3, 0.2) * s,
    ];
    put(sh, segment(P.shin, shin, { t0: 0, t1: 1, capStart: true, capEnd: true, radial: 16 }), M.socks);
    // Boot: swept along +Z from heel to toe.
    const boot = segment(
      0.27 * s,
      (t) => [(0.043 + 0.008 * bump(t, 0.6, 0.3) - 0.02 * Math.pow(Math.max(0, t - 0.8) / 0.2, 2)) * s, (0.034 + 0.01 * bump(t, 0.2, 0.25) - 0.016 * t) * s, 0],
      { t0: 0, t1: 1, capStart: true, capEnd: true, radial: 16, dir: 1 },
    );
    boot.rotateX(Math.PI / 2);
    boot.translate(0, -P.ankleH * 0.55, -0.06 * s);
    put(ft, boot, M.boots);
    const sole = segment(0.27 * s, (t) => [(0.044 + 0.006 * bump(t, 0.6, 0.3) - 0.02 * Math.pow(Math.max(0, t - 0.85) / 0.15, 2)) * s, 0.008 * s, 0], { t0: 0, t1: 1, capStart: true, capEnd: true, radial: 12, dir: 1 });
    sole.rotateX(Math.PI / 2);
    sole.translate(0, -P.ankleH * 0.55 - 0.03 * s, -0.06 * s);
    put(ft, sole, M.sole);
  }
  void Vector2;
  return meshes;
}
