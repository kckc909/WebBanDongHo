"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import Link from "next/link";

interface AdminNavbarProps {
  navbarWidth: string;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ navbarWidth }) => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 right-0 bg-white shadow-md z-50 transition-all ${navbarWidth}`}>
      <div className="flex items-center justify-between px-8 py-3">
        {/* Thanh tìm kiếm */}
        <div className="relative">
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm..."
            className="p-2 border rounded-lg w-64 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            <i className="pi pi-search"></i>
          </button>
        </div>

        {/* Thông báo & Hồ sơ người dùng */}
        <div className="flex items-center space-x-6 relative" ref={dropdownRef}>
          <div className="relative cursor-pointer">
            <i className="pi pi-bell text-2xl"></i>
            <Badge value="8" severity="danger" className="absolute -top-2 -right-2 text-xs" />
          </div>

          {/* Avatar & Dropdown */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Image
              src="/images/user.png"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full border border-gray-500"
            />
            <span className="text-sm">Admin</span>
            <i className={`pi pi-angle-${isDropdownOpen ? "up" : "down"}`}></i>
          </div>

          {/* Menu dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-2 z-50">
              <p className="px-3 py-2 text-gray-700">Welcome!</p>
              <ul className="text-sm">
                <Link href ="/" >
                <li className="px-3 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"> Trở về trang chủ</li>
                </Link>
                
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
