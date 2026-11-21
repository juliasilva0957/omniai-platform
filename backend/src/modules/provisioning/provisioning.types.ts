export interface CreateCompanyAdmin {
    name: string;
    email: string;
    password: string;
}

export interface ProvisionCompany {
    corporateName: string;
    tradeName: string;
    cnpj: string;
    email: string | null;
    phone: string | null;
    admin: CreateCompanyAdmin;
}

export interface ProvisionResult {
    company: {
        id: number;
        corporateName: string;
        tradeName: string;
        cnpj: string;
    };
    admin: {
        id: number;
        name: string;
        email: string;
        role: "ADMIN";
        companyId: number;
    };
}
