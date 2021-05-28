const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

            if (req.route.path === '/user/authenticate') {
                return res.status(200).json({ email: decodedToken.email, username: decodedToken.username });
            }
            next();
    } catch {
        res.status(401).send({ error: "Invalid or no authentication token" });
    }
};