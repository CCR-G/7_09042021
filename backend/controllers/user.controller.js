const User = require("../models/user.model.js");
const utils = require('./utils/user-utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        return res.status(400).send({ message: "Request content can not be empty!" });
    }

    if (!req.body.email) {
        return res.status(400).send({ error: 'Email field cannot be empty' });
    }

    if (!req.body.password) {
        return res.status(400).send({ error: 'Password field cannot be empty' });
    }

    User.getOneByEmail(req.body.email, (err, user) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Some error occurred while retrieving the user." });
        }

        if (!user) {
            return res.status(401).send({ error: 'Utilisateur non trouvé !' });
        }

        bcrypt.compare(req.body.password, user.userpassword)
            .then(valid => {
                if (!valid) {
                    return res.status(401).send({ error: 'Mot de passe incorrect !' });
                }

                const token = jwt.sign(
                    { user_email: user.email },
                    process.env.TOKEN_SECRET_KEY,
                    { expiresIn: '1h' }
                )

                return res.status(200).json({ username: user.username, token: token });
            })
            .catch(error => { res.status(500).send({ error }) });
        //Should be caught, and not go to front end
    });
}
