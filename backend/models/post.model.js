const sql = require("../helpers/connection");

class Post {
    constructor(post) {
        this.content = post.content;
        this.user = post.user;
        this.postdate = post.postdate;
    }
};

Post.create = (newPost, result) => {
    // Syntaxe MySQL à remplacer par VALUES
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created post: ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};

Post.getAll = result => {
    sql.query(`
    SELECT
    Posts.id AS post_id,
    Posts.content AS post_content,
    Posts.postdate AS post_date,
    post_user.username AS post_author,
    
        (SELECT
            COUNT(*)
            FROM Comments
            WHERE Posts.id = Comments.post
        ) AS "comments_number",
    
        (SELECT Comments.content
    FROM Comments
            WHERE post_id = Comments.post
            ORDER BY Comments.id DESC
            LIMIT 1
        ) AS "last_comment_content",
    
        (SELECT comment_user.username
            FROM Comments
    LEFT JOIN Users AS comment_user
    ON Comments.user = comment_user.id
            WHERE post_id = Comments.post
            ORDER BY Comments.id DESC
            LIMIT 1
        ) AS "last_comment_author"
        
        FROM Posts
    
    LEFT JOIN Users AS post_user
    ON Posts.user = post_user.id
    
        ORDER BY Posts.id
	;
    `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("posts: ", res);
        result(null, res);
    });
};

module.exports = Post;
