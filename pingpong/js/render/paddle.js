// Detailed racket: layered wooden blade, red/black inverted rubbers with sponge, edge tape and a
// flared handle. Local frame matches the physics: +z = forehand (red) face, +y = blade tip.
import * as THREE from 'three';
import { BLADE_A, BLADE_B, HANDLE_LENGTH } from '../physics/constants.js';
import { woodTexture, plyTexture, rubberTexture } from './textures.js';

const BLADE_T = 0.0058, RUBBER_T = 0.0039;
let shared = null;

function sharedAssets() {
  if (shared) return shared;
  const bladeShape = new THREE.Shape();
  bladeShape.absellipse(0, 0, BLADE_A, BLADE_B, 0, Math.PI * 2, false, 0);
  const rubberShape = new THREE.Shape();
  rubberShape.absellipse(0, 0, BLADE_A - 0.0004, BLADE_B - 0.0004, 0, Math.PI * 2, false, 0);
  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, { depth: BLADE_T, bevelEnabled: false, curveSegments: 48 });
  bladeGeo.translate(0, 0, -BLADE_T / 2);
  const rubberGeo = new THREE.ExtrudeGeometry(rubberShape, {
    depth: RUBBER_T, bevelEnabled: true, bevelThickness: 0.0004, bevelSize: 0.0004, bevelSegments: 1, curveSegments: 48,
  });
  // map UVs of the caps into 0..1
  for (const g of [bladeGeo, rubberGeo]) {
    const p = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / (2 * BLADE_A) + 0.5, p.getY(i) / (2 * BLADE_B) + 0.5);
  }
  // Handle silhouette: flared shakehand handle
  const hs = new THREE.Shape();
  const top = -BLADE_B + 0.012, bot = -BLADE_B - HANDLE_LENGTH;
  hs.moveTo(-0.0135, top);
  hs.bezierCurveTo(-0.013, top - 0.04, -0.0125, bot + 0.05, -0.0175, bot + 0.004);
  hs.quadraticCurveTo(-0.017, bot, 0, bot);
  hs.quadraticCurveTo(0.017, bot, 0.0175, bot + 0.004);
  hs.bezierCurveTo(0.0125, bot + 0.05, 0.013, top - 0.04, 0.0135, top);
  hs.lineTo(-0.0135, top);
  const handleGeo = new THREE.ExtrudeGeometry(hs, { depth: 0.016, bevelEnabled: true, bevelThickness: 0.0045, bevelSize: 0.0035, bevelSegments: 4, curveSegments: 24 });
  handleGeo.translate(0, 0, -0.008);
  const hp = handleGeo.attributes.position, huv = handleGeo.attributes.uv;
  for (let i = 0; i < hp.count; i++) huv.setXY(i, hp.getX(i) * 12 + 0.5, hp.getY(i) * 4);

  const woodTex = woodTexture('#d5aa72', '#8d5f2f', 41);
  const handleTex = woodTexture('#c9955a', '#6f4520', 77, 256, 512);
  handleTex.wrapS = handleTex.wrapT = THREE.RepeatWrapping;
  shared = {
    bladeGeo, rubberGeo, handleGeo,
    bladeCap: new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.6 }),
    ply: new THREE.MeshStandardMaterial({ map: plyTexture(), roughness: 0.7 }),
    handle: new THREE.MeshPhysicalMaterial({ map: handleTex, roughness: 0.45, clearcoat: 0.5, clearcoatRoughness: 0.3 }),
    edgeTape: new THREE.MeshStandardMaterial({ color: 0x23262b, metalness: 0.3, roughness: 0.5 }),
    sponge: new THREE.MeshStandardMaterial({ color: 0xe0b25b, roughness: 0.9 }),
    edgeGeo: (() => {
      const g = new THREE.CylinderGeometry(1, 1, BLADE_T + 2 * RUBBER_T + 0.0008, 64, 1, true);
      g.rotateX(Math.PI / 2);
      g.scale(BLADE_A + 0.0009, BLADE_B + 0.0009, 1);
      return g;
    })(),
  };
  return shared;
}

export function buildPaddle({ fhColor = '#c0141c', bhColor = '#161616' } = {}) {
  const A = sharedAssets();
  const group = new THREE.Group();
  const blade = new THREE.Mesh(A.bladeGeo, [A.bladeCap, A.ply]);
  blade.castShadow = true;
  group.add(blade);
  const mkRubber = (color, face) => {
    const tex = rubberTexture(color);
    const top = new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.48, clearcoat: 0.22, clearcoatRoughness: 0.55, sheen: 0.3, sheenColor: new THREE.Color(color) });
    const m = new THREE.Mesh(A.rubberGeo, [top, A.sponge]);
    if (face > 0) m.position.z = BLADE_T / 2;
    else { m.rotation.y = Math.PI; m.position.z = -BLADE_T / 2; }
    m.castShadow = true;
    return m;
  };
  group.add(mkRubber(fhColor, 1));
  group.add(mkRubber(bhColor, -1));
  const edge = new THREE.Mesh(A.edgeGeo, A.edgeTape);
  edge.castShadow = true;
  group.add(edge);
  const handle = new THREE.Mesh(A.handleGeo, A.handle);
  handle.castShadow = true;
  group.add(handle);
  // small printed logo patch on each rubber, near the handle
  const logoMat = new THREE.MeshBasicMaterial({ color: 0xf1f1f1, transparent: true, opacity: 0.85 });
  for (const s of [1, -1]) {
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.03, 0.006), logoMat);
    logo.position.set(0, -BLADE_B + 0.022, s * (BLADE_T / 2 + RUBBER_T + 0.0005));
    if (s < 0) logo.rotation.y = Math.PI;
    group.add(logo);
  }
  group.traverse((o) => { if (o.isMesh) o.receiveShadow = true; });
  return group;
}
