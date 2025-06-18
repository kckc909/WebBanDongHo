const SanPham = require("../models/sanpham.model");

const SanPhamService = {};

// Lấy tất cả sản phẩm
SanPhamService.getAll = async () => {
  try {
    return await SanPham.getAll();
  } catch (err) {
    throw new Error("Lỗi khi lấy tất cả sản phẩm: " + err.message);
  }
};

// Lấy sản phẩm theo ID
SanPhamService.getById = async (id) => {
  if (!id) throw new Error("Thiếu ID sản phẩm.");
  try {
    const sanPham = await SanPham.getById(id);
    if (!sanPham) {
      throw new Error(`Sản phẩm với ID = ${id} không tồn tại.`);
    }
    return sanPham;
  } catch (err) {
    throw new Error("Lỗi khi lấy sản phẩm: " + err.message);
  }
};

// Thêm sản phẩm
SanPhamService.insert = async (sanPham) => {
  if (!sanPham.TenSanPham) {
    throw new Error("Tên sản phẩm không được để trống.");
  }
  if (typeof sanPham.GiaBan !== "number" || sanPham.GiaBan <= 0) {
    throw new Error("Giá bán phải là số lớn hơn 0.");
  }
  // Các validation khác nếu cần

  try {
    return await SanPham.insert(sanPham);
  } catch (err) {
    throw new Error("Lỗi khi thêm sản phẩm: " + err.message);
  }
};

// Cập nhật sản phẩm
SanPhamService.update = async (id, sanPham) => {
  if (!id) throw new Error("Thiếu ID sản phẩm để cập nhật.");
  if (!sanPham.TenSanPham) {
    throw new Error("Tên sản phẩm không được để trống.");
  }
  try {
    return await SanPham.update(id, sanPham);
  } catch (err) {
    throw new Error("Lỗi khi cập nhật sản phẩm: " + err.message);
  }
};

// Xóa sản phẩm
SanPhamService.delete = async (id) => {
  if (!id) throw new Error("Thiếu ID sản phẩm để xóa.");
  try {
    return await SanPham.delete(id);
  } catch (err) {
    throw new Error("Lỗi khi xóa sản phẩm: " + err.message);
  }
};

// Tìm kiếm sản phẩm theo từ khóa
SanPhamService.search = async (keyword) => {
  if (!keyword) throw new Error("Vui lòng nhập từ khóa tìm kiếm.");
  try {
    return await SanPham.search(keyword);
  } catch (err) {
    throw new Error("Lỗi khi tìm kiếm sản phẩm: " + err.message);
  }
};

// Lấy sản phẩm phân trang
SanPhamService.getPaged = async (limit, offset) => {
  if (typeof limit !== 'number' || limit <= 0) {
    throw new Error("Tham số limit phải là số nguyên dương.");
  }
  if (typeof offset !== 'number' || offset < 0) {
    throw new Error("Tham số offset phải là số nguyên không âm.");
  }

  try {
    return await SanPham.getPaged(limit, offset);
  } catch (err) {
    throw new Error("Lỗi khi phân trang sản phẩm: " + err.message);
  }
};

module.exports = SanPhamService;
