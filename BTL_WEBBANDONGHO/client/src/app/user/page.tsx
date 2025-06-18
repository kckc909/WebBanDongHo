'use client';
import 'boxicons/css/boxicons.min.css';
import Image from 'next/image';
import CategorySection from '@/components/CategorySection';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HotSaleSlider from '@/components/HotSaleSlider';
import WatchSlider from '@/components/WatchBrandSlider';
import MenWatchSlider from '@/components/WatchMan';
import WomenWatchSlider from '@/components/WatchWomen';
import BlogSuggestions from '@/components/Blog';
import ServicePromo from '@/components/Service';

const Home = () => {
  return (
    <>

      <div className=" justify-center ">

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="w-full  p-4"
        >
          <SwiperSlide>
            <div className="relative w-full h-[500px]">
              <Image src="/images/banner.png" alt="Logo" fill className="object-contain" />
              {/* Button ở góc trái phía dưới */}
              <div className="absolute bottom-35 left-140 ">
                <a
                  href="shop.html"
                  className="px-6 py-3 transform hover:scale-110  bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition "
                >
                  Mua Ngay<i className='bx bx-right-arrow-alt  text-amber-50'></i>
                </a>

              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-[500px]">
              <Image src="/images/banner-test-01.png" alt="Logo" fill className="object-contain" />

              {/* Button ở góc trái phía dưới */}
              <div className="absolute bottom-40 left-120 ">
                <a
                  href="shop.html"
                  className="px-6 py-3 transform hover:scale-110  bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition "
                >
                  Mua Ngay<i className='bx bx-right-arrow-alt  text-amber-50'></i>
                </a>

              </div>
            </div>

          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-[500px]">
              <Image src="/images/banner-02.png" alt="Logo" fill className="object-contain" />

              {/* Button ở góc trái phía dưới */}
              <div className="absolute bottom-40 left-70 ">
                <a
                  href="shop.html"
                  className="px-6 py-3  bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600  hover:scale-105 transition-transform "
                >
                  Mua Ngay<i className='bx bx-right-arrow-alt  text-amber-50'></i>
                </a>

              </div>
            </div>

          </SwiperSlide>

          <style jsx global>{`
                                .swiper-button-next,
                                .swiper-button-prev {
                                  color: white;
                                  width: 40px;
                                  height: 40px;
                                  background-color: rgba(0, 0, 0, 0.3);
                                  border-radius: 50%;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                }

                                .swiper-button-next::after,
                                .swiper-button-prev::after {
                                  font-size: 18px;
                                }
                              `}</style>
        </Swiper>

      </div>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="single-banner">
              <a href="#">
                <div className="relative w-full h-10 md:h-72 rounded-lg overflow-hidden shadow">
                  <Image
                    src="/images/banner-nu-02.jpg"
                    alt="Banner 01"
                    fill
                    className="object-cover"
                  />
                </div>
              </a>
            </div>
            <div className="single-banner">
              <a href="#">
                <div className="relative w-full h-60 md:h-72 rounded-lg overflow-hidden shadow">
                  <Image
                    src="/images/banner-nam-04.jpg"
                    alt="Banner 02"
                    fill
                    className="object-cover"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className=' category py-3' >
        <CategorySection />
      </div>
      <div className="hotsale py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <HotSaleSlider />
      </div>
      <div className="container py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <WatchSlider />
      </div>
      <div className="container py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <MenWatchSlider />
      </div>
      <div className="container py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <WomenWatchSlider />
      </div>
      <div className="container py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <div className="single-banner">
          <a href="#">
            <div className="relative w-full h-60 md:h-72 overflow-hidden shadow rounded-[0_200px_200px_0]">
              {/* Ảnh nền */}
              <Image
                src="/images/deal-bg.jpg"
                alt="Banner 02"
                fill
                className="object-cover absolute top-0 left-0 z-0"
              />

              {/* Overlay giới thiệu */}
              <div className="absolute right-14 top-1/2 -translate-y-1/2 z-10 text-white max-w-sm text-right">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-400">Ưu đãi đặc biệt</h2>
                <p className="text-sm md:text-base mb-4">Khám phá bộ sưu tập đồng hồ sang trọng với mức giá không thể tốt hơn!</p>
                <button className="bg-white text-red-700 font-semibold px-4 py-2 rounded-full text-sm hover:bg-amber-400 transition">
                  Xem ngay
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>

      <section className=" py-10 px-4 md:px-10 lg:px-20 overflow-hidden">
        {/* Background pattern layer */}
        <div className="relative inset-0 bg-[url('/images/footer-bg.jpg')] bg-no-repeat bg-cover bg-center opacity-10 z-0"></div>

        {/* Content wrapper */}
        <div className="relative max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10 p-6 rounded-xl">
          {/* Left: Text content */}
          <div>
            <p className="text-xs tracking-widest text-gray-500 mb-2">ABOUT US</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight">
              A Unique watch that fits <br /> Your Style
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Bộ sưu tập Lawson mới đã có mặt! Mẫu đồng hồ thạch anh Lawson Franklin 38 này, được thiết kế
              với sự đơn giản và thanh lịch, thực sự là một quả anh đào trên chiếc bánh. Có nhiều kích cỡ và
              màu dây đeo khác nhau, có mặt sau bằng thép không gỉ để khắc chữ theo yêu cầu.
            </p>
            <button className="bg-amber-300 text-gray-800 px-4 py-2 text-sm font-semibold rounded hover:bg-amber-500 transition">
              Xem Ngay
            </button>
          </div>

          {/* Right: Image with rounded shape */}
          <div className="relative w-full h-72 md:h-96">
            <div className="absolute inset-0 overflow-hidden rounded-l-full shadow">
              <Image
                src="/images/banner-about (2).jpg"
                alt="Unique Watch"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <BlogSuggestions />
      </div>
      <div className="container py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <ServicePromo />
      </div>




    </>
  );
};

export default Home;
