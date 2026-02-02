<template>
  <div class="Main">
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold mb-5">เอกสารต้องขออนุมัติเบิกเงินรายได้</p>

      <!-- Loop forms ทั้งหมด -->
      <div v-for="form in listForm.forms" :key="form.form_id">
        <!-- Conference -->
        <div v-if="form.form_type == 'Conference'">
          <div v-if="userStore.user.user_role === 'finance'">
            <router-link :to="`/withdrawMoney/Conference/${form.conf_id}`">
              <div class="my-5 py-2 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer">
                <p class="flex justify-between px-5 py-1 text-left">
                  <span class="text-base">{{
                    getNameById(listForm.nameC, form.conf_id)
                  }}</span>
                  <span class="text-base text-[#868181]">ขออนุมัติเดินทางไปประชุมวิชาการ</span>
                </p>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Page Charge -->
        <div v-if="form.form_type == 'Page_Charge'">
          <div v-if="userStore.user.user_role === 'finance'">
            <router-link :to="`/withdrawMoney/pageCharge/${form.pageC_id}`">
              <div class="my-5 py-2 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer">
                <p class="flex justify-between px-5 py-1 text-left">
                  <span>
                    <span class="text-base">{{
                      getNameById(listForm.nameP, form.pageC_id)
                    }}</span>
                    <span class="text-sm px-2 text-red-900">
                      ({{ getFileById(listForm.nameP, form.pageC_id) }})</span>
                  </span>
                  <span class="text-base text-[#868181]">ขออนุมัติค่า Page Charge</span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const listForm = reactive({
  forms: [],
  nameC: [],
  nameP: [],
});

// console.log("user", userStore.user)

if (!userStore.user.user_signature) {
  alert("กรุณาอัปโหลดลายเซ็น");
  router.push("/profile");
}

const isLoading = ref(true);
const fetchOfficerData = async () => {
  try {
    const responseOffice = await api.get("/formsOffice");
    // ตรวจสอบว่ามีข้อมูลก่อน
    if (
      !responseOffice.data.forms ||
      !Array.isArray(responseOffice.data.forms)
    ) {
      console.log("Invalid forms data");
      return;
    }
    // ค้นหาทุก form ที่ตรงกับเงื่อนไข
    // กรองข้อมูลตาม user role
    let filteredForms = responseOffice.data.forms.filter((form) => {
      if (userStore.user.user_role === "finance") {
        console.log(
          "userStore.user.user_role",
          userStore.user.user_role,
          form.form_status
        );
        return form.form_status === "approve";
      }
      return false;
    });
    console.log("responseOffice.data", responseOffice.data);
    // console.log("filteredForms", filteredForms);
    for (let i = 0; i < filteredForms.length; i++) {
      console.log("filteredForms jaaaaa", filteredForms);
      if (filteredForms.length > 0 && filteredForms[i].withdraw == null) {
        console.log("filteredForms withdraw", filteredForms[i].withdraw);
        console.log("filteredForms withdraw", filteredForms[i]);
        listForm.forms.push(filteredForms[i]);
        listForm.nameC = responseOffice.data.confer;
        listForm.nameP = responseOffice.data.pageC;
      }
    }
    console.log("listForm.forms", listForm.forms);
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

// ฟังก์ชันสำหรับดึงชื่อจาก nameC, nameP
const getNameById = (nameList, id) => {
  const nameObj = nameList.find((item) => item[0] === id);
  return nameObj ? nameObj[1].user_nameth : "ไม่พบชื่อ";
};
const getFileById = (file, id) => {
  const fileObj = file.find((item) => item[0] === id);
  console.log("fileObj", fileObj);
  return fileObj[1].accepted ? "มีจดหมายตอบรับ" : "ไม่มีจดหมายตอบรับ";
};
onMounted(async () => {
  fetchOfficerData();
  if (!userStore.user) {
    await userStore.fetchUser();
  }
});
</script>
