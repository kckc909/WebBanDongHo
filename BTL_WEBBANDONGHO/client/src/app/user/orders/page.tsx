"use client";

import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import Image from "next/image";
import Link from "next/link";
import ServicePromo from "@/components/Service";
import { Dialog } from "primereact/dialog";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Đồng hồ Tissot PRX Powermatic 80",
    price: 25000,
    quantity: 2,
    image: "/images/product/product-04.png",
  },
  {
    id: 2,
    name: "Đồng hồ Orient Bambino Version IV",
    price: 18000,
    quantity: 3,
    image: "/images/product/product-05.png",
  },
];

type Coupon = {
  code: string;
  discount: string;
  description: string;
  condition?: string;
};

const coupons: Coupon[] = [
  {
    code: "BEA50",
    discount: "50K",
    description: "Nhập mã BEA50 giảm 50K đơn từ 750K",
    condition: "Áp dụng cho các đơn hàng có tổng giá trị lớn hơn 750.000đ",
  },
  {
    code: "BEA15",
    discount: "15%",
    description: "Nhập mã BEA15 giảm 15% đơn từ 1.500.000đ",
    condition: "Áp dụng cho các đơn hàng có tổng giá trị lớn hơn 1.500.000đ",
  },
  {
    code: "BEAN99K",
    discount: "99K",
    description: "Nhập mã BEAN99K giảm ngay 99K",
  },
  {
    code: "FREESHIP",
    discount: "0K",
    description: "Nhập mã FREESHIP miễn phí vận chuyển",
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCondition, setShowCondition] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);



  const onQuantityChange = (itemId: number, value: number) => {
    if (value < 1) return; // Không cho số lượng nhỏ hơn 1
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, quantity: value } : item
    );
    setItems(updated);
  };

  const confirmDeleteProduct = (item: CartItem) => {
    setItemToDelete(item);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = () => {
    if (itemToDelete) {
      setItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
      setSelectedItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
    }
    setShowConfirm(false);
  };

  const imageBodyTemplate = (item: CartItem) => (
    <div className="flex items-center gap-2">
      <Image src={item.image} width={60} height={60} alt={item.name} />
      <span>{item.name}</span>
    </div>
  );

  const priceBodyTemplate = (item: CartItem) => (
    <span className="text-green-700">
      {item.price.toLocaleString("vi-VN")}₫
    </span>
  );

  const quantityBodyTemplate = (item: CartItem) => (
    <div className="flex items-center border border-gray-300 rounded overflow-hidden w-[90px] h-[32px]">
      <button
        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
        className="w-8 h-full bg-gray-100 hover:bg-amber-500 text-gray-700 text-sm"
      >
        −
      </button>
      <div className="w-[30px] text-center text-sm">{item.quantity}</div>
      <button
        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
        className="w-8 h-full bg-gray-100 hover:bg-amber-500 text-gray-700 text-sm"
      >
        +
      </button>
    </div>
  );

  const totalPriceBodyTemplate = (item: CartItem) => (
    <span className="text-red-600 font-medium">
      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
    </span>
  );

  const deleteButtonTemplate = (item: CartItem) => {
    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );

    return (
      <Button
        unstyled
        icon="pi pi-trash"
        className={`rounded-full p-3 transition-colors duration-200
          ${
            isSelected
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
          }`}
        onClick={() => confirmDeleteProduct(item)}
        aria-label={`Xóa sản phẩm ${item.name}`}
      />
    );
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  const times = [
    { label: "8:00 - 10:00", value: "8-10" },
    { label: "10:00 - 12:00", value: "10-12" },
    { label: "12:00 - 14:00", value: "12-14" },
  ];

  // Tìm coupon được chọn để hiển thị chính xác trong modal
  const selectedCoupon = coupons.find((c) => c.code === selectedCode);

  return (
    <>
      {/* Banner */}
      <div
        className="relative py-4 bg-cover bg-center h-[200px]"
        style={{ backgroundImage: "url('/images/shopproduct.png')" }}
      >
        <div className="flex items-center justify-center h-[150px]  bg-opacity-50 text-center">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-2">Giỏ Hàng</h2>
            <div className="text-white space-x-2 text-sm">
              <Link
                href="/user"
                className="hover:underline hover:text-amber-300"
              >
                Trang chủ /
              </Link>
              <Link
                href="/shopproduct"
                className="hover:underline hover:text-amber-300"
              >
                Sản Phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="flex gap-6 py-3 max-w-screen-xl mx-auto px-4">
        {/* Cart table */}
        <div className="w-2/3 p-4 rounded-lg border border-gray-300 shadow-sm">
          <DataTable
            value={items}
            selection={selectedItems}
            onSelectionChange={(e) => setSelectedItems(e.value as CartItem[])}
            dataKey="id"
            responsiveLayout="scroll"
            selectionMode="multiple"
            className="w-full"
            emptyMessage="Không có sản phẩm trong giỏ hàng"
          >
            <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
            <Column header="Thông tin sản phẩm" body={imageBodyTemplate} />
            <Column header="Đơn giá" body={priceBodyTemplate} />
            <Column header="Số lượng" body={quantityBodyTemplate} />
            <Column
              header="Thành tiền"
              body={totalPriceBodyTemplate}
              style={{ width: "120px", textAlign: "center" }}
            />
            <Column
              header="Hành động"
              style={{ width: "120px", textAlign: "center" }}
              body={deleteButtonTemplate}
            />
          </DataTable>

          {/* Total */}
          <div className="flex flex-col items-end mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <h5 className="text-base font-bold">Tổng Tiền:</h5>
              <div className="text-lg font-semibold text-red-600">
                {items
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toLocaleString("vi-VN")}
                ₫
              </div>
            </div>
            <button className="bg-green-500 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded shadow transition duration-300 flex items-center gap-2">
              <i className="pi pi-credit-card"></i> Thanh toán
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-1/3 p-3 space-y-6 shadow-lg rounded-lg bg-gray-50">
          <div className=" ">
            <h5 className="font-semibold mb-2">Thời gian giao hàng</h5>
            <div className="flex gap-3 rounded-lg">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value ?? null)}
                placeholder="Chọn ngày"
                showIcon
                className="w-full"
              />
              <Dropdown
                value={time}
                options={times}
                onChange={(e) => setTime(e.value)}
                placeholder="Chọn thời gian"
                className="w-full"
              />
            </div>

            <div className="py-3">
              <h5 className="font-semibold mb-2">Mã giảm giá</h5>
              <div className="flex flex-wrap gap-2 py-3">
                {coupons.map((coupon) => (
                  <span
                    key={coupon.code}
                    onClick={() => {
                      setSelectedCode(coupon.code);
                      setShowCouponModal(true);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600 select-none"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedCode(coupon.code);
                        setShowCouponModal(true);
                      }
                    }}
                  >
                    {coupon.code}
                  </span>
                ))}
              </div>

              {/* Modal mã giảm giá */}
              {showCouponModal && selectedCoupon && (
                <div className="flex flex-col   p-2">
                  <div className="flex border border-dashed border-green-500 rounded-lg overflow-hidden w-full max-w-2xl">
                    {/* Khối giảm giá */}
                    <div className="bg-green-600 text-white font-bold text-xl w-[80px] flex items-center justify-center py-6">
                      {selectedCoupon.discount}
                    </div>

                    {/* Nội dung mô tả + nút */}
                    <div className="flex justify-between items-center flex-1 px-4 py-2">
                      <div className="flex flex-col justify-center ">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Mã giảm giá </span>
                          <span className="font-bold text-yellow-600">
                            {selectedCoupon.code}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedCoupon.description}
                        </p>
                      </div>

                      <div className="flex flex-col  items-start justify-start gap-1">
                        <button
                          className="bg-green-600 text-white px-4 py-1.5 rounded text-sm hover:bg-green-700 whitespace-nowrap"
                          onClick={() => copyToClipboard(selectedCoupon.code)}
                        >
                          Lưu Mã
                        </button>
                        {selectedCoupon.condition && (
                          <button
                            className="text-blue-600 hover:underline text-xs"
                            onClick={() => setShowCondition(!showCondition)}
                          >
                            Điều kiện
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {showCondition && selectedCoupon.condition && (
                    <div className="bg-gray-100 mt-2 text-gray-700 text-xs rounded border border-gray-300 p-2  whitespace-pre-wrap max-w-2xl">
                      {selectedCoupon.condition}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Promo service */}
      <div className="container py-3 px-4 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
        <ServicePromo />
      </div>

      {/* Dialog xác nhận xoá */}
      <Dialog
        header={
          <h2 className="text-red-600 text-lg font-bold">Xác nhận xoá</h2>
        }
        visible={showConfirm}
        onHide={() => setShowConfirm(false)}
        className="w-[400px]"
        footer={
          <div className="flex  justify-end gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className=" huy border  border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition rounded px-4 py-2 flex items-center gap-2"
            >
              <i className="pi pi-times"></i> Huỷ
            </button>

            <button
              onClick={handleDeleteConfirmed}
              className="xac-nhan  bg-red-500 text-white hover:bg-red-600 transition rounded px-4 py-2 flex items-center gap-2"
            >
              <i className="pi pi-check"></i> Xác nhận
            </button>
          </div>
        }
      >
        <p>
          Bạn có chắc chắn muốn xoá sản phẩm{" "}
          <strong>{itemToDelete?.name}</strong> khỏi giỏ hàng không?
        </p>
      </Dialog>
    </>
  );
}
