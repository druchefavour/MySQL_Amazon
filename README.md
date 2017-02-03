# MySQL_Amazon
## Introduction
In this work, I will create an Amazon-like storefront with MySQL. The function of the app is as follows:

1. Take in orders from customers
2. Deplete stock from the store's inventory
3. Track product sales across departments
4. Provide a summary of the highest gross departments in the store

## Actions
* Create a git repository named **MySQL_Amazon**
* Create package.JSON file that includes inquirer and MySQL npm packages
* Create seeds.sql consisting of the database script
* Create MySQL Database called Bamazon_db
* Make it so all of the following code will affect Bamazon_db
* Create a table called "products" within Bamazon_db
* Create columns for the products table
	* Create a numeric column called "id" which automatically increments and cannot be null
	* Make a string column called "product_name" which cannot contain null
	* Make a string column called "department_name" which cannot contain null
	* Make an numeric column called "price"
	* Make an numeric column called "stock_quantity"
	* Set the primary key of the table to id
* Run the app to create database and table
![MySQL Database](/images/create_database.png)
Format: ![Alt Text](url)

