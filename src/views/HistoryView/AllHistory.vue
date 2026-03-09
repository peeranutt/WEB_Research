<template>
  <div class="container my-10 mx-auto">
    <h1 class="text-xl font-bold mb-5">ประวัติเอกสารทั้งหมด</h1>

    <FormFilter
      v-model:fiscalYear="data.findFiscalYear"
      v-model:typeOfDoc="data.typeOfDoc"
      v-model:typeStatus="data.typeStatus"
      :baseFiscalYear="fiscalYear"
    />

    <!-- Loading -->
    <div v-if="data.loading" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- List -->
    <template v-else-if="data.allForm.length > 0">
      <FormCard
        v-for="form in data.allForm"
        :key="form.form_id"
        :form="form"
        :page="'history'"
        type-history="all""
        :roleConferenceMap="roleConferenceMap"
        :rolePageChargeMap="rolePageChargeMap"
        :roleResearchKRISMap="roleResearchKRISMap"
        :showAmount="true"
        :showStatus="true"
      />
    </template>

    <!-- Empty -->
     <div v-else class="text-center text-gray-400 text-3xl py-20">
      <p>ไม่มีเอกสาร</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import api from "@/setting/api";
import FormCard from "@/components/form/FormCard.vue";
import FormFilter from "@/components/form/FormFilter.vue";
import { getThaiFiscalYear, formatForm } from "@/utils/formHelpers";

/* -------------------- constants -------------------- */
const fiscalYear = getThaiFiscalYear();

const roleConferenceMap = { conference: "/history/conference/" };
const rolePageChargeMap = { pageCharge: "/history/pageCharge/" };
const roleResearchKRISMap = { kris: "/history/kris/" };

/* -------------------- state -------------------- */
const data = reactive({
  allForm: [],
  findFiscalYear: fiscalYear,
  typeOfDoc: "all",
  typeStatus: "all",
  loading: false,
});

/* -------------------- api -------------------- */
const getAllData = async () => {
  data.loading = true;

  try {
    const res = await api.get("/allForms", {
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

/* -------------------- lifecycle -------------------- */
onMounted(() => getAllData());

/* -------------------- watch -------------------- */
watch(
  () => [data.findFiscalYear, data.typeOfDoc, data.typeStatus],
  () => getAllData()
);
</script>
