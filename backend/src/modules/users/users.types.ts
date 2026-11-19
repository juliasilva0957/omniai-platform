
export interface User {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
}

export type CreateUser = Omit<User, "id">;
