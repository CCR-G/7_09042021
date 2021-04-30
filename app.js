const express = require('express');

const helmet = require("helmet");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const db_config = require('./db-config');
const connection = require('./helpers/connection');
const query = require('./helpers/query');

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

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list', async (req, res) => {
    const conn = await connection(db_config).catch(e => { console.log(e) });
    const results = await query(conn, 'SELECT * FROM tweets').catch(console.log);
    res.json({ results });
});

// EXPORT

module.exports = app;
