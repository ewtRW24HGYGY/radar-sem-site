// Headless AI-vs-AI matches: checks the AI returns balls with the real physics, that
// difficulty levels behave differently and that the official rules flow works.
// Run: node pingpong/tests/ai.test.mjs [points]
import { GameCore } from '../js/game/core.js';
import { AIController } from '../js/ai/aiController.js';

const POINTS = Number(process.argv[2] || 60);
let failures = 0;
const check = (name, cond, info = '') => { console.log(`  ${cond ? '✔' : '✘'} ${name} ${info}`); if (!cond) failures++; };

function playMatch(l0, l1, points, seed, mode = 'match') {
  const core = new GameCore({ mode, bestOf: 99, seed });
  const a = new AIController(core.world, 0, l0, { seed: seed * 7 + 1, coop: mode === 'rally' });
  const b = new AIController(core.world, 1, l1, { seed: seed * 13 + 5, coop: mode === 'rally' });
  core.setControllers(a, b);
  const reasons = {}; const rallies = []; let decided = 0, lets = 0;
  const shots = []; let maxSpeed = 0;
  core.on('point', (d) => { if (d.let) lets++; else { decided++; reasons[d.reason] = (reasons[d.reason] || 0) + 1; rallies.push(d.rally); } });
  core.on('rallyEnd', (d) => { decided++; rallies.push(d.hits); reasons[d.reason] = (reasons[d.reason] || 0) + 1; });
  core.on('shot', (s) => { shots.push(s); maxSpeed = Math.max(maxSpeed, s.kmh); });
  core.start();
  const t0 = Date.now();
  while (decided < points && core.time < points * 40) core.step(0.001);
  const avg = rallies.reduce((x, y) => x + y, 0) / Math.max(1, rallies.length);
  return { core, reasons, rallies, avg, lets, decided, ms: Date.now() - t0, shots, maxSpeed };
}

for (const lvl of ['beginner', 'intermediate', 'advanced', 'pro']) {
  const r = playMatch(lvl, lvl, POINTS, 3);
  const st = r.core.stats;
  const tops = r.shots.filter((s) => s.rps > 15).length, backs = r.shots.filter((s) => s.rps < -10).length;
  console.log(`\n${lvl} vs ${lvl}: ${r.decided} points in ${r.core.time.toFixed(0)} s sim (${r.ms} ms real), avg strokes/point ${r.avg.toFixed(2)}, lets ${r.lets}, max ${r.maxSpeed.toFixed(0)} km/h, top ${tops} / back ${backs}`);
  console.log('   ', Object.entries(r.reasons).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`).join(' | '));
  check(`${lvl}: points get decided`, r.decided >= POINTS * 0.95);
  check(`${lvl}: rallies happen (avg strokes ≥ 2.5)`, r.avg >= 2.5, `avg=${r.avg.toFixed(2)}`);
}
const coop = playMatch('intermediate', 'intermediate', 3, 5, 'rally');
const coopHits = Math.max(coop.core.rallyHits, ...coop.rallies);
console.log(`\nrally mode: longest cooperative rally ${coopHits} strokes`);
check('cooperative rally mode produces long rallies', coopHits > 30, `hits=${coopHits}`);
const mixed = playMatch('pro', 'beginner', POINTS, 11);
console.log(`\npro vs beginner: ${mixed.core.stats.points.join(' - ')}`);
check('pro beats beginner clearly', mixed.core.stats.points[0] > mixed.core.stats.points[1] * 1.6);
console.log(failures ? `\n${failures} failed` : '\nall passed');
process.exit(failures ? 1 : 0);
