export type Role = "admin" | "user";

export interface User {
  uid: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role?: Role;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword?: string;
  phone?: string;
  role?: Role;
}

export interface FirebaseError {
  code?: string;
  message?: string;
}
