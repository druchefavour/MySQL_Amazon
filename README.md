# MySQL_Amazon
## Introduction
### Challenge 1
In this work, I will create an Amazon-like storefront with MySQL. The function of the app is as follows:

1. Take in orders from customers
2. Deplete stock from the store's inventory
3. Track product sales across departments
4. Provide a summary of the highest gross departments in the store

## Actions
* Create a git repository named **MySQL_Amazon**
* Create package.JSON file that includes inquirer and MySQL npm packages
* Create schema.sql consisting of the database script
* Create MySQL Database called Bamazon_db
* Make it so all of the following code will affect Bamazon
* Create a table called "products" within Bamazon
* Create columns for the products table
	* Create a numeric column called "id" which automatically increments and cannot be null
	* Make a string column called "product_name" which cannot contain null
	* Make a string column called "department_name" which cannot contain null
	* Make an numeric column called "price"
	* Make an numeric column called "stock_quantity"
	* Set the primary key of the table to id
* Run the app to create database and table
![MySQL Database](/images/create_database.png)
* Create seeds.sql consisting of the database script
![MySQL Database](/images/bamazon_database.png)
* Populate the database with 10 different products.
* Create a node application called "bamazonCustomer.js"
* Run the node application: Display all the items available for sale
![MySQL Database](/images/product_display.png)
See also table displayed in MySQL workbench
![MySQL Database](/images/table_display.png)
* Create a switch statement and use inquirer to make app prompt users with two messages:
	*The ID of the product they would like to buy.
	*How many units of the product they would like to buy.
* Use the validate statement (under the function numberOfUnits()) to check if the store has enough of the product to meet the customer's request. 
* If order goes through update mySQL database to reflect the remaining quantity.
	*Image shows the dispay of app updating stock-quantity when order goes through:
![MySQL Database](/images/Dislplay_Updated_count.png)

	*This image shows the original table showing the stock quantity for product with ID = 1
![MySQL Database](/images/original_table.png)

	*Compare with this image that show the updated table showing the stock quantity for product with ID = 1 when order of 20 items had gone through
![MySQL Database](/images/original_table.png)

* Finally, the app calculates the total cost of the order and displays it for the customers.
![MySQL Database](/images/total_cost.png)

### CHALLENGE 2
* In this challenge, a new node application bamazonManager.js was created
* Using a switch statement and the inquirer npm package, three cases were created that has the capability of selecting from the following menu options: 

	* View Products for Sale
	* View Low Inventory
	* Add to Inventory
	* Add New Product
* The API console-table is installed from npmjs using npm install console-table. This has the ability to display the results as tables in the terminal. 
* Using the Inquirer API:
	* Connection is made to the database such that once a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities.
		*See the result when product with ID = 11 is inserted:
		![MySQL Database](/images/view_product.png)
	* In order to list all items with inventory count lower than five, the app is created such as to retrieve stock quantities with RANGE between 0 and 5.
	* Connection is made to the server so that when the manager selects Add to Inventory, the app displays a prompt that will let the manager "add more" of any item currently in the store and get the table UPDATED.
	* Connection is made to the server so that if a manager selects Add New Product, the app allows the manager to INSERT a completely new product to the store.
		*See the result when product with ID = 11 is inserted:
		![MySQL Database](/images/new_product.png)

### CHALLENGE 3
* In this section, a new MySQL table called "departments" within Bamazon database is created
* Create columns for the departments table
	* Create a numeric column called "department_id" which automatically increments and cannot be null
	* Make a string column called "department_name" which cannot contain null
	* Make an numeric column called "over_head_costs"
	* Make an numeric column called "total_sales"
	* Set the primary key of the table to department_id
*Run the application using Bamazon database
	*See the empty table created:
	![MySQL Database](/images/supervisors_table.png)
* Modify the products table so that theres a product_sales column: This is done by in mySQL workbench
	*See column created:
	![MySQL Database](/images/product_sales.png)
* Modify the bamazonCustomer.js app so that this value is updated with each individual products total revenue from each sale
 	*See column created:
	![MySQL Database](/images/product_sales_updated.png)
* Modify bamazonCustomer.js to add the revenue from each transaction to the total_sales column for the related department.The app is still able to update the inventory listed in the products column. 

* Create a node application bamazonSupervisor.js with the following functionalties:
	* The supervisor is able to View Product Sales by Department and Create New Department
	* Create a New table called department from existing products table by copying the department_name and sum of the product sales to the new table.
	* Create a switch statement to enable the supervisor chose between viewing the product sales by department or to create a new department.
	* Use inquirer to enable the supervisor toggle between menu options
	* Use console.table() to display the product sales on the terminal 







