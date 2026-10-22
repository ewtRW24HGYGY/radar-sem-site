// Demonstração no navegador: um "servidor" de mentira roda as mesmas regras (regras.js + config.js)
// e entrega as ações ao overlay pelo mesmo canal que o servidor real usaria. Nada se conecta ao TikTok.

import config from './config.js';
import { criarMotor } from './regras.js';

const sockets = new Set();
const motor = criarMotor(config, (msg) => {
  const dado = JSON.stringify(msg);
  for (const s of sockets) s.onmessage?.({ data: dado });
  if (msg.tipo === 'urnas') montarUrnas(msg);
  else if (msg.tipo === 'voto') avisarVoto(msg);
});

class WebSocketFalso {
  readyState = 1;
  constructor() {
    sockets.add(this);
    setTimeout(() => {
      this.onmessage?.({ data: JSON.stringify({ tipo: 'estado', ...motor.snapshot() }) });
      this.onmessage?.({ data: JSON.stringify(motor.snapshotUrnas()) });
    }, 0);
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

// ---------- urnas ----------
let ladosUrnas = [];
let chaveUrnas = '';
function botao(titulo, sub, aoClicar) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = titulo;
  const s = document.createElement('small');
  s.textContent = sub;
  b.append(s);
  b.addEventListener('click', aoClicar);
  return b;
}
function montarUrnas(u) {
  ladosUrnas = u.lados;
  const chave = u.lados.map((l) => l.id).join();
  if (chave === chaveUrnas) return;
  chaveUrnas = chave;
  $('urna-botoes').replaceChildren(
    ...u.lados.flatMap((l) => [
      botao(`Digitar ${l.numero} no chat`, `${l.nome} · 1 voto grátis`, () => {
        $('urna-comentario').value = l.numero;
        disparar({ evento: 'chat', comentario: l.numero });
      }),
      botao(`${l.presente} · ${l.nome}`, `${u.votosPorPresente} votos cada, usa a sequência`, () =>
        disparar({ evento: 'presente', presente: l.presente, diamantes: 1, quantidade: quantidade() })),
    ]),
  );
}
function avisarVoto(v) {
  const lado = ladosUrnas.find((l) => l.id === v.lado)?.nome ?? v.lado;
  $('urna-status').textContent = v.ok
    ? `${v.nome} votou em ${lado} (+${v.votos}).`
    : `${v.nome} já usou o voto grátis (em ${lado}). Só presentes somam agora.`;
}
$('urna-enviar').addEventListener('click', () => disparar({ evento: 'chat', comentario: $('urna-comentario').value }));
$('urna-zerar').addEventListener('click', () => motor.zerarUrnas());
montarUrnas(motor.snapshotUrnas());

// O overlay abre o WebSocket ao carregar, então só entra depois do canal falso estar instalado.
await import('./overlay.js');
