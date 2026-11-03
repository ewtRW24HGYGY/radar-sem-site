import { Difficulty } from '../ai/profiles';
import { Foot, Technique } from '../physics/kick';
import { KitColors } from '../render/textures';
import { Appearance } from '../render/humanoid';
import { TakerAttributes } from './penaltySim';

export interface Player {
  id: string;
  name: string;
  number: number;
  foot: Foot;
  height: number;
  build: number;
  attrs: TakerAttributes;
  favorite: Technique;
  /** Run-up preference. */
  run: { distance: number; angle: number; tempo: number };
  skin: string;
  hair: string;
  hairStyle: Appearance['hairStyle'];
  boots: string;
}

export interface Team {
  id: string;
  name: string;
  short: string;
  kit: KitColors;
  keeperKit: KitColors;
  crowd: string[];
  players: Player[];
  keeper: { name: string; number: number; level: Difficulty; skin: string; hair: string; hairStyle: Appearance['hairStyle'] };
}

const P = (
  id: string, name: string, number: number, foot: Foot, height: number, attrs: [number, number, number, number], favorite: Technique,
  run: [number, number, number], skin: string, hair: string, hairStyle: Appearance['hairStyle'], boots = '#111111', build = 1,
): Player => ({
  id, name, number, foot, height, build, favorite,
  attrs: { precision: attrs[0], power: attrs[1], curl: attrs[2], composure: attrs[3] },
  run: { distance: run[0], angle: run[1], tempo: run[2] },
  skin, hair, hairStyle, boots,
});

