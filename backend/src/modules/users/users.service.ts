
import conexao from "../../config/database.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { User, CreateUser } from "./users.types.js";

export class UsersService {

    async getAll(): Promise<User[]> {
        const [usuarios] = await conexao.execute<RowDataPacket[]>(
            `SELECT
                id_usuario AS id,
                nome AS name,
                email,
                CASE
                    WHEN perfil = 'ADMINISTRADOR' THEN 'ADMIN'
                    ELSE 'USER'
                END AS role
             FROM usuarios`
        );

        return usuarios as User[];
    }

    async getById(id: number): Promise<User | undefined> {
        const [usuarios] = await conexao.execute<RowDataPacket[]>(
            `SELECT
                id_usuario AS id,
                nome AS name,
                email,
                CASE
                    WHEN perfil = 'ADMINISTRADOR' THEN 'ADMIN'
                    ELSE 'USER'
                END AS role
             FROM usuarios
             WHERE id_usuario = ?`,
            [id]
        );

        return usuarios[0] as User | undefined;
    }

    async create(data: CreateUser): Promise<User> {
        const perfil = data.role === "ADMIN"
            ? "ADMINISTRADOR"
            : "USUARIO";

        const [resultado] = await conexao.execute<ResultSetHeader>(
            `INSERT INTO usuarios (nome, email, perfil)
             VALUES (?, ?, ?)`,
            [data.name, data.email, perfil]
        );

        return {
            id: resultado.insertId,
            name: data.name,
            email: data.email,
            role: data.role
        };
    }
}
