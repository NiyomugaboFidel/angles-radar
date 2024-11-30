import express from "express";
import {
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
} from "../../controllers/account.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create
router.post("/", authMiddleware, createAccount);

// Read
router.get("/", authMiddleware, getAccounts);
router.get("/:id", authMiddleware, getAccountById);

// Update
router.put("/:id", authMiddleware, updateAccount);

// Delete
router.delete("/:id", authMiddleware, deleteAccount);

export default router;
