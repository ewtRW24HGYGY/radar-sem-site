// Application entry: wires physics/game core, controllers, rendering, camera, audio and UI.
import * as THREE from 'three';
import { GameCore } from './game/core.js';
import { AIController, LEVELS } from './ai/aiController.js';
import { OpponentModel } from './ai/adaptation.js';
import { RobotController } from './ai/robot.js';
import { HumanController, STROKES } from './controls/humanController.js';
import { KeyboardController } from './controls/keyboardController.js';
import { EasyController } from './controls/easyController.js';
import { InputManager } from './controls/input.js';
import { Renderer, autoQuality } from './render/renderer.js';
import { buildTable } from './render/table.js';
import { buildPaddle } from './render/paddle.js';
import { BallView } from './render/ballView.js';
import { Arena } from './render/arena.js';
import { CameraRig, CAMERA_MODES } from './camera/cameraRig.js';
import { AudioEngine } from './audio/audio.js';
import { UI, loadSettings, loadNumber, saveNumber } from './ui/ui.js';
import { clamp } from './physics/math.js';
import { TABLE_HALF_L as HL, TABLE_HALF_W as HW, TABLE_HEIGHT } from './physics/constants.js';

const CAM_ORDER = ['fp', 'tp', 'side', 'dyn'];
const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

