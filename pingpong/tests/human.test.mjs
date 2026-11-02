// Virtual human: drives the HumanController like a person with a mouse would (moves into position,
// waits, flicks forward) to check the controls are playable with each assist level.
// Run: node pingpong/tests/human.test.mjs
import { GameCore } from '../js/game/core.js';
import { AIController } from '../js/ai/aiController.js';
import { HumanController } from '../js/controls/humanController.js';
import { predict, hittableWindow, Trajectory } from '../js/game/prediction.js';
import { makeRng } from '../js/physics/math.js';

let failures = 0;
const check = (name, cond, info = '') => { console.log(`  ${cond ? '✔' : '✘'} ${name} ${info}`); if (!cond) failures++; };

function run(assist, stroke, points, seed, flickSpeed = 6) {
  const core = new GameCore({ mode: 'match', bestOf: 99, seed });
  const settings = { assist };
  const human = new HumanController(core.world, 0, settings);
  const ai = new AIController(core.world, 1, 'intermediate', { seed: seed + 3 });
  core.setControllers(human, ai);
  const rng = makeRng(seed);
  const traj = new Trajectory();
  let returns = 0, attempts = 0, serves = 0, goodServes = 0, decided = 0;
  let plan = null;              // { tContact, x, z }
  let lastIncomingHit = -1;
  core.on('shot', (s) => {
    if (s.index === 1) { plan = null; lastIncomingHit = core.time; }
  });
  core.on('contact', (ev) => {
    if (ev.type === 'table' && ev.side === 1 && core.referee.lastHitter === 0 && core.referee.phase !== 'over') {
      if (core.referee.phase === 'rally') returns++;
    }
  });
  const why = {};
  core.on('point', (d) => { decided++; if (d.winner === 1) why[d.reason] = (why[d.reason] || 0) + 1; });
  core.on('serve', (d) => { plan = null; });
  core.start();
  const fdt = 1 / 60;
  let tx = 0.1, tz = 1.9, swingStart = -1, tossAt = -1;
  let inSwing = false;
  while (decided < points && core.time < points * 30) {
    const t = core.time;
    const buttons = { top: stroke === 'top', back: stroke === 'back', toss: false };
    // serve
    if (human.serve && human.serve.phase === 'hold') {
      if (tossAt < 0) tossAt = t + 0.5 + rng() * 0.3;
      if (t >= tossAt) { buttons.toss = true; tossAt = -1; serves++; }
      tx = 0.0; tz = 1.75;
    }
    if (human.serve && human.serve.phase === 'tossed') {
      const b = core.world.ball;
      if (!inSwing && b.v.y < 0 && b.p.y < 1.12) { inSwing = true; swingStart = t; }
      if (inSwing) tz = 1.75 - Math.min(0.55, (t - swingStart) * flickSpeed * 0.8);
      tx = 0.0;   // a person keeps the serving stance (the ball is held in front of the racket)
    } else if (human.incoming && core.world.ballActive) {
      // read the ball (a person sees it): where will it be at a comfortable height after the bounce?
      if (!plan || t - plan.made > 0.12) {
        predict(core.world.ball, traj, 1.6, 0.003);
        const w = hittableWindow(traj, 0, human.need, human.otherNeed);
        if (w) {
          let best = -1;
          for (let i = w.start + 1; i <= w.end; i++) { if (traj.pz(i) > 1.3 && traj.py(i) > 0.85 && traj.py(i) >= traj.py(i - 1) - 0.002 && traj.data[i * 13 + 5] < 0.4) { best = i; break; } }
          if (best < 0) best = w.end;
          plan = { made: t, tContact: t + traj.t(best), x: traj.px(best), z: traj.pz(best) };
          attempts += plan.counted ? 0 : 0;
        }
      }
      if (plan) {
        const dt = plan.tContact - t;
        const lead = 0.09;
        // wait behind the contact point, then flick through it
        const back = 0.45;
        tx = plan.x + 0.0;
        if (dt > lead) tz = plan.z + back;
        else tz = plan.z + back - (lead - dt) * flickSpeed;
      }
    } else {
      inSwing = false;
      tx += (0.1 - tx) * 0.1; tz += (1.9 - tz) * 0.1;
    }
    human.setFrameInput(tx, tz, buttons, core.time, fdt);
    core.update(fdt);
  }
  const st = core.stats;
  return { why, returns, points: st.points, shots: st.shots[0], fastest: st.fastest[0] * 3.6, longest: st.longestRally };
}

for (const [assist, stroke] of [['full', 'normal'], ['full', 'top'], ['partial', 'normal'], ['partial', 'top'], ['off', 'normal']]) {
  const r = run(assist, stroke, 30, 21);
  const rate = r.returns / Math.max(1, r.shots);
  console.log(`assist=${assist} stroke=${stroke}: score ${r.points.join('-')} | strokes ${r.shots}, landed ${r.returns} (${(rate * 100).toFixed(0)}%), fastest ${r.fastest.toFixed(0)} km/h, longest rally ${r.longest}`);
  console.log('    lost by:', JSON.stringify(r.why));
  // the virtual player uses one fixed flick for every ball, so these are lower bounds
  if (assist === 'full') check(`full assist (${stroke}) lets a simple player return balls`, rate > (stroke === 'top' ? 0.15 : 0.45));
  if (assist === 'partial' && stroke === 'normal') check('partial assist is playable', rate > 0.08);
}
console.log(failures ? `\n${failures} failed` : '\nall passed');
process.exit(failures ? 1 : 0);
