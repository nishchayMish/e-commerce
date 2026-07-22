--create_cart_table UP Migration
    
    BEGIN;

    CREATE TABLE IF NOT EXISTS cart(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id)
    );
    
    COMMIT;
    