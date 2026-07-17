import express from "express";
import { fetchMeController, loginController, RegisterController } from "./auth.controller.js";
import { sanitizedLoginInput, sanitizedRegisterInput } from "./auth.sanitizedInput.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", sanitizedRegisterInput ,RegisterController);
router.post("/login", sanitizedLoginInput, loginController);
router.get("/me", authMiddleware, fetchMeController)

export default router;