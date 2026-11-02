// Physics validation suite. Run: node pingpong/tests/physics.test.mjs
import { V3, Quat } from '../js/physics/math.js';
import { BallState, impact } from '../js/physics/ball.js';
import { World, simulate } from '../js/physics/world.js';
import { TABLE_HEIGHT, BALL_RADIUS, MATERIALS, PHYSICS_DT, NET_HEIGHT } from '../js/physics/constants.js';

let failures = 0, passes = 0;
function check(name, cond, info = '') {
  if (cond) { passes++; console.log(`  ✔ ${name} ${info}`); }
  else { failures++; console.log(`  ✘ ${name} ${info}`); }
}
const f = (x, d = 3) => Number(x).toFixed(d);
const rps = (w) => w / (2 * Math.PI);

function flight(p, v, w, maxT = 3, stopOnFirstTable = false) {
  const st = new BallState(); st.p.copy(p); st.v.copy(v); st.w.copy(w);
  const events = []; let apex = -Infinity; const samples = [];
  simulate(st, maxT, 0.001, (t, s) => { samples.push({ t, p: s.p.clone(), v: s.v.clone(), w: s.w.clone() }); apex = Math.max(apex, s.p.y); }, (ev, t, s) => {
    events.push({ ...ev, t, v: s.v.clone(), w: s.w.clone(), p: s.p.clone() });
    return stopOnFirstTable && ev.type === 'table';
  });
  return { events, samples, apex };
}

console.log('1. Bounce on the table (ITTF: dropped from 30.5 cm must rebound 23–26 cm)');
{
  const top = TABLE_HEIGHT + BALL_RADIUS;
  const st = new BallState(); st.p.set(0, top + 0.305, 0.5);
  let bounced = false, apex = 0;
  simulate(st, 1.2, 0.001, (t, s) => { if (bounced) apex = Math.max(apex, s.p.y - top); }, (ev) => { if (ev.type === 'table') { if (bounced) return true; bounced = true; } });
  check('rebound height', apex > 0.23 && apex < 0.26, `= ${f(apex * 100, 1)} cm`);
}

console.log('2. Spin changes the trajectory (Magnus)');
{
  const p = new V3(0, 1.25, 1.6), v = new V3(0, 0.6, -7.5);
  const land = (w) => flight(p, v, w, 2, true).events.find((e) => e.type === 'table');
  const flat = land(new V3()), top = land(new V3(-400, 0, 0)), back = land(new V3(400, 0, 0)), side = land(new V3(0, 300, 0));
  // For a ball travelling -z, topspin axis is up × dir = (0,1,0)×(0,0,-1) = (-1,0,0)
  check('topspin dips (lands shorter)', top && flat && top.pos.z > flat.pos.z + 0.15, `top z=${f(top?.pos.z)} flat z=${f(flat?.pos.z)}`);
  check('backspin floats (lands longer or flies off)', !back || back.pos.z < flat.pos.z - 0.1, `back z=${back ? f(back.pos.z) : 'out'}`);
  check('sidespin curves sideways', side && Math.abs(side.pos.x) > 0.08, `side x=${f(side?.pos.x)}`);
}

console.log('3. Spin changes the bounce (friction)');
{
  const bounceOut = (w) => {
    const st = new BallState(); st.p.set(0, TABLE_HEIGHT + 0.25, 0.8); st.v.set(0, -2.5, -7); st.w.copy(w);
    let out = null;
    simulate(st, 1, 0.001, null, (ev, t, s) => { if (ev.type === 'table') { out = { v: s.v.clone(), w: s.w.clone() }; return true; } });
    return out;
  };
  const top = bounceOut(new V3(-500, 0, 0)), back = bounceOut(new V3(500, 0, 0)), none = bounceOut(new V3());
  check('topspin kicks forward faster', top.v.z < none.v.z - 0.3, `vz top=${f(top.v.z, 2)} none=${f(none.v.z, 2)}`);
  check('backspin rebounds slower than topspin', back.v.z > top.v.z + 1.5, `vz back=${f(back.v.z, 2)}`);
  check('backspin ball keeps backspin after the bounce', back.w.x > 100, `wx=${f(back.w.x, 0)}`);
  check('backspin bounces higher-angle (kicks up less forward)', Math.abs(back.v.z) < Math.abs(top.v.z), '');
  check('flat ball picks up topspin from table friction', none.w.x < -50, `wx=${f(none.w.x, 0)} rad/s`);
}

