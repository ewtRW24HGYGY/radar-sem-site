import { Vector3 } from 'three';
import { BallState } from './ball';
import { BALL, GOAL, PENALTY_SPOT_Z } from './constants';
import { PhysicsWorld } from './world';

export type Technique = 'placed' | 'power' | 'chip' | 'low' | 'curl' | 'trivela' | 'center';
export type Foot = 'right' | 'left';

export interface TechniqueSpec {
  id: Technique;
  label: string;
  short: string;
  /** Foot speed (m/s) at power 0 and power 1. */
  footSpeed: [number, number];
  /** Effective mass of foot+shank at impact (kg). */
  footMass: number;
  /** Foot–ball coefficient of restitution. */
  restitution: number;
  /** Boot/ball friction (drives spin). */
  friction: number;
  /**
   * Angle between the impulse normal and the foot path in the vertical plane (rad).
   * Positive = contact below the centre (backspin, loft); negative = over the top (topspin).
   */
  contactPitch: number;
  /** Horizontal angle between foot path and impulse normal for a right-footer (rad). Positive curls left. */
  contactYaw: number;
  /** Execution-error multiplier. */
  errorMult: number;
  /** Which part of the foot touches the ball (for animation). */
  surface: 'inside' | 'laces' | 'outside' | 'toeUnder';
  /** How strongly the plant foot/hips reveal the direction (0 = fully disguised). */
  tell: number;
  description: string;
}

export const TECHNIQUES: Record<Technique, TechniqueSpec> = {
  placed: {
    id: 'placed', label: 'Colocado', short: 'COL',
    footSpeed: [9.5, 20.5], footMass: 1.6, restitution: 0.46, friction: 0.55,
    contactPitch: 0.07, contactYaw: 0.07, errorMult: 0.72, surface: 'inside', tell: 0.85,
    description: 'Parte interna do pé. Preciso, potência média, leve efeito natural.',
  },
  power: {
    id: 'power', label: 'Forte', short: 'FOR',
    footSpeed: [12, 24.5], footMass: 2.1, restitution: 0.5, friction: 0.42,
    contactPitch: 0.015, contactYaw: 0, errorMult: 1.3, surface: 'laces', tell: 0.4,
    description: 'Peito do pé. Muito veloz, pouco giro (pode flutuar), menos preciso.',
  },
  chip: {
    id: 'chip', label: 'Cavadinha', short: 'CAV',
    footSpeed: [9.5, 18], footMass: 1.4, restitution: 0.42, friction: 0.62,
    contactPitch: 0.62, contactYaw: 0, errorMult: 1.0, surface: 'toeUnder', tell: 0.3,
    description: 'Ponta do pé por baixo da bola: lenta, alta, com muito backspin.',
  },
  low: {
    id: 'low', label: 'Rasteiro', short: 'RAS',
    footSpeed: [11, 22], footMass: 1.9, restitution: 0.48, friction: 0.48,
    contactPitch: -0.09, contactYaw: 0.03, errorMult: 0.9, surface: 'laces', tell: 0.65,
    description: 'Corpo sobre a bola, contato acima do centro: rasteiro com topspin.',
  },
  curl: {
    id: 'curl', label: 'Efeito', short: 'EFE',
    footSpeed: [10.5, 20], footMass: 1.6, restitution: 0.45, friction: 0.68,
    contactPitch: 0.08, contactYaw: 0.4, errorMult: 1.1, surface: 'inside', tell: 0.7,
    description: 'Parte interna “abraçando” a bola: curva para dentro.',
  },
  trivela: {
    id: 'trivela', label: 'Trivela', short: 'TRI',
    footSpeed: [10.5, 20.5], footMass: 1.7, restitution: 0.46, friction: 0.62,
    contactPitch: 0.05, contactYaw: -0.34, errorMult: 1.25, surface: 'outside', tell: 0.35,
    description: 'Parte externa do pé: curva para fora, difícil de ler.',
  },
  center: {
    id: 'center', label: 'No meio', short: 'MEI',
    footSpeed: [12, 23.5], footMass: 2.0, restitution: 0.5, friction: 0.44,
    contactPitch: 0.03, contactYaw: 0, errorMult: 0.95, surface: 'laces', tell: 0.15,
    description: 'Firme pelo meio. Corpo neutro: engana goleiros que saltam cedo.',
  },
};

