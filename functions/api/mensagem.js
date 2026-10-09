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

  const system =
    'Você escreve mensagens curtas de primeiro contato por WhatsApp, em português do Brasil, para donos de pequenos comércios. ' +
    'Regras: no máximo 55 palavras; no máximo 1 emoji; sem hashtags; sem promessas de resultado garantido; ' +
    'não invente fatos sobre o comércio além dos dados fornecidos; cumprimente pelo nome do comércio; ' +
    'diga que não encontrou um site e pergunte se pode mostrar uma ideia sem compromisso; ' +
    'termine com uma pergunta simples. Responda somente com o texto da mensagem, sem aspas e sem explicações.';

  const user =
    `Dados do comércio:\n- Nome: ${nome}\n- Tipo: ${tipo || 'não informado'}\n- Bairro/cidade: ${local || 'não informado'}\n` +
    (endereco ? `- Endereço: ${endereco}\n` : '') +
    `\nQuem escreve: ${remetente || 'um profissional que faz sites para comércios locais'}\n` +
    (oferta ? `O que oferece: ${oferta}\n` : 'O que oferece: criação de site simples para o comércio aparecer no Google e receber pedidos.\n') +
    `Tom: ${tomTxt}.\nVariação: ${variacao}`;

  try {
    const out = await env.AI.run(MODEL, {
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      max_tokens: 200,
      temperature: 0.8,
    });
    let texto = String((out && (out.response || out.result || '')) || '').trim();
    texto = texto.replace(/^["“”']+|["“”']+$/g, '').trim();
    if (!texto) return json({ erro: 'A IA não retornou texto. Tente de novo.' }, 502);
    return json({ texto });
  } catch (e) {
    return json({ erro: 'Não foi possível gerar agora. Tente de novo em instantes.' }, 502);
  }
}

export async function onRequest({ request }) {
  return json({ erro: 'Use POST.' }, request.method === 'POST' ? 200 : 405);
}
