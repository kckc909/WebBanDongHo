"use client";

import Image from "next/image";

const services = [
  {
    icon: "/images/free-shipping.png",
    title: "Vận chuyển miễn phí",
    subtitle: "Hóa đơn trên 5 triệu",
  },
  {
    icon: "/images/exchange.png",
    title: "Đổi trả miễn phí",
    subtitle: "Trong vòng 7 ngày",
  },
  {
    icon: "/images/validating-ticket.png",
    title: "100% Hoàn tiền",
    subtitle: "Nếu sản phẩm lỗi",
  },
  {
    icon: "/images/24-hours.png",
    title: "Hotline: 1900 6750",
    subtitle: "Hỗ trợ 24/7",
  },
];

export default function ServicePromo() {
  return (
    <div className="section_chinh_sach py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
          {services.map((service, index) => (
            <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-orange-500">{service.title}</h3>
                <span className="text-gray-600 text-sm">{service.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
