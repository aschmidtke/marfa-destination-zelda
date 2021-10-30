const mysql = require("mysql2");

require('dotenv').config();

// connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

module.exports = db;