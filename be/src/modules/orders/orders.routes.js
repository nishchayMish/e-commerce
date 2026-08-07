import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getCartController } from "../cart/cart.controller.js";
import { createOrderController, getUserAddressController, orderCheckoutController } from "./orders.controller.js";
import { sanitizedCheckoutDetilsInput } from "./orders.sanitizedInput.js";

const router = express.Router();
router.get("/address", authMiddleware, getUserAddressController);
router.post("/checkout", sanitizedCheckoutDetilsInput, authMiddleware, orderCheckoutController);
router.get("/summary", authMiddleware, getCartController);
router.post("/", authMiddleware, createOrderController);

export default router;