
export interface User {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    companyId: number | null;
}

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
    companyId: number;
}
