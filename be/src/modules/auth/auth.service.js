import { fetchMe, findUser, registerUser, saveOTP, updateUserPassword, updateUserStatus, verifyOTP } from "./auth.repository.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OTP } from "../../utils/helpers.js";
import { sendEmail } from "../../utils/email.js";

export const registerService = async(username, email, password) => {
    const existingUser = await findUser(email)

    if(existingUser){
        throw{
            statusCode: 400,
            message: "user already exists"
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await registerUser(username, email, hashedPassword);

    const otp = OTP();

    await saveOTP(user.id, otp, "user email verification");
    
    const subject = "Verify your account";

    sendEmail(user.email, otp, subject)
    .then(() => {
        console.log("email sent")
    })
    .catch((err) => {
        console.error("email failed", err)  
    })

    return {
        message: "Registration successful. Please verify your email.",
        userId: user.id
    };
}

export const loginService = async(email, password) => {
    const user = await findUser(email)

    if(!user){
        throw{
            statusCode: 401,
            message: "user not found"
        }
    }
    
    if(!user.is_verified){
        throw{
            statusCode: 400,
            message: "user is not verified"
        }
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
        throw{
            statusCode: 401,
            message: "Invalid Credentials"
        }
    }

    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: "15m"}
    )

    const userPayload = {
        id: user.id,
        username: user.username,
        email: user.email
    }

    return {
        token,
        userPayload
    }

}

export const fetchMeService = async(userId) => {
    if(!userId){
        throw{
            statusCode: 401,
            message: "unauthorized"
        }
    }
    const res = await fetchMe(userId);
    const userPayload = {
        id: res.id,
        username: res.username,
        email: res.username
    }
    return userPayload;
}

export const verifyOtpService = async(id, otp) => {
    const user = await findUser(null, id)
    if(!user){
        throw{
            statusCode: 401,
            message: "user not found"
        }
    }

    const res = await verifyOTP(id)

    if(res.otp !== otp){
        throw{
            statusCode: 401,
            message: "Invalid otp"
        }
    }

    await updateUserStatus(id);

    return { message: "user verified" }
}

export const forgotPasswordService = async(email) => {
    const user = await findUser(email);
    if(!user){
        throw{
            statusCode: 401,
            message: "user not found"
        }
    }
    const subject = "Reset your password";

    const otp = OTP();

    await saveOTP(user.id, otp, "forgot-password");

    sendEmail(user.email, otp, subject)
    .then(()=>{
        console.log("email sent")
    })
    .catch((err) => {
        console.error(err)
    })

    return{
        message: "otp has been sent to your email"
    }
}

export const resetPasswordService = async(email, otp, password) => {
    const user = await findUser(email);

    if(!user){
        throw{
            statusCode: 401,
            message: "user not found"
        }
    } 

    const res = await verifyOTP(user.id);

    if(!res){
        throw{
            statusCode: 401,
            message: "OTP expired"
        }
    }
    
    if(res.otp !== otp){    
        throw{
            statusCode: 401,
            message: "Invalid otp"
        }
    }

    if(!res){
        throw{
            statusCode: 401,
            message: "Invalid or OTP expired"
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await updateUserPassword(user.id, hashedPassword);

    return {
        message: "Password updated successfully"
    }
}