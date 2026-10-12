# 🎭 Playwright SaaS B2B Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.48-green)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![A11y](https://img.shields.io/badge/A11y-Axe%20Playwright-orange)](https://github.com/dequelabs/axe-core-npm)

Framework de automação E2E para aplicações SaaS/B2B, foi usado como base o sistema opensource OrangeHRM, para a realização de testes como autenticação, cenários E2E, regressão visual, acessibilidade e testes de resiliência

## Visão geral

Este projeto foi estruturado visando aplicação de recursos específicos de automação com Playwright + TypeScript, seguindo boas práticas de arquitetura e manutenção:

- Page Object Model (POM)
- fixtures reutilizáveis
- setup de sessão compartilhada via `storageState`
- organização por tipo de teste
- leitura de ambiente via `.env`
- utilitários para validação e mock de API

---

## Arquitetura e objetivos

### Diferenciais principais

- Reuso de sessão: a autenticação é realizada uma vez e reaproveitada pela suíte.
- Estrutura por domínio: páginas, fixtures, utilitários e configuração ficam separados por responsabilidade.
- Cobertura em múltiplos níveis: E2E, regressão visual, acessibilidade e testes de falha de rede.
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
├── .auth/
├── src/
│   ├── components/
│   │   └── sidebar.component.ts
│   ├── config/
│   │   └── env.ts
│   ├── fixtures/
│   │   └── base.fixture.ts
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── dashboard.page.ts
│   │   ├── login.page.ts
│   │   └── pim.page.ts
│   └── utils/
│       ├── assertions.ts
│       ├── network.ts
│       └── selectors.ts
├── tests/
│   ├── api/
│   │   └── network-resilience.spec.ts
│   ├── regression/
│   │   ├── accessibility.spec.ts
│   │   └── visual-regression.spec.ts
│   ├── setup/
│   │   └── auth.setup.ts
│   └── smoke/
│       └── dashboard.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
└── playwright-report/
```

---

## Pré-requisitos

- Node.js 18+
- npm 9+
- Chromium e Firefox do Playwright instalados

---

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_USERNAME=your_username
PASSWORD=your_password
```

O exemplo de referência está em `.env.example`.

> Importante: as credenciais nunca devem ficar hardcoded no código ou no repositório.

---

## Instalação local

```bash
npm install
npx playwright install --with-deps chromium firefox
```

---

## Como executar

### Opção 1: via arquivo `.env` (recomendado)

Crie o arquivo `.env` na raiz do projeto e rode:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_USERNAME=your_username
PASSWORD=your_password
```

Depois:

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

### Execução de teste específico com trace e navegador específico

```bash
npx playwright test tests/smoke/dashboard.spec.ts --project=firefox --trace on --workers=1 --retries=0
```

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

## Estratégia de testes

### Smoke

Valida os fluxos de usuário, como autenticação e navegação crítica no dashboard.

### Regression

- acessibilidade com Axe
- regressão visual com `toHaveScreenshot`

### API resilience

Simula falhas de rede e backend para validar a resiliência da interface.

### Setup de sessão

O projeto usa um arquivo de estado compartilhado para reaproveitar a sessão autenticada e reduzir tempo de execução.

---

## CI/CD

O repositório possui workflow do GitHub Actions em `.github/workflows/playwright.yml`, que executa a suíte no Chromium e no Firefox e publica o relatório HTML como artefato.

Fluxo típico:

1. instalar dependências
2. instalar Chromium e Firefox do Playwright
3. executar testes
4. publicar relatório em artefato

---

## Observações importantes

- O ambiente de execução depende de variáveis configuradas corretamente.
- Os testes estão organizados por intenção para facilitar manutenção e execução por contexto.
- A suíte foi estruturada para crescer sem perder legibilidade nem organização.

---

## Objetivo do projeto

A proposta deste framework é servir como base para reproduzir recursos úteis e aplicados em projetos reais, que visam garantir:

- estabilidade
- reutilização
- qualidade visual
- acessibilidade
- testes de falha e resiliência
- facilidade de manutenção

---


