"use client";

import {
  HangDongHo,
  LoaiHang,
  getAllBrands,
  getAllCategories,
  SanPham,
} from "@/services/productService";
import React, { useEffect, useState } from "react";

const ProductInfoForm = ({
  productData,
  setProductData,
}: {
  productData: SanPham;
  setProductData: (product: SanPham) => void;
}) => {
  // state
  const [brands, setBrands] = useState<HangDongHo[]>([]);
  const [categories, setCategories] = useState<LoaiHang[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const cates = await getAllCategories();
      setCategories(cates.data || []);
      const brnds = await getAllBrands();
      setBrands(brnds.data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg space-y-6">
      <h3 className="text-xl font-semibold mb-2">Thông tin sản phẩm</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tên sản phẩm */}
        <div>
          <label className="block mb-1 text-sm font-medium">Tên sản phẩm</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={productData.TenSanPham}
            onChange={(e) =>
              setProductData({ ...productData, TenSanPham: e.target.value })
            }
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        {/* Danh mục */}
        <div>
          <label className="block mb-1 text-sm font-medium">Danh mục</label>
          <select
            value={productData.LoaiHangID}
            onChange={(e) =>
              setProductData({
                ...productData,
                LoaiHangID: Number(e.target.value),
              })
            }
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
          >
            <option value="">Chọn danh mục</option>
            {categories.map((c: LoaiHang) => (
              <option key={c.LoaiHangID} value={c.LoaiHangID}>
                {c.TenLoai}
              </option>
            ))}
          </select>
        </div>

        {/* Hãng */}
        <div>
          <label className="block mb-1 text-sm font-medium">Hãng</label>
          <select
            value={productData.HangID}
            onChange={(e) =>
              setProductData({ ...productData, HangID: Number(e.target.value) })
            }
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
          >
            <option value="">Chọn hãng</option>
            {brands.map((b) => (
              <option key={b.HangID} value={b.HangID}>
                {b.TenHang}
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
            value={productData.GiaGoc}
            onChange={(e) =>
              setProductData({ ...productData, GiaGoc: Number(e.target.value) })
            }
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
            value={productData.GiaBan}
            onChange={(e) =>
              setProductData({ ...productData, GiaBan: Number(e.target.value) })
            }
          />
        </div>

        {/* Số lượng tồn */}
        <div>
          <label className="block mb-1 text-sm font-medium">Số lượng tồn</label>
          <input
            type="number"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={productData.SoLuongTon}
            onChange={(e) =>
              setProductData({
                ...productData,
                SoLuongTon: Number(e.target.value),
              })
            }
          />
        </div>

        {/* Mô tả ngắn */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium">Mô tả ngắn</label>
          <textarea
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={productData.MoTa}
            onChange={(e) =>
              setProductData({ ...productData, MoTa: e.target.value })
            }
          />
        </div>

        {/* Mô tả chi tiết */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium">
            Mô tả chi tiết
          </label>
          <textarea
            rows={5}
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={productData.MoTaChiTiet}
            onChange={(e) =>
              setProductData({ ...productData, MoTaChiTiet: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoForm;