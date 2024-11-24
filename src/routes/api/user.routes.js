import express from "express";
import { createUser, editUserProfile, loginUser } from "../../controllers/auth.controller.js";
 const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);

router.put("/profile/:id", editUserProfile);

export default router;
