const ChiTietDonHang = require("../models/chitietdonhang.model");

const ChiTietDonHangService = {
  getAll: async () => {
    try {
      return await ChiTietDonHang.getAll();
    } catch (err) {
      throw new Error("Lỗi khi lấy chi tiết đơn hàng: " + err.message);
    }
  },

  getById: async (id) => {
    if (!id) throw new Error("Thiếu ID chi tiết đơn hàng.");
    try {
      const ctdh = await ChiTietDonHang.getById(id);
      if (!ctdh) throw new Error("Chi tiết đơn hàng không tồn tại.");
      return ctdh;
    } catch (err) {
      throw new Error("Lỗi khi lấy chi tiết đơn hàng: " + err.message);
    } 
  },

  getByDonHangId: async (donHangId) => {
    if (!donHangId) throw new Error("Thiếu ID đơn hàng.");
    try {
      const ctdhList = await ChiTietDonHang.getByDonHangId(donHangId);
      return ctdhList;
    } catch (err) {
      throw new Error("Lỗi khi lấy chi tiết đơn hàng theo đơn hàng: " + err.message);
    }
  },

  insert: async (ctdh) => {
    if (!ctdh.DonHangID || !ctdh.SanPhamID || !ctdh.SoLuong || !ctdh.DonGia || !ctdh.TongTien) {
      throw new Error("Thiếu dữ liệu bắt buộc.");
    }
    try {
      return await ChiTietDonHang.insert(ctdh);
    } catch (err) {
      throw new Error("Lỗi khi thêm chi tiết đơn hàng: " + err.message);
    }
  },

  update: async (id, ctdh) => {
    if (!id) throw new Error("Thiếu ID chi tiết đơn hàng để cập nhật.");
    try {
      return await ChiTietDonHang.update(id, ctdh);
    } catch (err) {
      throw new Error("Lỗi khi cập nhật chi tiết đơn hàng: " + err.message);
    }
  },

  delete: async (id) => {
    if (!id) throw new Error("Thiếu ID chi tiết đơn hàng để xóa.");
    try {
      return await ChiTietDonHang.delete(id);
    } catch (err) {
      throw new Error("Lỗi khi xóa chi tiết đơn hàng: " + err.message);
    }
  },
};

module.exports = ChiTietDonHangService;
