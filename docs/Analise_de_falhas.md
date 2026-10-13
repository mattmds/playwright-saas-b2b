# Análise de falhas do projeto

## Testes de Acessibilidade

### Contexto
O scan Axe verifica a página em um teste que valida diversos critérios de sucesso das WCAG 2.1 como texto alternativo, contraste de cores, estrutura de elementos, títulos de páginas, duplicação de id´s, entre outros.

### Cenário testado
Validação de conformidade WCAG 2.1 AA na tela inicial do Dashboard. A automação navega até a página e inicia a validação de acessibiilidade.

### Resultado do teste
O teste falhou na validação ao encontrar 5 violações de acessiblidade na página de Dashboard, são elas:
- Botões de ícone sem nome acessível
- Ausência de lang no elemento HTML
- Presença de imagens sem texto alternativo.
- Estrutura de lista inválide
- Região rolável que não é focalizável pelo teclado.

O Axe classificou a violação dos botões como crítica e a ausência de lang como séria