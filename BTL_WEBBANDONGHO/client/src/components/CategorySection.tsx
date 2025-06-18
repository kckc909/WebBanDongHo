"use client";

import Image from "next/image";

const categories = [
  { name: "Thể Thao", img: "/images/product/product-01.png", link: "" },
  { name: "Cổ Điển", img: "/images/product/product-02.png", link: "" },
  { name: "Đồng hồ Cơ", img: "/images/product/product-03.png", link: "" },
  { name: "Điện Tử", img: "/images/product/product-04.png", link: "" },
  { name: "Lặn nước", img: "/images/product/product-05.png", link: "" },
];

export default function CategorySection() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Loại Đồng Hồ Được Yêu Thích</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {categories.map((cat, index) => (
          <a
            href={cat.link}
            key={index}
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <div className="w-48 h-48 rounded-full bg-white shadow flex items-center justify-center">
              <div className="relative w-32 h-32">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">
              {cat.name} →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
