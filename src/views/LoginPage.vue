<template>
  <div class="fixed inset-0 overflow-hidden bg-cover bg-center flex justify-center items-center"
    style="background-image: url('/rass/images/background.png')">
    <div class="text-center bg-white w-1/4 rounded-md drop-shadow-lg p-5">
      <p class="text-2xl leading-relaxed">RESEARCH ADMINISTRATION</p>
      <p class="text-xl leading-relaxed pb-5">ระบบสนับสนุนงานบริหารงานวิจัย</p>
      <div class="flex justify-center">
        <hr class="w-5/6" />
      </div>
      <p class="text-lg leading-relaxed pt-5 pb-3">
        ยืนยันตัวตนด้วยบริการของ Google
      </p>
      <button class="btn w-[80%] border-[#e5e5e5]" @click="login">
        <img :src="GoogleLogo" class="w-10" alt="Google Logo" />Login With
        Google
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import GoogleLogo from "../assets/google.svg";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

const userStore = useUserStore();
const router = useRouter();

const login = async () => {
  try {
    const googleAuth = window.google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      scope: "openid profile email",
      ux_mode: "popup",
      callback: async (response) => {
        if (response.code) {
          try {
            //backend api
            const res = await api.post(
              "/auth",
              {},
              {
                headers: {
                  Authorization: response.code,
                },
              }
            );

            localStorage.setItem("loggedIn", "true");
            userStore.loggedIn = true;

            await userStore.fetchUser(); //load user data before login

            const currentUser = userStore.user;
            if (currentUser?.user_role === "professor") {
              router.push("/homePage");
            } else if (currentUser?.user_role === "admin") {
              router.push("/admin");
            } else {
              router.push("/Officer");
            }
          } catch (error) {
            alert(error.response.data.message);
          }
        }
      },
    });

    googleAuth.requestCode();
  } catch (error) {
    console.log("Login failed:", error);
  }
};

onMounted(async () => {
  onMounted(async () => {
    if (!userStore.loggedIn) {
      await userStore.fetchUser();
    }
  });
});
</script>
