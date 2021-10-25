const mysql = require("mysql2");

// connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Picklecat$4',
    database: 'employeeTracker'
});

module.exports = db;