import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Interface que define o payload esperado na resposta do Login via API.
 */
export interface LoginApiResponse {
  token?: string;
  user?: {
    id: number;
    username: string;
  };
  message?: string;
}

/**
 * Classe responsável pelas interações diretas de API relacionadas à Autenticação e Gestão de Sessão.
 * Útil para acelerar a criação de massa de dados e efetuar login direto sem passar pela UI.
 */
export class AuthApi {
  // Instância do cliente HTTP nativo do Playwright para requisições diretas
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Executa a autenticação diretamente via endpoint HTTP POST.
   * 
   * @param username - Nome do usuário
   * @param password - Senha do usuário
   * @returns Promessa com a resposta bruta da API (APIResponse)
   */
  async loginViaApi(username: string, password: string): Promise<APIResponse> {
    return await this.request.post('/web/index.php/api/v2/auth/login', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: {
        username,
        password,
      },
    });
  }

  /**
   * Obtém o Token de Autenticação (Bearer Token / JWT) diretamente do Backend.
   * Utilizado para injetar credenciais em requisições subsequentes do teste.
   * 
   * @returns O token de autenticação em string
   */
  async getAuthToken(username: string, password: string): Promise<string> {
    const response = await this.loginViaApi(username, password);

    // Valida se a API respondeu com sucesso (Status 200-299)
    if (!response.ok()) {
      throw new Error(`Falha ao obter token via API. Status: ${response.status()} - ${response.statusText()}`);
    }

    const responseBody: LoginApiResponse = await response.json();
    
    if (!responseBody.token) {
      throw new Error('Propriedade token não encontrada no corpo da resposta da API.');
    }

    return responseBody.token;
  }

  /**
   * Valida a validade do token/sessão atual no servidor.
   */
  async validateSession(token: string): Promise<boolean> {
    const response = await this.request.get('/web/index.php/api/v2/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.ok();
  }
}