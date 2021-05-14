module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    app.post("/posts/:postId/comments", comments.create);
};
