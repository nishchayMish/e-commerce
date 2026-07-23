--create_cartItems_table UP Migration
    
    BEGIN;

    CREATE TABLE IF NOT EXISTS cart_items(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(cart_id, product_id)
    );
    
    COMMIT;