<template>
  <div class="container my-10 mx-auto">
    <PageChageData :id="id" />
    <p class="text-xl font-bold my-5">ตรวจสอบข้อมูลและหลักฐาน</p>
    <Mainbox>
      <SectionWrapper>
        <p class="text-lg font-bold">เอกสารหลักฐานที่แนบ</p>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>
                หลักฐานแสดงการอยู่ในฐานข้อมูลสากล ISI หรือ SJR หรือ Scopus หรือ
                Nature
              </p>
            </div>
            <button
              @click="getFile(formData.f_pc_proof)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>
                หลักฐานแสดงการจัดลำดับ Quartile ของฐานข้อมูลสากล ISI หรือ SJR
                หรือ Scopus
              </p>
            </div>
            <button
              @click="getFile(formData.f_q_pc_proof)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>
                ใบแจ้งหนี้ค่าใช้จ่ายสำหรับการตีพิมพ์ /
                อัตราค่าใช้จ่ายที่ประกาศบนหน้าเว็บไซต์
              </p>
            </div>
            <button
              @click="getFile(formData.f_invoice_public)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <p>หลักฐานการส่งบทความ หนังสือตอบรับบทความ</p>
            <button
              @click="getFile(formData.f_accepted)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <p>สำเนาบทความ</p>
            <button
              @click="getFile(formData.f_copy_article)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <p>หลักฐานการ Upload บทความเข้าระบบ IT Scholar</p>
            <button
              @click="getFile(formData.f_upload_article)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
      </SectionWrapper>
    </Mainbox>

    <Mainbox>
      <SectionWrapper>
        <p>ตรวจสอบหลักฐานตามหลักเกณฑ์ที่กำหนดในประกาศ ส.จ.ล และประกาศคณะ</p>
        <div class="flex flex-row w-full justify-start items-center gap-2">
          <RadioInput
            customDiv="max-w-max"
            label="ถูกต้องตามเงื่อนไขการสนับสนุน"
            value="approve"
            name="recheckinfo"
            v-model="formData.radioAuthOffic"
          />
        </div>
        <RadioInput
          label="ไม่ถูกต้อง"
          value="notApproved"
          name="recheckinfo"
          v-model="formData.radioAuthOffic"
        />
        <RadioInput
          label="ตีกลับอาจารย์เพื่อแก้ไขข้อมูล"
          value="return_professor"
          name="recheckinfo"
          v-model="formData.radioAuthOffic"
        />
        <textarea
          class="textarea textarea-bordered w-full"
          @input="handleInput('commentReason', $event.target.value)"
        ></textarea>
        <span
          v-if="v$.radioAuthOffic.$error"
          class="text-base font-bold text-red-500 text-left"
        >
          {{ v$.radioAuthOffic.$errors[0].$message }}
        </span>
        <span
          v-if="v$.commentReason.$error"
          class="text-base font-bold text-red-500 text-left"
        >
          {{ v$.commentReason.$errors[0].$message }}
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
import { reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, requiredIf } from "@vuelidate/validators";
import { DateTime } from "luxon";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import PageChageData from "@/components/form/DataforOffice/PageChage.vue";

const formData = reactive({
  file: "",
  offic: [],
  name: [],
  page_c: [],
  f_pc_proof: null,
  f_q_pc_proof: null,
  f_invoice_public: null,
  f_accepted: null,
  f_copy_article: null,
  f_upload_article: null,
  docSubmitDate: DateTime.now().toISODate(),
  statusForm: "finance",
  radioAuthOffic: "",
  commentReason: "",

  oldData: {},
});

const handleInput = (key, value) => {
  formData[key] = value;
};

const today = DateTime.now().toISODate();

const maxDateToday = (condition) =>
  helpers.withMessage("* วันที่ต้องไม่เกินวันนี้ *", (value) => {
    if (!condition()) return true;
    if (!value) return true;

    return DateTime.fromISO(value) <= DateTime.fromISO(today);
  });

