--create_users_table UP Migration
    
    BEGIN;

        CREATE EXTENSION IF NOT EXISTS "pgcrypto";

        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            username VARCHAR(100) NOT NULL CHECK(TRIM(username) <> ''),
            email VARCHAR(255) UNIQUE NOT NULL CHECK(TRIM(email) <> ''),
            password VARCHAR(255) NOT NULL CHECK(password <> ''),
            is_verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    
    COMMIT;
    