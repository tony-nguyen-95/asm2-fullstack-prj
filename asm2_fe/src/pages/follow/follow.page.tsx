import React, { useEffect } from "react";
import { ApplyRecruitmentModal, Footer, Header } from "../../views";
import { observer } from "mobx-react";
import authStore from "../../stores/authen.store";
import { followStore } from "../../stores";

export const Follow: React.FC = observer(() => {
  useEffect(() => {
    if (authStore.isLogin && followStore.followCompaniesByUser.length === 0) {
      followStore.getFollowedCompaniesByUserId(authStore.userLogined?.id || 0);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-200 py-20">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold text-center text-white">
              Các công ty đã theo dõi
            </h1>
          </div>
        </div>
        <div className="mt-20 lg:mt-0" id="top-company mx-auto">
          <div className="mt-8 flex flex-col items-center justify-center w-8/12 mx-auto gap-3">
            {followStore.followCompaniesByUser.map((fl) => (
              <div className="py-4 px-8 bg-gray-300 rounded-md hover:bg-gray-400 shadow flex justify-between w-full">
                <h3 className="text-gray-700 font-semibold text-2xl">
                  {fl.companyName}
                </h3>
                <button
                  className="rounded bg-red-400 text-white py-2 px-4"
                  onClick={() => {
                    followStore.removeFollow(
                      fl.id || 0,
                      authStore.userLogined?.id || 0
                    );
                  }}
                >
                  Unfollow
                </button>
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
