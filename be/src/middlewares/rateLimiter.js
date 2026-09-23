import { client } from "../config/redis.js";

const RATE_LIMIT_DURATION_IN_MS = 60 * 1000;
const NUMBER_OF_REQUESTS = 5;

export const rateLimiter = async(req, res, next) => {
    try {
        const ip = req.ip;
        const currentTime = Date.now();
        
        const result = await client.hGetAll(ip);

        if(Object.keys(result).length === 0){
            await client.hSet(ip, {
                "createdAt": currentTime.toString(),
                "count": "1"
            })
            return next();
        }
        
        if(result){
            const diff = currentTime - Number(result.createdAt)
            
            if(diff > RATE_LIMIT_DURATION_IN_MS){
                await client.hSet(ip, {
                    "createdAt": currentTime.toString(),
                    "count": "1"
                })

                return next();
            }

            if(Number(result.count) >= NUMBER_OF_REQUESTS){
                return res.status(429).json({
                    sucess: false,
                    message: "Too many requests"
                })
            } else{
                await client.hSet(ip, {
                    count: (Number(result.count) + 1).toString(),
                })
                return next()
            }
        }
    } catch (error) {
        console.error("Rate limiter error:", error);
        return next(error);
    }
}