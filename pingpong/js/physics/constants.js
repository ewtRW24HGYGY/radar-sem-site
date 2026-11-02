// Physical constants. Units: metres, kilograms, seconds, radians.
// Coordinate system: x = across the table, y = up, z = along the table.
// Player 0 stands at +z, player 1 at -z. The net sits at z = 0.

export const GRAVITY = 9.81;
export const AIR_DENSITY = 1.204;           // kg/m³ at 20 °C

// ITTF 40+ ball
export const BALL_RADIUS = 0.02;            // 40 mm diameter
export const BALL_MASS = 0.0027;            // 2.7 g
export const BALL_AREA = Math.PI * BALL_RADIUS * BALL_RADIUS;
export const BALL_VOLUME = (4 / 3) * Math.PI * BALL_RADIUS ** 3;
// Thin spherical shell: I = 2/3 m r²
export const BALL_INERTIA_FACTOR = 2 / 3;
export const DRAG_CD = 0.48;                // smooth sphere, Re ≈ 2–6·10⁴

// Official table (ITTF): 2.74 × 1.525 m, playing surface 76 cm above the floor
export const TABLE_LENGTH = 2.74;
export const TABLE_WIDTH = 1.525;
export const TABLE_HEIGHT = 0.76;
export const TABLE_THICKNESS = 0.025;
export const TABLE_HALF_L = TABLE_LENGTH / 2;
export const TABLE_HALF_W = TABLE_WIDTH / 2;
export const LINE_WIDTH = 0.02;
export const CENTER_LINE_WIDTH = 0.003;

// Net assembly: 15.25 cm high, extends 15.25 cm beyond each side line
export const NET_HEIGHT = 0.1525;
export const NET_HALF_LENGTH = 0.915;
export const NET_HALF_THICK = 0.0025;
export const NET_TAPE = 0.015;              // white top tape height

// Racket: blade outline (ellipse semi-axes) and total thickness with rubbers
export const BLADE_A = 0.075;               // half width
export const BLADE_B = 0.079;               // half height
export const PADDLE_HALF_THICK = 0.0068;    // ~5.8 mm blade + 2 × ~4 mm rubber/sponge
export const HANDLE_LENGTH = 0.1;

// Contact materials. Restitution decreases with normal impact speed: e = clamp(e0 - k·|vn|, eMin, e0)
export const MATERIALS = {
  table:   { e0: 0.94, k: 0.012, eMin: 0.72, mu: 0.25, name: 'table' },
  rubberFH:{ e0: 0.90, k: 0.007, eMin: 0.70, mu: 1.10, name: 'rubberFH' },
  rubberBH:{ e0: 0.89, k: 0.007, eMin: 0.70, mu: 1.00, name: 'rubberBH' },
  wood:    { e0: 0.62, k: 0.010, eMin: 0.40, mu: 0.25, name: 'wood' },
  floor:   { e0: 0.80, k: 0.025, eMin: 0.45, mu: 0.45, name: 'floor' },
  net:     { e0: 0.12, k: 0.000, eMin: 0.05, mu: 0.60, tangentKeep: 0.45, name: 'net' },
  netTape: { e0: 0.30, k: 0.010, eMin: 0.15, mu: 0.30, tangentKeep: 0.55, name: 'netTape' },
  post:    { e0: 0.55, k: 0.010, eMin: 0.30, mu: 0.30, name: 'post' },
  barrier: { e0: 0.40, k: 0.010, eMin: 0.20, mu: 0.40, name: 'barrier' },
};

// Simulation
export const PHYSICS_DT = 1 / 1000;         // fixed 1 kHz step, independent of frame rate
export const MAX_MICRO_MOVE = 0.005;        // relative motion per micro-step (5 mm, < r/4) prevents tunnelling
export const MAX_FRAME_TIME = 0.1;          // clamp long frames (tab switch etc.)

// Arena bounds (barriers)
export const ARENA_HALF_X = 4.0;
export const ARENA_HALF_Z = 7.0;
