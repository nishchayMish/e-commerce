export const sanitizedCheckoutDetilsInput = (req, res, next) => {
    const { fullName, phone, addressLine, city, state, pincode, paymentMethod } = req.body;

    // 1. Full Name Validation
    if (!fullName || !fullName.trim()) {
        return res.status(400).json({ message: "name is required" });
    }

    if (!phone || !phone.trim()) {
        return res.status(400).json({ message: "phone is required" });
    }
    if (phone.trim().length < 10) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!addressLine || !addressLine.trim()) {
        return res.status(400).json({ message: "addressLine is required" });
    }
    if (!city || !city.trim()) {
        return res.status(400).json({ message: "city is required" });
    }
    if (!state || !state.trim()) {
        return res.status(400).json({ message: "state is required" });
    }

    if (!pincode || !pincode.trim()) {
        return res.status(400).json({ message: "pincode is required" });
    }
    
    if (pincode.trim().length !== 6) { 
        return res.status(400).json({ message: "Invalid pincode" });
    }

    next();
}

export const sanitizedCreateOrderInput = (req, res, next) => {
    const acceptedPaymentMethods = ['UPI', 'CARD', 'COD'];
    const { paymentMethod, orderId } = req.body; 
    if (paymentMethod != null && String(paymentMethod).trim()) {
        if (!acceptedPaymentMethods.includes(String(paymentMethod).trim())) {
            return res.status(400).json({ message: "Invalid payment method" });
        }
    }

    if(!orderId){
        return res.status(400).json({ message: "orderId is required" });
    }

    next();
}