import { pool } from "../../config/db.js"

export const fetchProducts = async() => {
    const result = await pool.query("SELECT * FROM products")
    return result.rows;
}

export const fetchSingleProduct = async(productId) => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [productId]);
    return result.rows[0];
}