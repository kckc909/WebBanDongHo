const express = require("express");
const router = express.Router();
const ChiTietDonHangController = require("../controllers/chitietdonhang.controller");

// Lấy tất cả chi tiết đơn hàng
router.get("/", ChiTietDonHangController.getAll);

// Lấy chi tiết đơn hàng theo ID
router.get("/:id", ChiTietDonHangController.getById);

// Lấy chi tiết đơn hàng theo ID đơn hàng
router.get("/:donHangId", ChiTietDonHangController.getByDonHangId);

// Thêm chi tiết đơn hàng
router.post("/create", ChiTietDonHangController.insert);

// Cập nhật chi tiết đơn hàng
router.put("/update/:id", ChiTietDonHangController.update);

// Xóa chi tiết đơn hàng
router.delete("/delete/:id", ChiTietDonHangController.delete);

module.exports = router;
