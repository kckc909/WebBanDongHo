"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    name: "Đồng hồ Casio G-Shock GA-2100",
    img: "/images/product/product-01.png",
    discount: 17,
    price: 37090000,
    oldPrice: 44790000,
  },
  {
    name: "Đồng hồ Citizen Eco-Drive BM-03E",
    img: "/images/product/product-02.png",
    discount: 17,
    price: 13290000,
    oldPrice: 15390000,
  },
  {
    name: "Đồng hồ Seiko 5 SNK809",
    img: "/images/product/product-03.png",
    discount: 15,
    price: 3390000,
    oldPrice: 3990000,
  },
  {
    name: "Đồng hồ Tissot PRX Powermatic 80",
    img: "/images/product/product-04.png",
    discount: 5,
    price: 5790000,
    oldPrice: 6090000,
  },
  {
    name: "Đồng hồ Orient Bambino Version IV",
    img: "/images/product/product-05.png",
    discount: 5,
    price: 9490000,
    oldPrice: 9990000,
  },
];

export default function HotSaleSlider() {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // ✅ useMemo để chỉ tính targetTime 1 lần
  const targetTime = useMemo(() => {
    const time = new Date();
    const daysUntilSunday = (7 - time.getDay()) % 7;
    time.setDate(time.getDate() + daysUntilSunday);
    time.setHours(23, 59, 59, 0);
    return time;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance > 0) {
        setTimeLeft({
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      } else {
        clearInterval(timer);
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <section className="container py-6 rounded-lg shadow p-4 max-w-screen-xl mx-auto px-4 md:px-8 bg-white">
      <div className="flex items-start gap-9">
        {/* Banner bên trái */}
        <div className="md:w-77">
          <Image
            src="/images/banner-sale-02.jpg"
            alt="Hot Sale Banner"
            width={400}
            height={500}
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Slider + Đếm ngược bên phải */}
        <div className="w-full md:w-2/3 relative">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-red-600">
              🔥 HOT SALE CUỐI TUẦN
            </h2>
            <div className="flex items-center gap-1 text-black bg-yellow-200 px-4 py-1 rounded-full text-sm font-medium">
              <span>Kết thúc sau:</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded">
                {timeLeft.hours}
              </span>
              :
              <span className="bg-red-500 text-white px-2 py-1 rounded">
                {timeLeft.minutes}
              </span>
              :
              <span className="bg-red-500 text-white px-2 py-1 rounded">
                {timeLeft.seconds}
              </span>
            </div>
          </div>

          {/* Swiper Slider */}
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
         {products.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow p-3 overflow-hidden text-black relative border border-gray-200">
               {/* Giảm giá (góc trên trái) */}
                  <div className="absolute -top-0 left-0 z-10 bg-red-600 text-white px-3 py-2 text-xs font-bold rounded-r-full rounded-bl-md shadow">
                     Giảm {item.discount}%
                    </div>

                  {/* Yêu thích (góc trên phải) */}
                  <div className="absolute top-2 right-2 z-10 text-xl cursor-pointer text-red-400 hover:text-red-600 transition-colors duration-200">
                    <i className="bx bx-heart" />
                  </div>
                  {/* Ảnh sản phẩm */}
                  <div className="relative w-full h-44 mb-2 z-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Tên sản phẩm */}
                  <h3 className="font-semibold text-sm mb-1">{item.name}</h3>

                  {/* Giá mới + giá cũ */}
                  <p className="text-red-600 font-bold">
                    {item.price.toLocaleString()}đ{" "}
                    <span className="line-through text-sm text-gray-500 ml-1">
                      {item.oldPrice.toLocaleString()}đ
                    </span>
                  </p>

                  {/* Ghi chú trả góp */}
                  <p className="text-xs text-gray-600 mt-1">
                    Không phí chuyển đổi khi trả góp 0%
                  </p>

                  {/* Đánh giá sao */}
                  <div className="flex items-center mt-2 gap-1">
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>

                  {/* Giỏ hàng (góc dưới phải) */}
                  <div className="absolute bottom-2 right-2 text-green-600 text-xl cursor-pointer hover:text-green-800 transition-colors duration-200">
                    <i className="bx bx-cart" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
