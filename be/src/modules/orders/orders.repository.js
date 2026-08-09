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

        const res2 = await client.query(`
            INSERT INTO orders(
                user_id,
                contact_name,
                contact_phone,
                shipping_address,
                shipping_city,
                shipping_state,
                shipping_pincode
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id;
        `,[userId, fullName, phone, addressLine, city, state, pincode])

        await client.query("COMMIT");
        return {
            address: res.rows[0],
            orderId: res2.rows[0].id
        };
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

export const createOrder = async(dbOrderId, razorpayOrderId, amount, paymentMethod, paymentStatus, userId) => {
    const res = await pool.query(`
        UPDATE orders 
        SET 
        razorpay_order_id = $1, 
        total_amount = $2,
        payment_method = $3,
        order_status = 'CONFIRMED',
        payment_status = $4
        WHERE id = $5
        AND user_id = $6
        RETURNING *
    `, [razorpayOrderId, amount, paymentMethod, paymentStatus, dbOrderId, userId]);
    return res.rows[0];
}