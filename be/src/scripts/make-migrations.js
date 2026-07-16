import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationName = process.argv[2];

if(!migrationName){
    console.error("❌ Please provide migration name.");
    console.log("Example:");
    console.log("npm run make:migration create_users");
    process.exit(1);
}

const now = new Date();

const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0")
].join("");

const upDir = path.join(__dirname, "../migrations/up");
const downDir = path.join(__dirname, "../migrations/down");

const fileName = `${timestamp}_${migrationName}.sql`;

const upPath = path.join(upDir, fileName);
const downPath = path.join(downDir, fileName);

// create up migration
fs.writeFileSync(
    upPath,
    `--${migrationName} UP Migration
    
    BEGIN;

    -- Write your SQL here
    
    COMMIT;
    `
);

// create down migration
fs.writeFileSync(
    downPath,
    `--${migrationName} DOWN Migration
    
    BEGIN;
    
    -- Write rollback SQL here
    
    COMMIT;
    `
);

console.log("✅ Migration created successfully!");
console.log("UP   :", fileName);
console.log("DOWN :", fileName);