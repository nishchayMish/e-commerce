import { fetchMeService, forgotPasswordService, loginService, registerService, resetPasswordService, verifyOtpService } from "./auth.service.js";

export const loginController = async(req, res) => {
    try {   
        const { email, password } = req.body;
        const { token, userPayload } = await loginService(email, password)

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            user: userPayload,
        });

    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}

export const verifyOtpController = async(req, res) => {
    try {
        const {id, otp} = req.body;
        const result = await verifyOtpService(id, otp);
        res.status(201).send(result);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })   
    }
}

export const RegisterController = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await registerService(username, email, password)
        res.status(200).send(result)
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}

export const fetchMeController = async(req, res) => {
    try {
        const userId = req.user.id;
        const result = await fetchMeService(userId);
        res.status(200).json({
            message: "user fetched successfully",
            result
        })
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}

export const forgotPasswordController = async(req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        const result = await forgotPasswordService(email);
        res.status(200).send(result)
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
    
}

export const resetPasswordController = async(req, res) => {
    try {
        const { email, otp, password } = req.body;
        const result = await resetPasswordService(email, otp, password);
        res.status(200).send(result)
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
    
}