export class ApiService {
  constructor(private baseUrl: string) {}

  private getUrl(path: string): string {
    const normalized = path.startsWith('/') ? path.slice(1) : path;
    return `${this.baseUrl}/${normalized}`;
  }

  async get<ResponceType>(
    path: string,
    options?: RequestInit,
  ): Promise<ResponceType> {
    const url = this.getUrl(path);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(
        `GET ${url} failed: ${String(res.status)} ${res.statusText}`,
      );
    }
    return (await res.json()) as ResponceType;
  }

  async post<ResponceType>(
    path: string,
    body: unknown,
    options?: RequestInit,
  ): Promise<ResponceType> {
    const url = this.getUrl(path);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      ...options,
    });
    if (!res.ok) {
      throw new Error(
        `POST ${url} failed: ${String(res.status)} ${res.statusText}`,
      );
    }
    return (await res.json()) as ResponceType;
  }

  public rawRequest(path: string, options?: RequestInit): Promise<Response> {
    const url = this.getUrl(path);
    return fetch(url, options);
  }
}

export const apiService = new ApiService('http://localhost:3000');
