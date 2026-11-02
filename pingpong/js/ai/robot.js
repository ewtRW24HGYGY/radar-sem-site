// Ball machine for the training modes: launches balls with configurable spin, speed and placement.
// The launch velocity is solved with the physics model so the ball lands where it was aimed.
import { V3, makeRng } from '../physics/math.js';
import { TABLE_HALF_L as HL, TABLE_HEIGHT } from '../physics/constants.js';
import { solveLaunchAdaptive } from './shotSolver.js';

const RPS = 2 * Math.PI;

export class RobotController {
  constructor(world, index = 1, settings = {}) {
    this.world = world;
    this.index = index;
    this.side = index === 0 ? 1 : -1;
    this.pd = world.paddles[index];
    this.pd.enabled = false;
    this.settings = { spin: 'mixed', speed: 'medium', placement: 'random', interval: 1.8, ...settings };
    this.rng = makeRng(1234);
    this.body = new V3(0, 0, this.side * (HL + 0.5));
    this.lastLaunch = null;
    this.onFeed = null;
    this.reset();
  }
  get interval() { return this.settings.interval; }
  reset() { this.pd.teleport(new V3(0, -2, this.side * 6)); }
  cancel() {}
  startServe() {}
  update() { this.pd.pos.set(0, -2, this.side * 6); }

  feed(t) {
    const st = this.settings, r = this.rng;
    const kinds = ['top', 'back', 'side', 'none'];
    const kind = st.spin === 'mixed' ? kinds[(r() * kinds.length) | 0] : st.spin;
    const base = { slow: 5.5, medium: 8, fast: 11.5 }[st.speed] || 8;
    let speed = base * (0.92 + r() * 0.16);
    let top = 0, side = 0;
    if (kind === 'top') top = (28 + r() * 20) * RPS;
    else if (kind === 'back') { top = -(25 + r() * 18) * RPS; speed *= 0.85; }
    else if (kind === 'side') { top = 8 * RPS; side = (r() < 0.5 ? -1 : 1) * (25 + r() * 15) * RPS; }
    const opp = -this.side;           // the player's half
    const fh = opp;                   // player's forehand side is +x for the player at +z
    let tx;
    switch (st.placement) {
      case 'fh': tx = fh * (0.3 + r() * 0.35); break;
      case 'bh': tx = -fh * (0.3 + r() * 0.35); break;
      case 'center': tx = (r() - 0.5) * 0.3; break;
      default: tx = (r() - 0.5) * 1.25;
    }
    const tz = opp * (kind === 'back' ? 0.55 + r() * 0.45 : 0.75 + r() * 0.45);
    const origin = new V3((r() - 0.5) * 0.2, TABLE_HEIGHT + 0.19, this.side * (HL + 0.06));
    const sol = solveLaunchAdaptive(origin, speed, top, side, tx, tz, { minClear: 0.05 });
    if (!sol) return false;
    this.world.launchBall(origin, sol.v, sol.w);
    this.lastLaunch = { t, dir: sol.v.clone(), kind };
    if (this.onFeed) this.onFeed(this.lastLaunch);
    return true;
  }
}
