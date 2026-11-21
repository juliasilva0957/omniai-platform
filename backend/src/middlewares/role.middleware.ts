
import type {
    Request,
    Response,
    NextFunction
} from "express";

type Role = "USER" | "ADMIN";

export function requireRole(...allowedRoles: Role[]) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {

        const user = res.locals.user;

        if (!user) {
            res.status(401).json({
                message: "Usuário não autenticado."
            });
            return;
        }

        if (!allowedRoles.includes(user.role)) {
            res.status(403).json({
                message: "Você não tem permissão para acessar este recurso."
            });
            return;
        }

        next();
    };
}
