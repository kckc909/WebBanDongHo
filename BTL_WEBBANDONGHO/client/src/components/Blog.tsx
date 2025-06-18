"use client";

import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 mẫu đồng hồ nam được ưa chuộng năm 2025",
    date: "Tháng 4, 2025",
    comments: 10,
    image: "/images/blog/blog-01.jpg",
    link: "/blog-top-5-dong-ho-2025",
    description:
      "Tổng hợp những mẫu đồng hồ nam đang dẫn đầu xu hướng năm 2025 với thiết kế sang trọng, công nghệ hiện đại và độ bền ấn tượng.",
  },
  {
    id: 2,
    title: "Cách chọn đồng hồ phù hợp với phong cách cá nhân",
    date: "Tháng 3, 2025",
    comments: 7,
    image: "/images/blog/blog-02.jpg",
    link: "/blog-chon-dong-ho-phong-cach",
    description:
      "Lựa chọn đồng hồ không chỉ dựa vào thương hiệu mà còn cần phản ánh đúng cá tính và phong cách của người đeo.",
  },
  {
    id: 3,
    title: "Những lưu ý khi bảo quản và vệ sinh đồng hồ",
    date: "Tháng 2, 2025",
    comments: 4,
    image: "/images/blog/blog-03.jpg",
    link: "/blog-bao-quan-dong-ho",
    description:
      "Để đồng hồ luôn bền đẹp theo thời gian, bạn cần biết cách vệ sinh, bảo dưỡng và sử dụng đúng cách theo từng loại chất liệu và máy.",
  },
];

export default function BlogSuggestions() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Post You May Like</h2>
        </div>

        {/* Blog items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded overflow-hidden"
            >
              <div className="relative w-full h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <ul className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
                  <li className="flex items-center gap-1">
                    <i className="bx bx-calendar-alt"></i> {post.date}
                  </li>
                  <li className="flex items-center gap-1">
                    <i className="bx bx-message-rounded-dots"></i> {post.comments}
                  </li>
                </ul>
                <h5 className="text-lg font-semibold hover:text-amber-500 transition mb-2">
                  <Link href={post.link}>{post.title}</Link>
                </h5>
                <p className="text-sm text-gray-600">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
