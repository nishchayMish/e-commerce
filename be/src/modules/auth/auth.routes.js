import express from "express";
import { fetchMeController, forgotPasswordController, loginController, RegisterController, resetPasswordController, verifyOtpController } from "./auth.controller.js";
import { sanitizedLoginInput, sanitizedRegisterInput, sanitizedVerifyOtpInput } from "./auth.sanitizedInput.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", sanitizedRegisterInput ,RegisterController);
router.post("/verify-otp", sanitizedVerifyOtpInput, verifyOtpController);
router.post("/login", sanitizedLoginInput, loginController);
router.get("/me", authMiddleware, fetchMeController)
router.post("/forgot-password", forgotPasswordController)
router.post("/reset-password", resetPasswordController)

export default router;