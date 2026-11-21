
import conexao from "../../config/database.js";
import type { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type {
    LoginCredentials,
    AuthUser,
    AuthResponse
} from "./auth.types.js";

interface DatabaseUser extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    companyId: number | null;
    passwordHash: string | null;
}

export class AuthService {

    async login(
        credentials: LoginCredentials
    ): Promise<AuthResponse | null> {

        const [usuarios] = await conexao.execute<DatabaseUser[]>(
            `SELECT
                u.id_usuario AS id,
                u.nome AS name,
                u.email,
                CASE
                    WHEN u.perfil = 'ADMINISTRADOR' THEN 'ADMIN'
                    ELSE 'USER'
                END AS role,
                u.fk_empresa AS companyId,
                u.senha_hash AS passwordHash
             FROM usuarios u
             INNER JOIN empresas e
                ON u.fk_empresa = e.id_empresa
             WHERE u.email = ?
               AND e.situacao = 'ATIVA'
             LIMIT 1`,
            [credentials.email]
        );

        const usuario = usuarios[0];

        if (!usuario || !usuario.passwordHash) {
            return null;
        }

        const senhaValida = await bcrypt.compare(
            credentials.password,
            usuario.passwordHash
        );

        if (!senhaValida || usuario.companyId === null) {
            return null;
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error(
                "JWT_SECRET não configurada no ambiente."
            );
        }

        const user: AuthUser = {
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            role: usuario.role,
            companyId: usuario.companyId
        };

        const token = jwt.sign(
            {
                role: user.role,
                companyId: user.companyId
            },
            secret,
            {
                subject: String(user.id),
                expiresIn: "1h",
                algorithm: "HS256"
            }
        );

        return {
            token,
            user
        };
    }
}
