const ThongSoKyThuatService = require("../services/thongsokythuat.service");

const ThongSoKyThuatController = {
  // Lấy tất cả
  getAll: async (req, res) => {
    try {
      const data = await ThongSoKyThuatService.getAll();
      res.status(200).json({message:"Danh sách thông tin tất cả thông số kỹ thuật",data});
    } catch (err) {
      console.error("Lỗi getAll:", err);
      res.status(500).json({ message: "Lỗi hệ thống khi lấy tất cả thông số kỹ thuật.", error: err.message });
    }
  },

  // Lấy theo ID
  getById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "ID không hợp lệ hoặc không được cung cấp." });
    }

    try {
      const tskt = await ThongSoKyThuatService.getById(id);

      if (!tskt) {
        return res.status(404).json({ message: `Không tìm thấy thông số kỹ thuật với ID = ${id}` });
      }

      res.status(200).json({message:"Lấy thông tin thông số kỹ thuật thành công!",tskt});
    } catch (err) {
      console.error("Lỗi getById:", err);
      res.status(500).json({ message: "Lỗi khi lấy thông số kỹ thuật.", error: err.message });
    }
  },

  // Thêm mới
  insert: async (req, res) => {
    const tskt = req.body;
    console.log("Received ThongSoKyThuat:", tskt);

  
    if (!tskt || !tskt.SanPhamID) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm hoặc thông số kỹ thuật." });
    }

    try {
      const newTSKT = await ThongSoKyThuatService.insert(tskt);
      res.status(201).json({message:"Thêm thông tin thông số kỹ thuật thành công!",newTSKT});
    } catch (err) {
      console.error("Lỗi insert:", err);
      res.status(500).json({ message: "Lỗi khi thêm thông số kỹ thuật.", error: err.message });
    }
  },

  // Cập nhật
  update: async (req, res) => {
    const { id } = req.params;
    const tskt = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "ID không hợp lệ hoặc không được cung cấp." });
    }

    try {
      const result = await ThongSoKyThuatService.update(id, tskt);
      res.status(200).json({ message: "Cập nhật thành công.", result });
    } catch (err) {
      console.error("Lỗi update:", err);
      res.status(500).json({ message: "Lỗi khi cập nhật thông số kỹ thuật.", error: err.message });
    }
  },

  // Xoá
  delete: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "ID không hợp lệ hoặc không được cung cấp." });
    }

    try {
      const result = await ThongSoKyThuatService.delete(id);
      res.status(200).json({ message: "Xóa thành công.", result });
    } catch (err) {
      console.error("Lỗi delete:", err);
      res.status(500).json({ message: "Lỗi khi xóa thông số kỹ thuật.", error: err.message });
    }
  },
};

module.exports = ThongSoKyThuatController;
