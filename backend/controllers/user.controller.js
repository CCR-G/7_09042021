const User = require("../models/user.model.js");
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

};
