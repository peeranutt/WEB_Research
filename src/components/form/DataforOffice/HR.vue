<template>
  <div>
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold my-5">ตรวจสอบข้อมูลและหลักฐาน</p>
      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">เอกสารหลักฐานที่แนบ</p>
        <SectionWrapper class="collapse-content">
          <p>ตรวจหลักฐานตามหลักเกณฑ์ที่กำหนดในประกาศ สจล. และประกาศคณะ</p>
          <!-- เอกสารหลักฐานที่แนบ -->
          <!-- 1 -->
          <div class="flex flex-row items-center w-full">
            <div class="flex flex-row items-center w-full justify-between">
              <div class="flex flex-row">
                <p>สำเนาบทความ (Full Paper)</p>
              </div>
              <div class="">
                <button
                  @click="getFile(formData.f_full_page)"
                  class="btn bg-[#E85F19] text-white mr-5"
                >
                  ดูเอกสาร
                </button>
              </div>
            </div>
          </div>
          <!-- 2 -->
          <div class="flex flex-row items-center w-full">
            <div class="flex flex-row items-center w-full justify-between">
              <div class="flex flex-row">
                <span class="w-[15rem] flex items-center text-blue-500 mr-2"
                  >*กรณีเบิกค่าใช้จ่ายเต็มวงเงิน*</span
                >
                <TextInputLabelLeft
                  customInput="max-w-24"
                  label="(Full Paper ประกอบการเบิก) มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล WoS/SJR ซึ่งได้รับการตีพิมพ์ไม่เกิน 2 ปี ก่อนการประชุม เมื่อ"
                  :disabled="true"
                  :placeholder="formData.date_journals"
                />
              </div>
              <div class="">
                <button
                  @click="getFile(formData.f_published_journals)"
                  class="btn bg-[#E85F19] text-white mr-5"
                  disabled="!isValidFile(formData.f_published_journals)"
                >
                  ดูเอกสาร
                </button>
              </div>
            </div>
          </div>
          <!-- 3 -->
          <div class="flex flex-row items-center w-full">
            <div class="flex flex-row items-center w-full justify-between">
              <div class="flex flex-row">
                <span class="text-blue-500 mr-2"
                  >"*กรณีเบิกค่าใช้จ่ายเต็มวงเงิน*</span
                >
                <p>หลักฐานเอกสาร Quartile ของ Paper ที่ใช้ประกอบการเบิก</p>
              </div>
              <div class="">
                <button
                  @click="getFile(formData.f_q_proof)"
                  class="btn bg-[#E85F19] text-white mr-5"
                  disabled="!isValidFile(formData.f_q_proof)"
                >
                  ดูเอกสาร
                </button>
              </div>
            </div>
          </div>
          <!-- 4 -->
          <div class="flex flex-row items-center w-full">
            <div class="flex flex-row items-center w-full justify-between">
              <div class="flex flex-row">
                <p>
                  เอกสารประชาสัมพันธ์การจัดการประชุมทางวิชาการ (Call for paper)
                </p>
              </div>
              <div class="">
                <button
                  @click="getFile(formData.f_call_for_paper)"
                  class="btn bg-[#E85F19] text-white mr-5"
                >
                  ดูเอกสาร
                </button>
              </div>
            </div>
          </div>
          <!-- 5 -->
          <div class="flex flex-row items-center w-full">
            <div class="flex flex-row items-center w-full justify-between">
              <div class="flex flex-row">
                <p>จดหมายการตอบรับเข้าร่วมประชุม (Accepted)</p>
              </div>
              <div class="">
                <button
                  @click="getFile(formData.f_accepted)"
                  class="btn bg-[#E85F19] text-white mr-5"
                >
                  ดูเอกสาร
                </button>
              </div>
            </div>
          </div>
          <!-- 6 -->
          <div class="flex flex-row items-center w-full">
            <div class="flex flex-row items-center w-full justify-between">
              <div class="flex flex-row">
                <p>เอกสารแสดงค่าลงทะเบียน</p>
              </div>
              <div class="">
                <button
                  @click="getFile(formData.f_fee_receipt)"
                  class="btn bg-[#E85F19] text-white mr-5"
                >
                  ดูเอกสาร
                </button>
              </div>
            </div>
          </div>
          <!-- 7 -->
          <div class="flex flex-row items-center w-full">
            <div class="flex flex-row items-center w-full justify-between">
              <div class="flex flex-row">
                <p>เอกสารแสดงอัตราแลกเปลี่ยน (ณ วันที่ยื่น)</p>
              </div>
              <div class="">
                <button
                  @click="getFile(formData.f_fx_rate_document)"
                  class="btn bg-[#E85F19] text-white mr-5"
                >
                  ดูเอกสาร
                </button>
              </div>
            </div>
          </div>
          <!-- 8 -->
          <div class="flex flex-row items-center w-full">
            <div class="flex flex-row items-center w-full justify-between">
              <div class="flex flex-row">
                <p>หลักฐานการประชุมวิชาการอยู่ในฐาน Scopus</p>
              </div>
              <div class="">
                <button
                  @click="getFile(formData.f_conf_proof)"
                  class="btn bg-[#E85F19] text-white mr-5"
                >
                  ดูเอกสาร
                </button>
              </div>
            </div>
          </div>
          <RadioInput
            label="เป็นพนักงานสถาบันที่ปฏิบัติงานมาแล้วไม่เกิน 3 ปีนับตั้งแต่วันบรรจุและยังไม่เคยลาเข้าร่วมประชุมทางวิชาการ ณ ต่างประเทศ"
            :value=1
            v-model="formData.offic.user_confer"
            :disabled="true"
          />
          <textarea
          v-if="formData.offic.c_noteOther != null"
            :placeholder="formData.offic.c_noteOther"
            class="textarea textarea-bordered w-full"
            :disabled="true"
          ></textarea>
        </SectionWrapper>
      </Mainbox>
      <Mainbox v-if="formData.offic.c_hr_result" class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title">ตรวจสอบความถูกต้องของข้อมูล</p>
        <SectionWrapper class="collapse-content">
          <RadioInput
            label="ข้อมูลถูกต้อง"
            value="approve"
            name="redi"
            :disabled="true"
            v-model="formData.offic.c_hr_result"
          />
          <RadioInput
            label="ข้อมูลไม่ถูกต้อง"
            value="notApproved"
            name="redi"
            :disabled="true"
            v-model="formData.offic.c_hr_result"
          />
          <textarea
            class="textarea textarea-bordered w-full"
            :disabled="true"
            :placeholder="formData.offic.c_hr_reason"
          ></textarea>
        </SectionWrapper>
      </Mainbox>
      <Mainbox v-else>
        <p class="font-bold">ตรวจสอบหลักฐานตามหลักเกณฑ์ที่กำหนดในประกาศ ส.จ.ล และประกาศคณะ</p>
        <p>เอกสารอยู่ในขั้นตอนการตรวจสอบ</p>
      </Mainbox>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";

