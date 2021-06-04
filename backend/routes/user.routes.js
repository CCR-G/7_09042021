const auth = require('../middlewares/auth');

module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.post("/user/register", users.create);
    app.post("/user/login", users.login);
    app.post("/user/authenticate", auth, users.login);
    app.post("/user/:userId/delete", auth, users.delete);
};
