<template>
  <div class="container my-10 mx-auto">
    <ConferenceData :id="id" />
    <p class="text-xl font-bold my-5">ตรวจสอบข้อมูลและหลักฐาน</p>
    <Mainbox>
      <SectionWrapper>
        <p>ตรวจหลักฐานตามหลักเกณฑ์ที่กำหนดในประกาศ สจล. และประกาศคณะ</p>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>สำเนาบทความ (Full Paper)</p>
            </div>
            <button
              @click="getFile(formData.f_full_page)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <span class="w-[15rem] flex items-center text-blue-500 mr-2"
                >*กรณีเบิกค่าใช้จ่ายเต็มวงเงิน*</span
              >
              <TextInputLabelLeft
                customInput="max-w-24"
                label="(Full Paper ประกอบการเบิก) มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล WoS/SJR ซึ่งได้รับการตีพิมพ์ไม่เกิน 2 ปี ก่อนการประชุม เมื่อ"
                disabled="true"
                :placeholder="formData.date_journals"
              />
            </div>
            <button
              @click="getFile(formData.f_published_journals)"
              class="btn bg-[#E85F19] text-white mr-5"
              :disabled="!isValidFile(formData.f_published_journals)"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <span class="text-blue-500 mr-2"
                >"*กรณีเบิกค่าใช้จ่ายเต็มวงเงิน*</span
              >
              <p>หลักฐานเอกสาร Quartile ของ Paper ที่ใช้ประกอบการเบิก</p>
            </div>
            <button
              @click="getFile(formData.f_q_proof)"
              class="btn bg-[#E85F19] text-white mr-5"
              :disabled="!isValidFile(formData.f_q_proof)"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>
                เอกสารประชาสัมพันธ์การจัดการประชุมทางวิชาการ (Call for paper)
              </p>
            </div>
            <button
              @click="getFile(formData.f_call_for_paper)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>จดหมายการตอบรับเข้าร่วมประชุม (Accepted)</p>
            </div>
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
            <div class="flex flex-row">
              <p>เอกสารแสดงค่าลงทะเบียน</p>
            </div>
            <button
              @click="getFile(formData.f_fee_receipt)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>เอกสารแสดงอัตราแลกเปลี่ยน (ณ วันที่ยื่น)</p>
            </div>
            <button
              @click="getFile(formData.f_fx_rate_document)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>หลักฐานการประชุมวิชาการอยู่ในฐาน Scopus</p>
            </div>
            <button
              @click="getFile(formData.f_conf_proof)"
              class="btn bg-[#E85F19] text-white mr-5"
            >
              ดูเอกสาร
            </button>
          </div>
        </div>
        <RadioInput
          value="1"
          label="เป็นพนักงานสถาบันที่ปฏิบัติงานมาแล้วไม่เกิน 3 ปีนับตั้งแต่วันบรรจุและยังไม่เคยลาเข้าร่วมประชุมทางวิชาการ ณ ต่างประเทศ"
          v-model="formData.isUnder3YearsNoOverseasConf"
        />
        <textarea
          placeholder="อื่น ๆ"
          class="textarea textarea-bordered w-full"
          @input="handleInput('noteHR', $event.target.value)"
        ></textarea>
      </SectionWrapper>
    </Mainbox>

    <Mainbox>
      <SectionWrapper>
        <p>ตรวจสอบความถูกต้องของข้อมูล</p>
        <RadioInput
          label="ข้อมูลถูกต้อง"
          value="approve"
          name="recheckinfo"
          v-model="formData.radioAuthOffic"
        />
        <RadioInput
          label="ไม่อนุมัติ"
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
      <button @click="OfficerConfer" class="btn btn-success text-white">
        บันทึกข้อมูล
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, requiredIf } from "@vuelidate/validators";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import ConferenceData from "@/components/form/DataforOffice/Conference.vue";

const formData = reactive({
  file: "",
  date_journals: "",
  f_full_page: null,
  f_published_journals: null,
  f_q_proof: null,
  f_call_for_paper: null,
  f_accepted: null,
  f_fee_receipt: null,
  f_fx_rate_document: null,
  f_conf_proof: null,
  isUnder3YearsNoOverseasConf: 0,
  noteHR: "",
  radioAuthOffic: "",
  commentReason: "",
  returnto: "",

  oldData: {},
});

const handleInput = (key, value) => {
  formData[key] = value;
};

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

