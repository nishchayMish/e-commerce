--create_cart_table UP Migration
    
    BEGIN;

    CREATE TABLE IF NOT EXISTS cart(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        guest_id UUID UNIQUE,
        created_at TIMESTAMP DEFAULT NOW(),

        CHECK(user_id IS NOT NULL OR guest_id IS NOT NULL)
    );
    
    COMMIT;
    