const Post = require('../models/Post');
const Comment = require('../models/Comment');
const fs = require('fs');

exports.findAll = (req, res) => {

    Post.getAll((err, posts) => {
        if (err)
            res.status(500).send({ message: "Aucun posts trouvés !" + err });
        else {

            //Récupération de tous les commentaires
            Comment.getAll((err, comments) => {
                if (err) {
                    res.status(500).send({ message: "Aucun commentaires trouvés !" + err });
                } else {
                    comments.forEach(comment => {
                        let post = posts.find(elt => elt.post_id === comment.post_id)
                        post.comments.push(comment)
                    })
                    res.send(posts)
                }
            }
            )
        }
    })
}


exports.create = (req, res) => {
    if (!req.file) {
    	const post = new Post({
        	titre: req.body.titre,
        	content: req.body.content,
        	imageUrl: "",
        	user_id: req.body.user_id
    	})
    	Post.create(post, (err, data) => {
        	if (err)
            	res.status(500).json({ message: "Post non créé !" })
    		else res.send(data)
    	})

    } else {
        const post = new Post({
        titre: req.body.titre,
        content: req.body.content,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        user_id: req.body.user_id
    })

    Post.create(post, (err, data) => {
        if (err)
            res.status(500).json({ message: "Post non créé !" })
        else res.send(data)
    })
    }
}

exports.findOne = (req, res) => {

    Post.findById(req.params.id, (err, posts) => {
        if (err) {
            res.status(500).send({ message: "Aucun post trouvé !" + err });
        }
        else {
            Comment.getAll((err, comments) => {
                if (err) {
                    res.status(500).send({ message: "Aucun commentaires trouvés !" + err });
                } else {
                    comments.forEach(comment => {
                        if (posts[0].post_id === comment.post_id) {
                            posts[0].comments.push(comment)
                        }
                    })
                }
                res.send(posts)
            })
        }
    })
}

exports.delete = (req, res) => {
         
    Post.remove(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Post introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "Post introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: 'Post supprimé avec succès !' })
    })
}