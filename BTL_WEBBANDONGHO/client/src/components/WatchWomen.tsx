"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const womensWatches = [
  {
    id: 1,
    name: "Đồng hồ Nữ Casio LTP-VT01L-1BUDF",
    image: "/images/product/women-01.png",
    brand: "Casio",
    discount: 12,
    oldPrice: 2200000,
    price: 1936000,
    smember: 50000,
    student: 30000,
    rating: 5,
  },
  {
    id: 2,
    name: "Đồng hồ Nữ Citizen Eco-Drive EM0576-80A",
    image: "/images/product/women-02.png",
    brand: "Citizen",
    discount: 15,
    oldPrice: 4200000,
    price: 3570000,
    smember: 70000,
    student: 40000,
    rating: 4,
  },
  {
    id: 3,
    name: "Đồng hồ Nữ Seiko SUR789P1",
    image: "/images/product/women-03.png",
    brand: "Seiko",
    discount: 10,
    oldPrice: 3600000,
    price: 3240000,
    smember: 60000,
    student: 35000,
    rating: 4,
  },
  {
    id: 4,
    name: "Đồng hồ Nữ Tissot Lovely T058.009.33.031.00",
    image: "/images/product/women-04.png",
    brand: "Tissot",
    discount: 8,
    oldPrice: 6600000,
    price: 6070000,
    smember: 80000,
    student: 50000,
    rating: 5,
  },
  {
    id: 5,
    name: "Đồng hồ Nữ Orient FNR1Q002W0",
    image: "/images/product/women-05.png",
    brand: "Orient",
    discount: 9,
    oldPrice: 3400000,
    price: 3094000,
    smember: 55000,
    student: 30000,
    rating: 4,
  },
];

export default function WomenWatchSlider() {
  const router = useRouter();

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
        {womensWatches.map((watch) => (
          <SwiperSlide key={watch.id} className="h-[460px]">
            <div className="bg-white rounded-lg shadow p-4 overflow-hidden text-black relative border border-gray-200 h-full flex flex-col">
              <div className="absolute -top-0 left-0 z-10 bg-red-600 text-white px-3 py-2 text-xs font-bold rounded-r-full rounded-bl-md shadow">
                Giảm {watch.discount}%
              </div>

              <div className="absolute top-2 right-2 z-10 text-xl cursor-pointer text-red-400 hover:text-red-600 transition-colors duration-200">
                <i className="bx bx-heart" />
              </div>

              <div className="relative w-full h-58 mb-2 z-0">
                <Image
                  src={watch.image}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10">
                {watch.name}
              </h3>

              <p className="text-red-600 font-bold">
                {watch.price.toLocaleString()}đ{" "}
                <span className="line-through text-sm text-gray-500 ml-1">
                  {watch.oldPrice.toLocaleString()}đ
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
