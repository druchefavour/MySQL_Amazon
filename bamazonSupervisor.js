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
		choices: ["View Products Sales by Department", "Create New Department"]
	}).then(function(answer) {
		//Write a switch statement to take the four cases
		switch(answer.action) {
			case "View Products Sales by Department":
				viewProductSales();
				break;
			case "Create New Department":
				createDept();
				break;
		};
	});
};

//Display all the items available for sale
var viewProductSales = function() {
	inquirer.prompt({
		name: "id",
		type: "input",
		message: "View Products Sales by Department?"
	}).then(function(answer){
		//connection.query("CREATE TABLE departments AS SELECT department_name, SUM(product_sales) AS total_sales FROM products GROUP BY department_name" , function (err, res) {
		//Read the department table alread created
		connection.query("SELECT * FROM departments", function(err, res){
			if (err) throw err;
			console.log("/n __________________________");
			console.table(res);
		});
		menuOptions();
	});
};

var createDept = function () {
	inquirer.prompt([{
		name: "id",
		type: "input",
		message: "What is the ID of the department you want to create?"
	},{
		name:"name",
		type:"input",
		message: "What is the department name?"
	},{
		name:"costs",
		type:"input",
		message: "What is the overhead cost for this department?"
	},{
		name: "sales",
		type:"input",
		message: "What is the total sales for this department?"
	},{
		name: "profit",
		type: "input",
		message: "Do you want to calculate total profit: use calculator below?"
	}]).then(function(answer){
		//var productSales = res.total_sales
		var totalProfit = parseInt(answer.total_sales)-parseInt(answer.costs);
		connection.query("INSERT INTO departments SET ?",{
			department_id:answer.id,
			department_name:answer.name,
			over_head_costs: answer.costs,
			product_sales:answer.sales,
			total_profit: answer.profit
		}, function (err, res) {
			console.log("\n ____________________");
			console.log("==============================");
			console.log("New department created successfully");
			console.log("------------------------------");
		});
		menuOptions();
	});
}
