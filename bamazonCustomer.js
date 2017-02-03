var mysql = require('mysql');
var inquirer = require("inquirer");

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
customerQuestion();
console.log('connected as id ' + connection.threadId);
});

connection.query("SELECT * FROM products", function (err, res) {
	if (err) throw err;
	for (var i = 0; i < res.length; i++) {
		console.log(res[i].product_name);
	}
	console.log(res);
});

var customerQuestion = function() {
	//Prompt the customer to answer questions

	inquirer.prompt({
		name: "action",
		type: "list",
		message: "Choose from the following:",
		choices: ["What is the ID of the product you would like to buy?", "How many units of the product would you like to buy?"]
	}).then(function(answer) {
		// Write swictch statements to take the various cases
		switch (answer.action) {
			case "What is the ID of the product you would like to buy?":
				productIdSearch();
				break;

			case "How many units of the product would you like to buy?":
				numberOfUnits();
				break;
		}
	});
};

var productIdSearch = function () {
	inquirer.prompt({
		name: "id",
		type: "input",
		message: "What is the ID of the product you would like to buy?"
	}).then(function(answer){
		var query = "SELECT id FROM Bamazon WHERE ?";
		connection.query(query, function(err, res) {
			console.log("I want to buy product with ID: " + answer.id);
			customerQuestion();
		});
	});
};

var numberOfUnits = function () {
	inquirer.prompt({
		name: "units",
		type: "input",
		message: "How many units of the product would you like to buy?"
	}).then(function(answer){
		var query = "SELECT id FROM Bamazon WHERE ?";
		connection.query(query, {product_name:answer.units}, function(err, res){
			console.log("I would like to buy " + answer.units + " units");
			customerQuestion();
		})
	});
};

//
//to close the connection
connection.end();