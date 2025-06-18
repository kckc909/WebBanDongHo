const pool = require("../config/database.config");

const NguoiDung = {};

// Lấy người dùng theo ID
NguoiDung.getById = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM NguoiDung WHERE NguoiDungID = ?", [id]);
        return rows[0] || null;
    } catch (err) {
        throw err;
    }
};

// Lấy tất cả người dùng
NguoiDung.getAll = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM NguoiDung");
        return rows;
    } catch (err) {
        throw err;
    }
};

// Đăng nhập người dùng (chưa mã hóa mật khẩu)
NguoiDung.login = async (email, pass) => {
    try {
        const [rows] = await pool.query("SELECT * FROM NguoiDung WHERE Email = ? AND MatKhau = ?", [email, pass]);
        return rows[0] || null;
    } catch (err) {
        throw err;
    }
};

// Thêm người dùng mới
NguoiDung.insert = async (user) => {
    try {
        const [res] = await pool.query(
            `INSERT INTO NguoiDung (HoTen, MatKhau, GioiTinh, Email, DienThoai, VaiTro) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [user.HoTen, user.MatKhau, user.GioiTinh, user.Email, user.DienThoai, user.VaiTro]
        );
        return { NguoiDungID: res.insertId, ...user };
    } catch (err) {
        throw err;
    }
};

// Tìm người dùng theo email
NguoiDung.findByEmail = async (email) => {
    try {
        const [rows] = await pool.query("SELECT * FROM NguoiDung WHERE Email = ?", [email]);
        return rows[0] || null;
    } catch (err) {
        throw err;
    }
};

// Cập nhật người dùng
NguoiDung.update = async (id, user) => {
    try {
        const [result] = await pool.query(
            `UPDATE NguoiDung SET 
                HoTen = ?, 
                MatKhau = ?, 
                GioiTinh = ?, 
                Email = ?, 
                DienThoai = ?, 
                VaiTro = ?, 
                NgayCapNhat = NOW()
             WHERE NguoiDungID = ?`,
            [user.HoTen, user.MatKhau, user.GioiTinh, user.Email, user.DienThoai, user.VaiTro, id]
        );

        return result.affectedRows > 0;
    } catch (err) {
        throw err;
    }
};

// Xóa người dùng
NguoiDung.delete = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM NguoiDung WHERE NguoiDungID = ?", [id]);
        return result.affectedRows > 0;
    } catch (err) {
        throw err;
    }
};

module.exports = NguoiDung;
