<template>
  <div>
  <p class="text-2xl font-bold text-center my-10">สถานะ และประวัติเอกสาร</p>
  <ApprovalSteps 
  v-if="form && form.form_status"
  :status="form.form_status" 
  type="Research_KRIS" />
  <Kris :id="id" />
  <Research :id="id" :type="'Research_KRIS'" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import api from "@/setting/api";

import ApprovalSteps from "@/components/Status/ApprovalSteps.vue";
import Kris from "@/components/form/DataforOffice/Kris.vue";
import Research from "@/components/form/DataforOffice/Research.vue";

const formData = reactive({
  form: "",
});

const route = useRoute();
const id = route.params.id;

const getDataForm = async () => {
  if (id == null || id == "") {
    alert("โปรดเข้าสู่ระบบใหม่อีกครั้ง");
  }
  try {
    const response = await api.get(`/form/kris/${id}`);
    console.log("res kris", response.data)
    formData.form = response.data.form;
  } catch (error) {
    console.log("Error", error);
  }
};

onMounted(() => {
  getDataForm();
});
</script>

<style>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
