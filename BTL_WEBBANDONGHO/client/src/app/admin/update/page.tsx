"use client";
import React, { useEffect, useState } from "react";
import {
	getAllBrands,
	getAllCategories,
	createProduct,
	ThongSoKyThuat,
	SanPham,
	AnhSP,
	LoaiHang,
	HangDongHo,
	uploadMainImage,
	uploadSubImage,
	saveSubImageInfo,
	createThongSoKyThuat,
	uploadSubImages,
} from "@/services/productService";
import ProductInfoForm from "@/components/CreateProduct/ProductInfoForm";
import MainImageUpload from "@/components/CreateProduct/MainImageUpload";
import SubImagesUpload from "@/components/CreateProduct/SubImagesUpload";
import TechniclSpecForm from "@/components/CreateProduct/TechnicalSpecForm";// nhớ import nếu có
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";


export default function AddProductForm(productID: number) {
	// Declare 
	const newSanPham = {
		SanPhamID: 0,
		LoaiHangID: 0,
		HangID: 0,
		TenSanPham: '',
		GiaGoc: 0,
		GiaBan: 0,
		SoLuongTon: 0,
		MoTa: '',
		MoTaChiTiet: '',
		HinhAnh: '',
		SoLuotDanhGia: 0,
		TongSao: 0,
		LuotBan: 0,
		NgayTao: new Date(),
		NgayCapNhat: new Date(),
	} as SanPham
	const newThongSoKyThuat = {
		ThongSoKyThuatID: 0,
		SanPhamID: 0,
		DuongKinhMat: "",
		ChatLieuDay: "",
		ChatLieuVo: "",
		KhangNuoc: "",
		LoaiMay: "",
		NguonGoc: "",
		TrongLuong: "",
		DoDay: "",
		BaoHanh: "",
		NgayTao: new Date(),
		NgayCapNhat: new Date(),
	} as ThongSoKyThuat
	const newAnhSP = {
		AnhSPID: 0,
		SanPhamID: 0,
		TenAnh: '',
		URLAnh: '',
		NgayTao: new Date(),
		NgayCapNhat: new Date()
	} as AnhSP

	// State 
	const [sanPham, setSanPham] = useState<SanPham>(newSanPham);
	const [thongSoKyThuat, setThongSoKyThuat] = useState<ThongSoKyThuat>(newThongSoKyThuat);
	const [anhSP, setAnhSP] = useState<AnhSP>(newAnhSP);
	const [categories, setCategories] = useState<LoaiHang[]>(); // ds loại trong db
	const [brands, setBrands] = useState<HangDongHo[]>(); // ds hãng trong db

	const [mainImage, setMainImage] = useState<File | null>(null);
	const [subImages, setSubImages] = useState<File[]>([]);

	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	// Effect
	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const [cateRes, brandRes] = await Promise.all([
					getAllCategories(),
					getAllBrands(),
				]);
				setCategories(cateRes.data);
				setBrands(brandRes.data);

			} catch (err) {
				console.error("Lỗi tải loại hàng/brand:", err);
			}
		};
		fetchOptions();
	}, []);

	const handleReset = () => {
		setSanPham(newSanPham);
		setThongSoKyThuat(newThongSoKyThuat);
		setAnhSP(newAnhSP);
		setMainImage(null);
		setSubImages([]);
		setMessage("");
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setMessage("");

		try {
			let mainImageName = "";

			// 1. Upload main image
			if (mainImage) {
				const mainForm = new FormData();
				mainForm.append("HinhAnh", mainImage);
				const uploadRes = await uploadMainImage(mainForm);
				if (!uploadRes.data.files || !uploadRes.data.files[0]) throw new Error("Không nhận được tên file ảnh đại diện");
				mainImageName = uploadRes.data.files[0];
			}

			// 2. Tạo sản phẩm với tên ảnh đại diện
			const productToCreate = {
				...sanPham,
				HinhAnh: mainImageName,
			};

			const formData = new FormData();
			Object.entries(productToCreate).forEach(([key, value]) => {
				if (value instanceof Date) {
					formData.append(key, value.toISOString());
				} else {
					formData.append(key, value as any);
				}
			});

			const productRes = await createProduct(formData);
			const SanPhamID = productRes.data.data.SanPhamID;

			// 3. Lưu thông số kỹ thuật
			await createThongSoKyThuat({ ...thongSoKyThuat, SanPhamID });

			// 4. Upload và lưu subImages
			if (subImages.length > 0) {
				const subForm = new FormData();
				subForm.append("SanPhamID", String(SanPhamID));
				subImages.forEach((file) => {
					subForm.append("HinhAnh", file);
				});
				console.log("Uploading sub images: ----- ", subForm);
				await uploadSubImages(subForm);
			}

			setMessage("✅ Thêm sản phẩm thành công!");
			handleReset();

			router.push("/admin/products");
		} catch (err) {
			console.error("Lỗi khi thêm sản phẩm:", err);
			let msg = "Lỗi không xác định!";
			if (
				typeof err === "object" &&
				err !== null &&
				"isAxiosError" in err &&
				(err as AxiosError).isAxiosError
			) {
				const axiosErr = err as AxiosError<{ message?: string }>;
				msg = axiosErr.response?.data?.message || msg;
			} else if (err instanceof Error) {
				msg = err.message;
			}
			setMessage(`❌ ${msg}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
			<h2 className="text-xl font-bold">Thêm sản phẩm</h2>
			<div className="flex gap-4">
				<MainImageUpload
					mainImage={mainImage}
					handleMainImageChange={setMainImage}
				/>

				<SubImagesUpload
					subImages={subImages}
					setSubImages={setSubImages}
				/>
			</div>

			<ProductInfoForm
				productData={sanPham}
				setProductData={setSanPham}
			/>

			<TechniclSpecForm
				thongSoKyThuat={thongSoKyThuat}
				setThongSoKyThuat={setThongSoKyThuat}
			/>

			<div className="flex justify-end gap-4 mt-6">
				<button
					type="button"
					className="border border-amber-500 text-amber-500 hover:bg-amber-50 font-semibold py-2 px-6 rounded shadow"
					onClick={() => {
						router.push("/admin/products");
						handleReset();
					}}
				>
					Huỷ Thêm
				</button>
				<button
					type="submit"
					className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded shadow"
				>
					Thêm sản phẩm
				</button>
			</div>

			{message && <p className="text-sm mt-2">{message}</p>}
		</form>
	);
}

