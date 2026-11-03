import { Vector3 } from 'three';
import { KeeperAI, KeeperSense, predictBall, rememberShot } from '../ai/keeperAI';
import { KeeperProfile } from '../ai/profiles';
import { KeeperBody } from '../characters/keeper';
import { KickerController, RunUpSetup } from '../characters/kicker';
import { Rig } from '../characters/rig';
import { BALL, GOAL, GOAL_LINE_CROSS_Z, PENALTY_SPOT_Z, SIM_DT } from '../physics/constants';
import {
  ExecutionFactors,
  ExecutionResult,
  KickIntent,
  KickSolution,
  TECHNIQUES,
  executeKick,
  predictCrossing,
  solveKick,
  strikeBall,
  strikeFromExecution,
} from '../physics/kick';
import { PhysicsEvent, PhysicsWorld } from '../physics/world';

export type ShotOutcome = 'goal' | 'saved' | 'post' | 'wide' | 'over' | 'retake';

export interface TakerAttributes {
  precision: number;
  power: number;
  curl: number;
  composure: number;
}

export interface ShotStats {
  outcome: ShotOutcome;
  outcomeLabel: string;
  speedKmh: number;
  flightTime: number;
  distance: number;
  maxHeight: number;
  /** Horizontal and vertical launch angles (deg). */
  dirH: number;
  dirV: number;
  technique: string;
  /** Distance between aim and where the ball (would have) crossed the goal plane (cm). */
  precisionCm: number;
  aim: { x: number; y: number };
  /** Crossing of the goal plane (actual or projected without obstacles). */
  crossing: { x: number; y: number; reached: boolean };
  /** Where the ball met the keeper, post or bar (goal plane coords) if any. */
  contactMark: { x: number; y: number; kind: 'keeper' | 'post' | 'bar' } | null;
  contactOffset: { x: number; y: number };
  spinRpm: number;
  curveCm: number;
  quality: number;
  notes: string[];
  keeperTouched: boolean;
  caught: boolean;
  keeperRead: string;
  encroachment: boolean;
  timing: number | null;
}

export interface SimEvent {
  type: 'kick' | 'post' | 'bar' | 'net' | 'keeper' | 'catch' | 'goal' | 'ground' | 'board' | 'plant' | 'step' | 'end';
  speed: number;
  point: Vector3;
  part?: string;
}

export type SimPhase = 'setup' | 'runup' | 'flight' | 'done';

export interface SimConfig {
  kickerRig: Rig;
  keeperRig: Rig;
  keeperProfile: KeeperProfile;
  /** null → the keeper is controlled manually. */
  keeperAI: boolean;
  takerId: string;
  attributes: TakerAttributes;
  pressure: number;
  /** Empty goal (training without a keeper). */
  noKeeper?: boolean;
}

/**
 * One penalty kick from set-up to outcome. Fixed-step and deterministic: the
 * same inputs produce exactly the same kick.
 */
export class PenaltySim {
  world = new PhysicsWorld();
  kicker: KickerController;
  keeper: KeeperBody;
  ai: KeeperAI | null;
  phase: SimPhase = 'setup';
  time = 0;
  kickTime = -1;
  intent!: KickIntent;
  setup!: RunUpSetup;
  solution: KickSolution | null = null;
  execution: ExecutionResult | null = null;
  aimAtPlant: { x: number; y: number } | null = null;
  timingPress: number | null = null;
  events: SimEvent[] = [];
  stats: ShotStats | null = null;
  private launchState = { v: new Vector3(), w: new Vector3(), p: new Vector3() };
  private projected: { x: number; y: number; reached: boolean } = { x: 0, y: 0, reached: false };
  private straightCrossX = 0;
  private maxH = 0;
  private dist = 0;
  private prevBall = new Vector3();
  private flightEnd = -1;
  private goal = false;
  private crossedOutside: 'wide' | 'over' | null = null;
  private keeperTouched = false;
  private frameHit: 'post' | 'bar' | null = null;
  private contactMark: ShotStats['contactMark'] = null;
  private caught = false;
  private endTimer = -1;
  private encroach = false;
  doneReason = '';
  ballSpot = new Vector3(0, BALL.radius, PENALTY_SPOT_Z);
  /** Keeper plane-of-hands interception, from the AI, for debug/replay. */
  manualDive: ((sim: PenaltySim) => void) | null = null;

  constructor(public cfg: SimConfig) {
    this.kicker = new KickerController(cfg.kickerRig);
    this.keeper = new KeeperBody(cfg.keeperRig, cfg.keeperProfile);
    this.ai = cfg.keeperAI ? new KeeperAI(this.keeper, cfg.keeperProfile) : null;
    this.world.stepDt = SIM_DT;
  }

