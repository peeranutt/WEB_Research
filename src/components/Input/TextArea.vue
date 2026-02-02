<template>
  <!-- text input -->
  <div :class="`from-control w-full ${customDiv}`">
    <p :class="`${customLabel}`">{{ label }}</p>
    <textarea
    :class="`textarea textarea-bordered mt-2 w-full ${customInput}`"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="value"></textarea>
  </div>
</template>

<script setup>
defineProps({
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
  value: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customInput: {
    type: String,
    default: "",
  },
});
</script>
