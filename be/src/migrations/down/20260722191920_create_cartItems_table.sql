--create_cartItems_table DOWN Migration
    
    BEGIN;
    
    DROP TABLE cart_items;
    
    COMMIT;
    