import express from "express";
import { addToCartController, deleteCartController, getCartController, updateCartController } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { sanitizedAddToCart, sanitizedDeleteFromCart, updateCartSanitizedInput } from "./cart.sanitizedInput.js";

const router = express.Router();

router.post("/cart", authMiddleware, sanitizedAddToCart, addToCartController);
router.get("/cart", authMiddleware, getCartController);
router.patch("/cart", authMiddleware, updateCartSanitizedInput, updateCartController);
router.delete("/cart", authMiddleware, sanitizedDeleteFromCart, deleteCartController);

export default router;