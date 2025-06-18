"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";



interface LoginData {
 
  email: string;
  password: string;

}

const validateLoginData = (data: LoginData) => {
  const errors: Partial<LoginData> = {};

  if (!data.email) {
    errors.email = "Vui lòng nhập email";
  }

  if (!data.password) {
    errors.password = "Vui lòng nhập mật khẩu";
  }

  return errors;
};


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const { register, handleSubmit, setValue, getValues, formState: { errors }, setError } = useForm<LoginData>();

  const onSubmit = async () => {
    setLoading(true);
    setErrorMsg("");

    const formData = getValues();
    console.log(formData);
    const validationErrors = validateLoginData(formData);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, value]) => {
        setError(key as keyof LoginData, { type: "manual", message: value });
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/users/login", {
     
        Email: formData.email,
        MatKhau: formData.password,
      
      });
      console.log("API Response:", res.data);
      const { token, user } = res.data;
    
      // Lưu vào localStorage trước khi redirect
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    
   
      setTimeout(() => {
        if (user.VaiTro === "admin") {
          router.push("/admin");
          console.log("áhdygsfdygasdghsayg")
        } else {
          router.push("/");
          console.log("1234324")
        }

        console.log(user.VaiTro)
      }, 100);

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
        <h2 className="text-xl font-semibold text-center mb-4">Đăng Nhập</h2>

        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="p-field">
            <label>Email</label>
            <InputText 
              type="email" 
              {...register("email")} 
              className="w-full p-inputtext"
              placeholder="example@gmail.com"
            />
            {errors.email && <small className="p-error">{errors.email.message}</small>}
          </div>

          {/* Mật khẩu */}
          <div className="p-field">
            <label>Mật khẩu</label>
            <Password 
              feedback={false} 
              toggleMask 
              className="w-full"
              onChange={(e) => setValue("password", e.target.value)}
            />
            {errors.password && <small className="p-error">{errors.password.message}</small>}
          </div>

          <Button label="Đăng Nhập" icon="pi pi-sign-in" className="w-full" loading={loading} />
        </form>

        <p className="text-center text-sm mt-3">
          Chưa có tài khoản?{" "}
          <a href="/user/register" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </Card>
    </div>
  );
};

export default LoginForm;
