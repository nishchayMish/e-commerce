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
        limit: Number(limit),
        offset,
        currentPage: page,
    }
    return { rows, pagination };
}

export const fetchSingleProduct = async(productId) => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [productId]);
    return result.rows[0];
}

export const fetchHomeProducts = async() => {
    const res = await pool.query(`
        SELECT * FROM (
            SELECT *, ROW_NUMBER() OVER(
                PARTITION BY category
                ORDER BY created_at DESC
            ) AS rn FROM products WHERE trending = TRUE
        ) p 
        WHERE rn <= 6
    `)
    return res.rows
}

export const bestSellerProducts = async() => {
    const res = await pool.query(`
        SELECT * FROM (
            SELECT *, ROW_NUMBER() OVER(
                PARTITION BY category
                ORDER BY created_at DESC
            ) AS rn FROM products WHERE bestseller = TRUE
        ) p 
        WHERE rn <= 2
    `)
    return res.rows
}