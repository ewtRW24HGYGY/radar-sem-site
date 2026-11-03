import { Color, Plane, Quaternion, Raycaster, Vector2, Vector3 } from 'three';
import { AudioSystem } from '../audio/audio';
import { CameraContext, CameraDirector, CameraMode, KEEPER_CAMERAS, KICKER_CAMERAS, CAMERA_LABELS } from '../camera/cameras';
import { Rig } from '../characters/rig';
import { RunUpSetup } from '../characters/kicker';
import { Input } from '../input/input';
import { BALL, GOAL, PENALTY_SPOT_Z, SIM_DT } from '../physics/constants';
import { TECHNIQUES, TECHNIQUE_ORDER, Technique, KickIntent } from '../physics/kick';
import { RenderSystem } from '../render/renderer';
import { buildHumanoid, Appearance } from '../render/humanoid';
import { ReplayRecorder } from '../replay/replay';
import { UI } from '../ui/ui';
import { CpuKickPlan, planCpuKick } from '../ai/kickerAI';
import { Difficulty, KEEPERS } from '../ai/profiles';
import { memoryBank } from '../ai/keeperAI';
import { CareerMode, Drill, KickSpec, ModeController, PrecisionMode, ShootoutMode, TrainingMode } from './modes';
import { PenaltySim, SimEvent } from './penaltySim';
import { Settings, load, recordShot, resetStats, save } from './storage';
import { TEAMS, Team, appearanceFor, keeperAppearance, userPlayer } from './teams';
import { clamp, damp } from '../characters/motion';

type State = 'menu' | 'aim' | 'charge' | 'keeperWait' | 'run' | 'flight' | 'result' | 'replay';

const WIND: Record<Settings['wind'], number> = { none: 0, light: 2.5, strong: 6 };

interface CachedRig {
  rig: Rig;
}

export class Game {
  rs!: RenderSystem;
  input: Input;
  audio = new AudioSystem();
  ui: UI;
  cam!: CameraDirector;
  settings: Settings;
  state: State = 'menu';
  mode: ModeController | null = null;
  modeFactory: (() => ModeController) | null = null;
  spec: KickSpec | null = null;
  sim: PenaltySim | null = null;
  private rigCache = new Map<string, CachedRig>();
  private kickerRig: Rig | null = null;
  private keeperRig: Rig | null = null;
  recorder = new ReplayRecorder();
  // Kick set-up (user)
  technique: Technique = 'placed';
  foot: 'right' | 'left' = 'right';
  runDist = 4.5;
  runAngle = 0.55;
  tempo = 3.6;
  aim = new Vector2(-2.4, 0.9);
  spin = new Vector2();
  power = 0;
  private solveTimer = 0;
  private dirty = true;
  private cpuPlan: CpuKickPlan | null = null;
  private stateT = 0;
  private acc = 0;
  private last = 0;
  private prevBall = new Vector3();
  private ballInterp = new Vector3();
  private time = 0;
  private timingMsg: { text: string; color: string; t: number } | null = null;
  private crowdJump = { home: 0, away: 0 };
  private excitement = 0.35;
  private tension = 0;
  private pulse = 0;
  private replay = { t: 0, speed: 0.25, playing: true, angle: 0, auto: false, autoStep: 0, trail: true, liveNet: null as Float32Array | null };
  private replayAngles: CameraMode[] = ['side', 'keeper', 'cinematic', 'tv', 'behind', 'firstPerson'];
  private keeperTarget: Vector2 | null = null;
  private cameraMode: CameraMode = 'behind';
  private resultShown = false;
  private touch = false;
  private notable = false;
  private kickSurface = 'inside';
  private frameNo = 0;
  private raycaster = new Raycaster();
  private goalPlane = new Plane(new Vector3(0, 0, 1), -GOAL.postZ);
  private menuSim: PenaltySim | null = null;
  private keeperDiveSent = false;

  constructor(private app: HTMLElement, private view: HTMLElement) {
    this.settings = load().settings;
    this.ui = new UI(app);
    this.input = new Input(view);
    this.touch = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    this.foot = this.settings.foot;
    this.audio.narrator = this.settings.narrator;
    this.audio.setVolumes({ master: this.settings.master, crowd: this.settings.crowd, sfx: this.settings.sfx });
    this.bindUi();
  }

  async boot(): Promise<void> {
    const step = (p: number) => new Promise<void>((r) => { this.ui.loading(p); requestAnimationFrame(() => r()); });
    await step(0.05);
    try {
      await Promise.race([
        Promise.all([document.fonts.load('800 40px "Big Shoulders Display"'), document.fonts.load('400 16px "Archivo"')]),
        new Promise((r) => setTimeout(r, 2500)),
      ]);
    } catch {
      /* fonts optional */
    }
    await step(0.2);
    this.buildRenderer();
    await step(0.75);
    this.enterMenu();
    await step(1);
    this.ui.hideLoading();
    this.last = performance.now();
    requestAnimationFrame(this.frame);
  }

  private buildRenderer(): void {
    const teams = this.spec ? [this.spec.kickerTeam, this.spec.keeperTeam] : [TEAMS[0], TEAMS[1]];
    const home = (this.spec?.userTeamIsKicking ?? true) ? teams[0] : teams[1];
    const away = home === TEAMS[0] ? TEAMS[1] : TEAMS[0];
    this.rs = new RenderSystem(this.view, this.settings.quality, this.settings.timeOfDay, { home: home.crowd, away: away.crowd });
    this.cam = new CameraDirector(this.rs.camera);
    if (this.kickerRig) this.rs.characters.add(this.kickerRig.root);
    if (this.keeperRig) this.rs.characters.add(this.keeperRig.root);
  }

  // ------------------------------------------------------------------ UI wiring

