--create_products_table UP Migration
    
    BEGIN;

    CREATE TABLE IF NOT EXISTS products(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL CHECK(TRIM(name) <> ''),
        price DECIMAL(10,2) NOT NULL CHECK(price >= 0),
        image TEXT,
        category VARCHAR(50) NOT NULL CHECK(TRIM(category) <> ''),
        description TEXT NOT NULL CHECK(TRIM(description) <> ''),
        rating DECIMAL(2,1) NOT NULL DEFAULT 0 CHECK(rating >= 0 AND rating <= 5),
        quantity INT NOT NULL DEFAULT 1 CHECK(quantity > 0),
        old_price DECIMAL(10,2),
        trending BOOLEAN DEFAULT FALSE,
        bestSeller BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
    
    COMMIT;
    