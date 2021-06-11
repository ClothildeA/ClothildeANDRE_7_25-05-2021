const mysql = require('mysql');

const User = (user) => {
    this.email = user.email,
    this.password = user.password,
    this.firstName = user.firstName,
    this.lastName = user.lastName,
    this.creationDate = user.creationDate
}

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };
  
/*
User.create = (newUser, result) => {
    sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création de l'utilisateur : ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
}
*/

/*
exports.searchUser = customer => {
    let query = 'SELECT * FROM Users WHERE email=?';
    query = mysql.format(query, customer);
};

exports.updateUser = customer => {
    let query = 'UPDATE Users SET ??=?, WHERE ??=?';
    query = mysql.format(query, customer);
};

exports.deleteUser = customer => {
    let query = 'DELETE FROM Users WHERE email=?';
    query = mysql.format(query, customer);
};

exports.getConnectedUsers = () =>{
	let query = 'SELECT id, firstName, lastName, picture FROM Profils WHERE is_active = 1';
	query = mysql.format(query);
};
*/

