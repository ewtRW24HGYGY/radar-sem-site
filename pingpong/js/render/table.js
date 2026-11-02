// Official table with undercarriage and the net assembly (deformable mesh that reacts to hits).
import * as THREE from 'three';
import {
  TABLE_WIDTH, TABLE_LENGTH, TABLE_HEIGHT, TABLE_THICKNESS, NET_HEIGHT, NET_HALF_LENGTH, NET_TAPE,
} from '../physics/constants.js';
import { tableTopTexture, tableRoughnessTexture, netTexture } from './textures.js';

export function buildTable() {
  const group = new THREE.Group();
  group.name = 'table';
  const topTex = tableTopTexture();
  const rough = tableRoughnessTexture();
  const topMat = new THREE.MeshPhysicalMaterial({
    map: topTex, roughness: 0.62, roughnessMap: rough, metalness: 0, clearcoat: 0.12, clearcoatRoughness: 0.45,
  });
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0x14294a, roughness: 0.55 });
  const under = new THREE.MeshStandardMaterial({ color: 0x0d1626, roughness: 0.9 });
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(TABLE_WIDTH, TABLE_THICKNESS, TABLE_LENGTH),
    [edgeMat, edgeMat, topMat, under, edgeMat, edgeMat],
  );
  top.position.y = TABLE_HEIGHT - TABLE_THICKNESS / 2;
  top.castShadow = true; top.receiveShadow = true;
  group.add(top);

  // Undercarriage: apron, folding frames, legs, wheels
  const steel = new THREE.MeshStandardMaterial({ color: 0x2a2f38, metalness: 0.65, roughness: 0.42 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x15181d, roughness: 0.7 });
  const add = (geo, mat, x, y, z, rx = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.x = rx; m.rotation.z = rz;
    m.castShadow = true; m.receiveShadow = true; group.add(m); return m;
  };
  const y0 = TABLE_HEIGHT - TABLE_THICKNESS;
  // apron rails
  for (const sx of [-1, 1]) add(new THREE.BoxGeometry(0.03, 0.05, TABLE_LENGTH - 0.12), steel, sx * (TABLE_WIDTH / 2 - 0.06), y0 - 0.025, 0);
  for (const sz of [-1, 1]) add(new THREE.BoxGeometry(TABLE_WIDTH - 0.12, 0.05, 0.03), steel, 0, y0 - 0.025, sz * (TABLE_LENGTH / 2 - 0.06));
  // central hinge beam
  add(new THREE.BoxGeometry(TABLE_WIDTH - 0.2, 0.06, 0.06), steel, 0, y0 - 0.03, 0);
  // two leg assemblies per half
  for (const sz of [-1, 1]) {
    const zc = sz * 0.82;
    for (const sx of [-1, 1]) {
      const legH = y0 - 0.1;
      add(new THREE.BoxGeometry(0.045, legH, 0.045), steel, sx * 0.6, 0.06 + legH / 2, zc);
      // wheel
      const wheel = add(new THREE.CylinderGeometry(0.05, 0.05, 0.035, 20), dark, sx * 0.6, 0.05, zc, 0, Math.PI / 2);
      wheel.rotation.set(0, 0, Math.PI / 2);
    }
    add(new THREE.BoxGeometry(1.24, 0.04, 0.04), steel, 0, 0.2, zc);
    add(new THREE.BoxGeometry(1.24, 0.035, 0.035), steel, 0, y0 - 0.08, zc);
    // diagonal brace towards the hinge
    const brace = add(new THREE.BoxGeometry(0.035, 0.035, 0.95), steel, 0, 0.42, sz * 0.4);
    brace.rotation.x = sz * 0.36;
  }

  const net = buildNet();
  group.add(net.group);
  return { group, net, topMaterial: topMat };
}

