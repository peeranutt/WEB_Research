<template>
  <div class="flex flex-row gap-1">
    <h4 class="font-bold inline-block shrink-0 text-base">{{ label }} :</h4>
    <h4 class="text-base" :class="truncate ? 'line-clamp-1' : ''">{{ value }}</h4>
  </div>
</template>

<script setup>
defineProps({
  label:    { type: String,  required: true },
  value:    { type: String,  default: "-" },
  truncate: { type: Boolean, default: false },
});
</script>
