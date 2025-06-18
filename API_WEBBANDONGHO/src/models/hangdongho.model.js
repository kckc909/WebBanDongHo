const pool = require("../config/database.config");

const HangDongHo = {
  // Lấy tất cả hãng đồng hồ
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM HangDongHo");
    return rows;
  },

  // Lấy hãng đồng hồ theo ID
  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM HangDongHo WHERE HangID = ?", [id]);
    return rows[0] || null;
  },

  // Thêm hãng đồng hồ (chỉ có TenHang)
  insert: async (TenHang) => {
    const [result] = await pool.query("INSERT INTO HangDongHo (TenHang) VALUES (?)", [TenHang]);
    return { HangID: result.insertId, TenHang };
  },

  // Cập nhật hãng đồng hồ (chỉ TenHang)
  update: async (id, TenHang) => {
    const [result] = await pool.query("UPDATE HangDongHo SET TenHang = ? WHERE HangID = ?", [TenHang, id]);
    return result; // object chứa affectedRows, changedRows...
  },

  // Xóa hãng đồng hồ theo ID
  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM HangDongHo WHERE HangID = ?", [id]);
    return result;
  },

  // Tìm kiếm hãng đồng hồ theo HangID hoặc TenHang
  search: async (keyword) => {
    const [rows] = await pool.query(
      "SELECT * FROM HangDongHo WHERE HangID = ? OR TenHang LIKE ?",
      [keyword, `%${keyword}%`]
    );
    return rows;
  },
};

module.exports = HangDongHo;
