"use client";

import { useState } from "react";
import { classNames } from "primereact/utils";
import Link from "next/link";

interface SidebarProps {
  isPinned: boolean;
  onTogglePin: () => void;
  onHover: (hovering: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isPinned, onTogglePin, onHover }) => {
const [isHovered, setIsHovered] = useState(false);
const isOpen = isPinned || isHovered;
const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);


  return (
    <aside
      className={classNames(
        "fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all",
        isOpen ? "w-64" : "w-16"
      )}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover(false);
      }}
    >
      {/* Nút ghim Sidebar */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{isOpen && "Dashboard"}</h2>
        <button onClick={onTogglePin} className="text-white">
          <i className={`pi ${isPinned ? "pi-angle-left" : "pi-angle-right"}`} />
        </button>
      </div>

      {/* Danh sách menu */}
      <nav className="mt-4">
        <ul>
          <li>
            <Link href="/admin/product" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md">
              <i className="pi pi-home mr-2" />
              {isOpen && "Dashboard"}
            </Link>
          </li>
          <li>  
            <Link href="/admin/users" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md">
              <i className="pi pi-users mr-2" />
              {isOpen && "Quản lý người dùng"}
            </Link>
          </li>
          <li>  
            <Link href="/admin/categories" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md">
              <i className="pi pi-users mr-2" />
              {isOpen && "Quản lý loại hàng"}
            </Link>
          </li>
          <li>  
            <Link href="/admin/brands" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md">
              <i className="pi pi-users mr-2" />
              {isOpen && "Quản lý hãng đồng hồ"}
            </Link>
          </li>
          <li>
            <div
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md"
              onClick={() => setIsProductMenuOpen(prev => !prev)}
            >
              <div className="flex items-center">
                <i className="bx bx-basket mr-2"></i>
                {isOpen && "Quản lý sản phẩm"}
              </div>
              {isOpen && (
                <i className={`pi ${isProductMenuOpen ? "pi-chevron-down" : "pi-chevron-right"}`} />
              )}
            </div>

            {/* Submenu con */}
            {isOpen && isProductMenuOpen && (
              <ul className="ml-8 mt-1">
                <li>
                  <Link
                    href="/admin/create"
                    className="block px-2 py-1 hover:bg-gray-700 rounded-md text-sm"
                  >
                    Danh sách sản phẩm
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/create_products"
                    className="block px-2 py-1 hover:bg-gray-700 rounded-md text-sm"
                  >
                    Thêm sản phẩm
                  </Link>
                </li>
              </ul>
            )}
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
