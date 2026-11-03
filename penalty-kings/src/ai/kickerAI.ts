import { KickIntent, Technique } from '../physics/kick';
import { mulberry32 } from '../render/textures';
import type { Player } from '../game/teams';

export interface CpuKickPlan {
  intent: KickIntent;
  run: { distance: number; angle: number; tempo: number };
  /** Seconds after the plant when the strike button is "pressed". */
  timingOffset: number;
  stutter: boolean;
  /** Speed modulation during the run (−1..1). */
  speedInput: number;
}

/**
 * Computer penalty taker. It decides like a player (technique, corner, height,
 * pace, rhythm). Decisions vary through a seeded generator, so a shoot-out can be
 * replayed exactly; the outcome is then decided only by physics and the keeper.
 */
export function planCpuKick(p: Player, seed: number, pressure: number): CpuKickPlan {
  const r = mulberry32(seed);
  const techs: Technique[] = ['placed', 'power', 'low', 'curl', 'center', 'chip', 'trivela'];
  const weights = [0.32, 0.24, 0.16, 0.12, 0.08, 0.04, 0.04];
  let technique: Technique = p.favorite;
  if (r() > 0.62) {
    let x = r();
    for (let i = 0; i < techs.length; i++) {
      x -= weights[i];
      if (x <= 0) {
        technique = techs[i];
        break;
      }
    }
  }
  const side = r() < 0.5 ? -1 : 1;
  let x = side * (2.0 + r() * 1.25);
  let y = 0.3 + r() * 1.7;
  let power = 0.76 + r() * 0.2;
  switch (technique) {
    case 'placed':
      y = 0.25 + r() * 0.9;
      power = 0.7 + r() * 0.22;
      break;
    case 'low':
      y = 0.18 + r() * 0.25;
      break;
    case 'power':
      y = 0.9 + r() * 1.25;
      power = 0.85 + r() * 0.2;
      break;
    case 'curl':
      x = side * (2.4 + r() * 0.9);
      y = 0.8 + r() * 1.2;
      break;
    case 'trivela':
      y = 0.6 + r() * 1.2;
      break;
    case 'center':
      x = (r() - 0.5) * 0.9;
      y = 0.9 + r() * 1.1;
      power = 0.85 + r() * 0.15;
      break;
    case 'chip':
      x = (r() - 0.5) * 1.4;
      y = 1.2 + r() * 0.8;
      power = 0.45 + r() * 0.25;
      break;
  }
  const nerves = pressure * (1.1 - p.attrs.composure / 100);
  const timingOffset = (r() - 0.5) * (0.06 + 0.16 * nerves) * (1.25 - p.attrs.precision / 100);
  return {
    intent: {
      technique,
      foot: p.foot,
      power,
      target: { x, y },
      spinPitch: 0,
      spinYaw: 0,
      approachSpeed: p.run.tempo,
    },
    run: { ...p.run },
    timingOffset,
    stutter: technique === 'center' || technique === 'chip' ? r() < 0.5 : r() < 0.08,
    speedInput: (r() - 0.5) * 0.4,
  };
}
