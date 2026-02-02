<template>
  <div :class="`form-control w-full ${customDiv}`">
    <label :class="`flex items-center ${customLabel}`">
      <input
        type="radio"
        :class="`radio radio-sm mr-2 ${customClass}`"
        :value="value"
        :name="name"
        :disabled="disabled"
        :checked="modelValue === value"
        @change="$emit('update:modelValue', value)"
      />
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    default: "",
  },
  customDiv: {
    type: String,
    default: "",
  },
  customLabel: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});
</script>