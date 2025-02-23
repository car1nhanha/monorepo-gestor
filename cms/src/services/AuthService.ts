import Api from "./api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  location: {
    lat: number;
    lng: number;
  };
}

class AuthService extends Api {
  async login(credentials: LoginCredentials): Promise<void> {
    // A rota /auth/login do backend definirá o cookie "jwt" na resposta.
    await this.post("/auth/login", credentials);
  }

  async register(data: RegisterData): Promise<void> {
    await this.post("/auth/register", data);
  }

  async logout(): Promise<void> {
    await this.get("/auth/logout");
    window.location.href = "/login";
  }
}

export default new AuthService();
