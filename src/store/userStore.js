import { defineStore } from "pinia";
import api from "@/setting/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, //เก็บข้อมูล user
    loggedIn: localStorage.getItem("loggedIn") === "true",
  }),

  getters: {
    // isAuthenticated: (state) => state.user !== null, // เช็คว่ามี user หรือไม่
    userRole: (state) => state.user?.user_role || null, // ดึง role ของ user
  },

  actions: {
    async fetchUser() {
      try {
        const response = await api.get("/me", {
          withCredentials: true,
        });

        this.user = response.data.user;
      } catch (error) {
        console.log("Userstore", error.response.data.message)
        alert(error.response?.data?.message || "เกิดข้อผิดพลาด");

        this.user = null;
        localStorage.removeItem("loggedIn");
      }
    },

    async logout() {
      try {
        await api.post("/logout");
        this.user = null;
        localStorage.removeItem("loggedIn");
      } catch (error) {
        alert(error.response?.data?.message || "เกิดข้อผิดพลาด");
        console.log("logout error:", error);
      }
    },
  },
});
