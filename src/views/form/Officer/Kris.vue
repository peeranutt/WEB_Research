<template>
  <div>
    <div class="container my-10 mx-auto">
      <Kris :id="id" />
      <Mainbox>
        <p class="text-lg font-bold">เอกสารหลักฐานที่แนบ</p>
        <div class="flex flex-rowitems-center">
          <p>แบบเสนอโครงการวิจัย (Research Project)</p>
          <div class="ml-80">
            <button @click="getFile" class="btn bg-[#E85F19] text-white mr-5">
              ดูเอกสาร
            </button>
          </div>
        </div>
      </Mainbox>

      <p class="text-xl font-bold pb-5">ตรวจสอบข้อมูลและหลักฐาน</p>
      <Mainbox>
        <p class="text-lg">ตรวจสอบ และรับทราบเอกสาร</p>

        <SectionWrapper>
          <RadioInput label="ข้อมูลถูกต้อง" name="noted" value="acknowledge" v-model="formData.radioAuthOffic"
            @change="handleInput('radioAuthOffic', $event.target.value)" />
          <RadioInput label="ข้อมูลไม่ถูกต้อง" name="noted" value="notAcknowledge" v-model="formData.radioAuthOffic"
            @change="handleInput('radioAuthOffic', $event.target.value)" />

          <span v-if="v$.radioAuthOffic.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.radioAuthOffic.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </Mainbox>
      <div class="flex justify-end">
        <button 
        @click="OfficerKris"
        :disabled="loading" 
        class="btn btn-success text-white rounded">
        {{ loading ? "กำลังบันทึก..." : "บันทึก" }}
      </button>
      </div>
    </div>
    <!-- Popup Loading -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl p-6 flex flex-col items-center gap-4 shadow-lg">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <p class="text-gray-700 font-medium">กำลังบันทึกข้อมูล...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import Kris from "@/components/form/DataforOffice/Kris.vue";

const loading = ref(false);

const formData = reactive({
  kris: [],
  user: [],
  file: [],
  name: "",
  radioAuthOffic: "",
  formStatus: "attendMeeting",
});

const handleInput = (key, value) => {
  formData[key] = value;
};

const route = useRoute();
const id = route.params.id;
console.log("id", id);

const userStore = useUserStore();
const user = computed(() => userStore.user);

const getFile = async () => {
  try {
    const response = await api.get(`/getFilekris?kris_id=${id}`);
    formData.file = response.data.fileUrl;
    console.log("Success", response);
  } catch (error) {
    console.log("Error fetching file:", error);
  }
  window.open(formData.file, "_blank");
};

const router = useRouter();

const rules = computed(() => ({
  radioAuthOffic: {
    required: helpers.withMessage("* กรุณาเลือกข้อมูล *", required),
  },
}));

const v$ = useVuelidate(rules, formData);

const OfficerKris = async () => {
  if (loading.value) return;
  const result = await v$.value.$validate();

  if (result) {
    if (confirm("ยืนยันข้อมูลถูกต้อง") == false) {
      return false;
    }

    try {
      loading.value = true
      const dataForBackend = {
        user_id: user.value?.user_id,
        kris_id: id,
        research_admin: formData.radioAuthOffic,
        form_status: formData.formStatus,
      };

      const response = await api.post(`/opinionKris`, dataForBackend);
      alert("บันทึกข้อมูลเรียบร้อย");
      router.push("/HomePage/officer");
    } catch (error) {
      console.log("Error saving code : ", error);
      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    } finally {
      loading.value = false;
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");

    console.log("Validation failed:", v$.value.$errors);
  }
};
</script>
