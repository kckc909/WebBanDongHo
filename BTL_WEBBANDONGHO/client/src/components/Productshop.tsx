"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Paginator } from "primereact/paginator";

const PRODUCTS_PER_PAGE = 8;

const watches = [
  {
    id: 1,
    name: "Đồng hồ Casio G-Shock GA-2100",
    image: "/images/product/product-01.png",
    brand: "Casio",
    oldPrice: 44790000,
    price: 37090000,

    rating: 5,
  },
  {
    id: 2,
    name: "Đồng hồ Citizen Eco-Drive BM-03E",
    image: "/images/product/product-02.png",
    brand: "Citizen",
    oldPrice: 15390000,
    price: 13290000,

    rating: 4,
  },
  {
    id: 3,
    name: "Đồng hồ Seiko 5 SNK809",
    image: "/images/product/product-03.png",
    brand: "Seiko",
    oldPrice: 3990000,
    price: 3390000,

    rating: 4,
  },
  {
    id: 4,
    name: "Đồng hồ Tissot PRX Powermatic 80",
    image: "/images/product/product-04.png",
    brand: "Tissot",
    oldPrice: 6090000,
    price: 5790000,
    rating: 5,
  },
  {
    id: 5,
    name: "Đồng hồ Orient Bambino Version IV",
    image: "/images/product/product-05.png",
    brand: "Orient",
    oldPrice: 9990000,
    price: 9490000,

    rating: 4,
  },
  // Duplicated for demo pagination
  {
    id: 6,
    name: "Đồng hồ Casio G-Shock GA-2100",
    image: "/images/product/product-01.png",
    brand: "Casio",
    oldPrice: 44790000,
    price: 37090000,

    rating: 5,
  },
  {
    id: 7,
    name: "Đồng hồ Citizen Eco-Drive BM-03E",
    image: "/images/product/product-02.png",
    brand: "Citizen",
    oldPrice: 15390000,
    price: 13290000,

    rating: 4,
  },
  {
    id: 8,
    name: "Đồng hồ Seiko 5 SNK809",
    image: "/images/product/product-03.png",
    brand: "Seiko",
    oldPrice: 3990000,
    price: 3390000,

    rating: 4,
  },
  {
    id: 9,
    name: "Đồng hồ Tissot PRX Powermatic 80",
    image: "/images/product/product-04.png",
    brand: "Tissot",
    oldPrice: 6090000,
    price: 5790000,

    rating: 5,
  },
  {
    id: 10,
    name: "Đồng hồ Orient Bambino Version IV",
    image: "/images/product/product-05.png",
    brand: "Orient",
    oldPrice: 9990000,
    price: 9490000,

    rating: 4,
  },
];

export default function ProductList() {
  const [first, setFirst] = useState(0);
  const totalRecords = watches.length;

  const visibleWatches = watches.slice(first, first + PRODUCTS_PER_PAGE);

  // Cuộn lên đầu khi đổi trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [first]);

  return (
    <section className="p-4 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">SẢN PHẨM ĐỒNG HỒ</h2>

      {/* Lưới sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleWatches.map((watch) => (
          <div
            key={watch.id}
            className="relative bg-white rounded-lg shadow gap-3 p-3 overflow-hidden text-black border border-gray-200 h-full flex flex-col"
          >
            <div className="absolute top-2 right-2 z-10 text-xl cursor-pointer text-red-400 hover:text-red-600 transition-colors duration-200">
              <i className="bx bx-heart" />
            </div>

            <div className="relative w-full h-52 mb-3">
              <Image
                src={watch.image}
                alt={watch.name}
                fill
                className="object-contain"
              />
            </div>

            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
              {watch.name}
            </h3>

            <p className="text-red-600 font-bold">
              {watch.price.toLocaleString()}đ
              <span className="line-through text-sm text-gray-500 ml-2">
                {watch.oldPrice.toLocaleString()}đ
              </span>
            </p>

            <p className="text-xs text-gray-600 mt-1">
              Không phí chuyển đổi khi trả góp 0%
            </p>

            <div className="flex items-center mt-2 gap-1 text-yellow-400 text-sm">
              {"★".repeat(watch.rating)}
              {"☆".repeat(5 - watch.rating)}
            </div>

            <Link
              href={`/user/detailproducts?id=${watch.id}`}
              className="absolute bottom-2 right-2 text-green-600 text-xl hover:text-green-800"
            >
              <i className="bx bx-cart" />
            </Link>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex flex-col items-center mt-8 space-y-2 ">
        <Paginator
          first={first}
          rows={PRODUCTS_PER_PAGE}
          totalRecords={totalRecords}
          onPageChange={(e) => setFirst(e.first)}
        />
      </div>
    </section>
  );
}
