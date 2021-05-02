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
    sql.query("SELECT * FROM posts", (err, res) => {
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
