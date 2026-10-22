// Overlay da live: recebe ações do servidor e desenha efeitos na tela.
// Nunca decide nada sozinho; as regras ficam em config.js (servidor).

const params = new URLSearchParams(location.search);
if (params.has('fundo')) document.body.classList.add('fundo');

const $ = (id) => document.getElementById(id);
const palco = $('palco');
const tela = $('particulas');
const ctx = tela.getContext('2d');

const CORES_RARIDADE = { comum: '#b8c4d6', raro: '#4aa3ff', epico: '#b46bff', lendario: '#ffc233' };
const NOME_RARIDADE = { comum: 'Baú comum', raro: 'Baú raro', epico: 'Baú épico', lendario: 'Baú lendário' };
const CONFETE = ['#25f4ee', '#fe2c55', '#ffc233', '#ffffff', '#7cff6b', '#b46bff'];
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);

// ---------- som (sintetizado, sem arquivos) ----------
let audio;
function tocar(notas, { tipo = 'triangle', passo = 0.09, vol = 0.12 } = {}) {
  try {
    audio ??= new AudioContext();
    if (audio.state === 'suspended') audio.resume();
    notas.forEach((freq, i) => {
      const osc = audio.createOscillator();
      const ganho = audio.createGain();
      const t = audio.currentTime + i * passo;
      osc.type = tipo;
      osc.frequency.value = freq;
      ganho.gain.setValueAtTime(vol, t);
      ganho.gain.exponentialRampToValueAtTime(0.0001, t + passo * 2.2);
      osc.connect(ganho).connect(audio.destination);
      osc.start(t);
      osc.stop(t + passo * 2.4);
    });
  } catch {
    /* sem áudio disponível: segue sem som */
  }
}
const SONS = {
  confete: () => tocar([523, 659, 784]),
  coracoes: () => tocar([784, 988, 1175]),
  chuva: () => tocar([440, 554, 659, 880]),
  fogos: () => tocar([196, 392, 784, 1175], { tipo: 'sawtooth', passo: 0.07, vol: 0.07 }),
  tremor: () => tocar([110, 98, 82], { tipo: 'square', passo: 0.12, vol: 0.1 }),
  bauAbre: () => tocar([392, 523, 659, 784, 1047], { passo: 0.1 }),
  bauBalanca: () => tocar([140, 120, 140, 120], { tipo: 'square', passo: 0.12, vol: 0.06 }),
};

// ---------- partículas ----------
const particulas = [];
let rodando = false;

