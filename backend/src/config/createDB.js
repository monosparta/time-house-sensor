require("dotenv").config();
const mysql = require("mysql2/promise");

const dbName = process.env.DB_DATABASE;

mysql
  .createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((_res) => {
      console.info("Database create or successfully checked");
      process.exit(0);
    });
  });
