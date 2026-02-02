<template>
  <div :class="`form-control w-full ${customDiv}`">
    <label class="w-full flex items-center">
      <span :class="`${customLabel}`"> {{ label }} <span v-if="required" class="text-red-500">*</span></span>
      <input
        :type="type"
        :class="`input input-bordered mx-1 w-full h-10 ${customInput}`"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="formattedValue"
        @input="handleInput"
      />
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customDiv: {
    type: String,
    default: "",
  },
  customLabel: {
    type: String,
    default: "",
  },
  customInput: {
    type: String,
    default: "",
  },
  required: { 
    type: Boolean, 
    default: false 
  }
});

const emit = defineEmits(["update:modelValue"]);

const formattedValue = computed(() => {
  if (props.type === 'date' && typeof props.modelValue === 'string') {
    // รับ ISO string เช่น 2025-04-28T00:00:00.000Z และตัดให้เหลือ yyyy-MM-dd
    return props.modelValue.split('T')[0];
  }
  return props.modelValue;
});

function handleInput(event) {
  let value = event.target.value; // ค่าเป็น yyyy-MM-dd เช่น "2025-04-28"
  // ถ้าเป็น date ไม่ต้องแปลง ISO, ส่งเป็น yyyy-MM-dd ตรงๆ
  emit('update:modelValue', value);
}
</script>
