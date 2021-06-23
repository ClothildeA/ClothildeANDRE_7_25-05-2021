const DB = require('./DataBase');

const User = (user) => {
    this.email = user.email,
    this.password = user.password,
    this.username = user.username,
    this.prenom = user.firstName,
    this.nom = user.lastName,
    this.creationDate = user.creationDate
}

User.getAll = result => {
  DB.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};

User.findOne = (username, result) => {
    DB.query(`SELECT * FROM users WHERE username ='${username}'`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Utilisateur trouvé : ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Non trouvé !" }, null);
    });
};

User.findById = (userId, result) => {
    DB.query(`SELECT * FROM users WHERE id ='${userId}'`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Utilisateur trouvé : ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Non trouvé !" }, null);
    });
};

User.create = (newUser, result) => {
    DB.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création de l'utilisateur : ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
}

User.remove = (id, result) => {
    DB.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Non trouvé !" }, null);
            return;
        }
        console.log("Suppression de l'utilisateur avec l'id : ", id);
        result(null, res);
    });
};

module.exports = User;