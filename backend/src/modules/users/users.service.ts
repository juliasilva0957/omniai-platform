
import conexao from "../../config/database.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";

import type { User, CreateUser } from "./users.types.js";

interface DatabaseUser extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    companyId: number;
}

export class UsersService {

    async getAll(companyId: number): Promise<User[]> {
        const [usuarios] = await conexao.execute<DatabaseUser[]>(
            `SELECT
                id_usuario AS id,
                nome AS name,
                email,
                CASE
                    WHEN perfil = 'ADMINISTRADOR' THEN 'ADMIN'
                    ELSE 'USER'
                END AS role,
                fk_empresa AS companyId
            FROM usuarios
            WHERE fk_empresa = ?
            ORDER BY id_usuario`,
            [companyId]
        );

        return usuarios;
    }

    async getById(
        id: number,
        companyId: number
    ): Promise<User | null> {

        const [usuarios] = await conexao.execute<DatabaseUser[]>(
            `SELECT
                id_usuario AS id,
                nome AS name,
                email,
                CASE
                    WHEN perfil = 'ADMINISTRADOR' THEN 'ADMIN'
                    ELSE 'USER'
                END AS role,
                fk_empresa AS companyId
            FROM usuarios
            WHERE id_usuario = ?
              AND fk_empresa = ?
            LIMIT 1`,
            [id, companyId]
        );

        return usuarios[0] ?? null;
    }

    async create(data: CreateUser): Promise<User> {
        const passwordHash = await bcrypt.hash(
            data.password,
            12
        );

        const databaseRole =
            data.role === "ADMIN"
                ? "ADMINISTRADOR"
                : "USUARIO";

        const [resultado] =
            await conexao.execute<ResultSetHeader>(
                `INSERT INTO usuarios
                    (nome, email, senha_hash, perfil, fk_empresa)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    data.name,
                    data.email,
                    passwordHash,
                    databaseRole,
                    data.companyId
                ]
            );

        return {
            id: resultado.insertId,
            name: data.name,
            email: data.email,
            role: data.role,
            companyId: data.companyId
        };
    }
}
