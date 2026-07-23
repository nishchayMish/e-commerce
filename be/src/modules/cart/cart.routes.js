import express from "express";
import { addToCartController, getCartController } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/cart", authMiddleware, addToCartController);
router.get("/cart", authMiddleware, getCartController);

export default router;