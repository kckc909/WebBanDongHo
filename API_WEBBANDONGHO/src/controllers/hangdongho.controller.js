const HangDongHoService = require("../services/hangdongho.service");

const HangDongHoController = {
  // Lấy danh sách hãng đồng hồ
  getAll: async (req, res) => {
    try {
      const data = await HangDongHoService.getAll();
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Không có hãng đồng hồ nào." });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Lỗi hệ thống khi lấy danh sách hãng đồng hồ.", error: error.message });
    }
  },

  // Lấy hãng đồng hồ theo ID
  getById: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu mã hãng đồng hồ." });

    try {
      const data = await HangDongHoService.getById(id);
      if (!data) {
        return res.status(404).json({ message: `Không tìm thấy hãng đồng hồ có mã ${id}.` });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Lỗi hệ thống khi tìm hãng đồng hồ.", error: error.message });
    }
  },
//Them hãng đồng hồ

create: async (req, res) => {
    const { TenHang } = req.body;
    if (!TenHang) {
      return res.status(400).json({ message: 'Tên loại hàng không được để trống.' });
    }
    try {
      await HangDongHoService.insert(TenHang);
      res.status(201).json({ message: 'Thêm loại hàng thành công.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống khi thêm loại hàng.', error });
    }
  },


  // Cập nhật hãng đồng hồ
  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const { TenHang } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Mã hãng đồng hồ không hợp lệ.' });
    }
    if (!TenHang) {
      return res.status(400).json({ message: 'Tên hãng đồng hồ không được để trống.' });
    }
    try {
      const result = await HangDongHoService.update(id, TenHang);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `Không tìm thấy hãng đồng hồ có mã ${id} để cập nhật.` });
      }
      res.status(200).json({ message: 'Cập nhật hãng đồng hồ thành công.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống khi cập nhật hãng đồng hồ.', error });
    }
  },

  // Xóa hãng đồng hồ
  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Mã hãng đồng hồ không hợp lệ.' });
    }
    try {
      const result = await HangDongHoService.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `Không tìm thấy hãng đồng hồ có mã ${id} để xóa.` });
      }
      res.status(200).json({ message: 'Xóa hãng đồng hồ thành công.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống khi xóa hãng đồng hồ.', error });
    }
  },


  // Tìm kiếm hãng đồng hồ
   search: async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ message: 'Vui lòng nhập từ khóa tìm kiếm.' });
    }
    try {
      const result = await HangDongHoService.searchHang(keyword);
      if (result.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy hãng đồng hồ nào phù hợp với từ khóa "${keyword}".` });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống khi tìm kiếm hãng đồng hồ.', error });
    }
  }
};
module.exports = HangDongHoController;
