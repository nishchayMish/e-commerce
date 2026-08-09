import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getCartController } from "../cart/cart.controller.js";
import { createOrderController, getUserAddressController, orderCheckoutController } from "./orders.controller.js";
import { sanitizedCheckoutDetilsInput, sanitizedCreateOrderInput } from "./orders.sanitizedInput.js";

const router = express.Router();
// user address ko fetch karega
router.get("/address", authMiddleware, getUserAddressController);

//user ke address ko post karega
router.post("/address", sanitizedCheckoutDetilsInput, authMiddleware, orderCheckoutController);

// cart ki final value dega
router.get("/summary", authMiddleware, getCartController);

// actual payment karwaega
router.post("/checkout", sanitizedCreateOrderInput, authMiddleware, createOrderController);

export default router;