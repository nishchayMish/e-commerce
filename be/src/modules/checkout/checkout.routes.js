import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/checkout", authMiddleware)

export default router;