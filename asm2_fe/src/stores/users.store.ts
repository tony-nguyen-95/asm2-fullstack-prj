import { makeAutoObservable } from "mobx";
import { API } from "../apis";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import authStore from "./authen.store";

export interface IUser {
  id?: number;
  email?: string;
  fullname?: string;
  address?: string;
  phoneNumber?: string;
  description?: string;
  avatar?: string;
  roleId?: number; // 1 employee, 2 employeer
  cvFile?: File; // Optional for roleId === 1
  status?: number | "VERIFIED"; // check email for number
}

class UserStore {
  userForm: IUser = {
    email: "",
    fullname: "",
    address: "",
    phoneNumber: "",
    description: "",
    avatar: "",
  };
  fileNameCV: string | undefined = undefined;
  error: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setFilenameCV(fn: string) {
    this.fileNameCV = fn;
  }

  setUserForm(userForm: IUser) {
    this.userForm = userForm;
  }

  updateField<K extends keyof IUser>(field: K, value: IUser[K]) {
    this.userForm[field] = value;
  }

  async submitUser() {
    try {
      Object.keys(this.userForm).forEach((key) => {
        if (!this.userForm[key as keyof IUser]) {
          this.userForm[key as keyof IUser] = "" as any;
        }
      });

      const { data } = await API.put("/users", this.userForm);

      if (data) {
        this.setUserForm(data);

        sessionStorage.setItem("userLogined", JSON.stringify(data));

        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Update successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCVByUserId() {
    try {
      const id = this.userForm.id || authStore.userLogined?.id;
      const { data } = await API.get(`/resume/${id}`);

      if (data) {
        this.fileNameCV = data[0].fileName;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async uploadCV(file: File) {
    try {
      const formData = new FormData();
      formData.append("cv", file);

      const { data } = await API.post(
        `/resume/upload?userId=${
          this.userForm.id || authStore.userLogined?.id
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data) {
        this.fileNameCV = data.fileName;

        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Uploaded successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const userStore = new UserStore();
