<template>
  <div
    class="fixed inset-0 overflow-hidden bg-cover bg-center flex justify-center items-center"
    style="background-image: url(&quot;/rass/images/background.png&quot;)"
  >
    <div class="text-center bg-white w-1/4 rounded-md drop-shadow-lg p-5">
      <p class="text-2xl leading-relaxed">
        RESEARCH ADMINISTRATION howto deploy
      </p>
      <p class="text-xl leading-relaxed">ระบบสนับสนุนงานบริหารงานวิจัย</p>
      <div class="flex justify-center p-6">
        <hr class="w-5/6" />
      </div>
      <div class="flex justify-center">
        <TextInputLabelLeft
          label="อีเมล"
          customLabel="w-[20%]"
          customInput="max-w-[100%]"
          customDiv="flex justify-center items-center max-w-[80%]"
          v-model="email"
          type="email"
          required
          placeholder="กรุณากรอกอีเมล"
        />
      </div>
      <button class="btn w-[80%] bg-blue-500 text-white mt-3" @click="login">
        เข้าสู่ระบบ
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import api from "@/setting/api";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const isLoading = ref(false);

const redirectByRole = (user) => {

  console.log(user)

  if (!user) return;

  if (user.user_role === "professor") {
    router.replace("/homepage/professor");
  } else if (user.user_role === "admin") {
    router.replace("/homepage/admin");
  } else {
    router.replace("/homepage/officer");
  }
};

const login = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    await api.post(
      "/testlogin",
      { email: email.value },
      { withCredentials: true },
    );

    const user = await userStore.fetchUser();

    redirectByRole(user);
  } catch (error) {
    alert("เข้าสู่ระบบล้มเหลว กรุณาลองใหม่อีกครั้ง");
    console.error("Login error:", error);
    // alert(error.response.data.message);
  } finally {
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
