<template>
  <div :class="`border rounded-2xl shadow-lg p-5 mb-5 ${customClass}`">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: "",
  },
});
</script>
