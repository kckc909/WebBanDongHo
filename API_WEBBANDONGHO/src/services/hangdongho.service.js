const HangDongHo = require("../models/hangdongho.model");

const HangDongHoService = {
  getAll: async () => {
    try {
      return await HangDongHo.getAll();
    } catch (err) {
      throw new Error("Lỗi lấy tất cả hãng: " + err.message);
    }
  },

  getById: async (id) => {
    try {
      return await HangDongHo.getById(id);
    } catch (err) {
      throw new Error("Lỗi lấy hãng theo ID: " + err.message);
    }
  },

  insert: async (hang) => {
    try {
      return await HangDongHo.insert(hang);
    } catch (err) {
      throw new Error("Lỗi thêm hãng: " + err.message);
    }
  },

  update: async (id, hang) => {
    try {
      return await HangDongHo.update(id, hang);
    } catch (err) {
      throw new Error("Lỗi cập nhật hãng: " + err.message);
    }
  },

  delete: async (id) => {
    try {
      return await HangDongHo.delete(id);
    } catch (err) {
      throw new Error("Lỗi xóa hãng: " + err.message);
    }
  },

  search: async (keyword) => {
    try {
      return await HangDongHo.search(keyword);
    } catch (err) {
      throw new Error("Lỗi tìm kiếm hãng: " + err.message);
    }
  }
};

module.exports = HangDongHoService;
