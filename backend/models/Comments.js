const mysql = require('mysql');
const DB = require('./DataBase');

exports.getByPostId = (id) => {
	let query = 'SELECT Comments.id AS id, Comments.profil_id, Profils.lastName, Profils.firstName, UNIX_TIMESTAMP(Comments.comment_date) AS date, Comments.comment_text AS text, Comments.likes, Comments.dislikes FROM Comments JOIN Profils ON Comments.profil_id = Profils.id WHERE Comments.post_id = ? ORDER BY comment_date DESC';
	query = mysql.format(query, [id]);
};

exports.getOneById = (id) => {
	let query = 'SELECT * FROM Comments WHERE id = ?';
	query = mysql.format(query, [id]);
};

exports.sendComment = (body) => {
	let query = 'INSERT INTO Comments (comment_text, post_id, profil_id, comment_date) VALUES (?, ?, (SELECT id FROM Profils WHERE user_id = ?), NOW())';
	query = mysql.format(query, [body.text, body.post_id, body.user_id]);
};

exports.getLikesDislikes = (id) => {
	let query = 'SELECT likes, dislikes FROM Comments WHERE id = ?';
	query = mysql.format(query, [id]);
};


exports.updateLikesDislikes = (likes, dislikes, id) => {
	let query = 'UPDATE Comments SET likes = ?, dislikes = ? WHERE id = ?';
	query = mysql.format(query, [likes, dislikes, id]);
};

exports.updateOneComment = (comment, id) => {
	let query = 'UPDATE Comments SET comment_text = ? WHERE id = ?';
	query = mysql.format(query, [comment, id]);
};

exports.deleteOneComment = (id) => {
	let query = 'DELETE FROM Comments WHERE id = ?';
	query = mysql.format(query, [id]);
};