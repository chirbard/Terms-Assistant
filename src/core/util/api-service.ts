export default class ApiService {
  private static instance: ApiService;
  private constructor() {}

  /**
   * @returns instance of ApiService
   */
  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public accessTokenRequest(): Promise<Response> {
    const apiKey: string = import.meta.env.VITE_API_KEY;
    const url = `https://iam.cloud.ibm.com/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`;
    return new Promise<Response>(async (resolve, reject) => {
      try {
        const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
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

  /**
   * @returns response from post request
   */
  public postRequestWithStringBody(
    url: string,
    body: string,
    accessToken: string
  ): Promise<Response> {
    return new Promise<Response>(async (resolve, reject) => {
      try {
        const result = await fetch(url, {
          method: "POST",
          body: body,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
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
