
import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();
const authController = new AuthController();

// Rota pública de login
router.post("/login", (req, res) =>
    authController.login(req, res)
);

// Rota para qualquer usuário autenticado
router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Usuário autenticado com sucesso.",
        user: res.locals.user
    });
});

// Rota exclusiva para administradores
router.get(
    "/admin",
    authMiddleware,
    requireRole("ADMIN"),
    (req, res) => {
        res.status(200).json({
            message: "Acesso de administrador autorizado.",
            user: res.locals.user
        });
    }
);

export default router;
