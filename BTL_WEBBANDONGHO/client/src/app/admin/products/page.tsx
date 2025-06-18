"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import Image from "next/image";

const API_URL = "http://localhost:4000/api/sanpham";

export default function ProductManagement() {
  interface Product {
    SanPhamID: number | null;
    TenSanPham: string;
    HinhAnh: string;
    LoaiHangID: number | null;
    HangID: number | null;
    MoTa: string;
    GiaBan: number;
    SoLuongTon: number;
  }

  const emptyProduct: Product = {
    SanPhamID: null,
    TenSanPham: "",
    HinhAnh: "",
    LoaiHangID: null,
    HangID: null,
    MoTa: "",
    GiaBan: 0,
    SoLuongTon: 0,
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const confirmDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialog(true);
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await axios.delete(`${API_URL}/delete/${selectedProduct.SanPhamID}`);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Product Deleted",
          life: 3000,
        });
        fetchProducts();
        setDeleteDialog(false);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.TenSanPham.trim()) {
      try {
        if (product.SanPhamID) {
          await axios.put(`${API_URL}/${product.SanPhamID}`, product);
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Product Updated",
            life: 3000,
          });
        } else {
          await axios.post(API_URL, product);
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Product Created",
            life: 3000,
          });
        }
        fetchProducts();
        setProductDialog(false);
        setProduct(emptyProduct);
      } catch (error) {
        console.error("Error saving product:", error);
      }
    }
  };

  const editProduct = (product: Product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={<Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />}
        />
        <DataTable value={products} paginator rows={10} dataKey="SanPhamID">
          <Column field="TenSanPham" header="Tên Sản Phẩm" sortable />
          <Column
            field="HinhAnh"
            header="Hình Ảnh"
            body={(rowData) => (
              <Image
                src={rowData.HinhAnh || "/placeholder.png"}
                alt={rowData.TenSanPham}
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
            )}
          />
          <Column field="MoTa" header="Mô Tả" />
          <Column field="GiaBan" header="Giá Bán" sortable />
          <Column field="SoLuongTon" header="Số lượng tồn" sortable />
          <Column
            header="Hành động"
            style={{ width: "120px", textAlign: "center" }}
            alignHeader="center"
            body={(rowData) => (
              <div className="flex gap-2 justify-center">
                <Button icon="pi pi-pencil" className="p-button-text" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
              </div>
            )}
          />
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "40rem" }}
        header="Chi Tiết Sản Phẩm"
        modal
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="flex gap-6">
          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            {product.HinhAnh ? (
              <Image
                src={product.HinhAnh || "/placeholder.png"}
                alt="Ảnh sản phẩm"
                width={180}
                height={180}
                style={{ objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
              />
            ) : (
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color: "#999",
                }}
              >
                Chưa có ảnh
              </div>
            )}
            <button
              type="button"
              onClick={() => document.getElementById("imageUpload")?.click()}
              style={{ padding: "0.5rem 1.5rem", borderRadius: "4px", backgroundColor: "#007bff", color: "white", border: "none" }}
            >
              Thêm ảnh
            </button>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setProduct({ ...product, HinhAnh: event.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div className="field">
              <label htmlFor="TenSanPham">Tên Sản Phẩm</label>
              <InputText
                id="TenSanPham"
                value={product.TenSanPham}
                onChange={(e) => setProduct({ ...product, TenSanPham: e.target.value })}
                required
                autoFocus
                className={`w-full ${submitted && !product.TenSanPham.trim() ? "p-invalid" : ""}`}
              />
              {submitted && !product.TenSanPham.trim() && (
                <small className="p-error">Tên sản phẩm là bắt buộc</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="MoTa">Mô Tả</label>
              <InputText id="MoTa" value={product.MoTa} onChange={(e) => setProduct({ ...product, MoTa: e.target.value })} className="w-full" />
            </div>
            <div className="field">
              <label htmlFor="GiaBan">Giá Bán</label>
              <InputNumber id="GiaBan" value={product.GiaBan} onValueChange={(e) => setProduct({ ...product, GiaBan: e.value ?? 0 })} className="w-full" />
            </div>
            <div className="field">
              <label htmlFor="SoLuongTon">Số Lượng Tồn</label>
              <InputNumber id="SoLuongTon" value={product.SoLuongTon} onValueChange={(e) => setProduct({ ...product, SoLuongTon: e.value ?? 0 })} className="w-full" />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "400px" }}
        header="Xác nhận"
        modal
        footer={
          <>
            <Button label="Hủy" icon="pi pi-times" outlined onClick={() => setDeleteDialog(false)} />
            <Button label="Xóa" icon="pi pi-check" severity="danger" onClick={handleDeleteProduct} />
          </>
        }
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle" style={{ fontSize: "2rem", color: "red" }} />
          {selectedProduct && (
            <span>
              Bạn có chắc chắn muốn xóa <b>{selectedProduct.TenSanPham}</b> không?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