  private bindUi(): void {
    const ui = this.ui;
    ui.handlers = {
      audioUnlock: () => void this.audio.start(),
      quick: () => {
        const lvl = this.settings.difficulty;
        this.start(() => new ShootoutMode([TEAMS[0], TEAMS[1]], 0, lvl, (Date.now() / 1000) | 0));
      },
      training: (level, drill) => this.start(() => this.trainingMode(level, drill)),
      shootout: (team, level, first) => {
        const t: [Team, Team] = team === 0 ? [TEAMS[0], TEAMS[1]] : [TEAMS[1], TEAMS[0]];
        this.start(() => new ShootoutMode(t, first, level, (Date.now() / 1000) | 0));
      },
      precision: (level, keeper) => this.start(() => new PrecisionMode(level, 8, this.userPlayer(), TEAMS[0], TEAMS[1], keeper)),
      career: () => this.start(() => new CareerMode(load().career, TEAMS[0], TEAMS[1])),
      settingsChanged: (s, rebuild) => this.applySettings(s, rebuild),
      resetStats: () => resetStats(),
      careerSpend: (k) => {
        const c = load().career;
        if (c.points > 0 && c.attrs[k] < 99) {
          c.points--;
          c.attrs[k]++;
          save();
        }
      },
      careerRename: (name) => {
        load().career.name = name.slice(0, 14);
        save();
      },
    };
    ui.techClick = (t) => this.setTechnique(t);
    ui.setupClick = (k) => this.setupEdit(k);
    ui.touchHandlers = {
      action: (d) => (this.input.virtual.action = d),
      stutter: () => {
        this.input.virtual.stutter = true;
        setTimeout(() => (this.input.virtual.stutter = false), 60);
      },
      faster: (d) => (this.input.virtual.faster = d),
      slower: (d) => (this.input.virtual.slower = d),
      camera: () => this.cycleCamera(),
      pause: () => this.togglePause(),
    };
  }

  private userPlayer() {
    const c = load().career;
    return userPlayer(c.name, c.attrs, this.settings.foot);
  }

  private trainingMode(level: Difficulty | 'none', drill: Drill): ModeController {
    return new TrainingMode(level, drill, this.userPlayer(), TEAMS[0], TEAMS[1]);
  }

  private applySettings(s: Settings, rebuild: boolean): void {
    const prev = this.settings;
    Object.assign(load().settings, s);
    this.settings = load().settings;
    save();
    this.audio.narrator = s.narrator;
    this.audio.setVolumes({ master: s.master, crowd: s.crowd, sfx: s.sfx });
    this.foot = s.foot;
    if (rebuild) {
      if (prev.quality !== s.quality || !this.rs) {
        this.rs.dispose();
        this.buildRenderer();
        if (this.spec?.targets) this.rs.hoops.set(this.spec.targets, GOAL.postZ);
        if (this.state === 'menu') this.cam.setMode('tv');
      } else {
        this.rs.setupAtmosphere(s.timeOfDay);
      }
    }
    if (this.sim) this.sim.world.env.wind.set(WIND[s.wind], 0, -0.3 * WIND[s.wind]);
    this.cameraMode = this.spec?.role === 'keep' ? s.keeperCamera : s.kickerCamera;
    if (this.state !== 'menu') this.cam.setMode(this.cameraMode, false);
  }

  private start(factory: () => ModeController): void {
    void this.audio.start();
    memoryBank.clear();
    this.modeFactory = factory;
    this.mode = factory();
    this.ui.hideMenu();
    this.ui.closePanel();
    this.menuSim = null;
    this.nextKick();
  }

  enterMenu(): void {
    this.state = 'menu';
    this.mode = null;
    this.spec = null;
    this.ui.hideResult();
    this.ui.hideReplayBar();
    this.ui.hidePause();
    this.ui.showMenu();
    this.rs.hoops.set([], 0);
    this.rs.aim.group.visible = false;
    this.rs.trail.clear();
    // Ambient scene: a taker waiting at the spot, keeper on his line.
    const k = TEAMS[0].players[0];
    this.useRigs(appearanceFor(TEAMS[0], k), { height: k.height, build: k.build }, keeperAppearance(TEAMS[1], 'pro'), KEEPERS.pro.height);
    this.menuSim = new PenaltySim({
      kickerRig: this.kickerRig!,
      keeperRig: this.keeperRig!,
      keeperProfile: KEEPERS.pro,
      keeperAI: true,
      takerId: 'menu',
      attributes: k.attrs,
      pressure: 0,
    });
    this.menuSim.prepare(
      { ball: new Vector3(0, BALL.radius, PENALTY_SPOT_Z), foot: 'right', distance: 3.2, angle: 0.5, tempo: 3.5, technique: 'placed' },
      { technique: 'placed', foot: 'right', power: 0.8, target: { x: -2.5, y: 1 }, spinPitch: 0, spinYaw: 0, approachSpeed: 3.5 },
    );
    this.sim = null;
    this.rs.goal.net.reset();
    this.audio.setChant(true);
    this.excitement = 0.45;
    this.tension = 0;
  }

  // ------------------------------------------------------------------ rigs

  private rigFor(key: string, app: Appearance, dims: { height: number; build: number }): Rig {
    const hit = this.rigCache.get(key);
    if (hit) return hit.rig;
    const rig = new Rig(dims);
    buildHumanoid(rig, app);
    this.rigCache.set(key, { rig });
    return rig;
  }

  private useRigs(kApp: Appearance, kDims: { height: number; build: number }, gApp: Appearance, gHeight: number): void {
    const kKey = `k-${kApp.name}-${kApp.number}-${kApp.kit.primary}`;
    const gKey = `g-${gApp.name}-${gApp.kit.primary}-${gApp.gloves}`;
    const kr = this.rigFor(kKey, kApp, kDims);
    const gr = this.rigFor(gKey, gApp, { height: gHeight, build: 1.08 });
    if (this.kickerRig && this.kickerRig !== kr) this.rs.characters.remove(this.kickerRig.root);
    if (this.keeperRig && this.keeperRig !== gr) this.rs.characters.remove(this.keeperRig.root);
    this.kickerRig = kr;
    this.keeperRig = gr;
    this.rs.characters.add(kr.root, gr.root);
  }

  // ------------------------------------------------------------------ kick lifecycle