export const TECHNIQUE_ORDER: Technique[] = ['placed', 'power', 'chip', 'low', 'curl', 'trivela', 'center'];

/** Direction from yaw (rad, + towards +x) and pitch (rad, + up), shooting towards −z. */
export function dirFromAngles(yaw: number, pitch: number, out = new Vector3()): Vector3 {
  const c = Math.cos(pitch);
  return out.set(Math.sin(yaw) * c, Math.sin(pitch), -Math.cos(yaw) * c);
}

export interface FootStrike {
  /** Foot velocity at impact (m/s). */
  footVelocity: Vector3;
  /** Unit impulse direction: from the contact point towards the ball centre. */
  normal: Vector3;
  footMass: number;
  restitution: number;
  friction: number;
}

export interface StrikeResult {
  v: Vector3;
  w: Vector3;
  /** Contact point on the ball surface (world). */
  contactPoint: Vector3;
  /** Normal impulse (N·s). */
  impulse: number;
}

/**
 * Impact of the foot on a ball at rest (or moving). Two-body impulse along the
 * contact normal with restitution, plus Coulomb friction across the boot that
 * converts the foot's tangential motion into spin. This is the only place that
 * gives the ball its velocity: there is no scripted trajectory.
 */
export function strikeBall(ball: BallState, k: FootStrike): StrikeResult {
  const m = BALL.mass;
  const R = BALL.radius;
  const I = BALL.inertia;
  const M = k.footMass;
  const n = k.normal.clone().normalize();
  const r = n.clone().multiplyScalar(-R); // contact point relative to centre
  const vSurf = new Vector3().crossVectors(ball.w, r).add(ball.v);
  const rel = k.footVelocity.clone().sub(vSurf); // foot relative to ball surface
  const vn = rel.dot(n);
  const out: StrikeResult = { v: ball.v.clone(), w: ball.w.clone(), contactPoint: ball.p.clone().add(r), impulse: 0 };
  if (vn <= 0) return out;
  const jn = ((1 + k.restitution) * vn) / (1 / m + 1 / M);
  ball.v.addScaledVector(n, jn / m);
  const vt = rel.clone().addScaledVector(n, -vn);
  const slip = vt.length();
  if (slip > 1e-6) {
    const jStick = slip / (1 / m + (R * R) / I + 1 / M);
    const jt = Math.min(jStick, k.friction * jn);
    const J = vt.multiplyScalar(jt / slip); // friction drags the ball surface along with the foot
    ball.v.addScaledVector(J, 1 / m);
    ball.w.addScaledVector(new Vector3().crossVectors(r, J), 1 / I);
  }
  out.v.copy(ball.v);
  out.w.copy(ball.w);
  out.impulse = jn;
  return out;
}

export interface KickIntent {
  technique: Technique;
  foot: Foot;
  /** 0..1 normal range, up to 1.15 in the red zone. */
  power: number;
  /** Aim point on the goal plane (x, y). */
  target: { x: number; y: number };
  /** Extra contact offsets chosen by the player (rad): + backspin / − topspin, + curl left / − curl right. */
  spinPitch: number;
  spinYaw: number;
  /** Approach speed at the plant (m/s) — adds foot speed. */
  approachSpeed: number;
}

export interface KickSolution {
  /** Impulse normal angles. */
  yaw: number;
  pitch: number;
  footSpeed: number;
  contactPitch: number;
  contactYaw: number;
  strike: FootStrike;
  /** Predicted crossing of the goal plane with perfect execution. */
  predicted: { x: number; y: number; time: number; reached: boolean };
}

