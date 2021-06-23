const DB = require('./DataBase');

const Comment = (comment) => {
	this.message = comment.message,
	this.post_id = comment.post_id,
	this.user_id = comment.user_id,
	this.date = comment.date
}

Comment.getAll = result => {
    DB.query(`SELECT comments.id, comments.post_id, comments.message, comments.date, comments.user_id, users.username FROM comments INNER JOIN users ON comments.user_id = users.id ORDER BY date DESC`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        let comments = [];
        comments = res.map(element => {
            let content = new Comment(element)
            content.author = {
                username: element.username,
            }
            return commentaires;
        })
        result(null, res);
    });
};

Comment.create = (newComment, result) => {
    DB.query(`INSERT INTO comments (message, post_id, user_id, date) VALUES ("${newComment.message}","${newComment.post_id}","${newComment.user_id}", Now())`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du commentaire : ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
}

Comment.remove = (id, result) => {
    DB.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Suppression du commentaire avec l'id: ", id);
        result(null, res);
    });
};

module.exports = Comment;