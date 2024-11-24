import express from "express";
import { chooseRole, createUser, editUserProfile, getAllUsers, getUser, loginUser } from "../../controllers/auth.controller.js";
import createUserValidation from "../../validations/register.validation.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import editUserProfileValidation from "../../validations/editProfile.validation..js";
import loginValidation from "../../validations/login.validation.js";
 const router = express.Router();

router.post("/create", createUserValidation, createUser);
router.post("/login", loginValidation, loginUser);
router.put("/profile/:id",authMiddleware,editUserProfileValidation, editUserProfile);
router.put("/role", authMiddleware , chooseRole);
router.get("/:id", authMiddleware , getUser);
router.get("/", authMiddleware , getAllUsers);

export default router;
