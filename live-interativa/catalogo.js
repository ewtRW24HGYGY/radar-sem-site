// Presentes do TikTok até a Galáxia (1000 moedas), do mais barato ao mais caro.
//
// `moedas` é só valor de referência (usado nos botões de teste). Numa live de verdade o valor vem do
// próprio evento do TikTok, então preço mudado pela plataforma não quebra nada. Presente que não
// estiver aqui cai na regra por valor (`porValor` em config.js), logo todo presente reage.
//
// efeito: flutuar | explosao | chuva | confete | fogos | tremor | correr | dinheiro | galaxia
// emoji:  desenhos usados pelo efeito; rastro: o que fica pelo caminho (efeito correr).
// nomes:  como o presente pode chegar do TikTok (minúsculas, sem acento), além de `nome` e `pt`.

export default [
  { nome: 'Rose', pt: 'Rosa', moedas: 1, efeito: 'flutuar', emoji: ['🌹'], nomes: ['rosa'] },
  { nome: 'TikTok', pt: 'TikTok', moedas: 1, efeito: 'flutuar', emoji: ['🎵', '🎶'] },
  { nome: 'GG', pt: 'GG', moedas: 1, efeito: 'tremor', emoji: ['🎮'] },
  { nome: 'Ice Cream Cone', pt: 'Sorvete', moedas: 1, efeito: 'flutuar', emoji: ['🍦'], nomes: ['sorvete'] },
  { nome: 'Heart Me', pt: 'Heart Me', moedas: 1, efeito: 'flutuar', emoji: ['💗', '💕'] },
  { nome: 'Finger Heart', pt: 'Coração com os dedos', moedas: 5, efeito: 'flutuar', emoji: ['❤️', '💖'], nomes: ['coracao com os dedos'] },
  { nome: 'Perfume', pt: 'Perfume', moedas: 20, efeito: 'explosao', emoji: ['🌸', '💐', '✨'] },
  { nome: 'Doughnut', pt: 'Rosquinha', moedas: 30, efeito: 'chuva', emoji: ['🍩'], nomes: ['donut', 'rosquinha'] },
  { nome: 'Paper Crane', pt: 'Tsuru', moedas: 99, efeito: 'flutuar', emoji: ['🕊️', '✨'], nomes: ['tsuru'] },
  { nome: 'Little Crown', pt: 'Coroinha', moedas: 99, efeito: 'chuva', emoji: ['👑'], nomes: ['coroinha'] },
  { nome: 'Hat and Mustache', pt: 'Chapéu e Bigode', moedas: 99, efeito: 'explosao', emoji: ['🎩', '🥸'], nomes: ['chapeu e bigode'] },
  { nome: 'Confetti', pt: 'Confete', moedas: 100, efeito: 'confete', emoji: [], nomes: ['confete'] },
  { nome: 'Hand Hearts', pt: 'Mãos em coração', moedas: 100, efeito: 'chuva', emoji: ['💖', '💗', '💞'], nomes: ['maos em coracao'] },
  { nome: 'Corgi', pt: 'Corgi', moedas: 299, efeito: 'correr', emoji: ['🐕'], rastro: ['🦴'] },
  { nome: 'Money Gun', pt: 'Pistola de dinheiro', moedas: 500, efeito: 'dinheiro', emoji: ['💵', '💸'], nomes: ['pistola de dinheiro'] },
  { nome: 'Swan', pt: 'Cisne', moedas: 699, efeito: 'correr', emoji: ['🦢'], rastro: ['✨'], nomes: ['cisne'] },
  { nome: 'Train', pt: 'Trem', moedas: 899, efeito: 'correr', emoji: ['🚂', '🚃', '🚃', '🚃'], nomes: ['trem'] },
  { nome: 'Galaxy', pt: 'Galáxia', moedas: 1000, efeito: 'galaxia', emoji: ['🌌'], nomes: ['galaxia'] },
];
