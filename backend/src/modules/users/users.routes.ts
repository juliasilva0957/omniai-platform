
import { Router } from "express";
import { UsersController } from "./users.controller.js";

const router = Router();

const usersController = new UsersController();

router.get("/", (req, res) => {
    usersController.getAll(req, res);
});

router.get("/:id", (req, res) => {
    usersController.getById(req, res);
});

router.post("/", (req, res) => {
    usersController.create(req, res);
});
export default router;
