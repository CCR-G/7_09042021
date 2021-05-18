const Comment = require("../models/comment.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Comment
    const comment = new Comment({
        content: req.body.content,
        user: req.body.user,
        post: req.body.post
    });

    // Save Comment in the database
    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment."
            });
        else res.send(data);
    });
};

exports.findAllByIdButTwo = (req, res) => {
    Comment.getAllById
        (req.params.postId, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving comments."
                });
            else res.send(data);
        });
}