console.log('4. Net interaction');
{
  const low = flight(new V3(0, TABLE_HEIGHT + 0.07, 0.8), new V3(0, 0.6, -6), new V3(), 2);
  const netEv = low.events.find((e) => e.type === 'net');
  const after = low.samples.find((s) => netEv && s.t > netEv.t + 0.05);
  check('ball into the mesh is stopped', netEv && netEv.part === 'mesh' && after && after.p.z > -0.05, `part=${netEv?.part} z after=${f(after?.p.z)}`);
  // ball clipping the tape
  const tape = flight(new V3(0, TABLE_HEIGHT + NET_HEIGHT + 0.012, 0.25), new V3(0, 0.0, -5), new V3(-150, 0, 0), 2);
  const tEv = tape.events.find((e) => e.type === 'net');
  check('ball clipping the tape is deflected (net cord)', tEv && tEv.part === 'tape', `part=${tEv?.part} vOut=(${f(tEv?.v.y, 2)}, ${f(tEv?.v.z, 2)})`);
  const clear = flight(new V3(0, TABLE_HEIGHT + 0.3, 1.2), new V3(0, 0.5, -7), new V3(), 2, true);
  check('high ball clears the net', !clear.events.some((e) => e.type === 'net'), '');
}

console.log('5. Racket impacts');
{
  const run = (paddleQuat, paddleVel, ballV, ballW) => {
    const world = new World();
    const pd = world.paddles[0];
    world.paddles[1].enabled = false;
    // start the racket so it meets the ball at the blade centre
    const tMeet = 0.4 / (ballV.z - paddleVel.z);
    const start = new V3(-paddleVel.x * tMeet, 1.0 - paddleVel.y * tMeet + ballV.y * tMeet, 1.6);
    pd.teleport(start, paddleQuat);
    world.launchBall(new V3(0, 1.0, 1.2), ballV, ballW);
    let ev = null;
    world.on((e) => { if (e.type === 'paddle') ev = e; });
    for (let i = 0; i < 400 && !ev; i++) {
      pd.beginStep();
      pd.pos.addScaled(paddleVel, PHYSICS_DT);
      pd.endStep(PHYSICS_DT);
      world.step(PHYSICS_DT);
    }
    return ev;
  };
  // Racket facing -z (forehand face, local +z → world -z): rotate 180° about y; positive pitch closes the face
  const facing = (pitchDeg) => {
    const q = new Quat().setFromAxisAngle(new V3(0, 1, 0), Math.PI);
    const p = new Quat().setFromAxisAngle(new V3(1, 0, 0), (pitchDeg * Math.PI) / 180);
    return new Quat().multiplyQuats(q, p);
  };
  const block = run(facing(0), new V3(0, 0, 0), new V3(0, 0, 8), new V3());
  check('block returns the ball', block && block.vOut.z < -5, `vOut.z=${f(block?.vOut.z, 2)} e=${f(block?.res.e, 2)}`);
  const drive = run(facing(0), new V3(0, 0, -6), new V3(0, 0, 6), new V3());
  check('forward swing adds speed', drive && drive.vOut.z < block.vOut.z - 3, `vOut.z=${f(drive?.vOut.z, 2)}`);
  const loop = run(facing(30), new V3(0, 4, -5), new V3(0, -0.5, 6), new V3());
  // A ball now travelling -z with topspin has wx < 0
  check('upward brush creates topspin', loop && loop.wOut.x < -150, `spin=${f(rps(-loop?.wOut.x), 1)} rps`);
  const chop = run(facing(-40), new V3(0, -3, -3), new V3(0, -0.5, 5), new V3());
  check('downward cut creates backspin', chop && chop.wOut.x > 100, `spin=${f(rps(chop?.wOut.x), 1)} rps`);
  const side = run(facing(0), new V3(4, 0, -4), new V3(0, 0, 6), new V3());
  check('sideways brush creates sidespin', side && Math.abs(side.wOut.y) > 80, `wy=${f(side?.wOut.y, 0)}`);
  const angled = run(new Quat().multiplyQuats(facing(0), new Quat().setFromAxisAngle(new V3(0, 1, 0), 0.4)), new V3(0, 0, -5), new V3(0, 0, 6), new V3());
  check('angled face redirects sideways', angled && Math.abs(angled.vOut.x) > 1.5, `vOut.x=${f(angled?.vOut.x, 2)}`);
  // incoming backspin on a flat, still racket drops the ball
  const bsIn = run(facing(0), new V3(), new V3(0, 0, 6), new V3(-500, 0, 0));
  check('backspin ball blocked with vertical face goes down', bsIn && bsIn.vOut.y < -0.8, `vOut.y=${f(bsIn?.vOut.y, 2)}`);
  const tsIn = run(facing(0), new V3(), new V3(0, 0, 6), new V3(500, 0, 0));
  check('topspin ball blocked with vertical face jumps up', tsIn && tsIn.vOut.y > 0.8, `vOut.y=${f(tsIn?.vOut.y, 2)}`);
}

