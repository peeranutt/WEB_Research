import { defineStore } from "pinia";
import api from "@/setting/api";

const log = (...args) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isFetched: false,
    isLoading: false,
    loggedIn: false,
    _fetchPromise: null //concurrent fetch lock
  }),

  getters: {
    userRole: (state) => state.user?.user_role || null,
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async fetchUser(force = false) {
      // return cache user if already fetched and not forcing refresh
      if (this.isFetched && this.user && !force) {
        return this.user;
      }

      //if a fetch is already in-flight, reuse that same promise (prevents race conditions)
      if (this._fetchPromise) {
        return this._fetchPromise;
      }

      this._fetchPromise = this._doFetch().finally(() => {
        this._fetchPromise = null;
      })

      return this._fetchPromise;

      // // ถ้าโหลดอยู่ ไม่ต้องซ้ำ
      // if (this.isLoading) {
      //   return this.user;
      // }

      // // ถ้าเคยโหลดแล้ว และไม่บังคับ refresh
      // if (this.isFetched && this.user && !force) {
      //   return this.user;
      // }

      // this.isLoading = true;

      // try {
      //   const { data } = await api.get("/me", {
      //     withCredentials: true,
      //   });

      //   this.user = data.user;
      //   this.loggedIn = true;
      //   localStorage.setItem("loggedIn", "true");

      //   this.isFetched = true;
      //   return this.user;
      // } catch (error) {
      //   console.log("Userstore:", error.response?.data?.message);

      //   this.user = null;
      //   this.loggedIn = false;
      //   this.isFetched = false;
      //   localStorage.removeItem("loggedIn");

      //   return null;
      // } finally {
      //   this.isLoading = false;
      // }
    },

    async _doFetch() {
      this.isLoading = true;

      try {
        const { data } = await api.get("/me", {
          withCredentials: true
        });

        this.user = data.user;
        this.loggedIn = true;
        this.isFetched = true;

        return this.user;
      } catch (error) {
        const status = error.response?.status;

        //if unauthorized or forbidden, clear session (probably expired)
        if (status === 401) {
          log("UserStore: not logged in");
          this._clearSession();
        } else if (status === 403) {
          log("UserStore: access forbidden");
          this._clearSession();
        } else {
          //network error or server error - don't log the user out
          log("UserStore: fetch failed (non-auth error)", error.message);
        }

        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        await api.post("/logout");
      } catch (error) {
        log("UserStore: logout error:", error.message);
      } finally {
        this._clearSession();
      }
    },

    //centralized session clearing logic
    _clearSession() {
      this.user = null;
      this.loggedIn = false;
      this.isFetched = false;
    }
  },
});
