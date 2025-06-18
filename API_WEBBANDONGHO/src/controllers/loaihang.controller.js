const LoaiHangService = require('../services/loaihang.service');

const LoaiHangController = {
  getAllLoaiHang: async (req, res) => {
    try {
      const loaiHang = await LoaiHangService.getAllLoaiHang();

      if (loaiHang.length === 0) {
        return res.status(404).json({ message: 'Không có loại hàng nào trong hệ thống.' });
      }
      res.status(200).json(loaiHang);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống. Không thể lấy dữ liệu.', error });
    }
  },

getLoaiHangById: async (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Mã loại hàng không hợp lệ.' });
  }
  try {
    const loaiHang = await LoaiHangService.getLoaiHangById(id);  // gọi đúng tên hàm trong service
    if (loaiHang) {
      res.status(200).json(loaiHang);
    } else {
      res.status(404).json({ message: `Không tìm thấy loại hàng có mã ${id}.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi hệ thống khi tìm kiếm loại hàng.', error });
  }
},

  createLoaiHang: async (req, res) => {
    const { TenLoai } = req.body;
    if (!TenLoai) {
      return res.status(400).json({ message: 'Tên loại hàng không được để trống.' });
    }
    try {
      await LoaiHangService.createLoaiHang(TenLoai);
      res.status(201).json({ message: 'Thêm loại hàng thành công.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống khi thêm loại hàng.', error });
    }
  },

  updateLoaiHang: async (req, res) => {
    let id = parseInt(req.params.id);
    const { TenLoai } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Mã loại hàng không hợp lệ.' });
    }
    if (!TenLoai) {
      return res.status(400).json({ message: 'Tên loại hàng không được để trống.' });
    }
    try {
      const result = await LoaiHangService.updateLoaiHang(id, TenLoai);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `Không tìm thấy loại hàng có mã ${id} để cập nhật.` });
      }
      res.status(200).json({ message: 'Cập nhật loại hàng thành công.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống khi cập nhật loại hàng.', error });
    }
  },

  deleteLoaiHang: async (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Mã loại hàng không hợp lệ.' });
    }
    try {
      const result = await LoaiHangService.deleteLoaiHang(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `Không tìm thấy loại hàng có mã ${id} để xóa.` });
      }
      res.status(200).json({ message: 'Xóa loại hàng thành công.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống khi xóa loại hàng.', error });
    }
  },

  searchLoaiHang: async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ message: 'Vui lòng nhập từ khóa tìm kiếm.' });
    }
    try {
      const result = await LoaiHangService.searchLoaiHang(keyword);
      if (result.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy loại hàng nào phù hợp với từ khóa "${keyword}".` });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi hệ thống khi tìm kiếm loại hàng.', error });
    }
  }
};

module.exports = LoaiHangController;
