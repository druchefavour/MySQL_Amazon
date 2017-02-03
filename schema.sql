-- Create database called "Bamazon_db" --
-- CREATE DATABASE Bamazon_db; --
-- Make it so all of the following code will affect Bamazon_db --
USE Bamazon_db;
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