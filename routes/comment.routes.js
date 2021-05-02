module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    //app.post("/posts/:postId/comments", comments.create);
    app.get("/posts/:postId/comments", comments.findAll);
};
