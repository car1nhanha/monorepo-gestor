const API_URL = import.meta.env.VITE_API_URL;

class Api {
  baseUrl = API_URL;

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      credentials: "include", // envia e recebe cookies
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
      }
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || "Request failed");
    }
    return await response.json();
  }

  protected get<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: "GET" });
  }

  protected post<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, { method: "POST", body: JSON.stringify(data) });
  }

  protected put<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, { method: "PUT", body: JSON.stringify(data) });
  }

  protected delete<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: "DELETE" });
  }
}

export default Api;
