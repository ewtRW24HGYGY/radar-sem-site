import {
  CanvasTexture,
  ClampToEdgeWrapping,
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  RepeatWrapping,
  RGBAFormat,
  SRGBColorSpace,
  Texture,
  UnsignedByteType,
} from 'three';

/** Deterministic hash → [0,1). */
export function hash2(x: number, y: number, seed = 0): number {
  let h = (x * 374761393 + y * 668265263 + seed * 982451653) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Tileable value noise sampled on a periodic lattice. */
function tileNoise(x: number, y: number, period: number, seed: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const w = (a: number) => ((a % period) + period) % period;
  const a = hash2(w(xi), w(yi), seed);
  const b = hash2(w(xi + 1), w(yi), seed);
  const c = hash2(w(xi), w(yi + 1), seed);
  const d = hash2(w(xi + 1), w(yi + 1), seed);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number, period: number, seed: number, oct = 4): number {
  let s = 0;
  let amp = 0.5;
  let f = 1;
  let norm = 0;
  for (let i = 0; i < oct; i++) {
    s += amp * tileNoise(x * f, y * f, period * f, seed + i * 17);
    norm += amp;
    amp *= 0.5;
    f *= 2;
  }
  return s / norm;
}

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

const cache = new Map<string, Texture>();
function cached<T extends Texture>(key: string, make: () => T): T {
  const hit = cache.get(key);
  if (hit) return hit as T;
  const t = make();
  cache.set(key, t);
  return t;
}

/**
 * Grass detail: R = fine blades, G = clumps, B = macro patches, A = blade mask for shells.
 */
export function grassNoise(size = 512): DataTexture {
  return cached('grassNoise' + size, () => {
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const fine = hash2(x, y, 3);
        const clump = fbm((x / size) * 32, (y / size) * 32, 32, 5, 3);
        const macro = fbm((x / size) * 4, (y / size) * 4, 4, 9, 4);
        // Blade mask: cellular-ish spikes, elongated in v.
        const blade = Math.pow(hash2(x >> 1, y >> 2, 11), 0.65) * (0.6 + 0.4 * clump);
        data[i] = fine * 255;
        data[i + 1] = clump * 255;
        data[i + 2] = macro * 255;
        data[i + 3] = blade * 255;
      }
    }
    const t = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
    t.wrapS = t.wrapT = RepeatWrapping;
    t.magFilter = LinearFilter;
    t.minFilter = LinearMipmapLinearFilter;
    t.generateMipmaps = true;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  });
}

/** Tangent-space normal map for turf (derived from the noise height). */
export function grassNormal(size = 512): DataTexture {
  return cached('grassNormal' + size, () => {
    const h = new Float32Array(size * size);
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        h[y * size + x] = 0.6 * hash2(x, y, 21) + 0.4 * fbm((x / size) * 64, (y / size) * 64, 64, 23, 2);
      }
    const data = new Uint8Array(size * size * 4);
    const at = (x: number, y: number) => h[((y + size) % size) * size + ((x + size) % size)];
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        const dx = (at(x + 1, y) - at(x - 1, y)) * 2.2;
        const dy = (at(x, y + 1) - at(x, y - 1)) * 2.2;
        const nz = 1;
        const l = Math.hypot(dx, dy, nz);
        const i = (y * size + x) * 4;
        data[i] = ((-dx / l) * 0.5 + 0.5) * 255;
        data[i + 1] = ((-dy / l) * 0.5 + 0.5) * 255;
        data[i + 2] = (nz / l) * 0.5 * 255 + 127;
        data[i + 3] = 255;
      }
    const t = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
    t.wrapS = t.wrapT = RepeatWrapping;
    t.minFilter = LinearMipmapLinearFilter;
    t.magFilter = LinearFilter;
    t.generateMipmaps = true;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  });
}

/** Knotted net mesh (square knots, ~12 cm cells): white cords on transparent. */
export function netTexture(): CanvasTexture {
  return cached('net', () => {
    const [c, g] = canvas(256, 256);
    g.clearRect(0, 0, 256, 256);
    g.strokeStyle = '#ffffff';
    g.lineCap = 'round';
    const cells = 2;
    const s = 256 / cells;
    // Hexagonal-ish diamond mesh
    g.lineWidth = 9;
    for (let i = -1; i <= cells; i++) {
      for (let j = -1; j <= cells; j++) {
        const cx = i * s + s / 2;
        const cy = j * s + s / 2;
        g.beginPath();
        g.moveTo(cx, cy - s / 2);
        g.lineTo(cx + s / 2, cy);
        g.lineTo(cx, cy + s / 2);
        g.lineTo(cx - s / 2, cy);
        g.closePath();
        g.stroke();
      }
    }
    // Knots
    g.fillStyle = '#ffffff';
    for (let i = 0; i <= cells; i++)
      for (let j = 0; j <= cells; j++) {
        for (const [ox, oy] of [[0, s / 2], [s / 2, 0]]) {
          g.beginPath();
          g.arc(i * s + ox, j * s + oy, 7, 0, Math.PI * 2);
          g.fill();
        }
      }
    const t = new CanvasTexture(c);
    t.wrapS = t.wrapT = RepeatWrapping;
    t.anisotropy = 8;
    return t;
  });
}

