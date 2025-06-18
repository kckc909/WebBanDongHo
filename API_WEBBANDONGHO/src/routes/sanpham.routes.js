const express = require("express");
const router = express.Router();
const SanPhamController = require("../controllers/sanpham.controller");

//  Get tất cả sản phẩm
router.get("/", SanPhamController.getAll);

//  Get sản phẩm theo ID
router.get("/:id", SanPhamController.getById);

//  Thêm sản phẩm (dùng tên file ảnh đã upload sẵn)
router.post("/", SanPhamController.insert);

//  Cập nhật sản phẩm
router.put("/:id", SanPhamController.update);

//  Xoá sản phẩm
router.delete("/:id", SanPhamController.delete);

module.exports = router;
