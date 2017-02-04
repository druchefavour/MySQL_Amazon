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
console.log('connected as id ' + connection.threadId);
customerQuestion();
});

//Display all the items available for sale
connection.query("SELECT * FROM products", function (err, res) {
	if (err) throw err;
	for (var i = 0; i < res.length; i++) {
		console.log(res);
//		var productsInStock = res[i].stock_quantity;
//		console.log(productsInStock); 

	}
}); 

var customerQuestion = function() {
	//Prompt the customer to answer questions
/*	inquirer.prompt({
		name: "action",
		type: "list",
		message: "Choose from the following",
		choices: ["What is the ID of the product you would like to buy?", "How many units of the product would you like to buy?"]
	}).then(function(answer) {
		// Write switch statements to take the two cases
		switch (answer.action) {
			case "What is the ID of the product you would like to buy?":
			    productIdSearch();
				break;

			case "How many units of the product would you like to buy?":
				numberOfUnits();
				break;
		}
	});*/
	numberOfUnits();
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
				console.log("------------------------------------");
				console.log("I wish to buy product with ID: " + answer.id);	
				console.log("------------------------------------");
			}
			customerQuestion();
		});
	});
};

var numberOfUnits = function() {
	inquirer.prompt([{
		name: "units",
		type: "input",
		message: "How many units of the product would you like to buy?",
		validate: function(value) {
			if(isNaN(value) === false) {
				return true;
			}
			return false;
		}
	},{
		name: "id",
		type: "input",
		message: "ReEnter the equivalent ID",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}]).then(function(answer) {
		connection.query("SELECT id, stock_quantity FROM  products WHERE ?",{units: answer.units},function(err, res){
			//for (var i = 0; i < res.length; i++) {
				console.log("------------------------------------");
				console.log(res);	
				console.log("------------------------------------");
			});
		customerQuestion();
	});
};



/*			var i = 0;
			while (i < res.length) {
				if(answer.id === answer.units && i === 2){
					break;
					console.log("------------------------------------");
					console.log("I wish to buy " + answer.units + " units");
					console.log("------------------------------------");
				} else{
					console.log("insufficient quantity");
			        throw err;
				}
				i = i+1;
			}
			});*/
		
/*	});
};*/  



				//if ((answer.id < answer.id) && (answer.units <= answer.units)){
				//	console.log("------------------------------------");
//				console.log("I wish to buy " + answer.units + " units");	
//				console.log("------------------------------------");
//				}
//				else {
//			console.log("insufficient quantity");
//			throw err;/*

		
//		}
//		while (i < res.length);
//	}

			

//
//to close the connection
//connection.end();