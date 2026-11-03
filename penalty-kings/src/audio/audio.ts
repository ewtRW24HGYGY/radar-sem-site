import { Vector3 } from 'three';

type Ctx = AudioContext;

/**
 * Procedural audio: no samples are loaded. Crowd beds are shaped noise and
 * formant-filtered choirs; impacts use modal synthesis whose loudness and
 * brightness follow the physical impact speed reported by the simulation.
 */
export class AudioSystem {
  ctx: Ctx | null = null;
  private master!: GainNode;
  private crowdBus!: GainNode;
  private sfxBus!: GainNode;
  private murmur!: GainNode;
  private roar!: GainNode;
  private roarFilter!: BiquadFilterNode;
  private chant!: GainNode;
  private drone!: GainNode;
  private noise!: AudioBuffer;
  private heartbeatTimer = 0;
  private chantTimer = 0;
  private chantStep = 0;
  private excitement = 0.3;
  private tension = 0;
  private chantOn = false;
  volumes = { master: 0.8, crowd: 0.8, sfx: 0.9 };
  narrator = true;
  private voice: SpeechSynthesisVoice | null = null;
  private whistleTimer = 3;

  /** Must be called from a user gesture. */
  async start(): Promise<void> {
    if (this.ctx) {
      if (this.ctx.state !== 'running') await this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC());
    this.master = ctx.createGain();
    this.master.gain.value = this.volumes.master;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 3;
    this.master.connect(comp).connect(ctx.destination);
    this.crowdBus = ctx.createGain();
    this.crowdBus.gain.value = this.volumes.crowd;
    this.crowdBus.connect(this.master);
    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = this.volumes.sfx;
    this.sfxBus.connect(this.master);
    // Noise buffer
    const len = ctx.sampleRate * 4;
    this.noise = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = this.noise.getChannelData(c);
      let b0 = 0, b1 = 0, b2 = 0;
      let seed = 1234 + c * 999;
      for (let i = 0; i < len; i++) {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        const w = seed / 4294967296 - 0.5;
        // Paul Kellet's pink-ish filter
        b0 = 0.997 * b0 + w * 0.029591;
        b1 = 0.985 * b1 + w * 0.032534;
        b2 = 0.95 * b2 + w * 0.048056;
        d[i] = (b0 + b1 + b2 + w * 0.05) * 2.2;
      }
    }
    // Crowd murmur: several band-limited noise loops with slow independent swells.
    this.murmur = ctx.createGain();
    this.murmur.gain.value = 0.5;
    this.murmur.connect(this.crowdBus);
    for (let i = 0; i < 4; i++) {
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      src.loop = true;
      src.playbackRate.value = 0.82 + i * 0.07;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 420 + i * 260;
      bp.Q.value = 0.7;
      const g = ctx.createGain();
      g.gain.value = 0.18;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07 + i * 0.045;
      const lg = ctx.createGain();
      lg.gain.value = 0.08;
      lfo.connect(lg).connect(g.gain);
      lfo.start();
      const pan = ctx.createStereoPanner();
      pan.pan.value = (i - 1.5) * 0.4;
      src.connect(bp).connect(g).connect(pan).connect(this.murmur);
      src.start(0, i * 0.7);
    }
    // Roar layer (excitement)
    this.roar = ctx.createGain();
    this.roar.gain.value = 0.0;
    this.roarFilter = ctx.createBiquadFilter();
    this.roarFilter.type = 'lowpass';
    this.roarFilter.frequency.value = 1800;
    const rsrc = ctx.createBufferSource();
    rsrc.buffer = this.noise;
    rsrc.loop = true;
    rsrc.connect(this.roarFilter).connect(this.roar).connect(this.crowdBus);
    rsrc.start(0, 1.3);
    // Chant choir (vowel "ô")
    this.chant = ctx.createGain();
    this.chant.gain.value = 0;
    const f1 = ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.value = 520;
    f1.Q.value = 4;
    const f2 = ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.frequency.value = 880;
    f2.Q.value = 5;
    const sum = ctx.createGain();
    sum.gain.value = 0.9;
    f1.connect(sum);
    f2.connect(sum);
    sum.connect(this.chant).connect(this.crowdBus);
    this.chantOscs = [];
    for (let i = 0; i < 10; i++) {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = 196;
      o.detune.value = (i - 5) * 9;
      const g = ctx.createGain();
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(f1);
      g.connect(f2);
      o.start();
      this.chantOscs.push(o);
    }
    // Tension drone
    this.drone = ctx.createGain();
    this.drone.gain.value = 0;
    for (const f of [55, 82.4]) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      o.connect(this.drone);
      o.start();
    }
    this.drone.connect(this.sfxBus);
    this.pickVoice();
  }
  private chantOscs: OscillatorNode[] = [];

  private pickVoice(): void {
    try {
      const pick = () => {
        const vs = window.speechSynthesis?.getVoices() ?? [];
        this.voice = vs.find((v) => v.lang === 'pt-BR') ?? vs.find((v) => v.lang.startsWith('pt')) ?? null;
      };
      pick();
      window.speechSynthesis?.addEventListener?.('voiceschanged', pick);
    } catch {
      /* no speech */
    }
  }

  setVolumes(v: Partial<{ master: number; crowd: number; sfx: number }>): void {
    Object.assign(this.volumes, v);
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.volumes.master, t, 0.05);
    this.crowdBus.gain.setTargetAtTime(this.volumes.crowd, t, 0.05);
    this.sfxBus.gain.setTargetAtTime(this.volumes.sfx, t, 0.05);
  }

  /** 0..1 how loud and agitated the crowd is. */
  setExcitement(x: number): void {
    this.excitement = x;
  }
  /** 0..1 tension of the moment (ducks the crowd, adds a heartbeat). */
  setTension(x: number): void {
    this.tension = x;
  }
  setChant(on: boolean): void {
    this.chantOn = on;
  }

  /** Spatial listener follows the camera. */
  updateListener(pos: Vector3, fwd: Vector3): void {
    const c = this.ctx;
    if (!c) return;
    const l = c.listener;
    if (l.positionX) {
      l.positionX.value = pos.x;
      l.positionY.value = pos.y;
      l.positionZ.value = pos.z;
      l.forwardX.value = fwd.x;
      l.forwardY.value = fwd.y;
      l.forwardZ.value = fwd.z;
      l.upX.value = 0;
      l.upY.value = 1;
      l.upZ.value = 0;
    }
  }

  update(dt: number): void {
    const c = this.ctx;
    if (!c) return;
    const t = c.currentTime;
    const duck = 1 - 0.75 * this.tension;
    this.murmur.gain.setTargetAtTime((0.35 + 0.45 * this.excitement) * duck, t, 0.4);
    this.roar.gain.setTargetAtTime(Math.max(0, this.excitement - 0.45) * 1.4 * duck, t, 0.25);
    this.roarFilter.frequency.setTargetAtTime(900 + 2600 * this.excitement, t, 0.3);
    this.drone.gain.setTargetAtTime(0.06 * this.tension, t, 0.5);
    // Heartbeat under pressure
    if (this.tension > 0.35) {
      this.heartbeatTimer -= dt;
      if (this.heartbeatTimer <= 0) {
        this.heartbeatTimer = 60 / (68 + 50 * this.tension);
        this.thump(52, 0.32 * this.tension, 0.11);
        setTimeout(() => this.thump(48, 0.22 * this.tension, 0.1), 190);
      }
    }
    // Chant: "ô-ô-ô" melodic pattern
    if (this.chantOn && this.tension < 0.3) {
      this.chantTimer -= dt;
      if (this.chantTimer <= 0) {
        const notes = [196, 196, 220, 246.9, 220, 196, 174.6, 196];
        const n = notes[this.chantStep % notes.length];
        this.chantStep++;
        this.chantTimer = this.chantStep % 4 === 0 ? 0.62 : 0.31;
        for (const o of this.chantOscs) o.frequency.setTargetAtTime(n, t, 0.02);
        this.chant.gain.cancelScheduledValues(t);
        this.chant.gain.setValueAtTime(this.chant.gain.value, t);
        this.chant.gain.linearRampToValueAtTime(0.22 * this.volumes.crowd, t + 0.05);
        this.chant.gain.linearRampToValueAtTime(0.05, t + this.chantTimer * 0.95);
      }
    } else {
      this.chant.gain.setTargetAtTime(0, t, 0.3);
    }
    // Scattered whistles from the stands while waiting
    this.whistleTimer -= dt;
    if (this.whistleTimer <= 0) {
      this.whistleTimer = 2.5 + ((this.chantStep * 7919) % 50) / 10;
      if (this.tension > 0.2 && this.tension < 0.8) this.crowdWhistle();
    }
  }

  private env(g: GainNode, t: number, a: number, peak: number, d: number): void {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }

  private spatial(pos: Vector3 | null): AudioNode {
    const c = this.ctx!;
    if (!pos) return this.sfxBus;
    const p = c.createPanner();
    p.panningModel = 'HRTF';
    p.distanceModel = 'inverse';
    p.refDistance = 4;
    p.rolloffFactor = 0.6;
    if (p.positionX) {
      p.positionX.value = pos.x;
      p.positionY.value = pos.y;
      p.positionZ.value = pos.z;
    }
    p.connect(this.sfxBus);
    return p;
  }

  private noiseBurst(out: AudioNode, t: number, f: number, q: number, gain: number, dur: number, type: BiquadFilterType = 'bandpass'): void {
    const c = this.ctx!;
    const s = c.createBufferSource();
    s.buffer = this.noise;
    const bp = c.createBiquadFilter();
    bp.type = type;
    bp.frequency.value = f;
    bp.Q.value = q;
    const g = c.createGain();
    this.env(g, t, 0.003, gain, dur);
    s.connect(bp).connect(g).connect(out);
    s.start(t, (f % 3) + 0.1, dur + 0.1);
  }

  private thump(freq: number, gain: number, dur: number, out: AudioNode = this.sfxBus): void {
    const c = this.ctx;
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq * 2.2, t);
    o.frequency.exponentialRampToValueAtTime(freq, t + dur * 0.6);
    const g = c.createGain();
    this.env(g, t, 0.004, gain, dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  kick(speed: number, pos: Vector3, surface: string): void {
    if (!this.ctx) return;
    const out = this.spatial(pos);
    const k = Math.min(1, speed / 30);
    const t = this.ctx.currentTime;
    this.thump(surface === 'laces' ? 62 : 74, 0.5 + 0.7 * k, 0.12, out);
    this.noiseBurst(out, t, surface === 'inside' ? 900 : 1400, 1.2, 0.25 + 0.5 * k, 0.05);
    this.noiseBurst(out, t, 3500, 2, 0.1 * k, 0.025);
  }

  post(speed: number, pos: Vector3): void {
    const c = this.ctx;
    if (!c) return;
    const out = this.spatial(pos);
    const t = c.currentTime;
    const k = Math.min(1, speed / 25);
    // Modal partials of a 12 cm aluminium tube
    const modes: [number, number, number][] = [
      [612, 1.4, 1],
      [1490, 0.9, 0.6],
      [2730, 0.6, 0.42],
      [4180, 0.4, 0.3],
      [5930, 0.25, 0.18],
    ];
    for (const [f, d, a] of modes) {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.value = f * (1 + 0.002 * k);
      const g = c.createGain();
      this.env(g, t, 0.002, 0.35 * a * (0.3 + k), d * (0.5 + 0.5 * k));
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + d + 0.1);
    }
    this.thump(70, 0.6 * k + 0.2, 0.09, out);
    this.noiseBurst(out, t, 2000, 0.8, 0.3 * k, 0.04);
  }

  net(speed: number, pos: Vector3): void {
    if (!this.ctx) return;
    const out = this.spatial(pos);
    const t = this.ctx.currentTime;
    const k = Math.min(1, speed / 25);
    this.noiseBurst(out, t, 4200, 0.6, 0.35 * k + 0.05, 0.45);
    this.noiseBurst(out, t + 0.02, 800, 0.8, 0.25 * k, 0.3);
  }

  glove(speed: number, pos: Vector3): void {
    if (!this.ctx) return;
    const out = this.spatial(pos);
    const t = this.ctx.currentTime;
    const k = Math.min(1, speed / 25);
    this.noiseBurst(out, t, 1100, 1.4, 0.45 * k + 0.1, 0.07);
    this.thump(95, 0.35 * k + 0.1, 0.07, out);
  }

  bounce(speed: number, pos: Vector3): void {
    if (!this.ctx) return;
    const out = this.spatial(pos);
    this.thump(85, Math.min(0.5, speed / 18), 0.07, out);
    this.noiseBurst(out, this.ctx.currentTime, 600, 0.9, Math.min(0.15, speed / 60), 0.05);
  }

  board(speed: number, pos: Vector3): void {
    if (!this.ctx) return;
    const out = this.spatial(pos);
    this.thump(120, Math.min(0.6, speed / 20), 0.1, out);
    this.noiseBurst(out, this.ctx.currentTime, 300, 1.5, Math.min(0.4, speed / 30), 0.15);
  }

  whistle(long = false): void {
    const c = this.ctx;
    if (!c) return;
    const t = c.currentTime;
    const dur = long ? 1.1 : 0.45;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
    g.gain.setValueAtTime(0.18, t + dur - 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const trill = c.createOscillator();
    trill.frequency.value = 28;
    const tg = c.createGain();
    tg.gain.value = 0.08;
    trill.connect(tg).connect(g.gain);
    for (const f of [2950, 3180]) {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      o.connect(g);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
    trill.start(t);
    trill.stop(t + dur);
    g.connect(this.sfxBus);
  }

  private crowdWhistle(): void {
    const c = this.ctx!;
    const t = c.currentTime;
    const o = c.createOscillator();
    o.type = 'sine';
    const f = 2200 + ((this.chantStep * 331) % 900);
    o.frequency.setValueAtTime(f, t);
    o.frequency.linearRampToValueAtTime(f * 1.15, t + 0.35);
    const g = c.createGain();
    this.env(g, t, 0.03, 0.035, 0.4);
    const pan = c.createStereoPanner();
    pan.pan.value = ((this.chantStep * 0.37) % 2) - 1;
    o.connect(g).connect(pan).connect(this.crowdBus);
    o.start(t);
    o.stop(t + 0.5);
  }

  /** Big reaction: goal roar, save cheer, post gasp, groan. */
  reaction(kind: 'goal' | 'save' | 'post' | 'miss' | 'gasp', intensity = 1): void {
    const c = this.ctx;
    if (!c) return;
    const t = c.currentTime;
    const g = c.createGain();
    const s = c.createBufferSource();
    s.buffer = this.noise;
    const f = c.createBiquadFilter();
    f.type = kind === 'miss' || kind === 'gasp' ? 'bandpass' : 'lowpass';
    s.connect(f).connect(g).connect(this.crowdBus);
    if (kind === 'goal' || kind === 'save') {
      f.frequency.setValueAtTime(900, t);
      f.frequency.linearRampToValueAtTime(3800, t + 0.4);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(1.2 * intensity, t + 0.25);
      g.gain.setTargetAtTime(0.5 * intensity, t + 1.2, 1.2);
      g.gain.setTargetAtTime(0.0001, t + 4.5, 0.8);
      s.start(t, 0.5, 8);
    } else {
      // "Ohhh": falling formant
      f.Q.value = 3;
      f.frequency.setValueAtTime(kind === 'post' ? 780 : 700, t);
      f.frequency.exponentialRampToValueAtTime(330, t + 1.4);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(1.4 * intensity, t + 0.15);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
      s.start(t, 1.1, 3);
    }
  }

  say(text: string, excited = false): void {
    if (!this.narrator) return;
    try {
      const ss = window.speechSynthesis;
      if (!ss) return;
      ss.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR';
      if (this.voice) u.voice = this.voice;
      u.rate = excited ? 1.15 : 1.0;
      u.pitch = excited ? 1.2 : 1.0;
      u.volume = 0.9 * this.volumes.master;
      ss.speak(u);
    } catch {
      /* ignore */
    }
  }
}
