import { pool } from "../../config/db.js"

export const findUsersCart = async(userId) => {
    const res = await pool.query("SELECT * FROM cart WHERE user_id = $1", [userId])
    return res.rows[0];
}

export const createCart = async(userId) => {
    const res = await pool.query("INSERT INTO cart(user_id) VALUES($1) RETURNING *", [userId]);
    return res.rows[0];
}

export const findItem = async(pId, cartId) => {
    const res = await pool.query("SELECT * FROM cart_items WHERE product_id = $1 AND cart_id = $2",
        [pId, cartId]
    )
    return res.rows[0];
}

export const addToCart = async(cartId, pId, quantity) => {
    const res = await pool.query(`
        INSERT INTO cart_items(cart_id, product_id, quantity)
        VALUES($1, $2, $3)
        RETURNING *
    `, [cartId, pId, quantity])
    return res.rows[0];
}

export const updateCartQuantity = async(cartId, pId) => {
    const res = await pool.query(`
        UPDATE cart_items 
        SET quantity = quantity + 1
        WHERE cart_id = $1
        AND product_id = $2
        RETURNING *
    `, [cartId, pId])
    return res.rows[0];
}