import { insertUserAddress } from "./orders.repository.js";

export const orderCheckoutService = async(fullName, phone, addressLine, city, state, pincode, userId) => {
    return await insertUserAddress(fullName, phone, addressLine, city, state, pincode, userId);
}

export const creatOrderService = (data) => {
    if (!data || data.length === 0) {
        throw{
            statusCode: 400,
            message: "Cannot checkout empty cart"
        }
    }
    const finalPrice = data.reduce((total, item) => total + (item.quantity * item.price), 0)
    return finalPrice;
}

