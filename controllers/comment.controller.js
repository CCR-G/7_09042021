const Comment = require("../models/comment.model.js");

exports.findAll = (req, res) => {
    Comment.getAll(req.params.postId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};
