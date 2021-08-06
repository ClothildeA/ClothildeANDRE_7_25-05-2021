const DB = require('./DataBase');

//Création de l'objet Comment
const Comment = function (comment) {
    this.message = comment.message,
        this.post_id = comment.post_id,
        this.user_id = comment.user_id,
        this.date = comment.date,
        this.id = comment.id
}

//Récupération de l'ensemble des commentaires
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
                username: element.username
            }
            return comments;
        })
        result(null, res);
    });
};

//Création d'un nouveau commentaire
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
};

//Suppression d'un commentaire
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

//Modification d'un commentaire
Comment.update = (updateComment, result) => {
    DB.query(`UPDATE comments SET 'message' = "${updateComment.message}" WHERE id = ${updateComment.id}`, updateComment, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Modification du commentaire : ", { ...udapteComment });
        result(null, { ...updateComment });
    });
};
module.exports = Comment;