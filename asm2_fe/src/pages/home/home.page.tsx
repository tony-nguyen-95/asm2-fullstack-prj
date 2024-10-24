import React, { Fragment, useEffect, useMemo } from "react";
import "./home.css";
import { observer } from "mobx-react";
import { Footer, Header, SearchBar } from "../../views";
import {
  companyStore,
  followStore,
  ICompany,
  IRecruitment,
  recruitmentStore,
} from "../../stores";
import { RiProjectorFill } from "react-icons/ri";
import { CiLocationArrow1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import logo0 from "../../assets/images/company_logo_0.png";
import logo1 from "../../assets/images/company_logo_1.png";
import authStore from "../../stores/authen.store";

type Props = {};

export const Home: React.FC<Props> = observer(() => {
  const navigate = useNavigate();

  const displayCompanies: ICompany[] = useMemo(() => {
    return companyStore.companyAll
      .slice()
      .sort((a, b) => (b.reCount || 0) - (a.reCount || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyStore.companyAll]);

  const displayRecruitment: IRecruitment[] = useMemo(() => {
    return recruitmentStore.recruitmentAll
      .slice()
      .sort((a, b) => (b.appliesCount || 0) - (a.appliesCount || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recruitmentStore.recruitmentAll]);

  useEffect(() => {
    recruitmentStore.getAllRecruitment();
  }, []);

  useEffect(() => {
    companyStore.getAllCompany();
  }, []);

  useEffect(() => {
    if (authStore.isLogin) {
      followStore.getFollowedCompaniesByUserId(authStore.userLogined?.id || 0);
    }
  }, []);

  useEffect(() => {
    if (authStore.isLogin) {
      followStore.getFollowedCompaniesByUserId(authStore.userLogined?.id || 0);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="main h-[calc(100svh-3rem)] lg:h-[calc(100svh-4rem)] bg-cover bg-no-repeat bg-top">
          <div className="mx-auto text-center text-white size-full flex items-center justify-center">
            <div className="m-auto">
              <h1 className="text-5xl font-bold animate-fade-down">
                Tìm Việc Làm Nhanh Chóng,
                <br />
                Dễ Dàng Với <span className="text-cyan-400">Work CV</span>
              </h1>
              <SearchBar />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 py-20">
          <div className="mx-auto">
            <div className="flex flex-col items-center" id="top-category">
              <div className="text-center title">
                <small className="uppercase text-cyan-400 font-bold">
                  Danh mục công việc
                </small>
                <h2 className="text-2xl font-bold">Top Danh Mục</h2>
                <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
                  {recruitmentStore.topRecruitByCategory.map(
                    (category, index) => (
                      <div
                        key={index}
                        className="bg-white rounded shadow-md flex flex-col py-4 pl-6 pr-10 flex-wrap gap-3 items-start"
                      >
                        <h2>{category.category}</h2>
                        <h4 className="text-orange-400 text-sm">
                          <span className="bg-orange-200 text-orange-400 rounded p-1 text-xs font-semibold">
                            {category.quantity}
                          </span>{" "}
                          vị trí
                        </h4>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="h-px w-56 bg-cyan-600 mx-auto my-12" />
            <div className="flex flex-col lg:flex-row text-black justify-center items-center lg:items-start mt-20">
              <div className="lg:flex-1 max-w-[500px]" id="top-job">
                <div className="title">
                  <small className="uppercase text-cyan-400 font-bold">
                    công việc được nhiều người ứng tuyển
                  </small>
                  <h2 className="text-2xl font-bold">
                    Các bài đăng về việc làm nổi bật
                  </h2>
                </div>
                <div className="mt-8">
                  {displayRecruitment.map((recruit) => (
                    <li key={recruit.id} className="mt-4 list-none">
                      <div className="block p-3 bg-white rounded-sm drop-shadow-md">
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
                                  {recruit.companyName}
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
                              navigate(`/detail-post/${recruit.id}`);
                            }}
                          >
                            Xem Chi Tiết
                          </button>
                          <button
                            type="button"
                            className="bg-yellow-400 text-white rounded-sm p-2 ml-2"
                            onClick={() => {
                              recruitmentStore.setTypeOfForm("update");

                              recruitmentStore.setRecruitmentForm({
                                ...recruit,
                              });
                            }}
                          >
                            Apply
                          </button>
                        </div>
                        <div className="text-xs text-gray-300">
                          Đã có {recruit.appliesCount} đơn nộp cho vị trí này
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
              <div className="mt-20 lg:ml-20 lg:mt-0" id="top-company">
                <h2 className="text-xl font-bold text-center title">
                  Công ty nổi bật
                </h2>
                <div className="mt-8 flex flex-col items-center">
                  {displayCompanies.map((com, index) => (
                    <Fragment key={com.id}>
                      <img
                        src={index % 2 ? logo0 : logo1}
                        alt="Logo.png"
                        className="w-44 h-auto my-4"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{com.nameCompany}</h3>
                        <div className="text-sm flex flex-wrap gap-1.5 items-center">
                          <span className="bg-yellow-400 px-1 py-px rounded-sm">
                            {com.reCount}
                          </span>
                          <span>Vị trí ứng tuyển</span>

                          {followStore.followCompaniesByUser
                            .map((fl) => fl.companyId)
                            .includes(com.id) ? (
                            <h4 className="text-green-300">Followed</h4>
                          ) : (
                            <button
                              onClick={() => {
                                if (!authStore.isLogin) {
                                  return navigate("/login");
                                }

                                followStore.addFollowCompany(
                                  com.id || 0,
                                  authStore.userLogined?.id || 0
                                );
                              }}
                              className="ml-2 rounded bg-cyan-300 px-2 py-1 text-white"
                            >
                              Follow
                            </button>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
});
