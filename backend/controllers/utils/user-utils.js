const User = require("../../models/user.model");
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

module.exports = {
    createSecureUser: async function (username, email, password, salt = 10) {
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
    },

    isEmailValid: (email) => {
        const mail_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return mail_regex.test(email);
    },

    getToken: (user) => {
        return {
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN_SECRET_KEY,
                { expiresIn: '1h' }
            )
        }
    }
}