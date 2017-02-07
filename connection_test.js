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
/*connection.query("SELECT * FROM products", function (err, res) {
	if (err) throw err;
	for (var i = 0; i < res.length; i++) {
		console.log("==============================");
		console.log("------------------------------");
		console.table(res);
		console.log("------------------------------");
		console.log("------------------------------");
	};
}); */

/*connection.query("CREATE TABLE departments AS SELECT department_name, SUM(product_sales) AS total_sales FROM products GROUP BY department_name" , function (err, res) {
			if (err) throw err;
			console.log("==============================");
				console.table(res);
				console.log("------------------------------");
			//menuOptions();
		});*/
connection.query("ALTER departments ADD COLUMN department_id INT(11) AUTO_INCREMENT, ADD COLUMN over_head_costs AFTER department_name, ADD COLUMN total_profit AFTER total_sales", function(err, res) {
				console.log(res);
			});