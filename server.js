const express = require('express');

const db_config = require('./db-config');

const connection = require('./helpers/connection');
const query = require('./helpers/query');

const app = express();

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list', async (req, res) => {
    const conn = await connection(db_config).catch(e => { console.log(e) });
    const results = await query(conn, 'SELECT * FROM tweets').catch(console.log);
    res.json({ results });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
