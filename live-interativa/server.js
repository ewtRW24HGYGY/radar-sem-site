// Servidor local da live interativa.
//   - lê eventos da live do TikTok (presentes, seguidores, compartilhamentos, curtidas)
//   - decide a ação de cada presente conforme config.js
//   - repassa tudo por WebSocket para o overlay (OBS) e para o painel
//
// Uso: npm start   (depois abra http://localhost:3000)

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { TikTokLiveConnection, WebcastEvent, ControlEvent } from 'tiktok-live-connector';
import config from './config.js';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const PUBLIC_DIR = resolve(fileURLToPath(new URL('./public', import.meta.url)));

// ---------- estado da sessão ----------
const estado = {
  usuario: process.env.TIKTOK_USER || '',
  status: 'parado', // parado | conectando | conectado | erro
  mensagem: '',
  total: 0,
  metaAtual: config.meta.alvo,
  metasBatidas: 0,
  ranking: new Map(), // apelido -> diamantes
};

function snapshot() {
  const ranking = [...estado.ranking.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([nome, diamantes]) => ({ nome, diamantes }));
  return {
    titulo: config.titulo,
    metaTexto: config.meta.texto,
    meta: estado.metaAtual,
    progresso: estado.total,
    metasBatidas: estado.metasBatidas,
    ranking,
  };
}

// ---------- WebSocket para overlay e painel ----------
const server = http.createServer(servirArquivo);
const wss = new WebSocketServer({
  server,
  // Bloqueia páginas de outros sites tentando falar com o servidor local.
  verifyClient: ({ origin }) => {
    if (!origin) return true;
    try {
      const { hostname } = new URL(origin);
      return ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
    } catch {
      return false;
    }
  },
});

function enviar(ws, msg) {
  if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(msg));
}
function transmitir(msg) {
  for (const ws of wss.clients) enviar(ws, msg);
}
function statusMsg() {
  return { tipo: 'status', usuario: estado.usuario, status: estado.status, mensagem: estado.mensagem };
}
function definirStatus(status, mensagem = '') {
  estado.status = status;
  estado.mensagem = mensagem;
  transmitir(statusMsg());
}

wss.on('connection', (ws) => {
  enviar(ws, statusMsg());
  enviar(ws, { tipo: 'estado', ...snapshot() });
  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }
    tratarComando(msg);
  });
});

function tratarComando(msg) {
  switch (msg.tipo) {
    case 'conectar':
      conectar(String(msg.usuario || ''));
      break;
    case 'desconectar':
      desconectar();
      break;
    case 'zerar':
      estado.total = 0;
      estado.metaAtual = config.meta.alvo;
      estado.metasBatidas = 0;
      estado.ranking.clear();
      transmitir({ tipo: 'estado', ...snapshot() });
      break;
    case 'simular':
      simular(msg);
      break;
  }
}

// ---------- regras: presente -> ação ----------
const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)];
const preencher = (texto, nome) => String(texto || '').replaceAll('{nome}', nome);

export function decidirAcao({ nome, presente, diamantes }) {
  const porNome = config.presentes[presente.toLowerCase()];
  let regra = porNome;
  if (!regra) {
    const valor = Math.max(diamantes, 1);
    regra = [...config.faixas].reverse().find((f) => valor >= f.min) ?? config.faixas[0];
  }
  const acao = {
    efeito: regra.efeito,
    texto: preencher(regra.texto, nome),
    emoji: regra.emoji,
  };
  if (regra.efeito === 'bau') {
    acao.raridade = regra.raridade || 'comum';
    acao.premio = sortear(config.premios[acao.raridade] ?? config.premios.comum);
  }
  return acao;
}

function processarPresente({ nome, avatar, presente, imagem, diamantes, quantidade }) {
  estado.total += diamantes;
  estado.ranking.set(nome, (estado.ranking.get(nome) || 0) + diamantes);

  const acoes = [decidirAcao({ nome, presente, diamantes })];

  // Meta batida (pode bater mais de uma de uma vez em presentes grandes).
  while (estado.total >= estado.metaAtual) {
    estado.total -= estado.metaAtual;
    estado.metasBatidas += 1;
    estado.metaAtual = Math.round(estado.metaAtual * config.meta.multiplicador);
    acoes.push({
      efeito: 'bau',
      raridade: 'lendario',
      texto: `META BATIDA! Obrigado, chat!`,
      premio: sortear(config.premios.lendario),
      meta: true,
    });
  }

  transmitir({ tipo: 'presente', nome, avatar, presente, imagem, diamantes, quantidade, acoes });
  transmitir({ tipo: 'estado', ...snapshot() });
}

function processarExtra(tipo, nome, avatar) {
  const regra = config.extras[tipo];
  if (!regra) return;
  transmitir({ tipo, nome, avatar, acoes: [{ efeito: regra.efeito, texto: preencher(regra.texto, nome) }] });
}

