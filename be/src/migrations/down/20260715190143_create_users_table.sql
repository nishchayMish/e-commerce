--create_users_table DOWN Migration
    
    BEGIN;
    
    DROP TABLE users;
    
    COMMIT;
    