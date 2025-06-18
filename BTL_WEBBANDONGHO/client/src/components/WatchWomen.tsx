"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { use, useEffect, useState } from "react";
import { getAllProducts, SanPham } from "@/services/productService";

export default function WomenWatchSlider() {
  const router = useRouter();

  // state 
  const [Watches, setWatches] = useState<SanPham[]>([]);

  const fetchWatches = async () => {
    const wchs = (await getAllProducts()).data;
    const dsw = wchs.sanPhams;
    const ws = [...dsw, ...dsw, ...dsw];
    console.log(ws);
    setWatches(ws);

  }
  // effect 
  useEffect(() => {
    fetchWatches();
  }, []);

  return (
    <section className="p-4 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">ĐỒNG HỒ NỮ NỔI BẬT</h2>

        <button
          onClick={() => router.push("/products/female")}
          className="bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-800 transition"
        >
          Tất cả
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {Watches.map((watch, i) => (
          <SwiperSlide key={i++} className="h-[460px]">
            <div className="bg-white rounded-lg shadow p-4 overflow-hidden text-black relative border border-gray-200 h-full flex flex-col"
              onClick={() => router.push(`/user/detailproducts/${watch.SanPhamID}`)}
            >
              <div className="absolute -top-0 left-0 z-10 bg-red-600 text-white px-3 py-2 text-xs font-bold rounded-r-full rounded-bl-md shadow">
                Giảm {Math.round(watch.GiaBan / watch.GiaGoc)}%
              </div>
              <div className="absolute top-2 right-2 z-10 text-xl cursor-pointer text-red-400 hover:text-red-600 transition-colors duration-200">
                <i className="bx bx-heart" />
              </div>
              <div className="relative w-full h-58 mb-2 z-0">
                <img
                  src={'http://localhost:4000/uploads/sanpham/' + watch.HinhAnh}
                  alt={watch.TenSanPham}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10">
                {watch.TenSanPham}
              </h3>
              <p className="text-red-600 font-bold">
                {watch.GiaBan.toLocaleString()}đ{" "}
                <span className="line-through text-sm text-gray-500 ml-1">
                  {watch.GiaGoc.toLocaleString()}đ
                </span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Không phí chuyển đổi khi trả góp 0%
              </p>
              <div className="flex items-center mt-2 gap-1 text-yellow-400 text-sm">
                ★★★★★
              </div>
              <div className="absolute bottom-2 right-2 text-green-600 text-xl cursor-pointer hover:text-green-800 transition-colors duration-200">
                <i className="bx bx-cart" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
