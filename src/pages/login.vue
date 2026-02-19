<template>
  <div
    class="fixed inset-0 overflow-hidden bg-cover bg-center flex justify-center items-center"
    style="background-image: url(&quot;/rass/images/background.png&quot;)"
  >
    <div class="text-center bg-white w-1/4 rounded-md drop-shadow-lg p-5">
      <p class="text-2xl leading-relaxed">RESEARCH ADMINISTRATION</p>
      <p class="text-xl leading-relaxed pb-5">ระบบสนับสนุนงานบริหารงานวิจัย</p>
      <div class="flex justify-center">
        <hr class="w-5/6" />
      </div>
      <p class="text-lg leading-relaxed pt-5 pb-3">
        ยืนยันตัวตนด้วยบริการของ Google
      </p>
      <button class="btn w-full lg:w-[80%] border-[#e5e5e5]" @click="login">
        <img :src="GoogleLogo" class="w-8" alt="Google Logo" />
        <p>Login With Google</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import GoogleLogo from "../assets/google.svg";
import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(false);

const redirectByRole = (user) => {
  if (!user) return;

  if (user.user_role === "professor") {
    router.replace("/homePage");
  } else if (user.user_role === "admin") {
    router.replace("/admin");
  } else {
    router.replace("/Officer");
  }
};

const login = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    const googleAuth = window.google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      scope: "openid profile email",
      ux_mode: "popup",
      callback: async (response) => {
        if (!response.code) {
          isLoading.value = false;
          return;
        }

        try {
          //Auth with backend
          await api.post(
            "/auth",
            {},
            {
              headers: {
                Authorization: response.code,
              },
            },
          );

          await userStore.fetchUser(); //load user data before login

          redirectByRole(userStore.user);
        } catch (error) {
          alert(error.response?.data?.message || "เข้าสู่ระบบล่มเหลว");
        } finally {
          isLoading.value = false;
        }
      },
    });

    googleAuth.requestCode();
  } catch (error) {
    console.log("Login failed:", error);
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (!userStore.user) {
    await userStore.fetchUser();
  }

  if (userStore.user) {
    redirectByRole(userStore.user);
  }
});
</script>
