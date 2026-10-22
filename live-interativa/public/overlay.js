// Overlay da live: recebe ações do servidor e desenha efeitos na tela.
// Nunca decide nada sozinho; as regras ficam em config.js e regras.js.

const params = new URLSearchParams(location.search);
if (params.has('fundo')) document.body.classList.add('fundo');

const $ = (id) => document.getElementById(id);
const palco = $('palco');
const tela = $('particulas');
const ctx = tela.getContext('2d');

const CORES_RARIDADE = { comum: '#b8c4d6', raro: '#4aa3ff', epico: '#b46bff', lendario: '#ffc233' };
const NOME_RARIDADE = { comum: 'Baú comum', raro: 'Baú raro', epico: 'Baú épico', lendario: 'Baú lendário' };
const CONFETE = ['#25f4ee', '#fe2c55', '#ffc233', '#ffffff', '#7cff6b', '#b46bff'];
const ICONE_EFEITO = { flutuar: '💖', explosao: '✨', chuva: '⭐', confete: '🎉', fogos: '🎆', tremor: '💥', correr: '🐾', dinheiro: '💵', galaxia: '🌌' };
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)];

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
  flutuar: () => tocar([880, 1175], { passo: 0.07, vol: 0.08 }),
  explosao: () => tocar([330, 495, 660, 990], { passo: 0.05, vol: 0.08 }),
  confete: () => tocar([523, 659, 784]),
  chuva: () => tocar([440, 554, 659, 880]),
  fogos: () => tocar([196, 392, 784, 1175], { tipo: 'sawtooth', passo: 0.07, vol: 0.07 }),
  tremor: () => tocar([110, 98, 82], { tipo: 'square', passo: 0.12, vol: 0.1 }),
  correr: () => tocar([220, 277, 330, 277, 220, 277], { tipo: 'square', passo: 0.1, vol: 0.04 }),
  dinheiro: () => tocar([1568, 2093, 2637], { passo: 0.07, vol: 0.08 }),
  galaxia: () => tocar([196, 247, 294, 392, 494, 587, 784, 988], { passo: 0.12, vol: 0.07 }),
  tecla: () => tocar([1250], { tipo: 'square', passo: 0.025, vol: 0.05 }),
  votar: () => tocar([660, 880], { passo: 0.08, vol: 0.09 }),
  bauAbre: () => tocar([392, 523, 659, 784, 1047], { passo: 0.1 }),
  bauBalanca: () => tocar([140, 120, 140, 120], { tipo: 'square', passo: 0.12, vol: 0.06 }),
};

// ---------- motor de partículas ----------
// Velocidades são em "pixels por quadro a 60 fps" e escalam com o tempo real (OBS costuma rodar a 30 fps).
const particulas = [];
const camadas = new Set(); // desenhos de fundo (ex.: galáxia): função que devolve false ao terminar
let rodando = false;
let ultimo = 0;

