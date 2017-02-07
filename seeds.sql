-- Create database called "Bamazon" --
CREATE DATABASE Bamazon;
-- Make it so all of the following code will affect Bamazon_db --
USE Bamazon;
-- Create the table "products" within Bamazon_db --
CREATE TABLE products (
-- Create a numeric column called "id" which automatically increments and cannot be null --
id INTEGER(11) AUTO_INCREMENT NOT NULL,
-- Make a string column called "product_name" which cannot contain null --
product_name VARCHAR(100) NOT NULL,
-- Make a string column called "department_name" which cannot contain null --
department_name VARCHAR(50) NOT NULL,
-- Make an numeric column called "price" --
price INTEGER(10),
-- Make an numeric column called "stock_quantity" --
stock_quantity INTEGER(10),
-- Set the primary key of the table to id --
  PRIMARY KEY (id)
  );
  
  SELECT * FROM products;
  
-- Populate database with products
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Goliath", "video", 10, 54);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Manchester by the sea", "video", 15, 69);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Neon Demon", "video", 13, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shopkins", "toys", 8, 222);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Barbie", "toys", 17, 147);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ascics", "fashion", 115, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Party_Dress", "fashion", 48, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Speechless", "fashion", 42, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dining_Table", "funiture", 130, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flash_Furniture", "funiture", 105, 39);

ALTER TABLE products
ADD COLUMN product_sales INT NOT NULL;
SELECT * FROM products;

ALTER TABLE products
ADD COLUMN department_id INT NOT NULL;
 
USE Bamazon;
ALTER TABLE departments
ADD COLUMN department_id INT AUTO_INCREMENT NOT NULL, 
ADD COLUMN over_head_costs INT NOT NULL,
ADD COLUMN total_profit INT NOT NULL;

ALTER TABLE departments MODIFY COLUMN department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY;
SELECT * FROM departments;