  private nextKick(): void {
    const mode = this.mode!;
    const retake = mode.retake && this.spec;
    const spec = retake ? this.spec! : mode.next();
    if (mode.retake) mode.retake = false;
    if (!spec) {
      this.finishMode();
      return;
    }
    this.spec = spec;
    const keeperLevel: Difficulty = spec.keeperLevel === 'none' ? 'beginner' : spec.keeperLevel;
    const prof = KEEPERS[keeperLevel];
    const keeperName = spec.role === 'keep' ? spec.keeperTeam.keeper.name : spec.keeperLevel === 'none' ? '—' : prof.name;
    this.useRigs(
      appearanceFor(spec.kickerTeam, spec.kicker),
      { height: spec.kicker.height, build: spec.kicker.build },
      keeperAppearance(spec.keeperTeam, keeperLevel, keeperName),
      spec.role === 'keep' ? 1.88 : prof.height,
    );
    this.keeperRig!.root.visible = spec.keeperLevel !== 'none';
    const sim = new PenaltySim({
      kickerRig: this.kickerRig!,
      keeperRig: this.keeperRig!,
      keeperProfile: spec.role === 'keep' ? KEEPERS.advanced : prof,
      keeperAI: spec.role === 'kick' && spec.keeperLevel !== 'none',
      takerId: spec.kicker.id,
      attributes: spec.attrs,
      pressure: spec.pressure,
      noKeeper: spec.keeperLevel === 'none',
    });
    sim.world.env.wind.set(WIND[this.settings.wind], 0, -0.3 * WIND[this.settings.wind]);
    this.sim = sim;
    let setup: RunUpSetup;
    let intent: KickIntent;
    if (spec.role === 'kick') {
      const isUserChar = spec.kicker.id === 'user';
      if (!isUserChar) {
        this.foot = spec.kicker.foot;
        this.runDist = spec.kicker.run.distance;
        this.runAngle = spec.kicker.run.angle;
        this.tempo = spec.kicker.run.tempo;
        if (!retake) this.technique = spec.kicker.favorite;
      } else {
        this.foot = this.settings.foot;
      }
      if (!retake) {
        this.aim.set(this.foot === 'right' ? -2.3 : 2.3, 0.8);
        this.spin.set(0, 0);
      }
      if (spec.targets?.length) this.aim.set(spec.targets[0].x, spec.targets[0].y);
      setup = this.currentSetup();
      intent = this.currentIntent();
      this.cpuPlan = null;
      this.cameraMode = this.settings.kickerCamera;
      this.state = 'aim';
    } else {
      const plan = (this.cpuPlan = planCpuKick(spec.kicker, spec.cpuSeed, spec.pressure));
      setup = { ball: new Vector3(0, BALL.radius, PENALTY_SPOT_Z), foot: spec.kicker.foot, distance: plan.run.distance, angle: plan.run.angle, tempo: plan.run.tempo, technique: plan.intent.technique };
      intent = plan.intent;
      this.cameraMode = this.settings.keeperCamera;
      this.state = 'keeperWait';
      this.keeperTarget = null;
    }
    sim.prepare(setup, intent);
    this.power = 0;
    this.stateT = 0;
    this.acc = 0;
    this.resultShown = false;
    this.keeperDiveSent = false;
    this.notable = false;
    this.timingMsg = null;
    this.recorder.clear();
    this.rs.goal.net.reset();
    this.rs.trail.clear();
    this.rs.hoops.set(spec.targets ?? [], GOAL.postZ);
    this.rs.guide.mesh.count = 0;
    this.prevBall.copy(sim.world.ball.p);
    this.cam.setMode(this.cameraMode);
    this.ui.hideResult();
    this.ui.hideReplayBar();
    this.ui.showHud(spec.role, this.touch);
    this.ui.setScoreboard(this.mode!.scoreboard());
    this.ui.setKickerCard(spec.kicker.name, spec.kicker.number, spec.kicker.foot, spec.attrs, spec.kickerTeam.name, spec.role === 'kick');
    this.ui.setKeeperCard(keeperName, spec.role === 'keep' ? 'user' : spec.keeperLevel);
    this.ui.setTechnique(this.technique);
    this.ui.setLabel(spec.label, spec.role === 'kick' ? `${spec.kicker.name} na marca` : `Defenda: ${spec.kicker.name}`);
    this.ui.setKickControlsVisible(true);
    this.audio.setChant(spec.pressure < 0.5);
    this.excitement = 0.4 + 0.35 * spec.pressure;
    this.dirty = true;
    this.updateStadiumScreens(spec.role === 'kick' ? spec.kicker.name.toUpperCase() : 'DEFENDA!', spec.label);
    setTimeout(() => this.audio.whistle(), 700);
  }

  private currentSetup(): RunUpSetup {
    return {
      ball: new Vector3(0, BALL.radius, PENALTY_SPOT_Z),
      foot: this.foot,
      distance: this.runDist,
      angle: this.runAngle,
      tempo: this.tempo,
      technique: this.technique,
    };
  }

  private currentIntent(): KickIntent {
    const sign = this.foot === 'right' ? 1 : -1;
    return {
      technique: this.technique,
      foot: this.foot,
      power: Math.max(0.05, this.power || 0.8),
      target: { x: this.aimWithSway().x, y: this.aimWithSway().y },
      spinPitch: -this.spin.y * 0.18,
      spinYaw: sign * this.spin.x * 0.16,
      approachSpeed: this.tempo,
    };
  }

  /** Under pressure the aim drifts (nerves); the player has to compensate. */
  private aimWithSway(): Vector2 {
    const spec = this.spec;
    if (!spec) return this.aim;
    const nerves = spec.pressure * (1.1 - spec.attrs.composure / 100);
    const t = this.time;
    const a = 0.42 * nerves;
    return new Vector2(this.aim.x + a * (Math.sin(t * 1.7) * 0.7 + Math.sin(t * 3.9 + 1.3) * 0.3), this.aim.y + a * 0.6 * Math.sin(t * 2.3 + 0.6));
  }

  setTechnique(t: Technique): void {
    if (this.state !== 'aim' || !this.sim) return;
    this.technique = t;
    this.ui.setTechnique(t);
    this.reprepare();
  }

  private setupEdit(k: string): void {
    if (this.state !== 'aim') return;
    if (k === 'd-') this.runDist = clamp(this.runDist - 0.5, 1.5, 7.5);
    if (k === 'd+') this.runDist = clamp(this.runDist + 0.5, 1.5, 7.5);
    if (k === 'a-') this.runAngle = clamp(this.runAngle - 0.1, -0.35, 1.05);
    if (k === 'a+') this.runAngle = clamp(this.runAngle + 0.1, -0.35, 1.05);
    if (k === 't-') this.tempo = clamp(this.tempo - 0.2, 2.2, 5.4);
    if (k === 't+') this.tempo = clamp(this.tempo + 0.2, 2.2, 5.4);
    if (k === 'f') this.foot = this.foot === 'right' ? 'left' : 'right';
    this.reprepare();
  }

  private reprepare(): void {
    if (!this.sim) return;
    this.sim.prepare(this.currentSetup(), this.currentIntent());
    this.dirty = false;
    if (this.settings.guide && this.mode?.id === 'training') this.rs.guide.set(this.sim.previewPath());
  }

  private finishMode(): void {
    const mode = this.mode!;
    const sum = mode.summary();
    this.state = 'result';
    this.ui.hideHud();
    this.ui.hideResult();
    if (sum.confetti) {
      this.rs.confetti.fire(new Vector3(0, 0, 8));
      this.audio.reaction('goal', 1);
      this.crowdJump.home = 1;
    }
    this.updateStadiumScreens(sum.win ? 'CAMPEÃO!' : 'FIM', sum.title);
    this.ui.showSummary(sum, {
      again: () => this.start(this.modeFactory!),
      menu: () => this.enterMenu(),
    });
  }

