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

## Regras (`config.js`)

- `presentes`: efeito por nome do presente (ex.: `rose`, `doughnut`).
- `faixas`: efeito pelo valor em diamantes (1 confete, 20 fogos, 99+ baú comum, 250 raro, 500 épico, 1500 lendário).
- `premios`: o que acontece quando cada tipo de baú abre. Troque pelos seus desafios.
- `meta`: alvo em diamantes; ao bater, abre um baú lendário e a próxima meta cresce.

Presentes em sequência (como Rosas repetidas) são contados quando a sequência termina.

## Observações

- O servidor escuta só em `127.0.0.1` e recusa conexões WebSocket de páginas de outros sites.
- A biblioteca usa um serviço de assinatura de terceiros (Euler Stream). Se aparecer limite de requisições,
  crie uma chave e rode com `EULER_API_KEY=... npm start`.
- Por ser engenharia reversa, o TikTok pode mudar algo e quebrar a conexão; atualize o pacote se isso acontecer.