function ajustarTela() {
  tela.width = innerWidth * devicePixelRatio;
  tela.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
addEventListener('resize', ajustarTela);
ajustarTela();

function adicionar(p) {
  particulas.push({ vida: 1, decai: 0.004, g: 0.12, atrito: 1, rot: 0, vrot: 0, ...p });
  if (!rodando) {
    rodando = true;
    requestAnimationFrame(quadro);
  }
}

function quadro() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = particulas.length - 1; i >= 0; i--) {
    const p = particulas[i];
    p.vx *= p.atrito;
    p.vy = p.vy * p.atrito + p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vrot;
    p.vida -= p.decai;
    if (p.vida <= 0 || p.y > innerHeight + 80 || p.y < -200) {
      particulas.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.globalAlpha = Math.min(1, p.vida * 2);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    if (p.emoji) {
      ctx.font = `${p.tam}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.emoji, 0, 0);
    } else if (p.brilho) {
      ctx.fillStyle = p.cor;
      ctx.shadowColor = p.cor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, 0, p.tam, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = p.cor;
      ctx.fillRect(-p.tam / 2, -p.tam / 4, p.tam, p.tam / 2);
    }
    ctx.restore();
  }
  if (particulas.length) requestAnimationFrame(quadro);
  else {
    rodando = false;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
}

function confete(n = 140, cores = CONFETE, origem = null) {
  for (let i = 0; i < n; i++) {
    adicionar({
      x: origem ? origem.x : rand(0, innerWidth),
      y: origem ? origem.y : rand(-80, -10),
      vx: origem ? rand(-9, 9) : rand(-2, 2),
      vy: origem ? rand(-16, -4) : rand(1, 5),
      g: 0.18,
      atrito: 0.99,
      tam: rand(10, 20),
      cor: cores[i % cores.length],
      rot: rand(0, 6),
      vrot: rand(-0.25, 0.25),
      decai: 0.003,
    });
  }
}

function emojis(lista, n, { subindo = false } = {}) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      adicionar({
        emoji: lista[i % lista.length],
        tam: rand(34, 72),
        x: rand(40, innerWidth - 40),
        y: subindo ? innerHeight + 40 : -50,
        vx: rand(-1.2, 1.2),
        vy: subindo ? rand(-7, -3) : rand(2, 5),
        g: subindo ? -0.01 : 0.03,
        decai: subindo ? 0.0035 : 0.002,
        rot: rand(-0.3, 0.3),
        vrot: rand(-0.03, 0.03),
      });
    }, i * 35);
  }
}

function fogos(rajadas = 6) {
  for (let r = 0; r < rajadas; r++) {
    setTimeout(() => {
      const x = rand(innerWidth * 0.15, innerWidth * 0.85);
      const y = rand(innerHeight * 0.12, innerHeight * 0.5);
      const cor = CONFETE[Math.floor(rand(0, CONFETE.length))];
      for (let i = 0; i < 80; i++) {
        const ang = (i / 80) * Math.PI * 2;
        const vel = rand(2, 9);
        adicionar({ x, y, vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel, g: 0.09, atrito: 0.965, tam: rand(2, 4), cor, brilho: true, decai: 0.011 });
      }
    }, r * 450);
  }
}

// ---------- fila de ações ----------
const fila = [];
let processando = false;
const LIMITE_FILA = 8;

function enfileirar(acoes, quem) {
  for (const acao of acoes) {
    // Em enxurrada de presentes, descarta efeitos leves antigos para não atrasar os baús.
    if (fila.length >= LIMITE_FILA) {
      const leve = fila.findIndex((f) => f.acao.efeito !== 'bau');
      if (leve === -1 && acao.efeito !== 'bau') continue;
      if (leve !== -1) fila.splice(leve, 1);
    }
    fila.push({ acao, quem });
  }
  if (!processando) processar();
}

async function processar() {
  processando = true;
  while (fila.length) {
    const { acao, quem } = fila.shift();
    await EFEITOS[acao.efeito]?.(acao, quem);
  }
  processando = false;
}

async function aviso(texto, quem, icone = '') {
  const el = document.createElement('div');
  el.className = 'aviso';
  if (quem?.avatar) {
    const img = document.createElement('img');
    img.referrerPolicy = 'no-referrer';
    img.alt = '';
    img.src = quem.avatar;
    img.onerror = () => img.remove();
    el.append(img);
  } else if (icone) {
    const i = document.createElement('span');
    i.className = 'icone';
    i.textContent = icone;
    el.append(i);
  }
  const t = document.createElement('span');
  t.textContent = texto;
  el.append(t);
  $('avisos').append(el);
  await dormir(2800);
  el.classList.add('sai');
  await dormir(400);
  el.remove();
}

const EFEITOS = {
  async confete(a, q) {
    SONS.confete();
    confete();
    await aviso(a.texto, q, '🎉');
  },
  async coracoes(a, q) {
    SONS.coracoes();
    emojis(['❤️', '💖', '💗', '💕'], 36, { subindo: true });
    await aviso(a.texto, q, '💖');
  },
  async chuva(a, q) {
    SONS.chuva();
    emojis(a.emoji?.length ? a.emoji : ['⭐'], 44);
    await aviso(a.texto, q, a.emoji?.[0] ?? '⭐');
  },
  async fogos(a, q) {
    SONS.fogos();
    fogos();
    await aviso(a.texto, q, '🎆');
  },
  async tremor(a, q) {
    SONS.tremor();
    palco.classList.add('tremor');
    setTimeout(() => palco.classList.remove('tremor'), 850);
    await aviso(a.texto, q, '💥');
  },
  async bau(a) {
    await abrirBau(a);
  },
};

// ---------- baú ----------
const BAU_SVG = `
<svg class="bau-svg" viewBox="0 0 200 170" aria-hidden="true">
  <defs>
    <linearGradient id="madeira" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a5b2c"/><stop offset="1" stop-color="#5e3216"/></linearGradient>
    <linearGradient id="interior" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c4"/><stop offset="1" stop-color="var(--cor)"/></linearGradient>
  </defs>
  <rect x="26" y="80" width="148" height="12" fill="url(#interior)"/>
  <rect x="20" y="84" width="160" height="74" rx="8" fill="url(#madeira)" stroke="#3a1d0b" stroke-width="3"/>
  <rect x="20" y="108" width="160" height="10" fill="var(--cor)" opacity="0.9"/>
  <rect x="88" y="100" width="24" height="30" rx="4" fill="var(--cor)" stroke="#3a1d0b" stroke-width="3"/>
  <circle cx="100" cy="114" r="4" fill="#3a1d0b"/>
  <g class="tampa">
    <path d="M20 84 V70 a52 52 0 0 1 52 -42 h56 a52 52 0 0 1 52 42 V84 Z" fill="url(#madeira)" stroke="#3a1d0b" stroke-width="3"/>
    <rect x="20" y="72" width="160" height="10" fill="var(--cor)" opacity="0.9"/>
    <rect x="88" y="66" width="24" height="22" rx="4" fill="var(--cor)" stroke="#3a1d0b" stroke-width="3"/>
  </g>
</svg>`;

async function abrirBau(a) {
  const cena = $('bau-cena');
  const cor = CORES_RARIDADE[a.raridade] ?? CORES_RARIDADE.comum;
  cena.style.setProperty('--cor', cor);
  cena.className = '';
  cena.replaceChildren();

  const titulo = document.createElement('div');
  titulo.className = 'bau-titulo';
  titulo.textContent = a.texto;

  const wrap = document.createElement('div');
  wrap.className = 'bau-wrap';
  wrap.innerHTML = `<div class="brilho"></div>${BAU_SVG}`;

  cena.append(wrap, titulo);
  cena.hidden = false;

  SONS.bauBalanca();
  await dormir(150);
  wrap.classList.add('treme');
  await dormir(1000);

  wrap.classList.add('aberto');
  SONS.bauAbre();
  const caixa = wrap.getBoundingClientRect();
  const origem = { x: caixa.left + caixa.width / 2, y: caixa.top + caixa.height * 0.4 };
  confete(a.raridade === 'lendario' ? 260 : 150, [cor, '#ffffff', '#ffe08a'], origem);
  if (a.raridade === 'lendario' || a.raridade === 'epico') fogos(a.raridade === 'lendario' ? 8 : 4);
  await dormir(700);

  const premio = document.createElement('div');
  premio.className = 'premio';
  const rotulo = document.createElement('small');
  rotulo.textContent = NOME_RARIDADE[a.raridade] ?? 'Baú';
  premio.append(rotulo, document.createTextNode(a.premio ?? ''));
  cena.append(premio);

  await dormir(6500);
  cena.classList.add('sai');
  await dormir(500);
  cena.hidden = true;
  cena.replaceChildren();
}

// ---------- meta e ranking ----------
function desenharEstado(s) {
  $('meta').hidden = false;
  $('meta-texto').textContent = s.metaTexto;
  $('meta-valor').textContent = `${s.progresso} / ${s.meta} 💎`;
  $('meta-barra').style.width = `${Math.min(100, (s.progresso / s.meta) * 100)}%`;

  const lista = $('ranking-lista');
  lista.replaceChildren();
  s.ranking.slice(0, 3).forEach((r, i) => {
    const li = document.createElement('li');
    const nome = document.createElement('span');
    nome.textContent = `${['🥇', '🥈', '🥉'][i]} ${r.nome}`;
    const val = document.createElement('span');
    val.textContent = `${r.diamantes} 💎`;
    li.append(nome, val);
    lista.append(li);
  });
  $('ranking').hidden = s.ranking.length === 0;
}

// ---------- WebSocket ----------
function conectar() {
  const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`);
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.tipo === 'estado') desenharEstado(msg);
    else if (msg.acoes) enfileirar(msg.acoes, { avatar: msg.avatar });
  };
  ws.onclose = () => setTimeout(conectar, 2000);
}
conectar();
