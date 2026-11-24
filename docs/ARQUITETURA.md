# Arquitetura e limites

## Stack

O aplicativo usa React Native + Expo + TypeScript. Expo foi mantido porque oferece módulos Android para câmera, biblioteca, sistema de arquivos e reprodução sem introduzir um backend no MVP. A versão do SDK está alinhada com React Native/React no `package.json`.

A interface permanece em `App.tsx`, enquanto os modelos ficam em `src/types/models.ts`, a persistência em `src/data/storage.ts`, as operações de arquivo em `src/media/media.ts` e a reprodução/marcação em `src/components/VideoPlayer.tsx`.

## Dados

`AsyncStorage` guarda apenas metadados serializáveis: atletas, sessões, registros de vídeo, clipes e observações. Os vídeos não são convertidos para base64 nem mantidos em memória: ao importar ou gravar, o arquivo é copiado para `FileSystem.documentDirectory/videos/` e a URI local é registrada.

A aplicação não usa login, servidor, links públicos, upload automático, reconhecimento facial ou identificação biométrica. O arquivo privado é apagado quando o usuário confirma a exclusão do vídeo e o URI é um arquivo local.

## O que está funcional

- Criação de perfis locais de atleta, sessões de treino/jogo e observações manuais.
- Importação da biblioteca do Android com pedido de permissão no momento da ação.
- Gravação de vídeo com câmera e microfone, com aviso de consentimento antes da captura.
- Reprodução no aparelho e marcação manual de início/fim com clipes derivados persistidos.
- Seleção, renomeação e exclusão de marcadores.

## Limitações conhecidas

O MVP guarda clipes como marcadores temporais associados ao original. Ele não promete recortar/concatenar fisicamente o arquivo nem gerar uma compilação final, porque isso exige pipeline nativo de mídia testado por codec, rotação, áudio e fabricante. A UI informa essa condição; não há métrica automática, classificação de posição ou confiança inventada.

A validação final de câmera, codecs e armazenamento precisa ser feita em um Android físico/emulador. O Expo Go pode não carregar todos os módulos nativos conforme a configuração do dispositivo; para produção, gerar um development build Android.
