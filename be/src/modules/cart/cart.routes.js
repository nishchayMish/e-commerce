import express from "express";
import { addToCartController, deleteCartController, getCartController, updateCartController } from "./cart.controller.js";
import { sanitizedAddToCart, sanitizedDeleteFromCart, updateCartSanitizedInput } from "./cart.sanitizedInput.js";
import { optionalAuthMiddleware } from "../../middlewares/optionalAuthMiddleware.js";

const router = express.Router();

router.post("/cart", optionalAuthMiddleware, sanitizedAddToCart, addToCartController);
router.get("/cart", optionalAuthMiddleware, getCartController);
router.patch("/cart/:pId", optionalAuthMiddleware, updateCartSanitizedInput, updateCartController);
router.delete("/cart/:pId", optionalAuthMiddleware, sanitizedDeleteFromCart, deleteCartController);

export default router;