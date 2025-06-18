const SanPhamService = require("../services/sanpham.service");

const SanPhamController = {
	// Lấy tất cả sản phẩm
	getAll: async (req, res) => {
		try {
			const sanPhams = await SanPhamService.getAll();
			if (!sanPhams || sanPhams.length === 0) {
				return res.status(404).json({ message: "Không có sản phẩm nào." });
			}
			res.status(200).json({ message: "Danh sách sản phẩm!", sanPhams });
		} catch (err) {
			res.status(500).json({ message: "Lỗi hệ thống khi lấy tất cả sản phẩm.", error: err.message });
		}
	},

	// Lấy sản phẩm phân trang
	getPaged: async (req, res) => {
		let { limit, offset } = req.query;

		limit = parseInt(limit, 10);
		offset = parseInt(offset, 10);

		if (isNaN(limit) || limit <= 0) {
			return res.status(400).json({ message: "Tham số limit phải là số nguyên dương." });
		}
		if (isNaN(offset) || offset < 0) {
			return res.status(400).json({ message: "Tham số offset phải là số nguyên không âm." });
		}

		try {
			const sanPhams = await SanPhamService.getPaged(limit, offset);
			if (!sanPhams || sanPhams.length === 0) {
				return res.status(404).json({ message: "Không có sản phẩm trong trang này." });
			}
			res.status(200).json(sanPhams);
		} catch (err) {
			res.status(500).json({ message: "Lỗi khi phân trang sản phẩm.", error: err.message });
		}
	},

	// Lấy sản phẩm theo ID
	getById: async (req, res) => {
		const { id } = req.params;
		if (!id) return res.status(400).json({ message: "Thiếu ID sản phẩm." });

		try {
			const sanPham = await SanPhamService.getById(id);
			if (!sanPham) {
				return res.status(404).json({ message: "Sản phẩm không tồn tại." });
			}
			res.status(200).json(sanPham);
		} catch (err) {
			res.status(500).json({ message: "Lỗi hệ thống khi lấy sản phẩm.", error: err.message });
		}
	},

	// Thêm sản phẩm, có xử lý upload ảnh (req.file)
	insert: async (req, res) => {
		const sanPham = req.body;

		if (!sanPham.TenSanPham) {
			return res.status(400).json({ message: "Tên sản phẩm không được để trống." });
		}

		if (!sanPham.HinhAnh) {
			return res.status(400).json({ message: "Hình ảnh sản phẩm không được để trống." });
		}

		// Xử lý giá bán
		if (typeof sanPham.GiaBan === "string") {
			sanPham.GiaBan = parseFloat(sanPham.GiaBan);
			if (isNaN(sanPham.GiaBan)) {
				return res.status(400).json({ message: "Giá bán phải là số hợp lệ." });
			}
		} else if (typeof sanPham.GiaBan !== "number") {
			return res.status(400).json({ message: "Giá bán phải là số." });
		}

		try {
			const newSanPhamID = await SanPhamService.insert(sanPham);
			res.status(200).json({ message: "Thêm sản phẩm thành công.", data: newSanPhamID });
		} catch (err) {
			res.status(500).json({ message: "Lỗi khi thêm sản phẩm.", error: err.message });
		}
	},

	// Cập nhật sản phẩm, có xử lý upload ảnh (req.file)
	// Cập nhật sản phẩm
	update: async (req, res) => {
		const { id } = req.params;
		const sanPham = req.body;

		if (!id) return res.status(400).json({ message: "Thiếu ID sản phẩm để cập nhật." });

		if (!sanPham.TenSanPham) {
			return res.status(400).json({ message: "Tên sản phẩm không được để trống." });
		}

		if (sanPham.GiaBan !== undefined) {
			if (typeof sanPham.GiaBan === "string") {
				sanPham.GiaBan = parseFloat(sanPham.GiaBan);
				if (isNaN(sanPham.GiaBan)) {
					return res.status(400).json({ message: "Giá bán phải là số hợp lệ." });
				}
			} else if (typeof sanPham.GiaBan !== "number") {
				return res.status(400).json({ message: "Giá bán phải là số." });
			}
		}

		try {
			const message = await SanPhamService.update(id, sanPham);
			if (message === "Không tìm thấy sản phẩm") {
				return res.status(404).json({ message });
			}
			if (message === "Không có thay đổi nào") {
				return res.status(200).json({ message: "Dữ liệu không thay đổi." });
			}
			res.status(200).json({ message });
		} catch (err) {
			res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm.", error: err.message });
		}
	},

	// Xóa sản phẩm
	delete: async (req, res) => {
		const { id } = req.params;
		if (!id) return res.status(400).json({ message: "Thiếu ID sản phẩm để xóa." });

		try {
			const message = await SanPhamService.delete(id);
			if (message.includes("Không tìm thấy")) {
				return res.status(404).json({ message });
			}
			res.status(200).json({ message });
		} catch (err) {
			res.status(500).json({ message: "Lỗi khi xóa sản phẩm.", error: err.message });
		}
	},

	// Tìm kiếm sản phẩm theo từ khóa
	search: async (req, res) => {
		const { keyword } = req.query;
		if (!keyword) {
			return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm." });
		}

		try {
			const products = await SanPhamService.search(keyword);
			if (!products || products.length === 0) {
				return res.status(404).json({ message: `Không tìm thấy sản phẩm với từ khóa "${keyword}".` });
			}
			res.status(200).json(products);
		} catch (err) {
			res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm.", error: err.message });
		}
	},
};

module.exports = SanPhamController;
