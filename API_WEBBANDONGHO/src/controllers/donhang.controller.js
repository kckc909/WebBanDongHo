const DonHangService = require("../services/donhang.service");

const DonHangController = {
  // Lấy tất cả đơn hàng
  getAll: async (req, res) => {
    try {
      const donHangs = await DonHangService.getAll();
      if (!donHangs || donHangs.length === 0) {
        return res.status(404).json({ message: "Không có đơn hàng nào." });
      }
      res.status(200).json({ message: "Danh sách đơn hàng", donHangs });
    } catch (err) {
      res.status(500).json({ message: "Lỗi hệ thống khi lấy đơn hàng.", error: err.message });
    }
  },

  // Lấy đơn hàng theo ID
  getById: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu ID đơn hàng." });

    try {
      const donHang = await DonHangService.getById(id);
      if (!donHang) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại." });
      }
      res.status(200).json(donHang);
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy đơn hàng.", error: err.message });
    }
  },

  // Thêm đơn hàng
  insert: async (req, res) => {
    const donHang = req.body;

  if (!donHang.NguoiDungID || !donHang.NgayDatHang || !donHang.ThanhTien) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc: NguoiDungID, NgayDatHang, hoặc ThanhTien." });
  }

    try {
      const newDonHang = await DonHangService.insert(donHang);
      res.status(201).json({ message: "Thêm đơn hàng thành công.", data: newDonHang });
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi thêm đơn hàng.", error: err.message });
    }
  },

  // Cập nhật đơn hàng
  update: async (req, res) => {
    const { id } = req.params;
    const donHang = req.body;

    if (!id) return res.status(400).json({ message: "Thiếu ID đơn hàng để cập nhật." });

    try {
      const message = await DonHangService.update(id, donHang);
      if (message === "Không tìm thấy đơn hàng") {
        return res.status(404).json({ message });
      }
      if (message === "Không có thay đổi nào") {
        return res.status(200).json({ message: "Dữ liệu không thay đổi." });
      }
      res.status(200).json({ message:"Sửa thành công đơn hàng!",donHang });
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng.", error: err.message });
    }
  },

  // Xóa đơn hàng
delete: async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Thiếu ID đơn hàng để xóa." });

  try {
    const message = await DonHangService.delete(id);

    // Kiểm tra message có phải là string trước khi gọi includes
    if (typeof message === "string" && message.includes("Không tìm thấy")) {
      return res.status(404).json({ message });
    }

    res.status(200).json({ message:"Xoá thành công đơn hàng!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa đơn hàng.", error: err.message });
  }
},

  // Tìm kiếm đơn hàng theo tên người nhận
  search: async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm." });
    }

    try {
      const results = await DonHangService.search(keyword);
      if (!results || results.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy đơn hàng với từ khóa "${keyword}".` });
      }
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi tìm kiếm đơn hàng.", error: err.message });
    }
  },
};

module.exports = DonHangController;
