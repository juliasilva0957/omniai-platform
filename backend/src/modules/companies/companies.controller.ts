
import type { Request, Response } from "express";
import { CompaniesService } from "./companies.service.js";

const companiesService = new CompaniesService();

export class CompaniesController {

    async getAll(req: Request, res: Response) {
        try {
            const companies = await companiesService.getAll();

            res.status(200).json(companies);
        } catch (erro) {
            console.error("Erro ao buscar empresas:", erro);

            res.status(500).json({
                message: "Erro interno ao buscar empresas."
            });
        }
    }


    async create(req: Request, res: Response) {
        const {
            corporateName,
            tradeName,
            cnpj,
            email,
            phone
        } = req.body;

        if (
            typeof corporateName !== "string" ||
            !corporateName.trim() ||
            typeof tradeName !== "string" ||
            !tradeName.trim() ||
            typeof cnpj !== "string" ||
            !/^\d{14}$/.test(cnpj) ||
            typeof email !== "string" ||
            !email.trim() ||
            (phone != null && typeof phone !== "string")
        ) {
            res.status(400).json({
                message: "Dados inválidos para cadastro da empresa."
            });
            return;
        }

        try {
            const company = await companiesService.create({
                corporateName: corporateName.trim(),
                tradeName: tradeName.trim(),
                cnpj,
                email: email.trim(),
                phone: phone ?? null
            });

            res.status(201).json(company);

        } catch (erro) {
            const erroBanco = erro as { code?: string };

            if (erroBanco.code === "ER_DUP_ENTRY") {
                res.status(409).json({
                    message: "Este CNPJ já está cadastrado."
                });
                return;
            }

            console.error("Erro ao cadastrar empresa:", erro);

            res.status(500).json({
                message: "Erro interno ao cadastrar empresa."
            });
        }
    }

}