  /** Prepare a new kick. */
  prepare(setup: RunUpSetup, intent: KickIntent): void {
    this.setup = setup;
    this.intent = { ...intent, target: { ...intent.target } };
    this.world.reset(this.ballSpot);
    this.world.ball.q.setFromAxisAngle(new Vector3(0.3, 1, 0.2).normalize(), 0.7);
    this.keeper.resetToLine(0);
    this.ai?.reset();
    this.phase = 'setup';
    this.time = 0;
    this.kickTime = -1;
    this.execution = null;
    this.timingPress = null;
    this.aimAtPlant = null;
    this.events = [];
    this.stats = null;
    this.maxH = BALL.radius;
    this.dist = 0;
    this.flightEnd = -1;
    this.goal = false;
    this.crossedOutside = null;
    this.keeperTouched = false;
    this.frameHit = null;
    this.contactMark = null;
    this.caught = false;
    this.endTimer = -1;
    this.encroach = false;
    this.doneReason = '';
    this.solve();
    this.kicker.place(setup, this.solution!.yaw);
    this.kicker.setPlannedStrike(this.solution!.strike, this.solution!.yaw, this.solution!.pitch);
    this.kicker.lookTarget.set(0, 1.4, 0);
  }

  /** Re-solve the motor plan (aim/power/technique changed). */
  solve(): void {
    this.intent.approachSpeed = this.phase === 'runup' ? this.kicker.v : this.setup.tempo;
    this.solution = solveKick(this.intent, this.ballSpot);
  }

  updateIntent(patch: Partial<KickIntent>): void {
    Object.assign(this.intent, patch);
    if (patch.target) this.intent.target = { ...patch.target };
    if (this.phase === 'setup' || this.phase === 'runup') {
      this.solve();
      if (this.phase === 'setup') this.kicker.place(this.setup, this.solution!.yaw);
      this.kicker.setPlannedStrike(this.solution!.strike, this.solution!.yaw, this.solution!.pitch);
    }
  }

  startRunUp(): void {
    if (this.phase !== 'setup') return;
    this.phase = 'runup';
    this.kicker.go();
  }

  pressTiming(): void {
    if (this.phase !== 'runup' || this.timingPress !== null) return;
    this.timingPress = this.kicker.t;
  }

  /** Normalised timing (−1 early … +1 late) relative to the plant, window shrinks under pressure. */
  timingError(): number | null {
    if (this.timingPress === null || this.kicker.plantTime < 0) return this.timingPress === null ? null : -1;
    const win = 0.11 * (1 - 0.35 * this.cfg.pressure * (1 - this.cfg.attributes.composure / 100));
    return Math.max(-1, Math.min(1, (this.timingPress - this.kicker.plantTime) / win));
  }

  step(): void {
    const dt = SIM_DT;
    this.time += dt;
    this.events.length = 0;
    const k = this.kicker;
    if (this.phase === 'runup') {
      const prevPlant = k.plantTime;
      const ev = k.update(dt);
      if (prevPlant < 0 && k.plantTime >= 0) {
        this.aimAtPlant = { ...this.intent.target };
        this.events.push({ type: 'plant', speed: k.approachSpeedAtPlant, point: k.feet[k.supportSide].pos.clone() });
      }
      if (ev === 'contact') this.executeStrike();
    } else {
      k.update(dt);
    }

    // Goalkeeper.
    const sense: KeeperSense = {
      cues: k.cues(),
      ball: this.world.ball,
      sinceKick: this.kickTime >= 0 ? this.time - this.kickTime : -1,
      kicked: this.kickTime >= 0,
      takerId: this.cfg.takerId,
    };
    if (this.ai && !this.caught && !this.cfg.noKeeper) this.ai.update(dt, sense);
    if (this.manualDive) this.manualDive(this);
    this.keeper.update(dt, this.kickTime >= 0 ? this.world.ball.p : null);

    // Ball.
    this.world.dynamic = this.kickTime >= 0 && !this.caught && !this.cfg.noKeeper ? this.keeper.capsules : [];
    if (this.caught) {
      const target = this.keeper.handsMid(new Vector3());
      target.z += 0.06;
      this.world.holder = { target, velocity: new Vector3() };
    }
    this.prevBall.copy(this.world.ball.p);
    this.world.step(dt);
    if (this.kickTime >= 0) this.trackFlight();
    for (const e of this.world.events) this.onPhysicsEvent(e);
    if (this.phase === 'flight') this.checkEnd(dt);
  }

