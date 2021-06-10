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
        result(null, { id: res.insertId, ...newComment });
    });
};

Comment.getAllById = (postId, result) => {
    sql.query(`
    SELECT 
        Comments.id AS id,
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

Comment.delete = (comment_id, result) => {
    sql.query(`DELETE Comments FROM Comments WHERE id = ?;`, comment_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`Comments with id ${comment_id} was deleted`, res[0]);
        result(null, res[0]);
    });
}

module.exports = Comment;
