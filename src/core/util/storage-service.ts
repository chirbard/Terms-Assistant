export default class StorageService {
  private static instance: StorageService;
  private constructor() {}

  /**
   * @returns instance of StorageService
   */
  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  public setAccessToken(accessToken: string): Promise<void> {
    return this.set("accessToken", accessToken);
  }

  public getAccessToken(): Promise<string> {
    return this.get("accessToken");
  }

  public removeAccessToken(): Promise<void> {
    return this.remove("accessToken");
  }

  /**
   * @returns data from storage for the given key. The data retuned might be undefined
   */
  private async get(key: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const dataFromStorage = await chrome.storage.local.get(key);
        resolve(dataFromStorage[key]);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async set(key: string, value: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.set({ [key]: value }).then(() => {
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private async remove(key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.remove(key, () => {
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
