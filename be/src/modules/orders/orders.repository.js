import { pool } from "../../config/db.js"

export const insertUserAddress = async(fullName, phone, addressLine, city, state, pincode, userId) => {

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        await client.query(
            `UPDATE users
            SET phone = $1
            WHERE id = $2`,
            [phone, userId]
        );

        const res = await client.query(`
            INSERT INTO address(
                user_id,
                full_name,
                phone,
                address_line,
                city,
                state,
                pincode
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING * 
        `, [userId, fullName, phone, addressLine, city, state, pincode]);

        await client.query("COMMIT")

        return res.rows[0];
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally{
        client.release();
    }
}