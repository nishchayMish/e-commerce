import { pool } from "../../config/db.js";

export const findUser = async (email, id) => {
    let sql;
    let value;
    if (email) {
        sql = "SELECT * FROM users WHERE email = $1";
        value = [email];
    } else if (id) {
        sql = "SELECT * FROM users WHERE id = $1";
        value = [id];
    } else {
        throw new Error("Email or id required");
    }
    
    const res = await pool.query(sql, value);
    return res.rows[0]
};

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
    await deleteOldUserOTP(userId)
    const result = await pool.query("INSERT INTO otp(user_id, otp, purpose) VALUES($1, $2, $3) RETURNING *", 
        [userId, otp, purpose]
    )
    return result.rows[0];
}

const deleteOldUserOTP = async(userId) => {
    await pool.query("DELETE FROM otp where user_id = $1", [userId]);
}

export const updateUserStatus = async(userId) => {
    await pool.query("UPDATE users SET is_verified = TRUE WHERE id = $1", [userId]);
}

export const updateUserPassword = async(userId, newPassword) => {
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [newPassword, userId]);
}

export const verifyOTP = async(userId) => {
    const result = await pool.query("SELECT * FROM otp where user_id = $1 AND expires_at > NOW()", [userId]);
    console.log(result.rows[0])
    return result.rows[0];
}