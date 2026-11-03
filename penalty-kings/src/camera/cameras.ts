import { PerspectiveCamera, Vector3 } from 'three';
import { damp } from '../characters/motion';

export type CameraMode = 'behind' | 'firstPerson' | 'side' | 'keeper' | 'tv' | 'cinematic' | 'keeperPOV';

export const CAMERA_LABELS: Record<CameraMode, string> = {
  behind: 'Atrás do cobrador',
  firstPerson: 'Primeira pessoa',
  side: 'Lateral',
  keeper: 'Atrás do goleiro',
  tv: 'Transmissão TV',
  cinematic: 'Cinematográfica',
  keeperPOV: 'Visão do goleiro',
};

export const KICKER_CAMERAS: CameraMode[] = ['behind', 'firstPerson', 'side', 'keeper', 'tv', 'cinematic'];
export const KEEPER_CAMERAS: CameraMode[] = ['keeperPOV', 'keeper', 'tv', 'side', 'behind', 'cinematic'];

export interface CameraContext {
  ball: Vector3;
  ballVel: Vector3;
  kickerPos: Vector3;
  kickerHead: Vector3;
  kickerFwd: Vector3;
  keeperPos: Vector3;
  aim: Vector3;
  kicked: boolean;
  followBall: boolean;
  /** Time since the strike (s). */
  sinceKick: number;
}

/**
 * Camera rigs. Each mode produces a desired eye/target/FOV; transitions are
 * critically damped so cuts feel like a broadcast operator, not a teleport.
 */
export class CameraDirector {
  mode: CameraMode = 'behind';
  eye = new Vector3(0, 1.7, 15);
  target = new Vector3(0, 1.2, 0);
  fov = 42;
  private shakeAmt = 0;
  private shakeT = 0;
  cutNext = true;
  dofFocus = 10;
  dofWanted = false;

  constructor(public camera: PerspectiveCamera) {}

  setMode(m: CameraMode, cut = true): void {
    this.mode = m;
    if (cut) this.cutNext = true;
  }

  shake(a: number): void {
    this.shakeAmt = Math.max(this.shakeAmt, a);
  }

  update(dt: number, c: CameraContext): void {
    const eye = new Vector3();
    const tgt = new Vector3();
    let fov = 42;
    let tau = 0.25;
    let dof = false;
    const followAfterKick = c.kicked && c.followBall && c.sinceKick > 0.05;
    switch (this.mode) {
      case 'behind': {
        // Over the shoulder, slightly high: classic penalty view.
        const back = c.kickerFwd.clone().setY(0).normalize();
        const base = c.kicked ? new Vector3(c.ball.x * 0.0, 0, 11) : c.kickerPos;
        eye.copy(base).addScaledVector(back, c.kicked ? -4.6 : -3.4).add(new Vector3(0, 2.05, 0));
        if (!c.kicked) {
          eye.x = eye.x * 0.55;
          eye.z = Math.max(eye.z, 13.2);
        }
        tgt.set(c.aim.x * 0.25, 1.15, 0);
        fov = 40;
        if (followAfterKick) {
          tgt.lerp(c.ball, 0.55);
          fov = 36;
        }
        break;
      }
      case 'firstPerson': {
        eye.copy(c.kickerHead).add(new Vector3(0, 0.06, 0)).addScaledVector(c.kickerFwd, 0.12);
        tgt.set(c.aim.x * 0.4, 1.0, 0);
        if (!c.kicked) tgt.lerp(c.ball, 0.25);
        else if (c.followBall) tgt.lerp(c.ball, 0.6);
        fov = 64;
        tau = 0.06;
        break;
      }
      case 'side': {
        eye.set(17, 3.2, 6.5);
        tgt.set(0, 1.0, 5.5);
        if (followAfterKick) tgt.lerp(c.ball, 0.5);
        fov = 44;
        break;
      }
      case 'keeper': {
        eye.set(0.6, 2.25, -7.8);
        tgt.set(0, 1.0, 9.5);
        if (followAfterKick) tgt.lerp(c.ball, 0.35);
        fov = 38;
        break;
      }
      case 'keeperPOV': {
        eye.set(c.keeperPos.x * 0.6, 1.95, -1.35);
        tgt.set(c.keeperPos.x * 0.3, 0.9, 11);
        fov = 56;
        tau = 0.12;
        break;
      }
      case 'tv': {
        eye.set(-46, 19, 16);
        tgt.set(0, 0.8, 4.5);
        if (followAfterKick) tgt.lerp(c.ball, 0.4);
        fov = 15;
        break;
      }
      case 'cinematic': {
        if (!c.kicked) {
          const side = c.kickerFwd.clone().cross(new Vector3(0, 1, 0)).normalize();
          eye.copy(c.ball).addScaledVector(side, 1.6).add(new Vector3(0, 0.35, 0.9));
          tgt.copy(c.kickerPos).add(new Vector3(0, 0.7, 0)).lerp(c.ball, 0.5);
          fov = 34;
          this.dofFocus = eye.distanceTo(tgt);
        } else {
          // Chase the ball, low and close, then hold on the goal.
          const v = c.ballVel.clone();
          if (v.lengthSq() < 1) v.set(0, 0, -1);
          v.normalize();
          const chase = c.ball.clone().addScaledVector(v, -2.4).add(new Vector3(0.7, 0.45, 0));
          if (chase.z < 2.5) chase.set(c.ball.x * 0.4 + 1.2, 1.2, 3.0);
          eye.copy(chase);
          tgt.copy(c.ball);
          fov = 40;
          tau = 0.1;
          this.dofFocus = eye.distanceTo(c.ball);
        }
        dof = true;
        break;
      }
    }
    this.dofWanted = dof;
    if (!dof) this.dofFocus = eye.distanceTo(c.kicked ? c.ball : c.kickerPos);
    if (this.cutNext) {
      this.eye.copy(eye);
      this.target.copy(tgt);
      this.fov = fov;
      this.cutNext = false;
    } else {
      const k = damp(dt, tau);
      this.eye.lerp(eye, k);
      this.target.lerp(tgt, damp(dt, tau * 0.7));
      this.fov += (fov - this.fov) * k;
    }
    this.apply(dt);
  }

  /** Directly place the camera (replays). */
  place(eye: Vector3, target: Vector3, fov: number, dt: number, smoothTau = 0): void {
    if (smoothTau <= 0 || this.cutNext) {
      this.eye.copy(eye);
      this.target.copy(target);
      this.fov = fov;
      this.cutNext = false;
    } else {
      this.eye.lerp(eye, damp(dt, smoothTau));
      this.target.lerp(target, damp(dt, smoothTau * 0.7));
      this.fov += (fov - this.fov) * damp(dt, smoothTau);
    }
    this.apply(dt);
  }

  private apply(dt: number): void {
    const cam = this.camera;
    cam.position.copy(this.eye);
    this.shakeT += dt;
    if (this.shakeAmt > 0.001) {
      const s = this.shakeAmt;
      cam.position.x += Math.sin(this.shakeT * 53) * s * 0.03;
      cam.position.y += Math.sin(this.shakeT * 71 + 1) * s * 0.025;
      this.shakeAmt *= Math.exp(-dt * 7);
    }
    cam.lookAt(this.target);
    if (Math.abs(cam.fov - this.fov) > 0.01) {
      cam.fov = this.fov;
      cam.updateProjectionMatrix();
    }
  }
}
