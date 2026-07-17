import express from "express"
import { fetchProductController, fetchSingleProductController } from "./products.controller.js";

const router = express.Router();

router.get("/products", fetchProductController)
router.get("/products/:id", fetchSingleProductController)

export default router;