import { Vector3 } from 'three';
import { BallState, aeroAcceleration, defaultEnv } from '../physics/ball';
import { GOAL, GRAVITY, PENALTY_SPOT_Z } from '../physics/constants';
import { KeeperBody, SaveMode } from '../characters/keeper';
import { KickerCues } from '../characters/kicker';
import { KeeperProfile, PredictionModel } from './profiles';

/** What a keeper remembers about a taker (per player id). */
export interface TakerMemory {
  left: number;
  right: number;
  center: number;
  last: ('L' | 'C' | 'R')[];
}

export const memoryBank = new Map<string, TakerMemory>();

export function rememberShot(takerId: string, x: number): void {
  const m = memoryBank.get(takerId) ?? { left: 0, right: 0, center: 0, last: [] };
  const side = x < -0.9 ? 'L' : x > 0.9 ? 'R' : 'C';
  if (side === 'L') m.left++;
  else if (side === 'R') m.right++;
  else m.center++;
  m.last.push(side);
  if (m.last.length > 6) m.last.shift();
  memoryBank.set(takerId, m);
}

export interface Prediction {
  /** Where the ball crosses the keeper's hand plane. */
  point: Vector3;
  /** Time from now (s). */
  time: number;
  speed: number;
  valid: boolean;
}

const _acc = new Vector3();
const _env = defaultEnv();

/**
 * Extrapolates the ball the way this keeper perceives it. Lower levels use cruder
 * models (no gravity / no drag / no spin), so curling or dipping shots fool them.
 */
export function predictBall(ball: BallState, model: PredictionModel, planeZ: number, maxT = 1.5): Prediction {
  const p = ball.p.clone();
  const v = ball.v.clone();
  const w = model === 'full' ? ball.w.clone() : new Vector3();
  const q = ball.q.clone();
  const dt = 1 / 120;
  let t = 0;
  if (v.z >= -0.3) return { point: p, time: Infinity, speed: v.length(), valid: false };
  while (t < maxT) {
    const prevZ = p.z;
    if (model === 'linear') {
      _acc.set(0, 0, 0);
    } else if (model === 'ballistic') {
      _acc.set(0, -GRAVITY, 0);
    } else {
      aeroAcceleration(v, w, q, _env, _acc);
    }
    v.addScaledVector(_acc, dt);
    p.addScaledVector(v, dt);
    if (p.y < 0.11 && v.y < 0 && model !== 'linear') {
      p.y = 0.11;
      v.y = -v.y * 0.6;
    }
    t += dt;
    if (p.z <= planeZ) {
      const f = (prevZ - planeZ) / (prevZ - p.z);
      p.addScaledVector(v, -dt * (1 - f));
      return { point: p, time: t - dt * (1 - f), speed: v.length(), valid: true };
    }
  }
  return { point: p, time: maxT, speed: v.length(), valid: false };
}

export interface KeeperSense {
  cues: KickerCues;
  /** Ball state, visible to the keeper at all times. */
  ball: BallState;
  /** Seconds since the strike (negative before it). */
  sinceKick: number;
  kicked: boolean;
  takerId: string;
}

/**
 * Decision-making for the computer goalkeeper. It never "chooses" the outcome:
 * it decides when and where to move; the body's physical limits and the
 * collision of the ball with the posed body decide the rest.
 */
export class KeeperAI {
  state: 'watch' | 'committed' | 'reacting' | 'tracking' | 'done' = 'watch';
  private lockedContactTime = -1;
  private hopped = false;
  private reacted = false;
  private replanTimer = 0;
  private clock = 0;
  committedX: number | null = null;
  lastPrediction: Prediction | null = null;
  /** Explanation of what the keeper read (for the stats panel). */
  readNote = '';

  constructor(public body: KeeperBody, public profile: KeeperProfile) {}

  reset(): void {
    this.state = 'watch';
    this.lockedContactTime = -1;
    this.hopped = false;
    this.reacted = false;
    this.replanTimer = 0;
    this.clock = 0;
    this.committedX = null;
    this.lastPrediction = null;
    this.readNote = '';
  }

