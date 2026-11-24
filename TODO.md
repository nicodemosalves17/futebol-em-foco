# TODO — Futebol em Foco

## Biblioteca local e organização
- [x] Atletas podem ser criados, editados e apagados localmente, com nome/apelido e notas opcionais; não há reconhecimento facial ou identificação biométrica.
- [x] Sessões podem ser criadas como treino ou jogo, associadas a um atleta e a uma data, listadas e editadas/apagadas.
- [x] Vídeos existentes podem ser importados, copiados para o armazenamento privado do app e exibidos com duração, data, atleta e sessão.
- [x] A gravação Android pede câmera/microfone no momento da gravação e salva o resultado localmente.
- [x] A exclusão de vídeo confirma a ação e remove metadados e cópia privada quando possível.

## Lances e análise manual
- [x] Um usuário consegue marcar início e fim na linha temporal, rever o trecho e guardar um clipe derivado associado à sessão.
- [x] Clipes podem ser renomeados, apagados e incluídos/excluídos da compilação escolhida pelo usuário.
- [x] A área Análise permite observações manuais de movimentação, participação e ações com bola, sem métricas automáticas fictícias.
- [x] A interface deixa claro que os clipes do MVP são marcadores derivados; recorte/compilação física com áudio e orientação será feito em pipeline nativo validado.

## Privacidade e entrega
- [x] O app orienta autorização do responsável antes de filmar menores e avisa antes de exportar/partilhar.
- [x] Não há partilha automática, links públicos, envio à nuvem ou coleta de dados desnecessários.
- [x] README, arquitetura, privacidade e roadmap descrevem instalação, limites e como apagar dados.
- [ ] Validar build e fluxos de câmera em dispositivo Android físico/emulador com permissões reais.
