<template>
  <div class="fixed inset-0 overflow-hidden bg-cover bg-center flex justify-center items-center"
    style="background-image: url('/rass/images/background.png')">
    <div class="text-center bg-white w-1/4 rounded-md drop-shadow-lg p-5">
      <p class="text-2xl leading-relaxed">RESEARCH ADMINISTRATION   howto deploy</p>
      <p class="text-xl leading-relaxed">ระบบสนับสนุนงานบริหารงานวิจัย</p>
      <div class="flex justify-center p-6">
        <hr class="w-5/6" />
      </div>
      <div class="flex justify-center">
        <TextInputLabelLeft label="อีเมล" customLabel="w-[20%]" customInput="max-w-[100%]"
          customDiv="flex justify-center items-center max-w-[80%]" v-model="email" type="email" required
          placeholder="กรุณากรอกอีเมล" />
      </div>
      <button class="btn w-[80%] bg-blue-500 text-white mt-3" @click="login">
        เข้าสู่ระบบ
      </button>
    </div>
  </div>
</template>

<script setup>
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import api from "@/setting/api";
import { useUserStore } from "@/store/userStore";

import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const email = ref("");

const login = async () => {
  console.log("Logging in with email:", email.value);

  try {
    console.log("Attempting to log in with email:", email.value);

    const response = await api.post("/testlogin", {
      email: email.value,
    });

    if (response.status === 200) {
      localStorage.setItem("loggedIn", "true");
      userStore.loggedIn = true;

      await userStore.fetchUser(); // โหลด user info

      const currentUser = userStore.user;

      if (currentUser.user_role === "professor") {
        router.push("/homePage");
      } else if (currentUser.user_role === "admin") {
        router.push("/admin");
      } else {
        router.push("/Officer");
      }
    }
  } catch (error) {
    alert("เข้าสู่ระบบล้มเหลว กรุณาลองใหม่อีกครั้ง");
    console.error("Login error:", error);
    // alert(error.response.data.message);
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
