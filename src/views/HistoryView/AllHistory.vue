<template>
  <div class="container my-10 mx-auto">
    <h1 class="text-xl font-bold mb-5">ประวัติเอกสารทั้งหมด</h1>

    <!-- Filters -->
    <div class="flex flex-row mb-4 w-full">
      <span class="flex mr-2 items-center">ปีงบประมาณ</span>
      <select
        class="select select-bordered w-1/6"
        v-model="data.findFiscalYear"
      >
        <option v-for="n in 5" :key="n" :value="fiscalYear - (n - 1)">
          {{ fiscalYear - (n - 1) }}
        </option>
      </select>

      <span class="flex ml-4 mr-2 items-center">ประเภทเอกสาร</span>
      <select
        class="select select-bordered w-1/6"
        v-model="data.typeOfDoc"
      >
        <option value="all">ทั้งหมด</option>
        <option value="Conference">ประชุมวิชาการ</option>
        <option value="Page_Charge">ตีพิมพ์วารสาร</option>
        <option value="Research_KRIS">ทุนวิจัย</option>
      </select>

      <span class="flex ml-4 mr-2 items-center">สถานะเอกสาร</span>
      <select
        class="select select-bordered w-1/6"
        v-model="data.typeStatus"
      >
        <option value="all">ทั้งหมด</option>
        <option value="waitingApproval">รออนุมัติ</option>
        <option value="approve">อนุมัติ</option>
        <option value="notApproved">ไม่อนุมัติ</option>
        <option value="return">ตีกลับ</option>
      </select>
    </div>

    <!-- List -->
     <div v-if="data.allForm && data.allForm.length > 0">
      <FormCard
        v-for="form in data.allForm"
        :key="form.form_id"
        :form="form"
        :page="'history'"
        :roleConferenceMap="roleConferenceMap"
        :rolePageChargeMap="rolePageChargeMap"
        :roleResearchKRISMap="roleResearchKRISMap"
        :showAmount="true"
        :showStatus="true"
      />
    </div>

    <div v-else class="text-center text-gray-400 text-3xl">
      <p>ไม่มีเอกสาร</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import { DateTime } from "luxon";
import api from "@/setting/api";
import FormCard from "@/components/form/FormCard.vue";

/* -------------------- state -------------------- */
const data = reactive({
  allForm: [],
  findFiscalYear: "",
  typeOfDoc: "all",
  typeStatus: "all",
  isEmpty: false,
});

/* -------------------- role map -------------------- */
const roleConferenceMap = {
  conference: "/history/conference/",
};

const rolePageChargeMap = {
  pageCharge: "/history/pageCharge/",
};

const roleResearchKRISMap = {
  kris: "/history/kris/",
};

/* -------------------- utils -------------------- */
const getThaiFiscalYear = () => {
  const now = DateTime.now();
  const year = now.year + 543;
  return now.month >= 10 ? year + 1 : year;
};

const fiscalYear = getThaiFiscalYear();

/* -------------------- api -------------------- */
const pulldata = async () => {
  try {
    const res = await api.get("/allForms", {
      params: {
        fiscalYear: data.findFiscalYear,
        type: data.typeOfDoc,
        typeStatus: data.typeStatus,
      },
    });

    data.allForm = res.data.map((form) => ({
      ...form,
      amount_approval: Number(form.amount_approval || 0).toLocaleString(
        "en-US",
        { minimumFractionDigits: 2 }
      ),
      Research_kris_amount: Number(
        form.Research_kris_amount || 0
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      }),
    }));

    data.isEmpty = data.allForm.length === 0;
  } catch (error) {
    console.error("โหลดข้อมูลไม่สำเร็จ:", error);
    data.allForm = [];
    data.isEmpty = true;
  }
};

/* -------------------- lifecycle -------------------- */
onMounted(() => {
  data.findFiscalYear = fiscalYear;
  pulldata();
});

/* -------------------- watch filters -------------------- */
watch(
  () => [data.findFiscalYear, data.typeOfDoc, data.typeStatus],
  () => {
    pulldata();
  }
);
</script>
