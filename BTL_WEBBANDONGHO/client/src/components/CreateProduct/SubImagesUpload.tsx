"use client";
import React from "react";

interface SubImagesUploadProps {
  subImages: File[];
  setSubImages: (files: File[]) => void;
}

const SubImagesUpload: React.FC<SubImagesUploadProps> = ({
  subImages,
  setSubImages,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSubImages(Array.from(e.target.files));
    }
  };

  const handleRemove = (index: number) => {
    const newFiles = subImages.filter((_, i) => i !== index);
    setSubImages(newFiles);
  };

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
              onChange={handleChange}
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
        {/* Hiển thị danh sách ảnh đã chọn */}
        {subImages.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {subImages.map((file, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`sub-img-${idx}`}
                  className="w-full h-24 object-cover rounded shadow"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100"
                  onClick={() => handleRemove(idx)}
                  title="Xóa ảnh"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubImagesUpload;