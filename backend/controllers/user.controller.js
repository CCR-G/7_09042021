const User = require("../models/user.model.js");
const utils = require('./utils/user-utils');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    bcrypt.hash(req.body.userpassword, 10)
        .then((hashed_password) => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                userpassword: hashed_password
            });

            // Save User in the database
            User.create(user, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                else res.send(data);
            });
        })
        .catch((err) => {
            console.log("Could not create hashed password");
            console.log(err);
        })
};

exports.findOne = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Request content can not be empty!" });
        return;
    }

    if (!req.body.email) {
        res.status(400).send({ error: 'Email field cannot be empty' });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({ error: 'Password field cannot be empty' });
        return;
    }

    User.getOneByEmail(req.body.email, (err, user) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving the user." });
            return;
        }

        if (!user) {
            res.status(401).send({ error: 'Utilisateur non trouvé !' });
            return;
        }

        bcrypt.compare(req.body.password, user.userpassword)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.send(user);
            })
            .catch(error => { res.status(500).json({ error }) });
    });
}
