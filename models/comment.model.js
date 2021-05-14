const sql = require("../helpers/connection");

class Comment {
    constructor(comment) {
        this.content = comment.content;
        this.user = comment.user;
        this.post = comment.post;
    }
};

Comment.create = (newComment, result) => {
    // Syntaxe MySQL à remplacer par VALUES
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created post: ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

module.exports = Comment;
