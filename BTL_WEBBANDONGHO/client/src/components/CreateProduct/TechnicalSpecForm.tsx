"use client";

import { ThongSoKyThuat } from "@/services/productService";
import React from "react";
import { set } from "react-hook-form";

const TechnicalSpecForm = ({
  thongSoKyThuat,
  setThongSoKyThuat,
}: {
  thongSoKyThuat: ThongSoKyThuat;
  setThongSoKyThuat: (thongSoKyThuat: ThongSoKyThuat) => void;
}) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg space-y-6">
      <h3 className="text-xl font-semibold mb-4">Thông số kỹ thuật</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Đường kính mặt</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.DuongKinhMat}
            onChange={(e) => setThongSoKyThuat({...thongSoKyThuat, DuongKinhMat: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Chất liệu dây</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.ChatLieuDay}
            onChange={(e) => setThongSoKyThuat({...thongSoKyThuat, ChatLieuDay: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Chất liệu vỏ</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.ChatLieuVo}
            onChange={(e) => setThongSoKyThuat({...thongSoKyThuat, ChatLieuVo: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Kháng nước</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.KhangNuoc}
            onChange={(e) => setThongSoKyThuat({ ...thongSoKyThuat, KhangNuoc: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Loại máy</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.LoaiMay}
            onChange={(e) => setThongSoKyThuat({ ...thongSoKyThuat, LoaiMay: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Nguồn gốc</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.NguonGoc}
            onChange={(e) => setThongSoKyThuat({ ...thongSoKyThuat, NguonGoc: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Trọng lượng</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.TrongLuong}
            onChange={(e) => setThongSoKyThuat({ ...thongSoKyThuat, TrongLuong: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Độ dày</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.DoDay}
            onChange={(e) => setThongSoKyThuat({ ...thongSoKyThuat, DoDay: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium">Bảo hành</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={thongSoKyThuat.BaoHanh}
            onChange={(e) => setThongSoKyThuat({ ...thongSoKyThuat, BaoHanh: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecForm;
