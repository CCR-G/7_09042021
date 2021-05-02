module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.post("/users", users.create);
    app.get("/users/:userId/username", users.findUsername);
    app.get("/users/:userId/details", users.findOne);
};
