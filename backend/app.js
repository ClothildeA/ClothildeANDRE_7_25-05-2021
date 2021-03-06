const express = require('express');

/* Extensions */
const helmet = require('helmet');
const path = require('path');
const xss = require('xss-clean');
const limiter = require('./middleware/rateLimit');

/* Routes */
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();

/* Config - Xss-Clean */
app.use(xss());

/* Config - Helmet */
app.use(helmet());

/* Config - Headers */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'x-www-urlencode, x-Content-Type,  Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

/* Config - Body-Parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Config - Express-Rate-Limit */
app.use('/api/auth', limiter);

/* Routes */
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;