// User interface: screen navigation, persistent settings, HUD and notifications.
export const DEFAULTS = {
  difficulty: 'intermediate', camera: 'tp', quality: 'auto', assist: 'full', ballColor: 'white',
  sensitivity: 1, volume: 0.8, ambient: 0.5, trail: true, showFps: false,
  robotSpin: 'mixed', robotSpeed: 'medium', robotPlacement: 'random',
};
const KEY = 'topspin.settings.v1';

export function loadSettings() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { saved = {}; }
  return { ...DEFAULTS, ...saved };
}
export function saveSettings(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode */ } }
export function loadNumber(k, d = 0) { try { return Number(localStorage.getItem(k)) || d; } catch { return d; } }
export function saveNumber(k, v) { try { localStorage.setItem(k, String(v)); } catch { /* ignore */ } }

const $ = (id) => document.getElementById(id);

const ASSIST_NOTES = {
  full: 'A altura e o ângulo da raquete são ajustados para você; o braço evita golpes impossíveis. Você controla posição, momento, força e direção.',
  partial: 'A altura é automática e o ângulo é corrigido pela metade. Força e tempo são todos seus.',
  off: 'Controle total: altura (W/S), inclinação (roda do mouse) e ângulo dependem só de você.',
};

export class UI {
  constructor(settings, onChange, sound) {
    this.s = settings;
    this.onChange = onChange;
    this.sound = sound || (() => {});
    this.stack = ['scrMain'];
    this.toastTimer = 0;
    this.bind();
    this.refresh();
  }
  bind() {
    document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => { this.sound('click'); this.go(b.dataset.go); }));
    document.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', () => { this.sound('click'); this.back(); }));
    document.querySelectorAll('.seg[data-setting]').forEach((seg) => {
      seg.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        this.set(seg.dataset.setting, b.dataset.val);
        this.sound('click');
      });
    });
    document.querySelectorAll('[data-setting-range]').forEach((r) => {
      r.addEventListener('input', () => this.set(r.dataset.settingRange, Number(r.value)));
    });
    document.querySelectorAll('[data-setting-check]').forEach((c) => {
      c.addEventListener('change', () => this.set(c.dataset.settingCheck, c.checked));
    });
    document.querySelectorAll('.btn, .card, .seg button').forEach((b) => b.addEventListener('pointerenter', () => this.sound('hover')));
  }
  set(key, val) {
    this.s[key] = val;
    saveSettings(this.s);
    this.refresh();
    this.onChange(key, val);
  }
  refresh() {
    document.querySelectorAll('.seg[data-setting]').forEach((seg) => {
      const v = String(this.s[seg.dataset.setting]);
      seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.val === v));
    });
    document.querySelectorAll('[data-setting-range]').forEach((r) => { r.value = this.s[r.dataset.settingRange]; });
    document.querySelectorAll('[data-setting-check]').forEach((c) => { c.checked = !!this.s[c.dataset.settingCheck]; });
    $('sensOut').textContent = `${Math.round(this.s.sensitivity * 100)}%`;
    $('volOut').textContent = `${Math.round(this.s.volume * 100)}%`;
    $('ambOut').textContent = `${Math.round(this.s.ambient * 100)}%`;
    $('assistNote').textContent = ASSIST_NOTES[this.s.assist] || '';
  }

  // ——— Navigation ———
  hideAll() { document.querySelectorAll('.screen').forEach((s) => s.classList.add('hidden')); }
  go(id) { this.hideAll(); $(id).classList.remove('hidden'); if (this.stack[this.stack.length - 1] !== id) this.stack.push(id); }
  back() { this.stack.pop(); const id = this.stack[this.stack.length - 1] || 'scrMain'; this.hideAll(); $(id).classList.remove('hidden'); }
  reset(id = 'scrMain') { this.stack = [id]; this.hideAll(); if (id) $(id).classList.remove('hidden'); }
  closeAll() { this.stack = []; this.hideAll(); }
  showHud(on) { $('hud').classList.toggle('hidden', !on); }

  // ——— HUD ———
  setNames(n0, n1) { $('name0').textContent = n0; $('name1').textContent = n1; }
  setScore(score, server, meta, flash) {
    $('pts0').textContent = score.points[0]; $('pts1').textContent = score.points[1];
    $('games0').textContent = score.games[0]; $('games1').textContent = score.games[1];
    document.querySelectorAll('.sb-row').forEach((r) => r.classList.toggle('serving', Number(r.dataset.p) === server));
    $('sbMeta').textContent = meta;
    if (flash) { const sb = $('scoreboard'); sb.classList.remove('flash'); void sb.offsetWidth; sb.classList.add('flash'); }
  }
  showScoreboard(on) { $('scoreboard').classList.toggle('hidden', !on); }
  setRally(n) { $('rally').textContent = n; }
  setShot(shot) {
    if (!shot) { $('shotSpeed').textContent = '—'; $('shotSpin').textContent = '—'; return; }
    $('shotSpeed').textContent = Math.round(shot.kmh);
    const r = Math.round(shot.rps), sd = Math.round(shot.side);
    let txt = Math.abs(r) < 4 ? 'chapada' : r > 0 ? `top ${r} rps` : `corte ${-r} rps`;
    if (Math.abs(sd) >= 8) txt += ` · lat ${Math.abs(sd)}`;
    $('shotSpin').textContent = txt;
  }
  setStroke(kind, label) {
    const el = $('strokeName');
    el.textContent = label; el.className = kind;
  }
  setCamLabel(t) { $('camLabel').textContent = t; }
  toast(big, small = '', cls = 'neutral', ms = 1600) {
    const t = $('toast');
    t.className = `toast ${cls}`;
    t.innerHTML = `<div class="big">${big}</div>${small ? `<div class="small">${small}</div>` : ''}`;
    void t.offsetWidth;
    t.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  }
  hint(text) {
    const h = $('hint');
    if (text) { h.textContent = text; h.classList.add('show'); } else h.classList.remove('show');
  }
  training(html) {
    const el = $('trainingHud');
    if (!html) { el.classList.add('hidden'); return; }
    el.classList.remove('hidden'); el.innerHTML = html;
  }
  fps(text) { const el = $('fps'); el.classList.toggle('hidden', !this.s.showFps); el.textContent = text; }
  touchControls(on) { $('touchControls').classList.toggle('hidden', !on); }
  aiRead(text) { $('aiRead').textContent = text || ''; }
  results(title, html) { $('resTitle').textContent = title; $('resBody').innerHTML = html; this.reset('scrResults'); }
}
