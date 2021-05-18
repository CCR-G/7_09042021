const sql = require("../helpers/connection");

class Post {
    constructor(post) {
        this.content = post.content;
        this.user = post.user;

    }
};

Post.create = (newPost, result) => {
    const query = `INSERT INTO Posts (content, user, postdate) VALUES ('${newPost.content}', ${newPost.user}, CURRENT_TIMESTAMP)`
    sql.query(query, newPost, (err, res) => {
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
    
        ORDER BY Posts.id DESC
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
