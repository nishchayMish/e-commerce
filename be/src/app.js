import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import productRoutes from "./modules/products/products.routes.js";
import cors from "cors";

export const app = express();

app.use(cors({
    // origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use("/", authRoutes);
app.use("/", productRoutes);

app.get("/ping", (req, res) => {
    res.send({message: "pong"})
})

