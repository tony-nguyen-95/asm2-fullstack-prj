import React, { useEffect } from "react";
import { Footer, Header } from "../../views";
import authStore from "../../stores/authen.store";
import { companyStore, ICompany, IUser, userStore } from "../../stores";
import { observer } from "mobx-react";

export const MyProfileForm: React.FC = observer(() => {
  const { userLogined } = authStore;

  const handleChangeFields = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    userStore.updateField(name as keyof IUser, value);
  };

  const handleSubmitInfo = (e: any) => {
    e.preventDefault();

    userStore.submitUser();
  };

  const handleChangeFieldsCompany = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    companyStore.updateField(name as keyof ICompany, value);
  };

  const handleSubmitCompany = (e: any) => {
    e.preventDefault();

    if (companyStore.hasCompany) {
      companyStore.updateCompany();
    } else {
      companyStore.addCompany();
    }
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      userStore.uploadCV(file);
    }
  };

  useEffect(() => {
    if (userLogined) {
      userStore.setUserForm({ ...userLogined });
    }
  }, [userLogined]);

  // check has company for user
  useEffect(() => {
    if (userLogined) {
      companyStore.getCompanyByUserId(userLogined.id || 0);
    }
  }, [userLogined]);

  // Get resume uploaded
  useEffect(() => {
    if (userLogined?.roleId === 1) {
      userStore.getCVByUserId();
    }
  }, [userLogined]);

  return (
    <>
      <Header />
      <main className="mx-auto">
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-200 py-20 mx-auto">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold text-center text-white">Hồ Sơ</h1>
            <div className="size-32 rounded-full mx-auto border drop-shadow-md mt-4 overflow-hidden">
              <img
                id="avatar-preview-header"
                src="assets/images/avatar-default.jpg"
                alt="avatar"
                className="object-cover object-center size-full bg-white"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 py-6 mx-auto">
          <div className="mx-auto px-24 flex flex-wrap justify-center gap-2">
            <div className="w-[48%]">
              <form
                className="relative"
                id="candidate-info-form"
                onSubmit={handleSubmitInfo}
              >
                <div className="mt-4 p-6 border rounded-md bg-white flex flex-wrap items-center justify-between">
                  <h3 className="text-lg font-bold w-full text-center">
                    Thông tin cá nhân
                  </h3>
                  {authStore.userLogined?.status !== "VERIFIED" ? (
                    <h3 className="text-orange-300 my-3">
                      Tài khoản của bạn chưa được xác thực email, hãy kiểm tra
                      email và xác thực!
                    </h3>
                  ) : (
                    <h3 className="text-green-300 my-3">
                      Tài khoản đã được xác thực!
                    </h3>
                  )}
                  <hr className="border-1 mt-4" />
                  <div className="mt-4 w-full">
                    <label htmlFor="email" className="block">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border rounded-md p-2 outline-none"
                      value={userStore.userForm.email}
                      disabled
                      onChange={handleChangeFields}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <label htmlFor="fullname" className="block">
                      Tên đầy đủ
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      required
                      value={userStore.userForm.fullname}
                      className="w-full border rounded-md p-2 outline-none"
                      onChange={handleChangeFields}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <label htmlFor="address" className="block">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={userStore.userForm.address}
                      className="w-full border rounded-md p-2 outline-none"
                      onChange={handleChangeFields}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <label htmlFor="phoneNumber" className="block">
                      Số điện thoại
                    </label>
                    <div className="w-full border rounded-md flex items-center">
                      <span className="p-2 pr-4 font-semibold px-2"> +84 </span>
                      <input
                        type="text"
                        required
                        name="phoneNumber"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id="phoneNumber"
                        value={userStore.userForm.phoneNumber}
                        className="outline-none p-2 flex-1 rounded-md"
                        onChange={handleChangeFields}
                      />
                    </div>
                  </div>
                  <div className="mt-4 w-full">
                    <label htmlFor="editor-bio-candidate" className="block">
                      Mô tả bản thân
                    </label>
                    <div id="editor-bio-candidate" />
                    <textarea
                      name="description"
                      required
                      className="min-h-16 w-full border rounded"
                      value={userStore.userForm.description}
                      onChange={handleChangeFields}
                    />
                  </div>
                  {userLogined?.roleId === 1 && (
                    <div className="mt-4 w-full">
                      <label htmlFor="cv" className="block">
                        Sơ yếu lý lịch
                      </label>
                      {!userStore.fileNameCV ? (
                        <div className="flex items-center relative mt-4">
                          <label
                            htmlFor="cv"
                            className="px-4 py-2 text-white rounded-md bg-cyan-400 cursor-pointer"
                          >
                            Cập nhật CV (PDF)
                          </label>
                          <div id="cv-file-name" className="ml-2" />
                          <input
                            type="file"
                            id="cv"
                            name="cv"
                            className="absolute -z-10"
                            accept=".pdf"
                            onChange={handleFileChange}
                          />
                        </div>
                      ) : (
                        <div>Uploaded already {userStore.fileNameCV}</div>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-4 py-2 drop-shadow-lg bg-cyan-400 text-white rounded-md cursor-pointer mt-4"
                  >
                    Lưu thông tin
                  </button>
                </div>
              </form>
            </div>

            {userLogined?.roleId === 2 && (
              <div className="w-[48%]">
                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="w-full">
                    <form
                      className="relative"
                      id="company-info-form"
                      encType="multipart/form-data"
                      onSubmit={handleSubmitCompany}
                    >
                      <div className="mt-4 p-6 border rounded-md bg-white">
                        <h3 className="text-lg font-bold w-full text-center">
                          Thông tin công ty
                        </h3>
                        <div>
                          <label htmlFor="email" className="block">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={companyStore.companyForm.email}
                            onChange={handleChangeFieldsCompany}
                            className="w-full border rounded-md p-2 outline-none"
                          />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="name" className="block">
                            Tên công ty
                          </label>
                          <input
                            type="text"
                            id="nameCompany"
                            name="nameCompany"
                            value={companyStore.companyForm.nameCompany}
                            onChange={handleChangeFieldsCompany}
                            className="w-full border rounded-md p-2 outline-none"
                          />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="address" className="block">
                            Địa chỉ
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={companyStore.companyForm.address}
                            onChange={handleChangeFieldsCompany}
                            className="w-full border rounded-md p-2 outline-none"
                          />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="tel" className="block">
                            Số điện thoại công ty
                          </label>
                          <div className="w-full border rounded-md flex items-center">
                            <span className="p-2 pr-4 font-semibold px-2">
                              {" "}
                              +84{" "}
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={companyStore.companyForm.phoneNumber}
                              onChange={handleChangeFieldsCompany}
                              className="outline-none p-2 flex-1 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="description-company"
                            className="block"
                          >
                            Mô tả công ty
                          </label>
                          <div id="editor-bio-company" />
                          <textarea
                            name="description"
                            id="description"
                            value={companyStore.companyForm.description}
                            onChange={handleChangeFieldsCompany}
                            className="min-h-32 rounded border w-full"
                          />
                        </div>
                        {/* <div className="mt-4 relative">
                        <label className="block">Logo công ty</label>
                        <img
                          id="logo-preview"
                          src="assets/images/logo-default.jpg"
                          alt="logo"
                          className="size-20 rounded-full border mt-4 object-cover object-center"
                        />
                        <div className="flex relative mt-4">
                          <label
                            htmlFor="logo"
                            className="px-4 py-2 text-white rounded-md bg-cyan-400 cursor-pointer"
                          >
                            Cập nhật
                          </label>
                          <input
                            type="file"
                            id="logo"
                            name="logo"
                            className="absolute -z-10"
                            accept=".png,.jpg,.jpeg"
                          />
                        </div>
                      </div> */}
                        <button
                          type="submit"
                          className="px-4 py-2 drop-shadow-lg bg-cyan-400 text-white rounded-md cursor-pointer mt-4"
                        >
                          Lưu thông tin
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
});
