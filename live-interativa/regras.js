// Regras da live (sem rede, sem Node): transforma presentes em ações e mantém meta e ranking.
// Usado pelo servidor (server.js) e pela página de demonstração (public/demo.html).

const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)];
const preencher = (texto, nome) => String(texto || '').replaceAll('{nome}', nome);
const normalizar = (t) =>
  String(t || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export function criarMotor(config, transmitir) {
  // Nome do presente (em inglês, português ou apelido) -> item do catálogo.
  const indice = new Map();
  for (const item of config.catalogo) {
    for (const n of [item.nome, item.pt, ...(item.nomes ?? [])]) indice.set(normalizar(n), item);
  }

  // ---------- urnas ----------
  const cfgUrnas = config.urnas;
  const urnas = {
    votos: new Map((cfgUrnas?.lados ?? []).map((l) => [l.id, { gratis: 0, presente: 0 }])),
    votantes: new Map(), // quem já usou o voto grátis -> lado
  };
  const presentesDoLado = new Map(); // nome normalizado -> lado
  for (const lado of cfgUrnas?.lados ?? []) {
    for (const n of lado.presentes ?? []) presentesDoLado.set(normalizar(n), lado);
  }
  // Eventos de uma live real só contam se `aoVivo` estiver ligado; os de teste sempre contam.
  const contaVoto = (origem) => cfgUrnas && (origem === 'teste' || cfgUrnas.aoVivo);

  function snapshotUrnas() {
    return {
      tipo: 'urnas',
      aoVivo: Boolean(cfgUrnas?.aoVivo),
      votosPorPresente: cfgUrnas?.votosPorPresente ?? 0,
      lados: (cfgUrnas?.lados ?? []).map((l) => {
        const v = urnas.votos.get(l.id);
        return { id: l.id, nome: l.nome, numero: l.numero, cor: l.cor, presente: l.presentes?.[0] ?? '', gratis: v.gratis, pagos: v.presente, votos: v.gratis + v.presente };
      }),
    };
  }

  // Comentário do chat: só vale se for exatamente o número de uma urna, e só uma vez por pessoa.
  function processarChat({ id, nome, comentario }, origem = 'real') {
    if (!contaVoto(origem)) return;
    const lado = cfgUrnas.lados.find((l) => l.numero === String(comentario ?? '').trim());
    if (!lado) return;
    if (urnas.votantes.has(id)) {
      transmitir({ tipo: 'voto', ok: false, motivo: 'ja-votou', nome, lado: urnas.votantes.get(id) });
      return;
    }
    urnas.votantes.set(id, lado.id);
    urnas.votos.get(lado.id).gratis += 1;
    transmitir({ tipo: 'voto', ok: true, origem: 'chat', lado: lado.id, nome, votos: 1 });
    transmitir(snapshotUrnas());
  }

  function votarComPresente({ nome, presente, quantidade }, origem) {
    if (!contaVoto(origem)) return;
    const lado = presentesDoLado.get(normalizar(presente));
    if (!lado) return;
    const votos = cfgUrnas.votosPorPresente * Math.max(1, quantidade || 1);
    urnas.votos.get(lado.id).presente += votos;
    transmitir({ tipo: 'voto', ok: true, origem: 'presente', lado: lado.id, nome, votos });
    transmitir(snapshotUrnas());
  }

  function zerarUrnas() {
    for (const v of urnas.votos.values()) {
      v.gratis = 0;
      v.presente = 0;
    }
    urnas.votantes.clear();
    transmitir(snapshotUrnas());
  }

  const estado = {
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

  // Um envio vira uma lista de ações: o efeito do presente e, se o valor total pedir, um baú.
  function decidirAcoes({ nome, presente, imagem, diamantes, quantidade }) {
    const qtd = Math.max(1, quantidade || 1);
    const unitario = Math.max(1, Math.round(diamantes / qtd));
    const item = indice.get(normalizar(presente));
    const regra = item ?? [...config.porValor].reverse().find((f) => unitario >= f.min) ?? config.porValor[0];
    const rotulo = item?.pt ?? presente;

    const acoes = [
      {
        efeito: regra.efeito,
        emoji: regra.emoji ?? [],
        rastro: regra.rastro ?? [],
        rajadas: regra.rajadas,
        quantidade: qtd,
        imagem,
        titulo: rotulo.toUpperCase(),
        texto: `${nome} mandou ${rotulo}${qtd > 1 ? ` x${qtd}` : ''}!`,
      },
    ];

    const bau = [...config.baus].reverse().find((b) => diamantes >= b.min);
    if (bau) {
      acoes.push({
        efeito: 'bau',
        raridade: bau.raridade,
        texto: preencher(bau.texto, nome),
        premio: sortear(config.premios[bau.raridade] ?? config.premios.comum),
      });
    }
    return acoes;
  }

  function processarPresente({ nome, avatar, presente, imagem, diamantes, quantidade }, origem = 'real') {
    estado.total += diamantes;
    estado.ranking.set(nome, (estado.ranking.get(nome) || 0) + diamantes);

    const acoes = decidirAcoes({ nome, presente, imagem, diamantes, quantidade });

    // Meta batida (um presente grande pode bater mais de uma, mas vira um único baú).
    let batidas = 0;
    while (estado.total >= estado.metaAtual) {
      estado.total -= estado.metaAtual;
      estado.metasBatidas += 1;
      estado.metaAtual = Math.round(estado.metaAtual * config.meta.multiplicador);
      batidas += 1;
    }
    if (batidas) {
      acoes.push({
        efeito: 'bau',
        raridade: 'lendario',
        texto: batidas > 1 ? `META BATIDA x${batidas}! Obrigado, chat!` : 'META BATIDA! Obrigado, chat!',
        premio: sortear(config.premios.lendario),
        meta: true,
      });
    }

    transmitir({ tipo: 'presente', nome, avatar, presente, imagem, diamantes, quantidade, acoes });
    votarComPresente({ nome, presente, quantidade }, origem);
    transmitir({ tipo: 'estado', ...snapshot() });
  }

  function processarExtra(tipo, nome, avatar) {
    const regra = config.extras[tipo];
    if (!regra) return;
    transmitir({ tipo, nome, avatar, acoes: [{ efeito: regra.efeito, emoji: regra.emoji ?? [], quantidade: 1, texto: preencher(regra.texto, nome) }] });
  }

  function zerar() {
    estado.total = 0;
    estado.metaAtual = config.meta.alvo;
    estado.metasBatidas = 0;
    estado.ranking.clear();
    transmitir({ tipo: 'estado', ...snapshot() });
  }

  // Dispara eventos de mentira para testar sem estar ao vivo.
  function simular(msg) {
    const nome = String(msg.nome || 'Visitante').slice(0, 30);
    if (msg.evento === 'presente') {
      const diamantes = Math.max(1, Math.min(Number(msg.diamantes) || 1, 100000));
      const quantidade = Math.max(1, Math.min(Number(msg.quantidade) || 1, 999));
      processarPresente({
        nome,
        avatar: '',
        presente: String(msg.presente || 'Presente').slice(0, 40),
        imagem: '',
        diamantes: diamantes * quantidade,
        quantidade,
      }, 'teste');
    } else if (msg.evento === 'chat') {
      // O "id" do votante simulado é o nome: mandar de novo com o mesmo nome testa o limite de 1 voto.
      processarChat({ id: `teste:${nome}`, nome, comentario: String(msg.comentario ?? '').slice(0, 200) }, 'teste');
    } else if (msg.evento === 'seguidor' || msg.evento === 'compartilhou') {
      processarExtra(msg.evento, nome, '');
    }
  }

  return { snapshot, snapshotUrnas, processarPresente, processarChat, processarExtra, zerar, zerarUrnas, simular };
}
