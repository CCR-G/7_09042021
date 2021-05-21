const sql = require("../helpers/connection");

class User {
    constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.userpassword = user.userpassword;
    }
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.getOneByEmail = (email, result) => {
    sql.query(`SELECT * FROM Users WHERE email = '${email}';`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`user with ${email} email adress : `, res[0]);
            result(null, res[0]);
        });
};

module.exports = User;
