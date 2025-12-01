type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

interface ApiError extends Error {
  status?: number;
  message: string;
}

class ApiClient {
  private baseUrl;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): string {
    const url = new URL(endpoint, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private createAbortController(timeout: number) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    try {
      const url = this.buildUrl(endpoint, config.params);

      const timeout = 10000;
      const controller = this.createAbortController(timeout);

      const fetchConfig: RequestInit = {
        method,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        ...config,
      };

      const response = await fetch(url, fetchConfig);

      if (!response.ok) {
        const errorData: { status?: string; message: string } =
          await response.json();
        const error: ApiError = new Error(
          errorData?.message || `HTTP Error: ${response.status}`
        );
        error.status = response.status;
        throw error;
      }

      return await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(
        `Error api request :: Endpoint: ${endpoint} `,
        error instanceof Error ? error.message : String(error)
      );

      throw error;
    }
  }

  public async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", endpoint, config);
  }

  public async post<RequestType, ResponseType = RequestType>(
    endpoint: string,
    data?: RequestType,
    config?: RequestConfig
  ): Promise<ResponseType> {
    return await this.request<ResponseType>("POST", endpoint, {
      ...config,
      body: JSON.stringify(data),
    });
  }

  public async put<T>(
    endpoint: string,
    data?: Partial<T>,
    config?: RequestConfig
  ): Promise<T> {
    return await this.request<T>("PUT", endpoint, {
      ...config,
      body: JSON.stringify(data),
    });
  }

  public async patch<RequestType, ResponseType = RequestType>(
    endpoint: string,
    data?: RequestType,
    config?: RequestConfig
  ): Promise<ResponseType> {
    return await this.request<ResponseType>("PATCH", endpoint, {
      ...config,
      body: JSON.stringify(data),
    });
  }

  public async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return await this.request<T>("DELETE", endpoint, config);
  }
}

export const api = new ApiClient(import.meta.env.VITE_APP_API_URL);
