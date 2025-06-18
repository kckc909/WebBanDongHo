const pool = require("../config/database.config");

const DonHang = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM DonHang");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM DonHang WHERE DonHangID = ?", [id]);
    return rows[0] || null;
  },

  insert: async ({ NguoiDungID, TongSoLuong, ThanhTien, TrangThai }) => {
    const [result] = await pool.query(
      `INSERT INTO DonHang (NguoiDungID, TongSoLuong, ThanhTien, TrangThai)
       VALUES (?, ?, ?, ?)`,
      [NguoiDungID, TongSoLuong, ThanhTien, TrangThai]
    );
    return {
      DonHangID: result.insertId,
      NguoiDungID,
      TongSoLuong,
      ThanhTien,
      TrangThai,
    };
  },

  update: async (id, { NguoiDungID, TongSoLuong, ThanhTien, TrangThai }) => {
    const [result] = await pool.query(
      `UPDATE DonHang 
       SET NguoiDungID = ?, TongSoLuong = ?, ThanhTien = ?, TrangThai = ?, NgayCapNhat = NOW()
       WHERE DonHangID = ?`,
      [NguoiDungID, TongSoLuong, ThanhTien, TrangThai, id]
    );
    if (result.affectedRows === 0) return null;
    return { DonHangID: id, NguoiDungID, TongSoLuong, ThanhTien, TrangThai };
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM DonHang WHERE DonHangID = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = DonHang;
