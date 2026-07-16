import path from "path";
import { connectDB, pool } from "../config/db.js"
import fs from "fs";

export const rollback = async() => {
    const client = await pool.connect();

    const latestMigration = await client.query("SELECT * FROM migrations ORDER BY id DESC LIMIT 1");
   
    if(latestMigration.rowCount===0){
        console.log("No migrations to rollback.");
        await pool.end();
        return;
    }

    const migrationsPath = path.join(process.cwd(), "src", "migrations", "down")

    const fullPath = path.join(migrationsPath, latestMigration.rows[0].filename)

    const sql = fs.readFileSync(fullPath, "utf-8")

    await client.query("BEGIN");
    try {
        console.log(`rolling back ${latestMigration.rows[0].filename}...`)
        await client.query(sql);
        await client.query("DELETE FROM migrations WHERE id = $1",[latestMigration.rows[0].id])
        
        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        console.error(`✗ ${latestMigration.rows[0].filename} failed`);
        throw err;
    } finally{
        await client.release();
        await pool.end();
    }
}

rollback()