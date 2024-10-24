import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../views";
import authStore from "../../stores/authen.store";
import {
  applyRecruitmentStore,
  companyStore,
  IRecruitment,
  recruitmentStore,
} from "../../stores";
import { observer } from "mobx-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RiProjectorFill } from "react-icons/ri";
import { CiLocationArrow1 } from "react-icons/ci";
import { ApplyItem } from "../../components";

export const MyPost: React.FC = observer(() => {
  const { userLogined } = authStore;

  const [openAppliesByReMap, setOpenAppliesByReMap] =
    useState<Map<number, boolean>>();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (recruitmentStore.typeOfForm === "detail") {
      return;
    } else if (recruitmentStore.typeOfForm === "add") {
      return recruitmentStore.addRecruitment();
    } else if (recruitmentStore.typeOfForm === "update") {
      return recruitmentStore.updateRecruitment();
    }
  };

  const handleChangeFields = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    recruitmentStore.updateField(name as keyof IRecruitment, value);
  };

  const handleQuillChange = (value: string) => {
    recruitmentStore.updateField("description", value);
  };

  const handleOpenApplyByReId = (reId: number) => {
    if (!openAppliesByReMap) return;

    if (!applyRecruitmentStore.mapApplyRecruitment.has(reId)) {
      applyRecruitmentStore.getApplyByRecruitmentId(reId);
    }

    const newMap = new Map(openAppliesByReMap);
    const currentValue = openAppliesByReMap.get(reId) || false;
    newMap.set(reId, !currentValue);

    setOpenAppliesByReMap(newMap);
  };

  useEffect(() => {
    if (userLogined) {
      companyStore.getCompanyByUserId(userLogined.id || 0);
    }
  }, [userLogined]);

  useEffect(() => {
    if (companyStore.hasCompany) {
      recruitmentStore.getRecruitmentByCompanyId(
        companyStore.companyForm.id || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyStore.hasCompany]);

  useEffect(() => {
    if (recruitmentStore.recruitmentList.length != 0) {
      const mapApplies = new Map();
      recruitmentStore.recruitmentList.forEach((re) => {
        mapApplies.set(re.id, false);
      });
      setOpenAppliesByReMap(mapApplies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recruitmentStore.recruitmentList.length]);

  return (
    <>
      <Header />
      <main>
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-200 py-20">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold text-center text-white text-center">
              Danh sách công việc đã đăng
            </h1>
          </div>
        </div>
        <div className="bg-gray-50 py-4 flex flex-wrap justify-center">
          <div className="w-8/12 flex flex-wrap justify-center items-center flex-col">
            {!companyStore.hasCompany && (
              <h3 className="text-red-300">
                Bạn chưa thêm thông tin công ty, hãy thêm công ty trước khi tạo
                bài đăng
              </h3>
            )}
            {!recruitmentStore.recruitmentList.length && (
              <h3 className="text-red-300">Bạn chưa có bài tuyển dụng nào!</h3>
            )}
            <button
              type="button"
              onClick={() => {
                recruitmentStore.resetForm();
                recruitmentStore.setTypeOfForm("add");
              }}
              className="text-base mx-auto px-2 py-1 bg-green-400 rounded font-bold text-center text-white"
            >
              Đăng Công Việc Mới
            </button>
            {recruitmentStore.typeOfForm === "delete" && (
              <div className="flex flex-wrap flex-col mt-4">
                <h3>
                  Bạn có chắc muốn xoá tin:{" "}
                  {recruitmentStore.recruitmentForm.title}?
                </h3>
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <button
                    className="rounded bg-gray-400 text-white px-3 py-2"
                    onClick={() => recruitmentStore.resetForm()}
                  >
                    CANCLE
                  </button>
                  <button
                    className="rounded bg-red-400 text-white px-3 py-2"
                    onClick={() => recruitmentStore.deleteRecruitment()}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            )}
            {recruitmentStore.typeOfForm &&
              recruitmentStore.typeOfForm !== "delete" && (
                <form onSubmit={handleSubmit} className="relative mx-auto">
                  <h2 className="text-xl font-bold mt-10">
                    {recruitmentStore.typeOfForm?.toUpperCase()} RECRUITMENT
                  </h2>
                  <div className="mt-4 p-6 border rounded-md bg-white">
                    <h3 className="text-lg font-bold">
                      Chi tiết bài tuyển dụng
                    </h3>
                    <hr className="border-1 mt-4" />
                    <div className="mt-4">
                      <label htmlFor="title" className="block">
                        Tiêu đề
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={recruitmentStore.recruitmentForm.title}
                        className="w-full border rounded-md p-2 outline-none"
                        required
                        onChange={handleChangeFields}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-gray-700 font-medium"
                      >
                        Mô tả công việc
                      </label>
                      <ReactQuill
                        className="custom-quill border-b-2 focus:border-blue-600"
                        value={recruitmentStore.recruitmentForm.description}
                        onChange={handleQuillChange}
                        theme="snow"
                        modules={{
                          toolbar: {
                            container: [
                              [{ header: [1, 2, 3, false] }],
                              ["image"],
                              [{ size: [] }],
                              [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                              ],
                              [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                              ],
                              [{ color: [] }, { background: [] }],
                            ],
                          },
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="exp" className="block">
                        Kinh nghiệm
                      </label>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        className="w-full border rounded-md p-2 outline-none"
                        required
                        value={recruitmentStore.recruitmentForm.experience}
                        onChange={handleChangeFields}
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="quantity" className="block">
                        Số người cần tuyển
                      </label>
                      <input
                        type="text"
                        id="quality"
                        name="quality"
                        className="w-full border rounded-md p-2 outline-none"
                        placeholder="Ex: 5 - 10"
                        value={recruitmentStore.recruitmentForm.quality}
                        onChange={handleChangeFields}
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
                        value={recruitmentStore.recruitmentForm.address}
                        onChange={handleChangeFields}
                        className="w-full border rounded-md p-2 outline-none"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="deadline" className="block">
                        Hạn ứng tuyển
                      </label>
                      <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={recruitmentStore.recruitmentForm.deadline}
                        onChange={handleChangeFields}
                        className="w-full border rounded-md p-2 outline-none"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="salary" className="block">
                        Lương (USD)
                      </label>
                      <input
                        type="number"
                        id="salary"
                        name="salary"
                        className="w-full border rounded-md p-2 outline-none"
                        required
                        placeholder="Ex: 1000"
                        value={recruitmentStore.recruitmentForm.salary}
                        onChange={handleChangeFields}
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="type" className="block">
                        Loại công việc
                      </label>
                      <select
                        name="type"
                        id="type"
                        className="w-full border rounded-md p-2 outline-none"
                        required
                        value={recruitmentStore.recruitmentForm.type}
                        onChange={handleChangeFields}
                      >
                        <option value="">Chọn loại công việc</option>
                        <option value="Fulltime">Fulltime</option>
                        <option value="Partime">Partime</option>
                        <option value="Freelancer">Freelancer</option>
                      </select>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="type" className="block">
                        Danh mục công việc
                      </label>
                      <select
                        name="categoryId"
                        id="categoryId"
                        className="w-full border rounded-md p-2 outline-none"
                        required
                        value={recruitmentStore.recruitmentForm.categoryId}
                        onChange={handleChangeFields}
                      >
                        <option value="">Chọn danh mục công việc</option>
                        <option value={1}>NodeJS</option>
                        <option value={2}>NestJS</option>
                        <option value={3}>ReactJS</option>
                        <option value={4}>React Native</option>
                        <option value={5}>Angular</option>
                        <option value={6}>Vue</option>
                        <option value={7}>PHP</option>
                        <option value={8}>Java</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="mr-4 px-4 py-2 drop-shadow-lg bg-gray-400 text-white rounded-md cursor-pointer mt-8 text-center w-28"
                      onClick={() => {
                        recruitmentStore.resetForm();
                      }}
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 drop-shadow-lg bg-cyan-400 text-white rounded-md cursor-pointer mt-8 text-center w-28"
                    >
                      {recruitmentStore.typeOfForm?.toUpperCase()}
                    </button>
                  </div>
                </form>
              )}
          </div>
        </div>

        <div className="mt-8 max-w-[768px] mx-auto">
          <ul className="min-h-[620px]">
            {recruitmentStore.recruitmentList.map((recruit) => (
              <>
                <li key={recruit.id} className="mt-4">
                  <div className="block p-4 bg-white rounded-sm drop-shadow-md">
                    <div className="uppercase text-xs font-semibold text-cyan-400">
                      {recruit.type}
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold">
                          {recruit.title}
                        </h2>
                        <div className="uppercase text-xs font-semibold text-gray-400 flex mt-2">
                          <div className="flex items-center">
                            <RiProjectorFill />
                            <div className="ml-1">
                              {companyStore.companyForm.nameCompany}
                            </div>
                          </div>
                          <div className="ml-3 flex items-center">
                            <CiLocationArrow1 />
                            <div className="ml-1">{recruit.address}</div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="bg-cyan-400 text-white rounded-sm p-2"
                        onClick={() => {
                          recruitmentStore.setTypeOfForm("detail");

                          recruitmentStore.setRecruitmentForm({ ...recruit });
                        }}
                      >
                        Xem Chi Tiết
                      </button>
                      <button
                        type="button"
                        className="bg-yellow-400 text-white rounded-sm p-2 ml-2"
                        onClick={() => {
                          recruitmentStore.setTypeOfForm("update");

                          recruitmentStore.setRecruitmentForm({ ...recruit });
                        }}
                      >
                        Cập Nhật
                      </button>
                      <button
                        type="button"
                        className="bg-green-400 text-white rounded-sm p-2 ml-2"
                        onClick={() => handleOpenApplyByReId(recruit.id || 0)}
                      >
                        Xem ứng viên đã ứng tuyển
                      </button>
                      <button
                        type="button"
                        className="bg-red-400 text-white rounded-sm p-2 ml-2"
                        onClick={() => {
                          recruitmentStore.setRecruitmentForm({ ...recruit });
                          recruitmentStore.setTypeOfForm("delete");
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </li>
                {openAppliesByReMap?.get(recruit.id || 0) && (
                  <ul className="mt-3 ml-6 mb-12">
                    {applyRecruitmentStore.mapApplyRecruitment?.get(
                      recruit.id || 0
                    )?.length !== 0 ? (
                      applyRecruitmentStore.mapApplyRecruitment
                        ?.get(recruit.id || 0)
                        ?.map((child, index) => (
                          <ApplyItem key={index} applyForm={child} />
                        ))
                    ) : (
                      <li>No applications found for this recruitment</li>
                    )}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
});
