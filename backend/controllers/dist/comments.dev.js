"use strict";

var Comment = require('../models/Comment'); //Création d'un nouveau commentaire


exports.create = function (req, res) {
  if (!req.body) {
    res.status(400).json({
      message: 'Erreur !'
    });
  }

  var comment = new Comment({
    message: req.body.message,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  });
  Comment.create(comment, function (err, data) {
    if (err) res.status(500).json({
      message: 'Commentaire non crée !'
    });else res.send(data);
  });
}; //Récupération de tous les commentaires


exports.findAll = function (req, res) {
  Comment.getAll(function (err, data) {
    if (err) res.status(500).send({
      message: "Commentaire non trouvé" + err
    });else res.send(data);
  });
}; //Suppression d'un commentaire


exports["delete"] = function (req, res) {
  Comment.remove(req.params.id, function (err, data) {
    console.log(req.params.id);

    if (err) {
      if (err.kind === "Non trouvé !") {
        res.status(404).json({
          message: "commentaire introuvable avec l'id : " + req.params.id
        });
      } else {
        res.status(500).json({
          message: "commentaire introuvable avec l'id : " + req.params.id
        });
      }
    } else res.json({
      message: 'commentaire supprimé avec succès !'
    });
  });
}; //Modification d'un commentaire


exports.update = function (req, res) {
  if (!req.body) {
    res.status(400).json({
      message: 'Erreur !'
    });
  }

  var comment = new Comment({
    message: req.body.message,
    id: req.body.id
  });
  console.log('req.params.id: ' + req.body.id);
  console.log('comment.id: ' + comment.id);
  Comment.update(comment, function (err, data) {
    if (err) res.status(500).json({
      message: 'Commentaire non modifié !'
    });else res.send(data);
  });
};