export type CompanyStatus = "ACTIVE" | "INACTIVE";

export interface Company {
    id: number;
    corporateName: string;
    tradeName: string;
    cnpj: string;
    email: string | null;
    phone: string | null;
    status: CompanyStatus;
    createdAt: Date;
}

export interface CreateCompany {
    corporateName: string;
    tradeName: string;
    cnpj: string;
    email?: string | null;
    phone?: string | null;
}

export interface UpdateCompany {
    corporateName: string;
    tradeName: string;
    email: string | null;
    phone: string | null;
}
