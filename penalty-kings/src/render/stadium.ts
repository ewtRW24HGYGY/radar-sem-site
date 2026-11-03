import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from 'three';
import { crowdAtlas, hash2, makeCanvasTexture, mulberry32 } from './textures';

/** Closed rounded-rectangle path around the pitch, sampled with outward normals. */
function bowlPath(halfX: number, z0: number, z1: number, radius: number, step: number): { p: Vector2; n: Vector2 }[] {
  const pts: { p: Vector2; n: Vector2 }[] = [];
  const cx = [halfX - radius, -(halfX - radius)];
  const corners = [
    { c: new Vector2(halfX - radius, z0 + radius), a0: -Math.PI / 2, a1: 0 },
    { c: new Vector2(halfX - radius, z1 - radius), a0: 0, a1: Math.PI / 2 },
    { c: new Vector2(-(halfX - radius), z1 - radius), a0: Math.PI / 2, a1: Math.PI },
    { c: new Vector2(-(halfX - radius), z0 + radius), a0: Math.PI, a1: (3 * Math.PI) / 2 },
  ];
  void cx;
  const straight = (a: Vector2, b: Vector2, n: Vector2) => {
    const len = a.distanceTo(b);
    const k = Math.max(1, Math.round(len / step));
    for (let i = 0; i < k; i++) pts.push({ p: a.clone().lerp(b, i / k), n: n.clone() });
  };
  const arc = (c: Vector2, a0: number, a1: number) => {
    const k = Math.max(4, Math.round((radius * (a1 - a0)) / (step * 0.6)));
    for (let i = 0; i < k; i++) {
      const a = a0 + ((a1 - a0) * i) / k;
      const n = new Vector2(Math.cos(a), Math.sin(a));
      pts.push({ p: c.clone().addScaledVector(n, radius), n });
    }
  };
  // Start behind the near goal (z0), go +x, up the right side, across the far end, down the left.
  straight(new Vector2(-(halfX - radius), z0), new Vector2(halfX - radius, z0), new Vector2(0, -1));
  arc(corners[0].c, corners[0].a0, corners[0].a1);
  straight(new Vector2(halfX, z0 + radius), new Vector2(halfX, z1 - radius), new Vector2(1, 0));
  arc(corners[1].c, corners[1].a0, corners[1].a1);
  straight(new Vector2(halfX - radius, z1), new Vector2(-(halfX - radius), z1), new Vector2(0, 1));
  arc(corners[2].c, corners[2].a0, corners[2].a1);
  straight(new Vector2(-halfX, z1 - radius), new Vector2(-halfX, z0 + radius), new Vector2(-1, 0));
  arc(corners[3].c, corners[3].a0, corners[3].a1);
  return pts;
}

interface TierSpec {
  startOut: number;
  startH: number;
  rows: number;
  depth: number;
  rise: number;
}

export interface CrowdSettings {
  count: number;
  homeColors: string[];
  awayColors: string[];
}

