const express = require('express');
const mysql = require ('mysql');

const userRoutes = require('./routes/user');
/*
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
*/

const User = require('./models/User.js');
const DB = require('./models/DataBase');

const app = express();

/* Config - Headers */
app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Headers', 'x-www-urlencode, x-Content-Type,  Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

/* Config - Body-Parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */

/*
app.use('/images', express.static(path.join(__dirname, 'images')));
*/
app.use('/api/auth', userRoutes);


/*
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
*/

module.exports = app;