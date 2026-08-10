import { getCartService } from "../cart/cart.service.js";
import { creatOrderService, getUserAddressService, orderCheckoutService } from "./orders.service.js";

export const getUserAddressController = async(req, res) => {
    try {
        const userId = req.user.id;
        const address = await getUserAddressService(userId);

        if (!address) {
            return res.status(200).json({
                address: null
            });
        }
        return res.status(200).json({
            address
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}

export const orderCheckoutController = async(req, res) => {
    try {
        const { fullName, phone, addressLine, city, state, pincode } = req.body;
        const userId = req.user.id

        const data = await orderCheckoutService(fullName, phone, addressLine, city, state, pincode, userId);
        return res.status(200).json({
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
        const { paymentMethod, orderId } = req.body;
        const data = await getCartService(userId);
        const order = await creatOrderService(data, paymentMethod, userId, orderId);
        return res.status(200).json({
            sucess: true,
            order
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}