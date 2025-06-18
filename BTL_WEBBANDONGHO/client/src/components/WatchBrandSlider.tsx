"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
const brands = [
  "Tất cả",
  "Casio",
  "Fossil",
  "Seiko",
  "Citizen",
  "Orient",
  "G-Shock",
  "Tissot",
] as const;

type Brand = typeof brands[number];

const watches = [
  {
    id: 1,
    name: "Đồng hồ Casio G-Shock GA-2100",
    image: "/images/product/product-01.png",
    brand: "Casio",
    discount: 17,
    oldPrice: 44790000,
    price: 37090000,
    smember: 100000,
    student: 70000,
    rating: 5,
  },
  {
    id: 2,
    name: "Đồng hồ Citizen Eco-Drive BM-03E",
    image: "/images/product/product-02.png",
    brand: "Citizen",
    discount: 17,
    oldPrice: 15390000,
    price: 13290000,
    smember: 80000,
    student: 50000,
    rating: 4,
  },
  {
    id: 3,
    name: "Đồng hồ Seiko 5 SNK809",
    image: "/images/product/product-03.png",
    brand: "Seiko",
    discount: 15,
    oldPrice: 3990000,
    price: 3390000,
    smember: 60000,
    student: 40000,
    rating: 4,
  },
  {
    id: 4,
    name: "Đồng hồ Tissot PRX Powermatic 80",
    image: "/images/product/product-04.png",
    brand: "Tissot",
    discount: 5,
    oldPrice: 6090000,
    price: 5790000,
    smember: 70000,
    student: 40000,
    rating: 5,
  },
  {
    id: 5,
    name: "Đồng hồ Orient Bambino Version IV",
    image: "/images/product/product-05.png",
    brand: "Orient",
    discount: 5,
    oldPrice: 9990000,
    price: 9490000,
    smember: 60000,
    student: 35000,
    rating: 4,
  },  {
    id: 6,
    name: "Đồng hồ Casio G-Shock GA-2100",
    image: "/images/product/product-01.png",
    brand: "Casio",
    discount: 17,
    oldPrice: 44790000,
    price: 37090000,
    smember: 100000,
    student: 70000,
    rating: 5,
  },
  {
    id: 7,
    name: "Đồng hồ Citizen Eco-Drive BM-03E",
    image: "/images/product/product-02.png",
    brand: "Citizen",
    discount: 17,
    oldPrice: 15390000,
    price: 13290000,
    smember: 80000,
    student: 50000,
    rating: 4,
  },
  {
    id: 8,
    name: "Đồng hồ Seiko 5 SNK809",
    image: "/images/product/product-03.png",
    brand: "Seiko",
    discount: 15,
    oldPrice: 3990000,
    price: 3390000,
    smember: 60000,
    student: 40000,
    rating: 4,
  },
  {
    id: 9,
    name: "Đồng hồ Tissot PRX Powermatic 80",
    image: "/images/product/product-04.png",
    brand: "Tissot",
    discount: 5,
    oldPrice: 6090000,
    price: 5790000,
    smember: 70000,
    student: 40000,
    rating: 5,
  },
  {
    id: 10,
    name: "Đồng hồ Orient Bambino Version IV",
    image: "/images/product/product-05.png",
    brand: "Orient",
    discount: 5,
    oldPrice: 9990000,
    price: 9490000,
    smember: 60000,
    student: 35000,
    rating: 4,
  },
];


export default function WatchSlider() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>("Tất cả");

  const filteredWatches = useMemo(() => {
    return selectedBrand === "Tất cả"
      ? watches
      : watches.filter((watch) => watch.brand === selectedBrand);
  }, [selectedBrand]);

  return (
    <section className="p-4 bg-white rounded-lg ">
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold mb-4">ĐỒNG HỒ NỔI BẬT NHẤT</h2>
          {/* Buttons thương hiệu */}
          <div className="flex items-center mb-2 gap-1">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 text-sm rounded-full  transition ${
                  selectedBrand === brand
                    ? "bg-red-700 text-white "
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {brand}
              </button>
            ))}

          </div>
        </div>

      {/* Slider sản phẩm */}
      <Swiper
      modules={[Navigation, Grid]} // 👉 thêm Grid vào modules
      navigation
      spaceBetween={16}
      slidesPerView={1.2}
      grid={{ rows: 2, fill: "row" }} // 👉 đây là phần quan trọng
      breakpoints={{
        640: {
          slidesPerView: 2,
          grid: { rows: 2 }, // responsive: 2 cột, 2 hàng
        },
        1024: {
          slidesPerView: 3,
          grid: { rows: 2 }, // 3 cột, 2 hàng
        },
        1280: {
          slidesPerView: 4,
          grid: { rows: 2 }, // 4 cột, 2 hàng
        },
      }}
      >
        {filteredWatches.map((watch) => (
        <SwiperSlide key={watch.id} className="h-[460px]">
           <Link href={`/user/detailproducts  `} className="h-full block">
        <div className="bg-white rounded-lg shadow p-4 overflow-hidden text-black relative border border-gray-200 h-full flex flex-col">
  
           {/* Giảm giá */}
           <div className="absolute -top-0 left-0 z-10 bg-red-600 text-white px-3 py-2 text-xs font-bold rounded-r-full rounded-bl-md shadow">
             Giảm {watch.discount}%
           </div>
       
           {/* Yêu thích */}
           <div className="absolute top-2 right-2 z-10 text-xl cursor-pointer text-red-400 hover:text-red-600 transition-colors duration-200">
             <i className="bx bx-heart" />
           </div>
       
           {/* Ảnh */}
           <div className="relative w-full h-58 mb-2 z-0">
             <Image src={watch.image} alt={watch.name} fill className="object-contain" />
           </div>
       
           {/* Tên sản phẩm */}
           <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10">{watch.name}</h3>
       
           {/* Giá */}
           <p className="text-red-600 font-bold">
             {watch.price.toLocaleString()}đ{" "}
             <span className="line-through text-sm text-gray-500 ml-1">
               {watch.oldPrice.toLocaleString()}đ
             </span>
           </p>
       
           {/* Trả góp */}
           <p className="text-xs text-gray-600 mt-1">
             Không phí chuyển đổi khi trả góp 0%
           </p>
       
           {/* Đánh giá */}
           <div className="flex items-center mt-2 gap-1 text-yellow-400 text-sm">★★★★★</div>
       
           {/* Giỏ hàng */}
           <div className="absolute bottom-2 right-2 text-green-600 text-xl cursor-pointer hover:text-green-800 transition-colors duration-200">
             <i className="bx bx-cart" />
           </div>
         </div>
        </Link>
       </SwiperSlide>
       
                           
        ))}
      </Swiper>
      
    </section>
  );
}