// ---------- simulador (para testar sem estar ao vivo) ----------
function simular(msg) {
  const nome = String(msg.nome || 'Visitante').slice(0, 30);
  if (msg.evento === 'presente') {
    const diamantes = Math.max(1, Math.min(Number(msg.diamantes) || 1, 100000));
    processarPresente({
      nome,
      avatar: '',
      presente: String(msg.presente || 'Presente').slice(0, 40),
      imagem: '',
      diamantes,
      quantidade: 1,
    });
  } else if (msg.evento === 'seguidor') {
    processarExtra('seguidor', nome, '');
  } else if (msg.evento === 'compartilhou') {
    processarExtra('compartilhou', nome, '');
  }
}

// ---------- conexão com a live do TikTok ----------
let conexao = null;

function lerPresente(d) {
  const det = d.giftDetails ?? {};
  const ext = d.extendedGiftInfo ?? {};
  const tipo = det.giftType ?? ext.type ?? d.giftType;
  const quantidade = Number(d.repeatCount) || 1;
  const unitario = Number(det.diamondCount ?? ext.diamond_count ?? d.diamondCount ?? 0) || 0;
  return {
    emSequencia: tipo === 1 && !d.repeatEnd, // sequência ainda rolando: espera o fim
    presente: det.giftName ?? ext.name ?? d.giftName ?? `presente ${d.giftId}`,
    imagem: det.giftImage?.url?.[0] ?? ext.image?.url_list?.[0] ?? d.giftPictureUrl ?? '',
    quantidade,
    diamantes: unitario * quantidade,
  };
}

function quemE(d) {
  const u = d.user ?? {};
  return {
    nome: u.nickname || u.uniqueId || 'Alguém',
    avatar: u.profilePicture?.url?.[0] ?? u.profilePictureUrl ?? '',
  };
}

async function conectar(usuario) {
  usuario = usuario.replace(/^@/, '').trim();
  if (!/^[A-Za-z0-9._]{1,40}$/.test(usuario)) {
    definirStatus('erro', 'Usuário inválido. Use só letras, números, ponto e _.');
    return;
  }
  desconectar(false);
  estado.usuario = usuario;
  definirStatus('conectando', `Conectando em @${usuario}…`);

  const con = new TikTokLiveConnection(usuario, {
    enableExtendedGiftInfo: true,
    ...(process.env.EULER_API_KEY ? { signApiKey: process.env.EULER_API_KEY } : {}),
  });
  conexao = con;

  con.on(WebcastEvent.GIFT, (d) => {
    const g = lerPresente(d);
    if (g.emSequencia) return;
    processarPresente({ ...quemE(d), ...g });
  });
  con.on(WebcastEvent.FOLLOW, (d) => processarExtra('seguidor', quemE(d).nome, quemE(d).avatar));
  con.on(WebcastEvent.SHARE, (d) => processarExtra('compartilhou', quemE(d).nome, quemE(d).avatar));
  con.on(WebcastEvent.LIKE, (d) => transmitir({ tipo: 'curtida', total: d.totalLikeCount ?? 0 }));
  con.on(WebcastEvent.STREAM_END, () => definirStatus('parado', 'A live foi encerrada.'));
  con.on(ControlEvent.DISCONNECTED, () => {
    if (conexao === con) definirStatus('parado', 'Desconectado da live.');
  });
  con.on(ControlEvent.ERROR, ({ info }) => console.error('[tiktok]', info));

  try {
    await con.connect();
    if (conexao === con) definirStatus('conectado', `Ouvindo a live de @${usuario}`);
  } catch (err) {
    if (conexao !== con) return;
    conexao = null;
    const offline = /offline|not live|UserOffline/i.test(`${err?.name} ${err?.message}`);
    definirStatus('erro', offline ? `@${usuario} não está ao vivo agora.` : `Falha ao conectar: ${err?.message ?? err}`);
  }
}

function desconectar(avisar = true) {
  if (conexao) {
    const antiga = conexao;
    conexao = null;
    try {
      antiga.disconnect();
    } catch {
      /* já estava desconectada */
    }
  }
  if (avisar) definirStatus('parado', 'Desconectado.');
}

// ---------- arquivos estáticos ----------
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};
const ROTAS = { '/': '/painel.html', '/painel': '/painel.html', '/overlay': '/overlay.html' };

async function servirArquivo(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost');
  const caminho = normalize(join(PUBLIC_DIR, ROTAS[pathname] ?? pathname));
  if (!caminho.startsWith(PUBLIC_DIR)) {
    res.writeHead(403).end('Proibido');
    return;
  }
  try {
    const corpo = await readFile(caminho);
    res.writeHead(200, { 'content-type': TIPOS[extname(caminho)] ?? 'application/octet-stream' });
    res.end(corpo);
  } catch {
    res.writeHead(404).end('Não encontrado');
  }
}

// ---------- start ----------
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(PORT, HOST, () => {
    console.log(`Painel:  http://localhost:${PORT}/`);
    console.log(`Overlay: http://localhost:${PORT}/overlay   (fonte de navegador no OBS)`);
    if (estado.usuario) conectar(estado.usuario);
  });
}
