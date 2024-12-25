// src/config/db.js

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: 'postgres',          // PostgreSQL username của bạn
  host: 'localhost',              // Hoặc địa chỉ IP server chứa PostgreSQL
  database: 'postgres',           // Tên cơ sở dữ liệu, đổi thành "postgres"
  password: 'postgres',      // Mật khẩu PostgreSQL
  port: 5432,                     // Cổng mặc định của PostgreSQL
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

module.exports = pool;
