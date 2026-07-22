--create_cart_table DOWN Migration
    
    BEGIN;
    
    DROP TABLE cart;
    
    COMMIT;
    