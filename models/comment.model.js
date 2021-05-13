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


Comment.getAll = (postId, result) => {
    console.log(postId)
    sql.query(`SELECT * FROM comments WHERE post=${postId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("comments: ", res);
        result(null, res);
    });
};

module.exports = Comment;
