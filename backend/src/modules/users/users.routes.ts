
import { Router } from "express";
import { UsersController } from "./users.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();
const usersController = new UsersController();

// Todas as rotas exigem autenticação
router.use(authMiddleware);

// Somente administradores podem gerenciar usuários
router.use(requireRole("ADMIN"));

router.get("/", (req, res) =>
    usersController.getAll(req, res)
);

router.get("/:id", (req, res) =>
    usersController.getById(req, res)
);

router.post("/", (req, res) =>
    usersController.create(req, res)
);

export default router;
