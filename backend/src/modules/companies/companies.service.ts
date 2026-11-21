
import conexao from "../../config/database.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

import type {
    Company,
    UpdateCompany
} from "./companies.types.js";

interface DatabaseCompany extends RowDataPacket {
    id: number;
    corporateName: string;
    tradeName: string;
    cnpj: string;
    email: string | null;
    phone: string | null;
    status: "ACTIVE" | "INACTIVE";
    createdAt: Date;
}

export class CompaniesService {

    async getById(id: number): Promise<Company | null> {
        const [empresas] = await conexao.execute<DatabaseCompany[]>(
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
            FROM empresas
            WHERE id_empresa = ?
            LIMIT 1`,
            [id]
        );

        return empresas[0] ?? null;
    }

    async update(
        id: number,
        data: UpdateCompany
    ): Promise<Company | null> {

        const [resultado] =
            await conexao.execute<ResultSetHeader>(
                `UPDATE empresas
                SET
                    razao_social = ?,
                    nome_fantasia = ?,
                    email = ?,
                    telefone = ?
                WHERE id_empresa = ?
                  AND situacao = 'ATIVA'`,
                [
                    data.corporateName,
                    data.tradeName,
                    data.email,
                    data.phone,
                    id
                ]
            );

        if (resultado.affectedRows === 0) {
            return null;
        }

        return this.getById(id);
    }
}
