
import type { Request, Response } from "express";
import { CompaniesService } from "./companies.service.js";

const companiesService = new CompaniesService();

function getCompanyId(res: Response): number | null {
    const companyId = res.locals.user?.companyId;

    return typeof companyId === "number" &&
        Number.isSafeInteger(companyId) &&
        companyId > 0
        ? companyId
        : null;
}

export class CompaniesController {

    async getMyCompany(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const companyId = getCompanyId(res);

            if (companyId === null) {
                res.status(401).json({
                    message: "Empresa não identificada."
                });
                return;
            }

            const empresa = await companiesService.getById(
                companyId
            );

            if (!empresa || empresa.status !== "ACTIVE") {
                res.status(404).json({
                    message: "Empresa ativa não encontrada."
                });
                return;
            }

            res.status(200).json(empresa);

        } catch (erro) {
            console.error("Erro ao consultar empresa:", erro);

            res.status(500).json({
                message: "Erro interno ao consultar empresa."
            });
        }
    }

    async updateMyCompany(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const companyId = getCompanyId(res);

            if (companyId === null) {
                res.status(401).json({
                    message: "Empresa não identificada."
                });
                return;
            }

            const {
                corporateName,
                tradeName,
                email,
                phone
            } = req.body ?? {};

            if (
                typeof corporateName !== "string" ||
                !corporateName.trim() ||
                typeof tradeName !== "string" ||
                !tradeName.trim() ||
                (email != null && typeof email !== "string") ||
                (phone != null && typeof phone !== "string")
            ) {
                res.status(400).json({
                    message: "Dados cadastrais inválidos."
                });
                return;
            }

            const normalizedEmail = email?.trim() || null;
            const normalizedPhone = phone?.trim() || null;

            if (
                normalizedEmail &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
            ) {
                res.status(400).json({
                    message: "Email inválido."
                });
                return;
            }

            const empresa = await companiesService.update(
                companyId,
                {
                    corporateName: corporateName.trim(),
                    tradeName: tradeName.trim(),
                    email: normalizedEmail,
                    phone: normalizedPhone
                }
            );

            if (!empresa) {
                res.status(404).json({
                    message: "Empresa ativa não encontrada."
                });
                return;
            }

            res.status(200).json(empresa);

        } catch (erro) {
            console.error("Erro ao atualizar empresa:", erro);

            res.status(500).json({
                message: "Erro interno ao atualizar empresa."
            });
        }
    }
}
