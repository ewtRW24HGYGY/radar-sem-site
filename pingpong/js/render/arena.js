// Sports hall: wooden gym floor with court lines, red competition mat, barriers, stands with
// spectators, ceiling light panels, umpire table with a live scoreboard and the ball machine.
import * as THREE from 'three';
import { TABLE_HEIGHT, TABLE_HALF_L, ARENA_HALF_X, ARENA_HALF_Z } from '../physics/constants.js';
import { floorTexture, floorRoughness, barrierTexture, woodTexture, ringTexture } from './textures.js';

function parquetTexture() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 1024;
  const x = c.getContext('2d');
  let s = 91; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const bw = 1024 / 8, bh = 1024 / 2;
  for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) {
    const off = (i % 2) * bh * 0.5;
    const l = 150 + r() * 30;
    x.fillStyle = `rgb(${l + 40},${l - 5},${l - 60})`;
    x.fillRect(i * bw, j * bh - off, bw, bh);
    x.strokeStyle = 'rgba(60,35,15,0.35)'; x.lineWidth = 2;
    x.strokeRect(i * bw, j * bh - off, bw, bh);
    for (let k = 0; k < 14; k++) {
      x.strokeStyle = `rgba(110,70,30,${0.08 + r() * 0.12})`; x.lineWidth = 1 + r();
      const xx = i * bw + r() * bw;
      x.beginPath(); x.moveTo(xx, j * bh - off); x.bezierCurveTo(xx + 6, j * bh - off + bh * 0.3, xx - 6, j * bh - off + bh * 0.6, xx + 3, j * bh - off + bh); x.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(14, 10); t.anisotropy = 8;
  return t;
}

function scoreboardCanvas() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  return { canvas: c, ctx: c.getContext('2d') };
}