  // ------------------------------------------------------------------ frame

  private frame = (now: number) => {
    requestAnimationFrame(this.frame);
    const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.time += dt;
    this.frameNo++;
    const input = this.input;
    input.poll();
    if (input.pausePressed() && this.state !== 'menu') this.togglePause();
    if (input.cameraPressed() && this.state !== 'menu' && this.state !== 'replay') this.cycleCamera();
    if (input.followPressed()) {
      this.settings.followBall = !this.settings.followBall;
      save();
      this.ui.toast(this.settings.followBall ? 'Câmera segue a bola' : 'Câmera fixa');
    }
    const paused = this.ui.paused || (this.ui.panelOpen && this.state !== 'menu');
    if (!paused) this.updateState(dt);
    this.updateCrowdAndAudio(dt);
    this.rs.render(paused ? 0 : dt, this.tension, this.pulse);
    input.endFrame();
  };

  private togglePause(): void {
    if (this.ui.paused) {
      this.ui.hidePause();
      return;
    }
    if (this.state === 'menu') return;
    this.ui.showPause({
      resume: () => this.ui.hidePause(),
      restart: () => {
        this.ui.hidePause();
        if (this.modeFactory) this.start(this.modeFactory);
      },
      settings: () => {
        this.ui.hidePause();
        this.ui.settingsPanel();
      },
      menu: () => {
        this.ui.hidePause();
        this.enterMenu();
      },
    });
  }

  private cycleCamera(): void {
    const list = this.spec?.role === 'keep' ? KEEPER_CAMERAS : KICKER_CAMERAS;
    const i = list.indexOf(this.cameraMode);
    this.cameraMode = list[(i + 1) % list.length];
    this.cam.setMode(this.cameraMode, false);
    this.ui.toast(CAMERA_LABELS[this.cameraMode], 1200);
  }

  private updateState(dt: number): void {
    this.stateT += dt;
    if (this.state === 'menu') {
      this.updateMenu(dt);
      return;
    }
    if (this.state === 'replay') {
      this.updateReplay(dt);
      return;
    }
    const sim = this.sim;
    if (!sim) return;
    const spec = this.spec!;
    switch (this.state) {
      case 'aim':
        this.handleAim(dt);
        break;
      case 'charge':
        this.handleAimMotion(dt, 0.5);
        if (this.input.actionDown()) {
          this.power = Math.min(1.15, this.power + dt / 1.05);
        }
        this.ui.setPower(this.power);
        if (this.input.actionReleased() || (!this.input.actionDown() && this.power > 0)) {
          sim.updateIntent({ power: this.power, target: this.vecTarget() });
          sim.startRunUp();
          this.state = 'run';
          this.stateT = 0;
          this.ui.setLabel('', '');
        }
        break;
      case 'keeperWait':
        this.handleKeeperInput(dt);
        if (this.stateT > 1.8) {
          sim.startRunUp();
          this.state = 'run';
          this.stateT = 0;
          this.ui.setLabel('', '');
        }
        break;
      case 'run':
        if (spec.role === 'kick') this.handleRunUser(dt);
        else {
          this.handleCpuRun();
          this.handleKeeperInput(dt);
        }
        if (sim.phase === 'flight') {
          this.state = 'flight';
          this.stateT = 0;
        }
        break;
      case 'flight':
        if (spec.role === 'keep') this.handleKeeperInput(dt);
        if (sim.phase === 'done' && !this.resultShown) this.onShotDone();
        break;
      case 'result':
        if (this.input.replayPressed()) this.startReplay(false);
        else if (this.input.continuePressed() && this.stateT > 0.4) this.advance();
        break;
    }
    this.stepSim(dt);
    this.syncVisuals(dt);
    this.updateCamera(dt);
    this.updateHud(dt);
  }

  private vecTarget() {
    const a = this.aimWithSway();
    return { x: a.x, y: a.y };
  }

  private handleAimMotion(dt: number, rateScale: number): void {
    const input = this.input;
    const ax = input.aimAxis();
    let moved = false;
    if (Math.abs(ax.x) + Math.abs(ax.y) > 0) {
      this.aim.x += ax.x * 2.3 * rateScale * dt;
      this.aim.y += ax.y * 1.5 * rateScale * dt;
      moved = true;
    }
    if (input.drag.x || input.drag.y) {
      this.aim.x += input.drag.x * 0.012;
      this.aim.y -= input.drag.y * 0.012;
      moved = true;
    }
    if (input.pointer.moved && input.pointer.active && input.lastDevice === 'keyboard') {
      const hit = this.pointerOnGoal();
      if (hit) {
        this.aim.set(hit.x, hit.y);
        moved = true;
      }
    }
    const sp = input.spinAxis();
    if (sp.x || sp.y || input.wheel) {
      this.spin.x = clamp(this.spin.x + sp.x * dt * 1.6, -1, 1);
      this.spin.y = clamp(this.spin.y + sp.y * dt * 1.6 - input.wheel * 0.12, -1, 1);
      moved = true;
    }
    this.aim.x = clamp(this.aim.x, -4.8, 4.8);
    this.aim.y = clamp(this.aim.y, 0.12, 3.4);
    if (moved) this.dirty = true;
  }

  private pointerOnGoal(): Vector2 | null {
    this.raycaster.setFromCamera(new Vector2(this.input.pointer.x, this.input.pointer.y), this.rs.camera);
    const p = new Vector3();
    if (!this.raycaster.ray.intersectPlane(this.goalPlane, p)) return null;
    return new Vector2(p.x, p.y);
  }

