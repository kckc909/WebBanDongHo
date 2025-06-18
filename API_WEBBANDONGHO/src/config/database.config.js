const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function checkConnection() {
  try {
    const connection = await pool.getConnection();

    if (!connection) throw new Error("Không lấy được kết nối MySQL");

    console.log("✅ Kết nối MySQL thành công!");
    connection.release(); // Trả kết nối về pool 
  } catch (err) {
    console.error("❌ Lỗi kết nối MySQL:", err.message);
  }
}

// Chạy kiểm tra kết nối khi khởi động
checkConnection();

module.exports = pool;