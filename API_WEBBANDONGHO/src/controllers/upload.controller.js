import fs from 'fs';
import path from 'path';


const uploadFolderPath = path.join(process.cwd(), 'uploads/sanpham');

// Upload 1 ảnh duy nhất

export async function upLoadImages(req, res) {

  console.log("req.file =", req.file);
  console.log("req.files =", req.files);

  try {
    if (!req.file && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ message: 'Không có file ảnh nào được tải lên.' });
    }

    let uploadedFileNames = [];

    // Trường hợp 1 ảnh dùng .single()
    if (req.file) {
      uploadedFileNames.push(path.basename(req.file.path));
    }

    // Trường hợp nhiều ảnh dùng .array()
    if (req.files && Array.isArray(req.files)) {
      const fileNames = req.files.map(file => path.basename(file.path));
      uploadedFileNames = uploadedFileNames.concat(fileNames);
    }

    return res.status(201).json({
      message: 'Tải ảnh lên thành công.',
      files: uploadedFileNames,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Lỗi khi tải ảnh lên.',
      error: err.message,
    });
  }
}



//  Lấy danh sách ảnh đã upload
// Lấy danh sách ảnh đã upload theo folder
export async function getUploadedImages(req, res) {
  const folderName = req.params.folder;
  console.log('Received folder:', folderName);

  // Kiểm tra folder hợp lệ
  const validFolders = ['sanpham', 'anhsp'];
  if (!folderName || !validFolders.includes(folderName)) {
    console.log('Folder không hợp lệ');
    return res.status(400).json({ message: 'Folder không hợp lệ' });
  }

  // Đường dẫn tuyệt đối đến thư mục uploads
  const uploadFolderPath = path.join(process.cwd(), 'src/uploads', folderName);
  console.log('Upload folder path:', uploadFolderPath);

  try {
    // Kiểm tra folder có tồn tại không
    if (!fs.existsSync(uploadFolderPath)) {
      console.log(`Thư mục ảnh ${folderName} chưa tồn tại.`);
      return res.status(404).json({ message: `Thư mục ảnh ${folderName} chưa tồn tại.` });
    }

    // Đọc file trong folder
    fs.readdir(uploadFolderPath, (err, files) => {
      if (err) {
        console.error(`Không thể đọc thư mục ảnh ${folderName}.`, err);
        return res.status(500).json({ message: `Không thể đọc thư mục ảnh ${folderName}.`, error: err.message });
      }

      console.log('File trong thư mục:', files);

      // Lọc file ảnh theo đuôi mở rộng
      const allowedExt = ['.jpg', '.jpeg', '.png', '.gif'];
      const imageFiles = files.filter(file => allowedExt.includes(path.extname(file).toLowerCase()));

      console.log('File ảnh lọc ra:', imageFiles);

      // Tạo URL cho ảnh (nếu bạn đã mount static /uploads)
      const imageUrls = imageFiles.map(file => `/uploads/${folderName}/${file}`);

      console.log('URL ảnh trả về:', imageUrls);

      return res.status(200).json({ images: imageUrls });
    });
  } catch (error) {
    console.error(`Lỗi khi lấy ảnh ${folderName}:`, error);
    return res.status(500).json({ message: `Lỗi khi lấy ảnh ${folderName}.`, error: error.message });
  }
}
