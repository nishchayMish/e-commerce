import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import productRoutes from "./modules/products/products.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import orderRoutes from "./modules/orders/orders.routes.js"
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/orders", orderRoutes);

app.get("/ping", (req, res) => {
    res.send({message: "pong"})
})

