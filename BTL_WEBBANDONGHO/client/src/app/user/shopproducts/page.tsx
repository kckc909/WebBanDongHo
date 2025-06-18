"use client";

import { Accordion, AccordionTab } from "primereact/accordion";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from "react";
import Link from "next/link";
import { Dropdown } from "primereact/dropdown";
import ProductList from "@/components/Productshop";

export default function ShopPage() {
  const [sort, setSort] = useState(null);

  const sortOptions = [
    { label: "Liên quan nhất", value: "relevance" },
    { label: "Tên (A - Z)", value: "name_asc" },
    { label: "Tên (Z - A)", value: "name_desc" },
    { label: "Giá (thấp đến cao)", value: "price_asc" },
    { label: "Đánh giá cao", value: "rating" },
  ];

  const categories = [
    { title: "Đồng hồ thể thao", sub: ["Nam", "Chống nước", "Chạy bộ"] },
    { title: "Đồng hồ nữ", sub: ["Cổ điển", "Thời trang"] },
    { title: "Đồng hồ điện tử", sub: ["LED", "Smartwatch"] },
  ];

  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);

  const priceRanges = [
    { label: "Dưới 1 triệu", value: "0-1000000" },
    { label: "1 triệu - 2 triệu", value: "1000000-2000000" },
    { label: "2 triệu - 3 triệu", value: "2000000-3000000" },
    { label: "Trên 3 triệu", value: "3000000-99999999" },
  ];

  const [activeIndex, setActiveIndex] = useState<number | number[] | null>(
    null
  );

  const toggleRange = (value: string) => {
    setSelectedRanges((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <div
        className=" relative py-4 bg-cover bg-center h-[200px]"
        style={{ backgroundImage: "url('/images/shopproduct.png')" }}
      >
        <div className="flex items-center justify-center h-[150px] bg-opacity-50 text-center">
          <div>
            <h2 className="text-3xl font-bold text-[rgb(238,139,73)] mb-2">
              Bộ Sưu Tập
            </h2>
            <div className="text-white space-x-2 text-sm">
              <Link href="/" className="hover:underline hover:text-amber-300">
                Trang chủ <span>/</span>
              </Link>
              <span>Sản Phẩm</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-6 relative">
          {/* Danh mục sản phẩm */}
          <div className="w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <h4 className="text-white font-bold uppercase  bg-amber-600 px-4 py-2 rounded-t-lg">
              Danh mục Sản Phẩm
            </h4>
            <div className="p-4">
              <Accordion
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                {categories.map((cat, i) => (
                  <AccordionTab header={cat.title} key={i}>
                    <ul className="pl-4 list-disc space-y-1 text-sm text-gray-700">
                      {cat.sub.map((item, j) => (
                        <li
                          key={j}
                          className="cursor-pointer hover:text-green-600"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionTab>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Lọc giá */}
          <div className="w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <h4 className="text-white font-bold uppercase bg-amber-600 px-4 py-2 rounded-t-lg">
              Bộ lọc Giá Sản Phẩm
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 gap-3 py-3 px-4">
              {priceRanges.map((range) => (
                <li key={range.value} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={range.value}
                    checked={selectedRanges.includes(range.value)}
                    onChange={() => toggleRange(range.value)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <label htmlFor={range.value}>{range.label}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <h4 className="text-white font-bold uppercase bg-amber-600 px-4 py-2 rounded-t-lg">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2 text-sm py-3 px-4">
              {["nam", "nữ", "thể thao", "điện tử", "sang trọng"].map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-amber-400 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Khu vực sản phẩm */}
        <div className="md:col-span-3 space-y-4">
          {/* Thanh lọc đầu trang */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2 shadow-sm gap-3">
            <h2 className="text-xl font-bold">Sản phẩm</h2>
            <Dropdown
              value={sort}
              options={sortOptions}
              onChange={(e) => setSort(e.value)}
              placeholder="Sắp xếp theo"
              className="w-52"
            />
          </div>

          {/* Danh sách sản phẩm */}
          <div className="container py-3">
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
}
