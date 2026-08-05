import { getCartService } from "../cart/cart.service.js";
import { creatOrderService, orderCheckoutService } from "./orders.service.js";

export const orderCheckoutController = async(req, res) => {
    try {
        const { fullName, phone, addressLine, city, state, pincode, paymentMethod } = req.body;
        const userId = req.user.id

        const data = await orderCheckoutService(fullName, phone, addressLine, city, state, pincode, userId);
        return res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}

export const createOrderController = async(req, res) => {
    try {
        const userId = req.user.id;
        const data = await getCartService(userId);
        const finalPrice = await creatOrderService(data);
        return res.status(200).json({
            finalPrice
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}