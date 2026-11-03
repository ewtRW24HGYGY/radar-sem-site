export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'pro';

export type PredictionModel = 'linear' | 'ballistic' | 'drag' | 'full';

/**
 * Goalkeeper capability profile. These are physical and perceptual limits;
 * nothing here decides an outcome by chance.
 */
export interface KeeperProfile {
  id: Difficulty;
  label: string;
  /** Visuomotor reaction time after the strike (s). */
  reaction: number;
  /** Duration of the leg push before take-off (s). */
  pushTime: number;
  /** Max lateral take-off speed of the centre of mass (m/s). */
  maxLateral: number;
  /** Max vertical take-off speed (m/s). */
  maxVertical: number;
  /** Max hand speed relative to the shoulders (m/s). */
  armSpeed: number;
  /** Body roll rate in a dive (rad/s). */
  rollRate: number;
  /** How the keeper extrapolates the ball. */
  model: PredictionModel;
  /** Weight given to the taker's body language (0..1). */
  cueRead: number;
  /** Weight of the taker's history (0..1). */
  memory: number;
  /** Confidence needed to anticipate (dive at the strike). */
  commitThreshold: number;
  /** Seconds relative to expected contact when an anticipation dive starts (− = before). */
  commitLead: number;
  /** If true the keeper times the split-step from the run rhythm (fooled by the paradinha). */
  rhythmTimer: boolean;
  /** Can re-direct a dive that has not left the ground yet. */
  adjustPush: boolean;
  /** Max relative ball speed that can be held (m/s). */
  catchSpeed: number;
  /** Effective mass behind the hands (stiff wrists parry harder). */
  handMass: number;
  /** Lateral footwork speed on the line (m/s). */
  shuffleSpeed: number;
  /** Rating for the HUD. */
  rating: number;
  name: string;
  height: number;
}

export const KEEPERS: Record<Difficulty, KeeperProfile> = {
  beginner: {
    id: 'beginner', label: 'Iniciante', name: 'T. Barros', height: 1.82, rating: 58,
    reaction: 0.31, pushTime: 0.21, maxLateral: 3.3, maxVertical: 2.7, armSpeed: 6.5, rollRate: 5.5,
    model: 'linear', cueRead: 0.0, memory: 0.0, commitThreshold: 0.0, commitLead: -0.12,
    rhythmTimer: true, adjustPush: false, catchSpeed: 13, handMass: 1.1, shuffleSpeed: 1.6,
  },
  intermediate: {
    id: 'intermediate', label: 'Intermediário', name: 'R. Quaresma', height: 1.86, rating: 71,
    reaction: 0.26, pushTime: 0.185, maxLateral: 3.8, maxVertical: 3.0, armSpeed: 7.5, rollRate: 6.5,
    model: 'ballistic', cueRead: 0.35, memory: 0.2, commitThreshold: 0.55, commitLead: -0.04,
    rhythmTimer: true, adjustPush: false, catchSpeed: 16.5, handMass: 1.5, shuffleSpeed: 2.0,
  },
  advanced: {
    id: 'advanced', label: 'Avançado', name: 'D. Ferraz', height: 1.89, rating: 82,
    reaction: 0.215, pushTime: 0.165, maxLateral: 4.3, maxVertical: 3.3, armSpeed: 8.5, rollRate: 7.5,
    model: 'drag', cueRead: 0.6, memory: 0.35, commitThreshold: 0.5, commitLead: 0.0,
    rhythmTimer: false, adjustPush: true, catchSpeed: 19.5, handMass: 1.9, shuffleSpeed: 2.3,
  },
  pro: {
    id: 'pro', label: 'Profissional', name: 'M. Albuquerque', height: 1.92, rating: 90,
    reaction: 0.18, pushTime: 0.15, maxLateral: 4.75, maxVertical: 3.55, armSpeed: 9.5, rollRate: 8.5,
    model: 'full', cueRead: 0.8, memory: 0.5, commitThreshold: 0.62, commitLead: 0.01,
    rhythmTimer: false, adjustPush: true, catchSpeed: 23, handMass: 2.3, shuffleSpeed: 2.6,
  },
};

export const DIFFICULTY_ORDER: Difficulty[] = ['beginner', 'intermediate', 'advanced', 'pro'];
