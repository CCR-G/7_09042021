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
        postdate: req.body.postdate
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
            data.forEach((post, index) => {
                if (
                    !data[index - 1] ||
                    post.post_id !== data[index - 1].post_id
                ) {
                    if (post.comment_content) {
                        post.comments = [{ comment_content: post.comment_content, comment_author: post.comment_author }];
                    }
                    else {
                        post.comments = []
                    }

                    delete post.comment_content;
                    delete post.comment_author;
                }
                else {
                    data[index - 1].comments.push({ comment_content: post.comment_content, comment_author: post.comment_author });
                    data.splice(index, 1);
                }
            });

            res.send(data);
            console.log(data);
        }
    });
};
