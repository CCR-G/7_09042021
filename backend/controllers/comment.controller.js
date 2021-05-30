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
        user: req.body.user_id,
        post: req.body.post_id
    });

    // Save Comment in the database
    Comment.create(comment, (err, created_comment) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Comment." });
        }
        res.status(200).json(created_comment);
    });
};

exports.findAll = (req, res) => {
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
