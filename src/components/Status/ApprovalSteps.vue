<template>
  <Mainbox class="container my-10 mx-auto">
    <div class="flex justify-center" v-if="steps.length > 0">
      <ul class="steps steps-vertical lg:steps-horizontal">
        <li
          v-for="(step, index) in steps"
          :key="index"
          class="step w-40"
          :class="{
            'step-primary': step.checked === true,
          }"
          :data-content="step.icon"
        >
          {{ step.label }}
        </li>
      </ul>
    </div>
  </Mainbox>
</template>

<script setup>
import { computed } from "vue";
import Mainbox from "@/components/form/Mainbox.vue";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "conference", // conference | pageCharge | kris
  },
});

// กำหนด mapping แต่ละ type
const stepsByType = {
  conference: [
    "ฝ่ายบริหารทรัพยากรบุคคล",
    "ฝ่ายบริหารงานวิจัย",
    "ฝ่ายบริหารการเงิน",
    "รองคณบดี",
    "คณบดี",
    "รออนุมัติ",
    "อนุมัติ",
  ],
  Research_KRIS: ["ฝ่ายบริหารงานวิจัย", "เข้าที่ประชุม", "อนุมัติ"],
  Page_Charge: [
    "ฝ่ายบริหารงานวิจัย",
    "ฝ่ายบริหารการเงิน",
    "รองคณบดี",
    "คณบดี",
    "รออนุมัติ",
    "อนุมัติ",
  ],
};

const steps = computed(() => {
  const baseSteps = stepsByType[props.type] || [];

  // logic สร้าง step แต่ละ status
  switch (props.status) {
    case "notApproved":
      return baseSteps.map((label, i) => ({
        label,
        checked: i === baseSteps.length - 1 ? false : "",
        icon: i === baseSteps.length - 1 ? "✗" : "",
      }));

    case "approve":
      return baseSteps.map((label) => ({
        label,
        checked: true,
        icon: "✓",
      }));

    case "waitingApproval":
      return baseSteps.map((label, i) => ({
        label,
        checked: i < baseSteps.length - 1,
        icon: i < baseSteps.length - 1 ? "✓" : "",
      }));

    case "dean":
      return baseSteps.map((label, i) => ({
        label,
        checked: i < baseSteps.indexOf("คณบดี") + 1,
        icon: i < baseSteps.indexOf("คณบดี") + 1 ? "✓" : "",
      }));

    case "associate":
      return baseSteps.map((label, i) => ({
        label,
        checked: i < baseSteps.indexOf("รองคณบดี") + 1,
        icon: i < baseSteps.indexOf("รองคณบดี") + 1 ? "✓" : "",
      }));

    case "finance":
    case "pending":
      return baseSteps.map((label, i) => ({
        label,
        checked: i < baseSteps.indexOf("ฝ่ายบริหารการเงิน") + 1,
        icon: i < baseSteps.indexOf("ฝ่ายบริหารการเงิน") + 1 ? "✓" : "",
      }));

    case "research":
      return baseSteps.map((label, i) => ({
        label,
        checked: i < baseSteps.indexOf("ฝ่ายบริหารงานวิจัย") + 1,
        icon: i < baseSteps.indexOf("ฝ่ายบริหารงานวิจัย") + 1 ? "✓" : "",
      }));

    case "hr":
      return baseSteps.map((label, i) => ({
        label,
        checked: i < baseSteps.indexOf("ฝ่ายบริหารทรัพยากรบุคคล") + 1,
        icon: i < baseSteps.indexOf("ฝ่ายบริหารทรัพยากรบุคคล") + 1 ? "✓" : "",
      }));

    case "attendMeeting":
      return baseSteps.map((label, i) => ({
        label,
        checked: i <= baseSteps.indexOf("เข้าที่ประชุม"),
        icon: i <= baseSteps.indexOf("เข้าที่ประชุม") ? "✓" : "",
      }));

    default:
      return [];
  }
});
</script>
