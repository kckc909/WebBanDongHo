const NguoiDung = require('../models/nguoidung.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
    getAll: async () => {
        return await NguoiDung.getAll();
    },

    getById: async (id) => {
        return await NguoiDung.getById(id);
    },
    
    insert: async (user) => {
        const { HoTen, Email, MatKhau, GioiTinh, DienThoai, VaiTro } = user;
        
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(MatKhau, 10);
        
        return await NguoiDung.insert({
            HoTen,
            Email,
            MatKhau: hashedPassword,
            GioiTinh,
            DienThoai,
            VaiTro: VaiTro || "user",
        });
    },

    register: async (user) => {
        const { Email, MatKhau, HoTen, GioiTinh, DienThoai, VaiTro } = user;

        // Kiểm tra email tồn tại
        const existingUser = await NguoiDung.findByEmail(Email);
        if (existingUser) {
            throw new Error("Email đã tồn tại!");
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(MatKhau, 10);

        // Thêm user mới
        const newUser = await NguoiDung.insert({
            HoTen: HoTen || "",
            Email,
            MatKhau: hashedPassword,
            GioiTinh: GioiTinh || "",
            DienThoai: DienThoai || "",
            VaiTro: VaiTro || "user",
        });

        return newUser;
    },
    
    login: async (email, password) => {
        // Tìm user theo email
        const user = await NguoiDung.findByEmail(email);
        if (!user) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.MatKhau);
        if (!isMatch) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        // Tạo JWT token
        const token = jwt.sign(
            { NguoiDungID: user.NguoiDungID, Email: user.Email, VaiTro: user.VaiTro },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return {
            token,
            user: {
                NguoiDungID: user.NguoiDungID,
                Email: user.Email,
                VaiTro: user.VaiTro,
                HoTen: user.HoTen
            }
        };
    },

    update: async (id, user) => {
        if(user.MatKhau){
        user.MatKhau = await bcrypt.hash(user.MatKhau, 10);
        }
        user.NgayCapNhat = new Date(); // cập nhật thời gian hiện tại
        return await NguoiDung.update(id, user);
    },

    delete: async (id) => {
        return await NguoiDung.delete(id);
    }
};
