--create_otp_table.sql UP Migration
    
    BEGIN;

    CREATE TABLE IF NOT EXISTS otp(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        otp VARCHAR(6) NOT NULL,
        purpose text NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '5 minutes')
    );
    
    COMMIT;
    