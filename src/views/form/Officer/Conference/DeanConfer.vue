<template>
  <div class="container my-10 mx-auto">
    <ConferenceData :id="id" />
    <HR :id="id" />
    <Research :id="id" :type="'Conference'" />
    <FinanceAll :id="id" :type="'Conference'" />
    <Assosiate :id="id" :type="'Conference'" />
    <Mainbox>
      <SectionWrapper>
        <p class="text-lg font-bold">
          เพื่อโปรดทราบการจัดสรรวงเงิน ก่อนการตอบรับบทความจากผู้จัด
        </p>
        <RadioInput label="รับทราบ" value="approve" name="comment" v-model="formData.acknowledge" />
        <RadioInput label="ไม่อนุมัติ" value="notApproved" name="comment" v-model="formData.acknowledge" />
        <RadioInput label="ตีกลับอาจารย์เพื่อแก้ไขข้อมูล" value="return_professor" name="comment"
          v-model="formData.acknowledge" />
        <RadioInput label="ตีกลับเจ้าหน้าที่ทรัพยากรบุคคลเพื่อแก้ไขข้อมูล" value="return_hr" name="comment"
          v-model="formData.acknowledge" />
        <RadioInput label="ตีกลับเจ้าหน้าที่งานวิจัยเพื่อแก้ไขข้อมูล" value="return_research" name="comment"
          v-model="formData.acknowledge" />
        <RadioInput label="ตีกลับเจ้าหน้าที่การเงินเพื่อแก้ไขข้อมูล" value="return_finance" name="comment"
          v-model="formData.acknowledge" />
        <RadioInput label="ตีกลับรองคณบดีเพื่อแก้ไขข้อมูล" value="return_associate" name="comment"
          v-model="formData.acknowledge" />
        <span v-if="v$.acknowledge.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.acknowledge.$errors[0].$message }}
        </span>

        <textarea class="textarea textarea-bordered w-full"
          @input="handleInput('commentReason', $event.target.value)"></textarea>
        <span v-if="v$.commentReason.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.commentReason.$errors[0].$message }}
        </span>
      </SectionWrapper>
    </Mainbox>

    <div class="flex justify-end">
      <button @click="OfficerConfer" class="btn btn-success text-white">
        บันทึกข้อมูล
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, requiredIf } from "@vuelidate/validators";
import { DateTime } from "luxon";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import ConferenceData from "@/components/form/DataforOffice/Conference.vue";
import HR from "@/components/form/DataforOffice/HR.vue";
import Research from "@/components/form/DataforOffice/Research.vue";
import FinanceAll from "@/components/form/DataforOffice/FinanceAll.vue";
import Assosiate from "@/components/form/DataforOffice/Assosiate.vue";

const formData = reactive({
  docSubmitDate: DateTime.now().toISODate(),
  acknowledge: "",
  commentReason: "",
  returnto: ""
});

const handleInput = (key, value) => {
  formData[key] = value;
};

const rules = computed(() => ({
  acknowledge: {
    required: helpers.withMessage("* กรุณาเลือกข้อมูล *", required),
  },
  commentReason: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูล *",
      requiredIf(() => formData.acknowledge !== "approve")
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

// Access route parameters
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const user = computed(() => userStore.user);

const statusMap = {
  approve: "waitingApproval",
  notApproved: "notApproved",
  return_professor: "return",
  return_hr: "return",
  return_research: "return",
  return_finance: "return",
  return_associate: "return",
}

const returnMap = {
  approve: null,
  notApproved: null,
  return_professor: "professor",
  return_hr: "hr",
  return_research: "research",
  return_finance: "finance",
  return_associate: "associate",
}

const resultMap = {
  approve: "approve",
  notApproved: "notApproved",
  return_professor: "return",
  return_hr: "return",
  return_research: "return",
  return_finance: "return",
  return_associate: "return",
}

const OfficerConfer = async () => {
  const result = await v$.value.$validate();

  if (result) {
    if (confirm("ยืนยันข้อมูลถูกต้อง") == false) {
      return false;
    }

    try {
      const dataForBackend = {
        conf_id: id,
        updated_data: [
          { field: 'dean_id', value: user.value?.user_id },
          { field: 'c_dean_result', value: resultMap[formData.acknowledge] },
          { field: 'c_dean_reason', value: formData.commentReason },
          { field: 'dean_doc_submit_date', value: formData.docSubmitDate },
        ],
        form_status: statusMap[formData.acknowledge],
        returnto: returnMap[formData.acknowledge],
        return_note: formData.commentReason || null,
        past_return: statusMap[formData.acknowledge] == 'return' ? user.value?.user_role : null
      };

      console.log(" dataForBackend", dataForBackend)
      await api.put(`/opinionConf/${id}`, dataForBackend);
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      router.push("/officer");
    } catch (error) {
      console.log("Error saving code : ", error);
      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");

    console.log("Validation failed:", v$.value.$errors);
  }
};
</script>
