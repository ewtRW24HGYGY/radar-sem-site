import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { Rig } from '../src/characters/rig';
import { PenaltySim } from '../src/game/penaltySim';
import { KEEPERS, Difficulty } from '../src/ai/profiles';
import { BALL, PENALTY_SPOT_Z, SIM_DT } from '../src/physics/constants';
import { KickIntent, Technique } from '../src/physics/kick';
import { memoryBank } from '../src/ai/keeperAI';
import { RunUpSetup } from '../src/characters/kicker';

function makeSim(level: Difficulty, ai = true) {
  return new PenaltySim({
    kickerRig: new Rig({ height: 1.82, build: 1 }),
    keeperRig: new Rig({ height: KEEPERS[level].height, build: 1.1 }),
    keeperProfile: KEEPERS[level],
    keeperAI: ai,
    takerId: 'test',
    attributes: { precision: 80, power: 75, curl: 70, composure: 75 },
    pressure: 0,
  });
}

const setup = (tech: Technique, tempo = 3.6): RunUpSetup => ({
  ball: new Vector3(0, BALL.radius, PENALTY_SPOT_Z),
  foot: 'right',
  distance: 4.5,
  angle: 0.55,
  tempo,
  technique: tech,
});

const intent = (tech: Technique, x: number, y: number, power = 0.9): KickIntent => ({
  technique: tech,
  foot: 'right',
  power,
  target: { x, y },
  spinPitch: 0,
  spinYaw: 0,
  approachSpeed: 3.6,
});

/** Runs a full kick; presses the timing button at the plant (perfect) unless told otherwise. */
function runKick(sim: PenaltySim, tech: Technique, x: number, y: number, opts: { power?: number; timingOffset?: number | null } = {}) {
  sim.prepare(setup(tech), intent(tech, x, y, opts.power ?? 0.9));
  sim.startRunUp();
  let steps = 0;
  let maxKeeperSpeed = 0;
  const prevCom = sim.keeper.com.clone();
  let footAtContact: Vector3 | null = null;
  let footVelNum: Vector3 | null = null;
  const anklePrev = new Vector3();
  while (sim.phase !== 'done' && steps < 240 * 14) {
    const k = sim.kicker;
    if (opts.timingOffset !== null && sim.timingPress === null && k.plantTime >= 0 && k.t >= k.plantTime + (opts.timingOffset ?? 0)) {
      sim.pressTiming();
    }
    const kickSide = k.setup.foot === 'right' ? 'R' : 'L';
    anklePrev.copy(k.feet[kickSide].pos);
    sim.step();
    if (sim.events.some((e) => e.type === 'kick')) {
      footAtContact = k.feet[kickSide].pos.clone();
      footVelNum = footAtContact.clone().sub(anklePrev).divideScalar(SIM_DT);
    }
    const sp = sim.keeper.com.distanceTo(prevCom) / SIM_DT;
    maxKeeperSpeed = Math.max(maxKeeperSpeed, sp);
    prevCom.copy(sim.keeper.com);
    steps++;
  }
  return { stats: sim.stats!, maxKeeperSpeed, footAtContact, footVelNum };
}

