--orders DOWN Migration
    
    BEGIN;
    
    DROP TABLE IF EXISTS orders;
    
    COMMIT;
    