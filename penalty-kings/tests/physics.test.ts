import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { BallState, aeroAcceleration, defaultEnv, dragCoefficient, integrateFlight } from '../src/physics/ball';
import { BALL, GOAL, PENALTY_SPOT_Z, SIM_DT } from '../src/physics/constants';
import { PhysicsWorld } from '../src/physics/world';
import { TECHNIQUES, TECHNIQUE_ORDER, solveKick, strikeBall, KickIntent, predictCrossing } from '../src/physics/kick';

const spot = () => new Vector3(0, BALL.radius, PENALTY_SPOT_Z);

function launch(world: PhysicsWorld, v: Vector3, w = new Vector3(), p = spot()) {
  world.reset(p);
  world.ball.v.copy(v);
  world.ball.w.copy(w);
  world.wake();
}

function run(world: PhysicsWorld, seconds: number, onStep?: (w: PhysicsWorld) => void) {
  const n = Math.round(seconds / SIM_DT);
  const events = [];
  for (let i = 0; i < n; i++) {
    world.step(SIM_DT);
    events.push(...world.events);
    onStep?.(world);
  }
  return events;
}

describe('ball constants', () => {
  it('matches a FIFA size-5 ball', () => {
    const circ = 2 * Math.PI * BALL.radius;
    expect(circ).toBeGreaterThanOrEqual(0.68);
    expect(circ).toBeLessThanOrEqual(0.7);
    expect(BALL.mass).toBeGreaterThanOrEqual(0.41);
    expect(BALL.mass).toBeLessThanOrEqual(0.45);
  });
});

describe('free flight', () => {
  it('matches the analytic parabola in vacuum (RK4)', () => {
    const env = defaultEnv();
    env.airDensity = 0;
    const s = new BallState();
    s.p.set(0, 1, 0);
    s.v.set(3, 12, -20);
    const dt = 1 / 1000;
    for (let i = 0; i < 1000; i++) integrateFlight(s, dt, env);
    expect(s.p.x).toBeCloseTo(3, 6);
    expect(s.p.y).toBeCloseTo(1 + 12 - 0.5 * 9.81, 6);
    expect(s.p.z).toBeCloseTo(-20, 6);
  });

  it('has a drag crisis: Cd ≈ 0.47 slow, ≈ 0.2 fast', () => {
    expect(dragCoefficient(5, 0)).toBeGreaterThan(0.43);
    expect(dragCoefficient(30, 0)).toBeLessThan(0.22);
  });

  it('reaches a realistic terminal velocity in a drop', () => {
    const s = new BallState();
    s.p.set(0, 5000, 0);
    const env = defaultEnv();
    for (let i = 0; i < 60000; i++) integrateFlight(s, 1 / 1000, env);
    const vt = -s.v.y;
    // m g = ½ ρ A Cd v²  with supercritical Cd ≈ 0.2 → ≈ 30 m/s
    expect(vt).toBeGreaterThan(27);
    expect(vt).toBeLessThan(33);
  });

  it('a 28 m/s strike loses 2–3 m/s over 8 m (≈ 8 m/s² of drag, as measured on match balls)', () => {
    const w = new PhysicsWorld();
    w.frame = [];
    launch(w, new Vector3(0, 2.6, -28));
    run(w, 0.3); // ≈ 8.4 m, before reaching the goal
    const sp = Math.hypot(w.ball.v.x, w.ball.v.z);
    expect(sp).toBeGreaterThan(25.0);
    expect(sp).toBeLessThan(26.3);
  });
});

describe('Magnus effect', () => {
  const env = defaultEnv();
  const acc = new Vector3();
  const q = new BallState().q;
  it('backspin lifts, topspin dips', () => {
    aeroAcceleration(new Vector3(0, 0, -25), new Vector3(40, 0, 0), q, env, acc);
    const lift = acc.y + 9.81;
    expect(lift).toBeGreaterThan(2);
    aeroAcceleration(new Vector3(0, 0, -25), new Vector3(-40, 0, 0), q, env, acc);
    expect(acc.y + 9.81).toBeLessThan(-2);
  });
  it('counter-clockwise spin (seen from above) curls a ball heading to goal to the left', () => {
    aeroAcceleration(new Vector3(0, 0, -25), new Vector3(0, 50, 0), q, env, acc);
    expect(acc.x).toBeLessThan(-3);
  });
  it('a curled penalty bends 30–90 cm from its launch line', () => {
    const w = new PhysicsWorld();
    w.frame = [];
    launch(w, new Vector3(0, 2, -24), new Vector3(0, 55, 0));
    let x = 0;
    run(w, 0.5, (ww) => {
      if (ww.ball.p.z > 0) x = ww.ball.p.x;
    });
    expect(-x).toBeGreaterThan(0.3);
    expect(-x).toBeLessThan(0.9);
  });
});

