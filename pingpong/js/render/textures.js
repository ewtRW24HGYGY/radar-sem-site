// Procedural textures drawn on canvases (no external assets).
import * as THREE from 'three';
import { TABLE_WIDTH, TABLE_LENGTH, LINE_WIDTH, CENTER_LINE_WIDTH } from '../physics/constants.js';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return [c, c.getContext('2d')];
}
function rand(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

function finish(c, { srgb = true, repeat = null, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  t.anisotropy = aniso;
  t.needsUpdate = true;
  return t;
}

// Speckle noise helper
function speckle(ctx, w, h, count, alpha, light, seed = 7, size = 1.2) {
  const r = rand(seed);
  for (let i = 0; i < count; i++) {
    const v = light ? 255 : 0;
    ctx.fillStyle = `rgba(${v},${v},${v},${alpha * r()})`;
    ctx.fillRect(r() * w, r() * h, size * (0.5 + r()), size * (0.5 + r()));
  }
}

export function tableTopTexture(color = '#1d3f72') {
  const W = 1024, H = 2048;
  const [c, x] = canvas(W, H);
  x.fillStyle = color; x.fillRect(0, 0, W, H);
  // subtle painted-surface variation
  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, 'rgba(255,255,255,0.025)'); g.addColorStop(0.5, 'rgba(0,0,0,0.03)'); g.addColorStop(1, 'rgba(255,255,255,0.02)');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  speckle(x, W, H, 60000, 0.05, true, 3);
  speckle(x, W, H, 60000, 0.06, false, 5);
  // official lines: 2 cm white edges, 3 mm centre line
  const lx = (LINE_WIDTH / TABLE_WIDTH) * W, lz = (LINE_WIDTH / TABLE_LENGTH) * H;
  const cl = Math.max(2, (CENTER_LINE_WIDTH / TABLE_WIDTH) * W);
  x.fillStyle = '#f4f6f8';
  x.fillRect(0, 0, lx, H); x.fillRect(W - lx, 0, lx, H);
  x.fillRect(0, 0, W, lz); x.fillRect(0, H - lz, W, lz);
  x.fillRect(W / 2 - cl / 2, 0, cl, H);
  // slight wear on the lines
  speckle(x, W, H, 8000, 0.08, false, 11, 1);
  return finish(c);
}

export function tableRoughnessTexture() {
  const [c, x] = canvas(512, 1024);
  x.fillStyle = 'rgb(150,150,150)'; x.fillRect(0, 0, 512, 1024);
  speckle(x, 512, 1024, 30000, 0.25, true, 13);
  speckle(x, 512, 1024, 30000, 0.25, false, 17);
  return finish(c, { srgb: false });
}

export function floorTexture() {
  const S = 1024;
  const [c, x] = canvas(S, S);
  x.fillStyle = '#7a2a26'; x.fillRect(0, 0, S, S);
  // sports vinyl: fine grain + soft mottling
  const r = rand(21);
  for (let i = 0; i < 300; i++) {
    const gx = r() * S, gy = r() * S, rad = 30 + r() * 120;
    const gr = x.createRadialGradient(gx, gy, 0, gx, gy, rad);
    gr.addColorStop(0, `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},0.035)`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(gx - rad, gy - rad, rad * 2, rad * 2);
  }
  speckle(x, S, S, 140000, 0.09, true, 23, 1.4);
  speckle(x, S, S, 140000, 0.12, false, 29, 1.4);
  return finish(c, { repeat: [10, 10] });
}

export function floorRoughness() {
  const [c, x] = canvas(256, 256);
  x.fillStyle = 'rgb(120,120,120)'; x.fillRect(0, 0, 256, 256);
  speckle(x, 256, 256, 20000, 0.3, true, 31);
  speckle(x, 256, 256, 20000, 0.3, false, 37);
  return finish(c, { srgb: false, repeat: [24, 24] });
}

export function woodTexture(base = '#c89b62', dark = '#8e6232', seed = 41, w = 512, h = 512, vertical = true) {
  const [c, x] = canvas(w, h);
  x.fillStyle = base; x.fillRect(0, 0, w, h);
  const r = rand(seed);
  const lines = 90;
  for (let i = 0; i < lines; i++) {
    const p = (i / lines) * (vertical ? w : h) + r() * 4;
    x.strokeStyle = `rgba(${parseInt(dark.slice(1, 3), 16)},${parseInt(dark.slice(3, 5), 16)},${parseInt(dark.slice(5, 7), 16)},${0.15 + r() * 0.35})`;
    x.lineWidth = 0.6 + r() * 2.4;
    x.beginPath();
    for (let t = 0; t <= 1.0001; t += 0.02) {
      const q = t * (vertical ? h : w);
      const off = Math.sin(t * 6 + i * 0.7) * 3 + Math.sin(t * 17 + i) * 1.2;
      if (vertical) x.lineTo(p + off, q); else x.lineTo(q, p + off);
    }
    x.stroke();
  }
  speckle(x, w, h, 6000, 0.08, false, seed + 1, 1);
  return finish(c);
}

// Layered plywood edge (blade side)
export function plyTexture() {
  const [c, x] = canvas(64, 256);
  const plies = ['#d8b07a', '#3b2a1c', '#e1c08e', '#b98a50', '#e6c594', '#b98a50', '#e1c08e', '#3b2a1c', '#d8b07a'];
  const ph = 64 / plies.length;
  plies.forEach((col, i) => { x.fillStyle = col; x.fillRect(i * ph, 0, ph + 0.5, 256); });
  return finish(c, { repeat: [1, 8] });
}

export function rubberTexture(color) {
  const [c, x] = canvas(256, 256);
  x.fillStyle = color; x.fillRect(0, 0, 256, 256);
  speckle(x, 256, 256, 9000, 0.06, true, 51, 1);
  speckle(x, 256, 256, 9000, 0.08, false, 53, 1);
  return finish(c);
}

// Ball: equirectangular map with the seam and a small printed logo so the spin is visible
export function ballTexture(color = '#f5f3ee', ink = '#c0392b') {
  const W = 512, H = 256;
  const [c, x] = canvas(W, H);
  x.fillStyle = color; x.fillRect(0, 0, W, H);
  // seam (equator)
  x.fillStyle = 'rgba(0,0,0,0.10)'; x.fillRect(0, H / 2 - 1, W, 2);
  // printed mark on two opposite sides
  for (const cx of [W * 0.25, W * 0.75]) {
    x.save();
    x.translate(cx, H * 0.33);
    x.scale(1, 0.9);
    x.fillStyle = ink;
    x.font = 'bold 22px Arial, sans-serif';
    x.textAlign = 'center';
    x.fillText('★★★', 0, 0);
    x.font = 'bold 18px Arial, sans-serif';
    x.fillText('40+', 0, 24);
    x.restore();
  }
  // a dark band near one pole helps reading the rotation axis
  x.fillStyle = 'rgba(30,30,30,0.55)';
  x.fillRect(0, H * 0.8, W, 5);
  return finish(c);
}

export function netTexture() {
  const S = 64;
  const [c, x] = canvas(S, S);
  x.clearRect(0, 0, S, S);
  x.strokeStyle = 'rgba(20,24,30,0.95)';
  x.lineWidth = 6;
  x.strokeRect(0, 0, S, S);
  const t = finish(c, { srgb: true });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function barrierTexture(text = 'TÊNIS DE MESA  ·  CAMPEONATO 2026') {
  const [c, x] = canvas(2048, 256);
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#13213f'); g.addColorStop(1, '#0b142a');
  x.fillStyle = g; x.fillRect(0, 0, 2048, 256);
  x.fillStyle = 'rgba(255,255,255,0.9)';
  x.font = '600 74px "Helvetica Neue", Arial, sans-serif';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, 1024, 130);
  x.fillStyle = '#e94b3c'; x.fillRect(0, 238, 2048, 18);
  return finish(c);
}

export function radialTexture(inner = 'rgba(0,0,0,0.6)', outer = 'rgba(0,0,0,0)') {
  const [c, x] = canvas(128, 128);
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, inner); g.addColorStop(0.55, inner.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.5})`)); g.addColorStop(1, outer);
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  return finish(c, { srgb: false });
}

export function ringTexture(color = '255,255,255') {
  const [c, x] = canvas(256, 256);
  x.lineWidth = 10;
  x.strokeStyle = `rgba(${color},0.95)`;
  x.beginPath(); x.arc(128, 128, 118, 0, Math.PI * 2); x.stroke();
  x.lineWidth = 4;
  x.strokeStyle = `rgba(${color},0.6)`;
  x.beginPath(); x.arc(128, 128, 80, 0, Math.PI * 2); x.stroke();
  x.fillStyle = `rgba(${color},0.18)`;
  x.beginPath(); x.arc(128, 128, 118, 0, Math.PI * 2); x.fill();
  x.fillStyle = `rgba(${color},0.9)`;
  x.beginPath(); x.arc(128, 128, 14, 0, Math.PI * 2); x.fill();
  return finish(c);
}
