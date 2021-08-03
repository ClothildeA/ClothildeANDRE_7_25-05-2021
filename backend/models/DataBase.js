require('dotenv').config()

const mysql = require('mysql');

console.log('Get Connection...');

const options = {
	database: 'groupomania',
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
};
const dbConnect = mysql.createConnection(options);

dbConnect.connect(function (err) {
	if (err) throw err;
	console.log("Connected to database!");
});

module.exports = dbConnect;