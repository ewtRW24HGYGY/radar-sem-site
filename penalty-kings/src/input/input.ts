/**
 * Unified input: keyboard + mouse, touch (virtual controls) and gamepads.
 * The game reads intent-level values (aim rate, action button edges, …).
 */
export class Input {
  private keys = new Set<string>();
  private pressedKeys = new Set<string>();
  private releasedKeys = new Set<string>();
  /** Pointer position in normalised device coords (−1..1), if over the canvas. */
  pointer: { x: number; y: number; active: boolean; moved: boolean } = { x: 0, y: 0, active: false, moved: false };
  pointerDown = false;
  private pointerPressed = false;
  private pointerReleased = false;
  wheel = 0;
  /** Touch drag delta (pixels) since last frame. */
  drag = { x: 0, y: 0 };
  virtual = { action: false, stutter: false, faster: false, slower: false };
  private vPrev = { action: false, stutter: false };
  private pad: Gamepad | null = null;
  private padPrev: boolean[] = [];
  private padNow: boolean[] = [];
  lastDevice: 'keyboard' | 'touch' | 'gamepad' = 'keyboard';
  enabled = true;

  constructor(el: HTMLElement) {
    window.addEventListener('keydown', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) e.preventDefault();
      if (!this.keys.has(e.code)) this.pressedKeys.add(e.code);
      this.keys.add(e.code);
      this.lastDevice = 'keyboard';
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      this.releasedKeys.add(e.code);
    });
    window.addEventListener('blur', () => this.keys.clear());
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      this.pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      this.pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      this.pointer.active = true;
      this.pointer.moved = true;
      if (e.pointerType === 'touch') {
        this.drag.x += e.movementX || 0;
        this.drag.y += e.movementY || 0;
        this.lastDevice = 'touch';
      } else this.lastDevice = 'keyboard';
    });
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') {
        this.lastDevice = 'touch';
        this.lastTouch = { x: e.clientX, y: e.clientY };
        return; // touch uses virtual buttons for actions; drag aims
      }
      if (e.button === 0) {
        this.pointerDown = true;
        this.pointerPressed = true;
      }
    });
    el.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      if (t && this.lastTouch) {
        this.drag.x += t.clientX - this.lastTouch.x;
        this.drag.y += t.clientY - this.lastTouch.y;
        this.lastTouch = { x: t.clientX, y: t.clientY };
      }
      e.preventDefault();
    }, { passive: false });
    window.addEventListener('pointerup', (e) => {
      if (e.pointerType === 'touch') {
        this.lastTouch = null;
        return;
      }
      if (e.button === 0 && this.pointerDown) {
        this.pointerDown = false;
        this.pointerReleased = true;
      }
    });
    el.addEventListener('pointerleave', () => (this.pointer.active = false));
    el.addEventListener('wheel', (e) => {
      this.wheel += Math.sign(e.deltaY);
      e.preventDefault();
    }, { passive: false });
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  private lastTouch: { x: number; y: number } | null = null;

  /** Poll gamepads; call once per frame before reading. */
  poll(): void {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    this.pad = null;
    for (const p of pads) if (p && p.connected) { this.pad = p; break; }
    this.padPrev = this.padNow;
    this.padNow = this.pad ? this.pad.buttons.map((b) => b.pressed) : [];
    if (this.pad && (this.padNow.some((b) => b) || this.pad.axes.some((a) => Math.abs(a) > 0.3))) this.lastDevice = 'gamepad';
  }

  /** Clear edge-triggered state; call at the end of each frame. */
  endFrame(): void {
    this.pressedKeys.clear();
    this.releasedKeys.clear();
    this.pointerPressed = false;
    this.pointerReleased = false;
    this.pointer.moved = false;
    this.wheel = 0;
    this.drag.x = this.drag.y = 0;
    this.vPrev.action = this.virtual.action;
    this.vPrev.stutter = this.virtual.stutter;
  }

  key(code: string): boolean {
    return this.enabled && this.keys.has(code);
  }
  pressed(code: string): boolean {
    return this.enabled && this.pressedKeys.has(code);
  }
  private padBtn(i: number): boolean {
    return !!this.padNow[i];
  }
  private padPressed(i: number): boolean {
    return !!this.padNow[i] && !this.padPrev[i];
  }
  padAxis(i: number): number {
    const v = this.pad?.axes[i] ?? 0;
    return Math.abs(v) < 0.15 ? 0 : v;
  }
  padTrigger(i: number): number {
    return this.pad?.buttons[i]?.value ?? 0;
  }

  /** Main action (strike / power / dive). */
  actionDown(): boolean {
    return this.key('Space') || this.pointerDown || this.padBtn(0) || this.virtual.action;
  }
  actionPressed(): boolean {
    return this.pressed('Space') || this.pointerPressed || this.padPressed(0) || (this.virtual.action && !this.vPrev.action);
  }
  actionReleased(): boolean {
    return (
      this.releasedKeys.has('Space') ||
      this.pointerReleased ||
      (!!this.padPrev[0] && !this.padNow[0]) ||
      (!this.virtual.action && this.vPrev.action)
    );
  }
  stutterPressed(): boolean {
    return this.pressed('ShiftLeft') || this.pressed('ShiftRight') || this.padPressed(1) || (this.virtual.stutter && !this.vPrev.stutter);
  }
  /** Run-up speed modulation −1..1. */
  speedAxis(): number {
    let v = 0;
    if (this.key('KeyW') || this.key('ArrowUp') || this.virtual.faster) v += 1;
    if (this.key('KeyS') || this.key('ArrowDown') || this.virtual.slower) v -= 1;
    v += this.padTrigger(7) - this.padTrigger(6);
    return Math.max(-1, Math.min(1, v));
  }
  /** Aim movement rate −1..1 per axis (keys / stick). */
  aimAxis(): { x: number; y: number } {
    let x = 0;
    let y = 0;
    if (this.key('KeyA') || this.key('ArrowLeft')) x -= 1;
    if (this.key('KeyD') || this.key('ArrowRight')) x += 1;
    if (this.key('KeyW') || this.key('ArrowUp')) y += 1;
    if (this.key('KeyS') || this.key('ArrowDown')) y -= 1;
    x += this.padAxis(0) + (this.padBtn(15) ? 1 : 0) - (this.padBtn(14) ? 1 : 0);
    y += -this.padAxis(1) + (this.padBtn(12) ? 1 : 0) - (this.padBtn(13) ? 1 : 0);
    return { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  }
  /** Spin modifiers (right stick / I-K-J-L / wheel). */
  spinAxis(): { x: number; y: number } {
    let x = this.padAxis(2);
    let y = -this.padAxis(3);
    if (this.key('KeyJ')) x -= 1;
    if (this.key('KeyL')) x += 1;
    if (this.key('KeyI')) y += 1;
    if (this.key('KeyK')) y -= 1;
    return { x, y };
  }
  techniquePressed(): number | null {
    for (let i = 1; i <= 7; i++) if (this.pressed('Digit' + i) || this.pressed('Numpad' + i)) return i - 1;
    return null;
  }
  techniqueCycle(): number {
    return (this.pressed('KeyE') || this.padPressed(5) ? 1 : 0) - (this.pressed('KeyQ') || this.padPressed(4) ? 1 : 0);
  }
  footPressed(): boolean {
    return this.pressed('KeyT') || this.padPressed(2);
  }
  cameraPressed(): boolean {
    return this.pressed('KeyC') || this.padPressed(3);
  }
  followPressed(): boolean {
    return this.pressed('KeyV');
  }
  pausePressed(): boolean {
    return this.pressed('Escape') || this.pressed('KeyP') || this.padPressed(9);
  }
  replayPressed(): boolean {
    return this.pressed('KeyR') || this.padPressed(8);
  }
  continuePressed(): boolean {
    return this.pressed('Enter') || this.pressed('Space') || this.padPressed(0);
  }
  /** Run-up distance / angle adjustment from keys. */
  runAdjust(): { dist: number; angle: number } {
    return {
      dist: (this.pressed('BracketRight') ? 1 : 0) - (this.pressed('BracketLeft') ? 1 : 0),
      angle: (this.pressed('Period') ? 1 : 0) - (this.pressed('Comma') ? 1 : 0),
    };
  }
  hasGamepad(): boolean {
    return !!this.pad;
  }
}
