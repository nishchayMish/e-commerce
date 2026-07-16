import { pool } from "../../config/db.js"

export const fetchProducts = async() => {
    const result = await pool.query("SELECT * FROM products")
    return result.rows;
}