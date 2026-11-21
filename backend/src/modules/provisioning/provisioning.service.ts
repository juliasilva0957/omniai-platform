
import conexao from "../../config/database.js";
import type { ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";

import type {
    ProvisionCompany,
    ProvisionResult
} from "./provisioning.types.js";

export class ProvisioningService {

    async provision(
        data: ProvisionCompany
    ): Promise<ProvisionResult> {

        const connection = await conexao.getConnection();

        try {
            await connection.beginTransaction();

            // 1. Cadastrar empresa
            const [companyResult] =
                await connection.execute<ResultSetHeader>(
                    `INSERT INTO empresas
                        (
                            razao_social,
                            nome_fantasia,
                            cnpj,
                            email,
                            telefone,
                            situacao
                        )
                    VALUES (?, ?, ?, ?, ?, 'ATIVA')`,
                    [
                        data.corporateName,
                        data.tradeName,
                        data.cnpj,
                        data.email,
                        data.phone
                    ]
                );

            const companyId = companyResult.insertId;

            // 2. Criptografar senha do administrador
            const passwordHash = await bcrypt.hash(
                data.admin.password,
                12
            );

            // 3. Cadastrar administrador
            const [adminResult] =
                await connection.execute<ResultSetHeader>(
                    `INSERT INTO usuarios
                        (
                            nome,
                            email,
                            senha_hash,
                            perfil,
                            fk_empresa
                        )
                    VALUES (?, ?, ?, 'ADMINISTRADOR', ?)`,
                    [
                        data.admin.name,
                        data.admin.email,
                        passwordHash,
                        companyId
                    ]
                );

            const adminId = adminResult.insertId;

            // 4. Confirmar transação
            await connection.commit();

            return {
                company: {
                    id: companyId,
                    corporateName: data.corporateName,
                    tradeName: data.tradeName,
                    cnpj: data.cnpj
                },
                admin: {
                    id: adminId,
                    name: data.admin.name,
                    email: data.admin.email,
                    role: "ADMIN",
                    companyId
                }
            };

        } catch (erro) {
            // Se qualquer operação falhar,
            // desfaz os cadastros da transação
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error(
                    "Erro ao desfazer provisionamento:",
                    rollbackError
                );
            }

            throw erro;

        } finally {
            connection.release();
        }
    }
}
