const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

            next();
    } catch {
        res.status(401).send({ error: "Invalid or no authentication token" });
    }
};