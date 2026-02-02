<template>
  <div :class="`from-control w-full ${customDiv}`">
    <label class="flex flex-col">
      <div class="flex flex-row items-center">
        <span :class="`${customSpan}`"> {{ span }}</span>
        <span :class="`mb-1 ${customLabel}`"> {{ label }} <span v-if="required" class="text-red-500">*</span></span>
      </div>

      <input type="file" :class="`file-input file-input-bordered w-full ${customInput}`"
        :disabled="disabled"  @change="$emit('update:modelValue', $event.target.files[0])" />
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [File, null],
    default: null,
  },
  customDiv: {
    type: String,
    default: "",
  },
  customLabel: {
    type: String,
    default: "",
  },
  customSpan: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: false,
  },
  span: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
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
</script>
