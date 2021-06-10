const auth = require('../middlewares/auth');

module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    app.post("/posts/:postId/comments", auth.token, comments.create);
    app.get("/posts/:postId/comments", auth.token, comments.findAll);
    app.post("/comments/:commentId/delete", auth.token, auth.admin, comments.delete);
};
