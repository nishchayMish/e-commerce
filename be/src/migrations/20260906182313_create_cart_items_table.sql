-- migrate:up
CREATE TABLE IF NOT EXISTS cart_items(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK(quantity > 0),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(cart_id, product_id)
);

-- migrate:down
DROP TABLE IF EXISTS cart_items;
