const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./routes/nguoidung.routes");
const loaiHangRoutes = require("./routes/loaihang.routes");
const hangDongHoRoutes = require("./routes/hangdongho.routes");
const sanPhamRoutes = require("./routes/sanpham.routes");
const anhSPRoutes = require("./routes/anhsanpham.routes");
const uploadRoutes = require("./routes/upload.routes");
const thongsokythuatRoutes= require("./routes/thongsokythuat.routes");
const donhangRoutes = require("./routes/donhang.routes");
const chitietdonhangRoutes = require("./routes/chitietdonhang.routes");

const app = express();

app.use(cors());
app.use(express.json());


// Static folder để client có thể lấy ảnh theo URL
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/loaihang", loaiHangRoutes);
app.use("/api/hangdongho", hangDongHoRoutes);
app.use("/api/sanpham", sanPhamRoutes);
app.use("/api/anhsanpham", anhSPRoutes);
app.use("/api/thongsokythuat",thongsokythuatRoutes);
app.use("/api/donhang",donhangRoutes);
app.use("/api/chitietdonhang",chitietdonhangRoutes);
app.use("/api/upload", uploadRoutes);

module.exports = app;
