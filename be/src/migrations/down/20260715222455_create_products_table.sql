--create_products_table DOWN Migration
    
    BEGIN;
    
    DROP TABLE products;
    
    COMMIT;
    