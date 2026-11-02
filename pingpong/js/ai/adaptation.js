// Opponent model: the AI watches how the human plays and adapts its targets and shot choice.
// Tracks the human's error rate per zone (forehand / backhand / middle, short / long) and their
// style (pace, spin, distance from the table).
export class OpponentModel {
  constructor() { this.reset(); }
  reset() {
    this.zones = {};
    for (const z of ['fh', 'bh', 'mid']) for (const d of ['short', 'long']) this.zones[`${z}-${d}`] = { att: 0, miss: 0 };
    this.shots = 0; this.speedSum = 0; this.topCount = 0; this.backCount = 0; this.depthSum = 0;
    this.pending = null;
  }
  zoneKeys() { return Object.keys(this.zones); }
  // AI decided to play towards a zone
  attempt(zone) { this.pending = zone; }
  // The human returned the ball (or failed)
  result(success) {
    if (!this.pending) return;
    const z = this.zones[this.pending];
    z.att++; if (!success) z.miss++;
    this.pending = null;
  }
  // A human stroke: speed (m/s), topspin (rad/s, + top / − back), distance behind the end line (m)
  shot(speed, top, depth) {
    this.shots++; this.speedSum += speed; this.depthSum += depth;
    if (top > 60) this.topCount++; else if (top < -60) this.backCount++;
  }
  weakness(key) { const z = this.zones[key]; return (z.miss + 1) / (z.att + 3); }
  // exploit ∈ [0,1]: 0 = random placement, 1 = strongly targets the weakest zone
  pickZone(rng, exploit) {
    const keys = this.zoneKeys();
    const ws = keys.map((k) => Math.exp(exploit * 6 * this.weakness(k)));
    const sum = ws.reduce((a, b) => a + b, 0);
    let r = rng() * sum;
    for (let i = 0; i < keys.length; i++) { r -= ws[i]; if (r <= 0) return keys[i]; }
    return keys[keys.length - 1];
  }
  get avgSpeed() { return this.shots ? this.speedSum / this.shots : 0; }
  get avgDepth() { return this.shots ? this.depthSum / this.shots : 0.5; }
  get topShare() { return this.shots ? this.topCount / this.shots : 0; }
  get backShare() { return this.shots ? this.backCount / this.shots : 0; }
  // Short Portuguese description for the pause screen
  describe() {
    if (this.shots < 4) return 'A IA ainda está estudando o seu jogo.';
    const names = { fh: 'forehand', bh: 'backhand', mid: 'corpo (meio)' };
    let worst = null, wv = -1;
    for (const k of this.zoneKeys()) { const z = this.zones[k]; if (z.att >= 2 && this.weakness(k) > wv) { wv = this.weakness(k); worst = k; } }
    const parts = [];
    if (worst) {
      const [zn, dp] = worst.split('-');
      parts.push(`Mirando no seu ${names[zn]} ${dp === 'short' ? 'curto' : 'longo'} (erro ${Math.round(this.zones[worst].miss / Math.max(1, this.zones[worst].att) * 100)}%).`);
    }
    if (this.topShare > 0.45) parts.push('Você usa muito topspin: a IA bloqueia mais e encurta as bolas.');
    else if (this.backShare > 0.4) parts.push('Você corta muito: a IA responde com mais loops.');
    if (this.avgDepth > 1.0) parts.push('Você joga longe da mesa: espere bolas curtas.');
    else if (this.avgDepth < 0.35) parts.push('Você joga colado à mesa: espere bolas longas e rápidas.');
    return parts.join(' ') || 'A IA está variando as jogadas.';
  }
}