const rules = computed(() => ({
  radioAuthOffic: {
    required: helpers.withMessage("* กรุณาเลือกข้อมูล *", required),
  },
  commentReason: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูล *",
      requiredIf(() => formData.radioAuthOffic !== "approve")
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

const getDataPc = async () => {
  if (id == null || id == "") {
    alert("โปรดเข้าสู่ระบบใหม่อีกครั้ง");
  }
  try {
    const responseData = await api.get(`/formPageCharge/${id}`);
    formData.oldData = responseData.data;

    const responsefile = await api.get(`/getFilepage_c?pageC_id=${id}`);
    formData.f_pc_proof = responsefile.data.file_pc_proof;
    formData.f_q_pc_proof = responsefile.data.file_q_pc_proof;
    formData.f_invoice_public = responsefile.data.file_invoice_public;
    formData.f_accepted = responsefile.data.file_accepted;
    formData.f_copy_article = responsefile.data.file_copy_article;
    formData.f_upload_article = responsefile.data.file_upload_article;
  } catch (error) {
    console.log("Error", error);
  }
};

const getFile = async (fileUrl) => {
  formData.file = fileUrl;
  window.open(formData.file, "_blank");
};

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const user = computed(() => userStore.user);

const statusMap = {
  approve: "finance",
  return_professor: "return",
};

const OfficerPC = async () => {
  const result = await v$.value.$validate();

  if (result) {
    if (confirm("ยืนยันข้อมูลถูกต้อง") == false) {
      return false;
    }

    if (formData.oldData.form_status != "return" && (!formData.oldData.editor)) {
      console.log("case 1 : ", formData.oldData.form_status, formData.oldData.editor);
      try {
        const dataForBackend = {
          research_id: user.value?.user_id,
          pageC_id: id,
          p_research_result: formData.radioAuthOffic,
          p_research_reason: formData.commentReason,
          research_doc_submit_date: formData.docSubmitDate,

          form_status: statusMap[formData.radioAuthOffic] || formData.radioAuthOffic,
          returnto: formData.radioAuthOffic === "return_professor" ? "professor" : null,
          return_note: formData.commentReason || null,
          past_return: formData.radioAuthOffic === "return_professor" ? "research" : null,
        };

        await api.post(`/opinionPC`, dataForBackend);

        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    } else if (formData.oldData.form_status == "return") {
      console.log("case 2 : ", formData.oldData.form_status, formData.oldData.editor);
      try {
        const dataForBackend = {
          pageC_id: id,
          updated_data: [
            { field: "research_id", value: user.value?.user_id },
            { field: "p_research_result", value: formData.radioAuthOffic },
            { field: "p_research_reason", value: formData.commentReason },
            { field: "research_doc_submit_date", value: formData.docSubmitDate },
          ],
          form_status: formData.radioAuthOffic === "approve" ? formData.oldData?.past_return : formData.radioAuthOffic,
          return_to: null,
          return_note: formData.commentReason || null,
          past_return: null
        };

        await api.put(`/opinionPC/${id}`, dataForBackend);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    } else if (formData.oldData.form_status !== "return" && formData.oldData.editor) {
      console.log("case 3 : ", formData.oldData.form_status, formData.oldData.editor);
      try {
        const dataForBackend = {
          pageC_id: id,
          updated_data: [
            { field: "research_id", value: user.value?.user_id },
            { field: "p_research_result", value: formData.radioAuthOffic },
            { field: "p_research_reason", value: formData.commentReason },
            { field: "research_doc_submit_date", value: formData.docSubmitDate },
          ],
          form_status: statusMap[formData.radioAuthOffic] || formData.radioAuthOffic,
          return_to: formData.radioAuthOffic === "return_professor" ? "professor" : null,
          return_note: formData.commentReason || null,
          past_return: formData.radioAuthOffic === "return_professor" ? "research" : null,
        };

        console.log("dataForBackend : ", dataForBackend);

        await api.put(`/opinionPC/${id}`, dataForBackend);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");

    console.log("Validation failed:", v$.value.$errors);
  }
};

onMounted(async () => {
  await getDataPc();
});
</script>
