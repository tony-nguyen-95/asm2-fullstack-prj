import { makeAutoObservable } from "mobx";
import { API } from "../apis";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export interface IFollowCompany {
  id?: number;
  companyId?: number;
  userId?: number;
  companyName?: string;
}

class FollowStore {
  followCompaniesByUser: IFollowCompany[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getFollowedCompaniesByUserId(userId: number) {
    try {
      const { data } = await API.get(`/follow-company/user/${userId}`);

      if (data) {
        this.followCompaniesByUser = data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addFollowCompany(companyId: number, userId: number) {
    try {
      const { data } = await API.post(
        "/follow-company/add",
        {
          companyId,
          userId,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Follow successfully!</p>",
          timer: 800,
          icon: "success",
        });

        this.getFollowedCompaniesByUserId(userId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeFollow(flId: number, userId: number) {
    try {
      const { data } = await API.delete(`/follow-company/remove/${flId}`);

      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Delete successfully!</p>",
          timer: 800,
          icon: "success",
        });

        this.getFollowedCompaniesByUserId(userId);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const followStore = new FollowStore();
