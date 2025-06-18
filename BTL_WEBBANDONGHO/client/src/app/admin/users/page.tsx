"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { AxiosResponse } from "axios";

const API_URL = "http://localhost:4000/api/users";

export default function UserPage() {
  interface User {
    NguoiDungID: string | null;
    HoTen: string;
    MatKhau: string;
    GioiTinh: string;
    Email: string;
    DienThoai: string;
    VaiTro: string;
  }

  const emptyUser: User = {
    NguoiDungID: null,
    HoTen: "",
    MatKhau: "",
    GioiTinh: "",
    Email: "",
    DienThoai: "",
    VaiTro: "",
  };

  const [users, setUsers] = useState<User[]>([]);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [user, setUser] = useState<User>(emptyUser);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<User[]>>(null); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      console.log("Dữ liệu API trả về:", response.data.data); // Kiểm tra dữ liệu

      if (response?.data?.data) {
        setUsers(response.data.data);
      } else {
        console.error("Dữ liệu không hợp lệ:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };

  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const isValidPassword = (password: string): boolean => password.length >= 6;
  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhoneNumber = (phone: string): boolean =>
    /^[0-9]{10}$/.test(phone);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
    } else {
      setEmailError("");
    }
  };
  const validatePassword = (value: string) => {
    if (!value.trim()) {
      setPasswordError("Mật khẩu không được để trống.");
    } else if (!isValidPassword(value)) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
    } else {
      setPasswordError("");
    }
  };
  const saveUser = async () => {
    setSubmitted(true);

    if (!user.Email || !user.MatKhau) {
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Email và mật khẩu là bắt buộc!",
        life: 3000,
      });
      return;
    }

    if (!isValidPassword(user.MatKhau)) {
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Mật khẩu phải có ít nhất 6 ký tự!",
        life: 3000,
      });
      return;
    }

    if (!isValidEmail(user.Email)) {
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Email không đúng định dạng!",
        life: 3000,
      });
      return;
    }

    if (!isValidPhoneNumber(user.DienThoai)) {
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Số điện thoại phải là 10 số!",
        life: 3000,
      });
      return;
    }

  try {
    let response: AxiosResponse<{ data: User }>;
    if (user.NguoiDungID) {
      response = await axios.put(
        `${API_URL}/update/${user.NguoiDungID}`,
        user
      );

      setUsers((prev) =>
        prev.map((u) =>
          u.NguoiDungID === user.NguoiDungID ? response.data.data : u
        )
      );
      toast.current?.show({
        severity: "success",
        summary: "Thành công",
        detail: "Cập nhật người dùng",
        life: 3000,
      });
    } else {
      console.log(user)
      response = await axios.post(`${API_URL}/create`, user);
      if (response?.data?.data) {
        setUsers((prev) => [...prev, response.data.data]);
      }
      toast.current?.show({
        severity: "success",
        summary: "Thành công",
        detail: "Thêm người dùng mới",
        life: 3000,
      });
    }

    setUserDialog(false);
    fetchUsers();
  } catch (error) {
    console.error("Lỗi khi lưu người dùng:", error);
    toast.current?.show({
      severity: "error",
      summary: "Lỗi",
      detail: "Không thể lưu người dùng!",
      life: 3000,
    });
  }
}

  const confirmDeleteUser = (user: User) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${API_URL}/delete/${user.NguoiDungID}`);
      toast.current?.show({
        severity: "success",
        summary: "Thành công",
        detail: "Xóa người dùng thành công",
        life: 3000,
      });
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
    setDeleteUserDialog(false);
  };
  const genderOptions = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];
  const roleOptions = [
    { label: "User", value: "User" },
    { label: "Admin", value: "Admin" },
  ];
  const header = (
    <div className="flex items-center justify-between p-6  bg-white shadow-lg rounded-lg">
      <h4 className="text-2xl font-semibold text-gray-700">
        Danh sách người dùng
      </h4>
      <div className="relative w-full max-w-sm">
  <input
    type="text"
    placeholder="Tìm kiếm..."
    value={globalFilter || ""}
    onChange={(e) => setGlobalFilter(e.target.value)}
    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-orange-400"
  />
  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
    <i className="pi pi-search"></i> {/* Hoặc đổi sang icon khác nếu không dùng PrimeIcons */}
  </button>
</div>


      <button
        className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition"  
        onClick={openNew}
      > Thêm người dùng
      </button>
    </div>
  );
  return (
    <div className=" max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Toast ref={toast} />
      <div className="card w-full overflow-hidden">
        <DataTable
          className="bg-gray-200"
          ref={dt}
          value={users}
          paginator
          rows={5}
          globalFilter={globalFilter}
          header={header}
          paginatorLeft={<div className="ml-2" />}
          responsiveLayout="scroll"
        >
          <Column
            field="STT"
            header="STT"
            body={(rowData, options) => options.rowIndex + 1}
            style={{ width: "60px", textAlign: "center" }}
          />
          <Column field="HoTen" header="Họ Tên" sortable />
          <Column field="GioiTinh" header="Giới Tính" sortable />
          <Column field="Email" header="Email" sortable />
          <Column field="DienThoai" header="Điện Thoại" sortable />
          <Column field="VaiTro" header="Vai Trò" sortable />
          <Column
            header="Hành động"
            style={{ width: "120px", textAlign: "center" }}
            alignHeader="center"
            body={(rowData) => (
              <div className="flex gap-2 justify-center">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-text p-button-primary"
                  onClick={() => (setUser(rowData), setUserDialog(true))}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-text p-button-danger"
                  onClick={() => confirmDeleteUser(rowData)}
                />
              </div>
            )}
          />
        </DataTable>
      </div>
      <Dialog
        visible={userDialog}
        style={{ width: "32rem" }}
        header="Thông tin người dùng"
        modal
        footer={
          <>
            <Button label="Hủy" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Lưu" icon="pi pi-check" onClick={saveUser} />
          </>
        }
        onHide={hideDialog}
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="name">Họ Tên</label>
            <InputText
              id="name"
              placeholder="Nhập họ và tên"
              value={user.HoTen}
              onChange={(e) => setUser({ ...user, HoTen: e.target.value })}
              required
              autoFocus
            />
            {submitted && !user.HoTen && (
             <small className="p-error">Họ tên là bắt buộc.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="password" className="font-bold">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <InputText
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={user.MatKhau}
              onChange={(e) => {
                setUser({ ...user, MatKhau: e.target.value });
                validatePassword(e.target.value);
              }}
              required
              className={passwordError ? "p-invalid" : ""}
            />
            {passwordError && (
              <small className="p-error">{passwordError}</small>
            )}
          </div>

         
          <div className="field">
            <label htmlFor="gender">Giới Tính</label>
            <Dropdown
              id="gender"
              value={user.GioiTinh}
              options={genderOptions}
              onChange={(e) => setUser({ ...user, GioiTinh: e.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="email" className="font-bold">
              Email <span className="text-red-500">*</span>
            </label>
            <InputText
              id="email"
              placeholder="Nhập email"
              value={user.Email}
              onChange={(e) => {
                setUser({ ...user, Email: e.target.value });
                validateEmail(e.target.value);
              }}
              required
              className={emailError ? "p-invalid" : ""}
            />
            {emailError && <small className="p-error">{emailError}</small>}
          </div>

          <div className="field">
            <label htmlFor="phone">Số điện thoại</label>
            <InputText
              id="phone"
              placeholder="Nhập số điện thoại"
              value={user.DienThoai}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Chỉ cho phép nhập số
                  setUser({ ...user, DienThoai: value });
                }
              }}
              required
            />
            {!isValidPhoneNumber(user.DienThoai) &&
              user.DienThoai.length > 0 && (
                <small className="p-error">
                  Số điện thoại phải có đúng 10 chữ số.
                </small>
              )}
          </div>

          <div className="field">
            <label htmlFor="role">Vai trò</label>
            <Dropdown
              id="role"
              placeholder="Chọn vai trò"
              value={user.VaiTro}
              options={roleOptions}
              onChange={(e) => setUser({ ...user, VaiTro: e.value })}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={deleteUserDialog}
        style={{ width: "450px" }}
        header="Xác nhận"
        modal
        footer={
          <>
            <Button
              label="Không"
              icon="pi pi-times"
              onClick={() => setDeleteUserDialog(false)}
              className="p-button-text"
            />
            <Button
              label="Có"
              icon="pi pi-check"
              onClick={deleteUser}
              className="p-button-danger"
            />
          </>
        }
        onHide={() => setDeleteUserDialog(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Bạn có chắc chắn muốn xóa người dùng này không?</span>
        </div>
      </Dialog>
    </div>
  );
}
