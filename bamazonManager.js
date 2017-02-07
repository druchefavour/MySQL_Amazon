var mysql = require('mysql');
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection ({
host: 'localhost',
port: 3306,

// Your username
user: 'root',

//Your password
password: '',
database: 'Bamazon'
});


connection.connect (function(err){
if (err) throw err;
console.log('connected as id ' + connection.threadId);
menuOptions();
});

var menuOptions = function() {
	// Menu Options

	inquirer.prompt({
		name: "action",
		type: "list",
		message: "Menu Options: ",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}).then(function(answer) {
		//Write a switch statement to take the four cases
		switch(answer.action) {
			case "View Products for Sale":
				viewProducts();
				break;
			case "View Low Inventory":
				viewLowInventory();
				break;
			case "Add to Inventory":
				addToInventory();
				break;
			case "Add New Product":
				addNewProduct();
				break;
		};
	});
};

//Display all the items available for sale
var viewProducts = function() {
	inquirer.prompt({
		name: "id",
		type: "input",
		message: "View Products for Sale"
	}).then(function(answer){
		connection.query("SELECT * FROM products", function (err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
				console.log("==============================");
				console.table(res);
				console.log("------------------------------");
			}
			menuOptions();
		});
	});
};

var viewLowInventory = function () {
	inquirer.prompt([{
		name: "start",
		type: "input",
		message: "Enter Zero: ",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	},{
		name: "end",
		type: "input",
		message: "Enter Low Inventory Limit: ",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}]).then(function(answer){
		var query = "SELECT id, product_name, price, stock_quantity FROM products WHERE stock_quantity BETWEEN ? AND ?";
		connection.query(query, [answer.start, answer.end], function(err, res) {
			console.log("\n------------------------------------");
			console.table(res);
			});
			menuOptions();
		});
};

var addToInventory = function () {
	inquirer.prompt([{
		name: "id",
		type: "input",
		message: "ID of product you need to restock: ",
		validate: function(value) {
			if(isNaN(value) === false) {
				return true;
			}
			return false;
		}
	},{
		name: "units",
		type: "input",
		message: "How many units do you want to add to Inventory?: ",
		validate:function(value) {
			if(isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}]).then(function(answer){
		connection.query("SELECT id, stock_quantity, product_name, price FROM  products WHERE ?", {id: answer.id},function(err, res) {
			console.log("\n------------------------------------");
			res.forEach(function(dataRow) {
				var newStockQuantity = parseInt(dataRow.stock_quantity) + parseInt(answer.units);
				if (err) throw err;
				connection.query("UPDATE products SET ? WHERE ?" , [{stock_quantity: newStockQuantity}, {id:answer.id}], function (err, res) {
					console.log("\n------------------------------------");
					console.table(dataRow);
			});
			});
			menuOptions();
		});
	});
};

var addNewProduct = function () {
	inquirer.prompt([{
		name: "id",
		type: "input",
		message: "What is the ID of the new product that you want to add?"
	},{
		name: "product_name",
		type: "input",
		message: "What is the name of the product that you want to add?"
	},{
			name: "department_name",
			type: "input",
			message: "What is the department name for the product that you want to add?"
	},{
		name: "price",
		type: "input",
		message: "What is the price of the product that you want to add?"
	},{
		name: "stock_quantity",
		type: "input",
		message: "How many units of the product do you want to add?"
	}]).then(function(answer){
		connection.query("INSERT INTO products SET ?",{
			id:answer.id,
			product_name:answer.product_name,
			department_name:answer.department_name,
			price:answer.price,
			stock_quantity: answer.stock_quantity
		}, function (err, res) {
			console.log("==============================");
				console.log("New product was added successfully");
				console.log("------------------------------");
			});
			menuOptions();
		});
};