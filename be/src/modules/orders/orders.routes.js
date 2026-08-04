import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getCartController } from "../cart/cart.controller.js";

const router = express.Router();

router.get("/summary", authMiddleware, getCartController)

export default router;