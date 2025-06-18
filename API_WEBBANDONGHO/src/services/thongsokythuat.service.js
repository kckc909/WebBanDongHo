const ThongSoKyThuat = require("../models/thongsokythuat.model");

const ThongSoKyThuatService = {};

ThongSoKyThuatService.getAll = async () => {
    try {
        return await ThongSoKyThuat.getAll();
    } catch (err) {
        throw new Error("Lỗi khi lấy tất cả thông số kỹ thuật: " + err.message);
    }
};

ThongSoKyThuatService.getById = async (id) => {
    try {
        const tskt = await ThongSoKyThuat.getById(id);
        if (!tskt) {
            throw new Error(`Thông số kỹ thuật với ID = ${id} không tồn tại.`);
        }
        return tskt;
    } catch (err) {
        throw new Error("Lỗi khi lấy thông số kỹ thuật: " + err.message);
    }
};

ThongSoKyThuatService.insert = async (tskt) => {
    try {
        return await ThongSoKyThuat.insert(tskt);
    } catch (err) {
        throw new Error("Lỗi khi thêm thông số kỹ thuật: " + err.message);
    }
};

ThongSoKyThuatService.update = async (id, tskt) => {
    try {
        return await ThongSoKyThuat.update(id, tskt);
    } catch (err) {
        throw new Error("Lỗi khi cập nhật thông số kỹ thuật: " + err.message);
    }
};

ThongSoKyThuatService.delete = async (id) => {
    try {
        return await ThongSoKyThuat.delete(id);
    } catch (err) {
        throw new Error("Lỗi khi xóa thông số kỹ thuật: " + err.message);
    }
};

module.exports = ThongSoKyThuatService;
