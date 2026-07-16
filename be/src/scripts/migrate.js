import {pool, connectDB} from "../config/db.js";
import fs from "fs";
import path from "path";

const startMigration = async() => {
    await connectDB()
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations(
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            filename VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT NOW()
        )    
    `);

   const migrationsPath = path.join(process.cwd(), "src", "migrations", "up");
   const files = fs.readdirSync(migrationsPath)
   .filter(file => file.endsWith(".sql"))
   .sort();
   
   for(const file of files){
        const migrationExists = await pool.query("SELECT 1 FROM migrations WHERE filename = $1", [file])
        if(migrationExists.rowCount > 0){
            continue;
        }
        const fullPath = path.join(migrationsPath, file)
        const sql = fs.readFileSync(fullPath, 'utf-8')
        
        // ye transcations ke liye hai
        await pool.query("BEGIN");
        try {
            console.log(`Running ${file}...`);
            
            await pool.query(sql);

            await pool.query(
                "INSERT INTO migrations(filename) VALUES($1)",
                [file]
            );

            await pool.query("COMMIT");
        } catch (err) {
            await pool.query("ROLLBACK");
            console.error(`✗ ${file} failed`);
            throw err;
        } finally{
            console.log(`✓ ${file}`);
        }
    }
    await pool.end();
}

startMigration()