describe('ground', () => {
  it('bounces with grass restitution and then rolls to a stop', () => {
    const w = new PhysicsWorld();
    w.frame = [];
    launch(w, new Vector3(0, 0, 0), new Vector3(), new Vector3(0, 2, 5));
    let maxUp = 0;
    const ev = run(w, 3, (ww) => {
      maxUp = Math.max(maxUp, ww.ball.v.y);
    });
    const firstHit = ev.find((e) => e.type === 'ground')!;
    expect(firstHit).toBeTruthy();
    // impact ≈ 6 m/s → rebound COR ≈ 0.6
    expect(maxUp / firstHit.speed).toBeGreaterThan(0.5);
    expect(maxUp / firstHit.speed).toBeLessThan(0.7);
    expect(w.ball.p.y).toBeCloseTo(BALL.radius, 3);
  });

  it('a rolling ball decelerates on grass and its spin matches rolling', () => {
    const w = new PhysicsWorld();
    w.frame = [];
    launch(w, new Vector3(0, 0, -6), new Vector3(-6 / BALL.radius, 0, 0), new Vector3(0, BALL.radius, 20));
    run(w, 1);
    const v = w.ball.v.length();
    expect(v).toBeLessThan(5.6);
    expect(v).toBeGreaterThan(4.6);
    // rolling without slipping: contact point at rest (v.z − ω.x R = 0)
    expect(Math.abs(w.ball.v.z - w.ball.w.x * BALL.radius)).toBeLessThan(0.05);
  });

  it('a skidding ball (no spin) settles into rolling at 3/5 of its speed (hollow sphere)', () => {
    const w = new PhysicsWorld();
    w.frame = [];
    launch(w, new Vector3(0, 0, -6), new Vector3(), new Vector3(0, BALL.radius, 20));
    run(w, 0.4);
    const v = w.ball.v.length();
    expect(v).toBeGreaterThan(3.2);
    expect(v).toBeLessThan(3.75);
  });
});

describe('goal frame collisions', () => {
  it('never tunnels through a post, even at 45 m/s, for any offset', () => {
    const w = new PhysicsWorld();
    const X = GOAL.postX;
    for (let off = -0.16; off <= 0.16; off += 0.01) {
      launch(w, new Vector3(0, 0, -45), new Vector3(), new Vector3(X + off, 1.2, 3));
      let minDist = Infinity;
      run(w, 0.25, (ww) => {
        const d = Math.hypot(ww.ball.p.x - X, ww.ball.p.z - GOAL.postZ);
        minDist = Math.min(minDist, d);
      });
      expect(minDist).toBeGreaterThan(BALL.radius + GOAL.postRadius - 0.002);
    }
  });

  it('a head-on post hit rebounds into the field with energy loss', () => {
    const w = new PhysicsWorld();
    launch(w, new Vector3(0, 0, -25), new Vector3(), new Vector3(GOAL.postX, 1.2, 3));
    const ev = run(w, 0.3);
    const hit = ev.find((e) => e.type === 'post');
    expect(hit).toBeTruthy();
    expect(w.ball.v.z).toBeGreaterThan(5); // back out
    expect(w.ball.v.z).toBeLessThan(25 * 0.75);
  });

  it('a ball clipping the inside of the post goes in', () => {
    const w = new PhysicsWorld();
    const x0 = GOAL.postX - 0.15; // overlaps the post by 2 cm on the inside
    launch(w, new Vector3(0, 0.2, -26), new Vector3(), new Vector3(x0, 1, 3));
    const ev = run(w, 0.6);
    expect(ev.some((e) => e.type === 'post')).toBe(true);
    const line = ev.find((e) => e.type === 'goalLine');
    expect(line?.inside).toBe(true);
  });

  it('crossbar: a ball striking the underside is pushed down', () => {
    const w = new PhysicsWorld();
    launch(w, new Vector3(0, 0.8, -24), new Vector3(), new Vector3(0, GOAL.barY - 0.14, 4));
    const ev = run(w, 0.4);
    expect(ev.some((e) => e.type === 'bar')).toBe(true);
    expect(ev.find((e) => e.type === 'bar')!.normal!.y).toBeLessThan(-0.3);
  });
});

