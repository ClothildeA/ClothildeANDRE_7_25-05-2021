const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
	windowMs: 15 * 60 * 1000, //blocage de 15min
	max: 100, //limite chaque IP à 100 requêtes par windowMs
});