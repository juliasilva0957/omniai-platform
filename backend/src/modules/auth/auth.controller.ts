
import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export class AuthController {

    async login(req: Request, res: Response) {
        const { email, password } = req.body ?? {};

        // Validar os dados recebidos
        if (
            typeof email !== "string" ||
            !email.trim() ||
            typeof password !== "string" ||
            !password
        ) {
            res.status(400).json({
                message: "Email e senha são obrigatórios."
            });
            return;
        }

        try {
            // Verificar as credenciais no banco
            const result = await authService.login({
                email: email.trim(),
                password
            });

            // Email ou senha incorretos
            if (!result) {
                res.status(401).json({
                    message: "Email ou senha inválidos."
                });
                return;
            }

            // Login realizado com sucesso
            res.status(200).json(result);

        } catch (erro) {
            console.error("Erro ao realizar login:", erro);

            res.status(500).json({
                message: "Erro interno ao realizar login."
            });
        }
    }
}
