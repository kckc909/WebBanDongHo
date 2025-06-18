const express = require("express");
const router = express.Router();


const { uploadAnhSP, uploadSanPham } = require("../middleware/upload.middleware");
const UploadController = require("../controllers/upload.controller");
const AnhSPController = require("../controllers/anhsanpham.controller");

// 1. Upload nhiều ảnh và lưu vào DB bảng AnhSP
router.post("/anhsp", uploadAnhSP.array("TenAnh", 10), AnhSPController.uploadImages);

// 2. Upload ảnh sản phẩm đại diện – chỉ lưu file, không lưu DB
router.post("/sanpham", uploadSanPham.single("HinhAnh"), UploadController.upLoadImages);

// 3. Lấy danh sách ảnh đã upload từ thư mục (không liên quan DB)
router.get('/uploads/:folder', UploadController.getUploadedImages);


module.exports = router;