  update(dt: number, s: KeeperSense): void {
    this.clock += dt;
    const P = this.profile;
    const body = this.body;
    const cues = s.cues;
    if (!s.kicked) {
      // Small mirror movement on the line while the taker runs.
      const sway = cues.phase === 'run' ? 0.09 * Math.sin(this.clock * 3.1) : 0;
      if (this.state === 'watch') body.setShuffle(sway);
      const ttc = cues.inferredTimeToContact;
      // Rhythm-timed keepers lock their timing ~2 strides out and do not update it.
      if (P.rhythmTimer && this.lockedContactTime < 0 && cues.phase === 'run' && ttc < 0.75) {
        this.lockedContactTime = this.clock + ttc;
      }
      const expected = P.rhythmTimer && this.lockedContactTime > 0 ? this.lockedContactTime - this.clock : ttc;
      // Split step lands at the strike.
      if (!this.hopped && expected < 0.24 && expected > 0 && (cues.phase === 'run' || cues.phase === 'swing')) {
        if (!P.rhythmTimer && cues.stuttering) {
          // patient keepers wait the paradinha out
        } else {
          this.hopped = true;
          body.splitStep();
        }
      }
      // Anticipation.
      if (this.state === 'watch') {
        const guess = this.readTaker(cues, s.takerId);
        const timeToGo = expected + P.commitLead;
        const haveInfo = P.cueRead === 0 || cues.plantYaw !== null || P.rhythmTimer;
        if (guess && haveInfo && timeToGo <= 0.0 && guess.conf >= P.commitThreshold && Math.abs(guess.x) > 1.0) {
          this.commit(guess.x, guess.y, Math.max(0.3, (cues.approachSpeed > 0 ? 0.42 : 0.45)));
        }
      }
      return;
    }
    // After the strike.
    if (s.sinceKick < P.reaction) return;
    const planeZ = body.com.z + 0.2;
    this.replanTimer -= dt;
    if (this.replanTimer <= 0) {
      this.replanTimer = 1 / 30;
      const pred = predictBall(s.ball, P.model, planeZ);
      this.lastPrediction = pred;
      if (!pred.valid) {
        body.handTarget.L = body.handTarget.R = null;
        return;
      }
      if (!this.reacted) {
        this.reacted = true;
        if (this.state === 'watch') this.respond(pred);
        else if (this.state === 'committed' && P.adjustPush && body.phase === 'push') this.respond(pred);
        this.state = 'tracking';
      }
      this.trackHands(pred);
    }
  }

  /** Reads approach, foot, plant and history. Returns a guessed crossing point and confidence. */
  private readTaker(c: KickerCues, takerId: string): { x: number; y: number; conf: number } | null {
    const P = this.profile;
    const foot = c.foot === 'right' ? 1 : -1;
    // Natural side of an angled run: a right-footer coming from his left tends to place it to his left (−x).
    const runShotYaw = Math.atan2(Math.sin(c.runYaw), -Math.cos(c.runYaw));
    const natural = -foot * 2.4;
    let x = natural;
    let conf = 0.3;
    let note = 'lado natural';
    if (c.plantYaw !== null && P.cueRead > 0) {
      const plantShot = Math.atan2(Math.sin(c.plantYaw), -Math.cos(c.plantYaw));
      // Keeper's generic belief: the support foot points ~75 % of the way to the target.
      const est = runShotYaw + (plantShot - runShotYaw) / 0.75;
      const xEst = Math.tan(Math.max(-0.5, Math.min(0.5, est))) * (PENALTY_SPOT_Z - GOAL.postZ);
      x = (1 - P.cueRead) * natural + P.cueRead * xEst;
      conf = 0.25 + 0.6 * P.cueRead * Math.min(1, Math.abs(xEst) / 2.2);
      note = 'pé de apoio';
    }
    const m = memoryBank.get(takerId);
    if (m && P.memory > 0) {
      const tot = m.left + m.right + m.center + 2;
      const bias = (m.right - m.left) / tot;
      // Counter-tendency: a taker who repeats a side gets read.
      x += P.memory * bias * 3;
      conf += P.memory * Math.abs(bias) * 0.8;
      if (Math.abs(bias) > 0.2) note += ' + histórico';
    }
    this.readNote = note;
    if (P.cueRead === 0 && P.memory === 0) {
      // A beginner simply guesses the natural side; this repeats, so it can be exploited.
      return { x: natural, y: 0.9, conf: 1 };
    }
    return { x: Math.max(-3.3, Math.min(3.3, x)), y: 0.9, conf };
  }

  private commit(x: number, y: number, arrival: number): void {
    this.state = 'committed';
    this.committedX = x;
    this.body.dive({ target: new Vector3(x, y, this.body.com.z + 0.25), arrival, mode: 'dive' });
  }

  private respond(pred: Prediction): void {
    const body = this.body;
    const p = pred.point;
    const dx = p.x - body.com.x;
    const adx = Math.abs(dx);
    let mode: SaveMode = 'dive';
    if (adx < 0.45 && p.y > 0.35 && p.y < 1.95) mode = 'stand';
    else if (adx < 0.85 && p.y <= 0.35 && pred.time < 0.32) mode = 'foot';
    else if (adx < 1.25 && p.y < 0.6) mode = 'collapse';
    else if (adx < 1.1 && p.y >= 1.95) mode = 'jump';
    body.dive({ target: p.clone(), arrival: pred.time, mode });
  }

  /** Hands chase the latest perceived interception point (bounded arm speed in the body). */
  private trackHands(pred: Prediction): void {
    const body = this.body;
    const p = pred.point;
    const fast = pred.speed > this.profile.catchSpeed;
    // Parry: push the ball wide (and over for high balls) instead of meeting it flat.
    const wide = Math.sign(p.x - body.com.x) || 1;
    const parry = fast || Math.abs(p.x) > GOAL.halfWidth - 0.8;
    const out = parry ? 0.18 : 0;
    const up = parry && p.y > 1.8 ? 0.12 : 0;
    const base = p.clone();
    base.x += wide * out;
    base.y += up;
    base.z += 0.05;
    const spread = 0.11;
    const lo = base.clone();
    const hi = base.clone();
    // Hands side by side, slightly apart, palms behind the ball.
    lo.x -= spread;
    hi.x += spread;
    body.handTarget.L = hi;
    body.handTarget.R = lo;
  }
}
