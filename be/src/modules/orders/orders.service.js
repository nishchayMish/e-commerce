import { razorpay } from "../../utils/paymentGateway.js";
import { createOrder, getUserAddress, insertUserAddress } from "./orders.repository.js";

export const getUserAddressService = async(userId) => {
    return await getUserAddress(userId);
}

export const orderCheckoutService = async(fullName, phone, addressLine, city, state, pincode, userId) => {
    return await insertUserAddress(fullName, phone, addressLine, city, state, pincode, userId);
}

export const creatOrderService = async(data, paymentMethod, userId, dbOrderId) => {
    if (!data || data.length === 0) {
        throw{
            statusCode: 400,
            message: "Cannot checkout empty cart"
        }
    }

    const userAddress = await getUserAddress(userId);

    if(!userAddress){
        throw{
            statusCode: 400,
            message: "User address cannot be empty"
        }
    }
    const finalPrice = data.reduce((total, item) => total + (item.quantity * item.price), 0);
    
    switch (paymentMethod) {
        case "UPI": {
            const razorpayOrder = await razorpay.orders.create({
                amount: Math.round(finalPrice * 100),
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            })

            return await createOrder(dbOrderId, razorpayOrder.id, finalPrice, "UPI", "PENDING", userId);
        }

        case "COD": {
            return await createOrder(dbOrderId, null, finalPrice, "COD", "PENDING", userId);
        }
            
        default:
            throw{
                statusCode: 400,
                message: "Invalid payment method"
            }
        break;
    }
}

