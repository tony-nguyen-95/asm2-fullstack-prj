import { computed, makeAutoObservable } from "mobx";
import { API } from "../apis";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { companyStore } from "./company.store";
import { ECategory } from "../pages";

export interface IRecruitment {
  id?: number;
  address?: string;
  description?: string;
  experience?: string;
  quality?: string;
  salary?: number;
  title?: string;
  deadline?: string;
  type?: string;
  companyId?: number;
  categoryId?: number;
  companyName?: string;
  createdAt?: string;
  appliesCount?: number;
}

class RecruitmentStore {
  recruitmentForm: IRecruitment = {
    address: "",
    description: "",
    experience: "",
    quality: "",
    title: "",
    deadline: "",
    type: "",
  };
  recruitmentList: IRecruitment[] = [];
  typeOfForm: "add" | "update" | "delete" | "detail" | undefined = undefined;
  recruitmentAll: IRecruitment[] = [];

  constructor() {
    makeAutoObservable(this, {
      topRecruitByCategory: computed,
    });
  }

  updateField<K extends keyof IRecruitment>(field: K, value: IRecruitment[K]) {
    this.recruitmentForm[field] = value;
  }

  setRecruitmentForm(recruitmentForm: IRecruitment) {
    this.recruitmentForm = recruitmentForm;
  }

  setTypeOfForm(typeOfForm: typeof this.typeOfForm) {
    this.typeOfForm = typeOfForm;
  }

  resetForm() {
    this.recruitmentForm = {
      address: "",
      description: "",
      experience: "",
      quality: "",
      title: "",
      deadline: "",
      type: "",
    };
    this.typeOfForm = undefined;
  }

  async getRecruitmentByCompanyId(companyId: number) {
    const { data } = await API.get(`/recruitments?companyId=${companyId}`);

    if (data) {
      this.recruitmentList = data;
    }
  }

  async getAllRecruitment() {
    const { data } = await API.get("/recruitments");

    if (data) {
      this.recruitmentAll = data;
    }
  }

  async addRecruitment() {
    try {
      const { data } = await API.post("/recruitments", {
        ...this.recruitmentForm,
        companyId: companyStore.companyForm.id,
      });

      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Added successfully!</p>",
          timer: 800,
          icon: "success",
        });

        if (this.recruitmentForm.companyId) {
          this.getRecruitmentByCompanyId(this.recruitmentForm.companyId);
          this.resetForm();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateRecruitment() {
    try {
      const { data } = await API.put(`/recruitments`, this.recruitmentForm);
      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Updated successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.getRecruitmentByCompanyId(companyStore.companyForm.id || 0);
      this.resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRecruitment() {
    try {
      const { data } = await API.delete(
        `/recruitments?id=${this.recruitmentForm.id}`
      );

      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Delete successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.getRecruitmentByCompanyId(companyStore.companyForm.id || 0);
      this.resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  get topRecruitByCategory() {
    const result: {
      category: string;
      categoryId: number;
      quantity: number;
    }[] = [];

    Object.entries(ECategory)
      .filter(([key, value]) => typeof value === "number")
      .forEach(([key, value]) => {
        result.push({
          category: key,
          categoryId: value as number,
          quantity: 0,
        });
      });

    this.recruitmentAll.forEach((recruitment) => {
      result.forEach((element) => {
        if (element.categoryId === recruitment.categoryId) {
          element.quantity++;
        }
      });
    });

    return result.sort((a, b) => b.quantity - a.quantity);
  }
}

export const recruitmentStore = new RecruitmentStore();
