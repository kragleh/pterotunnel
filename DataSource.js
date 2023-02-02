const mysql = require('mysql2');

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATA,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(sql, args, (err, rows) => {
          connection.release();
          if (err) return reject(err);
          resolve(rows);
        });
      });
    });
  }
}

module.exports = new Database();