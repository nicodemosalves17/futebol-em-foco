# Roadmap

## Entregue — MVP local-first

- [x] Estrutura Expo/TypeScript e navegação em português: Início, Vídeos, Atletas e Análise.
- [x] CRUD inicial local de atletas e sessões de treino/jogo.
- [x] Importação e gravação Android com cópia local privada.
- [x] Persistência de atletas, sessões, vídeos, clipes, observações e relatórios de análise.
- [x] Reprodução e marcação manual de início/fim.
- [x] Consentimento, privacidade e exclusão com confirmação.
- [x] Área Análise IA por vídeo/atleta/sessão, com ação explícita, estado, limitações, evidências tipadas e revisão humana preparada.
- [x] Decisão honesta de indisponibilidade: nenhum resultado automático é fabricado sem modelo e evidência temporal.

## Próxima fase — mídia nativa

- [ ] Validar codecs, rotação, áudio, duração e armazenamento em dispositivos Android reais.
- [ ] Recortar fisicamente um clipe preservando orientação e sincronização de áudio.
- [ ] Renomear o arquivo derivado e exibir miniatura/duração do clipe.
- [ ] Gerar uma compilação local apenas com os clipes escolhidos.
- [ ] Exportar/partilhar somente após confirmação e aviso sobre pessoas no vídeo.

## Futuro — engine de análise local

- [ ] Implementar extração de frames de arquivos gravados em módulo Android nativo, com cancelamento, backpressure e progresso real.
- [ ] Avaliar um modelo local licenciado e validado para pessoas/objetos e tracking; não assumir que detecção genérica equivale a análise tática.
- [ ] Definir como o usuário identifica manualmente o atleta sem reconhecimento facial ou biometria.
- [ ] Só exibir ações, movimentação, participação ou posição quando houver evidência temporal e validação adequada.
- [ ] Exibir sugestões como observado/estimado/não determinável, com confiança e confirmar/corrigir/rejeitar/editar/apagar.
- [ ] Medir movimento apenas após calibração e sem prometer precisão tática, talento, potencial ou valor futuro.
- [ ] Testar qualidade, distância, ângulo, oclusão, enquadramento, bateria, memória e desempenho em aparelhos reais.

## Futuro — nuvem opcional

- [ ] Só oferecer processamento remoto com consentimento separado, explicação de dados transmitidos, retenção, revogação e serviço configurado.
