// Procedural audio (Web Audio API). Every impact sound is synthesised from noise + resonators and
// scaled by the contact's intensity, so a soft push, a block and a smash all sound different.
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.8;
    this.ambientVolume = 0.5;
    this.listenerX = 0; this.listenerZ = 3;
  }

  // Must be called from a user gesture
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { this.enabled = false; return; }
    const ctx = this.ctx = new AC();
    this.master = ctx.createGain(); this.master.gain.value = this.volume;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 3;
    this.master.connect(comp).connect(ctx.destination);
    // gym reverb
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this.impulse(1.9, 2.6);
    this.wet = ctx.createGain(); this.wet.gain.value = 0.22;
    this.reverb.connect(this.wet).connect(this.master);
    this.noise = this.noiseBuffer(1.5);
    this.startAmbient();
  }
  noiseBuffer(sec) {
    const b = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * sec), this.ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  impulse(sec, decay) {
    const ctx = this.ctx, len = Math.floor(ctx.sampleRate * sec);
    const b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay) * (i < 400 ? i / 400 : 1);
    }
    return b;
  }
  setVolume(v) { this.volume = v; if (this.master) this.master.gain.value = v; }
  setAmbient(v) { this.ambientVolume = v; if (this.ambGain) this.ambGain.gain.value = 0.05 * v; if (this.crowdGain) this.crowdGain.gain.value = 0.03 * v; }
  setListener(x, z) { this.listenerX = x; this.listenerZ = z; }

  // spatial output: stereo pan + distance attenuation
  out(x = 0, z = 0, gain = 1, reverb = 0.25) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    const dist = Math.hypot(x - this.listenerX, z - this.listenerZ);
    g.gain.value = gain / (1 + dist * 0.18);
    let node = g;
    if (ctx.createStereoPanner) {
      const p = ctx.createStereoPanner();
      p.pan.value = Math.max(-0.8, Math.min(0.8, (x - this.listenerX) / 2.2));
      g.connect(p); node = p;
    }
    node.connect(this.master);
    if (reverb > 0) { const s = ctx.createGain(); s.gain.value = reverb; node.connect(s).connect(this.reverb); }
    return g;
  }
  burst(dest, t, dur, freq, q, type = 'bandpass', gain = 1) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this.noise;
    src.playbackRate.value = 0.9 + Math.random() * 0.2;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + 0.0008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(dest);
    src.start(t, Math.random() * 1.0); src.stop(t + dur + 0.02);
  }
  tone(dest, t, dur, f0, f1, gain, type = 'sine') {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(dest); o.start(t); o.stop(t + dur + 0.02);
  }
  ready() { return this.enabled && this.ctx && this.ctx.state === 'running'; }

  // ——— Game sounds ———
  paddle(speed, slip, part, x, z) {
    if (!this.ready()) return;
    const t = this.ctx.currentTime;
    const I = Math.min(1, speed / 14);
    const out = this.out(x, z, 0.35 + 0.9 * I, 0.22);
    if (part === 'edge') {
      this.tone(out, t, 0.05, 1900, 1500, 0.5, 'triangle');
      this.burst(out, t, 0.03, 3200, 2, 'bandpass', 0.6);
      return;
    }
    // hollow ball "tock" + wooden blade body + rubber softness
    this.burst(out, t, 0.018 + 0.012 * (1 - I), 1700 + 1400 * I, 1.6, 'bandpass', 0.9);
    this.tone(out, t, 0.045, 720 + 260 * I, 520, 0.45 * (0.5 + I));
    this.tone(out, t, 0.03, 1350 + 300 * I, 1150, 0.18);
    // brushing (spin) adds a short grainy hiss
    if (slip > 3) this.burst(out, t + 0.002, 0.04, 5200, 0.8, 'highpass', Math.min(0.45, slip / 40));
  }
  table(speed, x, z, edge) {
    if (!this.ready()) return;
    const t = this.ctx.currentTime;
    const I = Math.min(1, speed / 7);
    const out = this.out(x, z, 0.25 + 0.85 * I, 0.3);
    const pitch = 1 + (Math.abs(z) / 1.37) * 0.08 + (Math.abs(x) / 0.76) * 0.05;
    this.burst(out, t, 0.022, 2300 * pitch, 3.5, 'bandpass', 0.9);
    this.tone(out, t, 0.06, 1180 * pitch, 980, 0.32 * (0.4 + I));
    this.tone(out, t, 0.09, 190, 120, 0.25 * I);                 // table board thump
    if (edge) this.tone(out, t, 0.04, 2600, 2000, 0.2, 'triangle');
  }
  net(speed, part, x) {
    if (!this.ready()) return;
    const t = this.ctx.currentTime;
    const I = Math.min(1, speed / 8);
    const out = this.out(x, 0, 0.2 + 0.6 * I, 0.2);
    if (part === 'tape') { this.burst(out, t, 0.03, 2800, 2.5, 'bandpass', 0.7); this.tone(out, t, 0.03, 1600, 1200, 0.15); }
    else if (part === 'post') { this.tone(out, t, 0.08, 2400, 2300, 0.4, 'triangle'); }
    else this.burst(out, t, 0.09, 700, 0.8, 'lowpass', 0.8);
  }
  floor(speed, x, z) {
    if (!this.ready()) return;
    const t = this.ctx.currentTime;
    const I = Math.min(1, speed / 7);
    const out = this.out(x, z, 0.15 + 0.6 * I, 0.35);
    this.burst(out, t, 0.03, 1300, 2, 'bandpass', 0.8);
    this.tone(out, t, 0.06, 900, 700, 0.25 * I);
    this.tone(out, t, 0.08, 130, 90, 0.2 * I);
  }
  barrier(speed, x, z) {
    if (!this.ready()) return;
    const t = this.ctx.currentTime;
    const out = this.out(x, z, 0.3 * Math.min(1, speed / 6), 0.3);
    this.burst(out, t, 0.06, 400, 1, 'lowpass', 0.8);
  }

  // ——— Ambience ———
  startAmbient() {
    const ctx = this.ctx;
    // room tone: filtered brown-ish noise
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuffer(4); src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 380;
    this.ambGain = ctx.createGain(); this.ambGain.gain.value = 0.05 * this.ambientVolume;
    src.connect(lp).connect(this.ambGain).connect(this.master); src.start();
    // crowd murmur: band-passed noise with slow modulation
    const cs = ctx.createBufferSource(); cs.buffer = this.noiseBuffer(5); cs.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 520; bp.Q.value = 0.7;
    this.crowdGain = ctx.createGain(); this.crowdGain.gain.value = 0.03 * this.ambientVolume;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.13;
    const lfoG = ctx.createGain(); lfoG.gain.value = 0.012 * this.ambientVolume;
    lfo.connect(lfoG).connect(this.crowdGain.gain); lfo.start();
    cs.connect(bp).connect(this.crowdGain).connect(this.reverb); cs.start();
    this.crowdGain.connect(this.master);
    this.scheduleSqueak();
  }
  scheduleSqueak() {
    setTimeout(() => {
      if (this.ready() && this.ambientVolume > 0) {
        const t = this.ctx.currentTime;
        const out = this.out((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 20, 0.05 * this.ambientVolume, 0.6);
        const o = this.ctx.createOscillator(); o.type = 'sawtooth';
        const f = 1800 + Math.random() * 1200;
        o.frequency.setValueAtTime(f, t); o.frequency.linearRampToValueAtTime(f * 1.3, t + 0.06); o.frequency.linearRampToValueAtTime(f * 0.9, t + 0.12);
        const bp = this.ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 6;
        const g = this.ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.4, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
        o.connect(bp).connect(g).connect(out); o.start(t); o.stop(t + 0.15);
      }
      this.scheduleSqueak();
    }, 6000 + Math.random() * 14000);
  }
  applause(strength = 1) {
    if (!this.ready() || this.ambientVolume <= 0) return;
    const ctx = this.ctx, t0 = ctx.currentTime;
    const n = Math.floor(40 + 120 * strength);
    const out = this.out(0, 0, 0.5 * this.ambientVolume * strength, 0.6);
    for (let i = 0; i < n; i++) {
      const t = t0 + Math.pow(Math.random(), 1.6) * (1.2 + strength);
      this.burst(out, t, 0.02 + Math.random() * 0.02, 1200 + Math.random() * 1800, 1.2, 'bandpass', 0.25 + Math.random() * 0.4);
    }
  }

  // ——— UI ———
  ui(kind = 'click') {
    if (!this.ready()) return;
    const t = this.ctx.currentTime;
    const out = this.out(this.listenerX, this.listenerZ - 0.5, 0.25, 0);
    if (kind === 'click') this.tone(out, t, 0.05, 1200, 900, 0.35, 'triangle');
    else if (kind === 'hover') this.tone(out, t, 0.03, 1700, 1600, 0.12);
    else if (kind === 'confirm') { this.tone(out, t, 0.12, 660, 660, 0.3); this.tone(out, t + 0.08, 0.18, 990, 990, 0.3); }
    else if (kind === 'point') { this.tone(out, t, 0.18, 880, 880, 0.22); this.tone(out, t + 0.1, 0.25, 1320, 1320, 0.2); }
    else if (kind === 'lose') { this.tone(out, t, 0.25, 520, 380, 0.22); }
    else if (kind === 'whistle') { const o = this.out(2.7, 0, 0.18, 0.4); this.tone(o, t, 0.35, 2600, 2550, 0.4, 'sine'); this.tone(o, t, 0.35, 2650, 2600, 0.2, 'square'); }
  }
}
