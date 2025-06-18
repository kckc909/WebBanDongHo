const pool = require("../config/database.config");

const SanPham = {};

// Lấy tất cả sản phẩm
SanPham.getAll = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM SanPham");
        return rows;
    } catch (err) {
        throw new Error("Lỗi khi lấy tất cả sản phẩm: " + err.message);
    }
};

// Lấy sản phẩm theo ID
SanPham.getById = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM SanPham WHERE SanPhamID = ?", [id]);
        return rows[0] || null;
    } catch (err) {
        throw new Error("Lỗi khi lấy sản phẩm theo ID: " + err.message);
    }
};

//  Thêm sản phẩm
SanPham.insert = async (sanPham) => {
    try {
        // Ghi chú: Ngày tạo mặc định đã có trong DB, Ngày cập nhật để null hoặc không truyền nếu muốn
        const {
            LoaiHangID,
            HangID,
            TenSanPham,
            HinhAnh,
            MoTa,
            MoTaChiTiet,
            SoLuotDanhGia = 0,
            TongSao = 0,
            GiaBan,
            GiaGoc,
            SoLuongTon = 0,
            LuotBan = 0
        } = sanPham;

        const [res] = await pool.query(
            `INSERT INTO SanPham 
            (LoaiHangID, HangID, TenSanPham, HinhAnh, MoTa, MoTaChiTiet, SoLuotDanhGia, TongSao, GiaBan, GiaGoc, SoLuongTon, LuotBan) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                LoaiHangID,
                HangID,
                TenSanPham,
                HinhAnh,
                MoTa,
                MoTaChiTiet,
                SoLuotDanhGia,
                TongSao,
                GiaBan,
                GiaGoc,
                SoLuongTon,
                LuotBan
            ]
        );

        return { SanPhamID: res.insertId };
    } catch (err) {
        throw new Error("Lỗi khi thêm sản phẩm: " + err.message);
    }
};

//  Cập nhật sản phẩm
SanPham.update = async (id, sanPham) => {
    try {
        const {
            LoaiHangID,
            HangID,
            TenSanPham,
            HinhAnh,
            MoTa,
            MoTaChiTiet,
            SoLuotDanhGia,
            TongSao,
            GiaBan,
            GiaGoc,
            SoLuongTon,
            LuotBan
        } = sanPham;

        const [result] = await pool.query(
            `UPDATE SanPham SET 
                LoaiHangID = ?, 
                HangID = ?, 
                TenSanPham = ?, 
                HinhAnh = ?, 
                MoTa = ?, 
                MoTaChiTiet = ?, 
                SoLuotDanhGia = ?, 
                TongSao = ?, 
                GiaBan = ?, 
                GiaGoc = ?, 
                SoLuongTon = ?, 
                LuotBan = ?, 
                NgayCapNhat = NOW()
            WHERE SanPhamID = ?`,
            [
                LoaiHangID,
                HangID,
                TenSanPham,
                HinhAnh,
                MoTa,
                MoTaChiTiet,
                SoLuotDanhGia,
                TongSao,
                GiaBan,
                GiaGoc,
                SoLuongTon,
                LuotBan,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return `Sản phẩm với ID = ${id} không tồn tại hoặc không có thay đổi!`;
        }

        return `Cập nhật sản phẩm ID = ${id} thành công`;
    } catch (err) {
        throw new Error("Lỗi khi cập nhật sản phẩm: " + err.message);
    }
};

//  Xóa sản phẩm
SanPham.delete = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM SanPham WHERE SanPhamID = ?", [id]);
        if (result.affectedRows === 0) {
            return `Không tìm thấy sản phẩm với ID = ${id}`;
        }
        return `Xóa sản phẩm ID = ${id} thành công`;
    } catch (err) {
        throw new Error("Lỗi khi xóa sản phẩm: " + err.message);
    }
};

//  Tìm kiếm sản phẩm theo tên, mô tả, chi tiết mô tả
SanPham.search = async (keyword) => {
    try {
        const query = `
            SELECT * FROM SanPham 
            WHERE TenSanPham LIKE ? 
            OR MoTa LIKE ? 
            OR MoTaChiTiet LIKE ?
        `;
        const likeKeyword = `%${keyword}%`;
        const [rows] = await pool.query(query, [likeKeyword, likeKeyword, likeKeyword]);
        return rows;
    } catch (err) {
        throw new Error("Lỗi khi tìm kiếm sản phẩm: " + err.message);
    }
};

//Phân trang
SanPham.getPaged = async (limit, offset) => {
    try {
        const [rows] = await pool.query("SELECT * FROM SanPham LIMIT ? OFFSET ?", [limit, offset]);
        return rows;
    } catch (err) {
        throw new Error("Lỗi khi phân trang sản phẩm: " + err.message);
    }
};

module.exports = SanPham;
