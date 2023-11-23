const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.SQLHOST,
    port: "3306",
    user: 'admin',
    password: process.env.SQLPASS,
    database: 'databasename',
    connectionLimit: 20, // Adjust this value based on your needs
    waitForConnections: true,
    queueLimit: 0,
});

// Handle connection errors
pool.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed. Reconnecting...');
        // You can add retry logic here
    } else {
        throw err;
    }
});

module.exports = pool.promise();

// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: process.env.SQLHOST,
//     port: "3306",
//     user: 'admin',
//     password: process.env.SQLPASS,
//     database: 'databasename'
//   });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//     } else {
//         console.log('Connected to MySQL database');
//     }
// });

// module.exports = connection;