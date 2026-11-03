# Penalty Kings

Simulador de pênaltis 3D no navegador (Three.js + TypeScript). Cada cobrança é uma colisão física real entre a chuteira e a bola; nenhuma animação decide se é gol.

## Rodar

```bash
cd penalty-kings
npm install
npm run dev          # desenvolvimento
npm test             # testes de física e simulação (vitest)
npm run build        # versão estática em dist/
npm run build:single # um único index.html autocontido em dist-single/
```

A pasta `dist/` já vem compilada: basta servir `penalty-kings/dist/` como site estático.

## Controles

| Ação | Teclado/mouse | Controle | Toque |
|---|---|---|---|
| Mirar | mouse ou WASD/setas | analógico esquerdo | arrastar |
| Efeito (ponto de contato) | I J K L / roda | analógico direito | — |
| Técnica | 1–7, Q/E | LB/RB | botões |
| Potência | segurar Espaço/clique | segurar A | segurar CHUTAR |
| Timing do chute | Espaço quando o anel dourado fecha (pé de apoio) | A | CHUTAR |
| Acelerar/frear a corrida | W/S | RT/LT | + / − |
| Paradinha | Shift | B | Paradinha |
| Pé, distância, ângulo, ritmo | T, [ ], , ., - = | X | botões |
| Câmera / seguir bola | C / V | Y | Cam |
| Goleiro: deslocar / saltar | A/D, Espaço (direção com WASD ou mouse) | analógico + A | arrastar + SALTAR |
| Replay / pausa | R / Esc | Back / Start | — |

## Arquitetura

```
src/physics     bola (RK4, arrasto com crise de arrasto, Magnus, efeito "folha seca" pela orientação das costuras),
                colisões contínuas (sub-passos ≤ 2 cm + bisseção do instante de impacto), traves, gramado,
                rede como membrana elástica amortecida, impulso pé–bola com atrito que gera o giro
src/characters  esqueleto humano, IK de dois ossos, corrida planejada por passadas (sem deslizar),
                swing do chute sincronizado com o impulso físico, corpo do goleiro com impulso, voo balístico e alcance
src/ai          IA do goleiro (4 níveis: reação, potência, leitura do pé de apoio, memória, modelo de previsão),
                IA do cobrador
src/game        simulação de uma cobrança (determinística, passo fixo 240 Hz), regras, modos, estatísticas
src/render      estádio, gramado em camadas, rede em tecido (PBD), torcida instanciada, luz e pós-processamento
src/camera, src/audio, src/input, src/replay, src/ui
```

### Decisões técnicas

- **Sem Rapier**: a bola colide com cápsulas analíticas (traves, partes do corpo do goleiro). A detecção contínua analítica é exata e evita um módulo WASM de ~2 MB. As colisões consideram velocidade, ângulo, restituição, atrito e giro.
- **Sem aleatoriedade no resultado**: o erro de execução vem do timing, da potência na zona vermelha, da velocidade da corrida, da posição do pé de apoio, do lado não natural, da mudança de mira tardia e da pressão contra a frieza. As decisões do cobrador da CPU usam um gerador com semente (reproduzível); o resultado sai da física.
- **Gráficos não mudam a física**: LOW/HIGH/ULTRA alteram resolução, sombras, grama, torcida, AO, bloom e DOF; a simulação é idêntica.
- **Modelos humanos procedurais**: não há modelos licenciados, então os corpos são gerados por perfis anatômicos por osso. É o principal limite visual frente a um jogo comercial com captura de movimento e escaneamento.
