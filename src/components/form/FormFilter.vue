<template>
  <div class="flex flex-wrap gap-4 mb-6">
    <!-- ปีงบประมาณ -->
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-gray-600 whitespace-nowrap"
        >ปีงบประมาณ</label
      >
      <select
        class="select select-bordered select-sm w-32"
        :value="fiscalYear"
        @change="$emit('update:fiscalYear', Number($event.target.value))"
      >
        <option v-for="n in 5" :key="n" :value="baseFiscalYear - (n - 1)">
          {{ baseFiscalYear - (n - 1) }}
        </option>
      </select>
    </div>

    <!-- ประเภทเอกสาร -->
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-gray-600 whitespace-nowrap"
        >ประเภทเอกสาร</label
      >
      <select
        class="select select-bordered select-sm w-44"
        :value="typeOfDoc"
        @change="$emit('update:typeOfDoc', $event.target.value)"
      >
        <option value="all">ทั้งหมด</option>
        <option value="Conference">ประชุมวิชาการ</option>
        <option value="Page_Charge">ตีพิมพ์วารสาร</option>
        <option value="Research_KRIS">ทุนวิจัย</option>
      </select>
    </div>

    <!-- สถานะเอกสาร -->
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-gray-600 whitespace-nowrap"
        >สถานะเอกสาร</label
      >
      <select
        class="select select-bordered select-sm w-36"
        :value="typeStatus"
        @change="$emit('update:typeStatus', $event.target.value)"
      >
        <option value="all">ทั้งหมด</option>
        <option value="waitingApproval">รออนุมัติ</option>
        <option value="approve">อนุมัติ</option>
        <option value="notApproved">ไม่อนุมัติ</option>
        <option value="return">ตีกลับ</option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fiscalYear: { type: Number, required: true },
  typeOfDoc: { type: String, required: true },
  typeStatus: { type: String, required: true },
  baseFiscalYear: { type: Number, required: true },
});

defineEmits(["update:fiscalYear", "update:typeOfDoc", "update:typeStatus"]);
</script>
