import type { Request, Response } from "express";
import { ProvisioningService } from "./provisioning.service.js";

const provisioningService = new ProvisioningService();

export class ProvisioningController {

    async create(
        req: Request,
        res: Response
    ): Promise<void> {

        const {
            corporateName,
            tradeName,
            cnpj,
            email,
            phone,
            admin
        } = req.body ?? {};

        if (
            typeof corporateName !== "string" ||
            !corporateName.trim() ||
            typeof tradeName !== "string" ||
            !tradeName.trim() ||
            typeof cnpj !== "string" ||
            !/^\d{14}$/.test(cnpj) ||
            (email != null && typeof email !== "string") ||
            (phone != null && typeof phone !== "string") ||
            !admin ||
            typeof admin !== "object" ||
            Array.isArray(admin) ||
            typeof admin.name !== "string" ||
            !admin.name.trim() ||
            typeof admin.email !== "string" ||
            !admin.email.trim() ||
            typeof admin.password !== "string" ||
            admin.password.length < 8 ||
            admin.password.length > 72
        ) {
            res.status(400).json({
                message: "Dados de provisionamento inválidos."
            });
            return;
        }

        const normalizedEmail = admin.email.trim().toLowerCase();

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
        ) {
            res.status(400).json({
                message: "Email do administrador inválido."
            });
            return;
        }

        const companyEmail = email?.trim() || null;

        if (
            companyEmail &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail)
        ) {
            res.status(400).json({
                message: "Email da empresa inválido."
            });
            return;
        }

        try {
            const result = await provisioningService.provision({
                corporateName: corporateName.trim(),
                tradeName: tradeName.trim(),
                cnpj,
                email: companyEmail,
                phone: phone?.trim() || null,
                admin: {
                    name: admin.name.trim(),
                    email: normalizedEmail,
                    password: admin.password
                }
            });

            res.status(201).json({
                message: "Empresa e administrador cadastrados com sucesso.",
                ...result
            });

        } catch (erro: unknown) {

            if (
                typeof erro === "object" &&
                erro !== null &&
                "code" in erro &&
                erro.code === "ER_DUP_ENTRY"
            ) {
                res.status(409).json({
                    message: "CNPJ ou email já cadastrado."
                });
                return;
            }

            console.error("Erro no provisionamento:", erro);

            res.status(500).json({
                message: "Erro interno ao cadastrar empresa."
            });
        }
    }
}
