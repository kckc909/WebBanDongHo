"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

interface RegisterData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

const validateRegisterData = (data: RegisterData) => {
  let errors: Partial<RegisterData> = {};

  if (!data.fullName) {
    errors.fullName = "Vui lòng nhập họ và tên";
  }

  if (!data.phone) {
    errors.phone = "Vui lòng nhập số điện thoại";
  }

  if (!data.email) {
    errors.email = "Vui lòng nhập email";
  }

  if (!data.password) {
    errors.password = "Vui lòng nhập mật khẩu";
  }

  return errors;
};

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const { register, handleSubmit, setValue, getValues, formState: { errors }, setError } = useForm<RegisterData>();

  const onSubmit = async () => {
    setLoading(true);
    setErrorMsg("");

    const formData = getValues();
    const validationErrors = validateRegisterData(formData);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, value]) => {
        setError(key as keyof RegisterData, { type: "manual", message: value });
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/users/register", {
        HoTen: formData.fullName,
        DienThoai: formData.phone,
        Email: formData.email,
        MatKhau: formData.password,
      });
      console.log("API Response:", res.data);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      router.push("/user/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data?.message || "Có lỗi xảy ra!");
      } else {
        setErrorMsg("Có lỗi xảy ra!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Đăng Ký</h2>

        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
          <div className="p-field">
            <label>Họ và Tên</label>
            <InputText {...register("fullName", { required: "Vui lòng nhập họ và tên"})}
              className="w-full p-inputtext"
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && <small className="p-error">{errors.fullName.message}</small>}
          </div>

     
          <div className="p-field">
            <label>Số điện thoại</label>
            <InputText {...register("phone", { required: "Vui lòng nhập số điện thoại",
                   pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ"
                }
              })}
              className="w-full p-inputtext"
              placeholder="0123456789"
            />
            {errors.phone && <small className="p-error">{errors.phone.message}</small>}
          </div>

          <div className="p-field">
            <label>Email</label>
            <InputText type="email"
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Email không hợp lệ"
                }
              })}
              className="w-full p-inputtext"
              placeholder="example@gmail.com"
            />
            {errors.email && <small className="p-error">{errors.email.message}</small>}
          </div>
          <div className="p-field">
            <label>Mật khẩu</label>
            <Password feedback={false} toggleMask className="w-full"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải ít nhất 6 ký tự"
                }
              })}
              onChange={(e) => setValue("password", e.target.value)} // Cập nhật giá trị mật khẩu khi thay đổi
            />
            {errors.password && <small className="p-error">{errors.password.message}</small>}
          </div>

          <Button label="Đăng Ký" icon="pi pi-user-plus" className="w-full" loading={loading} />
        </form>

        <p className="text-center text-sm mt-3">
          Đã có tài khoản?{" "}
          <a href="/user/login" className="text-blue-500 hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </Card>
    </div>
  );
};

export default RegisterForm;
