    const pool = require("../config/database.config");

    const AnhSP = {
    // Lấy tất cả ảnh
    getAll: async () => {
        try {
        const [rows] = await pool.query("SELECT * FROM AnhSP");
        return rows;
        } catch (err) {
        throw new Error("Lỗi lấy tất cả ảnh: " + err.message);
        }
    },

    // Lấy ảnh theo ID ảnh
    getById: async (anhSpId) => {
        try {
        const [rows] = await pool.query("SELECT * FROM AnhSP WHERE AnhSPID = ?", [anhSpId]);
        return rows[0] || null;
        } catch (err) {
        throw new Error("Lỗi lấy ảnh theo ID: " + err.message);
        }
    },

    // Lấy danh sách ảnh theo SanPhamID
    getBySanPhamId: async (sanPhamId) => {
        try {
        const [rows] = await pool.query("SELECT * FROM AnhSP WHERE SanPhamID = ?", [sanPhamId]);
        return rows;
        } catch (err) {
        throw new Error("Lỗi lấy ảnh theo SanPhamID: " + err.message);
        }
    },

    // Thêm ảnh mới
    insert: async ({ SanPhamID, TenAnh, URLAnh }) => {
        try {
        const [result] = await pool.query(
            `INSERT INTO AnhSP (SanPhamID, TenAnh, URLAnh) VALUES (?, ?, ?)`,
            [SanPhamID, TenAnh, URLAnh]
        );
        return {
            AnhSPID: result.insertId,
            SanPhamID,
            TenAnh,
            URLAnh,
        };
        } catch (err) {
        throw new Error("Lỗi thêm ảnh mới: " + err.message);
        }
    },

    // Cập nhật thông tin ảnh
    update: async (id, { SanPhamID, TenAnh, URLAnh }) => {
        try {
        const [result] = await pool.query(
            `UPDATE AnhSP SET SanPhamID = ?, TenAnh = ?, URLAnh = ?, NgayCapNhat = NOW() WHERE AnhSPID = ?`,
            [SanPhamID, TenAnh, URLAnh, id]
        );
        if (result.affectedRows === 0) return null;// ko tìm thấy bản ghi để cập nhật
        return {
            AnhSPID: id,
            SanPhamID,
            TenAnh,
            URLAnh,
        };
        } catch (err) {
        throw new Error("Lỗi cập nhật ảnh: " + err.message);
        }
    },

    // Xóa ảnh
    delete: async (id) => {
        try {
        const [result] = await pool.query(
            "DELETE FROM AnhSP WHERE AnhSPID = ?",
            [id]
        );
        return result.affectedRows > 0;// true nếu xóa thành công, false nếu không tìm thấy
        } catch (err) {
        throw new Error("Lỗi xóa ảnh: " + err.message);
        }
    },
    };

    module.exports = AnhSP;
