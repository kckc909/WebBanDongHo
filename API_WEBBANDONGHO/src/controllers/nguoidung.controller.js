const UserService = require("../services/nguoidung.service");

const NguoiDungController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAll();
            res.json({ success: true, data: users });
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
            res.status(500).json({ success: false, message: "Lỗi server", details: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ success: false, message: "ID người dùng không hợp lệ" });

            const user = await UserService.getById(id);
            if (!user) return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });

            res.json({ success: true, data: user });
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            res.status(500).json({ success: false, message: "Lỗi server", details: error.message });
        }
    },

    register: async (req, res) => {
        try {
            const { HoTen, DienThoai, Email, MatKhau, GioiTinh, VaiTro } = req.body;
            if (!HoTen || !DienThoai || !Email || !MatKhau) {
                return res.status(400).json({ success: false, message: "Thiếu thông tin bắt buộc" });
            }

            const newUser = await UserService.register({
                HoTen,
                DienThoai,
                Email,
                MatKhau,
                GioiTinh: GioiTinh || "",
                VaiTro: VaiTro || "user",
            });

            res.status(201).json({ success: true, message: "Đăng ký thành công", data: newUser });
        } catch (error) {
            console.error("Lỗi khi đăng ký người dùng:", error);
            res.status(500).json({ success: false, message: "Lỗi server", details: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { Email, MatKhau } = req.body;
            if (!Email || !MatKhau) return res.status(400).json({ success: false, message: "Thiếu email hoặc mật khẩu" });

            const result = await UserService.login(Email, MatKhau);
            if (!result) return res.status(401).json({ success: false, message: "Thông tin đăng nhập không đúng" });

            res.json({ success: true, data: result });
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            res.status(401).json({ success: false, message: error.message || "Thông tin đăng nhập không đúng" });
        }
    },

    createUser: async (req, res) => {
        try {
            const { HoTen, Email, MatKhau, GioiTinh, DienThoai, VaiTro } = req.body;
            if (!Email || !MatKhau) {
                return res.status(400).json({ success: false, message: "Thiếu email hoặc mật khẩu" });
            }

            const newUser = await UserService.insert({
                HoTen,
                Email,
                MatKhau,
                GioiTinh: GioiTinh || "",
                DienThoai: DienThoai || "",
                VaiTro: VaiTro || "user",
            });

            res.status(201).json({ success: true, message: "Tạo tài khoản thành công", data: newUser });
        } catch (error) {
            console.error("Lỗi khi tạo người dùng:", error);
            res.status(500).json({ success: false, message: "Lỗi server", details: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ success: false, message: "ID không hợp lệ" });

            const user = req.body;

            // Không bắt buộc phải có MatKhau hoặc Email khi update, bạn có thể kiểm tra riêng nếu cần

            const result = await UserService.update(id, user);
            if (!result) return res.status(404).json({ success: false, message: "Không tìm thấy người dùng để cập nhật" });

            res.json({ success: true, message: "Cập nhật thành công", data: result });
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
            res.status(500).json({ success: false, message: "Lỗi server", details: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ success: false, message: "ID không hợp lệ" });

            const result = await UserService.delete(id);
            if (!result) return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });

            res.json({ success: true, message: "Xóa thành công", data: result });
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
            res.status(500).json({ success: false, message: "Lỗi server", details: error.message });
        }
    },
};

module.exports = NguoiDungController;
