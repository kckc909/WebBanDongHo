"use client";
import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const API_URL = "http://localhost:4000/api/hangdongho";

export default function HangDongHoPage() {
  interface HangDongHo {
    HangID: string | null;
    TenHang: string;
  }

  const emptyHang: HangDongHo = {
    HangID: null,
    TenHang: "",
  };

  const [hangs, setHangs] = useState<HangDongHo[]>([]);
  const [hangDialog, setHangDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [hang, setHang] = useState<HangDongHo>(emptyHang);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<HangDongHo[]>>(null);

  useEffect(() => {
    fetchHangs();
  }, []);

  const fetchHangs = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      setHangs(response.data.data || response.data);
    } catch (error) {
      console.error("Lỗi khi lấy hãng đồng hồ:", error);
    }
  };

  const openNew = () => {
    setHang(emptyHang);
    setSubmitted(false);
    setHangDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setHangDialog(false);
  };

  const saveHang = async () => {
    setSubmitted(true);
    if (!hang.TenHang.trim()) {
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Tên hãng là bắt buộc!",
        life: 3000,
      });
      return;
    }

    try {
      let response: AxiosResponse<{ data: HangDongHo }>;
      if (hang.HangID) {
        response = await axios.put(`${API_URL}/update/${hang.HangID}`, hang);
        setHangs((prev) =>
          prev.map((item) => (item.HangID === hang.HangID ? response.data.data : item))
        );
        toast.current?.show({
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật hãng đồng hồ",
          life: 3000,
        });
      } else {
        response = await axios.post(`${API_URL}/create`, hang);
        if (response?.data?.data) {
          setHangs((prev) => [...prev, response.data.data]);
        }
        toast.current?.show({
          severity: "success",
          summary: "Thành công",
          detail: "Thêm hãng đồng hồ mới",
          life: 3000,
        });
      }

      setHangDialog(false);
      fetchHangs();
    } catch (error) {
      console.error("Lỗi khi lưu hãng:", error);
      toast.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Không thể lưu hãng đồng hồ!",
        life: 3000,
      });
    }
  };

  const confirmDelete = (item: HangDongHo) => {
    setHang(item);
    setDeleteDialog(true);
  };

  const deleteHang = async () => {
    try {
      await axios.delete(`${API_URL}/delete/${hang.HangID}`);
      toast.current?.show({
        severity: "success",
        summary: "Thành công",
        detail: "Xóa hãng thành công",
        life: 3000,
      });
      fetchHangs();
    } catch (error) {
      console.error("Lỗi khi xóa hãng:", error);
    }
    setDeleteDialog(false);
  };

  const header = (
    <div className="flex items-center justify-between p-6 bg-white shadow-lg rounded-lg">
      <h4 className="text-2xl font-semibold text-gray-700">Danh sách hãng đồng hồ</h4>
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
        Thêm hãng
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
          value={hangs}
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
          <Column field="TenHang" header="Tên hãng" sortable />
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
                    setHang(rowData);
                    setHangDialog(true);
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

      {/* Dialog chỉnh sửa / thêm */}
      <Dialog
        visible={hangDialog}
        style={{ width: "30rem" }}
        header="Thông tin hãng đồng hồ"
        modal
        footer={
          <>
            <Button label="Hủy" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Lưu" icon="pi pi-check" onClick={saveHang} />
          </>
        }
        onHide={hideDialog}
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="tenhang">Tên hãng</label>
            <InputText
              id="tenhang"
              value={hang.TenHang}
              onChange={(e) =>
                setHang({ ...hang, TenHang: e.target.value })
              }
              required
              autoFocus
            />
            {submitted && !hang.TenHang && (
              <small className="p-error">Tên hãng là bắt buộc.</small>
            )}
          </div>
        </div>
      </Dialog>

      {/* Dialog xóa */}
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
              onClick={deleteHang}
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
          <span>Bạn có chắc chắn muốn xóa hãng này không?</span>
        </div>
      </Dialog>
    </div>
  );
}
