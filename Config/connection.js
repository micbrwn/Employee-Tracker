const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'management_db'
    },
);

db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    // console.log('Connected to the management_db.');
  });

  module.exports = db;