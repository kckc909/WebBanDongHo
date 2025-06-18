// services/LoaiHangService.js
const LoaiHang = require('../models/loaihang.model');

const LoaiHangService = {
  getAllLoaiHang: async () => {
    return await LoaiHang.getAll();
  },

  getLoaiHangById: async (LoaiHangID) => {
    return await LoaiHang.getById(LoaiHangID);
  },

  createLoaiHang: async (TenLoai) => {
    return await LoaiHang.create(TenLoai);
  },

  updateLoaiHang: async (LoaiHangID, TenLoai) => {
    return await LoaiHang.update(LoaiHangID, TenLoai);
  },

  deleteLoaiHang: async (LoaiHangID) => {
    return await LoaiHang.delete(LoaiHangID);
  },

  searchLoaiHang: async (keyword) => {
    return await LoaiHang.search(keyword);
  }
};

module.exports = LoaiHangService;
