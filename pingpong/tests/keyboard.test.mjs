// Second player on the keyboard: a scripted player moves with the keys and presses the stroke key
// with human-like timing. Checks that keyboard play returns balls and serves legally.
// Run: node pingpong/tests/keyboard.test.mjs
import { GameCore } from '../js/game/core.js';
import { AIController } from '../js/ai/aiController.js';
import { KeyboardController } from '../js/controls/keyboardController.js';
import { predict, hittableWindow, Trajectory } from '../js/game/prediction.js';
import { makeRng } from '../js/physics/math.js';

const core = new GameCore({ mode: 'versus', bestOf: 99, seed: 4 });
const ai = new AIController(core.world, 0, 'intermediate', { seed: 9 });
const kb = new KeyboardController(core.world, 1, { seed: 3 });
core.setControllers(ai, kb);
const rng = makeRng(5), traj = new Trajectory();
let decided = 0, kbShots = 0, kbLanded = 0, kbServes = 0, kbGoodServes = 0;
core.on('point', () => decided++);
core.on('shot', (s) => { if (s.index === 1) kbShots++; });
core.on('contact', (e) => {
  if (e.type === 'table' && e.side === 0 && core.referee.lastHitter === 1 && core.referee.phase !== 'over') {
    if (core.referee.phase === 'rally') kbLanded++; else kbGoodServes++;
  }
});
core.start();
let pressAt = -1;
while (decided < 30 && core.time < 900) {
  const keys = { left: false, right: false, fwd: false, rev: false, drive: false, top: false, cut: false, toss: false };
  if (kb.serve && kb.serve.phase === 'hold') { if (rng() < 0.02) { keys.toss = true; kbServes++; } }
  else if (kb.incomingBall && core.world.ballActive && !kb.plan) {
    predict(core.world.ball, traj, 1.5, 0.003);
    const w = hittableWindow(traj, 1, kb.needBounce, kb.otherNeed);
    if (w) {
      const i = Math.min(w.end, w.start + 25);
      const dx = traj.px(i) - kb.manualTarget.x;
      if (dx > 0.08) keys.left = true; else if (dx < -0.08) keys.right = true;   // player 2's left is +x
      const tLeft = traj.t(i);
      if (pressAt < 0) pressAt = core.time + tLeft - 0.2 + (rng() - 0.5) * 0.06;
      if (core.time >= pressAt) { keys[rng() < 0.5 ? 'drive' : 'top'] = true; pressAt = -1; }
    }
  } else pressAt = -1;
  kb.setKeys(keys, core.time);
  core.update(1 / 60);
}
console.log(`keyboard player: ${kbShots} strokes, ${kbLanded} rally balls landed, serves ${kbGoodServes}/${kbServes}, score ${core.stats.points.join('-')}`);
const ok = kbLanded >= 5 && kbGoodServes >= 1;
console.log(ok ? '  ✔ keyboard player can rally and serve' : '  ✘ keyboard player cannot play');
process.exit(ok ? 0 : 1);
