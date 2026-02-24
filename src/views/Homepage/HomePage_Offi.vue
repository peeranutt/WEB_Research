<template>
  <div class="container my-10 mx-auto h-screen">
    <!-- name of each tab group should be unique -->
    <div class="tabs tabs-box w-full">
      <input
        type="radio"
        name="my_tabs"
        class="tab w-fit"
        aria-label="เอกสารต้องตรวจสอบ"
        value="doc"
        v-model="activeTab"
        :class="
          activeTab === 'doc'
            ? 'font-bold text-lg'
            : 'text-base-content text-base'
        "
      />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <div class="h-[50%]">
          <div class="h-full p-2 mb-2">
            <p v-if="!listForm.forms.length">ไม่มีเอกสารที่ต้องตรวจสอบ</p>
            <div v-else>
              <FormCard
                v-for="form in listForm.forms"
                :key="form.form_id"
                :form="form"
                :page="'officer'"
                :roleConferenceMap="roleConferenceMap"
                :rolePageChargeMap="rolePageChargeMap"
                :roleResearchKRISMap="roleResearchKRISMap"
                :showAmount="false"
                :showStatus="false"
              />
            </div>
          </div>
        </div>
      </div>

      <input
        type="radio"
        name="my_tabs"
        class="tab w-fit"
        aria-label="เอกสารที่ถูกตีกลับ"
        value="return"
        v-model="activeTab"
        :class="
          activeTab === 'return'
            ? 'font-bold text-lg'
            : 'text-base-content text-base'
        "
      />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <div class="h-full p-2 mb-2">
          <p v-if="!listForm.return.length">ไม่มีเอกสารที่ถูกตีกลับ</p>

          <div v-else>
            <FormCard
              v-for="form in listForm.return"
              :key="form.form_id"
              :form="form"
              :page="'officer'"
              :roleConferenceMap="roleConferenceMap"
              :rolePageChargeMap="rolePageChargeMap"
              :roleResearchKRISMap="roleResearchKRISMap"
              :showAmount="false"
              :showStatus="false"
              :eoffice="false"
              :comment="form.return_note"
              :who="form.past_return"
            />
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
import FormCard from "@/components/form/FormCard.vue";

const router = useRouter();

const activeTab = ref("doc");

const userStore = useUserStore();
const listForm = reactive({
  forms: [],
  return: [],
});

const isLoading = ref(true);

const roleConferenceMap = {
  hr: "/officeFormConference/hr/",
  research: "/officeFormConference/research/",
  finance: "/officeFormConference/finance/",
  associate: "/officeFormConference/associate/",
  dean: "/officeFormConference/dean/",
};

const rolePageChargeMap = {
  research: "/officeFormPageCharge/research/",
  finance: "/officeFormPageCharge/finance/",
  associate: "/officeFormPageCharge/associate/",
  dean: "/officeFormPageCharge/dean/",
};

const roleResearchKRISMap = {
  research: "/officeFormKris/research/",
};

const fetchOfficerData = async () => {
  try {
    // คำนวณปีงบประมาณปัจจุบัน (พ.ศ.)
    const now = new Date();
    let fiscalYear = now.getFullYear() + 543;
    if (now.getMonth() + 1 >= 10) fiscalYear += 1;

    // กำหนด typeStatus ตาม role
    let typeStatus = userStore.user.user_role;
    const role = userStore.user.user_role;

    if (role === "finance") {
      typeStatus = "finance,pending,return";
    } else if (
      role === "hr" ||
      role === "research" ||
      role === "associate" ||
      role === "dean"
    ) {
      // เพิ่ม 'return' เข้าไปสำหรับบทบาทอื่น ๆ เพื่อให้ backend ส่งข้อมูลกลับมา
      typeStatus = `${role},return`;
    }

    // 🧾 ส่ง query ไป backend
    const responseOffice = await api.get("/allForms", {
      params: {
        fiscalYear,
        type: "all",
        typeStatus,
      },
    });

    if (!responseOffice.data || !Array.isArray(responseOffice.data)) {
      console.log("Invalid forms data");
      return;
    }

    // 🧩 กรองข้อมูลตาม role
    let filteredForms = responseOffice.data.filter((form) => {
      const role = userStore.user.user_role;
      switch (role) {
        case "hr":
          return form.form_status === "hr";
        case "research":
          return form.form_status === "research";
        case "finance":
          return (
            form.form_status === "finance" || form.form_status === "pending"
          );
        case "associate":
          return form.form_status === "associate";
        case "dean":
          return form.form_status === "dean";
        default:
          return false;
      }
    });

    listForm.forms = filteredForms;

    console.log("Full Response Data:", responseOffice.data);

    console.log("Filtered Forms:", responseOffice.data);
    console.log("User Role:", userStore.user.user_role);

    listForm.return = responseOffice.data.filter(
      (form) =>
        form.form_status === "return" &&
        form.return_to === userStore.user.user_role,
    );
    const allReturnedForms = responseOffice.data.filter(
      (form) => form.form_status === "return",
    );
    console.log("All Forms with status 'return':", allReturnedForms);

    // 💡 ตรวจสอบค่า return_to ในฟอร์มเหล่านั้นเทียบกับ user_role
    allReturnedForms.forEach((form) => {
      console.log(
        `Return Form ID: ${form.form_id}, Status: ${form.form_status}, Return To: ${form.return_to}, User Role: ${userStore.user.user_role}`,
      );
    });

    console.log("Final listForm.return count:", listForm.return.length);
  } catch (error) {
    console.error("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  fetchOfficerData();
  if (!userStore.user) {
    await userStore.fetchUser();
  }
});
</script>
