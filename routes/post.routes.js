module.exports = app => {
    const posts = require("../controllers/post.controller.js");

    app.post("/posts", posts.create);
    app.get("/posts", posts.findAll);
};
