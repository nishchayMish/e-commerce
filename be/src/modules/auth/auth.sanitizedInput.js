const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sanitizedRegisterInput = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username) {
        return res.status(400).json({
            message: "username is required"
        });
    }

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if (!password) {
        return res.status(400).json({
            message: "Password is required"
        });
    }

    if (username.length < 4) {
        return res.status(400).json({
            message: "username is too short"
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }

    next();
};

export const sanitizedLoginInput = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    if (!password) {
        return res.status(400).json({
            message: "Password is required"
        });
    }

    next();
};

export const sanitizedVerifyOtpInput = (req, res, next) => {
    const { id, otp } = req.body;

    if(!id){
        return res.status(400).json({
            message: "id is required"
        });
    }

    if(!otp){
        return res.status(400).json({
            message: "otp is required"
        });
    }

    if(otp.length!==6){
        return res.status(400).json({
            message: "Invalid otp"
        });
    }
    next();
}

export const sanitizedResetPasswordInput = (req, res, next) => {
    const { email, otp, password} = req.body;
    if(!email){
        throw{
            statusCode: 400,
            message: "email is required"
        }
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    if(!otp){
        throw{
            statusCode: 400,
            message: "otp is required"
        }
    }
    
    if(!password){
        throw{
            statusCode: 400,
            message: "password is required"
        }
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }
    next();
}