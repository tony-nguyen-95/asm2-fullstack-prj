import React, { useState } from "react";
import { API } from "../../apis";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import authStore from "../../stores/authen.store";

type Props = {};

export const Login: React.FC<Props> = observer(() => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/login", { email, password });

      if (data) {
        setErrorLogin(undefined);

        // Store the user data (assuming it's an object) as a string in sessionStorage
        sessionStorage.setItem("userLogined", JSON.stringify(data));

        if (data) {
          const sweetAlert = withReactContent(Swal);
          sweetAlert.fire({
            title: <p>Login successfully!</p>,
            timer: 800,
            icon: "success",
          });
        }

        authStore.checkLoginStatus();

        setTimeout(() => {
          navigate("/");
        }, 800);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Login error:", error);

        // Check for 401 Unauthorized error
        if (error.response?.status === 401) {
          setErrorLogin("Email hoặc mật khẩu không đúng.");
        } else {
          setErrorLogin("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        }
      } else {
        setErrorLogin("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="h-screen flex bg-zinc-300">
      <div className="py-6 px-16 border shadow-md bg-white m-auto">
        <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border focus:outline-none"
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border focus:outline-none"
              required
            />
          </div>
          {errorLogin && (
            <div className="mt-4 text-red-500 text-center">{errorLogin}</div>
          )}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white hover:opacity-75 transition-opacity"
            >
              Tiếp tục
            </button>
          </div>
        </form>
        <div className="mt-10 text-center">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
});
