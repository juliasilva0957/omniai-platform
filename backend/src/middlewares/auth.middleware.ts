
import type {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";
import type { RowDataPacket } from "mysql2";

import conexao from "../config/database.js";

interface DatabaseAuthUser extends RowDataPacket {
    id: number;
    role: "USER" | "ADMIN";
    companyId: number;
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {

    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        res.status(401).json({
            message: "Token de autenticação não fornecido."
        });
        return;
    }

    const token = authorization.slice(7);
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error("JWT_SECRET não configurada.");

        res.status(500).json({
            message: "Erro interno de autenticação."
        });
        return;
    }

    let userId: number;
    let tokenCompanyId: number;

    try {
        const decoded = jwt.verify(token, secret, {
            algorithms: ["HS256"]
        });

        if (
            typeof decoded === "string" ||
            typeof decoded.sub !== "string" ||
            !/^[1-9]\d*$/.test(decoded.sub) ||
            !Number.isSafeInteger(decoded.companyId) ||
            decoded.companyId <= 0 ||
            (decoded.role !== "USER" &&
             decoded.role !== "ADMIN")
        ) {
            res.status(401).json({
                message: "Token inválido."
            });
            return;
        }

        userId = Number(decoded.sub);
        tokenCompanyId = decoded.companyId;

        if (!Number.isSafeInteger(userId)) {
            res.status(401).json({
                message: "Token inválido."
            });
            return;
        }

    } catch {
        res.status(401).json({
            message: "Token inválido ou expirado."
        });
        return;
    }

    try {
        const [usuarios] =
            await conexao.execute<DatabaseAuthUser[]>(
                `SELECT
                    u.id_usuario AS id,
                    CASE
                        WHEN u.perfil = 'ADMINISTRADOR'
                            THEN 'ADMIN'
                        ELSE 'USER'
                    END AS role,
                    u.fk_empresa AS companyId
                FROM usuarios u
                INNER JOIN empresas e
                    ON u.fk_empresa = e.id_empresa
                WHERE u.id_usuario = ?
                  AND u.fk_empresa = ?
                  AND e.situacao = 'ATIVA'
                LIMIT 1`,
                [userId, tokenCompanyId]
            );

        const usuario = usuarios[0];

        if (!usuario) {
            res.status(401).json({
                message: "Usuário ou empresa sem acesso ativo."
            });
            return;
        }

        res.locals.user = {
            id: usuario.id,
            role: usuario.role,
            companyId: usuario.companyId
        };

        next();

    } catch (erro) {
        console.error("Erro ao validar autenticação:", erro);

        res.status(500).json({
            message: "Erro interno de autenticação."
        });
    }
}
