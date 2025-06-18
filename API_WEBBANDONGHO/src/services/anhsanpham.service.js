const AnhSP = require("../models/anhsanpham.model");

const AnhSPService = {
  getAll: async () => {
    try {
      return await AnhSP.getAll();
    } catch (err) {
      throw new Error("Lỗi khi lấy tất cả ảnh: " + err.message);
    }
  },

  getById: async (id) => {
    if (!id) throw new Error("Thiếu ID ảnh.");
    try {
      const anh = await AnhSP.getById(id);
      if (!anh) throw new Error(`Không tìm thấy ảnh với ID = ${id}`);
      return anh;
    } catch (err) {
      throw new Error("Lỗi khi lấy ảnh theo ID: " + err.message);
    }
  },

  getBySanPhamId: async (sanPhamId) => {
    console.log("ID SP:",sanPhamId);
    if (!sanPhamId) throw new Error("Thiếu ID sản phẩm.");
    try {
      return await AnhSP.getBySanPhamId(sanPhamId);
    } catch (err) {
      throw new Error("Lỗi khi lấy ảnh theo sản phẩm: " + err.message);
    }
  },

  insert: async (data) => {
    // Có thể kiểm tra dữ liệu đầu vào bắt buộc ở đây (ví dụ: SanPhamID, URLAnh)
    if (!data.SanPhamID) throw new Error("Thiếu ID sản phẩm cho ảnh.");
    if (!data.URLAnh) throw new Error("Thiếu URL ảnh.");
    try {
      return await AnhSP.insert(data);
    } catch (err) {
      throw new Error("Lỗi khi thêm ảnh: " + err.message);
    }
  },

  update: async (id, data) => {
    if (!id) throw new Error("Thiếu ID ảnh để cập nhật.");
    try {
      const updated = await AnhSP.update(id, data);
      if (!updated) throw new Error(`Không tìm thấy ảnh để cập nhật với ID = ${id}`);
      return updated;
    } catch (err) {
      throw new Error("Lỗi khi cập nhật ảnh: " + err.message);
    }
  },

  delete: async (id) => {
    if (!id) throw new Error("Thiếu ID ảnh để xóa.");
    try {
      const deleted = await AnhSP.delete(id);
      if (!deleted) throw new Error(`Không tìm thấy ảnh để xóa với ID = ${id}`);
      return deleted;
    } catch (err) {
      throw new Error("Lỗi khi xóa ảnh: " + err.message);
    }
  },
};

module.exports = AnhSPService;
