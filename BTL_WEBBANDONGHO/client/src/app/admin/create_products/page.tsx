"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function AddProductForm() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  //   const [subImages, setSubImages] = useState<File[]>([]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [detailDesc, setDetailDesc] = useState("");

  // Technical specs
  const [duongKinhMat, setDuongKinhMat] = useState("");
  const [chatLieuDay, setChatLieuDay] = useState("");
  const [chatLieuVo, setChatLieuVo] = useState("");
  const [khangNuoc, setKhangNuoc] = useState("");
  const [loaiMay, setLoaiMay] = useState("");
  const [nguonGoc, setNguonGoc] = useState("");
  const [trongLuong, setTrongLuong] = useState("");
  const [doDay, setDoDay] = useState("");
  const [baoHanh, setBaoHanh] = useState("");

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const categories = [
    { id: 1, name: "Đồng hồ nam" },
    { id: 2, name: "Đồng hồ nữ" },
  ];

  const brands = [
    { id: 1, name: "Rolex" },
    { id: 2, name: "Casio" },
  ];

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ productName, category, brand, mainImage });
    // Submit logic...
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 space-y-6">
      {/* --- Phần trên: ảnh chính + ảnh phụ --- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Ảnh chính */}
        <div className="p-6 rounded-lg bg-white shadow-md w-full max-w-md">
          <h3 className="font-semibold text-center mb-2">Ảnh chính</h3>

          {mainImage ? (
            <div className="relative w-full aspect-square rounded overflow-hidden">
              <Image
                src={URL.createObjectURL(mainImage)}
                alt="Main Preview"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-400 rounded">
              Chưa có ảnh
            </div>
          )}

          {/* Nút thêm ảnh */}
          <div className="mt-4 text-center">
            <label className="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-600 transition">
              Thêm ảnh
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                hidden
              />
            </label>
          </div>
        </div>

        {/* 2. Ảnh phụ */}
        <div className="md:col-span-2 p-6  ">
          <h3 className="font-semibold mb-2 bg-white shadow-md p-5 rounded-t-lg">
            Ảnh phụ
          </h3>
          <div className="bg-white shadow-md p-5 border-t-0 rounded-b-lg">
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:border-orange-400 transition">
              <label className="cursor-pointer block space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  hidden
                />
                <div className="text-orange-500 text-3xl">
                  <i className="pi pi-cloud-upload" />
                </div>
                <p className="text-gray-500">
                  Kéo thả ảnh hoặc{" "}
                  <span className="text-orange-600 font-medium">
                    click để chọn
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  1600x1200 (4:3) khuyến nghị. Hỗ trợ PNG, JPG, GIF.
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* --- Phần dưới: Thông tin sản phẩm --- */}
      <div className="  bg-white shadow-md p-6 rounded-lg space-y-6">
        {/* Thông tin sản phẩm */}
        <h3 className="text-xl font-semibold mb-2">Thông tin sản phẩm</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tên sản phẩm */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="w-full p-2  rounded-lg shadow-md bg-white border-amber-50"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          {/* Loại hàng */}
          <div>
            <label className="block mb-1 text-sm font-medium">Danh mục</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hãng */}
          <div>
            <label className="block mb-1 text-sm font-medium">Hãng</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            >
              <option value="">Chọn hãng</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Giá gốc */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Giá gốc (VNĐ)
            </label>
            <input
              type="number"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>

          {/* Giá bán */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Giá bán (VNĐ)
            </label>
            <input
              type="number"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>

          {/* Số lượng tồn */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Số lượng tồn
            </label>
            <input
              type="number"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          {/* Mô tả ngắn */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Mô tả ngắn</label>
            <textarea
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />
          </div>

          {/* Mô tả chi tiết */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">
              Mô tả chi tiết
            </label>
            <textarea
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              rows={5}
              value={detailDesc}
              onChange={(e) => setDetailDesc(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* Thông số kỹ thuật */}
      <div className="  bg-white shadow-md p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold mb-4">Thông số kỹ thuật</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Đường kính mặt
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={duongKinhMat}
              onChange={(e) => setDuongKinhMat(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Chất liệu dây
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={chatLieuDay}
              onChange={(e) => setChatLieuDay(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Chất liệu vỏ
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={chatLieuVo}
              onChange={(e) => setChatLieuVo(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Kháng nước</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={khangNuoc}
              onChange={(e) => setKhangNuoc(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Loại máy</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={loaiMay}
              onChange={(e) => setLoaiMay(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Nguồn gốc</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={nguonGoc}
              onChange={(e) => setNguonGoc(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Trọng lượng
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={trongLuong}
              onChange={(e) => setTrongLuong(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Độ dày</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={doDay}
              onChange={(e) => setDoDay(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Bảo hành</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
              value={baoHanh}
              onChange={(e) => setBaoHanh(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="border border-amber-500 text-amber-500 hover:bg-amber-50 font-semibold py-2 px-6 rounded shadow"
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
      </div>
    </form>
  );
}
