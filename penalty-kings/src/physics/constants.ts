/**
 * Physical constants and pitch geometry. Units: SI (m, kg, s, rad).
 *
 * World frame: origin at the centre of the goal line's front edge.
 *  +x  to the right as seen by the penalty taker facing the goal
 *  +y  up
 *  +z  from the goal towards the penalty spot (the field side)
 */

export const GRAVITY = 9.81;
export const AIR_DENSITY = 1.204; // kg/m³ at 20 °C, sea level
export const AIR_KINEMATIC_VISCOSITY = 1.516e-5; // m²/s

/** FIFA size-5 ball: circumference 68–70 cm, mass 410–450 g. */
export const BALL = {
  mass: 0.43,
  radius: 0.11, // circumference ≈ 69.1 cm
  get area() {
    return Math.PI * this.radius * this.radius;
  },
  /** Thin pressurised shell: I ≈ 2/3 m r². */
  get inertia() {
    return (2 / 3) * this.mass * this.radius * this.radius;
  },
};

/** Laws of the Game — goal: 7.32 m between inner post edges, 2.44 m under the bar. Posts 12 cm. */
export const GOAL = {
  halfWidth: 3.66, // inner edge of the posts
  height: 2.44, // lower edge of the crossbar
  postRadius: 0.06,
  lineWidth: 0.12,
  /** Net depth at the roof and at the ground (behind the goal line). */
  netDepthTop: 1.0,
  netDepthBottom: 2.0,
  get postX() {
    return this.halfWidth + this.postRadius;
  },
  get barY() {
    return this.height + this.postRadius;
  },
  /** Posts stand on the goal line; their axis is at the centre of the line. */
  get postZ() {
    return -this.lineWidth / 2;
  },
};

export const PENALTY_SPOT_Z = 11.0;
export const PITCH = {
  length: 105,
  width: 68,
  boxDepth: 16.5,
  boxHalfWidth: 20.16,
  sixDepth: 5.5,
  sixHalfWidth: 9.16,
  arcRadius: 9.15,
};

/** The whole ball must be beyond the whole line. */
export const GOAL_LINE_CROSS_Z = -GOAL.lineWidth - BALL.radius;

/** Fixed simulation rate. Everything gameplay-relevant advances in steps of SIM_DT. */
export const SIM_HZ = 240;
export const SIM_DT = 1 / SIM_HZ;
/** Maximum ball travel per collision sub-step (continuous collision guarantee). */
export const MAX_SUBSTEP_TRAVEL = 0.02;
