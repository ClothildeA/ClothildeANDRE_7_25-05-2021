const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Récupération de tous les utilisateurs
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

//Création d'un nouvel utilisateur
exports.signup = (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Erreur !" })
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let role = "USER"
            if (req.body.isAdmin) {
                role = req.body.isAdmin;
            }

            const user = {
                email: req.body.email,
                password: hash,
                username: req.body.username,
                nom: req.body.nom,
                prenom: req.body.prenom,
                isAdmin: role
            }
            User.create(user, (err, data) => {
                if (err)
                    res.status(500).json({ message: "Utilisateur non crée !" + err })
                else res.send(data);
            })
        }).catch(err => res.status(500).json({ message: "Il y a une erreur :" + err }))
}

//Connexion d'un utilisateur
exports.login = (req, res) => {

    //Récupération de l'utilisateur
    User.findOne(req.body.username, (err, user) => {
        if (err) {
            res.status(400).json({ message: err })
        }

        //Vérification du mot de passe
        if (user) {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: "Mot de passe incorrect !" })
                    }

                    //Token
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({ userId: user.id }, 'SECRET_TOKEN', {
                            expiresIn: '10h'
                        })
                    })
                })
        }
    })
}


//Récupération d'un utilisateur
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Customer with id ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};

//Suppression d'un utilisateur
exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        console.log(req.params.id);
        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Utilisateur introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "Utilisateur introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: "Utilisateur supprimé avec succès !" })
    })
}