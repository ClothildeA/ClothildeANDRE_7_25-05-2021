"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DB = require('./DataBase'); //Création de l'objet Comment


var Comment = function Comment(comment) {
  this.message = comment.message, this.post_id = comment.post_id, this.user_id = comment.user_id, this.date = comment.date, this.id = comment.id;
}; //Récupération de l'ensemble des commentaires


Comment.getAll = function (result) {
  DB.query("SELECT comments.id, comments.post_id, comments.message, comments.date, comments.user_id, users.username FROM comments INNER JOIN users ON comments.user_id = users.id ORDER BY date DESC", function (err, res) {
    if (err) {
      console.log("erreur: ", err);
      result(null, err);
      return;
    }

    var comments = [];
    comments = res.map(function (element) {
      var content = new Comment(element);
      content.author = {
        username: element.username
      };
      return comments;
    });
    result(null, res);
  });
}; //Création d'un nouveau commentaire


Comment.create = function (newComment, result) {
  DB.query("INSERT INTO comments (message, post_id, user_id, date) VALUES (\"".concat(newComment.message, "\",\"").concat(newComment.post_id, "\",\"").concat(newComment.user_id, "\", Now())"), function (err, res) {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    console.log("Création du commentaire : ", _objectSpread({
      id: res.insertId
    }, newComment));
    result(null, _objectSpread({
      id: res.insertId
    }, newComment));
  });
}; //Suppression d'un commentaire


Comment.remove = function (id, result) {
  DB.query("DELETE FROM comments WHERE id = ?", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("Suppression du commentaire avec l'id: ", id);
    result(null, res);
  });
}; //Modification d'un nouveau commentaire


Comment.update = function (updateComment, result) {
  DB.query("UPDATE comments SET 'message' = \"".concat(updateComment.message, "\" WHERE comments.id = ").concat(updateComment.id), function (err, res) {
    if (err) {
      console.log("erreur: ", err);
      result(err, null);
      return;
    }

    console.log('updateComment.id: ' + updateComment.id);
    console.log("Modification du commentaire : ", _objectSpread({}, udapteComment));
    result(null, _objectSpread({}, updateComment));
  });
};

module.exports = Comment;