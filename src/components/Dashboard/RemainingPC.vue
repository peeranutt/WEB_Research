<template>
  <div class="bg-white p-5 rounded-lg shadow h-[400px] w-[400px]">
    <h2 class="text-lg font-semibold">งบประมาณคงเหลือของ Page Charge</h2>
    <p class="font-bold text-[#9291A5]">ปี {{ year }}</p>
    <hr />
    <div class="mt-4 text-center">
      <p class="text-sm">งบประมาณทั้งหมด</p>
      <span class="text-xl font-bold"> {{ Number(Budget)?.toLocaleString("en-US") ||  0 }} บาท</span>
    </div>
    <div class="flex justify-center w-full h-[250px]">
      <canvas ref="chartCanvas" style="width: 100%; height: 100%"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { DateTime } from "luxon";
import api from "@/setting/api";

const Budget = ref(0);
const usedBudget = ref(0);
const remainingBudget = ref(0);

Chart.register(ArcElement, Tooltip, Legend);
const chartCanvas = ref(null);
let chartInstance = null;

const { year } = defineProps(["year"]);

const getData = async () => {
  try {
    const response = await api.get(`/remainingPc/${year}`);
    
    Budget.value = response.data[0]?.Page_Charge_amount || 0;
    remainingBudget.value = response.data[0]?.total_remaining_credit_limit || 0;
    usedBudget.value = response.data[0]?.total_withdraw || 0;

    creatChart();
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
}

const creatChart = () => {
  if (!chartCanvas.value) {
    console.log("Canvas not found!");
    return;
  }

  if (chartInstance) {
    chartInstance.destroy();
  }

  const dataValues = 
  usedBudget.value === 0 && remainingBudget.value === 0
  ? [1, 1] : [usedBudget.value, remainingBudget.value];

  chartInstance = new Chart(chartCanvas.value, {
    type: "doughnut",
    data: {
      labels: [
        `จำนวนเงินที่ใช้ไปแล้ว ${Number(usedBudget.value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`,
        `จำนวนเงินคงเหลือทั้งหมด ${Number(remainingBudget.value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`,
      ],
      datasets: [
        {
          data: dataValues,
          backgroundColor: ['#2557A1', "#E85F19"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              if (dataValues[tooltipItem.dataIndex] === 1 && usedBudget.value === 0) {
                return "ไม่มีข้อมูล";
              }
              return `${tooltipItem.label}`;
            },
          },
        },
      },
    },
  })
}

watch(
  () => year,
  (newVal) => {
    console.log("เปลี่ยนปีเป็น:", newVal);
    getData();
  },
  { immediate: true }
);

watch([usedBudget, remainingBudget], () => {
  creatChart();
});
</script>
