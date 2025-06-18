"use client";
import React from "react";
import Image from "next/image";

interface MainImageUploadProps {
  mainImage: File | null;
  handleMainImageChange: (img: File) => void;
}

const MainImageUpload: React.FC<MainImageUploadProps> = ({
  mainImage,
  handleMainImageChange,
}) => {
  return (
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

      <div className="mt-4 text-center">
        <label className="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-600 transition">
          Thêm ảnh
          <input
            type="file"
            accept="image/*"
            onChange={() => {
              const input = event?.target as HTMLInputElement;
              if (input.files && input.files.length > 0) {
                handleMainImageChange(input.files[0]);
              }
            }}
            hidden
          />
        </label>
      </div>
    </div>
  );
};

export default MainImageUpload;
