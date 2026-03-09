<template>
  <div class="container my-10 mx-auto">
    <h1 class="text-xl font-bold mb-5">สถานะ และประวัติเอกสาร</h1>

    <FormFilter
      v-model:fiscalYear="data.findFiscalYear"
      v-model:typeOfDoc="data.typeOfDoc"
      v-model:typeStatus="data.typeStatus"
      :baseFiscalYear="fiscalYear"
    />

    <!-- loading -->
    <div v-if="data.loading" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- list forms -->
    <template v-else-if="data.allForm.length > 0">
      <FormCard
        v-for="form in data.allForm"
        :key="form.form_id"
        :form="form"
        type-history="my"
        :page="'history'"
        :roleConferenceMap="roleConferenceMap"
        :rolePageChargeMap="rolePageChargeMap"
        :roleResearchKRISMap="roleResearchKRISMap"
        :showAmount="true"
        :showStatus="true"
      />
    </template>

    <!-- Empty state -->
    <div v-else class="text-center text-gray-400 text-3xl py-20">
      <p>ไม่มีเอกสาร</p>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, watch } from "vue";
import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";
import FormCard from "@/components/form/FormCard.vue";
import FormFilter from "@/components/form/FormFilter.vue";
import { getThaiFiscalYear, formatForm } from "@/utils/formHelpers";


// -------------------- constants -------------------- //
const fiscalYear = getThaiFiscalYear();

const roleConferenceMap = { conference: "/history/conference/" };
const rolePageChargeMap = { pageCharge: "/history/pageCharge/" };
const roleResearchKRISMap = { kris: "/history/kris/" };

// -------------------- state -------------------- //
const data = reactive({
  userID: null,
  allForm: [],
  findFiscalYear: fiscalYear,
  typeOfDoc: "all",
  typeStatus: "all",
  loading: false,
});

// -------------------- store -------------------- //
const userStore = useUserStore();
const user = computed(() => userStore.user);

// -------------------- api -------------------- //
const getMyData = async () => {
  if (!data.userID) return;

  data.loading = true;

  try {
    const res = await api.get(`/form/${data.userID}`, {
      params: {
        fiscalYear: data.findFiscalYear,
        type: data.typeOfDoc,
        typeStatus: data.typeStatus,
      },
    });

    data.allForm = res.data.map((form) => formatForm(form));
  } catch (error) {
    console.error("โหลดข้อมูลไม่สำเร็จ:", error);
    data.allForm = [];
  } finally {
    data.loading = false;
  }
};


// -------------------- lifecycle -------------------- //
onMounted(async () => {
  await userStore.fetchUser();
  data.userID = user.value?.user_id ?? null;
  await getMyData();
});

// -------------------- watchers -------------------- //
watch(
  () => [data.findFiscalYear, data.typeOfDoc, data.typeStatus],
  () => getMyData()
);
</script>