class App {
  constructor() {
    this.settings = loadSettings();
    this.audio = new AudioEngine();
    this.ui = new UI(this.settings, (k, v) => this.onSetting(k, v), (s) => this.audio.ui(s));
    const stage = document.getElementById('stage');
    this.quality = this.settings.quality === 'auto' ? autoQuality() : this.settings.quality;
    this.view = new Renderer(stage, this.quality);
    const scene = this.view.scene;
    this.arena = new Arena(scene, this.quality);
    this.table = buildTable();
    scene.add(this.table.group);
    this.paddleMeshes = [buildPaddle(), buildPaddle()];
    scene.add(this.paddleMeshes[0], this.paddleMeshes[1]);
    this.ballView = new BallView(scene);
    // the free hand that holds the ball before the serve (open palm, as the rules require)
    const skin = new THREE.MeshStandardMaterial({ color: 0xd9a07a, roughness: 0.7 });
    this.palm = new THREE.Group();
    const palm = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12), skin);
    palm.scale.set(0.045, 0.013, 0.055); palm.castShadow = true;
    this.palm.add(palm);
    for (let i = 0; i < 4; i++) {
      const f = new THREE.Mesh(new THREE.CapsuleGeometry(0.0085, 0.05, 4, 8), skin);
      f.rotation.x = Math.PI / 2; f.position.set(-0.027 + i * 0.018, 0.004, -0.075); f.castShadow = true;
      this.palm.add(f);
    }
    const thumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.009, 0.035, 4, 8), skin);
    thumb.rotation.set(Math.PI / 2, 0, 0.9); thumb.position.set(0.05, 0.004, -0.02);
    this.palm.add(thumb);
    this.palm.visible = false;
    scene.add(this.palm);
    this.ballView.setColor(this.settings.ballColor);
    this.ballView.showTrail = this.settings.trail;
    this.rig = new CameraRig(this.view.camera);
    this.input = new InputManager(stage);
    this.core = null;
    this.mode = null;
    this.paused = false;
    this.demo = false;
    this.humans = [];
    this.tilt = 0; this.manualHeight = 0;
    this.lastShotOwner = -1;
    this.frames = 0; this.fpsTime = 0;
    this.bestRally = loadNumber('topspin.bestRally');
    this.bindButtons();
    if (isTouch) document.getElementById('versusDesc').textContent = 'Mesmo aparelho: cada jogador controla a raquete pela sua metade da tela (câmera lateral).';
    this.startDemo();
    this.last = performance.now();
    const unlock = () => this.audio.init();
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.core && !this.demo && this.state === 'playing') this.pause(true); });
    requestAnimationFrame((t) => this.loop(t));
    setTimeout(() => document.getElementById('loading').classList.add('done'), 150);
  }

  bindButtons() {
    document.querySelectorAll('[data-start]').forEach((b) => b.addEventListener('click', () => { this.audio.init(); this.audio.ui('confirm'); this.start(b.dataset.start); }));
    document.getElementById('btnPause').addEventListener('click', () => this.pause(true));
    document.getElementById('btnResume').addEventListener('click', () => this.pause(false));
    document.getElementById('btnRestart').addEventListener('click', () => this.start(this.mode));
    document.getElementById('btnQuit').addEventListener('click', () => this.quit());
    document.getElementById('btnAgain').addEventListener('click', () => this.start(this.mode));
    document.getElementById('btnResQuit').addEventListener('click', () => this.quit());
    document.getElementById('btnCam').addEventListener('click', () => this.cycleCamera());
    // touch stroke buttons (hold) and serve (tap)
    document.querySelectorAll('.tc').forEach((b) => {
      const v = b.dataset.v;
      const on = (e) => { e.preventDefault(); this.audio.init(); if (v === 'serve') this.input.virtualPressed.add('serve'); else { this.input.virtual[v] = true; b.classList.add('on'); } };
      const off = (e) => { e.preventDefault(); if (v !== 'serve') { this.input.virtual[v] = false; b.classList.remove('on'); } };
      b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('pointerleave', off);
    });
  }

  onSetting(k, v) {
    if (k === 'quality') {
      this.quality = v === 'auto' ? autoQuality() : v;
      this.view.setQuality(this.quality);
    } else if (k === 'camera') { if (!this.demo && this.mode !== 'versus') this.rig.setMode(v); this.updateCamLabel(); }
    else if (k === 'ballColor') this.ballView.setColor(v);
    else if (k === 'trail') this.ballView.showTrail = v;
    else if (k === 'volume') this.audio.setVolume(v);
    else if (k === 'ambient') this.audio.setAmbient(v);
    else if (k === 'control') { if (!this.demo && this.state === 'playing') this.ui.toast('Controle alterado', 'Vale a partir da próxima partida (Reiniciar)', 'neutral', 2200); }
    else if (k === 'difficulty') { const ai = this.core?.controllers[1]; if (ai instanceof AIController && !(ai instanceof KeyboardController) && !this.demo) { ai.setLevel(v); this.ui.setNames(this.humanName(0), `IA · ${LEVELS[v].label}`); } }
    else if (k.startsWith('robot')) { const r = this.core?.controllers[1]; if (r instanceof RobotController) this.applyRobotSettings(r); }
  }
  applyRobotSettings(r) {
    r.settings.spin = this.settings.robotSpin; r.settings.speed = this.settings.robotSpeed; r.settings.placement = this.settings.robotPlacement;
  }
  humanName(i) { return this.mode === 'versus' ? `Jogador ${i + 1}` : 'Você'; }

  // ——— Modes ———
  makeCore(mode, c0f, c1f) {
    const core = new GameCore({ mode, seed: (Math.random() * 1e6) | 0 });
    const c0 = c0f(core.world), c1 = c1f(core.world);
    core.setControllers(c0, c1);
    core.on('contact', (ev) => this.onContact(ev));
    core.on('point', (d) => this.onPoint(d));
    core.on('serve', (d) => this.onServe(d));
    core.on('toss', () => this.ui.hint(''));
    core.on('shot', (s) => this.onShot(s));
    core.on('matchOver', (d) => this.onMatchOver(d));
    core.on('rallyEnd', (d) => this.onRallyEnd(d));
    core.on('trainingBall', (d) => this.onTrainingBall(d));
    core.on('trainingOver', (d) => this.onTrainingOver(d));
    core.on('target', (t) => this.arena.showTarget(t));
    return core;
  }

  startDemo() {
    this.demo = true;
    this.mode = 'demo';
    this.state = 'menu';
    this.core = this.makeCore('match', (w) => new AIController(w, 0, 'advanced'), (w) => new AIController(w, 1, 'advanced'));
    this.core.score.bestOf = 99;
    this.humans = [];
    this.core.start();
    this.rig.setSide(1);
    this.rig.setMode('dyn');
    this.arena.robot.visible = false; this.arena.showTarget(null);
    this.paddleMeshes[1].visible = true;
    this.ui.showHud(false);
  }

  start(mode) {
    this.audio.init();
    this.demo = false;
    this.mode = mode;
    this.paused = false;
    this.state = 'playing';
    this.tilt = 0; this.manualHeight = 0;
    const S = this.settings;
    let c1f;
    this.model = null;
    const easy = S.control !== 'manual';
    const player = (w, i) => (easy ? new EasyController(w, i) : new HumanController(w, i, S));
    if (mode === 'match' || mode === 'pro') {
      this.model = new OpponentModel();
      c1f = (w) => new AIController(w, 1, S.difficulty, { model: this.model });
    } else if (mode === 'rally') c1f = (w) => new AIController(w, 1, 'advanced', { coop: true });
    else if (mode === 'versus') c1f = (w) => (isTouch ? player(w, 1) : new KeyboardController(w, 1));
    else c1f = (w) => { const r = new RobotController(w, 1); this.applyRobotSettings(r); r.onFeed = (l) => this.arena.aimRobot(l.dir); return r; };
    this.arena.showTarget(null);
    this.core = this.makeCore(mode, (w) => player(w, 0), c1f);
    this.humans = this.core.controllers.filter((c) => c instanceof HumanController);
    this.easies = this.core.controllers.filter((c) => c instanceof EasyController);
    this.touchX = [null, null]; this.touchSeq = [-1, -1];
    this.core.start();
    const training = mode === 'free' || mode === 'precision';
    this.arena.robot.visible = training;
    this.paddleMeshes[1].visible = !training;
    this.ballView.resetTrail();
    // camera
    this.rig.setSide(1);
    this.rig.setMode(mode === 'versus' ? 'side' : S.camera);
    this.updateCamLabel();
    // input layout
    this.input.split = mode === 'versus' && isTouch;
    this.input.halfOwner = [0, 1];
    // HUD
    this.ui.closeAll();
    this.ui.showHud(true);
    this.ui.touchControls(isTouch);
    const scored = mode === 'match' || mode === 'pro' || mode === 'versus';
    this.ui.showScoreboard(scored);
    this.ui.setNames(this.humanName(0), mode === 'versus' ? 'Jogador 2' : `IA · ${LEVELS[S.difficulty].label}`);
    this.ui.setRally(0); this.ui.setShot(null);
    this.ui.training(null);
    if (scored) this.updateScore(false);
    if (mode === 'rally') this.ui.training(`<div><span>Rally atual</span><b id="trRally">0</b></div><div><span>Recorde</span><b id="trBest">${this.bestRally}</b></div>`);
    if (training) this.updateTrainingHud(this.core.training);
    if (easy && !this.easyTipShown) { this.easyTipShown = true; this.ui.toast('Controle fácil', isTouch ? 'Arraste o dedo para os lados: a raquete golpeia sozinha' : 'Mova o mouse para os lados: a raquete golpeia sozinha', 'neutral', 2800); }
    else if (mode === 'pro') this.ui.toast('Modo profissional', 'Melhor de 5 sets · regras oficiais', 'neutral', 2200);
    else if (isTouch && innerHeight > innerWidth) this.ui.toast('Dica', 'Gire o celular na horizontal para ver mais da mesa', 'neutral', 2600);
  }

  quit() {
    this.paused = false;
    this.ui.reset('scrMain');
    this.ui.hint('');
    this.startDemo();
  }

  pause(on) {
    if (this.demo || !this.core) return;
    if (on && (this.state !== 'playing')) return;
    this.paused = on;
    if (on) {
      this.ui.aiRead(this.model ? `Leitura da IA: ${this.model.describe()}` : '');
      this.ui.reset('scrPause');
    } else {
      this.ui.closeAll();
      this.last = performance.now();
    }
  }

  cycleCamera() {
    const i = CAM_ORDER.indexOf(this.rig.mode);
    const m = CAM_ORDER[(i + 1) % CAM_ORDER.length];
    this.setCamera(m);
  }
  setCamera(m) {
    this.rig.setMode(m);
    if (this.mode !== 'versus') { this.settings.camera = m; this.ui.refresh(); }
    this.updateCamLabel();
    if (isTouch) { this.ui.hint(`Câmera: ${CAMERA_MODES[m]}`); clearTimeout(this.camHintT); this.camHintT = setTimeout(() => this.ui.hint(''), 1200); }
  }
  updateCamLabel() { this.ui.setCamLabel(`Câmera: ${CAMERA_MODES[this.rig.mode]}`); }

  // ——— Input → controllers ———
  // Screen (u, v) → racket position on the floor plan for player `idx`
  pointerToWorld(idx, u, v) {
    const sens = this.settings.sensitivity;
    const s = idx === 0 ? 1 : -1;
    if (this.rig.mode === 'side') {
      // camera on +x: screen right = −z, screen up = −x
      const local = s > 0 ? clamp(u / 0.55, 0, 1) : clamp((1 - u) / 0.55, 0, 1);
      const zAbs = HL + 1.45 - local * 1.9 * sens;
      return { x: (v - 0.5) * 2.6 * sens, z: s * clamp(zAbs, HL - 0.6, HL + 1.8) };
    }
    const x = (u - 0.5) * 2.7 * sens;
    const zAbs = HL - 0.45 + v * 1.95 * sens + (1 - sens) * 0.8;
    return { x: s * x, z: s * clamp(zAbs, HL - 0.6, HL + 1.8) };
  }

  handleInput(dt) {
    const f = this.input.frame();
    const P = f.pressed;
    if (P.has('Escape') || P.has('KeyP')) { if (this.state === 'playing') this.pause(!this.paused); }
    if (this.demo || this.paused || !this.core) return f;
    if (P.has('KeyC')) this.cycleCamera();
    ['Digit1', 'Digit2', 'Digit3', 'Digit4'].forEach((d, i) => { if (P.has(d)) this.setCamera(CAM_ORDER[i]); });
    const versusKb = this.mode === 'versus' && !isTouch;
    const S = this.settings;
    // wheel tilts the face, W/S sets the height when the assist is off
    this.tilt = clamp(this.tilt + f.wheel * 0.03, -0.45, 0.45);
    if (!versusKb && S.assist === 'off') {
      if (f.keys.has('KeyW')) this.manualHeight = Math.min(0.7, this.manualHeight + dt * 0.6);
      if (f.keys.has('KeyS')) this.manualHeight = Math.max(-0.45, this.manualHeight - dt * 0.6);
    }
    for (const h of this.humans) {
      const slot = h.index;
      const p = f.pointer[slot];
      const tw = this.pointerToWorld(h.index, p.u, p.v);
      const mouseSlot = slot === 0 && !this.input.usingTouch;
      const b = {
        top: (mouseSlot && (f.buttons & 1) !== 0) || (!versusKb && (f.keys.has('KeyJ') || f.keys.has('ShiftLeft'))) || (!this.input.split && f.virtual.top),
        back: (mouseSlot && (f.buttons & 2) !== 0) || (!versusKb && f.keys.has('KeyK')) || (!this.input.split && f.virtual.back),
        sideL: !versusKb && f.keys.has('KeyQ'),
        sideR: !versusKb && f.keys.has('KeyE'),
        tilt: this.tilt,
        height: slot === 0 ? this.manualHeight : 0,
        aimX: 0,
        toss: (mouseSlot && f.clicked) || (!versusKb && slot === 0 && P.has('Space')) || f.virtualPressed.has('serve') || f.taps[slot],
      };
      h.setFrameInput(tw.x, tw.z, b, this.core.time, dt);
      if (slot === 0) this.ui.setStroke(h.stroke, STROKES[h.stroke].label + (b.sideL ? ' + lateral ◀' : b.sideR ? ' + lateral ▶' : ''));
    }
    for (const e of this.easies || []) {
      const slot = e.index, p = f.pointer[slot];
      let x;
      if (slot === 0 && !this.input.usingTouch) {
        x = this.pointerToWorld(e.index, p.u, p.v).x;              // mouse: absolute
      } else {
        // touch: drag anywhere — relative movement, the racket never jumps under the finger
        if (this.touchX[slot] === null) this.touchX[slot] = 0;
        const prev = this.lastTouch?.[slot];
        if (prev && p.seq === prev.seq) {
          const dx = this.pointerToWorld(e.index, p.u, p.v).x - this.pointerToWorld(e.index, prev.u, prev.v).x;
          this.touchX[slot] = clamp(this.touchX[slot] + dx * 1.35, -HW - 0.8, HW + 0.8);
        }
        (this.lastTouch ||= [])[slot] = { u: p.u, v: p.v, seq: p.seq };
        x = this.touchX[slot];
      }
      const mouseSlot = slot === 0 && !this.input.usingTouch;
      const b = {
        top: (mouseSlot && (f.buttons & 1) !== 0) || f.keys.has('KeyJ') || f.keys.has('ShiftLeft') || (!this.input.split && f.virtual.top),
        back: (mouseSlot && (f.buttons & 2) !== 0) || f.keys.has('KeyK') || (!this.input.split && f.virtual.back),
        toss: (mouseSlot && f.clicked) || (slot === 0 && P.has('Space')) || f.virtualPressed.has('serve') || f.taps[slot],
      };
      e.setPointer(x, b, this.core.time, dt);
      if (slot === 0) this.ui.setStroke(e.stroke, STROKES[e.stroke].label);
    }
    const kb = this.core.controllers[1];
    if (kb instanceof KeyboardController && !kb.easy) {
      kb.setKeys({
        left: f.keys.has('KeyA'), right: f.keys.has('KeyD'), fwd: f.keys.has('KeyW'), rev: f.keys.has('KeyS'),
        drive: P.has('KeyF') || P.has('Space'), top: P.has('KeyQ'), cut: P.has('KeyE'),
        toss: P.has('Space') || P.has('KeyF') || P.has('KeyR'),
      }, this.core.time);
    }
    return f;
  }

  // ——— Events ———
  onContact(ev) {
    const demo = this.demo;
    const a = this.audio;
    if (demo && a.master) a.master.gain.value = this.settings.volume * 0.35;
    else if (a.master) a.master.gain.value = this.settings.volume;
    switch (ev.type) {
      case 'paddle': a.paddle(ev.speed, ev.slip, ev.part, ev.pos.x, ev.pos.z); break;
      case 'table':
        a.table(ev.speed, ev.pos.x, ev.pos.z, ev.edge);
        if (!demo) this.arena.showMarker(ev.pos.x, TABLE_HEIGHT, ev.pos.z, true);
        break;
      case 'tableSide': a.table(ev.speed * 0.6, ev.pos.x, ev.pos.z, true); break;
      case 'net':
        a.net(ev.speed, ev.part, ev.pos.x);
        if (ev.part !== 'post') this.table.net.impulse(ev.pos.x, ev.pos.y, -ev.normal.z * ev.speed);
        break;
      case 'floor': a.floor(ev.speed, ev.pos.x, ev.pos.z); break;
      case 'barrier': a.barrier(ev.speed, ev.pos.x, ev.pos.z); break;
    }
  }
  onShot(s) {
    if (this.demo) return;
    this.ui.setShot(s);
    this.ui.setRally(this.core.rallyHits);
    if (this.mode === 'rally') { const el = document.getElementById('trRally'); if (el) el.textContent = this.core.rallyHits; }
  }
  onServe(d) {
    if (this.demo) return;
    if (this.mode !== 'rally' && this.mode !== 'free' && this.mode !== 'precision') this.updateScore(false);
    this.ui.setRally(0);
    const human = this.core.controllers[d.server] instanceof HumanController;
    if (this.core.controllers[d.server] instanceof EasyController) {
      const who = this.mode === 'versus' ? `Jogador ${d.server + 1}: ` : '';
      this.ui.hint(isTouch ? `${who}toque em SACAR · segure Topspin ou Corte para escolher o efeito` : `${who}Espaço ou clique para sacar · botão esquerdo = topspin, direito = corte`);
    } else if (human) {
      const who = this.mode === 'versus' ? `Jogador ${d.server + 1}: ` : '';
      this.ui.hint(isTouch ? `${who}toque em SACAR e deslize para cima enquanto a bola desce` : `${who}${this.mode === 'versus' ? 'clique' : 'Espaço ou clique'} para lançar · leve o mouse para frente enquanto a bola desce`);
    } else if (this.core.controllers[d.server] instanceof KeyboardController) this.ui.hint('Jogador 2: Espaço/F para lançar e sacar · Q topspin · E corte');
    else this.ui.hint('');
    if (this.core.score.isMatchPoint() && this.mode !== 'rally') this.ui.toast('Match point', '', 'neutral', 1300);
    else if (this.core.score.isGamePoint() && this.mode !== 'rally') this.ui.toast('Game point', '', 'neutral', 1100);
    else if (this.core.score.points[0] >= 10 && this.core.score.points[1] >= 10 && this.core.score.points[0] === this.core.score.points[1]) this.ui.toast('Deuce', 'É preciso abrir 2 pontos', 'neutral', 1300);
  }
  onPoint(d) {
    if (this.demo) return;
    this.ui.hint('');
    if (d.let) { this.ui.toast('Let', d.reason, 'neutral', 1300); this.audio.ui('whistle'); return; }
    const mine = d.winner === 0;
    const versus = this.mode === 'versus';
    const title = versus ? `Ponto do Jogador ${d.winner + 1}` : mine ? 'Ponto seu' : 'Ponto da IA';
    const extra = d.rally >= 6 ? ` · rally de ${d.rally} golpes` : '';
    this.ui.toast(title, d.reason + extra, versus || mine ? 'win' : 'lose', 1700);
    this.audio.ui(mine || versus ? 'point' : 'lose');
    if (mine || d.rally >= 6) this.audio.applause(Math.min(1, 0.35 + d.rally * 0.07));
    const r = d.result;
    if (r && r.gameWon >= 0 && r.matchWon < 0) {
      const g = this.core.score.gameHistory[this.core.score.gameHistory.length - 1];
      setTimeout(() => this.ui.toast(`Set para ${versus ? `Jogador ${r.gameWon + 1}` : r.gameWon === 0 ? 'você' : 'a IA'}`, `${g[0]}–${g[1]} · sets ${this.core.score.games[0]}–${this.core.score.games[1]}`, r.gameWon === 0 ? 'win' : 'lose', 2200), 900);
    }
    this.updateScore(true, d.result && d.result.gameWon >= 0);
  }
  updateScore(flash, gameJustEnded = false) {
    const sc = this.core.score;
    const setNo = sc.games[0] + sc.games[1] + 1;
    const meta = sc.over ? 'Fim de jogo' : `Set ${setNo} · melhor de ${sc.bestOf}`;
    const show = gameJustEnded && sc.gameHistory.length ? { ...sc, points: sc.gameHistory[sc.gameHistory.length - 1] } : sc;
    this.ui.setScore(show, sc.over ? -1 : sc.server, meta, flash);
    this.arena.setScoreboard([String(show.points[0]), String(show.points[1])], [String(sc.games[0]), String(sc.games[1])]);
  }
  onMatchOver(d) {
    if (this.demo) { this.startDemo(); return; }
    this.state = 'over';
    const sc = d.score, st = d.stats;
    const versus = this.mode === 'versus';
    const won = d.winner === 0;
    const title = versus ? `Jogador ${d.winner + 1} venceu!` : won ? 'Vitória!' : 'Derrota';
    const kmh = (v) => `${Math.round(v * 3.6)} km/h`;
    const n1 = versus ? 'J2' : 'IA';
    const html = `
      <div class="res-score">${sc.games[0]} – ${sc.games[1]}</div>
      <div class="res-games">${sc.gameHistory.map((g) => `<span>${g[0]}–${g[1]}</span>`).join('·')}</div>
      <div class="res-stats">
        <span class="h"></span><span class="h">${versus ? 'J1' : 'Você'}</span><span class="h">${n1}</span>
        <span>Pontos</span><b>${st.points[0]}</b><b>${st.points[1]}</b>
        <span>Winners</span><b>${st.winners[0]}</b><b>${st.winners[1]}</b>
        <span>Erros</span><b>${st.errors[0]}</b><b>${st.errors[1]}</b>
        <span>Golpe mais rápido</span><b>${kmh(st.fastest[0])}</b><b>${kmh(st.fastest[1])}</b>
        <span>Maior rally</span><b>${st.longestRally}</b><b></b>
      </div>`;
    this.ui.showHud(false);
    this.ui.results(title, html);
    this.audio.applause(won ? 1 : 0.4);
  }
  onRallyEnd(d) {
    if (d.hits > this.bestRally) { this.bestRally = d.hits; saveNumber('topspin.bestRally', d.hits); this.ui.toast(`Novo recorde: ${d.hits}`, d.reason, 'win', 1800); this.audio.applause(1); }
    else this.ui.toast(`${d.hits} golpes`, d.reason, 'neutral', 1500);
    const b = document.getElementById('trBest'); if (b) b.textContent = this.bestRally;
  }
  updateTrainingHud(t) {
    if (!t) return;
    const shot = this.core.lastShot;
    if (this.mode === 'precision') {
      this.ui.training(`<div><span>Bola</span><b>${Math.min(t.balls, 20)}/20</b></div><div><span>Pontos</span><b>${t.score}</b></div><div><span>Alvos</span><b>${t.good}</b></div><div><span>Combo</span><b>×${t.combo}</b></div>`);
    } else {
      const acc = t.balls ? Math.round((t.returned / t.balls) * 100) : 0;
      this.ui.training(`<div><span>Bolas</span><b>${t.balls}</b></div><div><span>Na mesa</span><b>${t.returned}</b></div><div><span>Precisão</span><b>${acc}%</b></div><div><span>Último</span><b>${shot && shot.index === 0 ? Math.round(shot.kmh) + ' km/h' : '—'}</b></div>`);
    }
  }
  onTrainingBall(d) {
    this.updateTrainingHud(d.training);
    if (this.mode === 'precision') {
      if (d.ok && d.hitTarget) { this.ui.toast(`+${d.pts}`, d.training.combo > 1 ? `Combo ×${d.training.combo}` : 'No alvo!', 'win', 900); this.audio.ui('point'); }
      else if (d.ok) this.ui.toast(`+${d.pts}`, 'Na mesa', 'neutral', 700);
      else this.ui.toast('Errou', d.reason || '', 'lose', 800);
    } else if (!d.ok && d.reason) this.ui.toast(d.reason, '', 'lose', 700);
  }
  onTrainingOver(t) {
    this.state = 'over';
    this.ui.showHud(false);
    const best = loadNumber('topspin.bestPrecision');
    if (t.score > best) saveNumber('topspin.bestPrecision', t.score);
    this.ui.results(t.score > best ? 'Novo recorde!' : 'Desafio concluído', `
      <div class="res-score">${t.score}</div>
      <div class="res-games"><span>${t.good} alvos de ${t.balls} bolas</span>·<span>${t.returned} na mesa</span>·<span>recorde ${Math.max(best, t.score)}</span></div>`);
  }

  // ——— Main loop ———
  loop(now) {
    requestAnimationFrame((t) => this.loop(t));
    let dt = (now - this.last) / 1000;
    this.last = now;
    if (!(dt > 0)) dt = 1 / 60;
    dt = Math.min(dt, 0.1);
    this.handleInput(dt);
    const core = this.core;
    if (core && !this.paused) core.update(dt);
    if (core) this.sync(dt);
    this.view.render();
    // fps
    this.frames++; this.fpsTime += dt;
    if (this.fpsTime > 0.5) { this.ui.fps(`${Math.round(this.frames / this.fpsTime)} fps · ${this.quality}`); this.frames = 0; this.fpsTime = 0; }
  }

  sync(dt) {
    const core = this.core, w = core.world;
    for (let i = 0; i < 2; i++) {
      const pd = w.paddles[i], m = this.paddleMeshes[i];
      m.position.set(pd.pos.x, pd.pos.y, pd.pos.z);
      m.quaternion.set(pd.quat.x, pd.quat.y, pd.quat.z, pd.quat.w);
    }
    const training = this.mode === 'free' || this.mode === 'precision';
    const ballVisible = !(training && !w.ballActive);
    const vis = this.paused ? 0 : dt;
    this.ballView.update(vis, w.ball.p, w.ball.v, w.ball.w, this.view.camera, ballVisible);
    const holding = !w.ballActive && core.referee.phase === 'hold';
    this.palm.visible = holding;
    if (holding) {
      this.palm.position.set(w.ball.p.x, w.ball.p.y - 0.033, w.ball.p.z);
      this.palm.rotation.y = w.ball.p.z > 0 ? 0 : Math.PI;
    }
    this.table.net.update(dt);
    this.arena.update(dt);
    const viewer = core.controllers[0];
    const body = viewer?.body || { x: 0, z: HL + 0.8 };
    this.rig.update(dt, w.ball.p, body, w.paddles[0].pos);
    this.audio.setListener(this.view.camera.position.x, this.view.camera.position.z);
  }
}

function boot() {
  try {
    window.app = new App();
  } catch (e) {
    console.error(e);
    const l = document.getElementById('loading');
    l.innerHTML = `<span>Não foi possível iniciar o WebGL neste navegador.</span><small>${String(e.message || e)}</small>`;
  }
}
if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', boot);
else boot();
