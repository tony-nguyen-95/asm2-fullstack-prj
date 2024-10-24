import React, { useState } from "react";
import { API } from "../../apis";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

interface RegisterFormData {
  email: string;
  fullname: string;
  password: string;
  confirm_password: string;
  phoneNumber?: string;
  address: string;
  roleId: 1; // employee
}

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    fullname: "",
    password: "",
    confirm_password: "",
    // phoneNumber: "",
    address: "",
    roleId: 1,
  });

  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    console.log(formData);

    const { data } = await API.post("/users", formData);

    if (data) {
      const sweetAlert = withReactContent(Swal);
      sweetAlert.fire({
        title: <p>Register successfully!</p>,
        timer: 800,
        icon: "success",
      });
    }

    setTimeout(() => {
      navigate("/login");
    }, 800);

    // Reset error after successful submission
    setError(null);
  };

  return (
    <div className="h-screen flex bg-zinc-300">
      <div className="py-6 px-16 border shadow-md bg-white m-auto">
        <h1 className="text-2xl font-bold text-center">Đăng Ký</h1>
        <form onSubmit={handleSubmit} method="post" className="mt-10">
          <div className="mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border focus:outline-none"
              maxLength={45}
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="fullname">Họ và tên</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 border focus:outline-none"
              maxLength={30}
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border focus:outline-none"
              minLength={6}
              maxLength={45}
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="confirm_password">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="roleId">Role</label>
            <select
              name="roleId"
              id="roleId"
              value={formData.roleId}
              onChange={handleChange}
              className="w-full p-2 border focus:outline-none"
            >
              <option value={1}>Ứng viên</option>
              <option value={2}>Nhà tuyển dụng</option>
            </select>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white hover:opacity-75 transition-opacity"
            >
              Đăng kí
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};
