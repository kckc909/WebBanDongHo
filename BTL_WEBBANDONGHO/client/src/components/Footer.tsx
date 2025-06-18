"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Cột 1 - Logo & Giới thiệu */}
        <div>
          <Image src="/images/logo2.png" alt="Logo" width={140} height={40} />
          <p className="mt-2 text-sm">
            Chúng tôi là cửa hàng chuyên cung cấp đồng hồ cao cấp, chính hãng với đa dạng mẫu mã dành cho cả nam và nữ.
          </p>
          <p className="mt-2 flex items-center">
          <i className='bx bx-map'></i>198 Phụng Công, Văn Giang, Hưng Yên
          </p>
          <p className="mt-2 flex items-center">
          <i className='bx bxs-envelope'></i> lienhe@dongho.vn
          </p>
        </div>

        {/* Cột 2 - Danh mục sản phẩm */}
        <div>
          <h3 className="text-lg font-extrabold mb-3 text-[rgb(238,139,73)]">Danh mục</h3>
          <ul className="space-y-2">
            {[
              "Đồng hồ nam",
              "Đồng hồ nữ",
              "Đồng hồ đôi",
              "Đồng hồ cơ",
              "Đồng hồ pin (Quartz)",
              "Phụ kiện đồng hồ",
            ].map((item, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-green-600">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3 - Liên kết hữu ích */}
        <div>
          <h3 className="text-lg font-extrabold mb-3   text-[rgb(238,139,73)]">Liên kết hữu ích</h3>
          <ul className="space-y-2">
            {["Trang chủ", "Sản phẩm", "Giới thiệu", "Tin tức", "Liên hệ"].map((item, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-green-600">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 4 - Hỗ trợ khách hàng */}
        <div>
          <h3 className="text-lg font-extrabold mb-3  text-[rgb(238,139,73)]">Trung tâm hỗ trợ</h3>
          <ul className="space-y-2">
            {[
              "Đơn hàng của bạn",
              "Tài khoản của bạn",
              "Theo dõi đơn hàng",
              "Danh sách yêu thích",
              "Tìm kiếm sản phẩm",
              "Câu hỏi thường gặp",
            ].map((item, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-green-600">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 5 - Liên hệ */}
        <div>
          <h3 className="text-lg font-extrabold mb-3  text-[rgb(238,139,73)]">Liên hệ với chúng tôi</h3>
          <p><i className='bx bxs-phone'></i> Hotline 24/7: 1900 6750</p>
          <p><i className='bx bxs-envelope'></i>dongho@gmail.com</p>

          <h3 className="text-lg font-extrabold mt-4">Tải ứng dụng:</h3>
          <div className="flex space-x-2 mt-2">
            {/* App store buttons nếu cần */}
            <Image
        src="https://themes.pixelstrap.com/fastkart/assets/images/playstore.svg"
        alt="Tải từ Google Play"
        width={130}
        height={40}
        className="rounded-md cursor-pointer"
      />
            <Image
        src="https://themes.pixelstrap.com/fastkart/assets/images/appstore.svg"
        alt="Tải từ App Store"
        width={130}
        height={40}
        className="rounded-md cursor-pointer"
      />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        ©2025 Đồng Hồ XWatch. Bản quyền đã được bảo hộ.
      </div>
    </footer>
  );
};

export default Footer;
