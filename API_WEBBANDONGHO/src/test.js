const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config(); // Load biến môi trường từ file .env

async function testDBConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        // test
        const [rows] = await connection.query('show tables;');
        console.log(rows)


        console.log("✅ Kết nối MySQL thành công!");
        await connection.end();
    } catch (error) {
        console.error("❌ Không thể kết nối MySQL:");
        console.error("Chi tiết:", error.message);
    }
}

testDBConnection();
