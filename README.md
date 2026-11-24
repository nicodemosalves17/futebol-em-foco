# Futebol em Foco

MVP Android em português para pais e treinadores organizarem treinos e jogos, reverem vídeos e registarem observações manuais do atleta.

> **Estado:** MVP local-first. Atletas, sessões, vídeos, clipes derivados, observações e relatórios de análise ficam no dispositivo. A área **Análise IA** já possui fluxo persistente e revisão humana, mas a engine local de visão ainda está indisponível; nenhum resultado automático fictício é criado.

## Requisitos

- Node.js LTS e npm.
- Android Studio com emulador ou dispositivo Android físico.
- Para câmera, áudio e armazenamento nativo confiáveis, use um development build Expo; o Expo Go pode ter limitações conforme o dispositivo.

## Executar

```sh
npm install
npm run typecheck
npx expo start
```

Pressione `a` para abrir no Android. Para gerar o projeto nativo localmente, use `npx expo prebuild` e `npx expo run:android` no ambiente Android configurado.

## Funcionalidades implementadas

- Criar e apagar perfis locais de atleta com nome/apelido e notas.
- Criar sessões de treino ou jogo associadas ao atleta e à data.
- Importar vídeos da biblioteca do aparelho e copiá-los para o diretório privado do app.
- Gravar vídeo no Android com câmera/microfone solicitados somente quando necessários.
- Reproduzir vídeos, marcar início/fim de lances e guardar marcadores derivados.
- Renomear, selecionar e apagar clipes; apagar vídeo com confirmação e dados derivados.
- Registar observações manuais sobre movimentação, participação e ações com bola.
- Área **Análise IA** por vídeo, atleta e sessão, iniciada explicitamente pelo usuário.
- Relatórios persistentes com estado, progresso, engine, limitações e revisão humana; achados futuros exigirão intervalo temporal, confiança e classificação observado/estimado/não determinável.
- Cancelamento e processamento não bloqueante estão previstos no contrato da engine; a engine atual retorna indisponibilidade sem analisar frames.
- Avisos de consentimento e privacidade, sem upload, link público, reconhecimento facial ou biometria.

## O que a Análise IA faz hoje

Ao tocar em **Iniciar análise**, o app cria um relatório ligado ao vídeo, atleta e sessão corretos e executa a engine local registrada. No MVP atual, essa engine é um adaptador explícito de indisponibilidade: não há modelo local validado, não há extração de frames de arquivos gravados pelo `expo-video` no Android e, portanto, o relatório termina sem achados automáticos. Isso é intencional para não inventar eventos, métricas, posição, talento, potencial, valor futuro ou confiança.

A pesquisa técnica usou a documentação oficial do [expo-video](https://docs.expo.dev/versions/latest/sdk/video/), do [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) e do [ML Kit Object Detection](https://developers.google.com/ml-kit/vision/object-detection/android). O ML Kit consegue processar imagens/frames no dispositivo, mas sua API genérica não fornece análise tática de futebol nem identificação de atleta; integrar isso a vídeos gravados exigirá módulo Android nativo, extração de frames, testes de desempenho e validação de dados.

## Arquitetura escolhida

**React Native + Expo + TypeScript** oferece uma base Android iterável e módulos nativos para câmera, biblioteca, arquivos e vídeo, mantendo a arquitetura pronta para uma futura interface iOS. O projeto não usa backend no MVP porque a prioridade é privacidade local e revisão humana. A interface depende do contrato `AnalysisEngine`, não de um modelo específico.

## Privacidade e consentimento

Peça autorização do responsável antes de filmar menores e informe as demais pessoas filmadas. O processamento é local por padrão e o usuário controla exclusões. Não há serviço externo configurado nem vídeo enviado automaticamente. Veja [docs/PRIVACIDADE.md](docs/PRIVACIDADE.md).

Veja [Privacidade e segurança](docs/PRIVACIDADE.md), [Arquitetura e limites](docs/ARQUITETURA.md) e [Roadmap](ROADMAP.md).

## Estrutura

- `App.tsx` — navegação, telas e fluxos de usuário.
- `src/types/models.ts` — tipos do domínio, relatórios, evidências e revisão.
- `src/data/storage.ts` — persistência AsyncStorage e migração tolerante.
- `src/analysis/analysisEngine.ts` — contrato modular e engine local atualmente indisponível.
- `src/media/media.ts` — cópia/exclusão local e formatação.
- `src/components/VideoPlayer.tsx` — reprodução e marcação manual.
- `docs/ARQUITETURA.md` — escolhas técnicas e limitações.
- `docs/PRIVACIDADE.md` — consentimento, armazenamento e eliminação.
- `ROADMAP.md` — o que fica para depois.

## Licença

Ainda não definida. Escolher uma licença antes de aceitar contribuições externas.
