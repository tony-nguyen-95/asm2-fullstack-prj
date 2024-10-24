import React, { useEffect } from "react";
import { ApplyRecruitmentModal, Footer, Header } from "../../views";
import { observer } from "mobx-react";
import authStore from "../../stores/authen.store";
import { applyRecruitmentStore } from "../../stores";

export const Apply: React.FC = observer(() => {
  useEffect(() => {
    if (authStore.isLogin && applyRecruitmentStore.appliesByUser.length === 0) {
      applyRecruitmentStore.getAppliesByUserId(authStore.userLogined?.id || 0);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-200 py-20">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold text-center text-white">
              Các công việc đã ứng tuyển
            </h1>
          </div>
        </div>
        <div className="mt-20 lg:mt-0" id="top-company mx-auto">
          <div className="mt-8 flex flex-col items-center justify-center w-8/12 mx-auto gap-3">
            {applyRecruitmentStore.appliesByUser.map((al) => (
              <div className="py-4 px-8 bg-gray-200 rounded-md hover:bg-gray-400 shadow flex justify-between w-full">
                <h3 className="text-gray-700 font-semibold text-2xl">
                  {al.title}
                </h3>
                <ul className="flex flex-wrap gap-6 items-center justify-center">
                  <li className="text-cyan-500">Type: {al.type}</li>
                  <li className="text-cyan-500">Status: {al.status}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <ApplyRecruitmentModal />
      </main>
      <Footer />
    </>
  );
});
