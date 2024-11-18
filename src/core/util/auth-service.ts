import ApiService from "./api-service";

export default class AuthService {
  private static instance: AuthService;
  private constructor() {}

  /**
   * @returns instance of AuthService
   */
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async getAccessToken(): Promise<string> {
    const apiService = ApiService.getInstance();
    try {
      const result = await apiService.accessTokenRequest();
      const json = await result.json();
      return json.access_token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
