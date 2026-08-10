export const sanitizedCheckoutDetilsInput = (req, res, next) => {
    const { fullName, phone, addressLine, city, state, pincode, paymentMethod } = req.body;

    // 1. Full Name Validation
    if (!fullName || !fullName.trim()) {
        return res.status(400).json({ message: "name is required" });
    }

    if (!phone || !String(phone).trim()) {
        return res.status(400).json({ message: "phone is required" });
    }

    const digits = String(phone).replace(/\D/g, "");
    let local = digits;
    if (digits.length === 12 && digits.startsWith("91")) local = digits.slice(2);
    else if (digits.length === 11 && digits.startsWith("0")) local = digits.slice(1);
    else if (digits.length > 10 && digits.startsWith("91")) local = digits.slice(-10);

    if (!/^[6-9]\d{9}$/.test(local)) {
        return res.status(400).json({ message: "Enter a valid 10-digit Indian mobile number" });
    }
    req.body.phone = `+91${local}`;

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