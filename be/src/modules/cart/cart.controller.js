import { addToCartService } from "./cart.service";

export const addToCartController = async(res, req) => {
    try {
        const { pId } = req.body;
        const { userId } = req.user.id;
        const result =  addToCartService(pId, userId); 
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