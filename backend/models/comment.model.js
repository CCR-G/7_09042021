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

        console.log("created comment: ", { id: res.insertId, ...newComment });

        sql.query(`SELECT username FROM Users WHERE id = ${newComment.user};`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("comment's author: ", res[0].username);

            console.log("created comment: ", { author: res[0].username, content: newComment.content });
            result(null, { author: res[0].username, content: newComment.content });
        });
    });
};

Comment.getAllById = (postId, result) => {
    sql.query(`
    SELECT 
        Comments.content AS content,
        comment_user.username AS author
        
        FROM Comments
        
        LEFT JOIN Users AS comment_user
            ON Comments.user = comment_user.id
        
        WHERE post = ${postId}
        ORDER BY Comments.id DESC
    ;
    `, (err, res) => {
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
