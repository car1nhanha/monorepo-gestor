import Api from "./api";
import { IUser, UserInput } from "./types/user";

interface UserListResponse {
  users: IUser[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

class Userservice extends Api {
  async getUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<UserListResponse> {
    return this.get<UserListResponse>(`/users?page=${page}&limit=${limit}`);
  }

  async getUserById(id: string): Promise<IUser> {
    return this.get<IUser>(`/users/${id}`);
  }

  async createUser(UserData: UserInput): Promise<IUser> {
    return this.post<IUser>("/users", UserData);
  }

  async updateUser(id: string, UserData: Partial<UserInput>): Promise<IUser> {
    return this.put<IUser>(`/users/${id}`, UserData);
  }

  async deleteUser(id: string): Promise<void> {
    return this.delete<void>(`/users/${id}`);
  }

  async getLocations(): Promise<UserListResponse> {
    return this.get<UserListResponse>("/users/locations");
  }

  async inviteUser(email: string): Promise<void> {
    return this.post<void>("/users/invite", { email });
  }
}

export default new Userservice();