export const TEAMS: Team[] = [
  {
    id: 'aurora', name: 'Atlético Aurora', short: 'AUR',
    kit: { primary: '#b0122a', secondary: '#7d0b1d', accent: '#f2b636', shorts: '#f4f4f4', socks: '#b0122a', pattern: 'stripes', numberColor: '#ffffff' },
    keeperKit: { primary: '#1f2a36', secondary: '#2f3f52', accent: '#f2b636', shorts: '#1f2a36', socks: '#1f2a36', pattern: 'gradient', numberColor: '#f2b636' },
    crowd: ['#b0122a', '#ffffff', '#7d0b1d'],
    keeper: { name: 'Ferraz', number: 1, level: 'advanced', skin: '#c58c63', hair: '#1b1410', hairStyle: 'buzz' },
    players: [
      P('aur9', 'Bastos', 9, 'right', 1.84, [82, 85, 70, 78], 'power', [5, 0.5, 3.8], '#8a5a3b', '#1b1410', 'curly', '#f2b636'),
      P('aur10', 'Lima', 10, 'left', 1.74, [90, 70, 88, 84], 'placed', [4, 0.6, 3.3], '#e8b896', '#3a2618', 'short', '#ffffff'),
      P('aur7', 'Teixeira', 7, 'right', 1.78, [80, 78, 82, 72], 'curl', [4.5, 0.55, 3.6], '#d9a77c', '#1b1410', 'short', '#d62828'),
      P('aur8', 'Moura', 8, 'right', 1.80, [78, 72, 70, 86], 'placed', [3.8, 0.45, 3.2], '#b57e55', '#1b1410', 'buzz'),
      P('aur11', 'Santana', 11, 'left', 1.76, [74, 80, 78, 70], 'low', [5.5, 0.6, 4.2], '#5e3b26', '#111', 'bald', '#2a9d8f'),
      P('aur5', 'Correia', 5, 'right', 1.88, [68, 88, 55, 74], 'power', [6, 0.4, 4.4], '#f1c9a5', '#6b4a2b', 'short'),
      P('aur6', 'Prado', 6, 'right', 1.79, [76, 70, 64, 80], 'center', [3.5, 0.35, 3.0], '#d9a77c', '#3a2618', 'long'),
      P('aur4', 'Alves', 4, 'right', 1.90, [62, 84, 50, 68], 'power', [5, 0.4, 4.0], '#8a5a3b', '#1b1410', 'buzz', '#111', 1.1),
      P('aur3', 'Rocha', 3, 'left', 1.86, [64, 76, 60, 66], 'placed', [4.5, 0.55, 3.6], '#e8b896', '#c9a35f', 'short'),
      P('aur2', 'Nunes', 2, 'right', 1.77, [66, 72, 66, 70], 'low', [4, 0.5, 3.4], '#b57e55', '#1b1410', 'curly'),
      P('aur1', 'Ferraz', 1, 'right', 1.91, [55, 80, 45, 72], 'power', [5, 0.4, 3.8], '#c58c63', '#1b1410', 'buzz'),
    ],
  },
  {
    id: 'uniao', name: 'União Ferroviária', short: 'UNF',
    kit: { primary: '#f4f4f4', secondary: '#0c2a55', accent: '#0c2a55', shorts: '#0c2a55', socks: '#f4f4f4', pattern: 'sash', numberColor: '#0c2a55' },
    keeperKit: { primary: '#e8f542', secondary: '#c8d630', accent: '#111111', shorts: '#111111', socks: '#e8f542', pattern: 'plain', numberColor: '#111111' },
    crowd: ['#0c2a55', '#ffffff', '#1e4b8f'],
    keeper: { name: 'Quaresma', number: 1, level: 'intermediate', skin: '#f1c9a5', hair: '#3a2618', hairStyle: 'short' },
    players: [
      P('unf9', 'Vidal', 9, 'right', 1.86, [80, 88, 60, 76], 'power', [6, 0.45, 4.1], '#f1c9a5', '#1b1410', 'short', '#ffffff'),
      P('unf10', 'Okafor', 10, 'right', 1.81, [86, 74, 84, 80], 'curl', [4.2, 0.6, 3.4], '#5e3b26', '#111', 'buzz', '#f2b636'),
      P('unf7', 'Duarte', 7, 'left', 1.75, [84, 70, 86, 74], 'placed', [4, 0.55, 3.3], '#d9a77c', '#6b4a2b', 'long'),
      P('unf8', 'Sá', 8, 'right', 1.78, [78, 76, 70, 82], 'chip', [3.6, 0.4, 2.9], '#e8b896', '#1b1410', 'short'),
      P('unf11', 'Ramires', 11, 'right', 1.73, [76, 72, 80, 70], 'trivela', [4.5, 0.3, 3.6], '#b57e55', '#1b1410', 'curly', '#d62828'),
      P('unf5', 'Marques', 5, 'right', 1.89, [66, 86, 52, 72], 'power', [5.5, 0.4, 4.3], '#c58c63', '#3a2618', 'buzz'),
      P('unf6', 'Couto', 6, 'left', 1.82, [74, 74, 66, 78], 'low', [4, 0.5, 3.5], '#f1c9a5', '#c9a35f', 'short'),
      P('unf4', 'Bento', 4, 'right', 1.92, [60, 84, 48, 70], 'center', [5, 0.35, 4.0], '#8a5a3b', '#111', 'bald', '#111', 1.12),
      P('unf3', 'Leite', 3, 'right', 1.84, [64, 74, 58, 64], 'placed', [4.4, 0.5, 3.6], '#e8b896', '#3a2618', 'short'),
      P('unf2', 'Pires', 2, 'right', 1.76, [68, 70, 62, 68], 'low', [4, 0.55, 3.4], '#d9a77c', '#1b1410', 'long'),
      P('unf1', 'Quaresma', 1, 'right', 1.88, [52, 78, 40, 70], 'power', [5, 0.45, 3.8], '#f1c9a5', '#3a2618', 'short'),
    ],
  },
];

export function appearanceFor(team: Team, p: Player): Appearance {
  return {
    kit: team.kit,
    number: p.number,
    name: p.name,
    skin: p.skin,
    hair: p.hair,
    hairStyle: p.hairStyle,
    boots: p.boots,
    keeper: false,
    seed: p.number * 7 + p.name.length,
  };
}

export function keeperAppearance(team: Team, level: Difficulty, name?: string): Appearance {
  const k = team.keeper;
  return {
    kit: team.keeperKit,
    number: k.number,
    name: name ?? k.name,
    skin: k.skin,
    hair: k.hair,
    hairStyle: k.hairStyle,
    boots: '#111111',
    keeper: true,
    gloves: level === 'pro' ? '#f2f2f2' : level === 'advanced' ? '#e9f542' : level === 'intermediate' ? '#ff7b2e' : '#5aa9e6',
    seed: 3 + level.length,
  };
}

/** The career / training player (customisable name). */
export function userPlayer(name: string, attrs: TakerAttributes, foot: Foot): Player {
  return P('user', name, 10, foot, 1.81, [attrs.precision, attrs.power, attrs.curl, attrs.composure], 'placed', [4.5, 0.55, 3.6], '#d9a77c', '#1b1410', 'short', '#f2b636');
}
