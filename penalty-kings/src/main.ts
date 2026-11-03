import { Game } from './game/game';

const app = document.getElementById('app')!;
const view = document.getElementById('view')!;
const game = new Game(app, view);
game.boot().catch((e) => {
  console.error(e);
  const msg = document.createElement('div');
  msg.style.cssText = 'position:fixed;inset:auto 16px 16px 16px;padding:12px;background:#300;color:#fff;font:14px system-ui;border-radius:8px;z-index:99';
  msg.textContent = 'Não foi possível iniciar o WebGL neste navegador: ' + (e?.message ?? e);
  document.body.appendChild(msg);
});
(window as unknown as { __game: Game }).__game = game;
