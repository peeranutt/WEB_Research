<template>
  <div class="bg-white p-5 rounded-lg shadow h-[400px] w-[700px]">
    <h2 class="text-lg font-semibold">สถิติการอนุมัติในแต่ละปี</h2>
    <p class="font-bold text-[#9291A5]">
      ปีงบประมาณ {{ fiscalYear-3 }} - {{ fiscalYear }}
    </p>
    <hr />
    <div class="flex justify-center w-full h-[325px]">
      <canvas ref="chartCanvas" style="width: 100%; height: 100%"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { DateTime } from "luxon";
import api from "@/setting/api";

const getThaiFiscalYear = () => {
  const now = DateTime.now();
  const year = now.year + 543;
  return now.month >= 10 ? year + 1 : year;
};
const fiscalYear = getThaiFiscalYear();

const year_now = ref(0);
const year_x = ref(0);
const year_y = ref(0);
const year_z = ref(0);

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const chartCanvas = ref(null);
let chartInstance = null;

const getData = async () => {
  try {
    const response = await api.get("/eachyears");

    year_now.value = response.data[0] ? response.data[0]
        : {
            budget_year: fiscalYear,
            total_conferences: "0",
            total_pagecharge: "0"
          };
    year_x.value = response.data[1] ? response.data[1]
        : {
            budget_year: fiscalYear - 1,
            total_conferences: "0",
            total_pagecharge: "0"
          };
    year_y.value = response.data[2] ? response.data[2]
        : {
            budget_year: fiscalYear - 2,
            total_conferences: "0",
            total_pagecharge: "0"
          };
    year_z.value = response.data[3] ? response.data[3]
        : {
            budget_year: fiscalYear - 3,
            total_conferences: "0",
            total_pagecharge: "0"
          };

    creatChart();
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

const creatChart = () => {
  if (!chartCanvas.value) {
    console.log("Canvas not found!");
    return;
  }

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: "bar",
    data: {
      labels: [year_z.value.budget_year, year_y.value.budget_year, year_x.value.budget_year, year_now.value.budget_year],
      datasets: [
        {
          label: "การประชุมวิชาการ",
          data: [year_z.value.total_conferences, year_y.value.total_conferences, year_x.value.total_conferences, year_now.value.total_conferences],
          backgroundColor: "#4A3AFF",
          borderRadius: 8
        },
        {
          label: "Page Change",
          data: [year_z.value.total_pagecharge, year_y.value.total_pagecharge, year_x.value.total_pagecharge, year_now.value.total_pagecharge],
          backgroundColor: "#C893FD",
          borderRadius: 8
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

onMounted(getData);

watch([year_now, year_x, year_y, year_z], () => {
  creatChart();
});
</script>
