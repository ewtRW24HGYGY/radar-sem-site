# Topspin — simulador de tênis de mesa 3D

Jogo de tênis de mesa para navegador com física simulada em tempo real (Three.js + WebGL), sem build e sem dependências externas em tempo de execução (o Three.js r170 está em `vendor/`).

**Jogar:** sirva a pasta como site estático e abra `pingpong/index.html` (ex.: `python3 -m http.server` na raiz do repositório e acesse `http://localhost:8000/pingpong/`). Abrir o arquivo direto (`file://`) não funciona porque o navegador bloqueia módulos ES.

## O que tem

- **Física (1000 Hz, passo fixo):** gravidade com empuxo, arrasto quadrático, efeito Magnus com coeficiente de sustentação dependente do spin, rotação nos 3 eixos com decaimento aerodinâmico, impactos por impulso com restituição dependente da velocidade e atrito de Coulomb acoplado à rotação (casca esférica fina). Mesa, bordas, laterais, rede (malha macia, fita, postes), chão e barreiras. Detecção contínua (sub-passos de 5 mm e varredura no referencial da raquete) — sem atravessamentos até 50 m/s. Resultado idêntico em qualquer taxa de quadros.
- **Raquete:** corpo cinemático; a velocidade da sua mão é a velocidade da raquete no contato. Botões mudam o ângulo da face e a escovada (topspin, corte, lateral). Limites físicos de velocidade linear e angular do braço/pulso.
- **Assistência (opcional):** altura automática e ângulo da face calculados com a mesma física da bola; no saque, o golpe iniciado pelo jogador é executado pelo "braço" com um plano válido. Pode ser desligada.
- **IA:** prevê a trajetória com a física, escolhe ponto de contato alcançável, golpe (loop, drive, bloqueio, corte, smash, saques curtos/longos/laterais) e alvo, e inverte o modelo de impacto para obter ângulo e velocidade da raquete. Erros humanos por nível (tempo de reação, deslocamento, ângulo, velocidade, tempo, leitura errada do efeito). Adapta-se ao seu estilo (mira na zona em que você mais erra, responde ao seu tipo de efeito e distância da mesa).
- **Regras oficiais:** sets até 11 com vantagem de 2, saque alternado a cada 2 pontos (a cada ponto a partir de 10–10), saque com quique do próprio lado, let, dois quiques, obstrução, toque duplo, bola parada.
- **Modos:** partida contra IA (melhor de 3), modo profissional (melhor de 5, lançamento do saque obrigatório), 2 jogadores (mouse + teclado, ou tela dividida no celular), treino livre com robô configurável, desafio de precisão (alvos) e rally infinito.
- **Câmeras:** 1ª pessoa, 3ª pessoa, lateral (transmissão) e dinâmica — todas com amortecimento crítico, sem cortes.
- **Visual:** mesa com dimensões oficiais e linhas, rede com malha que balança ao ser atingida, raquete com madeira em camadas e borrachas, bola com rotação visível, sombras suaves + sombra de contato, reflexos de ambiente, oclusão ambiental (GTAO) na qualidade alta, ginásio com piso de quadra, barreiras, arquibancada e placar do árbitro.
- **Áudio:** sintetizado (Web Audio): raquete, mesa, rede, chão, barreiras, variando com a intensidade e com o atrito do golpe; ambiente de ginásio com reverberação, público e aplausos.

## Controles

O padrão é o **controle fácil**: você só move a raquete para os lados (mouse, ou arrastando o dedo em qualquer lugar da tela) e escolhe o efeito; profundidade, altura e o momento do golpe são automáticos, e mover para o lado ao bater direciona a bola. O **controle avançado** (Configurações → Controle) dá o comando completo descrito abaixo.

| Ação | Mouse / teclado | Toque |
|---|---|---|
| Mover a raquete | mover o mouse (para cima = em direção à rede) | arrastar o dedo |
| Golpear | levar o mouse para frente no momento do contato | deslizar para cima |
| Topspin / corte | segurar botão esquerdo / direito (ou J / K) | segurar **Topspin** / **Corte** |
| Efeito lateral | Q / E | — |
| Inclinar a face | roda do mouse | — |
| Altura (assistência desligada) | W / S | — |
| Saque | Espaço ou clique, depois o golpe enquanto a bola desce | **Sacar** |
| Câmera / pausa | C ou 1–4 / Esc | botões no topo |

2 jogadores no computador: jogador 1 no mouse; jogador 2 no teclado (W A S D move, F ou Espaço = drive, Q = topspin, E = corte; Espaço/F lança o saque).

## Estrutura

```
js/physics/   vetores, constantes oficiais, bola (aerodinâmica + impacto), mundo (colisões)
js/ai/        planejador de golpes (inversão do impacto), IA, modelo do adversário, robô
js/game/      núcleo do jogo (fluxo de saque/ponto/modos), regras, previsão de trajetória
js/controls/  entrada, controle humano, controle por teclado do 2º jogador
js/render/    renderizador e luzes, mesa/rede, raquete, bola, ginásio, texturas procedurais
js/camera/    câmeras
js/audio/     áudio procedural
js/ui/        interface e configurações
tests/        testes em Node (sem navegador)
```

## Testes

```
node pingpong/tests/physics.test.mjs    # quique ITTF, Magnus, rede, raquete, túnel, FPS
node pingpong/tests/ai.test.mjs 40      # partidas IA × IA por nível, rally cooperativo
node pingpong/tests/human.test.mjs      # jogador virtual com cada nível de assistência
node pingpong/tests/keyboard.test.mjs   # 2º jogador no teclado
node pingpong/tests/easy.test.mjs       # controle fácil (só movimento lateral)
```
