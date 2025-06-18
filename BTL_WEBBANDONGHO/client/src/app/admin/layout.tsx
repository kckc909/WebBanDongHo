"use client";
import { useState } from "react";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Chọn theme
import "primereact/resources/primereact.min.css"; 

import AdminNavbar from "@/components/AdminNavbar";
import Sidebar from "@/components/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);


  const contentWidth = isSidebarPinned || isSidebarHovered ? "ml-64" : "ml-16";
  const navbarWidth = isSidebarPinned || isSidebarHovered ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]";

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        isPinned={isSidebarPinned}
        onTogglePin={() => setIsSidebarPinned(!isSidebarPinned)}
        onHover={setIsSidebarHovered}
      />

      {/* Layout chính */}
      <div className={`flex-1 transition-all ${contentWidth}`}>
        {/* Navbar */}
        <AdminNavbar  navbarWidth={navbarWidth}/>

        {/* Nội dung chính */}
        <main className="p-20 items-center">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
