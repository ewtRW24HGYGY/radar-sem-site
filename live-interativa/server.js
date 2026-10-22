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
import { criarMotor } from './regras.js';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const PUBLIC_DIR = resolve(fileURLToPath(new URL('./public', import.meta.url)));

// ---------- estado da conexão ----------
const estado = {
  usuario: process.env.TIKTOK_USER || '',
  status: 'parado', // parado | conectando | conectado | erro
  mensagem: '',
};

// Regras (presente -> ação, meta, ranking) ficam em regras.js, compartilhado com a demo.
const motor = criarMotor(config, (msg) => transmitir(msg));

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
  enviar(ws, { tipo: 'estado', ...motor.snapshot() });
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
      motor.zerar();
      break;
    case 'simular':
      motor.simular(msg);
      break;
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
    motor.processarPresente({ ...quemE(d), ...g });
  });
  con.on(WebcastEvent.FOLLOW, (d) => motor.processarExtra('seguidor', quemE(d).nome, quemE(d).avatar));
  con.on(WebcastEvent.SHARE, (d) => motor.processarExtra('compartilhou', quemE(d).nome, quemE(d).avatar));
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
const ROTAS = { '/': '/painel.html', '/painel': '/painel.html', '/overlay': '/overlay.html', '/demo': '/demo.html' };
// Módulos compartilhados com a página de demonstração (/demo), que roda as regras no navegador.
const ARQUIVOS_RAIZ = { '/config.js': './config.js', '/regras.js': './regras.js' };

async function servirArquivo(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost');
  const raiz = ARQUIVOS_RAIZ[pathname];
  const caminho = raiz ? fileURLToPath(new URL(raiz, import.meta.url)) : normalize(join(PUBLIC_DIR, ROTAS[pathname] ?? pathname));
  if (!raiz && !caminho.startsWith(PUBLIC_DIR)) {
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
