var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'admin',
        password:'Admin.1234',
        database: 'payfast'
    });
}

module.exports = function() {
    console.log('conectou no bd');
    return createDBConnection;
}