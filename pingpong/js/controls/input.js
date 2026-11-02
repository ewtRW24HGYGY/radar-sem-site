// Input: mouse, touch (multi-touch, split screen for 2 players), pen, keyboard and wheel.
// Produces per-frame snapshots; pointer positions are normalised to the stage (u, v ∈ [0,1]).
export class InputManager {
  constructor(el) {
    this.el = el;
    this.pointers = new Map();           // id → { u, v, type, slot, t0, moved }
    this.keys = new Set();
    this.pressed = new Set();            // keys pressed since the last frame
    this.wheel = 0;
    this.buttons = 0;                    // mouse buttons bitmask
    this.clicked = false;
    this.virtual = { top: false, back: false, sideL: false, sideR: false };
    this.virtualPressed = new Set();
    this.split = false;                  // 2 players on one touch screen
    this.halfOwner = [0, 1];             // which player owns the left / right half
    this.last = [{ u: 0.5, v: 0.62, active: false }, { u: 0.5, v: 0.62, active: false }];
    this.taps = [false, false];
    this.usingTouch = false;
    const opt = { passive: false };
    el.addEventListener('pointerdown', (e) => this.down(e), opt);
    el.addEventListener('pointermove', (e) => this.move(e), opt);
    window.addEventListener('pointerup', (e) => this.up(e));
    window.addEventListener('pointercancel', (e) => this.up(e));
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('wheel', (e) => { e.preventDefault(); this.wheel += Math.sign(e.deltaY); }, opt);
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
      if (!this.keys.has(e.code)) this.pressed.add(e.code);
      this.keys.add(e.code);
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => { this.keys.clear(); this.buttons = 0; });
  }
  norm(e) {
    const r = this.el.getBoundingClientRect();
    return { u: (e.clientX - r.left) / Math.max(1, r.width), v: (e.clientY - r.top) / Math.max(1, r.height) };
  }
  slotFor(u) { return this.split ? (u < 0.5 ? this.halfOwner[0] : this.halfOwner[1]) : 0; }
  down(e) {
    const { u, v } = this.norm(e);
    if (e.pointerType === 'mouse') {
      this.buttons = e.buttons; this.clicked = true;
      this.last[0] = { u, v, active: true };
      return;
    }
    e.preventDefault();
    this.usingTouch = true;
    const slot = this.slotFor(u);
    this.pointers.set(e.pointerId, { u, v, slot, t0: performance.now(), moved: 0 });
    this.seq = (this.seq || 0) + 1;
    this.last[slot] = { u, v, active: true, seq: this.seq };
    try { this.el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  }
  move(e) {
    const { u, v } = this.norm(e);
    if (e.pointerType === 'mouse') { this.buttons = e.buttons; this.last[0] = { u, v, active: true }; return; }
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    e.preventDefault();
    p.moved += Math.hypot(u - p.u, v - p.v);
    p.u = u; p.v = v;
    this.last[p.slot] = { ...this.last[p.slot], u, v, active: true };
  }
  up(e) {
    if (e.pointerType === 'mouse') { this.buttons = e.buttons; return; }
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    if (performance.now() - p.t0 < 250 && p.moved < 0.02) this.taps[p.slot] = true;
    this.pointers.delete(e.pointerId);
  }
  down2(code) { return this.keys.has(code); }
  // Snapshot for this frame
  frame() {
    const f = {
      pointer: this.last.map((p) => ({ ...p })),
      buttons: this.buttons,
      clicked: this.clicked,
      keys: this.keys,
      pressed: new Set(this.pressed),
      wheel: this.wheel,
      virtual: { ...this.virtual },
      virtualPressed: new Set(this.virtualPressed),
      taps: [...this.taps],
    };
    this.pressed.clear(); this.virtualPressed.clear();
    this.wheel = 0; this.clicked = false; this.taps = [false, false];
    return f;
  }
}
