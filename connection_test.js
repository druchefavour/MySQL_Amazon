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
});

//Display all the items available for sale
connection.query("SELECT * FROM products", function (err, res) {
	if (err) throw err;
	for (var i = 0; i < res.length; i++) {
		console.log("==============================");
		console.log("------------------------------");
		console.table(res);
		console.log("------------------------------");
		console.log("------------------------------");
	};
}); 