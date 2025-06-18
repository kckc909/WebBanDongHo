"use client";
import React, { use, useEffect, useState } from "react";
import {
  getAllBrands,
  getAllCategories,
  createProduct,
  createTechSpecs,
  uploadSubImages,
} from "@/services/productService";
import ProductInfoForm from "@/components/ProductInfoForm";
import MainImageUpload from "@/components/MainImageUpload";
import SubImagesUpload from "@/components/SubImagesUpload";
import TechniclSpecForm from "@/components/TechnicalSpecForm";// nhớ import nếu có
import { AxiosError } from "axios";
import { Category } from "@/services/productService";
import { Brand } from "@/services/productService";

export default function AddProductForm() {
  // state 4 com
  const [com_1, setCom_1] = useState()
  const [com_2, setCom_2] = useState()
  const [com_3, setCom_3] = useState()
  const [com_4, setCom_4] = useState()

  // ProductInfoForm
  const Com_1Handle = () => {

  }
  // MainImageUpload
  const Com_2Handle = () => {
    
  }//SubImagesUpload
  const Com_3Handle = () => {
    
  }//TechniclSpecForm
  const Com_4Handle = () => {
    
  }


  const [productName, setProductName] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [specs, setSpecs] = useState({
    DuongKinhMat: "",
    ChatLieuDay: "",
    ChatLieuVo: "",
    KhangNuoc: "",
    LoaiMay: "",
    NguonGoc: "",
    TrongLuong: "",
    DoDay: "",
    BaoHanh: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("TenSP", productName);
      formData.append("LoaiHangID", category);
      formData.append("HangID", brand);
      if (mainImage) formData.append("AnhDaiDien", mainImage);

      const productRes = await createProduct(formData);
      const SanPhamID = productRes.data.SanPhamID;

      const techSpecArray = Object.entries(specs).map(([key, value]) => ({
        SanPhamID,
        TenThongSo: key,
        GiaTri: value,
      }));

      await createTechSpecs(techSpecArray);

      if (subImages.length > 0) {
        const subImageForm = new FormData();
        subImages.forEach((img) => subImageForm.append("images", img));
        subImageForm.append("SanPhamID", SanPhamID.toString());
        await uploadSubImages(subImageForm);
      }

      setMessage("✅ Thêm sản phẩm thành công!");
      // Reset form nếu muốn
      setProductName("");
      setCategory("");
      setBrand("");
      setMainImage(null);
      setSubImages([]);
      setSpecs({
        DuongKinhMat: "",
        ChatLieuDay: "",
        ChatLieuVo: "",
        KhangNuoc: "",
        LoaiMay: "",
        NguonGoc: "",
        TrongLuong: "",
        DoDay: "",
        BaoHanh: "",
      });
    } catch (err) {
      let msg = "Lỗi không xác định!";
      if (
        typeof err === "object" &&
        err !== null &&
        "isAxiosError" in err &&
        (err as AxiosError).isAxiosError
      ) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        msg = axiosErr.response?.data?.message || msg;
      }
      setMessage(`❌ ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">Thêm sản phẩm</h2>

      <ProductInfoForm 
        
      />

      <MainImageUpload mainImage={mainImage} setMainImage={setMainImage} />

      <SubImagesUpload subImages={subImages} setSubImages={setSubImages} />

      <TechniclSpecForm specs={specs} setSpecs={setSpecs} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Đang xử lý..." : "Thêm sản phẩm"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
