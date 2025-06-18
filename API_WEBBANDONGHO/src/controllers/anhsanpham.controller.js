const AnhSPService = require("../services/anhsanpham.service");
const SanPhamService = require("../services/sanpham.service");

const AnhSPController = {
  getAll: async (req, res) => {
    try {
     
      const data = await AnhSPService.getAll();
      res.status(200).json({message:" danh sách ảnh sản phẩm!",data});
    } catch (err) {
      console.error('Lỗi khi lấy tất cả ảnh sản phẩm:', err);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy ảnh sản phẩm.' });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ.' });
      }

      const anh = await AnhSPService.getById(id);
      if (!anh) {
        return res.status(404).json({ message: 'Không tìm thấy ảnh sản phẩm với ID này.' });
      }

      res.status(200).json(anh);
    } catch (err) {
      console.error('Lỗi khi lấy ảnh sản phẩm theo ID:', err);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi truy vấn ảnh sản phẩm.' });
    }
  },

  getBySanPhamId: async (req, res) => {
    try {
      const sanPhamId = req.params.sanPhamId;
      if (!sanPhamId || isNaN(sanPhamId)) {
        return res.status(400).json({ message: 'SanPhamID không hợp lệ.' });
      }

      const data = await AnhSPService.getBySanPhamId(sanPhamId);
      res.status(200).json(data);
    } catch (err) {
      console.error('Lỗi khi lấy ảnh sản phẩm theo SanPhamID:', err);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi truy vấn ảnh theo sản phẩm.' });
    }
  },


  // Thêm 1 ảnh (upload 1 file)
  // insert: async (req, res) => {
  //   try {
  //     const { SanPhamID, TenAnh } = req.body;
  //     let URLAnh;

  //     if (req.file) {
  //       URLAnh = `/uploads/anhsp/${req.file.filename}`;
  //     } else if (req.body.URLAnh) {
  //       URLAnh = req.body.URLAnh;
  //     } else {
  //       return res.status(400).json({ message: "Cần cung cấp ảnh hoặc đường dẫn ảnh" });
  //     }

  //     const newAnh = await AnhSPService.insert({ SanPhamID, TenAnh, URLAnh });
  //     res.status(201).json(newAnh);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },

  // Upload nhiều ảnh cùng lúc
  uploadImages: async (req, res) => {
  try {
    const { SanPhamID } = req.body;

    // Kiểm tra SanPhamID
    if (!SanPhamID) {
      return res.status(400).json({ message: "Thiếu SanPhamID." });
    }

    // Kiểm tra file ảnh
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Chưa có ảnh nào được tải lên." });
    }

    const sp = await SanPhamService.getById(SanPhamID); 
    if (!sp) {
      return res.status(404).json({ message: `Không tìm thấy sản phẩm với ID = ${SanPhamID}` });
    }

    // Tạo danh sách ảnh
    const imagesData = req.files.map(file => ({
      SanPhamID: parseInt(SanPhamID),
      TenAnh: file.originalname,
      URLAnh: `/uploads/anhsp/${file.filename}`,
    }));

    // Thêm từng ảnh vào database (nên dùng Promise.all)
    const savedImages = await Promise.all(
      imagesData.map(img => AnhSPService.insert(img))
    );

    res.status(201).json({
      message: "Upload ảnh thành công.",
      images: savedImages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
},


  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { SanPhamID, TenAnh } = req.body;
      let URLAnh;

      if (req.file) {
        URLAnh = `/uploads/anhsp/${req.file.filename}`;
      } else if (req.body.URLAnh) {
        URLAnh = req.body.URLAnh;
      }

      const updatedAnh = await AnhSPService.update(id, { SanPhamID, TenAnh, URLAnh });
      res.json(updatedAnh);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await AnhSPService.delete(id);
      res.json({ message: `Xóa ảnh với ID = ${id} thành công` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = AnhSPController;