/** Original match-ball design: white shell, six swept panels, gold and graphite accents. */
export function ballTextures(): { map: CanvasTexture; bump: CanvasTexture } {
  const map = cached('ballMap', () => {
    const W = 1024;
    const H = 512;
    const [c, g] = canvas(W, H);
    const img = g.createImageData(W, H);
    const [cb, gb] = canvas(W, H);
    const bimg = gb.createImageData(W, H);
    for (let y = 0; y < H; y++) {
      const th = (y / H) * Math.PI;
      for (let x = 0; x < W; x++) {
        const ph = (x / W) * Math.PI * 2;
        const dx = Math.sin(th) * Math.cos(ph);
        const dy = Math.cos(th);
        const dz = Math.sin(th) * Math.sin(ph);
        // Six-panel layout from a twisted cube: seams where two components are equal.
        const tw = 0.55;
        const rx = dx * Math.cos(tw * dy) - dz * Math.sin(tw * dy);
        const rz = dx * Math.sin(tw * dy) + dz * Math.cos(tw * dy);
        const ax = Math.abs(rx);
        const ay = Math.abs(dy);
        const az = Math.abs(rz);
        const m1 = Math.max(ax, ay, az);
        const m2 = ax + ay + az - m1 - Math.min(ax, ay, az);
        const seam = m1 - m2; // 0 on the seams
        const face = m1 === ax ? (rx > 0 ? 0 : 1) : m1 === ay ? (dy > 0 ? 2 : 3) : rz > 0 ? 4 : 5;
        let r = 246;
        let gg = 246;
        let b = 242;
        // Swoosh band inside each panel.
        const band = Math.abs(seam - 0.16);
        if (band < 0.045) {
          const gold = face % 2 === 0;
          const t = 1 - band / 0.045;
          const cr = gold ? 214 : 32;
          const cg = gold ? 160 : 38;
          const cbv = gold ? 52 : 46;
          r = r + (cr - r) * Math.min(1, t * 2.2);
          gg = gg + (cg - gg) * Math.min(1, t * 2.2);
          b = b + (cbv - b) * Math.min(1, t * 2.2);
        }
        // Thin accent line.
        if (Math.abs(seam - 0.24) < 0.006) {
          r = 40;
          gg = 44;
          b = 52;
        }
        let bumpV = 255;
        if (seam < 0.012) {
          const t = seam / 0.012;
          r *= 0.55 + 0.45 * t;
          gg *= 0.55 + 0.45 * t;
          b *= 0.55 + 0.45 * t;
          bumpV = 255 * t;
        }
        // Micro texture.
        const micro = hash2(x, y, 77) * 10 - 5;
        const i = (y * W + x) * 4;
        img.data[i] = Math.max(0, Math.min(255, r + micro));
        img.data[i + 1] = Math.max(0, Math.min(255, gg + micro));
        img.data[i + 2] = Math.max(0, Math.min(255, b + micro));
        img.data[i + 3] = 255;
        const dimple = ((x * 7 + y * 13) % 9 === 0 ? 220 : 255) * (seam < 0.012 ? 0 : 1);
        const bv = Math.min(bumpV, dimple || bumpV);
        bimg.data[i] = bimg.data[i + 1] = bimg.data[i + 2] = bv;
        bimg.data[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    // Wordmark
    g.save();
    g.font = '700 34px "Big Shoulders Display", Impact, sans-serif';
    g.fillStyle = '#1d2330';
    g.textAlign = 'center';
    g.fillText('PK·ONE', W * 0.25, H * 0.52);
    g.fillText('PK·ONE', W * 0.75, H * 0.52);
    g.restore();
    gb.putImageData(bimg, 0, 0);
    cache.set('ballBump', new CanvasTexture(cb));
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  });
  return { map, bump: cache.get('ballBump') as CanvasTexture };
}

export interface KitColors {
  primary: string;
  secondary: string;
  accent: string;
  shorts: string;
  socks: string;
  pattern: 'stripes' | 'hoops' | 'sash' | 'plain' | 'halves' | 'gradient';
  numberColor: string;
}

/** Jersey texture: u wraps around the torso (u = 0.5 at the back), v from waist (0) to collar (1). */
export function jerseyTexture(kit: KitColors, number: number, name: string): CanvasTexture {
  return cached(`jersey-${JSON.stringify(kit)}-${number}-${name}`, () => {
    const W = 512;
    const H = 512;
    const [c, g] = canvas(W, H);
    g.fillStyle = kit.primary;
    g.fillRect(0, 0, W, H);
    g.fillStyle = kit.secondary;
    switch (kit.pattern) {
      case 'stripes':
        for (let i = 0; i < 12; i += 2) g.fillRect((i * W) / 12, 0, W / 12, H);
        break;
      case 'hoops':
        for (let i = 0; i < 8; i += 2) g.fillRect(0, (i * H) / 8, W, H / 8);
        break;
      case 'sash': {
        g.save();
        g.translate(W * 0.0, H);
        g.rotate(-0.75);
        g.fillRect(-W, -40, W * 2.2, 80);
        g.restore();
        break;
      }
      case 'halves':
        g.fillRect(0, 0, W / 4, H);
        g.fillRect((W * 3) / 4, 0, W / 4, H);
        break;
      case 'gradient': {
        const gr = g.createLinearGradient(0, H, 0, 0);
        gr.addColorStop(0, kit.secondary);
        gr.addColorStop(1, kit.primary);
        g.fillStyle = gr;
        g.fillRect(0, 0, W, H);
        break;
      }
      default:
        break;
    }
    // Fabric weave
    g.globalAlpha = 0.06;
    for (let y = 0; y < H; y += 3) {
      g.fillStyle = y % 6 === 0 ? '#000' : '#fff';
      g.fillRect(0, y, W, 1);
    }
    g.globalAlpha = 1;
    // Collar & side panels (canvas top = collar; bottom 20 % = waist band used by the abdomen)
    g.fillStyle = kit.accent;
    g.fillRect(0, 0, W, 20);
    g.fillRect(W * 0.235, 0, 10, H);
    g.fillRect(W * 0.755, 0, 10, H);
    // Back: number and name (u ≈ 0.5)
    g.fillStyle = kit.numberColor;
    g.textAlign = 'center';
    g.font = '800 170px "Big Shoulders Display", Impact, sans-serif';
    g.fillText(String(number), W * 0.5, H * 0.62);
    g.font = '700 38px "Big Shoulders Display", Impact, sans-serif';
    g.fillText(name.toUpperCase(), W * 0.5, H * 0.2);
    // Front: crest + small number (u ≈ 0 / 1)
    g.font = '800 64px "Big Shoulders Display", Impact, sans-serif';
    g.fillText(String(number), W * 0.958, H * 0.5);
    g.fillText(String(number), W * 0.042, H * 0.5);
    g.beginPath();
    g.fillStyle = kit.accent;
    g.arc(W * 0.075, H * 0.3, 18, 0, Math.PI * 2);
    g.fill();
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    t.wrapS = RepeatWrapping;
    t.wrapT = ClampToEdgeWrapping;
    t.anisotropy = 4;
    return t;
  });
}

/** Simple face/skin texture (u around the head, v bottom→top). */
export function faceTexture(skin: string, hair: string, seed: number): CanvasTexture {
  return cached(`face-${skin}-${hair}-${seed}`, () => {
    const W = 256;
    const H = 256;
    const [c, g] = canvas(W, H);
    g.fillStyle = skin;
    g.fillRect(0, 0, W, H);
    // Hairline (top/back), hair is mostly a separate mesh
    g.fillStyle = hair;
    g.fillRect(0, H * 0.0, W, H * 0.12);
    // Face is at u = 0 (front). Draw around u=0 and u=1 for wrap.
    for (const cx of [0, W]) {
      // brows
      g.fillStyle = hair;
      g.fillRect(cx - 30, H * 0.36, 22, 5);
      g.fillRect(cx + 8, H * 0.36, 22, 5);
      // eyes
      g.fillStyle = '#f2efe9';
      g.beginPath();
      g.ellipse(cx - 19, H * 0.42, 9, 5, 0, 0, Math.PI * 2);
      g.ellipse(cx + 19, H * 0.42, 9, 5, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#2b1d14';
      g.beginPath();
      g.arc(cx - 19, H * 0.42, 4, 0, Math.PI * 2);
      g.arc(cx + 19, H * 0.42, 4, 0, Math.PI * 2);
      g.fill();
      // mouth
      g.strokeStyle = 'rgba(80,30,30,0.6)';
      g.lineWidth = 3;
      g.beginPath();
      g.moveTo(cx - 12, H * 0.7);
      g.quadraticCurveTo(cx, H * 0.72, cx + 12, H * 0.7);
      g.stroke();
      // beard shadow for some
      if (seed % 3 === 0) {
        g.fillStyle = 'rgba(30,20,15,0.25)';
        g.beginPath();
        g.ellipse(cx, H * 0.75, 34, 22, 0, 0, Math.PI * 2);
        g.fill();
      }
    }
    // Subtle shading
    const gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, 'rgba(0,0,0,0.1)');
    gr.addColorStop(0.5, 'rgba(0,0,0,0)');
    gr.addColorStop(1, 'rgba(0,0,0,0.15)');
    g.fillStyle = gr;
    g.fillRect(0, 0, W, H);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    t.wrapS = RepeatWrapping;
    return t;
  });
}

/** Crowd atlas: 8 columns of people (variants) × 2 rows (normal, arms up). */
export function crowdAtlas(): CanvasTexture {
  return cached('crowd', () => {
    const cols = 8;
    const W = 64 * cols;
    const H = 128 * 2;
    const [c, g] = canvas(W, H);
    g.clearRect(0, 0, W, H);
    const rnd = mulberry32(42);
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < cols; col++) {
        const ox = col * 64;
        g.save();
        g.translate(ox, 0);
        const oy = row * 128;
        const shade = 0.75 + rnd() * 0.25;
        // Shirt is white (tinted per-instance in the shader through the R channel mask).
        g.fillStyle = `rgb(255,255,255)`;
        const shoulderW = 34 + rnd() * 10;
        g.beginPath();
        g.moveTo(32 - shoulderW / 2, 128 + oy);
        g.lineTo(32 - shoulderW / 2 + 2, 62 + oy);
        g.quadraticCurveTo(32, 52 + oy, 32 + shoulderW / 2 - 2, 62 + oy);
        g.lineTo(32 + shoulderW / 2, 128 + oy);
        g.closePath();
        g.fill();
        // Arms
        if (row === 1) {
          g.lineWidth = 9;
          g.strokeStyle = '#ffffff';
          g.lineCap = 'round';
          g.beginPath();
          g.moveTo(32 - shoulderW / 2 + 4, 66 + oy);
          g.lineTo(32 - shoulderW / 2 - 6, 26 + oy);
          g.moveTo(32 + shoulderW / 2 - 4, 66 + oy);
          g.lineTo(32 + shoulderW / 2 + 6, 26 + oy);
          g.stroke();
          // hands (skin: green channel marks skin)
          g.fillStyle = 'rgb(0,255,0)';
          g.beginPath();
          g.arc(32 - shoulderW / 2 - 7, 22 + oy, 5, 0, 7);
          g.arc(32 + shoulderW / 2 + 7, 22 + oy, 5, 0, 7);
          g.fill();
        }
        // Head (green = skin)
        g.fillStyle = 'rgb(0,255,0)';
        g.beginPath();
        g.ellipse(32, 42 + oy, 10, 12, 0, 0, Math.PI * 2);
        g.fill();
        // Hair (blue channel = hair)
        g.fillStyle = 'rgb(0,0,255)';
        g.beginPath();
        g.ellipse(32, 36 + oy, 10.5, 8 + rnd() * 3, 0, Math.PI, Math.PI * 2);
        g.fill();
        void shade;
        g.restore();
      }
    }
    const t = new CanvasTexture(c);
    t.anisotropy = 4;
    return t;
  });
}

/** Painted-line wear mask. */
export function lineTexture(): CanvasTexture {
  return cached('line', () => {
    const [c, g] = canvas(64, 512);
    const img = g.createImageData(64, 512);
    for (let y = 0; y < 512; y++)
      for (let x = 0; x < 64; x++) {
        const i = (y * 64 + x) * 4;
        const n = 0.75 + 0.25 * hash2(x, y, 5);
        const edge = Math.min(1, Math.min(x, 63 - x) / 6);
        img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
        img.data[i + 3] = 255 * n * edge;
      }
    g.putImageData(img, 0, 0);
    const t = new CanvasTexture(c);
    t.wrapT = RepeatWrapping;
    return t;
  });
}

export function makeCanvasTexture(w: number, h: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; tex: CanvasTexture } {
  const [c, g] = canvas(w, h);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;
  return { canvas: c, ctx: g, tex };
}
