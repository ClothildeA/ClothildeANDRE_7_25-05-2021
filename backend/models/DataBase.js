const mysql = require('mysql');

console.log('Get Connection...');

const options = {
		database: 'groupomania',
		host: 'localhost',
		user: 'root',
		password: '1Rischk4'
	};
	
const dbConnect = mysql.createConnection(options);

dbConnect.connect(function(err) {
	if (err) throw err;
	console.log("Connected to database!");
  });

module.exports = dbConnect;