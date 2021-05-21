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

module.exports = User;