  private handleAim(dt: number): void {
    const input = this.input;
    const sim = this.sim!;
    this.handleAimMotion(dt, 1);
    const t = input.techniquePressed();
    if (t !== null) this.setTechnique(TECHNIQUE_ORDER[t]);
    const cyc = input.techniqueCycle();
    if (cyc) {
      const i = TECHNIQUE_ORDER.indexOf(this.technique);
      this.setTechnique(TECHNIQUE_ORDER[(i + cyc + TECHNIQUE_ORDER.length) % TECHNIQUE_ORDER.length]);
    }
    if (input.footPressed()) this.setupEdit('f');
    const ra = input.runAdjust();
    if (ra.dist) this.setupEdit(ra.dist > 0 ? 'd+' : 'd-');
    if (ra.angle) this.setupEdit(ra.angle > 0 ? 'a+' : 'a-');
    if (input.pressed('Minus')) this.setupEdit('t-');
    if (input.pressed('Equal')) this.setupEdit('t+');
    // Re-plan the motor program at most ~8 times a second while aiming.
    this.solveTimer -= dt;
    if (this.solveTimer <= 0 || (this.dirty && this.solveTimer <= 0)) {
      this.solveTimer = 0.12;
      const spec = this.spec!;
      if (this.dirty || (spec.pressure > 0.2)) {
        sim.updateIntent({ ...this.currentIntent(), power: 0.85 });
        if (this.settings.guide && this.mode?.id === 'training') this.rs.guide.set(sim.previewPath());
        this.dirty = false;
      }
    }
    if (input.actionPressed() && this.stateT > 0.35 && !this.ui.panelOpen) {
      this.state = 'charge';
      this.power = 0;
      this.stateT = 0;
    }
  }

  private handleRunUser(dt: number): void {
    const sim = this.sim!;
    const input = this.input;
    const k = sim.kicker;
    k.speedInput = input.speedAxis();
    if (input.stutterPressed()) {
      if (k.stutter()) this.ui.toast('Paradinha', 900);
    }
    // Aim can still be changed during the run (late changes cost precision).
    const before = this.aim.clone();
    const ax = input.aimAxis();
    this.aim.x = clamp(this.aim.x + ax.x * 1.8 * dt + input.drag.x * 0.01, -4.8, 4.8);
    if (input.pointer.moved && input.lastDevice === 'keyboard') {
      const hit = this.pointerOnGoal();
      if (hit) this.aim.set(clamp(hit.x, -4.8, 4.8), clamp(hit.y, 0.12, 3.4));
    }
    if (!before.equals(this.aim) || this.spec!.pressure > 0.2) {
      this.solveTimer -= dt;
      if (this.solveTimer <= 0) {
        this.solveTimer = 0.1;
        sim.updateIntent({ target: this.vecTarget() });
      }
    }
    if (input.actionPressed()) {
      sim.pressTiming();
      this.timingFeedbackPending = true;
    }
    if (this.timingFeedbackPending && k.plantTime >= 0 && sim.timingPress !== null) {
      this.timingFeedbackPending = false;
      const e = sim.timingError() ?? 0;
      const a = Math.abs(e);
      this.timingMsg =
        a < 0.12 ? { text: 'Perfeito', color: '#3ddc8f', t: 1 } : a < 0.45 ? { text: e < 0 ? 'Cedo' : 'Tarde', color: '#f2b636', t: 1 } : { text: e < 0 ? 'Muito cedo' : 'Muito tarde', color: '#ff5d5d', t: 1 };
    }
  }
  private timingFeedbackPending = false;

  private handleCpuRun(): void {
    const sim = this.sim!;
    const plan = this.cpuPlan!;
    const k = sim.kicker;
    k.speedInput = plan.speedInput;
    if (plan.stutter && !k.stutterUsed && k.pathLen - k.s < 2.6) k.stutter();
    const ttPlant = k.timeToContact - k.swingDuration;
    if (sim.timingPress === null) {
      if (plan.timingOffset < 0 && k.plantTime < 0 && ttPlant <= -plan.timingOffset) sim.pressTiming();
      else if (plan.timingOffset >= 0 && k.plantTime >= 0 && k.t >= k.plantTime + plan.timingOffset) sim.pressTiming();
    }
  }

  /** Manual goalkeeping: footwork on the line, then a dive whose direction and moment you choose. */
  private handleKeeperInput(dt: number): void {
    const sim = this.sim!;
    const body = sim.keeper;
    const input = this.input;
    const ax = input.aimAxis();
    if (!this.keeperDiveSent) {
      // Pointer/drag chooses the dive target; keys/stick move along the line until the dive.
      if (input.pointer.active && input.lastDevice === 'keyboard') {
        const hit = this.pointerOnGoal();
        if (hit) this.keeperTarget = new Vector2(clamp(hit.x, -4, 4), clamp(hit.y, 0.1, 2.6));
      }
      if (input.drag.x || input.drag.y) {
        const kt = this.keeperTarget ?? new Vector2(body.com.x, 1);
        kt.x = clamp(kt.x + input.drag.x * 0.012, -4, 4);
        kt.y = clamp(kt.y - input.drag.y * 0.012, 0.1, 2.6);
        this.keeperTarget = kt;
      }
      if (!sim.kickTime || sim.kickTime < 0) body.setShuffle(body.shuffleTarget + ax.x * 1.6 * dt * (input.actionDown() ? 0 : 1));
      if (input.actionPressed()) {
        let target: Vector3;
        let mode: 'dive' | 'stand' | 'jump' | 'collapse' = 'dive';
        if (Math.abs(ax.x) > 0.25 || Math.abs(ax.y) > 0.25) {
          target = new Vector3(body.com.x + ax.x * 3.3, clamp(1.0 + ax.y * 1.2, 0.15, 2.5), body.com.z + 0.3);
        } else if (this.keeperTarget) {
          target = new Vector3(this.keeperTarget.x, this.keeperTarget.y, body.com.z + 0.3);
        } else {
          target = new Vector3(body.com.x, 1.1, body.com.z + 0.3);
          mode = 'stand';
        }
        const dx = Math.abs(target.x - body.com.x);
        if (mode !== 'stand') {
          if (dx < 0.5 && target.y > 1.9) mode = 'jump';
          else if (dx < 0.5) mode = 'stand';
          else if (dx < 1.3 && target.y < 0.6) mode = 'collapse';
        }
        // Expected arrival: from the ball in flight, or a typical strike if not kicked yet.
        const b = sim.world.ball;
        const arrival = sim.kickTime >= 0 && b.v.z < -1 ? Math.max(0.12, (b.p.z - body.com.z) / -b.v.z) : 0.42;
        body.dive({ target, arrival, mode });
        this.keeperDiveSent = true;
      }
    }
    // Reflex hands: within reach, the hands follow the ball (no automatic save: they must touch it).
    if (sim.kickTime >= 0) {
      const b = sim.world.ball;
      const chest = body.com.clone().add(new Vector3(0, 0.45, 0.15));
      const lead = b.p.clone().addScaledVector(b.v, 0.04);
      if (lead.distanceTo(chest) < 1.25 && b.v.z < 0) {
        body.handTarget.L = lead.clone().add(new Vector3(0.1, 0, 0.05));
        body.handTarget.R = lead.clone().add(new Vector3(-0.1, 0, 0.05));
      } else {
        body.handTarget.L = body.handTarget.R = null;
      }
    }
  }

