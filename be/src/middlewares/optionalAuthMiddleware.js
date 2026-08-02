import jwt from "jsonwebtoken";
import {randomUUID} from "crypto"
export const optionalAuthMiddleware = async(req, res, next) => {
    const token = req.cookies.access_token

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded;
            return next();
        } catch(err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
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