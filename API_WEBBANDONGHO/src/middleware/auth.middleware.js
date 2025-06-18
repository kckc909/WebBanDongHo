const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load biến môi trường từ file .env

const SEC_CRE = process.env.JWT_SECRET || "default_secret_key"; // Khóa bí mật

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Lấy token từ header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Không có token hoặc định dạng sai, từ chối truy cập!" });
    }

    const token = authHeader.split(" ")[1]; // Cắt lấy phần token

    try {
        const decoded = jwt.verify(token, SEC_CRE); // Giải mã token
        req.user = decoded; // Lưu thông tin user vào request
        next(); // Cho phép tiếp tục xử lý request
    } catch (error) {
        return res.status(403).json({ message: "Token không hợp lệ!" });
    }
};

module.exports = authMiddleware;
