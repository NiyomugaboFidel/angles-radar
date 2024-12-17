import express from "express";
import {
  createInvestorProfile,
  getAllInvestorProfiles,
  getInvestorProfileById,
  updateInvestorProfile,
  deleteInvestorProfile,
  getInvestorProfilesByFilter,
} from "../../controllers/investor.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", authMiddleware, createInvestorProfile); 
router.get("/", authMiddleware, getAllInvestorProfiles); 
router.get("/filter", authMiddleware, getInvestorProfilesByFilter); 
router.get("/:id",authMiddleware, getInvestorProfileById); 
router.put("/:id", authMiddleware, updateInvestorProfile); 
router.delete("/:id", authMiddleware, deleteInvestorProfile); 

export default router;
