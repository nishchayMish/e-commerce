import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getCartController } from "../cart/cart.controller.js";

const router = express.Router();

router.get("/checkout", authMiddleware, getCartController)

export default router;