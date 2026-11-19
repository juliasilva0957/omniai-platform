
import { Router } from "express";
import { CompaniesController } from "./companies.controller.js";

const router = Router();

const companiesController = new CompaniesController();

router.get("/", (req, res) =>
    companiesController.getAll(req, res)
);

router.post("/", (req, res) =>
    companiesController.create(req, res)
);


export default router;
