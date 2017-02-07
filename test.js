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
connection.query("SELECT department_name, SUM(stock_quantity) as total_sales FROM  products GROUP BY department_name", function(err, res) {
	var table_result = res;
	var d_name = [];

			console.log("\n------------------------------------");
				if (err) throw err;
					console.table(table_result);
			});
			


/*connection.query("UPDATE products SET ? WHERE ?", [{
		stock_quantity: 54
	},{
		id: 1
	}], function (err, res) {
		if (err) throw err;
		/*for (var i = 0; i < res.length; i++) {
			console.log("==============================");
			console.log("------------------------------");*/
			//console.log(res);
		//	console.log("------------------------------");
//			console.log("------------------------------");
//		}
//	});
//};
 