  private executeStrike(): void {
    const k = this.kicker;
    const intent = this.intent;
    intent.approachSpeed = k.approachSpeedAtPlant;
    const sol = solveKick(intent, this.ballSpot);
    this.solution = sol;
    const aimNow = intent.target;
    const lateChange = this.aimAtPlant ? Math.hypot(aimNow.x - this.aimAtPlant.x, aimNow.y - this.aimAtPlant.y) * Math.sign(aimNow.x - this.aimAtPlant.x || 1) : 0;
    const runShotYaw = Math.atan2(k.runDir.x, -k.runDir.z);
    const f: ExecutionFactors = {
      timing: this.timingError(),
      plantError: k.plantError,
      approachSpeed: k.approachSpeedAtPlant,
      bodyAngle: runShotYaw,
      lateAimChange: lateChange,
      pressure: this.cfg.pressure,
      precision: this.cfg.attributes.precision,
      composure: this.cfg.attributes.composure,
      curlSkill: this.cfg.attributes.curl,
      powerSkill: this.cfg.attributes.power,
    };
    const ex = executeKick(intent, sol, f);
    this.execution = ex;
    const strike = strikeFromExecution(intent, ex);
    k.applyExecutedStrike(strike, Math.max(0, ex.pitch - sol.pitch));
    // Encroachment: keeper must have part of a foot on/above the line at the strike.
    this.encroach = !this.cfg.noKeeper && this.keeper.feet.L.z > 0.42 && this.keeper.feet.R.z > 0.42;
    strikeBall(this.world.ball, strike);
    this.world.wake();
    this.kickTime = this.time;
    this.phase = 'flight';
    this.launchState.v.copy(this.world.ball.v);
    this.launchState.w.copy(this.world.ball.w);
    this.launchState.p.copy(this.world.ball.p);
    // Where the ball would cross the goal plane with no keeper/frame.
    this.projected = predictCrossing(this.ballSpot, this.world.ball.v, this.world.ball.w, 3);
    // Same launch without spin → curvature measure.
    const straight = predictCrossing(this.ballSpot, this.world.ball.v, new Vector3(), 3);
    this.straightCrossX = straight.x;
    this.events.push({ type: 'kick', speed: this.world.ball.v.length(), point: this.world.ball.p.clone() });
  }

  private trackFlight(): void {
    const b = this.world.ball.p;
    this.maxH = Math.max(this.maxH, b.y);
    if (this.flightEnd < 0) {
      this.dist += b.distanceTo(this.prevBall);
      if (b.z <= GOAL.postZ) this.flightEnd = this.time - this.kickTime;
    }
    // Ball beyond the goal line outside the mouth → miss.
    if (!this.goal && !this.crossedOutside && this.prevBall.z >= GOAL_LINE_CROSS_Z && b.z < GOAL_LINE_CROSS_Z) {
      const inside = Math.abs(b.x) < GOAL.halfWidth && b.y < GOAL.height;
      if (!inside) this.crossedOutside = b.y >= GOAL.height ? 'over' : 'wide';
    }
  }

  private onPhysicsEvent(e: PhysicsEvent): void {
    switch (e.type) {
      case 'goalLine':
        if (e.inside && !this.goal && !this.crossedOutside) {
          this.goal = true;
          this.events.push({ type: 'goal', speed: e.speed, point: e.point });
          this.endTimer = 2.2;
        }
        break;
      case 'post':
      case 'bar':
        if (!this.frameHit && !this.keeperTouched) {
          this.frameHit = e.type;
          this.contactMark = { x: e.point.x, y: e.point.y, kind: e.type };
        }
        if (this.flightEnd < 0) this.flightEnd = this.time - this.kickTime;
        this.events.push({ type: e.type, speed: e.speed, point: e.point, part: e.part });
        break;
      case 'keeper': {
        if (!this.keeperTouched) {
          this.keeperTouched = true;
          this.contactMark = { x: e.point.x, y: e.point.y, kind: 'keeper' };
          if (this.flightEnd < 0) this.flightEnd = this.time - this.kickTime;
        }
        this.events.push({ type: 'keeper', speed: e.speed, point: e.point, part: e.part });
        this.tryCatch(e);
        break;
      }
      case 'net':
        this.events.push({ type: 'net', speed: e.speed, point: e.point, part: e.part });
        break;
      case 'ground':
        this.events.push({ type: 'ground', speed: e.speed, point: e.point });
        break;
      case 'board':
        this.events.push({ type: 'board', speed: e.speed, point: e.point });
        break;
    }
  }

  /** Encaixe: the ball is held if it arrives slow enough into two close gloves. */
  private tryCatch(e: PhysicsEvent): void {
    if (this.caught || this.goal) return;
    const part = e.part ?? '';
    const handish = part.startsWith('hand') || part.startsWith('foreArm') || part === 'torso';
    if (!handish) return;
    const prof = this.cfg.keeperProfile;
    const k = this.keeper;
    const diving = k.phase === 'air' || k.phase === 'push';
    const limit = prof.catchSpeed * (diving ? 0.72 : 1);
    const mid = k.handsMid(new Vector3());
    const near = mid.distanceTo(this.world.ball.p) < 0.3;
    const together = k.handsGap() < 0.4;
    if (e.speed < limit && near && together) {
      this.caught = true;
      k.holding = true;
      this.world.ball.v.multiplyScalar(0.1);
      this.events.push({ type: 'catch', speed: e.speed, point: e.point });
      this.endTimer = 1.6;
    }
  }

