import type { Difficulty } from '../ai/profiles';
import type { CameraMode } from '../camera/cameras';
import type { Quality, TimeOfDay } from '../render/renderer';
import type { ShotOutcome, TakerAttributes } from './penaltySim';

export interface Settings {
  quality: Quality;
  timeOfDay: TimeOfDay;
  wind: 'none' | 'light' | 'strong';
  kickerCamera: CameraMode;
  keeperCamera: CameraMode;
  followBall: boolean;
  autoReplay: boolean;
  guide: boolean;
  narrator: boolean;
  master: number;
  crowd: number;
  sfx: number;
  difficulty: Difficulty;
  foot: 'right' | 'left';
}

export interface ShotRecord {
  t: number;
  mode: string;
  outcome: ShotOutcome;
  technique: string;
  speed: number;
  precision: number;
  x: number;
  y: number;
  keeper: Difficulty | 'none';
  quality: number;
}

export interface CareerState {
  name: string;
  stage: number;
  xp: number;
  points: number;
  attrs: TakerAttributes;
  best: Record<number, number>;
}

const KEY = 'penalty-kings:v1';

interface SaveData {
  settings: Settings;
  shots: ShotRecord[];
  career: CareerState;
  records: { maxSpeed: number; maxCurve: number; precisionBest: Record<string, number> };
}

export function defaultSettings(): Settings {
  const mobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  return {
    quality: mobile ? 'low' : 'high',
    timeOfDay: 'night',
    wind: 'none',
    kickerCamera: 'behind',
    keeperCamera: 'keeperPOV',
    followBall: true,
    autoReplay: true,
    guide: false,
    narrator: true,
    master: 0.8,
    crowd: 0.8,
    sfx: 0.9,
    difficulty: 'intermediate',
    foot: 'right',
  };
}

function defaults(): SaveData {
  return {
    settings: defaultSettings(),
    shots: [],
    career: { name: 'Você', stage: 0, xp: 0, points: 0, attrs: { precision: 58, power: 60, curl: 55, composure: 55 }, best: {} },
    records: { maxSpeed: 0, maxCurve: 0, precisionBest: {} },
  };
}

let memory: SaveData | null = null;

export function load(): SaveData {
  if (memory) return memory;
  let d = defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      d = {
        settings: { ...d.settings, ...(parsed.settings ?? {}) },
        shots: parsed.shots ?? [],
        career: { ...d.career, ...(parsed.career ?? {}), attrs: { ...d.career.attrs, ...(parsed.career?.attrs ?? {}) } },
        records: { ...d.records, ...(parsed.records ?? {}) },
      };
    }
  } catch {
    /* storage unavailable: keep defaults in memory */
  }
  memory = d;
  return d;
}

export function save(): void {
  if (!memory) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(memory));
  } catch {
    /* ignore */
  }
}

export function recordShot(r: ShotRecord): void {
  const d = load();
  d.shots.push(r);
  if (d.shots.length > 1500) d.shots.splice(0, d.shots.length - 1500);
  save();
}

export function resetStats(): void {
  const d = load();
  d.shots = [];
  d.records = { maxSpeed: 0, maxCurve: 0, precisionBest: {} };
  save();
}
