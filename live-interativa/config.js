// Regras da live. Edite à vontade: o servidor lê este arquivo ao iniciar.
//
// Como um presente vira ação:
//   1) se o nome do presente estiver em `presentes`, usa essa regra;
//   2) senão, usa a maior faixa de `faixas` cujo `min` (em diamantes) o presente alcança.
// Valor = diamantes do presente x quantidade da sequência.
//
// Efeitos disponíveis: confete, coracoes, fogos, chuva, tremor, bau
// ({nome} no texto é trocado pelo apelido de quem mandou).

export default {
  titulo: 'LIVE INTERATIVA',

  // Barra de meta: soma os diamantes recebidos. Ao bater, dispara um bau lendário
  // e a próxima meta fica `multiplicador` vezes maior.
  meta: {
    texto: 'Meta da live',
    alvo: 200,
    multiplicador: 1.5,
  },

  presentes: {
    'rose':        { efeito: 'coracoes', texto: '{nome} mandou uma Rosa!' },
    'tiktok':      { efeito: 'confete',  texto: '{nome} mandou um TikTok!' },
    'finger heart': { efeito: 'coracoes', texto: '{nome} fez coraçãozinho!' },
    'gg':          { efeito: 'tremor',   texto: 'GG, {nome}!' },
    'doughnut':    { efeito: 'chuva', emoji: ['🍩', '🍩', '🍪'], texto: '{nome} chuveirou rosquinhas!' },
    'hand hearts': { efeito: 'chuva', emoji: ['💖', '💗', '💞'], texto: '{nome} espalhou amor!' },
  },

  faixas: [
    { min: 1,    efeito: 'confete', texto: 'Valeu, {nome}!' },
    { min: 20,   efeito: 'fogos',   texto: '{nome} acendeu os fogos!' },
    { min: 99,   efeito: 'bau', raridade: 'comum',     texto: '{nome} abriu um baú!' },
    { min: 250,  efeito: 'bau', raridade: 'raro',      texto: '{nome} abriu um baú raro!' },
    { min: 500,  efeito: 'bau', raridade: 'epico',     texto: '{nome} abriu um baú ÉPICO!' },
    { min: 1500, efeito: 'bau', raridade: 'lendario',  texto: '{nome} abriu o baú LENDÁRIO!' },
  ],

  // O que acontece na live quando o baú abre. Troque pelos seus desafios.
  premios: {
    comum: [
      'Dar um salve para quem mandou o baú',
      'Fazer 10 agachamentos',
      'Beber um copo de água ao vivo',
      'Falar a próxima frase com voz de robô',
      'Mostrar o que tem em cima da mesa',
    ],
    raro: [
      'Cantar um trecho de música escolhida no chat',
      'Responder 3 perguntas do chat sem pensar',
      'Trocar de filtro e ficar 5 minutos com ele',
    ],
    epico: [
      'O chat escolhe a próxima música/assunto da live',
      'Dançar por 30 segundos',
      'Fazer um desafio proposto por quem mandou o baú',
    ],
    lendario: [
      'Shoutout dedicado no perfil e live de 1 hora só sobre o que o doador pedir',
      'Quem mandou escolhe o tema da próxima live',
    ],
  },

  // Seguidor novo e compartilhamento também reagem (sem custo para ninguém).
  extras: {
    seguidor: { efeito: 'confete', texto: '{nome} começou a seguir!' },
    compartilhou: { efeito: 'coracoes', texto: '{nome} compartilhou a live!' },
  },
};
