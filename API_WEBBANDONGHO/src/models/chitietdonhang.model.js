const pool = require("../config/database.config");

const ChiTietDonHang = {
  // Lấy tất cả chi tiết đơn hàng
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM ChiTietDonHang");
    return rows;
  },

  // Lấy chi tiết theo ID
  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM ChiTietDonHang WHERE ChiTietDHID = ?", [id]);
    return rows[0];
  },

  // Lấy chi tiết theo đơn hàng
  getByDonHangId: async (donHangId) => {
    const [rows] = await pool.query("SELECT * FROM ChiTietDonHang WHERE DonHangID = ?", [donHangId]);
    return rows;
  },

  // Thêm chi tiết đơn hàng
  insert: async (ctdh) => {
    const { DonHangID, SanPhamID, SoLuong, DonGia } = ctdh;

    if (!DonHangID || !SanPhamID || !SoLuong || !DonGia) {
      throw new Error("Thiếu thông tin bắt buộc");
    }

    const TongTien = SoLuong * DonGia;
    const ngayCapNhat = new Date();

    const [result] = await pool.query(
      `INSERT INTO ChiTietDonHang 
      (DonHangID, SanPhamID, SoLuong, DonGia, TongTien, NgayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [DonHangID, SanPhamID, SoLuong, DonGia, TongTien, ngayCapNhat]
    );

    return { ChiTietDHID: result.insertId, DonHangID, SanPhamID, SoLuong, DonGia, TongTien, NgayCapNhat: ngayCapNhat };
  },

  // Cập nhật chi tiết đơn hàng
  update: async (id, ctdh) => {
    if (!ctdh) throw new Error("Dữ liệu không hợp lệ");

    const { DonHangID, SanPhamID, SoLuong, DonGia } = ctdh;

    if (!DonHangID || !SanPhamID || !SoLuong || !DonGia) {
      throw new Error("Thiếu thông tin bắt buộc");
    }

    const TongTien = SoLuong * DonGia;
  
    const [result] = await pool.query(
      `UPDATE ChiTietDonHang SET
        DonHangID = ?, SanPhamID = ?, SoLuong = ?, DonGia = ?, TongTien = ?
       WHERE ChiTietDHID = ?`,
      [DonHangID, SanPhamID, SoLuong, DonGia, TongTien, id]
    );

    return result.affectedRows > 0
      ? "Cập nhật chi tiết đơn hàng thành công"
      : "Không tìm thấy chi tiết đơn hàng";
  },

  // Xoá chi tiết đơn hàng
  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM ChiTietDonHang WHERE ChiTietDHID = ?", [id]);
    return result.affectedRows > 0
      ? "Xóa chi tiết đơn hàng thành công"
      : "Không tìm thấy chi tiết đơn hàng";
  },
};

module.exports = ChiTietDonHang;
