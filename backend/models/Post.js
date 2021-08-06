const DB = require('./DataBase');

//Création de l'objet Post
const Post = function (post) {
    this.titre = post.titre,
        this.content = post.content,
        this.post_id = post.id,
        this.imageUrl = post.imageUrl,
        this.comments = post.comments ? post.comments : [],
        this.date = post.date,
        this.user_id = post.user_id
}

//Récupération de l'ensemble des Posts
Post.getAll = result => {
    DB.query(`SELECT posts.id, posts.titre, posts.content, posts.imageUrl, posts.date, posts.user_id, users.username FROM posts INNER JOIN users ON posts.user_id = users.id ORDER BY date DESC`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        let posts = [];
        posts = res.map(element => {
            let topic = new Post(element)
            topic.author = {
                username: element.username,
            }
            return topic;
        })
        result(null, posts);
    });
};

//Création d'un nouveau Post
Post.create = (newPost, result) => {
    DB.query(`INSERT INTO posts (titre, content, imageUrl, user_id, date) VALUES ("${newPost.titre}","${newPost.content}","${newPost.imageUrl}","${newPost.user_id}", Now())`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du post : ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};

//Récupération d'un Post
Post.findById = (postId, result) => {
    DB.query(`SELECT * FROM posts WHERE id = ${postId} ORDER BY date DESC`,
        (err, res) => {
            if (err) {
                console.log("erreur: ", err);
                result(err, null);
                return;
            }
            if (res, postId) {
                let posts = [];
                posts = res.map(element => {
                    let topic = new Post(element)
                    topic.author = {
                        username: element.username,
                    }
                    return topic;
                })
                console.log("Post trouvé ! : ", posts);
                result(null, posts);
                return;
            }
            // Post avec l'id non trouvé
            result({ kind: "Non trouvé" }, null);
        })
};

//Suppression d'un Post
Post.remove = (id, result) => {
    DB.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Non trouvé !" }, null);
            return;
        }
        console.log("Suppression du post avec l'id : ", id);
        result(null, res);
    });
};

module.exports = Post;