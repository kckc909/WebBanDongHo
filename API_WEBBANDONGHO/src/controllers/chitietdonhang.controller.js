const ChiTietDonHangService = require("../services/chitietdonhang.service");

const ChiTietDonHangController = {
  getAll: async (req, res) => {
    try {
      const ctdhList = await ChiTietDonHangService.getAll();
      if (!ctdhList || ctdhList.length === 0) {
        return res.status(404).json({ message: "Không có chi tiết đơn hàng nào." });
      }
      res.status(200).json(ctdhList);
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy chi tiết đơn hàng.", error: err.message });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu ID chi tiết đơn hàng." });

    try {
      const ctdh = await ChiTietDonHangService.getById(id);
      res.status(200).json(ctdh);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  getByDonHangId: async (req, res) => {
    const { donHangId } = req.params;
    if (!donHangId) return res.status(400).json({ message: "Thiếu ID đơn hàng." });

    try {
      const ctdhList = await ChiTietDonHangService.getByDonHangId(donHangId);
      if (!ctdhList || ctdhList.length === 0) {
        return res.status(404).json({ message: "Không có chi tiết đơn hàng nào cho đơn hàng này." });
      }
      res.status(200).json(ctdhList);
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy chi tiết đơn hàng.", error: err.message });
    }
  },

  insert: async (req, res) => {
    const ctdh = req.body;
    if (!ctdh.DonHangID || !ctdh.SanPhamID || !ctdh.SoLuong || !ctdh.DonGia || !ctdh.TongTien) {
      return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc." });
    }

    try {
      const newCtdh = await ChiTietDonHangService.insert(ctdh);
      res.status(201).json({ message: "Thêm chi tiết đơn hàng thành công.", data: newCtdh });
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi thêm chi tiết đơn hàng.", error: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const ctdh = req.body;


    if (!id) return res.status(400).json({ message: "Thiếu ID chi tiết đơn hàng để cập nhật." });

    try {
      const message = await ChiTietDonHangService.update(id, ctdh);
      if (message === "Không tìm thấy chi tiết đơn hàng") {
        return res.status(404).json({ message });
      }
      res.status(200).json({ message });
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật chi tiết đơn hàng.", error: err.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu ID chi tiết đơn hàng để xóa." });

    try {
      const message = await ChiTietDonHangService.delete(id);
      if (typeof message === "string" && message.includes("Không tìm thấy")) {
        return res.status(404).json({ message });
      }
      res.status(200).json({ message });
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi xóa chi tiết đơn hàng.", error: err.message });
    }
  },
};

module.exports = ChiTietDonHangController;
