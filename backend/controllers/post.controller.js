const Post = require("../models/post.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Post
    const post = new Post({
        content: req.body.content,
        user: req.body.user,
    });

    // Save Post in the database
    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        else {
            data.forEach((post) => {
                if (post.last_comment_content) {
                    post.last_comment = { content: post.last_comment_content, author: post.last_comment_author };
                }

                delete post.last_comment_content;
                delete post.last_comment_author;
            });
            res.send(data);
        };
    });
};
