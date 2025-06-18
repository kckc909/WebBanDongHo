"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AxiosResponse } from 'axios';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const API_URL = "http://localhost:4000/api/loaihang";

export default function LoaiHangPage() {
  interface LoaiHang {
    LoaiHangID: string | null;
    TenLoai: string;
  }

  const emptyLoaiHang: LoaiHang = {
    LoaiHangID: null,
    TenLoai: "",
  };

  const [loaiHangs, setLoaiHangs] = useState<LoaiHang[]>([]);
  const [loaiHangDialog, setLoaiHangDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loaiHang, setLoaiHang] = useState<LoaiHang>(emptyLoaiHang);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<LoaiHang[]>>(null);

  useEffect(() => {
    fetchLoaiHangs();
  }, []);

  const fetchLoaiHangs = async () => {
     try {
    const response = await axios.get(`${API_URL}/`);
    console.log("API DATA:", response.data); // Check here
    setLoaiHangs(response.data.data || response.data); // Fallback nếu không có `data.data`
  } catch (error) {
    console.error("Lỗi khi lấy loại hàng:", error);
  }
  };

  const openNew = () => {
    setLoaiHang(emptyLoaiHang);
    setSubmitted(false);
    setLoaiHangDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setLoaiHangDialog(false);
  };

  const saveLoaiHang = async () => {
    setSubmitted(true);

    if (!loaiHang.TenLoai.trim()) {
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Tên loại hàng là bắt buộc!",
        life: 3000,
      });
      return;
    }

    try {
  let response: AxiosResponse<{ data: LoaiHang }>;

  if (loaiHang.LoaiHangID) {
    response = await axios.put(`${API_URL}/update/${loaiHang.LoaiHangID}`, loaiHang);
    setLoaiHangs((prev) =>
      prev.map((item) =>
        item.LoaiHangID === loaiHang.LoaiHangID ? response.data.data : item
      )
    );
    toast.current?.show({
      severity: "success",
      summary: "Thành công",
      detail: "Cập nhật loại hàng",
      life: 3000,
    });
  } else {
    response = await axios.post(`${API_URL}/create`, loaiHang);
    if (response?.data?.data) {
      setLoaiHangs((prev) => [...prev, response.data.data]);
      console.log("RESPONSE CREATE:", response.data);
    }
    toast.current?.show({
      severity: "success",
      summary: "Thành công",
      detail: "Thêm loại hàng mới",
      life: 3000,
    });
  }

      setLoaiHangDialog(false);
      fetchLoaiHangs();
    } 
    catch (error) {
      console.error("Lỗi khi lưu loại hàng:", error);
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Không thể lưu loại hàng!",
        life: 3000,
      });
    }
  };

  const confirmDelete = (item: LoaiHang) => {
    setLoaiHang(item);
    setDeleteDialog(true);
  };

  const deleteLoaiHang = async () => {
    try {
      await axios.delete(`${API_URL}/delete/${loaiHang.LoaiHangID}`);
      toast.current?.show({
        severity: "success",
        summary: "Thành công",
        detail: "Xóa loại hàng thành công",
        life: 3000,
      });
      fetchLoaiHangs();
    } catch (error) {
      console.error("Lỗi khi xóa loại hàng:", error);
    }
    setDeleteDialog(false);
  };

  const header = (
    <div className="flex items-center justify-between p-6  bg-white shadow-lg rounded-lg">
      <h4 className="text-2xl font-semibold text-gray-700">Danh sách loại hàng</h4>
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
          <i className="pi pi-search" />
        </button>
      </div>
      <button
        className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition"
        onClick={openNew}
      >
        Thêm loại hàng
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Toast ref={toast} />
      <div className="card w-full overflow-hidden">
        <DataTable
          className="bg-gray-200"
          ref={dt}
          value={loaiHangs}
          paginator
          rows={5}
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            field="STT"
            header="STT"
            body={(rowData, options) => options.rowIndex + 1}
            style={{ width: "60px", textAlign: "center" }}
          />
          <Column field="TenLoai" header="Tên loại" sortable />
          <Column
            header="Hành động"
            style={{ width: "120px", textAlign: "center" }}
            alignHeader="center"
            body={(rowData) => (
              <div className="flex gap-2 justify-center">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-text p-button-primary"
                  onClick={() => {
                    setLoaiHang(rowData);
                    setLoaiHangDialog(true);
                  }}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-text p-button-danger"
                  onClick={() => confirmDelete(rowData)}
                />
              </div>
            )}
          />
        </DataTable>
      </div>

      <Dialog
        visible={loaiHangDialog}
        style={{ width: "30rem" }}
        header="Thông tin loại hàng"
        modal
        footer={
          <>
            <Button label="Hủy" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Lưu" icon="pi pi-check" onClick={saveLoaiHang} />
          </>
        }
        onHide={hideDialog}
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="tenloai">Tên loại hàng</label>
            <InputText
              id="tenloai"
              value={loaiHang.TenLoai}
              onChange={(e) =>
                setLoaiHang({ ...loaiHang, TenLoai: e.target.value })
              }
              required
              autoFocus
            />
            {submitted && !loaiHang.TenLoai && (
              <small className="p-error">Tên loại hàng là bắt buộc.</small>
            )}
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "450px" }}
        header="Xác nhận"
        modal
        footer={
          <>
            <Button
              label="Không"
              icon="pi pi-times"
              onClick={() => setDeleteDialog(false)}
              className="p-button-text"
            />
            <Button
              label="Có"
              icon="pi pi-check"
              onClick={deleteLoaiHang}
              className="p-button-danger"
            />
          </>
        }
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Bạn có chắc chắn muốn xóa loại hàng này không?</span>
        </div>
      </Dialog>
    </div>
  );
}
