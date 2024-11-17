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
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TEMP_ACCESS_TOKEN}`,
          },
          credentials: "omit",
        });

        resolve(result);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}
