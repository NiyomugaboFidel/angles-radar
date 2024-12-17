import express from "express";
import CompanyController from "../../controllers/company.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, CompanyController.createCompany);

router.get("/", authMiddleware, CompanyController.getAllCompanies);

router.get("/:id", authMiddleware, CompanyController.getCompanyById);

router.put("/:id", authMiddleware, CompanyController.updateCompany);

router.delete("/:id", authMiddleware, CompanyController.deleteCompany);

export default router;
