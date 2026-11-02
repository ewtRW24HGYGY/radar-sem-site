// Helpers to build racket orientations. Racket local frame: origin at the blade centre,
// +z = forehand rubber normal (red), +y = towards the blade tip, handle along -y.
import { V3, Quat } from '../physics/math.js';

const _x = new V3(), _y = new V3(), _z = new V3();

// n: the normal of the rubber that will touch the ball (world space)
// face: +1 forehand rubber, -1 backhand rubber
// tip: preferred direction for the blade tip (world space)
export function paddleQuatFromNormal(n, face, tip, out = new Quat()) {
  _z.copy(n).scale(face);
  _y.copy(tip).addScaled(_z, -tip.dot(_z));
  if (_y.lengthSq() < 1e-6) {
    _y.set(0, 1, 0).addScaled(_z, -_z.y);
    if (_y.lengthSq() < 1e-6) _y.set(1, 0, 0).addScaled(_z, -_z.x);
  }
  _y.normalize();
  _x.crossVectors(_y, _z);
  return out.setFromBasis(_x, _y, _z);
}

// Natural blade-tip direction for a shakehand grip.
// side: +1 for the player at +z (right = +x), -1 for the player at -z (right = -x).
// forehand: tip points up and out to the right; backhand: up and across to the left.
export function naturalTip(side, forehand, out = new V3(), lift = 0.55) {
  const right = side; // x of the player's right-hand direction
  return out.set((forehand ? 0.85 : -0.8) * right, lift, 0).normalize();
}

// Normal pointing at the opponent, pitched (positive = closed face, pointing down)
// and yawed (positive turns towards +x).
export function aimNormal(side, pitch, yaw, out = new V3()) {
  const fwd = -side; // direction of play along z
  const c = Math.cos(pitch);
  return out.set(Math.sin(yaw) * c, -Math.sin(pitch), fwd * Math.cos(yaw) * c).normalize();
}
