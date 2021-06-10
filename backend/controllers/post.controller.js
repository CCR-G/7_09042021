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
    Post.create(post, (err, created_post) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Post." });
        }
        else res.status(200).json(created_post);
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
                    post.last_comment = {
                        id: post.last_comment_id,
                        content: post.last_comment_content,
                        author: post.last_comment_author
                    };
                }

                delete post.last_comment_content;
                delete post.last_comment_author;
            });
            res.send(data);
        };
    });
};

exports.delete = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: "Request content can not be empty!" });
    }

    const post_id = req.params.postId;
    if (!post_id) {
        return res.status(400).send({ error: 'Request must contain a post id' });
    }

    Post.delete(post_id, (err) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Some error occured while deleting the post." })
        }
        return res.status(200).send({ message: `Post ${post_id} was deleted.` });
    });
}