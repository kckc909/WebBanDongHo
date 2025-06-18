"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");

        if (userData) {
            const parsedUser = JSON.parse(userData);

            if (parsedUser.VaiTro.toLowerCase() != "admin") {
                router.push("/");
            } else {
                setUser(parsedUser);
            }
        } else {
            router.push("/user/login");
        }
    }, [router]);

    if (!user) return <p>Đang kiểm tra quyền truy cập...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Trang Quản Trị</h1>
        </div>
    );
};

export default AdminPage;
