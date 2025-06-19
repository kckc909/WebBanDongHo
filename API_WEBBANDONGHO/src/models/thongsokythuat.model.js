const pool = require("../config/database.config");

const ThongSoKyThuat = {};

// Lấy tất cả thông số kỹ thuật
ThongSoKyThuat.getAll = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM ThongSoKyThuat");
        return rows;
    } catch (err) {
        throw new Error("Lỗi khi lấy tất cả thông số kỹ thuật: " + err.message);
    }
};

// Lấy thông số kỹ thuật theo ID
ThongSoKyThuat.getById = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM ThongSoKyThuat WHERE ThongSoKyThuatID = ?", [id]);
        return rows[0] || null;
    } catch (err) {
        throw new Error("Lỗi khi lấy thông số kỹ thuật theo ID: " + err.message);
    }
};

// Thêm thông số kỹ thuật
ThongSoKyThuat.insert = async (tskt) => {
    try {
        const {
            SanPhamID,
            DuongKinhMat,
            ChatLieuDay,
            ChatLieuVo,
            KhangNuoc,
            LoaiMay,
            NguonGoc,
            TrongLuong,
            DoDay,
            BaoHanh
        } = tskt;

        const [res] = await pool.query(
            `INSERT INTO ThongSoKyThuat 
            (SanPhamID, DuongKinhMat, ChatLieuDay, ChatLieuVo, KhangNuoc, LoaiMay, NguonGoc, TrongLuong, DoDay, BaoHanh) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [SanPhamID, DuongKinhMat, ChatLieuDay, ChatLieuVo, KhangNuoc, LoaiMay, NguonGoc, TrongLuong, DoDay, BaoHanh]
        );

        return { ThongSoKyThuatID: res.insertId, ...tskt };
    } catch (err) {
        throw new Error("Lỗi khi thêm thông số kỹ thuật: " + err.message);
    }
};

// Cập nhật thông số kỹ thuật
ThongSoKyThuat.update = async (id, tskt) => {
    try {
        const {
            SanPhamID,
            DuongKinhMat,
            ChatLieuDay,
            ChatLieuVo,
            KhangNuoc,
            LoaiMay,
            NguonGoc,
            TrongLuong,
            DoDay,
            BaoHanh
        } = tskt;

        const [result] = await pool.query(
            `UPDATE ThongSoKyThuat SET
                SanPhamID = ?,
                DuongKinhMat = ?,
                ChatLieuDay = ?,
                ChatLieuVo = ?,
                KhangNuoc = ?,
                LoaiMay = ?,
                NguonGoc = ?,
                TrongLuong = ?,
                DoDay = ?,
                BaoHanh = ?,
                NgayCapNhat = NOW()
            WHERE ThongSoKyThuatID = ?`,
            [SanPhamID, DuongKinhMat, ChatLieuDay, ChatLieuVo, KhangNuoc, LoaiMay, NguonGoc, TrongLuong, DoDay, BaoHanh, id]
        );

        if (result.affectedRows === 0) {
            return `Thông số kỹ thuật với ID = ${id} không tồn tại hoặc không có thay đổi!`;
        }

        return `Cập nhật thông số kỹ thuật ID = ${id} thành công`;
    } catch (err) {
        throw new Error("Lỗi khi cập nhật thông số kỹ thuật: " + err.message);
    }
};

// Xóa thông số kỹ thuật
ThongSoKyThuat.delete = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM ThongSoKyThuat WHERE ThongSoKyThuatID = ?", [id]);
        if (result.affectedRows === 0) {
            return `Không tìm thấy thông số kỹ thuật với ID = ${id}`;
        }
        return `Xóa thông số kỹ thuật ID = ${id} thành công`;
    } catch (err) {
        throw new Error("Lỗi khi xóa thông số kỹ thuật: " + err.message);
    }
};

// Lấy thông số kỹ thuật theo ID sản phẩm
ThongSoKyThuat.getBySanPhamId = async (sanPhamId) => {
    try {
        const [rows] = await pool.query("SELECT * FROM ThongSoKyThuat WHERE SanPhamID = ?", [sanPhamId]);
        if (rows.length === 0) {
            throw new Error(`Không tìm thấy thông số kỹ thuật cho sản phẩm với ID = ${sanPhamId}`);
        }
        return rows;
    } catch (err) {
        throw new Error("Lỗi khi lấy thông số kỹ thuật theo sản phẩm: " + err.message);
    }
}


module.exports = ThongSoKyThuat;
