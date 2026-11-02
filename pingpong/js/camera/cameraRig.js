// Camera modes with smooth, critically damped motion (no hard cuts, even when switching modes).
//  fp   – first person, eyes of the player holding the racket
//  tp   – third person, behind and above the player
//  side – broadcast side view
//  dyn  – dynamic camera that orbits and follows the ball's flight
import * as THREE from 'three';
import { TABLE_HEIGHT, TABLE_HALF_L } from '../physics/constants.js';

export const CAMERA_MODES = { fp: 'Primeira pessoa', tp: 'Terceira pessoa', side: 'Lateral', dyn: 'Dinâmica' };

function smoothDamp(cur, vel, target, smooth, dt) {
  // critically damped spring (Game Programming Gems 4)
  const omega = 2 / Math.max(1e-4, smooth);
  const x = omega * dt;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = cur - target;
  const temp = (vel + omega * change) * dt;
  const nv = (vel - omega * temp) * exp;
  return [target + (change + temp) * exp, nv];
}

class DampedV3 {
  constructor(v) { this.v = v.clone(); this.vel = new THREE.Vector3(); }
  update(target, smooth, dt) {
    for (const k of ['x', 'y', 'z']) { const [p, v] = smoothDamp(this.v[k], this.vel[k], target[k], smooth, dt); this.v[k] = p; this.vel[k] = v; }
    return this.v;
  }
  snap(t) { this.v.copy(t); this.vel.set(0, 0, 0); }
}

export class CameraRig {
  constructor(camera) {
    this.camera = camera;
    this.mode = 'tp';
    this.side = 1;               // which end the viewing player is on
    this.pos = new DampedV3(new THREE.Vector3(0, 2.1, 4.2));
    this.look = new DampedV3(new THREE.Vector3(0, 0.8, 0));
    this.fov = 55;
    this.transition = 0;
    this._p = new THREE.Vector3(); this._l = new THREE.Vector3();
  }
  setMode(m) { if (m !== this.mode) { this.mode = m; this.transition = 1; } }
  setSide(s) { if (s !== this.side) { this.side = s; this.transition = 1; } }

  update(dt, ball, body, paddle) {
    const s = this.side, P = this._p, L = this._l;
    let fov = 55, smoothP = 0.35, smoothL = 0.22;
    const bx = ball.x, by = ball.y, bz = ball.z;
    switch (this.mode) {
      case 'fp':
        P.set(body.x + 0.05 * s, 1.45, body.z + 0.22 * s);
        L.set(body.x * 0.3 + (bx - body.x) * 0.25, TABLE_HEIGHT + 0.12 + (by - TABLE_HEIGHT) * 0.25, -s * 0.9 + (bz + s * 0.9) * 0.15);
        fov = 70; smoothP = 0.12; smoothL = 0.16;
        break;
      case 'tp':
        P.set(body.x * 0.55, 2.05, s * (TABLE_HALF_L + 2.55));
        L.set(body.x * 0.2 + bx * 0.1, TABLE_HEIGHT - 0.05, -s * 0.35);
        fov = 50; smoothP = 0.45;
        break;
      case 'side':
        P.set(5.3, 2.25, bz * 0.18);
        L.set(0, TABLE_HEIGHT + 0.05, bz * 0.3);
        fov = 38; smoothP = 0.8; smoothL = 0.5;
        break;
      case 'dyn': {
        const k = Math.max(-1, Math.min(1, bz / TABLE_HALF_L)) * s;
        const a = 0.55 - 0.35 * k;           // orbit angle around the table
        const r = 4.3;
        P.set(Math.sin(a) * r * 0.95, 2.0 + Math.max(0, by - 1.1) * 0.4, s * Math.cos(a) * r);
        L.set(bx * 0.55, TABLE_HEIGHT + (by - TABLE_HEIGHT) * 0.45, bz * 0.6);
        fov = 46; smoothP = 0.6; smoothL = 0.18;
        break;
      }
    }
    if (this.transition > 0) {
      this.transition = Math.max(0, this.transition - dt / 1.1);
      smoothP = Math.max(smoothP, 0.5 * this.transition + smoothP);
      smoothL = Math.max(smoothL, 0.35 * this.transition + smoothL);
    }
    const p = this.pos.update(P, smoothP, dt);
    const l = this.look.update(L, smoothL, dt);
    this.camera.position.copy(p);
    this.camera.lookAt(l);
    this.fov += (fov - this.fov) * (1 - Math.exp(-4 * dt));
    if (Math.abs(this.camera.fov - this.fov) > 0.01) { this.camera.fov = this.fov; this.camera.updateProjectionMatrix(); }
  }
}
