const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.SECRET_HOST,
    user: process.env.SECRET_USER,
    password: process.env.SECRET_SQLPASS,
    database: process.env.SECRET_USER,
    connectTimeout: 20000,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;
