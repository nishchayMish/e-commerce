import { fetchMe, findUser, registerUser } from "./auth.repository.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerService = async(username, email, password) => {
    const existingUser = await findUser(email)

    if(existingUser){
        throw{
            statusCode: 400,
            message: "user already exists"
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return registerUser(username, email, hashedPassword);
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