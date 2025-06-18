"use client";
import React from "react";

interface SubImagesUploadProps {
  handleSubImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SubImagesUpload: React.FC<SubImagesUploadProps> = ({
  handleSubImagesChange,
}) => {
  return (
    <div className="md:col-span-2 p-6">
      <h3 className="font-semibold mb-2 bg-white shadow-md p-5 rounded-t-lg">
        Ảnh phụ
      </h3>
      <div className="bg-white shadow-md p-5 border-t-0 rounded-b-lg">
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:border-orange-400 transition">
          <label className="cursor-pointer block space-y-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleSubImagesChange}
              hidden
            />
            <div className="text-orange-500 text-3xl">
              <i className="pi pi-cloud-upload" />
            </div>
            <p className="text-gray-500">
              Kéo thả ảnh hoặc{" "}
              <span className="text-orange-600 font-medium">click để chọn</span>
            </p>
            <p className="text-sm text-gray-400">
              1600x1200 (4:3) khuyến nghị. Hỗ trợ PNG, JPG, GIF.
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubImagesUpload;
