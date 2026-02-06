<template>
  <div class="container my-10 mx-auto">
    <PageChageData :id="id" />
    <Research :id="id" :type="'Page_Charge'" />
    <FinanceAll :id="id" :type="'Page_Charge'" />
    <Assosiate :id="id" :type="'Page_Charge'" />
    <Mainbox>
      <SectionWrapper>
        <p class="text-lg font-bold">
          เรียน คณบดีคณะเทคโนโลยีสารสนเทศ (ครั้งที่ 1)
        </p>
        <p class="text-base mt-1">
          เพื่อโปรดทราบการจัดสรรวงเงิน ก่อนการตอบรับบทความ
        </p>
        <RadioInput label="รับทราบ" value="acknowledge" v-model="formData.acknowledge" />
        <RadioInput label="ไม่รับทราบ" value="notAcknowledge" v-model="formData.acknowledge" />
        <!-- <span v-if="v$.acknowledge.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.acknowledge.$errors[0].$message }}
        </span> -->
      </SectionWrapper>
    </Mainbox>

    <Mainbox>
      <SectionWrapper>
        <p class="text-lg font-bold">
          เรียน คณบดีคณะเทคโนโลยีสารสนเทศ (ครั้งที่ 2)
        </p>
        <!-- <p class="text-base mt-1">
          ขณะนี้บทความได้รับการตอบรับแล้ว (Letter of acceptance) เมื่อวันที่
          <b>{{ formatThaiDate(formData.offic.p_date_accepted_approve) }} </b>
          ตามหลักฐานที่แนบจึงเรียนมาเพื่อโปรดพิจารณา
        </p> -->
        <RadioInput label="อนุมัติ" value="approve" name="comment" v-model="formData.radioAuthOffic" />
        <RadioInput label="ไม่อนุมัติ" value="notApproved" name="comment" v-model="formData.radioAuthOffic" />
        <RadioInput label="ตีกลับอาจารย์เพื่อแก้ไขข้อมูล" value="return_professor" name="comment"
          v-model="formData.radioAuthOffic" />
        <RadioInput label="ตีกลับเจ้าหน้าที่งานวิจัยเพื่อแก้ไขข้อมูล" value="return_research" name="comment"
          v-model="formData.radioAuthOffic" />
        <RadioInput label="ตีกลับเจ้าหน้าที่การเงินเพื่อแก้ไขข้อมูล" value="return_finance" name="comment"
          v-model="formData.radioAuthOffic" />
        <RadioInput label="ตีกลับรองคณบดีเพื่อแก้ไขข้อมูล" value="return_associate" name="comment"
          v-model="formData.radioAuthOffic" />
        <TextArea label="เนื่องจาก" @input="handleInput('reason', $event.target.value)" />

        <span v-if="v$.radioAuthOffic.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.radioAuthOffic.$errors[0].$message }}
        </span>

        <span v-if="v$.reason.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.reason.$errors[0].$message }}
        </span>
      </SectionWrapper>
    </Mainbox>

    <div class="flex justify-end">
      <button @click="OfficerPC" class="btn btn-success text-white">
        บันทึกข้อมูล
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, requiredIf } from "@vuelidate/validators";
import { DateTime } from "luxon";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import TextArea from "@/components/Input/TextArea.vue";
import PageChageData from "@/components/form/DataforOffice/PageChage.vue";
import Research from "@/components/form/DataforOffice/Research.vue";
import FinanceAll from "@/components/form/DataforOffice/FinanceAll.vue";
import Assosiate from "@/components/form/DataforOffice/Assosiate.vue";

const formData = reactive({
  offic: [],
  docSubmitDate: DateTime.now().toISODate(),
  formStatus: "",
  acknowledge: "",
  radioAuthOffic: "",
  reason: "",
  returnto: ""
});

const formatThaiDate = (dateString) => {
  if (!dateString) return "ไม่พบวันที่";

  const date = new Date(dateString);
  const months = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear() + 543;
  return `${day} ${month} ${year}`;
};

const handleInput = (key, value) => {
  formData[key] = value;
};

// Access route parameters
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const user = computed(() => userStore.user);

// ตัวแปรสำหรับเก็บข้อมูลจาก backend
const fetchProfessorData = async () => {
  try {
    const responseoffic = await api.get(`/opinionPC/${id}`);
    formData.offic = responseoffic.data;
  } catch (error) {
    console.log("Error fetching professor data:", error);
  }
};

const rules = computed(() => ({
  // acknowledge: {
  //   required: helpers.withMessage("* กรุณาเลือกข้อมูล *", required),
  // },
  radioAuthOffic: {
    required: helpers.withMessage("* กรุณาเลือกข้อมูล *", required),
  },
  reason: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูล *",
      requiredIf(() => formData.radioAuthOffic !== "approved")
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

const statusMap = {
  approve: "waitingApproval",
  notApproved: "notApproved",
  return_professor: "return",
  return_research: "return",
  return_finance: "return",
  return_associate: "return",
}

const returnMap = {
  approve: null,
  notApproved: null,
  return_professor: "professor",
  return_research: "research",
  return_finance: "finance",
  return_associate: "associate",
}

const resultMap = {
  approve: "approve",
  notApproved: "notApproved",
  return_professor: "return",
  return_research: "return",
  return_finance: "return",
  return_associate: "return",
}

const OfficerPC = async () => {
  const result = await v$.value.$validate();

  if (result) {
    if (confirm("ยืนยันข้อมูลถูกต้อง") == false) {
      return false;
    }

    try {
      const dataForBackend = {
        pageC_id: id,
        updated_data: [
          { field: 'dean_id', value: user.value?.user_id },
          { field: 'p_dean_acknowledge', value: formData.acknowledge || null },
          { field: 'p_dean_result', value: resultMap[formData.radioAuthOffic] },
          { field: 'p_dean_reason', value: formData.reason },
        ],
        form_status: statusMap[formData.radioAuthOffic],
        returnto: returnMap[formData.radioAuthOffic],
        return_note: formData.reason || null,
        past_return: statusMap[formData.radioAuthOffic] == 'return' ? user.value?.user_role : null
      };

      await api.put(`/opinionPC/${id}`, dataForBackend);
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

onMounted(async () => {
  await fetchProfessorData();
});
</script>
