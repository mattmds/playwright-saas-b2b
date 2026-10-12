import type { Page } from '@playwright/test';

export interface MockedApiResponse {
  url: string;
  status: number;
}

export interface MockedApiFailure {
  response: Promise<MockedApiResponse>;
}

/**
 * Intercepta uma rota de rede e força uma resposta de falha (ex: HTTP 500).
 */
export async function mockApiFailure(
  page: Page,
  urlPattern: string,
  status: number = 500,
  errorMessage: string = 'Internal Server Error Mocked'
): Promise<MockedApiFailure> {
  let resolveResponse!: (response: MockedApiResponse) => void;
  const response = new Promise<MockedApiResponse>((resolve) => {
    resolveResponse = resolve;
  });

  // Intercepta a requisição e sobrescreve o retorno com o status de erro
  await page.route(urlPattern, async (route) => {
    const url = route.request().url();

    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ message: errorMessage }),
    });

    resolveResponse({ url, status });
  });

  return { response };
}