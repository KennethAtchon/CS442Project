const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.SQLHOST,
    port: "3306",
    user: 'admin',
    password: process.env.SQLPASS,
    database: 'databasename',
  });

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;
