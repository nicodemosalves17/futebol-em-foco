# Arquitetura e limites

## Stack

O aplicativo usa React Native + Expo + TypeScript. Expo foi mantido porque oferece módulos Android para câmera, biblioteca, sistema de arquivos e reprodução sem introduzir um backend no MVP. A versão do SDK está alinhada com React Native/React no `package.json`.

A interface permanece em `App.tsx`, os modelos ficam em `src/types/models.ts`, a persistência em `src/data/storage.ts`, o contrato de inferência em `src/analysis/analysisEngine.ts`, as operações de arquivo em `src/media/media.ts` e a reprodução/marcação em `src/components/VideoPlayer.tsx`.

## Dados e vínculo de contexto

`AsyncStorage` guarda metadados serializáveis: atletas, sessões, registros de vídeo, clipes, observações e `analysisReports`. Cada relatório e cada futuro `AnalysisFinding` possui `videoId`, `athleteId` e `sessionId`. Vídeos não são convertidos para base64 nem mantidos em memória: ao importar ou gravar, o arquivo é copiado para `FileSystem.documentDirectory/videos/` e a URI local é registrada.

Os tipos de análise já reservam `AnalysisEvidence` com `startMs` e `endMs`, `confidence`, `conclusion` (`observado`, `estimado` ou `não determinável`), `origin` (`automático` ou `interpretação`) e `review` (`pendente`, `confirmado`, `corrigido` ou `rejeitado`). A UI omite qualquer conclusão sem evidência temporal. Hoje a engine retorna zero achados.

## Engine modular e estado atual

`AnalysisEngine` é um contrato que recebe um `VideoRecord`, pode emitir progresso e devolve achados, limitações e mensagem. A implementação `unavailableLocalEngine` registra de forma explícita que nenhum modelo local foi validado. O botão de análise é uma ação explícita, cria um relatório persistente e não bloqueia a interface; o relatório termina como indisponível, sem simulação de progresso ou inferência fictícia.

Essa decisão é compatível com a documentação oficial: `expo-video` fornece reprodução, `currentTime` e duração, mas a propriedade de análise de frames documentada é específica do iOS para Live Text, não uma API Android para extrair frames de arquivos. `expo-camera` grava vídeos no cache e solicita permissões. O ML Kit Object Detection processa imagens/frames no dispositivo e rastreia objetos, mas suporta categorias amplas e não fornece identificação de atleta, eventos táticos ou posição futebolística. Fontes: [expo-video](https://docs.expo.dev/versions/latest/sdk/video/), [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/), [ML Kit Object Detection](https://developers.google.com/ml-kit/vision/object-detection/android) e [ML Kit Analyzer](https://developer.android.com/media/camera/camerax/mlkitanalyzer).

## O que está funcional

- Criação de perfis locais de atleta, sessões de treino/jogo e observações manuais.
- Importação da biblioteca do Android com pedido de permissão no momento da ação.
- Gravação de vídeo com câmera e microfone, com aviso de consentimento antes da captura.
- Reprodução no aparelho e marcação manual de início/fim com clipes derivados persistidos.
- Área Análise IA com associação correta a vídeo/atleta/sessão, estado, limitações, exclusão de relatório e contrato de revisão.

## Limitações conhecidas

O MVP guarda clipes como marcadores temporais associados ao original. Ele não promete recortar/concatenar fisicamente o arquivo nem gerar uma compilação final, porque isso exige pipeline nativo de mídia testado por codec, rotação, áudio e fabricante.

Não existe ainda modelo local validado para reconhecer ações futebolísticas, movimentação, participação, posição ou identidade do atleta. Não há nuvem configurada. Qualquer futura engine deverá omitir achados sem evidência temporal, declarar incerteza e lidar com distância, ângulo, oclusão, enquadramento, qualidade e atleta não distinguível sem reconhecimento facial.

A validação final de câmera, codecs, desempenho, cancelamento e armazenamento precisa ser feita em um Android físico/emulador. O Expo Go pode não carregar todos os módulos nativos conforme a configuração do dispositivo; para produção, gerar um development build Android.