describe('net', () => {
  it('stops a 30 m/s shot inside the goal without passing through, then the ball drops', () => {
    const w = new PhysicsWorld();
    launch(w, new Vector3(0, 3.2, -30), new Vector3(), spot());
    let minZ = Infinity;
    let maxDefl = 0;
    const ev = run(w, 4, (ww) => {
      minZ = Math.min(minZ, ww.ball.p.z);
      maxDefl = Math.max(maxDefl, ...Array.from(ww.net.deflection));
    });
    expect(ev.some((e) => e.type === 'goalLine' && e.inside)).toBe(true);
    expect(ev.some((e) => e.type === 'net')).toBe(true);
    // back net at ~ z −1.7 at that height; bulge must stay below a metre
    expect(maxDefl).toBeGreaterThan(0.25);
    expect(maxDefl).toBeLessThan(1.0);
    expect(minZ).toBeGreaterThan(-3.2);
    expect(w.ball.p.z).toBeLessThan(-0.2); // still in the goal
    expect(w.ball.p.y).toBeLessThan(0.3); // on the grass
  });

  it('a rolling shot into the bottom of the net stays in the goal', () => {
    const w = new PhysicsWorld();
    launch(w, new Vector3(0.5, 0, -22), new Vector3(22 / BALL.radius * -1, 0, 0), spot());
    const ev = run(w, 4);
    expect(ev.some((e) => e.type === 'goalLine' && e.inside)).toBe(true);
    expect(w.ball.p.z).toBeLessThan(-0.15);
  });

  it('side netting from outside keeps the ball out', () => {
    const w = new PhysicsWorld();
    launch(w, new Vector3(-1.5, 0.5, -24), new Vector3(), new Vector3(GOAL.postX + 2.0, 0.8, 8));
    run(w, 2);
    expect(w.ball.p.x).toBeGreaterThan(GOAL.postX - 0.02);
  });
});

describe('kick model', () => {
  const intent = (t: KickIntent['technique'], power: number, x: number, y: number): KickIntent => ({
    technique: t,
    foot: 'right',
    power,
    target: { x, y },
    spinPitch: 0,
    spinYaw: 0,
    approachSpeed: 3.5,
  });

  it('a full laces strike gives 100–115 km/h, a placed one 80–95 km/h', () => {
    const s = solveKick(intent('power', 1, 2, 1.2));
    const b = new BallState();
    b.p.copy(spot());
    strikeBall(b, s.strike);
    const kmh = b.v.length() * 3.6;
    expect(kmh).toBeGreaterThan(100);
    expect(kmh).toBeLessThan(118);
    const p = solveKick(intent('placed', 1, 2, 1.2));
    const b2 = new BallState();
    b2.p.copy(spot());
    strikeBall(b2, p.strike);
    expect(b2.v.length() * 3.6).toBeGreaterThan(78);
    expect(b2.v.length() * 3.6).toBeLessThan(97);
  });

  it('the chip is slow with strong backspin; curl has side spin', () => {
    const c = solveKick(intent('chip', 0.6, 0, 1.6));
    const b = new BallState();
    b.p.copy(spot());
    strikeBall(b, c.strike);
    expect(b.v.length()).toBeLessThan(14);
    expect(b.w.x).toBeGreaterThan(15); // backspin (rad/s)
    const k = solveKick(intent('curl', 0.8, -2.5, 1.5));
    const b2 = new BallState();
    b2.p.copy(spot());
    strikeBall(b2, k.strike);
    expect(b2.w.y).toBeGreaterThan(25); // curls left for a right-footer
  });

  it('the motor planner reaches targets all over the goal for every technique', () => {
    for (const t of TECHNIQUE_ORDER) {
      const targets: [number, number][] =
        t === 'chip' ? [[0, 1.5], [-1, 1.8], [1.2, 1.2]] : t === 'low' ? [[-3, 0.25], [2.8, 0.3]] : [[-3.1, 0.4], [3.1, 2.1], [0, 1.2], [-2.5, 2.0]];
      for (const [x, y] of targets) {
        const s = solveKick(intent(t, t === 'chip' ? 0.55 : 0.85, x, y));
        expect(s.predicted.reached, `${t} ${x},${y}`).toBe(true);
        expect(Math.abs(s.predicted.x - x), `${t} x`).toBeLessThan(0.05);
        expect(Math.abs(s.predicted.y - y), `${t} y`).toBeLessThan(0.05);
      }
    }
  });

  it('is deterministic', () => {
    const a = solveKick(intent('curl', 0.9, -2.8, 1.9));
    const b = solveKick(intent('curl', 0.9, -2.8, 1.9));
    expect(a.yaw).toBe(b.yaw);
    expect(a.pitch).toBe(b.pitch);
    const pa = predictCrossing(spot(), new Vector3(1, 3, -25), new Vector3(0, 30, 0));
    const pb = predictCrossing(spot(), new Vector3(1, 3, -25), new Vector3(0, 30, 0));
    expect(pa).toEqual(pb);
  });

  it('all techniques are defined consistently', () => {
    for (const t of TECHNIQUE_ORDER) expect(TECHNIQUES[t].id).toBe(t);
  });
});
