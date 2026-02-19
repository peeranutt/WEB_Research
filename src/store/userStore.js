import { defineStore } from "pinia";
import api from "@/setting/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isFetched: false,
    isLoading: false,
    loggedIn: localStorage.getItem("loggedIn") === "true",
  }),

  getters: {
    userRole: (state) => state.user?.user_role || null,
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async fetchUser(force = false) {
      // ถ้าโหลดอยู่ ไม่ต้องซ้ำ
      if (this.isLoading) {
        return this.user;
      }

      // ถ้าเคยโหลดแล้ว และไม่บังคับ refresh
      if (this.isFetched && this.user && !force) {
        return this.user;
      }

      this.isLoading = true;

      try {
        const { data } = await api.get("/me", {
          withCredentials: true,
        });

        this.user = data.user;
        this.loggedIn = true;
        localStorage.setItem("loggedIn", "true");

        this.isFetched = true;
        return this.user;
      } catch (error) {
        console.log("Userstore:", error.response?.data?.message);

        this.user = null;
        this.loggedIn = false;
        this.isFetched = false;
        localStorage.removeItem("loggedIn");

        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        await api.post("/logout");
      } catch (error) {
        console.log("logout error:", error);
      } finally {
        this.user = null;
        this.loggedIn = false;
        this.isFetched = false;
        localStorage.removeItem("loggedIn");
      }
    },
  },
});
