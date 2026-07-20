import { pool } from "../../config/db.js"

export const fetchProducts = async(offset, limit, page, filters) => {
    let query = "SELECT * FROM products";
    let countQuery = "SELECT COUNT(*) FROM products";

    const conditions = [];
    const values = [];

    if(filters.category){
        values.push(filters.category);
        conditions.push(`category=$${values.length}`)
    }

    if(filters.priceRange){
        switch(filters.priceRange){
            
            case "lt-500":
                conditions.push(`price < 500`);
                break;

            case "500-1000":
                conditions.push(`price between 500 AND 1000`)
                break;
                
            case "1000-2500":
                conditions.push(`price between 1000 AND 2500`)
                break;
                
            case "gt-2500":
                conditions.push(`price > 2500`);
                break;    

            default: 
            throw{
                statusCode: 400,
                message: "Invalid price range"
            }    
        }
    }

    if(conditions.length > 0){
        const where = ` WHERE ${conditions.join(" AND ")}`
        query += where
        countQuery += where
    }

    query += `
        ORDER BY created_at DESC
        LIMIT $${values.length + 1}
        OFFSET $${values.length + 2}
    `;

    const dataValues = [...values, limit, offset];

    // Fetch products
    const { rows } = await pool.query(query, dataValues);

    // Fetch total count
    const { rows: countRows } = await pool.query(countQuery, values);

    const totalProducts = Number(countRows[0].count);

    return {
        rows,
        pagination: {
            currentPage: page,
            limit: Number(limit),
            offset,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
        },
    }
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