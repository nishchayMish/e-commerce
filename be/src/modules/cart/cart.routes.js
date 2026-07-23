import express from "express";
import { addToCartController } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/cart", authMiddleware, addToCartController);

export default router;