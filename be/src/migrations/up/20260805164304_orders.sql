--orders UP Migration
    
    BEGIN;

    CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        razorpay_order_id VARCHAR(100) UNIQUE,

        contact_name VARCHAR(255),
        contact_phone VARCHAR(20),

        shipping_address TEXT,
        shipping_city VARCHAR(100),
        shipping_state VARCHAR(100),
        shipping_pincode VARCHAR(10),

        payment_method VARCHAR(20),

        order_status VARCHAR(20) DEFAULT 'PENDING',
        payment_status VARCHAR(20) DEFAULT 'PENDING',
        total_amount DECIMAL(10,2),

        created_at TIMESTAMP DEFAULT NOW()
    );
    
    COMMIT;
    