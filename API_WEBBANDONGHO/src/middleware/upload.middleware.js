const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Hàm tạo storage theo tên folder
const createStorage = (folderName) => {
  const storagePath = path.join(__dirname, `../uploads/${folderName}`);

  // Tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
  }

  
  return multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("DESTINATION - req:", req.body, "file:", file.originalname);
      cb(null, storagePath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      console.log("FILENAME - req:", req.body, "file:", uniqueName);
      cb(null, uniqueName);
    },
  });
};

// Kiểm tra định dạng file ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif)."));
  }
};

// Giới hạn kích thước file (5MB)
const limits = { fileSize: 5 * 1024 * 1024 };

// Middleware upload cho ảnh chi tiết sản phẩm (AnhSP)
console.log("Upload middleware được gọi");
const uploadAnhSP = multer({
  storage: createStorage("anhsp"),
  fileFilter,
  limits,
});

// Middleware upload cho ảnh đại diện sản phẩm (SanPham)
const uploadSanPham = multer({
  storage: createStorage("sanpham"),
  fileFilter,
  limits,
});

module.exports = {
  uploadAnhSP,
  uploadSanPham,
};
