# Live interativa (TikTok)

Overlay para OBS em que **presentes reais** dos seus seguidores disparam efeitos na tela: confete, fogos, chuva de emojis,
tremor de tela e **baú de prêmios** (o prêmio é um desafio ou brinde seu, sorteado da lista do `config.js`).
Tem barra de meta, ranking dos 3 maiores doadores e reações a novo seguidor e compartilhamento.

O programa só **lê** os eventos da live (via [tiktok-live-connector](https://github.com/zerodytrash/TikTok-Live-Connector),
biblioteca não oficial). Ele não envia presentes nem moedas e não pede login do TikTok.

## Como usar

Precisa de Node 20 ou mais novo.

```bash
cd live-interativa
npm install
npm start
```

1. Abra `http://localhost:3000`, digite seu @ do TikTok (você precisa estar ao vivo) e clique em **Conectar**.
   Também dá para iniciar já conectado: `TIKTOK_USER=seuusuario npm start`.
2. No OBS, adicione uma **Fonte de navegador** com a URL `http://localhost:3000/overlay`, 1920x1080. O fundo é transparente.
   Para ver no navegador comum, use `http://localhost:3000/overlay?fundo=1`.
3. Sem estar ao vivo, use os botões de **simulação** do painel para testar efeitos e regras.
4. Para ver tudo numa página só (overlay e botões), abra `http://localhost:3000/demo`. Ela roda as mesmas regras
   (`regras.js` e `config.js`) dentro do navegador e não se conecta ao TikTok.

## Presentes e efeitos

Cada presente do `catalogo.js` (de Rosa, 1 moeda, até a Galáxia, 1000 moedas) tem animação própria:

| Efeito | Presentes |
|---|---|
| Sobe flutuando | Rosa, TikTok, Sorvete, Heart Me, Coração com os dedos, Tsuru |
| Explosão | Perfume, Chapéu e Bigode |
| Chuva | Rosquinha, Coroinha, Mãos em coração |
| Tela treme | GG |
| Confete | Confete |
| Atravessa a tela | Corgi (deixa ossinhos), Cisne, Trem com vagões |
| Chuva de notas | Pistola de dinheiro |
| Galáxia em tela cheia | Galáxia |

- Sequências (x5, x30...) deixam o efeito maior e mostram o combo no aviso.
- Presente que **não está na lista** (o TikTok muda o catálogo) cai em `porValor` do `config.js`, então qualquer presente reage.
- O valor total do envio pode abrir um baú extra (`baus`): 299 raro, 500 épico, 1000 lendário.
- Os valores do catálogo são de referência (usados nos botões de teste). Ao vivo, vale o valor que o TikTok manda no evento.

## Regras (`config.js`)

- `porValor`: efeito pelo valor de um presente que não está no catálogo.
- `baus` e `premios`: quando o baú abre e o que acontece. Troque pelos seus desafios.
- `meta`: alvo em diamantes; ao bater, abre um baú lendário e a próxima meta cresce.

Presentes em sequência (como Rosas repetidas) são contados quando a sequência termina.

## Observações

- O servidor escuta só em `127.0.0.1` e recusa conexões WebSocket de páginas de outros sites.
- A biblioteca usa um serviço de assinatura de terceiros (Euler Stream). Se aparecer limite de requisições,
  crie uma chave e rode com `EULER_API_KEY=... npm start`.
- Por ser engenharia reversa, o TikTok pode mudar algo e quebrar a conexão; atualize o pacote se isso acontecer.
