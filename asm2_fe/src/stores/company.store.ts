import { makeAutoObservable } from "mobx";
import { API } from "../apis";
import { userStore } from "./users.store";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export interface ICompany {
  id?: number;
  email?: string;
  description?: string;
  address?: string;
  logo?: string;
  nameCompany?: string;
  phoneNumber?: string;
  userId?: number;
  reCount?: number;
}

class CompanyStore {
  companyForm: ICompany = {
    email: "",
    description: "",
    address: "",
    logo: "",
    nameCompany: "",
    phoneNumber: "",
  };
  hasCompany = false;
  companyAll: ICompany[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateField<K extends keyof ICompany>(field: K, value: ICompany[K]) {
    this.companyForm[field] = value;
  }

  setUserForm(companyForm: ICompany) {
    this.companyForm = companyForm;
  }

  async getCompanyByUserId(userId: number) {
    const { data } = await API.get(`/companies?userId=${userId}`);

    if (data) {
      this.companyForm = data;
      this.hasCompany = true;
    }
  }

  async getAllCompany() {
    try {
      const { data } = await API.get("/companies");

      if (data) {
        this.companyAll = data;
      }
    } catch {}
  }

  async addCompany() {
    try {
      const { data } = await API.post("/companies", {
        ...this.companyForm,
        userId: userStore.userForm.id,
      });

      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Added successfully!</p>",
          timer: 800,
          icon: "success",
        });

        this.getCompanyByUserId(userStore.userForm.id || 0);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateCompany() {
    try {
      const { data } = await API.put(`/companies`, this.companyForm);
      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Updated successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const companyStore = new CompanyStore();
