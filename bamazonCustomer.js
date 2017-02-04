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
	}
	return false;
});
 


var customerQuestion = function() {
// Write switch statements to take the two cases
//switch (customerQuestion) {
//	case "Display all products":
//		allProductDisplay();
//		break;

//	case "Product Search":
		numberOfUnits();
//		break;
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
		message: "How many units of the product would you like to buy?:",
		validate: function(value) {
			if(isNaN(value) === false) {
				return true;
			}
			return false;
		}
	},{
		name: "id",
		type: "input",
		message: "Enter the product ID:",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}]).then(function(answer) {
		connection.query("SELECT id, stock_quantity, product_name FROM products WHERE ?",{ id: answer.id }, function(err, res){
			console.log("\n------------------------------------");
			res.forEach(function(dataRow) {
				var numberAvailable = dataRow.stock_quantity;
				if (numberAvailable < answer.units) {
					console.log('Sorry, there are not enough products available.');
				} else {
					console.log('Success! you can purchase ' + ' ' + answer.units + ' ' + dataRow.product_name + 's!');
				}
			});
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