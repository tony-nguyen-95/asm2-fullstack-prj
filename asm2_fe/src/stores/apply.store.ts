import { makeAutoObservable } from "mobx";
import { API, API_ENDPOINT } from "../apis";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { userStore } from "./users.store";

export interface IApplyRecruitmentForm {
  nameCv: string;
  text: string;
  recruitmentId: number;
  userId: number;
  status?: string;
  id?: number;
  title?: string;
  type?: string;
}

class ApplyRecruitmentStore {
  applyForm: IApplyRecruitmentForm = {
    nameCv: "",
    text: "",
    recruitmentId: 0,
    userId: 0,
  };
  isOpenModal: boolean = false;
  resMess: string | undefined = undefined;
  mapApplyRecruitment: Map<number, IApplyRecruitmentForm[]> = new Map();
  isUpdateCV = false;
  appliesByUser: IApplyRecruitmentForm[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setOpenModal(isOpen: boolean = true) {
    this.isOpenModal = isOpen;
  }

  resetForm() {
    this.applyForm = {
      nameCv: "",
      text: "",
      recruitmentId: 0,
      userId: 0,
    };
    this.isOpenModal = false;
  }

  updateField<K extends keyof IApplyRecruitmentForm>(
    field: K,
    value: IApplyRecruitmentForm[K]
  ) {
    this.applyForm[field] = value;
  }

  async openCVByUserId(userId: number) {
    try {
      const { data } = await API.get(`/resume/${userId}`);

      if (data && data.length > 0) {
        const fileUrl = data[0].fileName;

        window.open(API_ENDPOINT.replace("api", fileUrl), "_blank");
      }
    } catch (error) {
      console.log("Error fetching resume: ", error);
    }
  }

  async submitApply() {
    try {
      const { data } = await API.post(
        "/apply-recruitment/apply",
        this.applyForm
      );

      if (data) {
        this.resMess = data as string;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getApplyByRecruitmentId(reId: number) {
    try {
      const { data } = await API.get(`/apply-recruitment/recruitment/${reId}`);

      if (data) {
        this.mapApplyRecruitment.set(reId, data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async approveApplyById(appId: number, reId: number) {
    try {
      const { data } = await API.put(`/apply-recruitment/approve/${appId}`);

      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Approved successfully!</p>",
          timer: 800,
          icon: "success",
        });

        this.getApplyByRecruitmentId(reId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  setIsUpdateCV(value: boolean) {
    this.isUpdateCV = value;
  }

  async updateCVByFilename(newFile: File) {
    try {
      const formData = new FormData();

      formData.append("cv", newFile);
      const { data } = await API.put(
        `/resume/updateCV/${userStore.fileNameCV}`
      );

      if (data) {
        userStore.setFilenameCV(data.fileName);
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Updated successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }
    } catch {}
  }

  async getAppliesByUserId(userId: number) {
    try {
      const { data } = await API.get(`/apply-recruitment/user/${userId}`);

      if (data) {
        this.appliesByUser = data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const applyRecruitmentStore = new ApplyRecruitmentStore();
