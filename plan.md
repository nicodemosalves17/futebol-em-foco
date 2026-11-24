# Plano de implementação — Futebol em Foco

## Abordagem

Evoluir a base Expo existente para um MVP Android local-first em React Native + Expo + TypeScript. A escolha mantém a iteração rápida, permite câmera e biblioteca do Android por módulos Expo e evita um backend que seria desnecessário para o primeiro uso. Os vídeos são copiados para o diretório privado do aplicativo; atletas, sessões, vídeos, clipes e observações são metadados persistidos localmente com AsyncStorage.

O código será separado em `src/types` (modelos), `src/data` (armazenamento e operações), `src/media` (importação, gravação e reprodução), e componentes de interface. A tela principal concentra navegação simples para Início, Vídeos, Atletas e Análise. A revisão de lances usa marcadores temporais e clipes derivados; o app não afirma ter feito uma detecção automática.

## Decisões de produto

- Português do Brasil, controles grandes e contraste alto para uso no campo.
- Sem login, nuvem, links públicos, reconhecimento facial ou biometria.
- Pedir permissões somente no fluxo que precisa delas.
- Exigir atleta e sessão para organizar mídia, mas permitir começar pelo fluxo rápido de criação.
- Exclusões são confirmadas e removem metadados; a remoção do arquivo original é tentada quando o app é o responsável por sua cópia privada.
- Recortes e compilação ficam preparados como clipes derivados com início/fim e seleção; processamento físico de vídeo requer pipeline nativo adicional e é documentado como limitação.

## Estrutura

- `App.tsx`: composição da aplicação, navegação, formulários e fluxos de gravação/importação.
- `src/types/models.ts`: tipos de atleta, sessão, vídeo, clipe e observação.
- `src/data/storage.ts`: armazenamento, migrações simples e operações CRUD locais.
- `src/media/media.ts`: cópia local, exclusão de arquivo e formatação de duração.
- `src/components/VideoPlayer.tsx`: reprodução e marcação manual em uma tela de revisão.
- `docs/ARQUITETURA.md`: arquitetura, garantias e limites.
- `docs/PRIVACIDADE.md`: consentimento, armazenamento e eliminação.
- `README.md` e `ROADMAP.md`: execução e próximos passos.

## Design

### Direções consideradas

- **Linha lateral de campo** — 0,06: interface editorial esportiva com painéis alinhados à esquerda.
- **Placar de bolso** — 0,07: cartões compactos e hierarquia de números como uma súmula.
- **Verde de gramado calmo** — 0,04: superfícies claras, verde profundo e âmbar para estados de atenção.

Escolhida: **Linha lateral de campo**.

- **Movimento visual:** editorial esportivo, com uma faixa escura de destaque e cartões de súmula.
- **Princípios:** leitura imediata, ações reversíveis, contexto antes da métrica e transparência sobre limites.
- **Cores:** verde profundo para ação e confiança, fundo quase branco para reduzir reflexo, âmbar só para indicar revisão/atenção.
- **Layout:** cabeçalho fixo, navegação inferior e conteúdo em coluna com blocos de ação grandes.
- **Assinaturas:** faixa “FUTEBOL EM FOCO”, cartão de privacidade e chips de estado “manual/local”.
- **Interação/animação:** mudanças de tela sem excesso de movimento; confirmações explícitas; nenhum gesto oculto para apagar.
- **Tipografia:** sistema nativo, títulos fortes, rótulos curtos em caixa alta e corpo com line-height confortável.
- **Essência:** a súmula privada do atleta, para pais e treinadores reverem cada treino sem inventar dados. Personalidade: cuidadosa, direta, prática.
- **Voz:** “Reveja o lance com calma.” / “Nada automático: você confirma o que aconteceu.”
- **Marca:** wordmark em caixa alta com um pequeno marcador vertical verde, sem depender de fonte externa.
- **Cor proprietária:** verde campo `#1F6B48`.
