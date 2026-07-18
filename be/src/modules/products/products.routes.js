import express from "express"
import { fetchHomeProductsController, fetchProductController, fetchSingleProductController } from "./products.controller.js";

const router = express.Router();

router.get("/products", fetchProductController)
router.get("/products/:id", fetchSingleProductController)
router.get("/home", fetchHomeProductsController)

export default router;