// Net: mesh plane with a damped wave simulation on its vertices + top tape and posts.
function buildNet() {
  const group = new THREE.Group();
  const meshH = NET_HEIGHT - NET_TAPE;
  const NX = 72, NY = 8;
  const geo = new THREE.PlaneGeometry(NET_HALF_LENGTH * 2, meshH, NX, NY);
  const tex = netTexture();
  tex.repeat.set(140, 11);
  const mat = new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.25, side: THREE.DoubleSide, roughness: 0.9, color: 0xffffff });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, TABLE_HEIGHT + 0.004 + meshH / 2, 0);
  mesh.castShadow = true;
  group.add(mesh);
  // dark bottom cord
  const cord = new THREE.Mesh(new THREE.BoxGeometry(NET_HALF_LENGTH * 2, 0.006, 0.003), new THREE.MeshStandardMaterial({ color: 0x1a1d22, roughness: 0.8 }));
  cord.position.set(0, TABLE_HEIGHT + 0.006, 0);
  group.add(cord);
  // white top tape (moves with the top row of the mesh)
  const tapeGeo = new THREE.BoxGeometry(NET_HALF_LENGTH * 2, NET_TAPE, 0.004, NX, 1, 1);
  const tape = new THREE.Mesh(tapeGeo, new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.65 }));
  tape.position.set(0, TABLE_HEIGHT + NET_HEIGHT - NET_TAPE / 2, 0);
  tape.castShadow = true;
  group.add(tape);
  // posts and clamps
  const postMat = new THREE.MeshStandardMaterial({ color: 0x1b2433, metalness: 0.5, roughness: 0.45 });
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.022, NET_HEIGHT + 0.05, 0.022), postMat);
    post.position.set(sx * (NET_HALF_LENGTH + 0.011), TABLE_HEIGHT + (NET_HEIGHT + 0.05) / 2 - 0.045, 0);
    post.castShadow = true;
    group.add(post);
    const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.045), postMat);
    clamp.position.set(sx * (TABLE_WIDTH / 2 + 0.03), TABLE_HEIGHT - 0.03, 0);
    clamp.castShadow = true;
    group.add(clamp);
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.06, 12), postMat);
    screw.position.set(sx * (TABLE_WIDTH / 2 + 0.06), TABLE_HEIGHT - 0.07, 0);
    group.add(screw);
  }

  // wave simulation state (z displacement per vertex)
  const cols = NX + 1, rows = NY + 1;
  const u = new Float32Array(cols * rows), v = new Float32Array(cols * rows);
  const pos = geo.attributes.position;
  const tapePos = tapeGeo.attributes.position;
  const tapeBase = Float32Array.from(tapePos.array);
  const dx = (NET_HALF_LENGTH * 2) / NX;
  let active = 0;

  function impulse(x, y, strength) {
    // x along the net, y height; strength = ball velocity along z (m/s, signed)
    const ci = Math.round(((x + NET_HALF_LENGTH) / (NET_HALF_LENGTH * 2)) * NX);
    const ry = (y - TABLE_HEIGHT) / NET_HEIGHT;
    for (let j = 0; j < rows; j++) {
      const rowY = 1 - j / NY;   // PlaneGeometry rows go top → bottom
      for (let i = 0; i < cols; i++) {
        const d2 = ((i - ci) * dx) ** 2 / 0.006 + (rowY - ry) ** 2 / 0.25;
        v[j * cols + i] += strength * Math.exp(-d2) * 0.1;
      }
    }
    active = 3;
  }
  function update(dt) {
    if (active <= 0) return;
    const c2 = 1600, damp = Math.exp(-7 * dt), k = 380;
    const steps = Math.ceil(dt / 0.004);
    const h = dt / steps;
    let energy = 0;
    for (let s = 0; s < steps; s++) {
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const id = j * cols + i;
          if (i === 0 || i === cols - 1) { u[id] = 0; v[id] = 0; continue; }
          const lap = (u[id - 1] + u[id + 1] - 2 * u[id]) / (dx * dx) * 0.0004;
          const bottom = j === rows - 1 ? 0.6 : 1;
          v[id] += (c2 * lap - k * u[id]) * h;
          v[id] *= Math.pow(damp, h / dt);
          u[id] += v[id] * h * bottom;
          energy += Math.abs(u[id]);
        }
      }
    }
    for (let id = 0; id < cols * rows; id++) pos.setZ(id, u[id]);
    pos.needsUpdate = true;
    // tape follows the top row
    for (let k2 = 0; k2 < tapePos.count; k2++) {
      const bx = tapeBase[k2 * 3];
      const i = Math.round(((bx + NET_HALF_LENGTH) / (NET_HALF_LENGTH * 2)) * NX);
      tapePos.setZ(k2, tapeBase[k2 * 3 + 2] + u[Math.max(0, Math.min(cols - 1, i))] * 0.8);
    }
    tapePos.needsUpdate = true;
    if (energy < 1e-4) active -= dt; else active = 3;
  }
  return { group, impulse, update };
}
