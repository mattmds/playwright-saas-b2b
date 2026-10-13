# SaaS B2B com Playwright 

[![Playwright](https://img.shields.io/badge/Playwright-1.48-green)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)
[![A11y](https://img.shields.io/badge/Accessibility-Axe-orange)](https://github.com/dequelabs/axe-core-npm)

Framework de automação E2E em Playwright e TypeScript, usando o OrangeHRM Open Source como aplicação-alvo. A suíte cobre autenticação, fluxos smoke, regressão visual, acessibilidade e tratamento de falhas de rede.

## Visão geral

O projeto aplica práticas de automação e manutenção com Playwright e TypeScript:

- Page Object Model (POM)
- fixtures reutilizáveis
- setup de sessão compartilhada via `storageState`
- testes organizados por intenção
- configuração por ambiente via `.env`
- utilitários compartilhados para asserções e interceptação de rede

---

## Arquitetura e objetivos

### Diferenciais principais

- Reuso de sessão: um projeto de setup autentica e grava `.auth/user.json` para os projetos de navegador.
- Estrutura por domínio: páginas, fixtures, utilitários e configuração ficam separados por responsabilidade.
- Cobertura em múltiplos níveis: smoke E2E, regressão visual, acessibilidade e falhas HTTP simuladas.
- Configuração segura: credenciais e URL base são lidas por variáveis de ambiente.
- Seletores mais resilientes: locators centralizados e priorizando acessibilidade e semântica.

### Tecnologias

- Playwright
- TypeScript
- @axe-core/playwright
- dotenv
- GitHub Actions

---

## Estrutura do projeto

```text
playwright-saas-b2b/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── .auth/                         # storageState local, gerado durante o setup
├── docs/
│   └── Analise_de_falhas.md
├── src/
│   ├── components/                 # componentes reutilizáveis
│   ├── config/                     # ambiente e configuração
│   ├── fixtures/                   # fixtures específicas do projeto
│   ├── pages/                      # Page Objects
│   └── utils/                      # seletores, asserções e mocks
├── tests/
│   ├── api/network-resilience.spec.ts
│   ├── regression/
│   │   ├── accessibility.spec.ts
│   │   ├── visual-regression.spec.ts
│   │   └── visual-regression.spec.ts-snapshots/
│   ├── setup/auth.setup.ts
│   └── smoke/dashboard.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
└── playwright-report/              # relatório local gerado pelo Playwright
```

---

## Pré-requisitos

- Node.js 22 (versão usada na configuração do CI)
- npm
- Chromium e Firefox do Playwright instalados

---

## Configuração do ambiente

Copie `.env.example` para `.env` na raiz do projeto e configure as credenciais:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_USERNAME=your_username
PASSWORD=your_password
```

`BASE_URL` é opcional; quando omitida, `env.ts` usa o endereço do OrangeHRM demo. `ORANGEHRM_USERNAME` e `PASSWORD` são obrigatórias.

Boa prática: Não versione o `.env` nem coloque credenciais no código.

---

## Instalação local

```bash
npm install
npx playwright install chromium firefox
```


## Como executar

### Opção 1: via arquivo `.env` (recomendado)

Com o `.env` criado e preenchido, execute:

```bash
npm test
```

### Opção 2: via variáveis de ambiente no terminal

No Windows PowerShell:

```powershell
$env:BASE_URL="https://opensource-demo.orangehrmlive.com"
$env:ORANGEHRM_USERNAME="your_username"
$env:PASSWORD="your_password"
npx playwright test
```

No macOS/Linux:

```bash
export BASE_URL=https://opensource-demo.orangehrmlive.com
export ORANGEHRM_USERNAME=your_username
export PASSWORD=your_password
npx playwright test
```

### Execução em modo headed

```bash
npm run test:headed
```

### Teste específico com trace

```bash
npx playwright test tests/smoke/dashboard.spec.ts --project=firefox --trace on --workers=1 --retries=0
```

`--trace on` grava o trace nessa execução. Na configuração padrão, traces são gravados na primeira repetição; como a execução local não tem retries por padrão, use essa opção ao investigar uma falha.

### UI mode

```bash
npm run test:ui
```

### Smoke tests

```bash
npx playwright test tests/smoke
```

### Regression tests

```bash
npx playwright test tests/regression
```

### API resilience tests

```bash
npx playwright test tests/api
```

### Relatório HTML

```bash
npm run test:report
```

### Atualizar snapshots visuais

```bash
npm run test:update-snapshots
```

---

## Cenários de teste

Os cenários de UI são executados em Chromium e Firefox. O `setup` autentica primeiro e salva o estado da sessão; ele também aparece na execução, mas não é um cenário funcional do dashboard.

### Setup de autenticação

Realiza login com as credenciais do ambiente, confirma que o dashboard abriu e grava a sessão em `.auth/user.json`, reutilizada pelos projetos Chromium e Firefox.

### Smoke: dashboard e navegação pro módulo PIM

Confirma que o título do dashboard aparece, abre o módulo PIM pelo menu e valida a URL da lista de funcionários.

### Smoke: busca de funcionário

Abre o PIM, pesquisa por um funcionário e confirma que uma linha correspondente aparece na tabela.

### Resiliência de API

Intercepta chamadas da API de funcionários do dashboard, responde com HTTP 500 e valida o status da resposta e a permanência do título do dashboard. A falha é simulada pelo Playwright na camada de rede; o backend externo não é alterado.

### Acessibilidade

Executa Axe no dashboard usando critérios WCAG 2.1 A/AA. Exclui os gráficos e o iframe do YouTube. Os resultados e problemas observados estão em [docs/Analise_de_falhas.md](docs/Analise_de_falhas.md).

### Regressão visual

Compara uma captura do SideMenu com `toHaveScreenshot`, mascarando os dados do menu do usuário. Os baselines de Chromium e Firefox ficam em `tests/regression/visual-regression.spec.ts-snapshots/`.

---

## CI/CD

O workflow [.github/workflows/playwright.yml](.github/workflows/playwright.yml) é acionado em `push` e `pull_request` para `main` e `master`. Ele instala Chromium e Firefox, mas atualmente executa **somente `tests/smoke/dashboard.spec.ts` no Chromium**: são dois cenários smoke, além do setup de autenticação. O relatório HTML é publicado como artefato mesmo se os testes falharem.

Configure os secrets `ORANGEHRM_USERNAME` e `PASSWORD` nas configurações do GitHub Actions; ambos são necessários para a autenticação.

Fluxo típico:

1. instalar dependências
2. instalar Chromium e Firefox do Playwright
3. executar os testes smoke no Chromium
4. publicar relatório em artefato

---

## Observações importantes

- O alvo é um serviço demo externo; disponibilidade, latência, dados e sessão podem variar.
- Vídeos são mantidos somente para testes com falha (`video: 'retain-on-failure'`).
- Traces usam `on-first-retry`; em execuções locais sem retries, passe `--trace on` para gravá-los.
- O projeto valida o OrangeHRM externo e não altera o código-fonte da aplicação.

---

## Objetivo do projeto

A proposta deste framework é reproduzir alguns recursos que considero muito úteis e aplicáveis em projetos reais, que visam garantir:

- estabilidade
- reutilização
- qualidade visual
- acessibilidade
- testes de falha e resiliência
- facilidade de manutenção

---


