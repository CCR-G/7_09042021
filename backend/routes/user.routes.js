module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.post("/user/register", users.create);
    app.post("/user/login", users.findOne);
};
