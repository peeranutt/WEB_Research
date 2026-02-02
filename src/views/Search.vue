<template>
  <div class="container my-5 mx-auto">

    <div class="flex flex-row mb-4 w-full">
      <div class="flex flex-row mb-4 w-full">
        <span class="flex mr-2 items-center">ปีงบประมาณ</span>
        <select class="select select-bordered w-1/6" v-model="data.findFiscalYear">
          <option v-for="n in 5" :key="n" :value="fiscalYear - (n - 1)">
            {{ fiscalYear - (n - 1) }}
          </option>
        </select>
      </div>

      <div class="flex justify-end w-full"
        v-if="userStore.user && userStore.user.user_role != 'admin' && userStore.user.user_role != 'professor'">
        <router-link to="/summary">
          <button class="btn btn-neutral">สรุปผลเป็นตาราง</button>
        </router-link>
      </div>
    </div>

    <div class="flex flex-row justify-center mx-2 max-h-fit w-full gap-5">
      <RemainingConfer :year="data.findFiscalYear" />
      <TotalDocuments :year="data.findFiscalYear" />
      <RemainingPC :year="data.findFiscalYear" />
    </div>
    <div class="flex flex-row justify-center m-2 max-h-fit w-full gap-5">
      <DisbursementApproval />
      <DisbursementEachYear />
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { Chart, registerables } from "chart.js";
import { DateTime } from "luxon";

import RemainingConfer from "@/components/Dashboard/RemainingConfer.vue";
import RemainingPC from "@/components/Dashboard/RemainingPC.vue";
import DisbursementApproval from "@/components/Dashboard/DisbursementApproval.vue";
import TotalDocuments from "@/components/Dashboard/TotalDocuments.vue";
import DisbursementEachYear from "@/components/Dashboard/DisbursementEachYear.vue";

Chart.register(...registerables);

const data = reactive({
  findFiscalYear: '',
});

const userStore = useUserStore();

const getThaiFiscalYear = () => {
  const now = DateTime.now();
  const year = now.year + 543;
  return now.month >= 10 ? year + 1 : year;
};
const fiscalYear = getThaiFiscalYear();

onMounted(() => {
  if (!data.findFiscalYear) {
    data.findFiscalYear = fiscalYear
  }
})

</script>