  private stepSim(dt: number): void {
    const sim = this.sim!;
    this.acc += dt;
    let n = 0;
    while (this.acc >= SIM_DT && n < 30) {
      this.prevBall.copy(sim.world.ball.p);
      sim.step();
      const net = this.rs.goal.net;
      net.step(SIM_DT, this.prevBall, sim.world.ball.p);
      if (this.state === 'run' || this.state === 'flight' || this.state === 'result') {
        if (this.recorder.duration < 12) this.recorder.record(sim.world.ball, this.kickerRig!, this.keeperRig!, net.pos, net.awake > 0);
      }
      for (const e of sim.events) this.onSimEvent(e);
      this.acc -= SIM_DT;
      n++;
    }
    if (n >= 30) this.acc = 0;
  }

  private onSimEvent(e: SimEvent): void {
    const sim = this.sim!;
    const spec = this.spec!;
    switch (e.type) {
      case 'kick': {
        this.recorder.mark('kick');
        this.kickSurface = TECHNIQUES[sim.intent.technique].surface;
        this.audio.kick(e.speed, e.point, this.kickSurface);
        const d = sim.world.ball.v.clone().setY(0).normalize();
        this.rs.spray.burst(e.point.clone().setY(0.02), d, 26, 1.2);
        this.cam.shake(0.25);
        this.excitement = 0.7;
        this.tension = 0;
        this.ui.setTiming(false, 0);
        this.ui.setKickControlsVisible(false);
        this.rs.aim.group.visible = false;
        this.rs.guide.mesh.count = 0;
        break;
      }
      case 'post':
      case 'bar':
        this.audio.post(e.speed, e.point);
        this.cam.shake(0.6);
        this.notable = true;
        this.audio.reaction('gasp', 0.8);
        break;
      case 'net':
        this.audio.net(e.speed, e.point);
        break;
      case 'keeper':
        if (e.part?.startsWith('hand') || e.part?.startsWith('foreArm')) this.audio.glove(e.speed, e.point);
        else this.audio.bounce(e.speed * 1.5, e.point);
        if (e.speed > 16) this.notable = true;
        break;
      case 'catch':
        this.audio.glove(e.speed + 5, e.point);
        break;
      case 'goal': {
        const userScored = spec.userTeamIsKicking;
        this.ui.banner(spec.role === 'keep' ? 'Gol' : 'GOL!', userScored ? 'goal' : 'miss');
        this.audio.reaction(userScored || this.mode?.id !== 'shootout' ? 'goal' : 'miss', 1);
        this.audio.say(userScored ? 'Gooool!' : 'Gol do adversário.', userScored);
        if (userScored) this.crowdJump.home = 1;
        else this.crowdJump.away = 1;
        this.excitement = 1;
        this.rs.flashScreen(0.08);
        this.notable = true;
        this.updateStadiumScreens('GOL!', `${spec.kicker.name} · ${sim.world.ball.v.length() > 0 ? '' : ''}`);
        break;
      }
      case 'ground':
        if (e.speed > 1.5) this.audio.bounce(e.speed, e.point);
        break;
      case 'board':
        this.audio.board(e.speed, e.point);
        break;
      default:
        break;
    }
  }

  private onShotDone(): void {
    const sim = this.sim!;
    const spec = this.spec!;
    const st = sim.stats!;
    this.resultShown = true;
    const msg = this.mode!.onResult(st, spec);
    if (spec.role === 'kick' && st.outcome !== 'retake') {
      recordShot({
        t: Date.now(),
        mode: this.mode!.id,
        outcome: st.outcome,
        technique: st.technique,
        speed: st.speedKmh,
        precision: st.precisionCm,
        x: st.crossing.x,
        y: st.crossing.y,
        keeper: spec.keeperLevel,
        quality: st.quality,
      });
      const rec = load().records;
      if (st.speedKmh > rec.maxSpeed) rec.maxSpeed = st.speedKmh;
      save();
    }
    // Reactions.
    const goal = st.outcome === 'goal';
    sim.kicker.react(goal ? 'goal' : st.outcome === 'saved' ? 'save' : st.outcome === 'post' ? 'post' : 'miss');
    sim.keeper.react(goal ? 'goal' : 'save');
    if (!goal) {
      const userKeeperSaved = spec.role === 'keep' && st.outcome === 'saved';
      if (st.outcome === 'saved') {
        this.ui.banner(st.caught ? 'Encaixou!' : 'Defesa!', 'save');
        this.audio.reaction(spec.role === 'keep' || this.mode?.id !== 'shootout' ? 'save' : 'miss', 1);
        this.audio.say(st.caught ? 'Que segurança do goleiro!' : 'Que defesa!', true);
        if (userKeeperSaved) this.crowdJump.home = 1;
        else if (this.mode?.id === 'shootout') this.crowdJump.away = 1;
        this.notable = this.notable || st.speedKmh > 70;
      } else if (st.outcome === 'post') {
        this.ui.banner(st.outcomeLabel.includes('TRAVESSÃO') ? 'Travessão!' : 'Na trave!', 'miss');
        this.audio.say('Na trave!', true);
        this.audio.reaction('post', 1);
      } else if (st.outcome === 'retake') {
        this.ui.banner('Repetir', 'miss');
        this.audio.whistle(true);
      } else {
        this.ui.banner(st.outcome === 'over' ? 'Por cima!' : 'Pra fora!', 'miss');
        this.audio.reaction('miss', 0.9);
        this.audio.say(st.outcome === 'over' ? 'Por cima do gol!' : 'Pra fora!', false);
      }
      this.updateStadiumScreens(st.outcomeLabel, spec.kicker.name);
    }
    this.ui.setScoreboard(this.mode!.scoreboard());
    this.state = 'result';
    this.stateT = 0;
    const finished = this.isModeFinished();
    const nextLabel = finished ? 'Ver resumo' : 'Próxima cobrança';
    this.lastResult = { msg, nextLabel };
    if (this.settings.autoReplay && this.notable && st.outcome !== 'retake') {
      setTimeout(() => {
        if (this.state === 'result' && this.sim === sim) this.startReplay(true);
      }, 1600);
    }
    setTimeout(() => {
      if (this.state === 'result' && this.sim === sim) this.showResultCard();
    }, 1100);
  }
  private lastResult: { msg: string | null; nextLabel: string } = { msg: null, nextLabel: '' };

  private showResultCard(): void {
    if (!this.sim?.stats) return;
    this.ui.showResult(this.sim.stats, this.lastResult.msg, {
      replay: () => this.startReplay(false),
      next: () => this.advance(),
      menu: () => this.enterMenu(),
    }, this.lastResult.nextLabel);
  }

