import { pool } from "../../config/db.js"

export const getUserAddress = async(userId) => {
    const res = await pool.query("SELECT * FROM address WHERE user_id = $1", [userId]);
    return res.rows[0] ?? null;
}

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

        const existing = await client.query(
            "SELECT id FROM address WHERE user_id = $1 LIMIT 1",
            [userId]
        );

        let res;
        if (existing.rows[0]) {
            res = await client.query(
                `UPDATE address
                SET full_name = COALESCE($1, full_name),
                    phone = COALESCE($2, phone),
                    address_line = COALESCE($3, address_line),
                    city = COALESCE($4, city),
                    state = COALESCE($5, state),
                    pincode = COALESCE($6, pincode),
                    updated_at = NOW()
                WHERE user_id = $7
                RETURNING *`,
                [fullName, phone, addressLine, city, state, pincode, userId]
            );
        } else {
            res = await client.query(
                `INSERT INTO address(
                    user_id,
                    full_name,
                    phone,
                    address_line,
                    city,
                    state,
                    pincode
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`,
                [userId, fullName, phone, addressLine, city, state, pincode]
            );
        }

        await client.query("COMMIT");
        return res.rows[0];
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}
