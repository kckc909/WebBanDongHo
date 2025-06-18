const pool = require("../config/database.config");

const LoaiHang = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM LoaiHang");
    return rows;
  },

  getById: async (LoaiHangID) => {
    const [rows] = await pool.query("SELECT * FROM LoaiHang WHERE LoaiHangID = ?", [LoaiHangID]);
    return rows[0] || null;
  },

  create: async (TenLoai) => {
    const [result] = await pool.query("INSERT INTO LoaiHang (TenLoai) VALUES (?)", [TenLoai]);
    return { LoaiHangID: result.insertId, TenLoai };
  },

  update: async (LoaiHangID, TenLoai) => {
    const [result] = await pool.query("UPDATE LoaiHang SET TenLoai = ? WHERE LoaiHangID = ?", [TenLoai, LoaiHangID]);
    return result.affectedRows > 0;
  },

  delete: async (LoaiHangID) => {
    const [result] = await pool.query("DELETE FROM LoaiHang WHERE LoaiHangID = ?", [LoaiHangID]);
    return result.affectedRows > 0;
  },

  search: async (keyword) => {
    // Nếu keyword là số, tìm theo LoaiHangID; luôn tìm theo TenLoai
    const id = parseInt(keyword);
    const [rows] = await pool.query(
      "SELECT * FROM LoaiHang WHERE (LoaiHangID = ? OR TenLoai LIKE ?)",
      [isNaN(id) ? 0 : id, `%${keyword}%`]
    );
    return rows;
  }
};

module.exports = LoaiHang;
