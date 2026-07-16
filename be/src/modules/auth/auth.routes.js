import express from "express";
import { loginController, RegisterController } from "./auth.controller.js";
import { sanitizedLoginInput, sanitizedRegisterInput } from "./auth.sanitizedInput.js";

const router = express.Router();

router.post("/register", sanitizedRegisterInput ,RegisterController);
router.post("/login", sanitizedLoginInput, loginController);

export default router;