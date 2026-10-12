import { expect, test } from '../../src/fixtures/base.fixture';
import { mockApiFailure } from '../../src/utils/network';

const dashboardEmployeesApi = '**/api/v2/dashboard/employees/**';

test.describe('Resiliência de API & Network Mocking', () => {
  test('Mantém o dashboard disponível após erro 500 na API de funcionários', async ({ page, dashboardPage }) => {
    
    // 1. Configura o mock de rede ANTES de navegar para a página
    const mockedFailure = await test.step('Configurar mock HTTP 500', () =>
      mockApiFailure(page, dashboardEmployeesApi)
    );

    // 2. Acessa o dashboard já autenticado via storageState
    await test.step('Navegar para o Dashboard', async () => {
      await page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
    });

    // 3. Valida se a rota foi realmente interceptada e retornou o status simulado
    await test.step('Validar resposta HTTP 500 interceptada', async () => {
      const response = await mockedFailure.response;
      expect(response.status).toBe(500);
      expect(new URL(response.url).pathname).toContain('/api/v2/dashboard/employees/');
    });

    // 4. Valida a resiliência do Front-End
    await test.step('Garantir que a interface lida com a falha sem quebrar', async () => {
      await expect(dashboardPage.headerTitle).toBeVisible();
    });
  });
});