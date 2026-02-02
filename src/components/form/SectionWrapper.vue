<template>
  <div :class="`grid from-control w-full px-7 mt-1 gap-3 ${customClass}`">
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
