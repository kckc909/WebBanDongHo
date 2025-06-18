const express = require("express");
const router = express.Router();
const AnhSPController = require("../controllers/anhsanpham.controller");
const { uploadAnhSP } = require("../middleware/upload.middleware");

// Upload nhiều ảnh phụ cho sản phẩm
router.post("/upload", uploadAnhSP.array("HinhAnh", 10), AnhSPController.uploadImages);

//  Lấy tất cả ảnh
router.get("/", AnhSPController.getAll);

//  Lấy ảnh theo ID
router.get("/:id", AnhSPController.getById);

//  Lấy ảnh theo sản phẩm
router.get("/anhsanpham/:sanPhamId", AnhSPController.getBySanPhamId);

// Cập nhật ảnh
router.put("/:id", AnhSPController.update);

//  Xoá ảnh
router.delete("/:id", AnhSPController.delete);

module.exports = router;
