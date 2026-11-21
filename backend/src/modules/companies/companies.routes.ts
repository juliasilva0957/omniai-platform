
import { Router } from "express";
import { CompaniesController } from "./companies.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();
const companiesController = new CompaniesController();

// Todas as rotas exigem autenticação
router.use(authMiddleware);

// Somente administradores podem gerenciar a empresa
router.use(requireRole("ADMIN"));

// Consultar a própria empresa
router.get("/me", (req, res) =>
    companiesController.getMyCompany(req, res)
);

// Atualizar a própria empresa
router.put("/me", (req, res) =>
    companiesController.updateMyCompany(req, res)
);

export default router;
