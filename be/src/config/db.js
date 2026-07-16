import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function connectDB() {
    await pool.query("SELECT 1");
    console.log("db connected");
}

export{
    pool,
    connectDB
}