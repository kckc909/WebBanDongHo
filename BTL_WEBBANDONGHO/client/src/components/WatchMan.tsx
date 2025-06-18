"use client";

import { useRouter } from "next/navigation"; 
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const mensWatches = [
  {
    id: 1,
    name: "Đồng hồ Nam Casio G-Shock GA-2100",
    image: "/images/product/product-01.png",
    brand: "Casio",
    discount: 15,
    oldPrice: 4000000,
    price: 3400000,
    smember: 100000,
    student: 70000,
    rating: 5,
  },
  {
    id: 2,
    name: "Đồng hồ Nam Citizen Eco-Drive BM-03E",
    image: "/images/product/product-02.png",
    brand: "Citizen",
    discount: 20,
    oldPrice: 5000000,
    price: 4000000,
    smember: 80000,
    student: 50000,
    rating: 4,
  },
  {
    id: 3,
    name: "Đồng hồ Nam Seiko 5 SNK809",
    image: "/images/product/product-03.png",
    brand: "Seiko",
    discount: 10,
    oldPrice: 4200000,
    price: 3780000,
    smember: 60000,
    student: 40000,
    rating: 4,
  },
  {
    id: 4,
    name: "Đồng hồ Nam Tissot PRX Powermatic 80",
    image: "/images/product/product-04.png",
    brand: "Tissot",
    discount: 5,
    oldPrice: 6200000,
    price: 5890000,
    smember: 70000,
    student: 40000,
    rating: 5,
  },
  {
    id: 5,
    name: "Đồng hồ Nam Orient Bambino Version IV",
    image: "/images/product/product-05.png",
    brand: "Orient",
    discount: 8,
    oldPrice: 4700000,
    price: 4320000,
    smember: 60000,
    student: 35000,
    rating: 4,
  },
];

export default function MenWatchSlider() {
  const router = useRouter(); // 👉 Hook để điều hướng

  return (
    <section className="p-4 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">ĐỒNG HỒ NAM NỔI BẬT</h2>
       
            <button
            onClick={() => router.push("/products/male")}
            className="bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-800 transition">
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
        {mensWatches.map((watch) => (
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
                  alt={watch.name}
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