const formData = reactive({
  offic: [],
  file: "",
  name: "",
  date_journals: "",
  //url
  f_full_page: null,
  f_published_journals: null,
  f_q_proof: null,
  f_call_for_paper: null,
  f_accepted: null,
  f_fee_receipt: null,
  f_fx_rate_document: null,
  f_conf_proof: null,
});

const getFile = async (fileUrl) => {
  formData.file = fileUrl;
  window.open(formData.file, "_blank");
};
const isLoading = ref(true);
// Access route parameters
const route = useRoute();
const id = route.params.id;

const fetchOfficerData = async () => {
  try {
    const responsefile = await api.get(`/getFileConf?conf_id=${id}`);
    console.log("responsefile", responsefile.data)
    formData.date_journals = responsefile.data.date_published_journals,
    formData.f_full_page = responsefile.data.file_full_page;
    formData.f_published_journals = responsefile.data.file_published_journals;
    formData.f_q_proof = responsefile.data.file_q_proof;
    formData.f_call_for_paper = responsefile.data.file_call_for_paper;
    formData.f_accepted = responsefile.data.file_accepted;
    formData.f_fee_receipt = responsefile.data.file_fee_receipt;
    formData.f_fx_rate_document = responsefile.data.file_fx_rate_document;
    formData.f_conf_proof = responsefile.data.file_conf_proof;
    
    const responseoffic = await api.get(`/opinionConf/${id}`);
    formData.offic = responseoffic.data;
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchOfficerData();
});
</script>
