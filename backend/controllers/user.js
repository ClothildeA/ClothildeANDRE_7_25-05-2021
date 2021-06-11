const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');


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
  
/*
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'})) // Created
                .catch(error => res.status(400).json({ error })); // Bad request
        })
        .catch(error => res.status(500).json({ error })); // Internal server error
};
*/

/*
// CRÉATION D'UN UTILISATEUR 
exports.signup = (req, res) => {	

    if (!req.body) {
        res.status(400).json({ message: "Erreur !" })
    }

bcrypt.hash(req.body.password, 10)
.then(hash => {

	const user = {
		email: req.body.email,
		password: hash,
		lastName: req.body.lastName,
		firstName: req.body.firstName,
	}
	User.create(user, (err, data) => {
		if (err)
			res.status(500).json({ message: "Utilisateur non crée !" + err })
		else res.send(data);
	})
}).catch(err => res.status(500).json({ message: "Il y a une erreur :" + err }))
}
*/

/*exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10)
	.then(hash => {
		User.createUser([req.body.email, hash])
		.then(user => {
			if(req.body.firstName && req.body.lastName)
			{
				let infos = [req.body.firstName, req.body.lastName, req.body.email, req.body.picture]
				User.createProfil(infos)
				.then(profil => {
					res.status(201).json({message: "created user", noProfil: false});
				})
				.catch(error => {console.log(error); res.status(500).json({ error })})
			}
			else
			{
				res.status(201).json({message: "created user", noProfil: true});
			}
		})
		.catch(err => {
			if(err.code == 'ER_DUP_ENTRY')
			{
				res.status(403).json({error: "Adresse email déja utilisée"})
			}
			res.status(500).json({error: "Erreur interne"})
		});
	})
	.catch(error => res.status(500).json({ error }));
};*/

/*
exports.deleteAcount = (req, res) => {

}

exports.signin = (req, res) => {
	User.searchUser([req.body.email])
	.then(user => {
		bcrypt.compare(req.body.password, user[0].password)
		.then(valide => {
			if(!valide)
			{
				res.status(401).json({error: "Mot de passe incorrect"})
			}
			res.status(200).json({message: 'Connecté !'});
		})
		.catch(error => res.status(500).json({ error }));
	})
	.catch(error => {console.log(error); res.status(403).json({error: "Aucun utilisateur n'a été trouvé !"})})
}

exports.signout = (req, res) => {
};

exports.getUserProfil = (req, res) => {

};

exports.setUserProfil = (req, res) => {

};

exports.getConnected = (req, res) => {
	User.getConnectedUsers()
	.then(users => {
		res.status(200).json(users);
	})
	.catch(error => {console.log(error); res.status(500).json({ error })})
}
*/