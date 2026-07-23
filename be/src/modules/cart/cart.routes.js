import express from "express";
import { addToCartController, getCartController, updateCartController } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/cart", authMiddleware, addToCartController);
router.get("/cart", authMiddleware, getCartController);
router.patch("/cart", authMiddleware, updateCartController);
// router.delete("/cart", authMiddleware, deleteCartController);

export default router;