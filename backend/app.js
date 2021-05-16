const express = require('express');

const helmet = require("helmet");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

// MIDDLEWARES

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

// ROUTES

app.get('/', (req, res) => res.send('Hello World!'));

require("./routes/post.routes")(app);
require("./routes/user.routes")(app);
require("./routes/comment.routes")(app);

// EXPORT

module.exports = app;
