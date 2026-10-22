// Regras da live. Edite à vontade: o servidor lê este arquivo ao iniciar.
//
// Como um presente vira ação:
//   1) se o nome do presente estiver no `catalogo` (catalogo.js), usa o efeito dele;
//   2) senão, usa a maior faixa de `porValor` que o valor de UM presente alcança.
// Além do efeito, o valor total do envio (moedas x quantidade da sequência) pode abrir um baú (`baus`).
//
// Efeitos: flutuar, explosao, chuva, confete, fogos, tremor, correr, dinheiro, galaxia
// ({nome} nos textos é trocado pelo apelido de quem mandou).

import catalogo from './catalogo.js';

export default {
  titulo: 'LIVE INTERATIVA',
  catalogo,

  // Barra de meta: soma as moedas recebidas. Ao bater, abre um baú lendário
  // e a próxima meta fica `multiplicador` vezes maior.
  meta: {
    texto: 'Meta da live',
    alvo: 500,
    multiplicador: 1.5,
  },

  // Presente que não está no catálogo: efeito pelo valor de um presente.
  porValor: [
    { min: 1, efeito: 'flutuar', emoji: ['❤️', '💕'] },
    { min: 10, efeito: 'explosao', emoji: ['✨', '🌟'] },
    { min: 30, efeito: 'chuva', emoji: ['⭐', '🌟'] },
    { min: 99, efeito: 'confete', emoji: [] },
    { min: 200, efeito: 'fogos', rajadas: 6 },
    { min: 500, efeito: 'fogos', rajadas: 12 },
    { min: 1000, efeito: 'galaxia', emoji: ['🌌'] },
  ],

  // Baú extra pelo valor total do envio (ex.: 10 Corgis = 2990 moedas).
  baus: [
    { min: 299, raridade: 'raro', texto: '{nome} abriu um baú raro!' },
    { min: 500, raridade: 'epico', texto: '{nome} abriu um baú ÉPICO!' },
    { min: 1000, raridade: 'lendario', texto: '{nome} abriu o baú LENDÁRIO!' },
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

  // Duas urnas: o público vota digitando o número no chat (1 voto grátis por pessoa) ou mandando o
  // presente do lado (cada presente vale `votosPorPresente`, sem limite).
  //   aoVivo: false -> só os botões de teste (simulação) votam; chat e presentes de uma live
  //                    real são ignorados pelas urnas. Troque para true só se for usar de verdade.
  // Não achei "rosa branca" na lista de presentes do TikTok: o lado branco aceita um presente com
  // esse nome, caso exista, e o Tsuru (origami branco). Ajuste `presentes` como quiser.
  urnas: {
    aoVivo: false,
    votosPorPresente: 5,
    lados: [
      { id: 'branca', nome: 'Rosa Branca', numero: '22', cor: '#f1f1f6', presentes: ['White Rose', 'Rosa Branca', 'Paper Crane'] },
      { id: 'vermelha', nome: 'Rosa Vermelha', numero: '13', cor: '#ff2d55', presentes: ['Rose', 'Rosa', 'Red Rose', 'Rosa Vermelha'] },
    ],
  },

  // Seguidor novo e compartilhamento também reagem (sem custo para ninguém).
  extras: {
    seguidor: { efeito: 'confete', emoji: [], texto: '{nome} começou a seguir!' },
    compartilhou: { efeito: 'flutuar', emoji: ['💖', '🔁'], texto: '{nome} compartilhou a live!' },
  },
};
