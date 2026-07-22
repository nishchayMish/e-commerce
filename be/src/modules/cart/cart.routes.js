import express from "express";

const router = express.Router();

router.post("/cart", addToCartController);

export default router;