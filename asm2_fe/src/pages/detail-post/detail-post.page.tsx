import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApplyRecruitmentModal, Footer, Header } from "../../views";
import logo from "../../assets/images/FPT_Software_Logo.png";
import {
  applyRecruitmentStore,
  IRecruitment,
  recruitmentStore,
  userStore,
} from "../../stores";
import { observer } from "mobx-react";
import { IoFileTrayStacked } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import authStore from "../../stores/authen.store";

export enum ECategory {
  NodeJS = 1,
  NestJS,
  ReactJS,
  ReactNative,
  Angular,
  Vue,
  PHP,
  Java,
}

export const DetailPost: React.FC = observer(() => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const foundRecruitment: IRecruitment | undefined = useMemo(() => {
    if (id) {
      return recruitmentStore.recruitmentAll.find(
        (re) => re.id === parseInt(id)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, recruitmentStore.recruitmentAll]);

  const handleApply = () => {
    if (!authStore.isLogin) {
      return navigate("/login");
    }

    // Update some fields if signin-ed
    userStore.getCVByUserId(); // check cv uploaded yet
    applyRecruitmentStore.updateField(
      "nameCv",
      authStore.userLogined?.fullname || ""
    );

    applyRecruitmentStore.updateField("userId", authStore.userLogined?.id || 0);

    applyRecruitmentStore.updateField(
      "recruitmentId",
      foundRecruitment?.id || 0
    );

    // Open modal apply
    applyRecruitmentStore.setOpenModal();
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (recruitmentStore.recruitmentAll.length === 0) {
      recruitmentStore.getAllRecruitment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recruitmentStore.recruitmentAll.length]);

  return (
    <>
      <Header />
      <main>
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-200 py-20">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold text-center text-white">
              Chi Tiết Công Việc
            </h1>
          </div>
        </div>
        <div className="bg-gray-50 p-20">
          <div className="mx-auto">
            <div className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="size-20 object-cover object-center"
              />
              <div className="ml-2">
                <div className="uppercase text-xs font-semibold text-cyan-400">
                  {foundRecruitment?.type}
                </div>
                <h2 className="text-lg font-semibold">
                  {foundRecruitment?.title}
                </h2>
                <div className="uppercase text-xs font-semibold text-gray-400 flex mt-2">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-gray-400 font-semibold text-xs flex flex-wrap items-center">
                      <IoFileTrayStacked />
                      {ECategory[foundRecruitment?.categoryId || 0]}
                    </span>
                    <span className="text-gray-400 font-semibold text-xs flex flex-wrap items-center">
                      <MdOutlineWork />
                      {foundRecruitment?.companyName}
                    </span>
                    <span className="text-gray-400 font-semibold text-xs flex flex-wrap items-center">
                      <CiLocationArrow1 />

                      {foundRecruitment?.address}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="group ml-auto w-32 py-2 data-[saved=0]:bg-gray-200 data-[saved=1]:bg-pink-400 rounded-sm"
                data-saved={0}
              >
                <span className="ml-2 group-data-[saved=0]:text-gray-400 group-data-[saved=1]:text-white">
                  Lưu
                </span>
              </button>

              <button
                className="ml-2 w-32 py-2 text-white bg-cyan-400 rounded-sm"
                type="button"
                onClick={() => handleApply()}
              >
                Ứng Tuyển
              </button>
            </div>
          </div>
          <div className="container">
            <div className="grid grid-cols-3 mt-10">
              <div className="col-span-2">
                <div className="flex flex-col items-start gap-2">
                  <span className="text-cyan-400">Mô tả công việc</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: foundRecruitment?.description || "",
                    }}
                  />
                </div>
                <div id="job-desc" className="mt-4">
                  <strong>
                    {ECategory[foundRecruitment?.categoryId || 0]}{" "}
                    {foundRecruitment?.experience} exp
                  </strong>
                </div>
              </div>
              <div className="col-span-1">
                <div className="border bg-gray-100 p-4">
                  <div className="text-cyan-400 font-semibold">
                    Tóm tắt công việc
                  </div>
                  <div className="mt-4">
                    <strong>Ngày tạo: </strong>
                    <span>{foundRecruitment?.createdAt}</span>
                  </div>
                  <div className="mt-2">
                    <strong>Kiểu công việc: </strong>
                    <span>{foundRecruitment?.type}</span>
                  </div>
                  <div className="mt-2">
                    <strong>Loại công việc: </strong>
                    <span>{ECategory[foundRecruitment?.categoryId || 0]}</span>
                  </div>
                  <div className="mt-2">
                    <strong>Kinh nghiệm: </strong>
                    <span>{foundRecruitment?.experience}</span>
                  </div>
                  <div className="mt-2">
                    <strong>Địa chỉ: </strong>
                    <span>{foundRecruitment?.address}</span>
                  </div>
                  <div className="mt-2">
                    <strong>Lương: </strong>
                    <span>{foundRecruitment?.salary} USD</span>
                  </div>
                  <div className="mt-2">
                    <strong>Số lượng: </strong>
                    <span>{foundRecruitment?.quality}</span>
                  </div>
                  <div className="mt-2">
                    <strong>Hạn nộp CV: </strong>
                    <span>{foundRecruitment?.deadline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ApplyRecruitmentModal />
      </main>
      <Footer />
    </>
  );
});
