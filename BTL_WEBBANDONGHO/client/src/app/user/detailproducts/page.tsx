"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductList from "@/components/Productshop";
import ServicePromo from "@/components/Service";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState("/images/product/product-01.png");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([
    {
      user: "Rome Doe",
      date: "29 Sep 2023 06:18PM",
      rating: 5,
      comment: "Chiếc đồng hồ rất đẹp, chất lượng tuyệt vời!",
    },
    {
      user: "Sarah Davis",
      date: "29 Sep 2023 05:58PM",
      rating: 4,
      comment: "Mẫu mã đẹp, thời gian giao hàng nhanh.",
    },
  ]);

  const handleReviewSubmit = () => {
    if (rating && comment) {
      setReviews((prev) => [
        ...prev,
        {
          user: "Khách hàng ẩn danh",
          date: new Date().toLocaleString(),
          rating,
          comment,
        },
      ]);
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <nav className="sticky top-0 z-50 bg-amber-50 text-sm text-gray-500 mb-8 flex items-center space-x-1 px-4 py-2  boder rounded-r-lg shadow-sm">
        <Link
          href="/user"
          className="hover:underline hover:text-amber-400 transition-colors duration-200 flex items-center space-x-1"
        >
          <i className="bx bx-home-alt-2"></i>
          <span>Trang Chủ</span>
        </Link>
        <span>/</span>
        <Link
          href="/shopproducts"
          className="hover:underline hover:text-amber-400 transition-colors duration-200"
        >
          Đồng Hồ
        </Link>
        <span>/</span>
        <span className="text-orange-500">Đồng hồ Casio G-Shock GA-2100</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Hình ảnh sản phẩm */}
        <div>
          <div className="relative w-full h-[400px] rbg-white rounded-lg shadow gap-3 p-3 overflow-hidden text-black border border-gray-200">
            <Image
              src={mainImage}
              alt="Đồng hồ"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {[
              "/images/product/product-01.png",
              "/images/product/product-02.png",
              "/images/product/product-03.png",
            ].map((img, idx) => (
              <div
                key={idx}
                className="w-[80px] h-[80px] relative bg-white rounded-lg shadow gap-3 p-3 overflow-hidden text-black border border-gray-200"
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h3 className="text-2xl font-semibold">
            Đồng hồ Casio G-Shock GA-2100
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-500 text-xl">37.090.000đ</span>
            <del className="text-gray-500">44.790.000đ</del>
            <span className="text-green-600">(Giảm 17%)</span>
          </div>

          <div className="flex items-center mt-2 gap-1 text-yellow-400 text-sm">
            {reviews.length > 0 && (
              <div className="flex items-center mt-2 gap-1 text-yellow-400 text-sm">
                {(() => {
                  const avgRating = Math.round(
                    reviews.reduce((total, r) => total + r.rating, 0) /
                      reviews.length
                  );
                  return (
                    <>
                      {"★".repeat(avgRating)}
                      {"☆".repeat(5 - avgRating)}
                      <span className="ml-2 text-gray-500">
                        ({reviews.length} đánh giá)
                      </span>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          <p className="mt-3 text-gray-700">
            Đồng hồ <strong>Casio G-Shock GA-2100</strong> là biểu tượng của sự
            kết hợp hoàn hảo giữa thiết kế hiện đại và công nghệ tiên tiến. Với
            thiết kế vỏ bát giác góc cạnh lấy cảm hứng từ dòng DW-5000C kinh
            điển, mẫu GA-2100 mang đến vẻ ngoài mạnh mẽ, thể thao nhưng không
            kém phần tinh tế.
            <br />
            <br />
          </p>

          <div className="flex gap-2 mt-4 items-center">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="w-16 border-2 border-red-600 rounded-lg px-2 py-1"
              min={1}
            />

            <button
              // onClick={() => {
              //   // xử lý thêm vào giỏ tại đây, ví dụ gọi API hoặc state
              //   router.push("/user/orders");
              // }}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition"
            >
              Mua Ngay
            </button>
            <button
              // onClick={() => {
              //   // xử lý thêm vào giỏ tại đây, ví dụ gọi API hoặc state
              //   router.push("/user/orders");
              // }}
              className="px-6 py-3 text-red-500 font-semibold rounded-lg border-2 border-red-600 hover:bg-red-50 transform hover:scale-105 transition"
            >
              <i className="bx bx-basket"></i> Thêm vào giỏ
            </button>
          </div>
          <div className="mt-8 w-full max-w-xs">
            {/* Thanh nền tổng (màu nhạt, bo tròn) */}
            <div className="w-full h-6 bg-red-100 rounded-full overflow-hidden">
              {/* Thanh biểu thị số đã bán (màu đỏ đậm) */}
              <div
                className="h-full bg-red-500 text-white text-xs font-medium flex items-center justify-center px-2"
                style={{ width: `${(30 / 50) * 100}%` }} // Ví dụ đã bán 15/50
              >
                <span>Chỉ còn 5 sản phẩm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="my-6 bg-white rounded-lg shadow gap-3 p-3 overflow-hidden text-black border border-gray-200">
        <div className="bg-white rounded shadow p-2">
          <div className="flex justify-between">
            {[
              "Mô Tả Chi Tiết",
              "Thông Số Kỹ Thuật",
              "Hướng Dẫn Sử Dụng",
              "Đánh Giá",
            ].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-center font-bold  transition-colors rounded-t ${
                  activeTab === tab
                    ? "text-orange-500 bg-orange-100 border-b-2 border-orange-500"
                    : "text-gray-700 border-b-2 border-transparent hover:text-orange-500 hover:bg-orange-50"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Mô Tả Chi Tiết" && (
          <div>
            <p className="mt-3 text-gray-700">
              Đồng hồ <strong>Casio G-Shock GA-2100</strong> là biểu tượng của
              sự kết hợp hoàn hảo giữa thiết kế hiện đại và công nghệ tiên tiến.
              Với thiết kế vỏ bát giác góc cạnh lấy cảm hứng từ dòng DW-5000C
              kinh điển, mẫu GA-2100 mang đến vẻ ngoài mạnh mẽ, thể thao nhưng
              không kém phần tinh tế.
              <br />
              <br />
              Vỏ đồng hồ được chế tạo từ chất liệu{" "}
              <strong>Carbon Core Guard</strong> siêu nhẹ và siêu bền, giúp tăng
              khả năng chống va đập và chống sốc tối ưu. Khả năng chống nước lên
              đến <strong>200 mét</strong> cho phép bạn sử dụng thoải mái trong
              các hoạt động hàng ngày lẫn thể thao dưới nước.
              <br />
              <br />
              Mặt đồng hồ kết hợp giữa kim analog và màn hình điện tử, mang lại
              sự tiện lợi trong việc xem giờ và các tính năng khác như: đồng hồ
              bấm giờ, đếm ngược, báo thức và lịch tự động. Ngoài ra, thời lượng
              pin lên đến <strong>3 năm</strong> giúp bạn yên tâm sử dụng lâu
              dài mà không phải lo lắng.
              <br />
              <br />
              Với thiết kế unisex và nhiều phối màu thời trang, Casio G-Shock
              GA-2100 là lựa chọn lý tưởng cho cả nam và nữ yêu thích phong cách
              trẻ trung, năng động và cá tính.
            </p>
          </div>
        )}

        {activeTab === "Hướng Dẫn Sử Dụng" && (
          <div>
            <h3 className="text-lg font-bold mb-2">Thông tin thêm</h3>
            <ul className="list-disc list-inside">
              <li>Thương hiệu: Casio</li>
              <li>Xuất xứ: Nhật Bản</li>
              <li>Bảo hành: 2 năm chính hãng</li>
            </ul>
          </div>
        )}

        {/* Đánh Giá Tab */}
        {activeTab === "Đánh Giá" && (
          <div>
            <h3 className="text-lg font-bold mb-4">Đánh giá sản phẩm</h3>

            {/* Form đánh giá */}
            <div className="mb-6 p-4  rounded-lg bg-gray-50">
              <h4 className="font-semibold mb-2">Gửi đánh giá của bạn</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-700">Chọn số sao:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl focus:outline-none"
                    >
                      <span
                        className={
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Nhận xét của bạn..."
                rows={4}
              />
              <button
                onClick={handleReviewSubmit}
                disabled={!rating || comment.trim() === ""}
                className="mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded "
              >
                Gửi đánh giá
              </button>
            </div>

            {/* Danh sách đánh giá */}
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="p-4 rounded-lg bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/user.png"
                      alt="user avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {r.user}{" "}
                        <span className="text-xs text-gray-400 ml-2">
                          {r.date}
                        </span>
                      </div>
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={star <= r.rating ? "" : "text-gray-300"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <ServicePromo />
      </div>
      <div className="container py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductDetail;