  private isModeFinished(): boolean {
    const m = this.mode;
    if (!m) return true;
    if (m instanceof ShootoutMode) return m.finished;
    if (m instanceof PrecisionMode) return m.shots >= m.kicksTotal;
    if (m instanceof CareerMode) return m.shots >= m.stage.kicks;
    return false;
  }

  private advance(): void {
    if (this.state !== 'result') return;
    this.ui.hideResult();
    this.nextKick();
  }

  // ------------------------------------------------------------------ replay

  private startReplay(auto: boolean): void {
    if (this.recorder.duration < 0.3) return;
    this.state = 'replay';
    this.ui.hideResult();
    const r = this.replay;
    r.auto = auto;
    r.autoStep = 0;
    r.speed = auto ? 0.35 : 0.25;
    r.playing = true;
    r.angle = 0;
    r.trail = true;
    r.t = Math.max(0, this.recorder.contactT - 1.1);
    r.liveNet = this.rs.goal.net.capture();
    this.cam.setMode(this.replayAngles[0]);
    this.ui.showReplayBar(
      {
        toggle: () => (r.playing = !r.playing),
        speed: (s) => (r.speed = s),
        angle: () => {
          r.angle = (r.angle + 1) % this.replayAngles.length;
          this.cam.setMode(this.replayAngles[r.angle]);
        },
        seek: (t) => {
          r.t = t;
          r.playing = false;
        },
        contact: () => {
          r.t = this.recorder.contactT;
          r.playing = false;
          r.speed = 0.1;
        },
        trail: () => (r.trail = !r.trail),
        close: () => this.endReplay(),
      },
      this.recorder.duration,
    );
  }

  private endReplay(): void {
    this.ui.hideReplayBar();
    this.state = 'result';
    this.stateT = 0;
    this.rs.dofEnabled = false;
    this.rs.trail.clear();
    if (this.replay.liveNet) this.rs.goal.net.restore(this.replay.liveNet);
    this.cam.setMode(this.cameraMode);
    // Re-pose characters from the live simulation.
    this.sim?.kicker.pose(0);
    this.showResultCard();
  }

  private updateReplay(dt: number): void {
    const r = this.replay;
    const rec = this.recorder;
    if (this.input.pressed('Escape') || this.input.replayPressed()) {
      this.endReplay();
      return;
    }
    if (this.input.pressed('Space')) r.playing = !r.playing;
    if (r.playing) r.t += dt * r.speed;
    const end = rec.duration - 0.02;
    if (r.t >= end) {
      r.t = end;
      if (r.auto) {
        r.autoStep++;
        if (r.autoStep >= 2) {
          this.endReplay();
          return;
        }
        r.t = Math.max(0, rec.contactT - 0.5);
        r.angle = 1;
        r.speed = 0.5;
        this.cam.setMode(this.replayAngles[r.angle]);
      } else r.playing = false;
    }
    const ball = { p: new Vector3(), q: new Quaternion(), v: new Vector3() };
    rec.apply(r.t, this.kickerRig!, this.keeperRig!, ball);
    const snap = rec.netAt(r.t);
    if (snap) this.rs.goal.net.restore(snap);
    else this.rs.goal.net.reset();
    this.rs.updateBall(ball.p, ball.q, r.playing ? ball.v.clone().multiplyScalar(r.speed) : new Vector3());
    if (r.trail && r.t > rec.contactT) this.rs.trail.setPoints(rec.path(rec.contactT, r.t));
    else this.rs.trail.clear();
    this.updateFootShadows();
    const kicked = r.t >= rec.contactT;
    const ctx = this.cameraContext(ball.p, ball.v, kicked, r.t - rec.contactT, true);
    this.cam.update(dt, ctx);
    this.rs.dofEnabled = true;
    this.rs.dofFocus = this.rs.camera.position.distanceTo(kicked ? ball.p : ctx.kickerPos);
    this.ui.updateReplayTime(r.t);
  }

  // ------------------------------------------------------------------ visuals

  private syncVisuals(dt: number): void {
    const sim = this.sim!;
    const b = sim.world.ball;
    const alpha = this.acc / SIM_DT;
    this.ballInterp.copy(this.prevBall).lerp(b.p, Math.min(1, alpha));
    this.rs.updateBall(this.ballInterp, b.q, b.v);
    if (this.state === 'flight' || this.state === 'result') {
      if (sim.kickTime >= 0 && this.state === 'flight') this.rs.trail.push(b.p);
    }
    this.updateFootShadows();
    // Aim marker
    const showAim = this.state === 'aim' || this.state === 'charge' || (this.state === 'run' && sim.phase === 'runup');
    if (this.spec!.role === 'kick') {
      this.rs.aim.group.visible = showAim;
      const a = this.aimWithSway();
      this.rs.aim.set(a.x, a.y, GOAL.postZ + 0.03, this.time, 1);
    } else {
      const kt = this.keeperTarget;
      this.rs.aim.group.visible = !!kt && !this.keeperDiveSent && this.state !== 'result';
      if (kt) this.rs.aim.set(kt.x, kt.y, GOAL.postZ + 0.03, this.time, 0.7);
    }
    void dt;
  }

  private updateFootShadows(): void {
    const sh = this.rs.footShadows;
    const rigs = [this.kickerRig!, this.keeperRig!];
    let i = 0;
    for (const rig of rigs) {
      for (const f of ['footL', 'footR'] as const) {
        const p = rig.worldPos(f, new Vector3());
        if (!rig.root.visible) {
          sh[i].mesh.visible = false;
        } else sh[i].update(p.x, p.z + 0.06, Math.max(0, p.y - 0.08), 0.35);
        i++;
      }
    }
  }

  private cameraContext(ball: Vector3, vel: Vector3, kicked: boolean, sinceKick: number, replay = false): CameraContext {
    const kr = this.kickerRig!;
    const sim = this.sim;
    const hips = kr.worldPos('hips', new Vector3());
    const head = kr.worldPos('head', new Vector3());
    const fwd = sim ? sim.kicker.runDir.clone() : new Vector3(0, 0, -1);
    const aimV = this.spec?.role === 'kick' ? this.aimWithSway() : new Vector2(0, 1);
    return {
      ball,
      ballVel: vel,
      kickerPos: hips.setY(0),
      kickerHead: head,
      kickerFwd: fwd,
      keeperPos: this.keeperRig!.worldPos('hips', new Vector3()),
      aim: new Vector3(aimV.x, aimV.y, 0),
      kicked,
      followBall: replay ? true : this.settings.followBall,
      sinceKick,
    };
  }

