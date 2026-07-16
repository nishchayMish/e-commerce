import { connectDB, pool } from "../config/db.js"
import { products } from "../utils/InitialProductsData.js"

const seed = async() => {
    await connectDB();
    try {
        const promises = products.map((product)=>{
            return pool.query(`
                INSERT INTO products
                (name, price, image, category, description, rating, quantity, in_stock)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
                RETURNING *
            `,[product.name, product.price, product.image, product.category, product.description, product.rating, product.quantity, product.in_stock])
        })
        await Promise.all(promises)
        console.log("seeding successfull")
    } catch (err) {
        console.error(`✗ seeding failed`);
        throw err
    }
    finally{
        await pool.end()
    }
}

seed();