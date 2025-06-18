import axios from "axios";

// -------------------- TYPES ----------------------
export interface Category {
  LoaiHangID: number;
  TenLoai: string;
}

export interface Brand {
  HangID: number;
  TenHang: string;
}

export interface ProductCreateResponse {
  SanPhamID: number;
}

export interface ProductData {
  SanPhamID : number 
  LoaiHangID: number;
  HangID: number;
  TenSanPham: string;
  GiaGoc: number;
  GiaBan: number;
  SoLuongTon: number;
  MoTa: string;
  MoTaChiTiet: string;
  HinhAnh : string
  SoLuotDanhGia: number
  TongSao : number
  LuotBan : number
  NgayTao : Date
  NgayCapNhat : Date
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
export const getAllCategories = (): Promise<{ data: Category[] }> => api.get<Category[]>("/loaihang");

// ✅ 2. Lấy danh sách thương hiệu
export const getAllBrands = (): Promise<{ data: Brand[] }> =>
  api.get<Brand[]>("/brand");

// ✅ 3. Thêm sản phẩm chính (trả về SanPhamID)
export const createProduct = (
  formData: FormData
): Promise<{ data: ProductCreateResponse }> =>
  api.post("/sanpham", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ 4. Thêm thông số kỹ thuật
export const createTechSpecs = (
  data: TechSpecData[]
): Promise<{ data: string }> =>
  api.post("/thongsokythuat", data);

// ✅ 5. Upload nhiều ảnh phụ
export const uploadSubImages = (
  formData: FormData
): Promise<{ data: { message: string } }> =>
  api.post("/anhsp", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export default api;
