import { fetchMe, findUser, registerUser, saveOTP } from "./auth.repository.js"
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
    await sendEmail(user.email, otp);

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