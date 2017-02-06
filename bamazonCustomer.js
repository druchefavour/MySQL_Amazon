var mysql = require('mysql');
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection ({
host: 'localhost',
port: 3306,

// Your username
user: 'root',

//Your password
password: 'Ozpa67mp1$',
database: 'Bamazon'
});


connection.connect (function(err){
if (err) throw err;
console.log('connected as id ' + connection.threadId);
customerQuestion();
});

//Display all the items available for sale
connection.query("SELECT * FROM products", function (err, res) {
	if (err) throw err;
	for (var i = 0; i < res.length; i++) {
		console.log("==============================");
		console.log("------------------------------");
		console.log(res);
		console.log("------------------------------");
		console.log("------------------------------");
	}
}); 

var customerQuestion = function() {
	//Prompt the customer to answer questions
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "Make a choice: ",
		choices: ["What is the ID of the product that you want to buy?","How many units of the product would you like to buy?"]
	}).then(function(answer) {
		//Write a switch statement to take the two cases
		switch(answer.action) {
			case "What is the ID of the product that you want to buy?":
				productIdSearch();
				break;
			case "How many units of the product would you like to buy?":
				numberOfUnits();
				break;
		};
	});
};

// Prompt user to indicate the id of the product he wants to buy
var productIdSearch = function() {
	inquirer.prompt({
		name: "id",
		type: "input",
		message: "What is the ID of the product you would like to buy?"
	}).then(function(answer) {
		var query = "SELECT id FROM products WHERE ?";
		connection.query(query, {id: answer.id}, function(err, res){
			for (var i = 0; i < res.length; i++) {
				console.log("==============================");
				console.log("------------------------------------");
				console.log("I wish to buy product with ID: " + answer.id);	
				console.log("------------------------------------");
				console.log("==============================");
			}
			customerQuestion();
		});
	});
};
//Create the function for the prompt
var numberOfUnits = function() {
			inquirer.prompt([{
				name: "id",
				type: "input",
				message: "Re-Enter the Product ID",
				validate: function(value) {
					if(isNaN(value) === false) {
						return true;
					}
					return false;
				}
			},{
				name: "units",
				type: "input",
				message: "How many units of the product would you like to buy?",
				validate: function(value) {
					if(isNaN(value) === false) {
						return true;
					}
					return false;
				}	
		}]).then(function(answer) {
		connection.query("SELECT id, stock_quantity, product_name, price FROM  products WHERE ?", {id: answer.id},function(err, res) {
			console.log("\n------------------------------------");
			res.forEach(function(dataRow) {
				var numberAvailable = dataRow.stock_quantity;
				var updatedStockQuantity = numberAvailable-answer.units;
				var totalCost = parseFloat(answer.units)*parseFloat(dataRow.price);
				if(numberAvailable < answer.units) {
					console.log("Sorry, there are not enough products in stock");
				} else {
					console.log('Success! you have purchased' + ' ' + answer.units + ' ' + dataRow.product_name + 's!');
					console.log("------------------------------------");
					//Update the stock quantity after purchase
					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedStockQuantity}, {id:answer.id}], function (err, res) {
						if (err) throw err;
						console.log(res);
						console.log("\n------------------------------------");
						console.log("The products table has been successfully updated");
						console.log("\n------------------------------------");
						console.log('Your Total Cost is: ' + '$' + totalCost);
						console.log("\n====================================");
						});
					};
				})
			})
		});
		return false;
	};