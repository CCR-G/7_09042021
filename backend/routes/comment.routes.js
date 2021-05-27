const auth = require('../middlewares/auth');

module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    app.post("/posts/:postId/comments", auth, comments.create);
    app.get("/posts/:postId/comments", auth, comments.findAll);
};
