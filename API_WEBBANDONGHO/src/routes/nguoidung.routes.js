const express = require("express");
const router = express.Router();
const NguoiDungController = require("../controllers/nguoidung.controller");
const authMiddleware = require("../middleware/auth.middleware");//

// Các route người dùng - áp dụng authMiddleware nếu cần bảo vệ các route
router.get("/",  NguoiDungController.getAllUsers); // Lấy tất cả người dùng
router.get("/:id",  NguoiDungController.getUserById); // Lấy người dùng theo ID
router.post("/create", NguoiDungController.createUser); // Tạo người dùng mới
router.put("/update/:id",  NguoiDungController.updateUser); // Cập nhật người dùng
router.delete("/delete/:id",  NguoiDungController.deleteUser); // Xóa người dùng

// Đăng ký và đăng nhập (thường không cần authMiddleware)
router.post("/register", NguoiDungController.register);
router.post("/login", NguoiDungController.login);

module.exports = router;