console.log('6. No tunnelling at extreme speeds');
{
  for (const sp of [20, 35, 50]) {
    const world = new World();
    const pd = world.paddles[0]; world.paddles[1].enabled = false;
    pd.teleport(new V3(0, 1.0, 1.5), new Quat().setFromAxisAngle(new V3(0, 1, 0), Math.PI));
    world.launchBall(new V3(0, 1.0, 0.6), new V3(0, 0, sp), new V3());
    let hit = false; world.on((e) => { if (e.type === 'paddle') hit = true; });
    for (let i = 0; i < 300 && !hit; i++) { pd.beginStep(); pd.pos.z -= 15 * PHYSICS_DT; pd.endStep(PHYSICS_DT); world.step(PHYSICS_DT); }
    check(`ball at ${sp} m/s vs racket at 15 m/s`, hit && world.ball.v.z < 0, `vz=${f(world.ball.v.z, 1)}`);
  }
  const st = new BallState(); st.p.set(0, TABLE_HEIGHT + 0.05, 1); st.v.set(0, 0, -40);
  let n = false; simulate(st, 0.2, 0.001, null, (ev) => { if (ev.type === 'net') { n = true; return true; } });
  check('40 m/s ball cannot pass through the net', n);
  const st2 = new BallState(); st2.p.set(0.2, TABLE_HEIGHT + 0.3, 1); st2.v.set(0, -30, -2);
  let tb = false; const end = simulate(st2, 0.1, 0.001, null, (ev) => { if (ev.type === 'table') tb = true; });
  check('30 m/s downward ball bounces off the table', tb && end.p.y > TABLE_HEIGHT, `y=${f(end.p.y)}`);
}

console.log('7. Frame-rate independence (fixed-step accumulator)');
{
  const runAt = (fps, jitter) => {
    const world = new World(); world.paddles[0].enabled = world.paddles[1].enabled = false;
    world.launchBall(new V3(0.1, 1.0, 1.5), new V3(0.3, 1.5, -8), new V3(-300, 40, 0));
    let acc = 0, t = 0, seed = 7;
    while (t < 1.2) {
      seed = (seed * 16807) % 2147483647;
      const frame = (1 / fps) * (1 + jitter * ((seed / 2147483647) - 0.5));
      acc += frame; t += frame;
      while (acc >= PHYSICS_DT) { world.step(PHYSICS_DT); acc -= PHYSICS_DT; }
    }
    return { world, steps: Math.round(world.time / PHYSICS_DT) };
  };
  const ref = new World(); ref.paddles[0].enabled = ref.paddles[1].enabled = false;
  ref.launchBall(new V3(0.1, 1.0, 1.5), new V3(0.3, 1.5, -8), new V3(-300, 40, 0));
  for (const [fps, jit] of [[30, 0], [60, 0.3], [144, 0.5], [240, 0.2]]) {
    const { world, steps } = runAt(fps, jit);
    for (let i = 0; i < steps; i++) ref.step(PHYSICS_DT);
    check(`${fps} fps (jitter ${jit * 100}%) matches the reference`, world.ball.p.distanceTo(ref.ball.p) < 1e-9);
    ref.time = 0; ref.launchBall(new V3(0.1, 1.0, 1.5), new V3(0.3, 1.5, -8), new V3(-300, 40, 0));
  }
}

console.log('8. Energy sanity: free-falling ball never gains height');
{
  const st = new BallState(); st.p.set(0.3, 1.5, 0.4); st.v.set(0, 0, 0); st.w.set(0, 0, 0);
  let maxAfter = 0, bounces = 0;
  simulate(st, 4, 0.001, (t, s) => { if (bounces > 0) maxAfter = Math.max(maxAfter, s.p.y); }, (ev) => { if (ev.type === 'table') bounces++; });
  check('height decays after bounces', maxAfter < 1.5 && bounces > 3, `max=${f(maxAfter)} bounces=${bounces}`);
}

console.log(`\n${passes} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
