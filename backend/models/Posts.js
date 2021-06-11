const mysql = require('mysql');
const DB = require('./DataBase');

exports.getAllPosts = () => {
	let query = 'SELECT Profils.is_active AS userActive, Profils.lastName, Profils.firstName, Posts.id AS id, Posts.profil_id AS posted_by_id, Posts.title, Posts.description, Posts.media, Profils.picture, UNIX_TIMESTAMP(Posts.posted_date) AS date, (SELECT COUNT(*) FROM Comments WHERE Post_id = Posts.id) AS comment_count, likes, dislikes FROM Posts JOIN Profils ON Posts.profil_id = Profils.id ORDER BY date DESC';
	query = mysql.format(query);
};

exports.getOnePost = (id) => {
	let query = 'SELECT Profils.is_active AS userActive, Profils.lastName, Profils.firstName, Posts.id AS id, Posts.profil_id AS posted_by_id, Posts.title, Posts.description, Posts.media, Profils.picture, UNIX_TIMESTAMP(Posts.posted_date) AS date, (SELECT COUNT(*) FROM Comments WHERE Post_id = Posts.id) AS comment_count, likes, dislikes FROM Posts JOIN Profils ON Posts.profil_id = Profils.id WHERE Posts.id = ?';
	query = mysql.format(query, [id]);
};

exports.updateOnePost = (post, id) => {
};

exports.sendPost = (body) => {
};

exports.deleteOnePost = (id) => {
	let query = 'DELETE FROM Posts WHERE Posts.id = ?';
	query = mysql.format(query, [id]);
};

exports.getLikesDislikes = (id) => {
	let query = 'SELECT likes, dislikes FROM Posts WHERE id = ?';
	query = mysql.format(query, [id]);
};


exports.updateLikesDislikes = (likes, dislikes, id) => {
	let query = 'UPDATE Posts SET likes = ?, dislikes = ? WHERE id = ?';
	query = mysql.format(query, [likes, dislikes, id]);
};