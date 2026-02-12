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

console.log("STATUS:", props.status);

const logicalStatus = computed(() => {
  const s = props.status;
  
console.log("หหหห:", s);
  if (s === "approved" || s === "approve") return "approved";
  if (s === "rejected" || s === "notApproved") return "rejected";
  if (s === "return") return "returned";

   if (
    s === "hr" ||
    s === "research" ||
    s === "finance" ||
    s === "associate" ||
    s === "dean" ||
    s === "waitingApproval" ||
    s === "attendMeeting"
  ) {
    return "waiting";
  }
});

const steps = computed(() => {
  const baseSteps = ["ยื่นเอกสาร", "รออนุมัติ", "ผลการพิจารณา"];
  console.log("logicalStatus", logicalStatus.value)
  return baseSteps.map((label, index) => {
    if (logicalStatus.value === "waiting") {
      return {
        label,
        checked: index <= 1,   // ติ๊ก 2 ขั้นแรก
        icon: index <= 1 ? "✓" : "",
      };
    }


    if (logicalStatus.value === "returned") {
      return {
        label: index === 2 ? "ตีกลับ" : label,
        checked: index <= 1,
        icon: index === 2 ? "✗" : index <= 1 ? "✓" : "",
      };
    }

    if (logicalStatus.value === "approved") {
      return {
        label: index === 2 ? "อนุมัติ" : label,
        checked: true,
        icon: "✓",
      };
    }

    if (logicalStatus.value === "rejected") {
      return {
        label: index === 2 ? "ไม่อนุมัติ" : label,
        checked: index <= 1,
        icon: index === 2 ? "✗" : "✓",
      };
    }

    return {
      label,
      checked: false,
      icon: "",
    };
  });
});
</script>
