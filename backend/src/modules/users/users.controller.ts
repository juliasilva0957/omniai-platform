
import type { Request, Response } from "express";
import { UsersService } from "./users.service.js";

const usersService = new UsersService();

export class UsersController {
    async getAll(req: Request, res: Response) {
        try {
            const users = await usersService.getAll();

            res.status(200).json(users);
        } catch (erro) {
            console.error("Erro ao buscar usuários:", erro);

            res.status(500).json({
                message: "Erro interno ao buscar usuários."
            });
        }
    }



    async getById(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: "ID inválido."
            });
            return;
        }

        try {
            const user = await usersService.getById(id);

            if (!user) {
                res.status(404).json({
                    message: "Usuário não encontrado."
                });
                return;
            }

            res.status(200).json(user);
        } catch (erro) {
            console.error("Erro ao buscar usuário:", erro);

            res.status(500).json({
                message: "Erro interno ao buscar usuário."
            });
        }
    }


    async create(req: Request, res: Response) {
        const { name, email, role } = req.body;

        if (
            typeof name !== "string" || !name.trim() ||
            typeof email !== "string" || !email.trim() ||
            (role !== "USER" && role !== "ADMIN")
        ) {
            res.status(400).json({
                message: "Dados inválidos. Informe nome, email e role."
            });
            return;
        }

        try {
            const newUser = await usersService.create({
                name: name.trim(),
                email: email.trim(),
                role
            });

            res.status(201).json(newUser);
        }
        catch (erro) {
            const erroBanco = erro as { code?: string };

            if (erroBanco.code === "ER_DUP_ENTRY") {
                res.status(409).json({
                    message: "Este email já está cadastrado."
                });
                return;
            }

            console.error("Erro ao cadastrar usuário:", erro);

            res.status(500).json({
                message: "Erro interno ao cadastrar usuário."
            });
        }

    }



}