export class Arena {
  constructor(scene, quality = 'high') {
    this.group = new THREE.Group();
    scene.add(this.group);
    const g = this.group;

    // gym floor
    const floorMat = new THREE.MeshStandardMaterial({ map: parquetTexture(), roughness: 0.42, metalness: 0.0 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(44, 32), floorMat);
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
    g.add(floor);
    // gym court lines (multi-sport hall) — painted on the wood
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xe9e2c8, transparent: true, opacity: 0.55, depthWrite: false });
    const yellow = new THREE.MeshBasicMaterial({ color: 0xd8b13a, transparent: true, opacity: 0.5, depthWrite: false });
    const line = (w, l, x, z, mat = lineMat, rot = 0) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, l), mat);
      m.rotation.x = -Math.PI / 2; m.rotation.z = rot; m.position.set(x, 0.002, z); m.renderOrder = 1; g.add(m); return m;
    };
    const HX = 9, HZ = 14.5;
    line(0.06, HZ * 2, -HX, 0); line(0.06, HZ * 2, HX, 0); line(HX * 2, 0.06, 0, -HZ); line(HX * 2, 0.06, 0, HZ);
    line(HX * 2, 0.06, 0, 0, yellow);
    const circle = new THREE.Mesh(new THREE.RingGeometry(1.75, 1.81, 64), yellow);
    circle.rotation.x = -Math.PI / 2; circle.position.y = 0.002; g.add(circle);
    for (const sz of [-1, 1]) {
      const arc = new THREE.Mesh(new THREE.RingGeometry(6.0, 6.06, 64, 1, 0, Math.PI), lineMat);
      arc.rotation.x = -Math.PI / 2; arc.rotation.z = sz > 0 ? Math.PI : 0; arc.position.set(0, 0.002, sz * HZ); g.add(arc);
    }

    // table tennis competition mat (red) inside the barriers + white border
    const matTex = floorTexture();
    matTex.repeat.set(4, 7);
    const mat = new THREE.Mesh(new THREE.PlaneGeometry(ARENA_HALF_X * 2, ARENA_HALF_Z * 2),
      new THREE.MeshStandardMaterial({ map: matTex, roughness: 0.78, roughnessMap: floorRoughness() }));
    mat.rotation.x = -Math.PI / 2; mat.position.y = 0.004; mat.receiveShadow = true;
    g.add(mat);
    const white = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, depthWrite: false });
    const bl = (w, l, x, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, l), white); m.rotation.x = -Math.PI / 2; m.position.set(x, 0.006, z); m.renderOrder = 1; g.add(m); };
    bl(0.05, ARENA_HALF_Z * 2 - 0.4, -ARENA_HALF_X + 0.2, 0); bl(0.05, ARENA_HALF_Z * 2 - 0.4, ARENA_HALF_X - 0.2, 0);
    bl(ARENA_HALF_X * 2 - 0.4, 0.05, 0, -ARENA_HALF_Z + 0.2); bl(ARENA_HALF_X * 2 - 0.4, 0.05, 0, ARENA_HALF_Z - 0.2);

    // barriers
    const btex = barrierTexture();
    const bmat = new THREE.MeshStandardMaterial({ map: btex, roughness: 0.6 });
    const bside = new THREE.MeshStandardMaterial({ color: 0x0b142a, roughness: 0.7 });
    const barrier = (x, z, rotY) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(2.33, 0.75, 0.04), [bside, bside, bside, bside, bmat, bmat]);
      b.position.set(x, 0.375, z); b.rotation.y = rotY; b.castShadow = true; b.receiveShadow = true; g.add(b);
    };
    for (let i = -2; i <= 1; i++) { barrier((i + 0.5) * 2.0, -ARENA_HALF_Z, 0); barrier((i + 0.5) * 2.0, ARENA_HALF_Z, Math.PI); }
    for (let i = -3; i <= 2; i++) { barrier(-ARENA_HALF_X, (i + 0.5) * 2.34, Math.PI / 2); barrier(ARENA_HALF_X, (i + 0.5) * 2.34, -Math.PI / 2); }

    // hall walls and ceiling
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x1b2230, roughness: 0.92, side: THREE.BackSide });
    const hall = new THREE.Mesh(new THREE.BoxGeometry(44, 16, 32), wallMat);
    hall.position.y = 8;
    g.add(hall);
    // banners on the end walls
    const bannerCols = [0x1f4e8c, 0xc0392b, 0x1f4e8c];
    for (const sz of [-1, 1]) for (let i = -1; i <= 1; i++) {
      const b = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 2.2), new THREE.MeshStandardMaterial({ color: bannerCols[i + 1], emissive: bannerCols[i + 1], emissiveIntensity: 0.25, roughness: 0.8 }));
      b.position.set(i * 6, 7.5, sz * 15.95); b.rotation.y = sz > 0 ? Math.PI : 0; g.add(b);
    }
    // ceiling light panels + trusses
    const panelMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf4f7ff, emissiveIntensity: 2.2 });
    const panels = new THREE.InstancedMesh(new THREE.BoxGeometry(1.4, 0.06, 0.5), panelMat, 40);
    let k = 0; const m4 = new THREE.Matrix4();
    for (let i = -4; i <= 3; i++) for (let j = -2; j <= 2; j++) { m4.makeTranslation(i * 4.4 + 2.2, 13.8, j * 5.5); panels.setMatrixAt(k++, m4); }
    g.add(panels);
    const truss = new THREE.MeshStandardMaterial({ color: 0x2b313c, metalness: 0.6, roughness: 0.5 });
    for (let j = -2; j <= 2; j++) { const t = new THREE.Mesh(new THREE.BoxGeometry(40, 0.25, 0.25), truss); t.position.set(0, 14.1, j * 5.5); g.add(t); }
    // lighting rig directly above the table
    const rig = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 3.6), new THREE.MeshStandardMaterial({ color: 0x20252e, metalness: 0.5, roughness: 0.5 }));
    rig.position.set(0, 6.9, 0); g.add(rig);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.6), new THREE.MeshStandardMaterial({ emissive: 0xffffff, emissiveIntensity: 4, color: 0xffffff }));
    for (const [lx, lz] of [[-0.6, -1.1], [0.6, -1.1], [-0.6, 1.1], [0.6, 1.1]]) { const l = lamp.clone(); l.position.set(lx, 6.85, lz); g.add(l); }

    // stands with spectators along the long sides
    this.buildStands(quality);
    // umpire table + scoreboard
    this.buildUmpire();
    // ball machine (training)
    this.robot = this.buildRobot();
    // target rings (precision challenge) and landing marker
    this.target = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ map: ringTexture('255,214,10'), transparent: true, depthWrite: false }));
    this.target.rotation.x = -Math.PI / 2; this.target.position.y = TABLE_HEIGHT + 0.0015; this.target.visible = false; this.target.renderOrder = 3;
    g.add(this.target);
    this.marker = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.045, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
    this.marker.rotation.x = -Math.PI / 2; this.marker.renderOrder = 3;
    g.add(this.marker);
    this.markerLife = 0;
    this.targetPulse = 0;
  }

  buildStands(quality) {
    const g = this.group;
    const stepMat = new THREE.MeshStandardMaterial({ color: 0x232a36, roughness: 0.9 });
    const rows = 7;
    const seatsPerRow = quality === 'low' ? 18 : 34;
    const people = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.19, 0.38, 3, 8), new THREE.MeshStandardMaterial({ roughness: 0.9 }), rows * seatsPerRow * 2);
    const heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.12, 10, 8), new THREE.MeshStandardMaterial({ roughness: 0.7 }), rows * seatsPerRow * 2);
    const m = new THREE.Matrix4(), col = new THREE.Color();
    const shirt = [0x2e5fa8, 0xc23b3b, 0xe8e8e8, 0x2b2b2b, 0x3f8f4f, 0xe0b23c, 0x7a4fa3, 0x1d1d1d, 0xd96d2b];
    const skin = [0xf1c27d, 0xe0ac69, 0xc68642, 0x8d5524, 0xffdbac];
    let n = 0, s = 7;
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (const sx of [-1, 1]) {
      for (let i = 0; i < rows; i++) {
        const x = sx * (10.2 + i * 0.85), y = 0.45 * i;
        const step = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.45, 26), stepMat);
        step.position.set(x, y + 0.225, 0); step.receiveShadow = true;
        this.group.add(step);
        for (let j = 0; j < seatsPerRow; j++) {
          if (r() < 0.22) continue;
          const z = -12 + (24 * (j + 0.5)) / seatsPerRow + (r() - 0.5) * 0.2;
          m.makeTranslation(x, y + 0.45 + 0.42, z);
          people.setMatrixAt(n, m); people.setColorAt(n, col.setHex(shirt[(r() * shirt.length) | 0]));
          m.makeTranslation(x + sx * -0.02, y + 0.45 + 0.95, z);
          heads.setMatrixAt(n, m); heads.setColorAt(n, col.setHex(skin[(r() * skin.length) | 0]));
          n++;
        }
      }
    }
    people.count = heads.count = n;
    g.add(people, heads);
  }

  buildUmpire() {
    const g = this.group;
    const wood = new THREE.MeshStandardMaterial({ map: woodTexture('#3a4a66', '#253248', 5), roughness: 0.6 });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.75, 1.0), wood);
    desk.position.set(-2.85, 0.375, 0); desk.castShadow = true; desk.receiveShadow = true; g.add(desk);
    const chair = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.5, 0.45), new THREE.MeshStandardMaterial({ color: 0x15181d }));
    chair.position.set(-3.35, 0.25, 0); g.add(chair);
    const { canvas, ctx } = scoreboardCanvas();
    this.sbCanvas = canvas; this.sbCtx = ctx;
    this.sbTex = new THREE.CanvasTexture(canvas); this.sbTex.colorSpace = THREE.SRGBColorSpace;
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.32, 0.64), [
      new THREE.MeshStandardMaterial({ map: this.sbTex, emissive: 0xffffff, emissiveMap: this.sbTex, emissiveIntensity: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0x111 }), new THREE.MeshStandardMaterial({ color: 0x111 }),
      new THREE.MeshStandardMaterial({ color: 0x111 }), new THREE.MeshStandardMaterial({ color: 0x111 }), new THREE.MeshStandardMaterial({ color: 0x111 }),
    ]);
    board.position.set(-2.58, 0.92, 0); g.add(board);
    // mirror on the other face so the camera behind either player can see it
    this.setScoreboard(['0', '0'], ['0', '0']);
  }
  setScoreboard(points, games) {
    const x = this.sbCtx, W = 512, H = 256;
    x.fillStyle = '#0c0f14'; x.fillRect(0, 0, W, H);
    x.fillStyle = '#1e2633'; x.fillRect(8, 8, W / 2 - 12, H - 16); x.fillRect(W / 2 + 4, 8, W / 2 - 12, H - 16);
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = '#ffffff'; x.font = 'bold 150px Arial'; x.fillText(points[1], W * 0.25, H * 0.55); x.fillText(points[0], W * 0.75, H * 0.55);
    x.fillStyle = '#f5c518'; x.font = 'bold 40px Arial'; x.fillText(games[1], W * 0.25, 34); x.fillText(games[0], W * 0.75, 34);
    this.sbTex.needsUpdate = true;
  }

  buildRobot() {
    const grp = new THREE.Group();
    const body = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.4, roughness: 0.4 });
    const accent = new THREE.MeshStandardMaterial({ color: 0xe94b3c, roughness: 0.5 });
    const clear = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.0, transparent: true, opacity: 0.35, roughness: 0.1 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.16), body); base.position.y = 0.04; grp.add(base);
    const hopper = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.07, 0.24, 24, 1, true), clear); hopper.position.y = 0.3; grp.add(hopper);
    const balls = new THREE.InstancedMesh(new THREE.SphereGeometry(0.02, 10, 8), new THREE.MeshStandardMaterial({ color: 0xf6f4ef, roughness: 0.4 }), 30);
    const m = new THREE.Matrix4(); for (let i = 0; i < 30; i++) { const a = i * 2.4, rr = 0.03 + (i % 5) * 0.022; m.makeTranslation(Math.cos(a) * rr, 0.22 + Math.floor(i / 8) * 0.035, Math.sin(a) * rr); balls.setMatrixAt(i, m); }
    grp.add(balls);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.16, 12), body); neck.position.y = 0.12; grp.add(neck);
    const head = new THREE.Group(); head.position.y = 0.18;
    const shell = new THREE.Mesh(new THREE.SphereGeometry(0.06, 20, 14), accent); head.add(shell);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.026, 0.12, 16), body); tube.rotation.x = Math.PI / 2; tube.position.z = 0.07; head.add(tube);
    grp.add(head);
    grp.position.set(0, TABLE_HEIGHT, -(TABLE_HALF_L + 0.12));
    // the machine sits on the end of the table; the launch point is the head
    grp.visible = false;
    grp.userData.head = head;
    this.group.add(grp);
    return grp;
  }
  aimRobot(dir) {
    const head = this.robot.userData.head;
    head.rotation.y = Math.atan2(dir.x, dir.z);
    head.rotation.x = -Math.atan2(dir.y, Math.hypot(dir.x, dir.z));
  }

  showTarget(t) {
    if (!t) { this.target.visible = false; return; }
    this.target.visible = true;
    this.target.position.set(t.x, TABLE_HEIGHT + 0.0015, t.z);
    this.target.scale.setScalar(t.r);
    this.targetPulse = 1;
  }
  showMarker(x, y, z, good = true) {
    this.marker.position.set(x, y + 0.002, z);
    this.marker.material.color.set(good ? 0xffffff : 0xff5a4f);
    this.markerLife = 1;
  }
  update(dt) {
    if (this.markerLife > 0) {
      this.markerLife = Math.max(0, this.markerLife - dt * 1.4);
      this.marker.material.opacity = this.markerLife * 0.7;
      const s = 1 + (1 - this.markerLife) * 1.2; this.marker.scale.set(s, s, s);
    }
    if (this.target.visible) {
      this.targetPulse = Math.max(0, this.targetPulse - dt);
      this.target.material.opacity = 0.75 + 0.25 * Math.sin(performance.now() / 300);
    }
  }
}