  private updateCamera(dt: number): void {
    const sim = this.sim!;
    const b = sim.world.ball;
    const kicked = sim.kickTime >= 0;
    const ctx = this.cameraContext(this.ballInterp.clone(), b.v.clone(), kicked, kicked ? sim.time - sim.kickTime : -1);
    this.cam.update(dt, ctx);
    this.rs.dofEnabled = this.cam.dofWanted;
    this.rs.dofFocus = this.cam.dofFocus;
  }

  private updateHud(dt: number): void {
    const sim = this.sim!;
    const spec = this.spec!;
    if (spec.role === 'kick') {
      const a = this.aimWithSway();
      const d = new Vector3(a.x, a.y, GOAL.postZ).sub(sim.ballSpot);
      const dirDeg = (Math.atan2(d.x, -d.z) * 180) / Math.PI;
      const tech = TECHNIQUES[this.technique];
      const sign = this.foot === 'right' ? 1 : -1;
      const cy = sign * (tech.contactYaw + sign * this.spin.x * 0.16);
      const cp = tech.contactPitch - this.spin.y * 0.18;
      this.ui.setIndicators(a.y, dirDeg, Math.hypot(a.x, 0), { x: clamp(cy / 0.45, -1, 1), y: clamp(-cp / 0.65, -1, 1) });
      if (this.state === 'aim') {
        this.ui.setPower(0);
        this.ui.setSetup({ distance: this.runDist, angle: this.runAngle, tempo: this.tempo, foot: this.foot, editable: true });
        this.ui.setHelp(
          this.touch
            ? 'Arraste para mirar · segure <b>CHUTAR</b> para a potência'
            : `<kbd>Mouse</kbd>/<kbd>WASD</kbd> mira · <kbd>I J K L</kbd>/roda efeito · <kbd>1-7</kbd> técnica · <kbd>T</kbd> pé · <kbd>[ ]</kbd> distância · <kbd>, .</kbd> ângulo · <kbd>- =</kbd> ritmo · segure <kbd>Espaço</kbd>`,
        );
      } else if (this.state === 'charge') {
        this.ui.setHelp('Solte para iniciar a corrida · zona vermelha = potência excessiva');
      } else if (this.state === 'run') {
        this.ui.setHelp(this.touch ? 'Toque CHUTAR quando o anel fechar' : '<kbd>W/S</kbd> acelera/freia · <kbd>Shift</kbd> paradinha · <kbd>Espaço</kbd> no anel dourado');
        this.ui.setSetup({ distance: this.runDist, angle: this.runAngle, tempo: sim.kicker.v, foot: this.foot, editable: false });
      }
      // Timing ring: closes on the plant-foot landing.
      const k = sim.kicker;
      if (this.state === 'run' && sim.phase === 'runup') {
        const ttp = k.plantTime >= 0 ? -(k.t - k.plantTime) : Math.max(0, k.timeToContact - k.swingDuration);
        const show = ttp < 0.75 && ttp > -0.11;
        this.ui.setTiming(show, clamp(ttp / 0.75, 0, 1), this.timingMsg?.text, this.timingMsg?.color);
      } else {
        this.ui.setTiming(false, 0, this.timingMsg && this.timingMsg.t > 0 ? this.timingMsg.text : undefined, this.timingMsg?.color);
      }
      if (this.timingMsg) {
        this.timingMsg.t -= dt;
        if (this.timingMsg.t <= 0) this.timingMsg = null;
      }
    } else {
      this.ui.setTiming(false, 0);
      if (this.state === 'keeperWait' || this.state === 'run') {
        this.ui.setHelp(
          this.touch
            ? 'Arraste para escolher o canto · toque SALTAR no momento certo (sem direção = fica no centro)'
            : '<kbd>A/D</kbd> desloca na linha · mouse escolhe o canto · <kbd>Espaço</kbd>/clique salta (direção com <kbd>WASD</kbd> na hora)',
        );
      }
    }
  }

  private updateMenu(dt: number): void {
    const sim = this.menuSim;
    if (!sim) return;
    this.acc += dt;
    while (this.acc >= SIM_DT) {
      sim.step();
      this.acc -= SIM_DT;
    }
    this.rs.updateBall(sim.world.ball.p, sim.world.ball.q, new Vector3());
    this.updateFootShadows();
    const t = this.time * 0.06;
    const eye = new Vector3(Math.sin(t) * 19, 4.2 + 1.5 * Math.sin(t * 1.3), 7 + Math.cos(t) * 12);
    this.cam.place(eye, new Vector3(0, 1.1, 5.5), 38, dt, 0);
    this.rs.dofEnabled = false;
  }

  private updateCrowdAndAudio(dt: number): void {
    const spec = this.spec;
    const live = this.state === 'aim' || this.state === 'charge' || this.state === 'keeperWait' || this.state === 'run';
    const wantTension = live && spec ? spec.pressure * (this.state === 'run' ? 1 : 0.75) : 0;
    this.tension += (wantTension - this.tension) * damp(dt, 0.6);
    this.pulse = this.tension > 0.35 ? Math.max(0, Math.sin(this.time * Math.PI * 2 * ((68 + 50 * this.tension) / 60))) ** 8 : 0;
    if (!live) this.excitement += (0.4 - this.excitement) * damp(dt, 3.5);
    this.crowdJump.home *= Math.exp(-dt / 2.6);
    this.crowdJump.away *= Math.exp(-dt / 2.6);
    const cu = this.rs.stadium.crowd.material.uniforms;
    cu.uExcite.value = this.excitement * (1 - 0.6 * this.tension);
    cu.uHomeJump.value = this.crowdJump.home;
    cu.uAwayJump.value = this.crowdJump.away;
    cu.uFlash.value = this.tension > 0.5 || this.crowdJump.home > 0.3 ? 1 : 0;
    this.audio.setExcitement(Math.min(1, this.excitement + 0.5 * Math.max(this.crowdJump.home, this.crowdJump.away)));
    this.audio.setTension(this.tension);
    const cam = this.rs.camera;
    this.audio.updateListener(cam.position, cam.getWorldDirection(new Vector3()));
    this.audio.update(dt);
    void Color;
  }

  private updateStadiumScreens(title: string, sub: string): void {
    const sb = this.mode?.scoreboard();
    const score = sb?.right ? `${sb.left.short} ${sb.left.goals} × ${sb.right.goals} ${sb.right.short}` : sb ? `${sb.left.goals}` : undefined;
    this.rs.stadium.drawScreens({ title, sub, score });
  }
}
