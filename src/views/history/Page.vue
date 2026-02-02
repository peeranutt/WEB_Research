<template>
  <p class="text-2xl font-bold text-center my-10">สถานะ และประวัติเอกสาร</p>
  <ApprovalSteps :status="formData.form.form_status" type="Page_Charge" />
  <PageChageData :id="id" />
  <Research :id="id" :type="'Page_Charge'" />
  <FinanceAll :id="id" :type="'Page_Charge'" />
  <Assosiate :id="id" :type="'Page_Charge'" />
  <Dean :id="id" :type="'Page_Charge'" />
  <WithdrawMoney :id="id" :type="'Page_Charge'" />

  <div class="container my-10 mx-auto" v-if="formData.status.form_status === 'waitingApproval'">
    <Mainbox>
      <p class="text-m font-bold">ตรวจสอบเอกสาร และข้อมูลการอนุมัติ</p>
      <div class="px-2 py-2">
        <RadioInput label="เอกสารได้รับการอนุมัติจาก E-Office" value="approve" name="eoffice"
          v-model="formData.new.form_status" />
      </div>
      <div class="px-2 pb-2">
        <RadioInput label="เอกสารไม่ได้รับการอนุมัติจาก E-Office" value="notApproved" name="eoffice"
          v-model="formData.new.form_status" />
      </div>
      <div class="px-2 pb-2">
        <RadioInput label="ตีกลับเอกสาร" value="return" name="eoffice" v-model="formData.new.form_status" />
      </div>
      <span v-if="v$.new.form_status.$error" class="text-base font-bold text-red-500 text-left">
        {{ v$.new.form_status.$errors[0].$message }}
      </span>
      <div class="px-10 pb-2">
        <RadioInput label="ผู้ยื่นขอรับการสนับสนุน" value="professor" name="return" v-model="formData.new.return"
          :disabled="formData.new.form_status !== 'return'" />
      </div>
      <div class="px-10 pb-2">
        <RadioInput label="เจ้าหน้าที่การเงิน" value="finance" name="return" v-model="formData.new.return"
          :disabled="formData.new.form_status !== 'return'" />
      </div>
      <div class="px-10 pb-2">
        <RadioInput label="รองคณบดี" value="associate" name="return" v-model="formData.new.return"
          :disabled="formData.new.form_status !== 'return'" />
      </div>
      <div class="px-10 pb-2">
        <RadioInput label="คณบดี" value="dean" name="return" v-model="formData.new.return"
          :disabled="formData.new.form_status !== 'return'" />
      </div>
      <span v-if="v$.new.return.$error" class="text-base font-bold text-red-500 text-left">
        {{ v$.new.return.$errors[0].$message }}
      </span>
      <div class="px-10 pb-2">
        <textarea class="textarea textarea-bordered w-full" v-model="formData.new.description"
          :disabled="formData.new.form_status !== 'return'"></textarea>
        <span v-if="v$.new.description.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.new.description.$errors[0].$message }}
        </span>
      </div>

      <div class="flex justify-end">
        <button @click="SummitStatus" class="btn btn-success text-white">
          อัปเดตสถานะเอกสาร
        </button>
      </div>
    </Mainbox>
  </div>

  <div class="flex flex-row container my-10 mx-auto gap-3 justify-end">
    <div v-if="
      formData.form.form_status == 'waitingApproval' ||
      formData.form.form_status == 'approve'
    " class="flex no-print">
      <router-link :to="`/pdf/pageCharge/${id}`">
        <button class="btn text-white bg-[#4285F4] hover:bg-[#4285F4]">
          พิมพ์แบบฟอร์ม
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import api from "@/setting/api";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, requiredIf } from "@vuelidate/validators";

import ApprovalSteps from "@/components/Status/ApprovalSteps.vue";
import PageChageData from "@/components/form/DataforOffice/PageChage.vue";
import Research from "@/components/form/DataforOffice/Research.vue";
import FinanceAll from "@/components/form/DataforOffice/FinanceAll.vue";
import Assosiate from "@/components/form/DataforOffice/Assosiate.vue";
import Dean from "@/components/form/DataforOffice/Dean.vue";
import WithdrawMoney from "@/components/form/DataforOffice/WithdrawMoney.vue";
import Mainbox from "@/components/form/Mainbox.vue";
import RadioInput from "@/components/Input/RadioInput.vue";

// Access route parameters
const route = useRoute();
const id = route.params.id;

const formData = reactive({
  form: [],
  status: [],
  new: {
    form_status: "",
    return: null,
    description: null,
  },
});

watch(
  () => formData.new.form_status,
  (newVal) => {
    if (newVal !== "return") {
      formData.new.return = "";
    }
  }
);

const rules = computed(() => ({
  new: {
    form_status: {
      required: helpers.withMessage("* กรุณาเลือกข้อมูล *", required),
    },
    return: {
      required: helpers.withMessage(
        "* กรุณาเลือกข้อมูล *",
        requiredIf(() => formData.new.form_status === "return")
      ),
    },
    description: {
      required: helpers.withMessage(
        "* กรุณากรอกข้อมูล *",
        requiredIf(() => formData.new.form_status === "return")
      ),
    },
  },
}));

const v$ = useVuelidate(rules, formData);

const getDataPc = async () => {
  const response = await api.get(`/form/Pc/${id}`);
  formData.form = response.data.form;
};

const getStatus = async () => {
  const response = await api.get(`/formPageCharge/${id}`);
  formData.status = response.data;
};

const SummitStatus = async () => {
  const result = await v$.value.$validate();

  if (result) {
    try {
      const dataForBackend = {
        form_status: formData.new.form_status,
        return: formData.new.return ? formData.new.return : null,
        description: formData.new.description ? formData.new.description : null,
      };

      const response = await api.put(`/updatestatus_pageC/${id}`, dataForBackend);
      alert("อัปเดตสถานะเอกสารสำเร็จ");

      location.reload();
    } catch (error) {
      console.error("Error saving code:", error);
      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");
  }
};

onMounted(() => {
  getDataPc();
  getStatus();
});
</script>

<style>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
