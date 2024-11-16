export default class ApiService {
  private static instance: ApiService;
  private constructor() {}

  /**
   * @returns instance of AuthenticationApiService
   */
  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * @returns response from post request
   */
  public postRequestWithStringBody(
    url: string,
    body: string
  ): Promise<Response> {
    return new Promise<Response>(async (resolve, reject) => {
      try {
        const result = await fetch(url, {
          method: "POST",
          body: body,
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        });

        resolve(result);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}
