<template>
  <div class="container my-10 mx-auto">
    <div v-if="props.type == 'Conference'">
      <Mainbox v-if="data.withdraw.withdraw" class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">อนุมัติเบิกเงินรายได้</p>
        <SectionWrapper class="collapse-content">
          <div class="flex flex-row">
            <p class="w-2/12">กองทุน</p>
            <p class="w-2/12">พัฒนาบุคคลกร</p>
          </div>

          <div class="flex flex-row">
            <p class="w-2/12">งบรายจ่าย</p>
            <p class="w-2/12">ค่าใช้จ่ายงบเงินอุดหนุน</p>
          </div>

          <div class="flex flex-row">
            <p class="w-2/12">ประเภทรายจ่าย</p>
            <p class="max-w-max">ทุนอุดหนุนการเดินทางไปเสนอบทความทางวิชาการ</p>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-row">
              <p class="w-1/12 mt-2">ค่าใช้จ่าย</p>
              <TextInputLabelLeft
                label="ค่าเดินทาง"
                customLabel="w-3/12 mr-10"
                customInput="max-w-max"
                customDiv="max-w-[21%]"
                v-model="formattedBudget.travelExpenses"
                :disabled="true"
              />
              <span class="flex items-center">บาท</span>
            </div>

            <div class="flex flex-row">
              <p class="w-1/12"></p>
              <TextInputLabelLeft
                label="ค่าเบี้ยเลี้ยง"
                customLabel="w-3/12 mr-10"
                customInput="max-w-max"
                customDiv="max-w-[21%]"
                v-model="formattedBudget.allowance"
                :disabled="true"
              />
              <span class="flex items-center">บาท</span>
            </div>
          </div>

          <div class="flex flex-row">
            <TextInputLabelLeft
              label="จำนวน"
              customLabel="w-6/12 mr-6"
              customInput="max-w-max"
              customDiv="max-w-[29%]"
              v-model="formattedBudget.withdraw"
              :disabled="true"
            />
            <span class="flex items-center">บาท</span>
          </div>
        </SectionWrapper>
      </Mainbox>
      <Mainbox v-else>
        <p class="leading-9 font-bold">อนุมัติเบิกเงินรายได้</p>
        <p>รอขออนุมัติเบิกเงินรายได้</p>
      </Mainbox>
    </div>

    <div v-if="props.type == 'Page_Charge'">
      <Mainbox v-if="data.withdraw.withdraw" class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">อนุมัติเบิกเงินรายได้</p>
        <SectionWrapper class="collapse-content">
          <div class="flex flex-row">
            <p class="w-2/12">กองทุน</p>
            <p class="w-2/12">พัฒนาบุคคลกร</p>
          </div>

          <div class="flex flex-row">
            <p class="w-2/12">งบรายจ่าย</p>
            <p class="w-2/12">งบดำเนินงาน</p>
          </div>

          <div class="flex flex-row">
            <p class="w-2/12">ประเภทรายจ่าย</p>
            <p class="w-2/12">ค่าใช้สอย</p>
          </div>

          <div class="flex flex-row">
            <p class="w-2/12">ค่าใช้จ่าย</p>
            <p class="w-6/12">ค่าตีพิมพ์บทความในวารสารนานาชาติ (Page Charge)</p>
          </div>

          <div class="flex flex-row">
            <TextInputLabelLeft
              label="จำนวน"
              customLabel="w-6/12 mr-4"
              customInput="max-w-max"
              customDiv="max-w-[30%]"
              :disabled="true"
              v-model="formattedBudget.withdraw"
            />
            <span class="flex items-center">บาท</span>
          </div>
        </SectionWrapper>
      </Mainbox>
      <Mainbox v-else>
        <p class="leading-9 font-bold">อนุมัติเบิกเงินรายได้</p>
        <p>รอขออนุมัติเบิกเงินรายได้</p>
      </Mainbox>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";

const data = reactive({
  withdraw: [],
});

const props = defineProps(["id", "type"]);
const isLoading = ref(true);

const fetchOfficerData = async () => {
  try {
    if (props.type == "Conference") {
      const response = await api.get(`/budget/conference/${props.id}`);
      data.withdraw = response.data;
      console.log("data.withdraw", data.withdraw);
    } else if (props.type == "Page_Charge") {
      const response = await api.get(`/budget/pageCharge/${props.id}`);
      data.withdraw = response.data;
    }
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') return '0.00';
  const num = parseFloat(value);
  if (isNaN(num)) return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const formattedBudget = computed(() => {
  const b = data.withdraw;
  return {
    ...b,
    travelExpenses: formatNumber(b.travelExpenses),
    allowance: formatNumber(b.allowance),
    withdraw: formatNumber(b.withdraw),
  };
});

onMounted(() => {
  fetchOfficerData();
});
</script>
