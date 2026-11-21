
import type { Request, Response } from "express";
import { UsersService } from "./users.service.js";

const usersService = new UsersService();

function getCompanyId(res: Response): number | null {
    const companyId = res.locals.user?.companyId;

    return typeof companyId === "number" &&
        Number.isSafeInteger(companyId) &&
        companyId > 0
        ? companyId
        : null;
}

export class UsersController {

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const companyId = getCompanyId(res);

            if (companyId === null) {
                res.status(401).json({
                    message: "Empresa não identificada."
                });
                return;
            }

            const usuarios = await usersService.getAll(companyId);

            res.status(200).json(usuarios);

        } catch (erro) {
            console.error("Erro ao listar usuários:", erro);

            res.status(500).json({
                message: "Erro interno ao listar usuários."
            });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const companyId = getCompanyId(res);

            if (!Number.isSafeInteger(id) || id <= 0) {
                res.status(400).json({
                    message: "ID do usuário inválido."
                });
                return;
            }

            if (companyId === null) {
                res.status(401).json({
                    message: "Empresa não identificada."
                });
                return;
            }

            const usuario = await usersService.getById(
                id,
                companyId
            );

            if (!usuario) {
                res.status(404).json({
                    message: "Usuário não encontrado."
                });
                return;
            }

            res.status(200).json(usuario);

        } catch (erro) {
            console.error("Erro ao buscar usuário:", erro);

            res.status(500).json({
                message: "Erro interno ao buscar usuário."
            });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const companyId = getCompanyId(res);
            const { name, email, password, role } = req.body ?? {};

            if (companyId === null) {
                res.status(401).json({
                    message: "Empresa não identificada."
                });
                return;
            }

            if (
                typeof name !== "string" ||
                !name.trim() ||
                typeof email !== "string" ||
                !email.trim() ||
                typeof password !== "string" ||
                password.length < 8 ||
                password.length > 72 ||
                (role !== "USER" && role !== "ADMIN")
            ) {
                res.status(400).json({
                    message: "Dados inválidos. Informe nome, email, senha de 8 a 72 caracteres e perfil USER ou ADMIN."
                });
                return;
            }

            const normalizedEmail = email.trim().toLowerCase();

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
            ) {
                res.status(400).json({
                    message: "Email inválido."
                });
                return;
            }

            // companyId vem exclusivamente do JWT,
            // nunca do corpo da requisição.
            const usuario = await usersService.create({
                name: name.trim(),
                email: normalizedEmail,
                password,
                role,
                companyId
            });

            res.status(201).json(usuario);

        } catch (erro: unknown) {
            if (
                typeof erro === "object" &&
                erro !== null &&
                "code" in erro &&
                erro.code === "ER_DUP_ENTRY"
            ) {
                res.status(409).json({
                    message: "Email já cadastrado."
                });
                return;
            }

            console.error("Erro ao criar usuário:", erro);

            res.status(500).json({
                message: "Erro interno ao criar usuário."
            });
        }
    }
}