export function footSpeedFor(spec: TechniqueSpec, power: number, approachSpeed: number): number {
  const p = Math.max(0, power);
  const base = spec.footSpeed[0] + (spec.footSpeed[1] - spec.footSpeed[0]) * Math.min(p, 1);
  const over = Math.max(0, p - 1) / 0.15; // red zone adds up to +6 %
  const runBonus = 1 + 0.025 * Math.max(0, Math.min(3, approachSpeed - 2.5));
  return base * (1 + 0.06 * over) * runBonus;
}

export function buildStrike(
  spec: TechniqueSpec,
  foot: Foot,
  yaw: number,
  pitch: number,
  footSpeed: number,
  contactPitch: number,
  contactYaw: number,
): FootStrike {
  const sign = foot === 'right' ? 1 : -1;
  const normal = dirFromAngles(yaw, pitch);
  // Foot path is the normal rotated back by the contact offsets.
  const footDir = dirFromAngles(yaw + sign * contactYaw, pitch - contactPitch);
  return {
    footVelocity: footDir.multiplyScalar(footSpeed),
    normal,
    footMass: spec.footMass,
    restitution: spec.restitution,
    friction: spec.friction,
  };
}

const _predWorld = new PhysicsWorld();
_predWorld.frame = []; // free flight + turf only (the kicker aims, he doesn't model the posts)

/** Simulates where a launched ball crosses the goal plane (z = goal post axis). */
export function predictCrossing(
  start: Vector3,
  v: Vector3,
  w: Vector3,
  maxTime = 3,
  path?: Vector3[],
  world: PhysicsWorld = _predWorld,
): { x: number; y: number; time: number; reached: boolean } {
  world.reset(start);
  world.ball.v.copy(v);
  world.ball.w.copy(w);
  world.wake();
  const dt = 1 / 240;
  const zPlane = GOAL.postZ;
  let t = 0;
  let prev = start.clone();
  while (t < maxTime) {
    prev.copy(world.ball.p);
    world.step(dt);
    t += dt;
    if (path && Math.round(t / dt) % 3 === 0) path.push(world.ball.p.clone());
    const p = world.ball.p;
    if (p.z <= zPlane) {
      const f = (prev.z - zPlane) / (prev.z - p.z);
      return { x: prev.x + (p.x - prev.x) * f, y: prev.y + (p.y - prev.y) * f, time: t - dt + f * dt, reached: true };
    }
    if (world.resting || (world.ball.v.z > 0 && t > 0.1)) break;
  }
  const p = world.ball.p;
  return { x: p.x, y: p.y, time: t, reached: false };
}

/**
 * The kicker's motor plan: find the impulse direction that sends the ball to the
 * intended target given gravity, drag, Magnus and the technique's spin. Uses
 * Newton iterations on the full flight model (this is what a skilled player's
 * motor memory does). Execution errors are applied afterwards.
 */
