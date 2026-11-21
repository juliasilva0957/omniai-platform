
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    companyId: number;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}
