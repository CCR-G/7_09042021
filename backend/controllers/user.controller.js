const User = require("../models/user.model.js");
const utils = require('./utils/user-utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Le contenu de la requête est vide" });
    }

    const username = req.body.username;
    if (!username || username.length > 30) {
        return res.status(400).send({ error: `Le nom d'utilisateur doit comprendre entre 1 et 30 caractères` });
    }

    const user_email = req.body.email;
    if (!user_email || !utils.isEmailValid(user_email)) {
        return res.status(400).send({ error: "L'adresse email n'est pas valide" });
    }

    const user_password = req.body.password;
    if (!user_password || !utils.isPasswordValid(user_password)) {
        return res.status(400).send({ error: "Le mot de passe doit contenir au minimum 8 caractères et contenir au moins une majuscule et une minuscule" });
    }

    bcrypt.hash(user_password, 10)
        .then((hashed_password) => {
            const user = new User({
                username: username,
                email: user_email.toLowerCase(),
                password: hashed_password
            });

            // Save User in the database
            User.create(user, (err, created_user) => {
                if (err) {
                    return res.status(500).send({ message: err.message || "Une erreur est survenue lors de la création de l'utilisateur" });
                }
                else {
                    const token = jwt.sign({
                        user_id: created_user.id,
                        email: created_user.email,
                        username: created_user.username,
                        admin: false
                    },
                        process.env.TOKEN_SECRET_KEY,
                        { expiresIn: '1h' }
                    )
                    return res.status(200).json({
                        user: {
                            user_id: created_user.id,
                            username: created_user.username,
                            email: created_user.email,
                            admin: false
                        },
                        token: token
                    });
                }
            });
        })
        .catch(error => { res.status(500).send({ error: "Une erreur est survenu lors de la création de l'utilisateur" }) });
};

exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Le contenu de la requête est vide !" });
    }

    if (!req.body.email) {
        return res.status(400).send({ error: 'Le champ "email" ne peut être vide.' });
    }

    if (!req.body.password) {
        return res.status(400).send({ error: 'Le champ de "mot de passe" ne peut être vide.' });
    }

    User.getOneByEmail(req.body.email.toLowerCase(), (err, user) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération de l'utilisateur."
            });
        }

        if (!user) {
            return res.status(401).send({ error: 'Utilisateur non trouvé !' });
        }

        bcrypt.compare(req.body.password, user.userpassword)
            .then(valid => {
                if (!valid) {
                    return res.status(401).send({ error: 'Mot de passe incorrect !' });
                }

                const token = jwt.sign({
                    user_id: user.id,
                    email: user.email,
                    username: user.username,
                    admin: user.admin.includes(1)
                },
                    process.env.TOKEN_SECRET_KEY,
                    { expiresIn: '1h' }
                )
                return res.status(200).json({
                    user: {
                        user_id: user.id,
                        username: user.username,
                        email: user.email,
                        admin: user.admin.includes(1)
                    },
                    token: token
                });
            })
            .catch(error => { res.status(500).send({ error: "Une erreur est survenu lors de l'identification de l'utilisateur." }) });
    });
}

exports.delete = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ error: "Le contenu de la requête est vide !" });
    }

    if (!req.params.userId) {
        return res.status(400).send({ error: 'Request must contain a user id' });
    }

    if (!req.body.password) {
        return res.status(400).send({ error: 'Le champ de "mot de passe" ne peut être vide.' });
    }

    User.getOneById(req.params.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Une erreur est survenue lors de la récupération de l'utilisateur." });
        }

        if (!user) {
            return res.status(401).send({ error: 'Utilisateur non trouvé !' });
        }

        bcrypt.compare(req.body.password, user.userpassword)
            .then(valid => {
                if (!valid) {
                    return res.status(401).send({ error: 'Mot de passe incorrect !' });
                }

                User.delete(user.id, (err) => {
                    if (err) {
                        return res.status(500).send({ message: err.message || "Une erreur est survenue lors de la suppression du user." })
                    }
                    return res.status(200).send({ message: "L'utilisateur, ses articles et commentaires ont été supprimés." });
                });
            })
            .catch(error => { res.status(500).send({ error: "Une erreur est survenu lors de l'identification de l'utilisateur." }) });
    });
}
