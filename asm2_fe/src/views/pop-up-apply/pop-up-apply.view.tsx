import { observer } from "mobx-react";
import React, { ChangeEvent, FormEvent } from "react";
import {
  applyRecruitmentStore,
  IApplyRecruitmentForm,
  userStore,
} from "../../stores";

interface ApplyRecruitmentModalProps {}

export const ApplyRecruitmentModal: React.FC<ApplyRecruitmentModalProps> =
  observer(() => {
    const { applyForm, isOpenModal } = applyRecruitmentStore;

    const handleChangeUpdateCV = (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      const target = JSON.parse(value);

      return applyRecruitmentStore.setIsUpdateCV(target);
    };

    const handleUploadNewCV = (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];

      applyRecruitmentStore.updateCVByFilename(file);
    };

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      applyRecruitmentStore.updateField(
        name as keyof IApplyRecruitmentForm,
        value
      );
    };

    const handleFileChange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        userStore.uploadCV(file);
      }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      applyRecruitmentStore.submitApply();
    };

    if (!isOpenModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Apply for Recruitment</h2>
          {!userStore.fileNameCV ? (
            <>
              <h3 className="text-sm text-red-400">
                Bạn chưa có CV, hãy upload CV trước!
              </h3>
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
            </>
          ) : (
            <div className="my-3">
              <select
                value={`${applyRecruitmentStore.isUpdateCV}`}
                className="text-sm text-gray-700 p-2 border rounded"
                onChange={handleChangeUpdateCV}
              >
                <option value={"false"}>Dùng CV đã upload</option>
                <option value={"true"}>Dùng CV khác - Upload lại</option>
              </select>
              {applyRecruitmentStore.isUpdateCV && (
                <input
                  name="updateCV"
                  type="file"
                  onChange={handleUploadNewCV}
                  className="bg-cyan-400 text-white mt-2 mb-5 border rounded"
                  placeholder="Update CV khác"
                />
              )}
            </div>
          )}
          {applyRecruitmentStore.resMess ? (
            <div>
              <h3 className="text-green-400 text-base">
                {applyRecruitmentStore.resMess}
              </h3>
              <button
                type="button"
                onClick={(e: any) => {
                  e.preventDefault();
                  applyRecruitmentStore.setOpenModal(false);
                }}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name CV
                </label>
                <input
                  type="text"
                  name="nameCv"
                  value={applyForm.nameCv}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter CV file name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Text
                </label>
                <textarea
                  name="text"
                  value={applyForm.text}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter application text"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={(e: any) => {
                    e.preventDefault();
                    applyRecruitmentStore.setOpenModal(false);
                  }}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 text-white py-2 px-4 rounded-md disabled:opacity-50"
                  disabled={!userStore.fileNameCV}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  });
