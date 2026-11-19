
import conexao from "../../config/database.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { Company, CreateCompany } from "./companies.types.js";

export class CompaniesService {

    async getAll(): Promise<Company[]> {
        const [empresas] = await conexao.execute<RowDataPacket[]>(
            `SELECT
                id_empresa AS id,
                razao_social AS corporateName,
                nome_fantasia AS tradeName,
                cnpj,
                email,
                telefone AS phone,
                CASE
                    WHEN situacao = 'ATIVA' THEN 'ACTIVE'
                    ELSE 'INACTIVE'
                END AS status,
                data_criacao AS createdAt
             FROM empresas`
        );

        return empresas as Company[];
    }


async create(data: CreateCompany): Promise<Company> {
    const [resultado] = await conexao.execute<ResultSetHeader>(
        `INSERT INTO empresas (
            razao_social,
            nome_fantasia,
            cnpj,
            email,
            telefone
        ) VALUES (?, ?, ?, ?, ?)`,
        [
            data.corporateName,
            data.tradeName,
            data.cnpj,
            data.email,
            data.phone
        ]
    );

    return {
        id: resultado.insertId,
        corporateName: data.corporateName,
        tradeName: data.tradeName,
        cnpj: data.cnpj,
        email: data.email,
        phone: data.phone,
        status: "ACTIVE",
        createdAt: new Date()
    };
}

}
