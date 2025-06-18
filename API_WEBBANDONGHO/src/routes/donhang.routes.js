const express = require("express");
const DonHangController = require("../controllers/donhang.controller");

const router = express.Router();

// Lấy tất cả đơn hàng
router.get("/", DonHangController.getAll);

// Lấy đơn hàng theo ID
router.get("/:id", DonHangController.getById);

// Thêm đơn hàng
router.post("/create", DonHangController.insert);

// Cập nhật đơn hàng
router.put("/update/:id", DonHangController.update);

// Xóa đơn hàng
router.delete("/delete/:id", DonHangController.delete);

// Tìm kiếm đơn hàng theo keyword (ví dụ: tên người nhận)
router.get("/search/keyword", DonHangController.search);

module.exports = router;
