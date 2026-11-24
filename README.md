# Futebol em Foco ⚽

Aplicativo Android para guardar e rever vídeos de treinos e jogos, organizar atletas e sessões e, no futuro, encontrar lances e apoiar a análise da função em campo.

> **Estado:** protótipo inicial. A base importa vídeos da biblioteca e os organiza localmente durante a sessão do app. Gravação, recorte/exportação, persistência entre reinícios e visão computacional ainda não estão implementados.

## Começar

Requisitos: Node.js LTS, npm e Android Studio/emulador ou dispositivo Android.

```sh
npm install
npx expo start
```

Use `a` para abrir no emulador Android ou leia o QR code com Expo Go. Para conferir os tipos: `npm run typecheck`.

## O que já existe

- Interface inicial em português com resumo, biblioteca e perfil de atleta.
- Seleção de vídeos existentes usando a biblioteca do aparelho.
- Associação inicial ao atleta ativo e sessão provisória.
- Estado demonstrativo mantido em memória enquanto o app está aberto.

## Arquitetura escolhida

**React Native + Expo + TypeScript** oferece uma base Android rápida de iterar e facilita uma futura interface iOS. Vídeo longo e visão computacional devem usar módulos nativos Android ou bibliotecas nativas validadas em builds próprios, sem transportar arquivos grandes pelo JavaScript. Para o MVP, manter original e metadados no armazenamento privado do app; usar processamento local sempre que possível. Introduzir persistência local (SQLite) e um serviço de mídia nativo apenas quando os fluxos de captura/recorte estiverem definidos.

O modelo de análise deve separar observações (tempo, posição aproximada, evento detectado) de interpretações (função provável). Detecções são estimativas, devem exibir confiança e precisam de confirmação humana; vídeo comum de uma câmera não garante identificação confiável do jogador nem métricas táticas completas.

## Privacidade e consentimento

- Obter autorização do responsável antes de filmar ou armazenar imagens de menores e autorização apropriada das demais pessoas filmadas.
- Preferir gravação enquadrada no atleta; evitar captar conversas, vestiários e dados pessoais desnecessários.
- Vídeos são sensíveis: processamento local por padrão, sem envio automático à nuvem.
- Antes de partilhar, permitir revisão do conteúdo e avisar sobre pessoas ao fundo; partilha deve ser uma ação explícita.
- Oferecer eliminação do vídeo, dos recortes e dos metadados associados.
- Definir retenção e consentimento revogável antes de lançar. A tela de protótipo não persiste nem envia os vídeos.

Veja [Privacidade e segurança](docs/PRIVACIDADE.md), [Arquitetura e limites](docs/ARQUITETURA.md) e [Roadmap](ROADMAP.md).

## Estrutura

- `App.tsx` — protótipo de navegação e importação.
- `docs/ARQUITETURA.md` — decisões técnicas e limites da análise.
- `docs/PRIVACIDADE.md` — princípios para menores, partilha e eliminação.
- `ROADMAP.md` — fases de produto e critérios de conclusão.
- `.github/ISSUE_TEMPLATE/` — modelos para as primeiras tarefas.

## Licença

Ainda não definida. Escolher uma licença antes de aceitar contribuições externas.