export function solveKick(intent: KickIntent, ballPos: Vector3 = new Vector3(0, BALL.radius, PENALTY_SPOT_Z)): KickSolution {
  const spec = TECHNIQUES[intent.technique];
  const fs = footSpeedFor(spec, intent.power, intent.approachSpeed);
  const cp = spec.contactPitch + intent.spinPitch;
  const cy = spec.contactYaw + intent.spinYaw;
  const tx = intent.target.x;
  const ty = intent.target.y;
  const dist = ballPos.z - GOAL.postZ;
  const tmp = new BallState();

  const evalAngles = (yaw: number, pitch: number) => {
    tmp.p.copy(ballPos);
    tmp.v.set(0, 0, 0);
    tmp.w.set(0, 0, 0);
    const strike = buildStrike(spec, intent.foot, yaw, pitch, fs, cp, cy);
    strikeBall(tmp, strike);
    return predictCrossing(ballPos, tmp.v, tmp.w, 3);
  };

  // Initial guess from a drag-free ballistic estimate.
  let yaw = Math.atan2(tx - ballPos.x, dist);
  const vEst = fs * 1.15;
  const tEst = dist / Math.max(4, vEst);
  // A ball on the grass cannot be struck by a foot travelling down into the turf.
  const pitchMin = Math.max(-0.15, cp - 0.06);
  let pitch = Math.atan2(ty - ballPos.y + 0.5 * 9.81 * tEst * tEst, dist) + cp * 0.5;
  pitch = Math.max(pitchMin, Math.min(1.1, pitch));

  let best = { yaw, pitch, err: Infinity, res: evalAngles(yaw, pitch) };
  const h = 0.003;
  for (let it = 0; it < 8; it++) {
    const r0 = it === 0 ? best.res : evalAngles(yaw, pitch);
    const ex = r0.x - tx;
    const ey = r0.reached ? r0.y - ty : -3; // fell short: needs more loft
    const err = Math.hypot(ex, ey);
    if (err < best.err) best = { yaw, pitch, err, res: r0 };
    if (err < 0.01) break;
    const ry = evalAngles(yaw + h, pitch);
    const rp = evalAngles(yaw, pitch + h);
    const j11 = (ry.x - r0.x) / h;
    const j21 = ((ry.reached ? ry.y : -3) - (r0.reached ? r0.y : -3)) / h;
    const j12 = (rp.x - r0.x) / h;
    const j22 = ((rp.reached ? rp.y : -3) - (r0.reached ? r0.y : -3)) / h;
    const det = j11 * j22 - j12 * j21;
    if (Math.abs(det) < 1e-6) {
      pitch += ey < 0 ? 0.04 : -0.02;
      continue;
    }
    let dy = (-ex * j22 + ey * j12) / det;
    let dp = (-ey * j11 + ex * j21) / det;
    const lim = 0.15;
    dy = Math.max(-lim, Math.min(lim, dy));
    dp = Math.max(-lim, Math.min(lim, dp));
    yaw += dy;
    pitch = Math.max(pitchMin, Math.min(1.25, pitch + dp));
  }
  const strike = buildStrike(spec, intent.foot, best.yaw, best.pitch, fs, cp, cy);
  return {
    yaw: best.yaw,
    pitch: best.pitch,
    footSpeed: fs,
    contactPitch: cp,
    contactYaw: cy,
    strike,
    predicted: best.res,
  };
}

// ------------------------------------------------------------------ execution

export interface ExecutionFactors {
  /** Timing of the strike button: −1 early … +1 late, 0 perfect. null = not pressed. */
  timing: number | null;
  /** Plant foot misplacement along the run (m): + too far behind the ball, − too close. */
  plantError: number;
  /** Approach speed at the plant (m/s). */
  approachSpeed: number;
  /** Angle between the run direction and the shot direction (rad, signed: + towards +x). */
  bodyAngle: number;
  /** Aim changed after the plant foot landed (m on the goal plane). */
  lateAimChange: number;
  /** 0..1 pressure of the moment (decisive kick). */
  pressure: number;
  /** Player attributes 0..100. */
  precision: number;
  composure: number;
  curlSkill: number;
  powerSkill: number;
}

export interface ExecutionResult {
  yaw: number;
  pitch: number;
  footSpeed: number;
  contactPitch: number;
  contactYaw: number;
  /** Vertical/horizontal contact offset on the ball for the stats (m, + up / + right). */
  contactOffset: { x: number; y: number };
  /** 0..100 quality of the strike. */
  quality: number;
  notes: string[];
}

/**
 * Turns the intention into the actual motion of the foot. Every deviation comes
 * from what the player did: timing of the strike, overpowering, a sprint run-up,
 * a stride that did not end where it should, a body opened against the run,
 * a late change of mind, pressure vs composure. There is no random number here.
 */
