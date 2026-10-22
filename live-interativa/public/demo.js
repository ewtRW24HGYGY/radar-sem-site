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

const ROTULO_EFEITO = { flutuar: 'sobe flutuando', explosao: 'explosão', chuva: 'chuva', confete: 'confete', fogos: 'fogos', tremor: 'a tela treme', correr: 'atravessa a tela', dinheiro: 'chuva de notas', galaxia: 'galáxia na tela' };
const nome = () => $('sim-nome').value.trim() || 'Visitante';
const quantidade = () => Number($('sim-qtd').value) || 1;
const disparar = (msg) => {
  $('dica').hidden = true;
  motor.simular({ nome: nome(), ...msg });
};

for (const g of config.catalogo) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = `${g.emoji?.[0] ?? '🎁'} ${g.pt}`;
  const s = document.createElement('small');
  s.textContent = `${g.moedas} 💎 · ${ROTULO_EFEITO[g.efeito] ?? g.efeito}`;
  b.append(s);
  b.addEventListener('click', () => disparar({ evento: 'presente', presente: g.nome, diamantes: g.moedas, quantidade: quantidade() }));
  $('grade-presentes').append(b);
}
$('sim-desconhecido').addEventListener('click', () => {
  const valor = Math.max(1, Math.min(1000, Number($('sim-valor').value) || 1));
  disparar({ evento: 'presente', presente: 'Presente novo', diamantes: valor, quantidade: quantidade() });
});
document.querySelectorAll('[data-evento]').forEach((b) => b.addEventListener('click', () => disparar({ evento: b.dataset.evento })));
$('zerar').addEventListener('click', () => motor.zerar());

// O overlay abre o WebSocket ao carregar, então só entra depois do canal falso estar instalado.
await import('./overlay.js');
