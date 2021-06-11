const Comment = require("../models/comment.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    else {
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
            else return res.status(200).json(created_comment);
        });
    }
};

exports.findAll = (req, res) => {
    Comment.getAllById(req.params.postId, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Some error occurred while retrieving comments." });
        }
        else return res.send(data);
    });
}

exports.delete = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: "Request content can not be empty!" });
    }

    else {
        const comment_id = req.params.commentId;
        if (!comment_id) {
            return res.status(400).send({ error: 'Request must contain a comment id' });
        }

        else {
            Comment.delete(comment_id, (err) => {
                if (err) {
                    return res.status(500).send({ message: err.message || "Some error occured while deleted the comment." })
                }
                else return res.status(200).send({ message: `Comment ${comment_id} was deleted.` });
            });
        }
    }
}