export function executeKick(intent: KickIntent, sol: KickSolution, f: ExecutionFactors): ExecutionResult {
  const spec = TECHNIQUES[intent.technique];
  const sign = intent.foot === 'right' ? 1 : -1;
  const notes: string[] = [];
  const skill = 1.3 - 0.75 * (f.precision / 100);
  const comp = 1 + f.pressure * (1.1 - f.composure / 100);
  const scale = spec.errorMult * skill * comp;

  // Timing: missing the press counts as moderately late.
  let t = f.timing === null ? 0.45 : f.timing;
  if (f.timing === null) notes.push('Sem timing: contato padrão');
  if (Math.abs(t) < 0.12) t = 0; // perfect window
  const over = Math.max(0, intent.power - 1) / 0.15;
  const sprint = Math.max(0, f.approachSpeed - 4.3) / 2.2;
  const plant = Math.max(-1, Math.min(1, f.plantError / 0.18));

  // Natural side: a right-footer opening the body to his right with the inside of the foot is awkward.
  const across = sign * (sol.yaw - f.bodyAngle);
  const unnatural = spec.surface === 'inside' ? Math.max(0, across - 0.12) * 1.6 : Math.max(0, -across - 0.25) * 0.6;

  let dPitch = -t * 0.06 + over * 0.07 + sprint * 0.025 + plant * 0.045;
  let dYaw = sign * (t * 0.035 - over * 0.022) - sign * unnatural * 0.03;
  dYaw += Math.sign(f.lateAimChange) * Math.min(0.05, Math.abs(f.lateAimChange) * 0.03);
  dPitch *= scale;
  dYaw *= scale;
  // Sprint/overpower also widen the spread through the swing direction.
  const speedLoss = 1 - 0.09 * Math.abs(t) - 0.05 * Math.abs(plant) + 0.015 * sprint * (f.powerSkill / 100);
  const footSpeed = sol.footSpeed * speedLoss * (0.94 + 0.08 * (f.powerSkill / 100));

  // Contact offset on the ball: early = under the ball, late = over it; plant too far = under.
  const cOffV = (t * 0.028 - plant * 0.02) * spec.errorMult;
  const contactPitch = sol.contactPitch - cOffV / BALL.radius;
  const curlGain = 0.85 + 0.3 * (f.curlSkill / 100);
  const contactYaw = sol.contactYaw * (spec.contactYaw !== 0 ? curlGain : 1) + sign * t * 0.04;

  if (t < -0.3) notes.push('Chute antecipado: corpo para trás');
  else if (t > 0.3) notes.push('Chute atrasado: pegou por cima');
  if (over > 0.05) notes.push('Potência excessiva');
  if (sprint > 0.3) notes.push('Corrida rápida demais');
  if (Math.abs(plant) > 0.4) notes.push(plant > 0 ? 'Pé de apoio longe da bola' : 'Pé de apoio colado à bola');
  if (unnatural > 0.15) notes.push('Lado não natural');
  if (Math.abs(f.lateAimChange) > 0.4) notes.push('Mudou de ideia tarde');

  const errMag = Math.hypot(dPitch, dYaw) + Math.abs(1 - speedLoss) * 0.2;
  const quality = Math.max(0, Math.min(100, 100 - errMag * 900));
  return {
    yaw: sol.yaw + dYaw,
    pitch: sol.pitch + dPitch,
    footSpeed,
    contactPitch,
    contactYaw,
    contactOffset: {
      // + = contact on the right half of the ball (seen from behind), which curls it left.
      x: sign * Math.sin(contactYaw) * BALL.radius * 0.9,
      y: -Math.sin(contactPitch) * BALL.radius,
    },
    quality,
    notes,
  };
}

export function strikeFromExecution(intent: KickIntent, ex: ExecutionResult): FootStrike {
  return buildStrike(TECHNIQUES[intent.technique], intent.foot, ex.yaw, ex.pitch, ex.footSpeed, ex.contactPitch, ex.contactYaw);
}
