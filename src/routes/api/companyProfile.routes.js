import express from "express";
import CompanyProfileController from "../../controllers/companyProfile.controller.js";
import { upload } from "../../configs/multer.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

const uploadFields = upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]);
  

router.post("/company-profiles", authMiddleware, uploadFields, CompanyProfileController.createCompanyProfile);

router.get("/company-profiles",authMiddleware, CompanyProfileController.getAllCompanyProfiles);

router.get("/company-profiles/:id", authMiddleware, CompanyProfileController.getCompanyProfileById);

router.get("/search", authMiddleware, CompanyProfileController.getFilteredCompanyProfiles);

router.put("/company-profiles/:id",authMiddleware,  CompanyProfileController.updateCompanyProfile);

router.delete("/company-profiles/:id", authMiddleware, CompanyProfileController.deleteCompanyProfile);

export default router;
