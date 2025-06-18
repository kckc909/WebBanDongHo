import axios from "axios";


// -------------------- TYPES ----------------------
export interface LoaiHang {
	LoaiHangID: number;
	TenLoai: string;
}

export interface HangDongHo {
	HangID: number;
	TenHang: string;
}

export interface SanPham {
	SanPhamID: number
	LoaiHangID: number;
	HangID: number;
	TenSanPham: string;
	GiaGoc: number;
	GiaBan: number;
	SoLuongTon: number;
	MoTa: string;
	MoTaChiTiet: string;
	HinhAnh: string
	SoLuotDanhGia: number
	TongSao: number
	LuotBan: number
	NgayTao: Date
	NgayCapNhat: Date
}

export interface ThongSoKyThuat {
	ThongSoKyThuatID: number
	SanPhamID: number
	DuongKinhMat: string
	ChatLieuDay: string
	ChatLieuVo: string
	KhangNuoc: string
	LoaiMay: string
	NguonGoc: string
	TrongLuong: string
	DoDay: string
	BaoHanh: string
	NgayTao: Date
	NgayCapNhat: Date
}

export interface AnhSP {
	AnhSPID: number
	SanPhamID: number
	TenAnh: string
	URLAnh: string
	NgayTao: Date
	NgayCapNhat: Date
}

export interface ProductCreateResponse {
	SanPhamID: number;
}


export interface TechSpecData {
	SanPhamID: number;
	TenThongSo: string;
	GiaTri: string;
}

// ------------------ Axios instance ------------------
const api = axios.create({
	baseURL: "http://localhost:4000/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// -------------------- API CALLS ---------------------- //

// ✅ 1. Lấy danh sách loại hàng
export const getAllCategories = (): Promise<{ data: LoaiHang[] }> => api.get<LoaiHang[]>("/loaihang");

// ✅ 2. Lấy danh sách thương hiệu
export const getAllBrands = (): Promise<{ data: HangDongHo[] }> =>
	api.get<HangDongHo[]>("/hangdongho");

// ✅ 3. Thêm sản phẩm chính (trả về SanPhamID)
export const createProduct = (
	formData: FormData
): Promise<{ data: ProductCreateResponse }> =>
	api.post("/sanpham", formData, {
		headers: { "Content-Type": "application/json" },
	});

// ✅ 4. Thêm thông số kỹ thuật
export const createThongSoKyThuat = (
	data: ThongSoKyThuat
): Promise<{ data: any }> =>
	api.post("/thongsokythuat/create", data);

// ✅ 5. Upload nhiều ảnh phụ
export const uploadSubImages = (
	formData: FormData
): Promise<{ data: { message: string } }> =>
	api.post("/anhsanpham/upload", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

export const uploadSubImage = (
	formData: FormData
): Promise<{ data: { files: string[] } }> =>
	axios.post("http://localhost:4000/api/upload/anhsanpham", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

export const saveSubImageInfo = (
	data: { SanPhamID: number; TenAnh: string; URLAnh: string }
): Promise<{ data: any }> =>
	api.post("/anhsanpham", data);

export const uploadMainImage = (
	formData: FormData
): Promise<{ data: { files: string[] } }> =>
	axios.post("http://localhost:4000/api/upload/sanpham", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

export const getAllProducts = (): Promise<{ data: SanPham[] }> =>
	api.get<SanPham[]>("/sanpham");

export const getProductById = (id: number): Promise<{ data: SanPham }> =>
	api.get<SanPham>(`/sanpham/${id}`);

export default api;