  private checkEnd(dt: number): void {
    const w = this.world;
    const t = this.time - this.kickTime;
    if (this.endTimer > 0) {
      this.endTimer -= dt;
      if (this.endTimer <= 0) this.finish('timer');
      return;
    }
    const b = w.ball;
    const leaving = (this.keeperTouched || this.frameHit) && b.v.z > 0.5 && b.p.z > 1.0;
    if (w.resting && t > 0.3) this.finish('rest');
    else if (this.crossedOutside && (b.p.z < -2.5 || w.resting || t > 2.2)) this.finish('out');
    else if (leaving && t > 1.2) this.finish('rebound');
    else if (Math.abs(b.p.x) > 12 || b.p.z > 25 || b.p.z < -6) this.finish('far');
    else if (t > 4.5) this.finish('timeout');
  }

  private finish(reason: string): void {
    if (this.phase === 'done') return;
    this.phase = 'done';
    this.doneReason = reason;
    this.stats = this.buildStats();
    if (this.stats.outcome !== 'retake') rememberShot(this.cfg.takerId, this.projected.x);
    this.events.push({ type: 'end', speed: 0, point: this.world.ball.p.clone() });
  }

  outcome(): ShotOutcome {
    if (this.goal) return 'goal';
    if (this.encroach) return 'retake';
    if (this.keeperTouched) return 'saved';
    if (this.frameHit) return 'post';
    if (this.crossedOutside === 'over' || (this.projected.reached && this.projected.y >= GOAL.height)) return 'over';
    return 'wide';
  }

  private buildStats(): ShotStats {
    const o = this.outcome();
    const labels: Record<ShotOutcome, string> = {
      goal: this.keeperTouched ? 'GOL! (o goleiro tocou)' : this.frameHit ? 'GOL! (trave e dentro)' : 'GOL!',
      saved: this.caught ? 'DEFESA — encaixe' : 'DEFESA',
      post: this.frameHit === 'bar' ? 'NO TRAVESSÃO' : 'NA TRAVE',
      wide: 'PARA FORA',
      over: 'POR CIMA',
      retake: 'REPETIR — goleiro adiantado',
    };
    const v = this.launchState.v;
    const sp = v.length();
    const dirH = (Math.atan2(v.x, -v.z) * 180) / Math.PI;
    const dirV = (Math.atan2(v.y, Math.hypot(v.x, v.z)) * 180) / Math.PI;
    const aim = this.intent.target;
    const pc = this.projected;
    const precision = pc.reached ? Math.hypot(pc.x - aim.x, pc.y - aim.y) * 100 : Math.hypot(pc.x - aim.x, aim.y) * 100;
    return {
      outcome: o,
      outcomeLabel: labels[o],
      speedKmh: sp * 3.6,
      flightTime: this.flightEnd > 0 ? this.flightEnd : this.time - this.kickTime,
      distance: this.dist,
      maxHeight: this.maxH,
      dirH,
      dirV,
      technique: TECHNIQUES[this.intent.technique].label,
      precisionCm: precision,
      aim: { ...aim },
      crossing: { ...pc },
      contactMark: this.contactMark,
      contactOffset: this.execution?.contactOffset ?? { x: 0, y: 0 },
      spinRpm: (this.launchState.w.length() * 60) / (2 * Math.PI),
      curveCm: Math.abs(pc.x - this.straightCrossX) * 100,
      quality: this.execution?.quality ?? 0,
      notes: this.execution?.notes ?? [],
      keeperTouched: this.keeperTouched,
      caught: this.caught,
      keeperRead: this.ai?.readNote ?? '',
      encroachment: this.encroach,
      timing: this.timingError(),
    };
  }

  /** Perfect-execution preview of the current plan (for the trajectory guide). */
  previewPath(): Vector3[] {
    const s = this.solution;
    if (!s) return [];
    const path: Vector3[] = [];
    const tmp = this.world.ball.clone();
    tmp.p.copy(this.ballSpot);
    tmp.v.set(0, 0, 0);
    tmp.w.set(0, 0, 0);
    strikeBall(tmp, s.strike);
    predictCrossing(this.ballSpot, tmp.v, tmp.w, 2, path);
    return path;
  }

  /** Expose the perceived prediction for debugging. */
  keeperPrediction() {
    return predictBall(this.world.ball, this.cfg.keeperProfile.model, this.keeper.com.z + 0.2);
  }
}
