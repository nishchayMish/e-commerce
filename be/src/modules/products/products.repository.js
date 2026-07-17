import { pool } from "../../config/db.js"

export const fetchProducts = async(offset, limit, page) => {
    const {rows} = await pool.query(`
        SELECT * FROM products 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
        `, 
        [limit, offset]
    );
    const pagination = {
        page,
        limit: Number(limit),
        offset
    }
    return { rows, pagination };
}

export const fetchSingleProduct = async(productId) => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [productId]);
    return result.rows[0];
}