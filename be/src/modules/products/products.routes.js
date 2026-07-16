import express from "express"
import { fetchProductController } from "./products.controller.js";

const router = express.Router();

router.get("/products", fetchProductController)

export default router;