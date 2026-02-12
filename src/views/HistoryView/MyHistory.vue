<template>
  <div class="container my-10 mx-auto">
    <h1 class="text-xl font-bold mb-5">สถานะ และประวัติเอกสาร</h1>

    <div class="flex flex-row mb-4 w-full">
      <div class="flex flex-row mb-4 w-full">
        <span class="flex mr-2 items-center">ปีงบประมาณ</span>
        <select class="select select-bordered w-1/6" v-model="data.findFiscalYear">
          <option v-for="n in 5" :key="n" :value="fiscalYear - (n - 1)">
            {{ fiscalYear - (n - 1) }}
          </option>
        </select>

        <span class="flex ml-2 mr-2 items-center">ประเภทเอกสาร</span>
        <select class="select select-bordered w-1/6" v-model="data.typeOfDoc">
          <option selected :value="'all'">ทั้งหมด</option>
          <option :value="'Conference'">ประชุมวิชาการ</option>
          <option :value="'Page_Charge'">ตีพิมพ์วารสาร</option>
          <option :value="'Research_KRIS'">ทุนวิจัย</option>
        </select>

        <span class="flex ml-2 mr-2 items-center">สถานะเอกสาร</span>
        <select class="select select-bordered w-1/6" v-model="data.typeStatus">
          <option selected :value="'all'">ทั้งหมด</option>
          <option :value="'waitingApproval'">รออนุมัติ</option>
          <option :value="'approve'">อนุมัติ</option>
          <option :value="'notApproved'">ไม่อนุมัติ</option>
          <option value="return">ตีกลับ</option>
        </select>
      </div>
    </div>

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
import { computed, onMounted, reactive, watch } from "vue";
import { useUserStore } from "@/store/userStore";
import { DateTime } from "luxon";
import api from "@/setting/api";
import FormCard from "@/components/form/FormCard.vue";

const data = reactive({
  userID: "",
  userRole: "",
  allForm: "",
  findFiscalYear: "",
  typeOfDoc: "",
  typeStatus: "",
});

const userStore = useUserStore();
const user = computed(() => userStore.user);

const roleConferenceMap = {
  conference: "/history/conference/",
};

const rolePageChargeMap = {
  pageCharge: "/history/pageCharge/",
};

const roleResearchKRISMap = {
  kris: "/history/kris/",
};

const getThaiFiscalYear = () => {
  const now = DateTime.now();
  const year = now.year + 543;
  return now.month >= 10 ? year + 1 : year;
};
const fiscalYear = getThaiFiscalYear();

//pull data of profess
const pulldata = async () => {
  try {
    const res = await api.get(`/form/${data.userID}`, {
      params: {
        fiscalYear: data.findFiscalYear || "", // ส่งว่างถ้าไม่ได้เลือก
        type: data.typeOfDoc || "",
        typeStatus: data.typeStatus || "",
      },
    });

    data.allForm = res.data.map((form) => {
      return {
        ...form, // คัดลอกทุกค่าในออบเจกต์ `form` มา
        amount_approval: parseFloat(form.amount_approval).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
          }
        ), //แทนที่เฉพาะ `amount_approval`
        Research_kris_amount: parseFloat(form.Research_kris_amount).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
          }
        ),
      };
    });
    console.log("data.allForm",data.allForm)
  } catch (error) {
    console.error(error);
    data.allForm = [];
  }
};

onMounted(async () => {
  await userStore.fetchUser();
  data.userID = user.value?.user_id;

  if (!data.findFiscalYear) data.findFiscalYear = fiscalYear;
  if (!data.typeOfDoc) data.typeOfDoc = "all";
  if (!data.typeStatus) data.typeStatus = "all";

  if (data.userID) await pulldata();
});

watch(
  () => [data.findFiscalYear, data.typeOfDoc, data.typeStatus],
  () => {
    if (data.userID) {
      pulldata();
    }
  }
);
</script>
