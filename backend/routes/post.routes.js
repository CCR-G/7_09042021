const auth = require('../middlewares/auth');

module.exports = app => {
    const posts = require("../controllers/post.controller.js");

    app.post("/posts", auth, posts.create);
    app.get("/posts", auth, posts.findAll);
};
