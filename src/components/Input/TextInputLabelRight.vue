<template>
  <!-- text input -->
  <div :class="`from-control w-full ${customDiv}`">
    <label class="w-full flex items-center">
      <input
        :type="type"
        :class="`input input-bordered mx-1 w-10/12 ${customClass}`"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('input, $event.target.value')"
      />
      <span :class="`w-2/12 ${customLabel}`"> {{ label }}</span>
    </label>
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
  type: {
    type: String,
    default: "text",
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
  customClass: {
    type: String,
    default: "",
  },
});
</script>

//
<script>
// import { ref } from "vue";
// import { computed } from "vue";

// export default {
//   props: {
//     label: {
//       type: String,
//       required: true,
//     },
//     value: {
//       type: String,
//       default: "",
//     },
//     id: {
//       type: String,
//       default: "",
//     },
//   },
//   setup(props) {
//     const id = computed(
//       () => props.id || `input-${Math.random().toString(36).substr(2, 9)}`
//     );

//     return { id };
//   },
// };
//
</script>
