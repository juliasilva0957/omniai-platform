
export interface Company {
    id: number;
    corporateName: string;
    tradeName: string;
    cnpj: string;
    email: string;
    phone: string | null;
    status: "ACTIVE" | "INACTIVE";
    createdAt: Date;
}

export type CreateCompany = Pick<
    Company,
    "corporateName" | "tradeName" | "cnpj" | "email" | "phone"
>;
