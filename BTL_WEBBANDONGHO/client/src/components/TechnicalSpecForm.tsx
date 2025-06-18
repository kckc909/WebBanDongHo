"use client";

import React from "react";

interface TechnicalSpecFormProps {
  duongKinhMat: string;
  setDuongKinhMat: (value: string) => void;
  chatLieuDay: string;
  setChatLieuDay: (value: string) => void;
  chatLieuVo: string;
  setChatLieuVo: (value: string) => void;
  khangNuoc: string;
  setKhangNuoc: (value: string) => void;
  loaiMay: string;
  setLoaiMay: (value: string) => void;
  nguonGoc: string;
  setNguonGoc: (value: string) => void;
  trongLuong: string;
  setTrongLuong: (value: string) => void;
  doDay: string;
  setDoDay: (value: string) => void;
  baoHanh: string;
  setBaoHanh: (value: string) => void;
}

const TechnicalSpecForm: React.FC<TechnicalSpecFormProps> = ({
  duongKinhMat,
  setDuongKinhMat,
  chatLieuDay,
  setChatLieuDay,
  chatLieuVo,
  setChatLieuVo,
  khangNuoc,
  setKhangNuoc,
  loaiMay,
  setLoaiMay,
  nguonGoc,
  setNguonGoc,
  trongLuong,
  setTrongLuong,
  doDay,
  setDoDay,
  baoHanh,
  setBaoHanh,
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
            value={duongKinhMat}
            onChange={(e) => setDuongKinhMat(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Chất liệu dây</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg shadow-md bg-white border-amber-50"
            value={chatLieuDay}
            onChange={(e) => setChatLieuDay(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Chất liệu vỏ</label>
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
          <label className="block mb-1 text-sm font-medium">Trọng lượng</label>
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
    </div>
  );
};

export default TechnicalSpecForm;