// L e A: largura e altura da área de desenho (no OBS, a janela inteira; na demo, só o palco).
let L = 0;
let A = 0;
function ajustarTela() {
  L = tela.clientWidth || innerWidth;
  A = tela.clientHeight || innerHeight;
  tela.width = L * devicePixelRatio;
  tela.height = A * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
new ResizeObserver(ajustarTela).observe(tela);
ajustarTela();

function acordar() {
  if (rodando) return;
  rodando = true;
  ultimo = performance.now();
  requestAnimationFrame(quadro);
}

function adicionar(p) {
  particulas.push({ vida: 1, decai: 0.004, g: 0.12, atrito: 1, rot: 0, vrot: 0, ...p });
  acordar();
}

function camada(fn) {
  camadas.add(fn);
  acordar();
}

function quadro(agora) {
  const k = Math.min(3, (agora - ultimo) / 16.67 || 1);
  ultimo = agora;
  ctx.clearRect(0, 0, L, A);

  for (const fn of camadas) if (fn(ctx, agora) === false) camadas.delete(fn);

  for (let i = particulas.length - 1; i >= 0; i--) {
    const p = particulas[i];
    p.vx *= p.atrito ** k;
    p.vy = p.vy * p.atrito ** k + p.g * k;
    p.x += p.vx * k;
    p.y += p.vy * k;
    p.rot += p.vrot * k;
    p.vida -= p.decai * k;
    p.atualizar?.(p, k);
    if (p.vida <= 0 || p.y > A + 120 || p.y < -240 || p.x < -1500 || p.x > L + 600) {
      particulas.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.globalAlpha = Math.min(1, p.vida * 2);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    if (p.emoji) {
      ctx.font = `${p.tam}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",serif`;
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

  if (particulas.length || camadas.size) requestAnimationFrame(quadro);
  else {
    rodando = false;
    ctx.clearRect(0, 0, L, A);
  }
}

// ---------- efeitos básicos ----------
function confete(n = 140, cores = CONFETE, origem = null) {
  for (let i = 0; i < n; i++) {
    adicionar({
      x: origem ? origem.x : rand(0, L),
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

// Emojis subindo do rodapé (com balanço) ou caindo do topo.
function emojis(lista, n, { subindo = false } = {}) {
  const base = lista.length ? lista : ['⭐'];
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const fase = rand(0, 6.28);
      adicionar({
        emoji: base[i % base.length],
        tam: rand(34, 72),
        x: rand(40, L - 40),
        y: subindo ? A + 40 : -50,
        vx: subindo ? 0 : rand(-1.2, 1.2),
        vy: subindo ? rand(-7, -3) : rand(2, 5),
        g: subindo ? -0.01 : 0.03,
        decai: subindo ? 0.0035 : 0.002,
        rot: rand(-0.3, 0.3),
        vrot: rand(-0.03, 0.03),
        atualizar: subindo ? (p, k) => (p.x += Math.sin(p.y * 0.02 + fase) * 1.1 * k) : undefined,
      });
    }, i * 35);
  }
}

// Emojis saindo do centro em todas as direções.
function explodir(lista, n) {
  const base = lista.length ? lista : ['✨'];
  const cx = L / 2;
  const cy = A * 0.45;
  for (let i = 0; i < n; i++) {
    const ang = rand(0, Math.PI * 2);
    const vel = rand(4, 15);
    adicionar({
      emoji: base[i % base.length],
      tam: rand(30, 64),
      x: cx,
      y: cy,
      vx: Math.cos(ang) * vel,
      vy: Math.sin(ang) * vel,
      g: 0.16,
      atrito: 0.975,
      decai: 0.008,
      rot: rand(-0.4, 0.4),
      vrot: rand(-0.08, 0.08),
    });
  }
}

function fogos(rajadas = 6) {
  for (let r = 0; r < rajadas; r++) {
    setTimeout(() => {
      const x = rand(L * 0.15, L * 0.85);
      const y = rand(A * 0.12, A * 0.5);
      const cor = sortear(CONFETE);
      for (let i = 0; i < 80; i++) {
        const ang = (i / 80) * Math.PI * 2;
        const vel = rand(2, 9);
        adicionar({ x, y, vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel, g: 0.09, atrito: 0.965, tam: rand(2, 4), cor, brilho: true, decai: 0.011 });
      }
    }, r * 450);
  }
}

// Bichos e veículos atravessando a tela da direita para a esquerda (a maioria dos emojis olha para a esquerda).
// Devolve quanto tempo (ms) até o último sair da tela.
function correr(a) {
  const lista = a.emoji.length ? a.emoji : ['🐕'];
  const tam = Math.max(90, Math.min(180, A * 0.14));
  const y0 = A * 0.68;
  const vx = lista.length > 1 ? -7 : -8; // px por quadro a 60 fps
  const corredores = Math.min(5, Math.max(1, Math.ceil(a.quantidade / 5)));
  const intervalo = 1100;
  const rastro = a.rastro ?? [];

  for (let c = 0; c < corredores; c++) {
    setTimeout(() => {
      lista.forEach((e, i) => {
        let ultimoRastro = L;
        adicionar({
          emoji: e,
          tam,
          x: L + tam * (1 + i * 1.4),
          y: y0,
          vx,
          vy: 0,
          g: 0,
          decai: 0,
          atualizar: (p) => {
            p.y = y0 + Math.sin(performance.now() * 0.012) * 9; // mesmo balanço para todos os vagões
            if (i === 0 && rastro.length && ultimoRastro - p.x > 90) {
              ultimoRastro = p.x;
              adicionar({ emoji: sortear(rastro), tam: tam * 0.3, x: p.x + tam * 0.5, y: p.y + tam * 0.3, vx: 0, vy: rand(-0.4, 0.2), g: 0.02, decai: 0.014 });
            }
          },
        });
      });
    }, c * intervalo);
  }
  const travessia = (L + tam * (lista.length * 1.4 + 2)) / (Math.abs(vx) * 0.06);
  return travessia + (corredores - 1) * intervalo;
}

// Pistola de dinheiro: notas disparadas do canto inferior esquerdo.
function dinheiro(quantidade) {
  const n = Math.min(160, 60 + quantidade * 6);
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      adicionar({
        emoji: i % 4 === 0 ? '💸' : '💵',
        tam: rand(40, 68),
        x: -30,
        y: A * 0.86,
        vx: rand(9, 24),
        vy: rand(-26, -10),
        g: 0.45,
        rot: rand(-0.5, 0.5),
        vrot: rand(-0.12, 0.12),
        decai: 0.003,
      });
    }, i * 16);
  }
  return n * 16 + 1800;
}

// Galáxia em tela cheia: braços de estrelas girando em volta de um núcleo luminoso.
function galaxia() {
  const duracao = 7000;
  const t0 = performance.now();
  const estrelas = Array.from({ length: 1100 }, () => ({
    r: Math.random() ** 0.6,
    braco: Math.floor(Math.random() * 4),
    desvio: rand(-0.5, 0.5),
    tam: rand(0.8, 2.6),
    tom: Math.random(),
  }));

  camada((c, agora) => {
    const t = agora - t0;
    if (t > duracao) return false;
    const env = Math.max(0, Math.min(1, t / 800, (duracao - t) / 1000));
    const cx = L / 2;
    const cy = A / 2;
    const R = Math.min(L, A) * 0.46;
    const giro = t * 0.00035;

    c.save();
    c.globalAlpha = env * 0.6;
    const vinheta = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(L, A) * 0.7);
    vinheta.addColorStop(0, 'rgba(10, 4, 40, 0.75)');
    vinheta.addColorStop(1, 'rgba(2, 0, 12, 0.2)');
    c.fillStyle = vinheta;
    c.fillRect(0, 0, L, A);

    c.globalCompositeOperation = 'lighter';
    c.globalAlpha = env;
    const nucleo = c.createRadialGradient(cx, cy, 0, cx, cy, R * 0.55);
    nucleo.addColorStop(0, 'rgba(255, 240, 200, 0.95)');
    nucleo.addColorStop(0.25, 'rgba(190, 140, 255, 0.45)');
    nucleo.addColorStop(1, 'rgba(40, 20, 120, 0)');
    c.fillStyle = nucleo;
    c.beginPath();
    c.arc(cx, cy, R * 0.55, 0, Math.PI * 2);
    c.fill();

    for (const e of estrelas) {
      const ang = (e.braco * Math.PI) / 2 + e.r * 5.2 + e.desvio + giro * (1.6 - e.r);
      const raio = e.r * R * 1.6;
      c.fillStyle = `hsl(${240 + e.tom * 80 - (1 - e.r) * 60}, 90%, ${60 + (1 - e.r) * 30}%)`;
      c.beginPath();
      c.arc(cx + Math.cos(ang) * raio, cy + Math.sin(ang) * raio * 0.55, e.tam, 0, Math.PI * 2);
      c.fill();
    }
    c.restore();
    return true;
  });
  return duracao;
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

async function aviso(acao, quem) {
  const el = document.createElement('div');
  el.className = 'aviso';
  if (quem?.avatar) {
    const img = document.createElement('img');
    img.className = 'avatar';
    img.referrerPolicy = 'no-referrer';
    img.alt = '';
    img.src = quem.avatar;
    img.onerror = () => img.remove();
    el.append(img);
  }
  if (acao.imagem) {
    const img = document.createElement('img');
    img.className = 'presente';
    img.referrerPolicy = 'no-referrer';
    img.alt = '';
    img.src = acao.imagem;
    img.onerror = () => img.remove();
    el.append(img);
  } else {
    const i = document.createElement('span');
    i.className = 'icone';
    i.textContent = acao.emoji?.[0] || ICONE_EFEITO[acao.efeito] || '🎁';
    el.append(i);
  }
  const t = document.createElement('span');
  t.textContent = acao.texto;
  el.append(t);
  $('avisos').append(el);
  await dormir(2800);
  el.classList.add('sai');
  await dormir(400);
  el.remove();
}

async function palavrao(texto, ms) {
  const el = document.createElement('div');
  el.className = 'palavrao';
  el.textContent = texto;
  palco.append(el);
  await dormir(ms);
  el.classList.add('sai');
  await dormir(500);
  el.remove();
}

const EFEITOS = {
  async flutuar(a, q) {
    SONS.flutuar();
    emojis(a.emoji, Math.min(40, 4 + a.quantidade * 2), { subindo: true });
    await aviso(a, q);
  },
  async explosao(a, q) {
    SONS.explosao();
    explodir(a.emoji, Math.min(70, 24 + a.quantidade * 2));
    await aviso(a, q);
  },
  async chuva(a, q) {
    SONS.chuva();
    emojis(a.emoji, Math.min(70, 20 + a.quantidade * 3));
    await aviso(a, q);
  },
  async confete(a, q) {
    SONS.confete();
    confete(Math.min(300, 120 + a.quantidade * 6));
    await aviso(a, q);
  },
  async fogos(a, q) {
    SONS.fogos();
    fogos(a.rajadas ?? 6);
    await aviso(a, q);
  },
  async tremor(a, q) {
    SONS.tremor();
    palco.classList.add('tremor');
    setTimeout(() => palco.classList.remove('tremor'), 850);
    await aviso(a, q);
  },
  async correr(a, q) {
    SONS.correr();
    await Promise.all([aviso(a, q), dormir(correr(a))]);
  },
  async dinheiro(a, q) {
    SONS.dinheiro();
    await Promise.all([aviso(a, q), dormir(dinheiro(a.quantidade))]);
  },
  async galaxia(a, q) {
    SONS.galaxia();
    const duracao = galaxia();
    await Promise.all([aviso(a, q), palavrao(a.titulo || 'GALÁXIA', duracao - 1500), dormir(duracao)]);
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
  const area = tela.getBoundingClientRect();
  const origem = { x: caixa.left - area.left + caixa.width / 2, y: caixa.top - area.top + caixa.height * 0.4 };
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

// ---------- urnas: duas máquinas de votação, cada uma com sua caixa e um par de mãos ----------
// Cada voto vira uma sequência na máquina do lado: as mãos digitam o número e apertam VOTAR; só então
// a cédula cai na caixa e o placar muda. As máquinas trabalham em paralelo. Votos em excesso pulam a
// animação, mas cada voto traz o placar do momento, então o número final é sempre o certo.

// Mão direita vista por trás, indicador apontando para cima; a ponta do dedo fica em (60, 8).
const MAO_SVG = `
<svg viewBox="0 0 120 360" aria-hidden="true">
  <path class="manga" d="M28 246 Q64 232 102 246 L108 360 L22 360 Z"/>
  <path class="punho" d="M28 246 Q64 232 102 246 L101 258 Q64 245 29 258 Z"/>
  <path fill="url(#mao-pele)" d="M38 198 L34 250 Q64 240 96 250 L91 198 Z"/>
  <path fill="url(#mao-pele)" d="M32 138 C16 146 10 170 22 186 C30 196 41 190 41 178 C39 166 41 154 45 146 Z"/>
  <path fill="url(#mao-pele)" d="M30 122 C26 152 28 190 38 214 L90 214 C101 190 103 150 97 120 C88 104 40 104 30 122 Z"/>
  <ellipse fill="url(#mao-pele)" cx="78" cy="114" rx="11" ry="10"/>
  <ellipse fill="url(#mao-pele)" cx="90" cy="121" rx="9.5" ry="9.5"/>
  <ellipse fill="url(#mao-pele)" cx="98" cy="133" rx="7.5" ry="8.5"/>
  <path fill="url(#mao-pele)" d="M46 120 C45 90 46 50 48 22 C49 6 71 6 72 22 C74 50 74 90 70 120 Z"/>
  <path class="unha" d="M52 31 C52 16 68 16 68 31 L67 41 C64 45 56 45 53 41 Z"/>
  <path class="brilho-unha" d="M55 24 C56 20 60 19 62 21"/>
  <path class="dobra" d="M50 64 Q60 69 70 64 M49 94 Q60 100 71 94 M70 122 Q78 127 86 124 M84 128 Q91 133 97 131"/>
  <path class="tendao" d="M57 132 L55 198 M70 131 L69 198 M83 134 L82 196"/>
</svg>`;
const DEFS_MAO = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <linearGradient id="mao-pele" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#c98f6b"/><stop offset="0.45" stop-color="#f2c4a2"/><stop offset="1" stop-color="#cf9572"/>
    </linearGradient>
  </defs>
</svg>`;

const estacoes = new Map(); // id do lado -> { el, fila, ocupada }
const exibidos = {}; // votos mostrados em cada máquina
let ultimoPlacar = null;
let votosPorPresente = 0;

function montarUrnas(u) {
  const caixa = $('urnas');
  caixa.innerHTML = DEFS_MAO;
  votosPorPresente = u.votosPorPresente;
  u.lados.forEach((l, i) => {
    const el = document.createElement('div');
    el.className = `estacao ${i === 0 ? 'esq' : 'dir'}`;
    el.style.setProperty('--cor', l.cor);
    el.innerHTML = `
      <header class="estacao-topo"><b class="numero"></b><span class="nome"></span><span class="votos">0</span><span class="pct"></span></header>
      <div class="estacao-corpo">
        <div class="maquina">
          <div class="visor"><span class="digitos">${'<b></b>'.repeat(l.numero.length)}</span><span class="visor-texto"></span></div>
          <div class="teclas">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => `<div class="tecla" data-tecla="${n}">${n}</div>`).join('')}
            <div class="tecla votar" data-tecla="votar">VOTAR</div>
          </div>
        </div>
        <div class="caixa-votos"><div class="pilha"></div></div>
      </div>
      <div class="mao esquerda">${MAO_SVG}</div>
      <div class="mao direita">${MAO_SVG}</div>`;
    el.querySelector('.numero').textContent = l.numero;
    el.querySelector('.nome').textContent = l.nome;
    caixa.append(el);
    estacoes.set(l.id, { el, fila: [], ocupada: false });
  });
  const legenda = document.createElement('p');
  legenda.className = 'urnas-legenda';
  for (const linha of [
    `Digite ${u.lados.map((l) => l.numero).join(' ou ')} no chat: 1 voto grátis por pessoa. Cada presente do lado vale ${u.votosPorPresente} votos.`,
    'Brincadeira de teste. Não é pesquisa eleitoral.',
  ]) {
    const s = document.createElement('span');
    s.textContent = linha;
    legenda.append(s);
  }
  caixa.append(legenda);
  caixa.hidden = false;
  for (const { el } of estacoes.values()) descansarMaos(el);
}

function mostrarPlacar() {
  const total = Object.values(exibidos).reduce((a, b) => a + b, 0);
  const maior = Math.max(30, ...Object.values(exibidos));
  for (const [id, { el }] of estacoes) {
    const votos = exibidos[id] ?? 0;
    const campo = el.querySelector('.votos');
    if (campo.textContent !== String(votos)) {
      campo.textContent = votos;
      campo.classList.remove('pop');
      void campo.offsetWidth; // reinicia a animação
      campo.classList.add('pop');
    }
    el.querySelector('.pct').textContent = total ? `${Math.round((votos / total) * 100)}%` : '';
    el.style.setProperty('--nivel', Math.min(1, votos / maior));
  }
}

function aplicarPlacar(u) {
  for (const l of u.lados) exibidos[l.id] = l.votos;
  mostrarPlacar();
}

function desenharUrnas(u) {
  if (estacoes.size !== u.lados.length) montarUrnas(u);
  ultimoPlacar = u;
  // Enquanto alguma mão está digitando, o placar só muda quando ela aperta VOTAR.
  if (![...estacoes.values()].some((e) => e.ocupada)) aplicarPlacar(u);
}

function posicionar(mao, x, y, largura) {
  mao.style.setProperty('--x', `${x}px`);
  mao.style.setProperty('--y', `${y}px`);
  mao.style.setProperty('--giro', `${(x / largura - 0.5) * 16}deg`);
}

function descansarMaos(el) {
  const l = el.offsetWidth;
  posicionar(el.querySelector('.esquerda'), l * 0.26, el.offsetHeight + 40, l);
  posicionar(el.querySelector('.direita'), l * 0.7, el.offsetHeight + 40, l);
}

async function apertar(el, mao, tecla) {
  posicionar(mao, tecla.offsetLeft + tecla.offsetWidth / 2, tecla.offsetTop + tecla.offsetHeight / 2, el.offsetWidth);
  await dormir(260);
  mao.classList.add('aperta');
  tecla.classList.add('apertada');
  SONS.tecla();
  await dormir(130);
  mao.classList.remove('aperta');
  tecla.classList.remove('apertada');
  await dormir(80);
}

function enfileirarVoto(v) {
  const est = estacoes.get(v.lado);
  if (!est) return;
  est.fila.push(v);
  while (est.fila.length > 4) est.fila.shift();
  if (!est.ocupada) votarNaMaquina(est);
}

async function votarNaMaquina(est) {
  est.ocupada = true;
  const { el } = est;
  const maos = [el.querySelector('.esquerda'), el.querySelector('.direita')];
  const slots = [...el.querySelectorAll('.digitos b')];
  const texto = el.querySelector('.visor-texto');
  while (est.fila.length) {
    const v = est.fila.shift();
    const lado = v.placar.lados.find((l) => l.id === v.lado);
    slots.forEach((s) => (s.textContent = ''));
    texto.textContent = v.nome;
    el.classList.remove('confirmado');
    for (const [i, d] of [...lado.numero].entries()) {
      const tecla = el.querySelector(`[data-tecla="${d}"]`);
      if (!tecla) continue;
      await apertar(el, maos[i % 2], tecla);
      if (slots[i]) slots[i].textContent = d;
    }
    texto.textContent = lado.nome;
    await dormir(200);
    await apertar(el, maos[1], el.querySelector('[data-tecla="votar"]'));
    SONS.votar();
    el.classList.add('confirmado');
    texto.textContent = `✓ +${v.votos} ${v.nome}`;
    exibidos[v.lado] = lado.votos;
    mostrarPlacar();
    soltarCedula(el, v);
    await dormir(420);
    descansarMaos(el);
  }
  est.ocupada = false;
  if (ultimoPlacar && ![...estacoes.values()].some((e) => e.ocupada)) aplicarPlacar(ultimoPlacar);
}

// A cédula entra pela fenda e cai até o topo da pilha; presentes mostram também o "+N".
function soltarCedula(el, v) {
  const caixa = el.querySelector('.caixa-votos');
  const cedula = document.createElement('div');
  cedula.className = 'cedula';
  caixa.append(cedula);
  setTimeout(() => cedula.remove(), 900);
  if (v.origem === 'presente') {
    const mais = document.createElement('div');
    mais.className = 'mais';
    mais.textContent = `+${v.votos}`;
    caixa.append(mais);
    setTimeout(() => mais.remove(), 1100);
  }
}

// ---------- WebSocket ----------
function conectar() {
  const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`);
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.tipo === 'estado') desenharEstado(msg);
    else if (msg.tipo === 'urnas') desenharUrnas(msg);
    else if (msg.tipo === 'voto') {
      if (msg.ok) enfileirarVoto(msg);
    } else if (msg.acoes) enfileirar(msg.acoes, { avatar: msg.avatar });
  };
  ws.onclose = () => setTimeout(conectar, 2000);
}
conectar();