const getDataConf = async () => {
  if (id == null || id == "") {
    alert("โปรดเข้าสู่ระบบใหม่อีกครั้ง");
  }
  try {
    const responseData = await api.get(`/formConference/${id}`);
    formData.oldData = responseData.data;

    const responsefile = await api.get(`/getFileConf?conf_id=${id}`);
    formData.date_journals = responsefile.data.date_published_journals;
    formData.f_full_page = responsefile.data.file_full_page;
    formData.f_published_journals = responsefile.data.file_published_journals;
    formData.f_q_proof = responsefile.data.file_q_proof;
    formData.f_call_for_paper = responsefile.data.file_call_for_paper;
    formData.f_accepted = responsefile.data.file_accepted;
    formData.f_fee_receipt = responsefile.data.file_fee_receipt;
    formData.f_fx_rate_document = responsefile.data.file_fx_rate_document;
    formData.f_conf_proof = responsefile.data.file_conf_proof;
  } catch (error) {
    console.log("Error", error);
  }
};

const getFile = async (fileUrl) => {
  formData.file = fileUrl;
  window.open(formData.file, "_blank");
};

const isValidFile = (fileUrl) => {
  return fileUrl && !fileUrl.includes("/uploads/null");
};

const router = useRouter(); //path
const route = useRoute(); //params
const id = route.params.id;

const userStore = useUserStore();
const user = computed(() => userStore.user);

const statusMap = {
  approve: "research",
  return_professor: "return",
};

const OfficerConfer = async () => {
  const result = await v$.value.$validate();

  if (result) {
    if (confirm("ยืนยันข้อมูลถูกต้อง") == false) {
      return false;
    }

    if (formData.oldData.form_status != "return" && (!formData.oldData.editor)) {
      try {
        const dataForBackend = {
          hr_id: user.value?.user_id,
          conf_id: id,
          c_hr_result: formData.radioAuthOffic,
          c_hr_reason: formData.commentReason,
          c_hr_note: formData.noteHR,
          hr_doc_submit_date: formData.docSubmitDate,

          user_confer: formData.isUnder3YearsNoOverseasConf,
          form_status:
            statusMap[formData.radioAuthOffic] || formData.radioAuthOffic,
          returnto:
            formData.radioAuthOffic === "return_professor" ? "professor" : null,
          return_note: formData.commentReason || null,
          past_return:
            formData.radioAuthOffic === "return_professor" ? "hr" : null,
        };
        console.log("Data to be sent 1:", dataForBackend);

        await api.post("/opinionConf", dataForBackend);

        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    } else if (formData.oldData.form_status === "return") {
      try {
        const dataForBackend = {
          conf_id: id,
          updated_data: [
            { field: "hr_id", value: user.value?.user_id },
            { field: "c_hr_result", value: formData.radioAuthOffic },
            { field: "c_hr_reason", value: formData.commentReason },
            { field: "c_hr_note", value: formData.noteHR },
            { field: "hr_doc_submit_date", value: formData.docSubmitDate },
          ],
          user_confer: formData.isUnder3YearsNoOverseasConf,
          form_status: formData.radioAuthOffic === "approve" ? formData.oldData?.past_return : formData.radioAuthOffic,
          return_to: null,
          return_note: formData.commentReason || null,
          past_return: null
        };
        console.log("Data to be sent 2:", dataForBackend);

        await api.put(`/opinionConf/${id}`, dataForBackend);

        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    } else if (formData.oldData.form_status !== "return" && formData.oldData.editor) {
      try {
        const dataForBackend = {
          conf_id: id,
          updated_data: [
            { field: "hr_id", value: user.value?.user_id },
            { field: "c_hr_result", value: formData.radioAuthOffic },
            { field: "c_hr_reason", value: formData.commentReason },
            { field: "c_hr_note", value: formData.noteHR },
            { field: "hr_doc_submit_date", value: formData.docSubmitDate },
          ],
          user_confer: formData.isUnder3YearsNoOverseasConf,
          form_status:
            statusMap[formData.radioAuthOffic] || formData.radioAuthOffic,
          return_to:
            formData.radioAuthOffic === "return_professor" ? "professor" : null,
          return_note: formData.commentReason || null,
          past_return:
            formData.radioAuthOffic === "return_professor" ? "hr" : null,
        };
        console.log("Data to be sent 3:", dataForBackend);

        await api.put(`/opinionConf/${id}`, dataForBackend);

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
  await getDataConf();
});
</script>
