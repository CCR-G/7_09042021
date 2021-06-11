const auth = require('../middlewares/auth');
const imageChecker = require('../middlewares/image-url-checker');

module.exports = app => {
    const posts = require("../controllers/post.controller.js");

    app.post("/posts", auth.token, imageChecker, posts.create);
    app.get("/posts", auth.token, posts.findAll);
    app.post("/posts/:postId/delete", auth.token, auth.admin, posts.delete);
};
