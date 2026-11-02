// Easy controls: a scripted player only moves sideways (with human lag and imprecision) and serves.
// Run: node pingpong/tests/easy.test.mjs
import { GameCore } from '../js/game/core.js';
import { AIController } from '../js/ai/aiController.js';
import { EasyController } from '../js/controls/easyController.js';
import { predict, hittableWindow, Trajectory } from '../js/game/prediction.js';
import { makeRng } from '../js/physics/math.js';

let failures = 0;
for (const [level, sloppy] of [['beginner', 0.05], ['intermediate', 0.12], ['advanced', 0.2]]) {
  const core = new GameCore({ mode: 'match', bestOf: 99, seed: 2 });
  const me = new EasyController(core.world, 0, { seed: 4 });
  const ai = new AIController(core.world, 1, level, { seed: 8 });
  core.setControllers(me, ai);
  const rng = makeRng(11), traj = new Trajectory();
  let decided = 0, myShots = 0, landed = 0, serves = 0, goodServes = 0, x = 0, goal = 0, nextRead = 0;
  const why = {};
  core.on('point', (d) => { decided++; if (d.winner === 1) why[d.reason] = (why[d.reason] || 0) + 1; });
  core.on('shot', (s) => { if (s.index === 0) myShots++; });
  core.on('contact', (e) => {
    if (e.type === 'table' && e.side === 1 && core.referee.lastHitter === 0 && core.referee.phase !== 'over') {
      if (core.referee.phase === 'rally') landed++; else goodServes++;
    }
  });
  core.start();
  while (decided < 30 && core.time < 900) {
    const t = core.time;
    let toss = false;
    if (me.serve && me.serve.phase === 'hold' && rng() < 0.03) { toss = true; serves++; }
    if (me.incomingBall && core.world.ballActive && t >= nextRead) {
      nextRead = t + 0.15 + rng() * 0.1;              // a person re-reads the ball a few times a second
      predict(core.world.ball, traj, 1.5, 0.004);
      const w = hittableWindow(traj, 0, me.needBounce, me.otherNeed);
      if (w) goal = traj.px(Math.min(w.end, w.start + 30)) + (rng() - 0.5) * 2 * sloppy;
    }
    x += (goal - x) * (1 - Math.exp(-(1 / 60) / 0.12));   // hand lag
    me.setPointer(x, { top: rng() < 0.3, back: false, toss }, t, 1 / 60);
    core.update(1 / 60);
  }
  const rate = landed / Math.max(1, myShots - goodServes);
  console.log(`vs ${level}: score ${core.stats.points.join('-')}, strokes ${myShots}, landed ${landed} (${(rate * 100).toFixed(0)}%), serves ${goodServes}/${serves}, lost by ${JSON.stringify(why)}`);
  if (rate < 0.5 || goodServes < serves * 0.7) { failures++; console.log('  ✘ easy controls should be forgiving'); } else console.log('  ✔ playable');
}
process.exit(failures ? 1 : 0);
