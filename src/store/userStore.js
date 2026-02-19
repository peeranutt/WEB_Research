import { defineStore } from "pinia";
import api from "@/setting/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    hasSignature: false,
    isFetched: false,
    isLoading: false,
    // loggedIn: localStorage.getItem("loggedIn") === "true",
  }),

  getters: {
    isAuthenticated: (state) => !!state.user, // check has user ?
    userRole: (state) => state.user?.user_role || null, //get role of user
  },

  actions: {
    async fetchUser() {
      if (this.isFetched && this.user) {
        return this.user;
      }

      if (this.isLoading) {
        return this.user;
      }

      this.isLoading = true;

      try {
        const { data } = await api.get("/me", {
          withCredentials: true,
        });

        this.user = data.user;
        this.hasSignature = Boolean(data.user?.user_signature);

        return this.user;
      } catch (error) {
        if (error.response?.status === 401) {
          this.user = null;
          this.hasSignature = false;
        } else {
          console.error("fetchUser error:", error);
        }
      } finally {
        this.isLoading = false;
        this.isFetched = true;
      }
    },

    clearUser() {
      this.user = null;
      this.hasSignature = false;
    },

    async logout() {
      try {
        await api.post("/logout");
        // this.user = null;
        // localStorage.removeItem("loggedIn");
      } catch (error) {
        // alert(error.response?.data?.message || "เกิดข้อผิดพลาด");
        console.log("logout error:", error);
      } finally {
        this.clearUser();
      }
    },
  },
});
