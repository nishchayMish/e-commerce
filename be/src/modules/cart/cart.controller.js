import { addToCartService } from "./cart.service.js";

export const addToCartController = async(req, res) => {
    try {
        const { pId } = req.body;
        const userId = req.user.id;

        const result =  await addToCartService(pId, userId); 
        res.status(201).json({
            message: "product added to cart",
            result
        })
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}