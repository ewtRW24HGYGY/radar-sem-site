// Cloudflare Pages Function: POST /api/mensagem
// Gera uma mensagem curta de WhatsApp em pt-BR para um comércio, usando Workers AI.
const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  // Só aceita chamadas feitas pelo próprio site.
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ erro: 'Origem não permitida.' }, 403);

  if (!env.AI) return json({ erro: 'IA ainda não configurada neste site.' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ erro: 'Pedido inválido.' }, 400); }

  const nome = clean(body.nome, 80);
  if (!nome) return json({ erro: 'Informe o nome do comércio.' }, 400);
  const tipo = clean(body.tipo, 40);
  const local = clean(body.local, 60);
  const endereco = clean(body.endereco, 100);
  const remetente = clean(body.remetente, 60);
  const oferta = clean(body.oferta, 160);
  const tom = ['amigavel', 'direto', 'formal'].includes(body.tom) ? body.tom : 'amigavel';
  const variacao = Math.floor(Math.random() * 1000);

  const tomTxt = {
    amigavel: 'caloroso e simpático, como uma conversa entre vizinhos',
    direto: 'direto e objetivo, sem rodeios',
    formal: 'educado e profissional, sem gírias',
  }[tom];

  // Ideia concreta de site, de acordo com o tipo de comércio.
  const t = (tipo + ' ' + nome).toLowerCase();
  const ideia =
    /restaurante|lanchonete|bar\b|caf[eé]|padaria|pizz|churras|sorvet|confeit|doce|hamb|a[cç]ougue/.test(t) ? 'um cardápio online com pedidos direto pelo WhatsApp'
    : /cabeleir|sal[aã]o|beleza|manicure|barbear|est[eé]tica|cosm/.test(t) ? 'uma página com fotos dos trabalhos e agendamento pelo WhatsApp'
    : /pet|veterin|banho e tosa/.test(t) ? 'uma página com serviços, fotos e agendamento de banho e consulta pelo WhatsApp'
    : /academia|esporte|pilates|dan[cç]a|fitness/.test(t) ? 'uma página com horários, planos e aula experimental pelo WhatsApp'
    : /farm[aá]cia|cl[ií]nica|dentist|consult[oó]rio|m[eé]dic|[oó]tica/.test(t) ? 'uma página com endereço, horários e agendamento pelo WhatsApp'
    : /oficina|auto|pneu|moto|ve[ií]culo|lava/.test(t) ? 'uma página com serviços e pedido de orçamento pelo WhatsApp'
    : /roupa|boutique|cal[cç]ado|joia|bolsa|acess[oó]rio|moda|floricult|presente/.test(t) ? 'uma vitrine online com os produtos e contato pelo WhatsApp'
    : 'uma página simples para aparecer no Google quando alguém buscar o nome e o bairro';

  const quemSou = remetente ? `Me chamo ${remetente} e sou desenvolvedor de sites` : 'Sou desenvolvedor de sites';

  const system =
    'Você escreve mensagens curtas de primeiro contato por WhatsApp, em português do Brasil, de um desenvolvedor de sites para o dono de um pequeno comércio. ' +
    'Regras obrigatórias: ' +
    '1) Comece apenas com uma saudação curta como "Oi, tudo bem?" ou "Olá, tudo bem?". NUNCA coloque o nome do comércio logo depois da saudação. ' +
    '2) Na frase seguinte, apresente-se dizendo que é desenvolvedor de sites. Não invente nome de empresa. ' +
    '3) Cite o nome do comércio no meio de uma frase, junto com o bairro, dizendo que o viu por ali ou procurou por ele e não achou um site. ' +
    '4) Proponha UMA ideia concreta e específica para esse tipo de comércio, usando a ideia fornecida. ' +
    '5) Escreva com naturalidade, como uma pessoa real, sem clichês como "sem compromisso", "oportunidade única" ou "tudo de bom". Não use "por ali", "Você precisa disso?" nem emojis de celular. ' +
    '6) No máximo 60 palavras, no máximo 1 emoji, sem hashtags, sem promessa de resultado. ' +
    '7) Não invente fatos sobre o comércio além dos dados fornecidos. ' +
    '8) A última frase deve ser exatamente: "Posso enviar uma demonstração personalizada?" e não pode haver outra pergunta antes dela, então escreva o resto como afirmação. ' +
    'Responda somente com o texto da mensagem, sem aspas e sem explicações.';

  const user =
    `Dados do comércio:\n- Nome: ${nome}\n- Tipo: ${tipo || 'não informado'}\n- Bairro/cidade: ${local || 'não informado'}\n` +
    (endereco ? `- Endereço: ${endereco}\n` : '') +
    `\nApresentação do remetente: ${quemSou}.\n` +
    `Ideia concreta para este comércio: ${oferta || ideia}.\n` +
    `Tom: ${tomTxt}.\nVariação: ${variacao}`;

  try {
    const out = await env.AI.run(MODEL, {
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      max_tokens: 200,
      temperature: 0.8,
    });
    let texto = String((out && (out.response || out.result || '')) || '').trim();
    texto = texto.replace(/^["“”']+|["“”']+$/g, '').trim();
    // Garante o fechamento pedido, mesmo se o modelo variar.
    const FECHO = 'Posso enviar uma demonstração personalizada?';
    if (!texto.toLowerCase().includes('demonstração personalizada')) {
      texto = texto.replace(/\s*[?]\s*$/, '.').trim() + ' ' + FECHO;
    }
    if (!texto) return json({ erro: 'A IA não retornou texto. Tente de novo.' }, 502);
    return json({ texto });
  } catch (e) {
    return json({ erro: 'Não foi possível gerar agora. Tente de novo em instantes.' }, 502);
  }
}

export async function onRequest({ request }) {
  return json({ erro: 'Use POST.' }, request.method === 'POST' ? 200 : 405);
}
