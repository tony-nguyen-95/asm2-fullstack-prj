import { observer } from "mobx-react";
import React, { useState } from "react";
import authStore from "../../stores/authen.store";
import { useNavigate } from "react-router-dom";

type Props = {};

export const Header: React.FC<Props> = observer((props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="bg-black text-white sticky top-0 z-10">
      <div className="mx-8 h-12 lg:h-16 flex justify-between items-center">
        <a href="/" className="font-bold text-lg lg:text-2xl">
          Work CV
        </a>
        <button className="lg:hidden relative" id="mobile-nav-trigger">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <nav className="hidden lg:block relative">
          <ul>
            <li className="inline-block px-2">
              <a href="/" className="flex flex-col items-center group">
                <div>Trang Chủ</div>
                <span className="w-0 group-hover:w-full transition-all h-px bg-white mt-1" />
              </a>
            </li>

            {authStore.isLogin && (
              <li className="inline-block px-2">
                <a href="/follow" className="flex flex-col items-center group">
                  <div>Công ty theo Dõi</div>
                  <span className="w-0 group-hover:w-full transition-all h-px bg-white mt-1" />
                </a>
              </li>
            )}
            {authStore.isLogin &&
              (authStore.userLogined?.roleId === 2 ? (
                <li className="inline-block px-2">
                  <a
                    href="/my-post"
                    className="flex flex-col items-center group"
                  >
                    <div>Tuyển Dụng & Ứng viên</div>
                    <span className="w-0 group-hover:w-full transition-all h-px bg-white mt-1" />
                  </a>
                </li>
              ) : (
                <li className="inline-block px-2">
                  <a href="/apply" className="flex flex-col items-center group">
                    <div>Đã ứng tuyển</div>
                    <span className="w-0 group-hover:w-full transition-all h-px bg-white mt-1" />
                  </a>
                </li>
              ))}
            {authStore.isLogin ? (
              <li className="inline-block px-2 relative">
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="flex flex-col items-center group relative min-w-40"
                >
                  <div>
                    Chào{" "}
                    {authStore.userLogined?.roleId === 2 ? "HR" : "ứng viên"},{" "}
                    {authStore.userLogined?.fullname || ""}
                  </div>
                  <span className="w-0 group-hover:w-24 transition-all h-px bg-white mt-1" />

                  {isDropdownOpen && (
                    <ul className="absolute flex flex-col mt-6 bg-white text-black rounded shadow-lg">
                      <li className="px-4 py-2 hover:bg-gray-200 rounded">
                        <a href="/my-profile">My Profile</a>
                      </li>
                      {authStore.userLogined?.roleId === 2 && (
                        <li className="px-4 py-2 hover:bg-gray-200">
                          <a href="/my-post">My Post</a>
                        </li>
                      )}
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded"
                        onClick={() => {
                          authStore.logout();
                          navigate("/");
                        }}
                      >
                        Đăng Xuất
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            ) : (
              <>
                <li className="inline-block px-2 relative">
                  <a href="/login" className="flex flex-col items-center group">
                    <div>Đăng nhập</div>
                    <span className="w-0 group-hover:w-full transition-all h-px bg-white mt-1" />
                  </a>
                </li>
                <li className="inline-block px-2 relative">
                  <a
                    href="/register"
                    className="flex flex-col items-center group"
                  >
                    <div>Đăng kí</div>
                    <span className="w-0 group-hover:w-full transition-all h-px bg-white mt-1" />
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
});
