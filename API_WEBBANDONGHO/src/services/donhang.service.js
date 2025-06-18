const DonHang = require("../models/donhang.model");

const DonHangService = {};

// Lấy tất cả đơn hàng
DonHangService.getAll = async () => {
  try {
    return await DonHang.getAll();
  } catch (err) {
    throw new Error("Lỗi khi lấy danh sách đơn hàng: " + err.message);
  }
};

// Lấy đơn hàng theo ID
DonHangService.getById = async (id) => {
  if (!id) throw new Error("Thiếu ID đơn hàng.");
  try {
    const result = await DonHang.getById(id);
    if (!result) throw new Error(`Đơn hàng với ID = ${id} không tồn tại.`);
    return result;
  } catch (err) {
    throw new Error("Lỗi khi lấy đơn hàng: " + err.message);
  }
};

// Thêm đơn hàng
DonHangService.insert = async (data) => {
  const { NguoiDungID, TongSoLuong, ThanhTien, TrangThai } = data;

  if (!NguoiDungID) throw new Error("Thiếu ID người dùng.");
  if (typeof TongSoLuong !== "number" || TongSoLuong <= 0) {
    throw new Error("Tổng số lượng phải là số > 0.");
  }
  if (typeof ThanhTien !== "number" || ThanhTien <= 0) {
    throw new Error("Thành tiền phải là số > 0.");
  }
  if (!TrangThai) throw new Error("Trạng thái đơn hàng không được để trống.");

  try {
    return await DonHang.insert(data);
  } catch (err) {
    throw new Error("Lỗi khi thêm đơn hàng: " + err.message);
  }
};

// Cập nhật đơn hàng
DonHangService.update = async (id, data) => {
  if (!id) throw new Error("Thiếu ID đơn hàng để cập nhật.");

  const { NguoiDungID, TongSoLuong, ThanhTien, TrangThai } = data;

  if (!NguoiDungID) throw new Error("Thiếu ID người dùng.");
  if (typeof TongSoLuong !== "number" || TongSoLuong <= 0) {
    throw new Error("Tổng số lượng phải là số > 0.");
  }
  if (typeof ThanhTien !== "number" || ThanhTien <= 0) {
    throw new Error("Thành tiền phải là số > 0.");
  }
  if (!TrangThai) throw new Error("Trạng thái đơn hàng không được để trống.");

  try {
    const result = await DonHang.update(id, data);
    if (!result) throw new Error(`Không tìm thấy đơn hàng để cập nhật.`);
    return result;
  } catch (err) {
    throw new Error("Lỗi khi cập nhật đơn hàng: " + err.message);
  }
};

// Xóa đơn hàng
DonHangService.delete = async (id) => {
  if (!id) throw new Error("Thiếu ID đơn hàng để xóa.");
  try {
    const deleted = await DonHang.delete(id);
    if (!deleted) throw new Error("Không tìm thấy đơn hàng để xóa.");
    return true;
  } catch (err) {
    throw new Error("Lỗi khi xóa đơn hàng: " + err.message);
  }
};

module.exports = DonHangService;