/** Crowd: instanced billboards animated on the GPU (sway, bounce, jump, arms up). */
export class Crowd {
  mesh: Mesh;
  material: ShaderMaterial;
  constructor(seats: { pos: Vector3; yaw: number; home: boolean }[], settings: CrowdSettings) {
    const geo = new InstancedBufferGeometry();
    const quad = new PlaneGeometry(0.56, 1.0);
    quad.translate(0, 0.5, 0);
    geo.index = quad.index;
    geo.attributes.position = quad.attributes.position;
    geo.attributes.uv = quad.attributes.uv;
    const n = Math.min(seats.length, settings.count);
    const step = seats.length / n;
    const off = new Float32Array(n * 3);
    const yaw = new Float32Array(n);
    const shirt = new Float32Array(n * 3);
    const skin = new Float32Array(n * 3);
    const hair = new Float32Array(n * 3);
    const misc = new Float32Array(n * 4);
    const skins = ['#f1c9a5', '#d9a77c', '#b57e55', '#8a5a3b', '#5e3b26', '#e8b896'].map((c) => new Color(c));
    const hairs = ['#1b1410', '#3a2618', '#6b4a2b', '#c9a35f', '#222', '#8a8a8a'].map((c) => new Color(c));
    const home = settings.homeColors.map((c) => new Color(c));
    const away = settings.awayColors.map((c) => new Color(c));
    const neutral = ['#2b2f38', '#f2f2f2', '#1e3a5c', '#5a5f66', '#7d2b2b'].map((c) => new Color(c));
    const rnd = mulberry32(7);
    for (let i = 0; i < n; i++) {
      const s = seats[Math.floor(i * step)];
      off[i * 3] = s.pos.x + (rnd() - 0.5) * 0.12;
      off[i * 3 + 1] = s.pos.y;
      off[i * 3 + 2] = s.pos.z + (rnd() - 0.5) * 0.12;
      yaw[i] = s.yaw;
      const pal = rnd() < 0.82 ? (s.home ? home : away) : neutral;
      const c = pal[Math.floor(rnd() * pal.length)].clone().multiplyScalar(0.75 + rnd() * 0.3);
      shirt.set([c.r, c.g, c.b], i * 3);
      const sk = skins[Math.floor(rnd() * skins.length)];
      skin.set([sk.r, sk.g, sk.b], i * 3);
      const h = hairs[Math.floor(rnd() * hairs.length)];
      hair.set([h.r, h.g, h.b], i * 3);
      misc.set([Math.floor(rnd() * 8), rnd() * 6.283, s.home ? 1 : 0, 0.92 + rnd() * 0.16], i * 4);
    }
    geo.setAttribute('aOffset', new InstancedBufferAttribute(off, 3));
    geo.setAttribute('aYaw', new InstancedBufferAttribute(yaw, 1));
    geo.setAttribute('aShirt', new InstancedBufferAttribute(shirt, 3));
    geo.setAttribute('aSkin', new InstancedBufferAttribute(skin, 3));
    geo.setAttribute('aHair', new InstancedBufferAttribute(hair, 3));
    geo.setAttribute('aMisc', new InstancedBufferAttribute(misc, 4));
    geo.instanceCount = n;
    this.material = new ShaderMaterial({
      uniforms: {
        uAtlas: { value: crowdAtlas() },
        uTime: { value: 0 },
        uExcite: { value: 0.3 },
        uHomeJump: { value: 0 },
        uAwayJump: { value: 0 },
        uLight: { value: new Color(1, 1, 1) },
        uFlash: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute vec3 aOffset; attribute float aYaw; attribute vec3 aShirt; attribute vec3 aSkin; attribute vec3 aHair; attribute vec4 aMisc;
        uniform float uTime; uniform float uExcite; uniform float uHomeJump; uniform float uAwayJump;
        varying vec2 vUv; varying vec3 vShirt; varying vec3 vSkin; varying vec3 vHair; varying float vShade; varying float vFlash;
        uniform float uFlash;
        void main() {
          float variant = aMisc.x; float phase = aMisc.y; float isHome = aMisc.z; float scale = aMisc.w;
          float jump = mix(uAwayJump, uHomeJump, isHome);
          float t = uTime;
          float bob = sin(t * (1.6 + 0.5 * fract(phase)) + phase) * 0.015 * (0.4 + uExcite);
          float hop = max(0.0, sin(t * 8.5 + phase * 3.0)) * 0.32 * jump;
          float armsUp = step(0.35, jump) * step(0.0, sin(t * 4.0 + phase));
          armsUp = max(armsUp, step(0.86, uExcite) * step(0.6, sin(t * 2.0 + phase)));
          vec3 p = position * scale;
          float c = cos(aYaw), s = sin(aYaw);
          vec3 w = vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c) + aOffset;
          w.y += bob + hop;
          w.x += sin(t * 1.3 + phase) * 0.02 * uExcite;
          vUv = vec2((variant + uv.x) / 8.0, (1.0 - armsUp + uv.y) * 0.5);
          vShirt = aShirt; vSkin = aSkin; vHair = aHair;
          vShade = 0.75 + 0.25 * clamp(aOffset.y / 20.0, 0.0, 1.0);
          vFlash = uFlash * step(0.985, fract(sin(dot(aOffset.xz, vec2(12.9898, 78.233)) + floor(t * 6.0)) * 43758.5453));
          gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uAtlas; uniform vec3 uLight;
        varying vec2 vUv; varying vec3 vShirt; varying vec3 vSkin; varying vec3 vHair; varying float vShade; varying float vFlash;
        void main() {
          vec4 t = texture2D(uAtlas, vUv);
          if (t.a < 0.5) discard;
          vec3 col = t.r * vShirt + max(t.g - t.r, 0.0) * vSkin + max(t.b - t.r, 0.0) * vHair;
          col *= uLight * vShade;
          col += vec3(vFlash * 3.0);
          gl_FragColor = vec4(col, 1.0);
          #include <colorspace_fragment>
        }`,
      side: DoubleSide,
    });
    this.mesh = new Mesh(geo, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.name = 'crowd';
  }
}

export interface StadiumOptions {
  crowd: number;
  homeColors: string[];
  awayColors: string[];
  detail: number;
}

const BRANDS = [
  { t: 'VOLTARA', bg: '#0c2340', fg: '#ffd23f' },
  { t: 'NORTEX ENERGIA', bg: '#e8edf2', fg: '#123' },
  { t: 'AURUM BANK', bg: '#1a1208', fg: '#e6b54a' },
  { t: 'KAIRO MOTORS', bg: '#b3001b', fg: '#fff' },
  { t: 'PIXELA TV', bg: '#3b1d6e', fg: '#9cf' },
  { t: 'MARÉ ALTA', bg: '#005f73', fg: '#e9d8a6' },
  { t: 'SERRA CAFÉ', bg: '#2d1e12', fg: '#f4e4c1' },
  { t: 'TRILHA AIR', bg: '#f7f7f7', fg: '#d62828' },
];

export class Stadium {
  group = new Group();
  crowd: Crowd;
  boardTex: CanvasTexture;
  ribbonTex: CanvasTexture;
  screens: { ctx: CanvasRenderingContext2D; tex: CanvasTexture; canvas: HTMLCanvasElement }[] = [];
  lightMat: MeshBasicMaterial;
  private flags: Mesh[] = [];
  private flagMat: ShaderMaterial;
  floodlightPositions: Vector3[] = [];

  constructor(opts: StadiumOptions) {
    const seats: { pos: Vector3; yaw: number; home: boolean }[] = [];
    // ----- stands (two tiers)
    const path = bowlPath(41, -9.5, 114.5, 16, 2.2);
    const tiers: TierSpec[] = [
      { startOut: 0, startH: 1.1, rows: 24, depth: 0.82, rise: 0.43 },
      { startOut: 22, startH: 13.5, rows: 20, depth: 0.88, rise: 0.56 },
    ];
    const pos: number[] = [];
    const col: number[] = [];
    const idx: number[] = [];
    const seatA = new Color('#25324a');
    const seatB = new Color('#b8202f');
    const seatC = new Color('#d8d8d8');
    const concrete = new Color('#6d6f73');
    const pushQuad = (a: Vector3, b: Vector3, c: Vector3, d: Vector3, color: Color) => {
      const base = pos.length / 3;
      for (const v of [a, b, c, d]) {
        pos.push(v.x, v.y, v.z);
        col.push(color.r, color.g, color.b);
      }
      idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
    };
    const P = (k: number, out: number, h: number) => {
      const e = path[(k + path.length) % path.length];
      return new Vector3(e.p.x + e.n.x * out, h, e.p.y + e.n.y * out);
    };
    const rnd = mulberry32(3);
    for (let ti = 0; ti < tiers.length; ti++) {
      const T = tiers[ti];
      for (let k = 0; k < path.length; k++) {
        const k2 = k + 1;
        // Fascia in front of the tier
        pushQuad(P(k, T.startOut, 0), P(k2, T.startOut, 0), P(k2, T.startOut, T.startH), P(k, T.startOut, T.startH), concrete);
        for (let r = 0; r < T.rows; r++) {
          const o0 = T.startOut + r * T.depth;
          const o1 = o0 + T.depth;
          const h0 = T.startH + r * T.rise;
          const h1 = h0 + T.rise;
          // tread
          const blockHome = path[k].n.y < -0.5 || (path[k].n.x !== 0 && path[k].p.y < 52);
          const aisle = k % 9 === 0;
          const sc = aisle ? concrete : (r + ti) % 7 === 0 ? seatC : blockHome ? seatB : seatA;
          pushQuad(P(k, o0, h0), P(k2, o0, h0), P(k2, o1, h0), P(k, o1, h0), sc);
          // riser
          pushQuad(P(k, o1, h0), P(k2, o1, h0), P(k2, o1, h1), P(k, o1, h1), concrete);
          if (!aisle) {
            const e = path[k];
            const e2 = path[(k + 1) % path.length];
            const len = e.p.distanceTo(e2.p);
            const nSeats = Math.max(1, Math.floor(len / 0.56));
            for (let si = 0; si < nSeats; si++) {
              if (hash2(k * 97 + si, r * 13 + ti * 101, 5) > 0.94) continue;
              const f = (si + 0.5) / nSeats;
              const p0 = P(k, o0 + T.depth * 0.45, h0);
              const p1 = P(k2, o0 + T.depth * 0.45, h0);
              const ps = p0.lerp(p1, f);
              const n = new Vector2().copy(e.n).lerp(e2.n, f);
              seats.push({ pos: ps, yaw: Math.atan2(-n.x, -n.y), home: blockHome });
            }
          }
        }
        // Back wall of the tier
        const oEnd = T.startOut + T.rows * T.depth;
        const hEnd = T.startH + T.rows * T.rise;
        pushQuad(P(k, oEnd, hEnd), P(k2, oEnd, hEnd), P(k2, oEnd, hEnd + 3), P(k, oEnd, hEnd + 3), concrete);
      }
      void rnd;
    }
    const sg = new BufferGeometry();
    sg.setAttribute('position', new Float32BufferAttribute(pos, 3));
    sg.setAttribute('color', new Float32BufferAttribute(col, 3));
    sg.setIndex(idx);
    sg.computeVertexNormals();
    const standMat = new MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0.05, side: DoubleSide });
    const stands = new Mesh(sg, standMat);
    stands.receiveShadow = true;
    stands.name = 'stands';
    this.group.add(stands);

    // ----- roof ring with floodlight strip
    const roofPos: number[] = [];
    const roofIdx: number[] = [];
    const outer = 22 + 20 * 0.88 + 6;
    const inner = -2;
    const hIn = 33;
    const hOut = 30;
    for (let k = 0; k <= path.length; k++) {
      const a = P(k, inner, hIn);
      const b = P(k, outer, hOut);
      roofPos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      if (k < path.length) {
        const i = k * 2;
        roofIdx.push(i, i + 2, i + 1, i + 1, i + 2, i + 3);
      }
    }
    const rg = new BufferGeometry();
    rg.setAttribute('position', new Float32BufferAttribute(roofPos, 3));
    rg.setIndex(roofIdx);
    rg.computeVertexNormals();
    const roof = new Mesh(rg, new MeshStandardMaterial({ color: 0x9aa3ad, roughness: 0.6, metalness: 0.4, side: DoubleSide }));
    roof.name = 'roof';
    this.group.add(roof);
    // Light fixtures (emissive) under the roof edge
    this.lightMat = new MeshBasicMaterial({ color: new Color(6, 6, 5.6) });
    const fixGeo = new PlaneGeometry(1.6, 0.7);
    for (let k = 0; k < path.length; k += 2) {
      const p = P(k, inner + 1.2, hIn - 0.6);
      const m = new Mesh(fixGeo, this.lightMat);
      m.position.copy(p);
      m.lookAt(0, 0, 52.5);
      this.group.add(m);
      if (k % 24 === 0) this.floodlightPositions.push(p.clone());
    }

    // ----- LED boards
    const { canvas: bc, ctx: bctx, tex: btex } = makeCanvasTexture(4096, 128);
    BRANDS.forEach((b, i) => {
      const w = 4096 / BRANDS.length;
      bctx.fillStyle = b.bg;
      bctx.fillRect(i * w, 0, w, 128);
      bctx.fillStyle = b.fg;
      bctx.font = '800 78px "Big Shoulders Display", Impact, sans-serif';
      bctx.textAlign = 'center';
      bctx.textBaseline = 'middle';
      bctx.fillText(b.t, i * w + w / 2, 68);
    });
    void bc;
    btex.wrapS = RepeatWrapping;
    btex.needsUpdate = true;
    this.boardTex = btex;
    const boardMat = new MeshStandardMaterial({ map: btex, emissiveMap: btex, emissive: new Color(1, 1, 1), emissiveIntensity: 1.25, roughness: 0.4 });
    const addBoard = (x0: number, z0: number, x1: number, z1: number, rep: number) => {
      const len = Math.hypot(x1 - x0, z1 - z0);
      const g = new PlaneGeometry(len, 0.9);
      const uv = g.attributes.uv;
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * rep);
      const m = new Mesh(g, boardMat);
      m.position.set((x0 + x1) / 2, 0.45, (z0 + z1) / 2);
      m.rotation.y = Math.atan2(-(z1 - z0), x1 - x0);
      m.castShadow = true;
      m.receiveShadow = true;
      this.group.add(m);
      const back = new Mesh(new PlaneGeometry(len, 0.9), new MeshStandardMaterial({ color: 0x15181d, roughness: 0.7 }));
      back.position.copy(m.position);
      back.rotation.y = m.rotation.y + Math.PI;
      back.position.addScaledVector(new Vector3(Math.sin(m.rotation.y), 0, Math.cos(m.rotation.y)), -0.05);
      this.group.add(back);
    };
    addBoard(-30, -5.2, 30, -5.2, 1.6);
    addBoard(-37, 2, -37, 50, 1.3);
    addBoard(37, 50, 37, 2, 1.3);

    // Ribbon board along the lower tier fascia
    const { ctx: rctx, tex: rtex } = makeCanvasTexture(2048, 64);
    for (let i = 0; i < 8; i++) {
      rctx.fillStyle = i % 2 ? '#0a0f1a' : '#111a2b';
      rctx.fillRect(i * 256, 0, 256, 64);
      rctx.fillStyle = i % 2 ? '#f2b636' : '#e8edf2';
      rctx.font = '700 40px "Big Shoulders Display", Impact, sans-serif';
      rctx.textAlign = 'center';
      rctx.textBaseline = 'middle';
      rctx.fillText(i % 2 ? 'PENALTY KINGS' : BRANDS[i].t, i * 256 + 128, 34);
    }
    rtex.wrapS = RepeatWrapping;
    rtex.needsUpdate = true;
    this.ribbonTex = rtex;
    const ribbonPos: number[] = [];
    const ribbonUv: number[] = [];
    const ribbonIdx: number[] = [];
    let u = 0;
    const T1 = tiers[1];
    const fo = T1.startOut - 0.4;
    for (let k = 0; k <= path.length; k++) {
      const a = P(k, fo, T1.startH - 1.3);
      const b = P(k, fo, T1.startH - 0.1);
      if (k > 0) u += path[k % path.length].p.distanceTo(path[k - 1].p) / 18;
      ribbonPos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      ribbonUv.push(u, 0, u, 1);
      if (k < path.length) {
        const i = k * 2;
        ribbonIdx.push(i, i + 2, i + 1, i + 1, i + 2, i + 3);
      }
    }
    const ribGeo = new BufferGeometry();
    ribGeo.setAttribute('position', new Float32BufferAttribute(ribbonPos, 3));
    ribGeo.setAttribute('uv', new Float32BufferAttribute(ribbonUv, 2));
    ribGeo.setIndex(ribbonIdx);
    const ribbon = new Mesh(ribGeo, new MeshBasicMaterial({ map: rtex, side: DoubleSide, color: new Color(1.6, 1.6, 1.6) }));
    this.group.add(ribbon);

    // ----- giant screens in the corners behind the goal
    for (const sx of [-1, 1]) {
      const { canvas, ctx, tex } = makeCanvasTexture(1024, 512);
      const screen = new Mesh(new PlaneGeometry(16, 8), new MeshBasicMaterial({ map: tex, color: new Color(1.5, 1.5, 1.5) }));
      screen.position.set(sx * 30, 25, -22);
      screen.lookAt(sx * 6, 4, 20);
      this.group.add(screen);
      const frame = new Mesh(new PlaneGeometry(16.8, 8.8), new MeshStandardMaterial({ color: 0x111111, roughness: 0.5 }));
      frame.position.copy(screen.position).addScaledVector(new Vector3(0, 0, -1).applyQuaternion(screen.quaternion), 0.05);
      frame.quaternion.copy(screen.quaternion);
      this.group.add(frame);
      this.screens.push({ canvas, ctx, tex });
    }

    // ----- tifo banner on the front of the lower tier behind the goal
    const { ctx: tctx, tex: ttex } = makeCanvasTexture(2048, 256);
    const grd = tctx.createLinearGradient(0, 0, 2048, 0);
    grd.addColorStop(0, opts.homeColors[0]);
    grd.addColorStop(0.5, opts.homeColors[1] ?? opts.homeColors[0]);
    grd.addColorStop(1, opts.homeColors[0]);
    tctx.fillStyle = grd;
    tctx.fillRect(0, 0, 2048, 256);
    tctx.fillStyle = '#fff';
    tctx.font = '800 150px "Big Shoulders Display", Impact, sans-serif';
    tctx.textAlign = 'center';
    tctx.textBaseline = 'middle';
    tctx.fillText('NINGUÉM PARA OS REIS', 1024, 135);
    ttex.needsUpdate = true;
    const tifo = new Mesh(new PlaneGeometry(36, 4.5), new MeshStandardMaterial({ map: ttex, roughness: 0.9, side: DoubleSide }));
    // Held by the fans across the lower tier behind the goal, lying on the rake.
    tifo.position.set(0, 1.1 + 10 * 0.43 + 1.25, -9.5 - 10 * 0.82);
    tifo.rotation.x = -1.09;
    this.group.add(tifo);

    // ----- waving flags in the stands
    this.flagMat = new ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uMap: { value: null } },
      vertexShader: /* glsl */ `
        uniform float uTime; varying vec2 vUv; varying float vShade;
        void main() {
          vUv = uv;
          vec3 p = position;
          float w = sin(uv.x * 6.0 - uTime * 4.0) * 0.18 * uv.x + sin(uv.x * 13.0 - uTime * 6.3) * 0.05 * uv.x;
          p.z += w;
          vShade = 0.85 + 0.6 * cos(uv.x * 6.0 - uTime * 4.0) * 0.2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap; varying vec2 vUv; varying float vShade;
        void main() { vec4 c = texture2D(uMap, vUv); gl_FragColor = vec4(c.rgb * vShade, 1.0);
          #include <colorspace_fragment>
        }`,
      side: DoubleSide,
    });
    const { ctx: fctx, tex: ftex } = makeCanvasTexture(256, 128);
    fctx.fillStyle = opts.homeColors[0];
    fctx.fillRect(0, 0, 256, 128);
    fctx.fillStyle = opts.homeColors[1] ?? '#fff';
    fctx.fillRect(0, 42, 256, 44);
    ftex.needsUpdate = true;
    this.flagMat.uniforms.uMap.value = ftex;
    const flagGeo = new PlaneGeometry(3, 1.8, 16, 4);
    flagGeo.translate(1.5, 0, 0);
    const fr = mulberry32(11);
    for (let i = 0; i < 18; i++) {
      const k = Math.floor(fr() * path.length);
      const r = 4 + Math.floor(fr() * 16);
      const e = path[k];
      const p = P(k, r * 0.82, 1.1 + r * 0.43 + 2.2);
      const m = new Mesh(flagGeo, this.flagMat);
      m.position.copy(p);
      m.rotation.y = Math.atan2(-e.n.x, -e.n.y) + Math.PI / 2;
      this.flags.push(m);
      this.group.add(m);
    }

    // Floor around the pitch (beyond the boards: track/concrete)
    const apron = new Mesh(new PlaneGeometry(300, 320), new MeshStandardMaterial({ color: 0x2a3a26, roughness: 1 }));
    apron.rotation.x = -Math.PI / 2;
    apron.position.set(0, -0.02, 52.5);
    apron.receiveShadow = true;
    this.group.add(apron);

    this.crowd = new Crowd(seats, { count: opts.crowd, homeColors: opts.homeColors, awayColors: opts.awayColors });
    this.group.add(this.crowd.mesh);
    void AdditiveBlending;
    void SRGBColorSpace;
    void opts.detail;
  }

  update(time: number, dt: number): void {
    this.boardTex.offset.x = (time * 0.035) % 1;
    this.ribbonTex.offset.x = -(time * 0.02) % 1;
    this.crowd.material.uniforms.uTime.value = time;
    this.flagMat.uniforms.uTime.value = time;
    void dt;
  }

  /** Draws the giant screens. */
  drawScreens(lines: { title: string; sub: string; score?: string }): void {
    for (const s of this.screens) {
      const g = s.ctx;
      const W = s.canvas.width;
      const H = s.canvas.height;
      const grd = g.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, '#0b1424');
      grd.addColorStop(1, '#04070d');
      g.fillStyle = grd;
      g.fillRect(0, 0, W, H);
      g.fillStyle = '#f2b636';
      g.fillRect(0, H - 16, W, 16);
      g.textAlign = 'center';
      g.fillStyle = '#fff';
      g.font = '800 150px "Big Shoulders Display", Impact, sans-serif';
      g.fillText(lines.title, W / 2, H * 0.42);
      g.font = '600 64px "Big Shoulders Display", Impact, sans-serif';
      g.fillStyle = '#c9d4e3';
      g.fillText(lines.sub, W / 2, H * 0.66);
      if (lines.score) {
        g.font = '800 96px "Big Shoulders Display", Impact, sans-serif';
        g.fillStyle = '#f2b636';
        g.fillText(lines.score, W / 2, H * 0.9);
      }
      s.tex.needsUpdate = true;
    }
  }

  setCrowdLight(c: Color): void {
    (this.crowd.material.uniforms.uLight.value as Color).copy(c);
  }
}
