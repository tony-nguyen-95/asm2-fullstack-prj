import React from "react";
import { applyRecruitmentStore, IApplyRecruitmentForm } from "../../stores";

interface ApplyItemProps {
  applyForm: IApplyRecruitmentForm;
}

export const ApplyItem: React.FC<ApplyItemProps> = ({ applyForm }) => {
  return (
    <li className="mt-4 rounded border p-4">
      <div className="flex items-center">
        <img
          src="assets/images/avatar-default.jpg"
          alt="avatar"
          className="size-12 object-cover object-center rounded-full"
        />
        <div className="flex-1 ml-8">
          <div className="text-lg">{applyForm.nameCv}</div>
          <div>{applyForm.text}</div>
        </div>
        <div className="flex flex-col lg:flex-row items-center text-sm ml-4 gap-2">
          <button
            onClick={() => {
              applyRecruitmentStore.openCVByUserId(applyForm.userId);
            }}
            className="text-white bg-cyan-400 py-2 rounded-sm w-20 text-center"
          >
            Xem CV
          </button>

          {applyForm.status === "PENDING" ? (
            <button
              onClick={() => {
                applyRecruitmentStore.approveApplyById(
                  applyForm.id || 0,
                  applyForm.recruitmentId
                );
              }}
              className="text-black border-cyan-400 py-2 border rounded-sm w-20 text-center"
            >
              Duyệt
            </button>
          ) : (
            <div className="text-lime-500 font-semibold">Đã duyệt</div>
          )}
        </div>
      </div>
    </li>
  );
};
