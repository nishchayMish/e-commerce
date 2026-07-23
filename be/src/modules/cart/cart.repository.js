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

export const getCart = async(userId) => {
    const res = await pool.query(`
        SELECT * FROM cart
        WHERE user_id = $1
    `, [userId]);

    return res.rows[0];
}

export const fetchCartItems = async(cartId) => {
    const result = await pool.query(`
        SELECT 
            ci.id,
            ci.quantity,
            p.id AS product_id,
            p.name,
            p.price,
            p.description
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1;
    `, [cartId])

    return result.rows;
}

export const updateCart = async(cartId, pId, action) => {
    switch (action) {
        case "increment":
            const res1 = await pool.query(`
                UPDATE cart_items
                SET quantity = quantity + 1
                WHERE cart_id = $1 AND product_id = $2  
                RETURNING *
            `, [cartId, pId])
        return res1.rows[0];

        // todo: agar quantity 1 se kam ho to delete from cart
        case "decrement":
            const res2 = await pool.query(`
                UPDATE cart_items
                SET quantity = quantity - 1
                WHERE cart_id = $1 AND product_id = $2 AND quantity > 1
                RETURNING *
            `, [cartId, pId])
        return res2.rows[0];
    
        default:
            throw{
                statusCode:400,
                message: "Invalid action"
            }
        break;
    }
}

