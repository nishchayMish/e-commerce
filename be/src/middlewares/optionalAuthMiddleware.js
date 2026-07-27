import jwt from "jsonwebtoken";
import {randomUUID} from "crypto"
export const optionalAuthMiddleware = async(req, res, next) => {
    const token = req.cookies.access_token

    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({
                message: "Invalid token"
            })
        }
        req.user = decoded
        return next();
    }

    let guestId = req.cookies.guest_id;
    if(!guestId){
        guestId = randomUUID();
        
        res.cookie("guest_id", guestId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })
    }
    req.guestId = guestId;
    next();
}