describe('full penalty simulation', () => {
  it('runs a complete kick to an outcome', () => {
    const sim = makeSim('beginner');
    const r = runKick(sim, 'placed', -2.8, 0.6);
    expect(sim.phase).toBe('done');
    expect(r.stats).toBeTruthy();
    expect(r.stats.speedKmh).toBeGreaterThan(60);
  });

  it('the animated kicking foot meets the ball with the impulse velocity (animation follows physics)', () => {
    const sim = makeSim('intermediate');
    const r = runKick(sim, 'power', 2.5, 1.5);
    const strike = sim.kicker.executedStrike!;
    expect(r.footAtContact).toBeTruthy();
    // Ankle within ~25 cm of the ball centre at contact (boot surface touches the ball).
    expect(r.footAtContact!.distanceTo(sim.ballSpot)).toBeLessThan(0.27);
    // Finite-difference foot velocity over the last sim step agrees with the impulse foot velocity.
    const vf = strike.footVelocity;
    const ang = r.footVelNum!.angleTo(vf);
    expect(ang).toBeLessThan(0.35);
    expect(r.footVelNum!.length() / vf.length()).toBeGreaterThan(0.65);
    expect(r.footVelNum!.length() / vf.length()).toBeLessThan(1.3);
  });

  it('the keeper never exceeds human speed (no teleporting)', () => {
    for (const lvl of ['beginner', 'pro'] as Difficulty[]) {
      const sim = makeSim(lvl);
      const r = runKick(sim, 'placed', -3.0, 0.4);
      expect(r.maxKeeperSpeed).toBeLessThan(6.5);
    }
  });

  it('a perfect, fast shot into the top corner beats even the pro (physical reach limit)', () => {
    memoryBank.clear();
    const sim = makeSim('pro');
    const r = runKick(sim, 'power', -3.2, 2.15, { power: 1.0 });
    expect(['goal', 'post']).toContain(r.stats.outcome);
  });

  it('a beginner guesses the natural side early, so a soft shot down the middle beats him', () => {
    memoryBank.clear();
    const r = runKick(makeSim('beginner'), 'center', 0.1, 1.0, { power: 0.3 });
    expect(r.stats.outcome).toBe('goal');
  });

  it('a slow shot at the keeper is saved by keepers who wait and read', () => {
    for (const lvl of ['intermediate', 'advanced', 'pro'] as Difficulty[]) {
      memoryBank.clear();
      const sim = makeSim(lvl);
      const r = runKick(sim, 'placed', 0.1, 1.0, { power: 0.25 });
      expect(r.stats.outcome, lvl).toBe('saved');
    }
  });

  it('overpowering in the red zone and an early press send the ball higher', () => {
    const simA = makeSim('beginner', false);
    const a = runKick(simA, 'power', 0, 1.6, { power: 0.95 });
    const simB = makeSim('beginner', false);
    const b = runKick(simB, 'power', 0, 1.6, { power: 1.15, timingOffset: -0.1 });
    expect(b.stats.crossing.y).toBeGreaterThan(a.stats.crossing.y + 0.4);
  });

  it('is deterministic: identical inputs produce identical outcomes', () => {
    memoryBank.clear();
    const a = runKick(makeSim('advanced'), 'curl', -2.6, 1.7);
    memoryBank.clear();
    const b = runKick(makeSim('advanced'), 'curl', -2.6, 1.7);
    expect(a.stats.crossing).toEqual(b.stats.crossing);
    expect(a.stats.outcome).toBe(b.stats.outcome);
  });

  it('plausible conversion rates across a grid of well-struck penalties', () => {
    const levels: Difficulty[] = ['beginner', 'intermediate', 'advanced', 'pro'];
    const shots: [Technique, number, number][] = [];
    for (const x of [-3.0, -2.2, -1.2, 0, 1.2, 2.2, 3.0]) for (const y of [0.3, 1.0, 1.9]) shots.push(['placed', x, y]);
    const rates: Record<string, number> = {};
    for (const lvl of levels) {
      let goals = 0;
      memoryBank.clear();
      for (const [t, x, y] of shots) {
        memoryBank.clear();
        const r = runKick(makeSim(lvl), t, x, y, { power: 0.85 });
        if (r.stats.outcome === 'goal') goals++;
      }
      rates[lvl] = goals / shots.length;
    }
    // Better keepers concede less, but none is invincible.
    expect(rates.beginner).toBeGreaterThanOrEqual(rates.pro);
    expect(rates.pro).toBeGreaterThan(0.2);
    expect(rates.beginner).toBeGreaterThan(0.55);
    console.info('conversion', rates);
  }, 120000);
});
