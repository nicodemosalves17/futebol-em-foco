# Futebol em Foco

MVP Android em português para pais e treinadores organizarem treinos e jogos, reverem vídeos e registarem observações manuais do atleta.

> **Estado:** MVP local-first. Atletas, sessões, vídeos, clipes derivados e observações ficam no dispositivo. O recorte/compilação física e análise automática ainda não são prometidos.

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
- Avisos de consentimento e privacidade, sem upload, link público, reconhecimento facial ou biometria.

## Arquitetura escolhida

**React Native + Expo + TypeScript** oferece uma base Android iterável e módulos nativos para câmera, biblioteca, arquivos e vídeo, mantendo a arquitetura pronta para uma futura interface iOS. O projeto não usa backend no MVP porque a prioridade é privacidade local e revisão humana.

## Privacidade e consentimento

Peça autorização do responsável antes de filmar menores e informe as demais pessoas filmadas. O processamento é local por padrão e o usuário controla exclusões. Veja [docs/PRIVACIDADE.md](docs/PRIVACIDADE.md).

Veja [Privacidade e segurança](docs/PRIVACIDADE.md), [Arquitetura e limites](docs/ARQUITETURA.md) e [Roadmap](ROADMAP.md).

## Estrutura

- `App.tsx` — navegação, telas e fluxos de usuário.
- `src/types/models.ts` — tipos do domínio.
- `src/data/storage.ts` — persistência AsyncStorage.
- `src/media/media.ts` — cópia/exclusão local e formatação.
- `src/components/VideoPlayer.tsx` — reprodução e marcação manual.
- `docs/ARQUITETURA.md` — escolhas técnicas e limitações.
- `docs/PRIVACIDADE.md` — consentimento, armazenamento e eliminação.
- `ROADMAP.md` — o que fica para depois.

## Licença

Ainda não definida. Escolher uma licença antes de aceitar contribuições externas.
