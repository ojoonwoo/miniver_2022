const mysql = require('mysql');
const connection = mysql.createPool({
    "host": "localhost",
    "user": "root",
    "password": "alslqj~1",
    "port": "3306",
    "database": "miniver_2022"
});

module.exports = connection;