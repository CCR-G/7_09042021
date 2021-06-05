const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded_token = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const user_id = decoded_token.user_id;

        if (req.body.user_id && req.body.user_id !== user_id) {
            res.status(401).send({ error: "Token user is different from user" });
        } else {
            if (req.route.path === '/user/authenticate') {
                return res.status(200).json({
                    user: {
                        user_id: decoded_token.user_id,
                        email: decoded_token.email,
                        username: decoded_token.username,
                        admin: decoded_token.admin
                    }
                });
            }
            next();
        }
    } catch {
        res.status(401).send({ error: "Invalid or no authentication token" });
    }
};