// IMPORT PACKAGE MYSQL
const mysql = require("mysql");

// Database Config
var conn = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"",
    database:'music' 
});

// Check DB Connection
conn.connect((err) => {
    if(err) { console.log(err); }
    console.log('DB Connected');
});


module.exports = conn;
