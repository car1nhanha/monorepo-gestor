export interface IUser {
  id: string;
  name: string;
  email: string;
  location: {
    lat: number;
    lng: number;
  };
  role: "volunteer" | "admin";
  created_at: string;
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
  };
}

export interface UserInput {
  name: string;
  email: string;
  cep: string;
}
