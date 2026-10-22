// Demonstração no navegador: um "servidor" de mentira roda as mesmas regras (regras.js + config.js)
// e entrega as ações ao overlay pelo mesmo canal que o servidor real usaria. Nada se conecta ao TikTok.

import config from './config.js';
import { criarMotor } from './regras.js';

const sockets = new Set();
const motor = criarMotor(config, (msg) => {
  const dado = JSON.stringify(msg);
  for (const s of sockets) s.onmessage?.({ data: dado });
});

class WebSocketFalso {
  readyState = 1;
  constructor() {
    sockets.add(this);
    setTimeout(() => this.onmessage?.({ data: JSON.stringify({ tipo: 'estado', ...motor.snapshot() }) }), 0);
  }
  send() {}
  close() {
    sockets.delete(this);
  }
}
window.WebSocket = WebSocketFalso;

// ---------- botões ----------
const $ = (id) => document.getElementById(id);

document.querySelectorAll('[data-presente], [data-evento]').forEach((b) => {
  b.addEventListener('click', () => {
    $('dica').hidden = true;
    const nome = $('sim-nome').value.trim() || 'Visitante';
    if (b.dataset.evento) motor.simular({ evento: b.dataset.evento, nome });
    else motor.simular({ evento: 'presente', nome, presente: b.dataset.presente, diamantes: Number(b.dataset.diamantes) });
  });
});
$('zerar').addEventListener('click', () => motor.zerar());

// O overlay abre o WebSocket ao carregar, então só entra depois do canal falso estar instalado.
await import('./overlay.js');
