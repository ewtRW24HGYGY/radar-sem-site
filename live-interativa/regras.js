// Regras da live (sem rede, sem Node): transforma presentes em ações e mantém meta e ranking.
// Usado pelo servidor (server.js) e pela página de demonstração (demo/).

const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)];
const preencher = (texto, nome) => String(texto || '').replaceAll('{nome}', nome);

export function criarMotor(config, transmitir) {
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

  function decidirAcao({ nome, presente, diamantes }) {
    let regra = config.presentes[presente.toLowerCase()];
    if (!regra) {
      const valor = Math.max(diamantes, 1);
      regra = [...config.faixas].reverse().find((f) => valor >= f.min) ?? config.faixas[0];
    }
    const acao = { efeito: regra.efeito, texto: preencher(regra.texto, nome), emoji: regra.emoji };
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
        texto: 'META BATIDA! Obrigado, chat!',
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
      processarPresente({
        nome,
        avatar: '',
        presente: String(msg.presente || 'Presente').slice(0, 40),
        imagem: '',
        diamantes,
        quantidade: 1,
      });
    } else if (msg.evento === 'seguidor' || msg.evento === 'compartilhou') {
      processarExtra(msg.evento, nome, '');
    }
  }

  return { snapshot, processarPresente, processarExtra, zerar, simular };
}
