const sql = require("../helpers/connection");

const Comment = (comment) => {
    this.content = comment.content;
    this.user = comment.user;
    this.commentdate = comment.commentdate;
};

Comment.getAll = (postId, result) => {
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
