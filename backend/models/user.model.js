const sql = require("../helpers/connection");

class User {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.userpassword = user.password;
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
    sql.query(`SELECT * FROM Users WHERE email = ?;`, email,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`user with ${email} email address : `, res[0]);
            result(null, res[0]);
        });
};

User.getOneById = (user_id, result) => {
    sql.query(`SELECT * FROM Users WHERE id = ?;`, user_id,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`user ${user_id} : `, res[0]);
            result(null, res[0]);
        });
};

User.delete = (user_id, result) => {
    const query = `
    DELETE Comments
        FROM Comments
            RIGHT JOIN Posts
            ON Posts.id = Comments.post
        WHERE Comments.user = ? OR Posts.user = ?
    ;`

    sql.query(query, [user_id, user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        else console.log(`Comments with user id ${user_id} were deleted`);
    });

    sql.query(
        `DELETE Images FROM Images RIGHT JOIN Posts ON Posts.id = Images.post WHERE Posts.user = ?;`,
        user_id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`Images related to user ${user_id} were deleted.`);
        });

    sql.query(`DELETE FROM Posts WHERE user = ?;`, user_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        else console.log(`Posts with user id ${user_id} were deleted.`);
    });

    sql.query(`DELETE FROM Users WHERE id = ?;`, user_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        else {
            console.log(`User with id ${user_id} was deleted.`);
            result(null, res[0]);
        }
    });
}

module.exports = User;
