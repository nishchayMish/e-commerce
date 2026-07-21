import { pool } from "../../config/db.js";

export const findUser = async(email) => {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    return res.rows[0];
}

export const registerUser = async(username, email, password) => {
    const result = await pool.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id, username, email", 
        [username, email, password]
    )
    return result.rows[0];
}

export const fetchMe = async(userId) => {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    return res.rows[0];
}

export const saveOTP = async(userId, otp, purpose) => {
    const result = await pool.query("INSERT INTO otp(user_id, otp, purpose) VALUES($1, $2, $3) RETURNING *", 
        [userId, otp, purpose]
    )
    return result.rows[0];
}