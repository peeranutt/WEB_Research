<template>
  <div class="container my-10 mx-auto">
    <p class="text-xl font-bold mb-5">
      ขออนุมัติค่า Page Charge เพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
    </p>
    <Mainbox>
      <SectionWrapper>
        <TextInputLabelLeft label="ชื่อ" customLabel="w-2/12 text-lg font-bold" :disabled="true"
          v-model="formData.user.user_nameth" />
        <TextInputLabelLeft label="ตำแหน่ง" customLabel="w-2/12 text-lg font-bold"
          v-model="formData.user.user_positionth" :disabled="true" />
        <div class="flex flex-row">
          <TextInputLabelLeft label="มีรายชื่ออยู่ใน List ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่"
            customLabel="w-auto" customInput="max-w-max" customDiv="max-w-max" v-model="formData.pageChange.pageC_times"
            :class="isFieldEdited('pageC_times') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="วันที่" type="date" customLabel="ml-2 w-10" customInput="max-w-max"
            v-model="formData.pageChange.pageC_days" :class="isFieldEdited('pageC_days') ? 'text-red-500' : ''" />
        </div>
        <p class="text-blue-500 text-sm">
          สามารถตรวจสอบรายชื่อ List ของคณะได้ที่เว็บไซต์คณะที่ Share
          online-การวิจัย และ
          <a href="https://erp.it.kmitl.ac.th/journal_conf_list">https://erp.it.kmitl.ac.th/journal_conf_list</a>
        </p>
      </SectionWrapper>
    </Mainbox>
    <!-- 1.  รายละเอียดวารสารที่ส่งเสนอพิจารณา / การตอบรับให้ลงตีพิมพ์  -->
    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title leading-9 text-lg font-bold">
        1.  รายละเอียดวารสารที่ส่งเสนอพิจารณา / การตอบรับให้ลงตีพิมพ์
      </p>
      <SectionWrapper class="collapse-content">
        <TextInputLabelLeft label="ชื่อวารสาร" name="Input" customLabel="w-24"
          v-model="formData.pageChange.journal_name" :class="isFieldEdited('journal_name') ? 'text-red-500' : ''" />
        <p>เป็นวารสารที่อยู่ในฐานข้อมูลสากล</p>

        <div class="flex flex-row">
          <CheckInput label="ISI ได้รับการจัดลำดับ Quartile " value="ISI" customDiv="max-w-72 flex items-center"
            v-model="formData.pageChange.quality_journal"
            :class="isFieldEdited('quality_journal') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="ปี" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
            v-model="formData.pageChange.pc_isi_year" :class="isFieldEdited('pc_isi_year') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="ลำดับ Quartile" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
            v-model="formData.pageChange.qt_isi" :class="isFieldEdited('qt_isi') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="Impact Factor" customLabel="w-28 mx-2" customInput="max-w-max"
            customDiv="max-w-max" v-model="formData.pageChange.impact_factor"
            :class="isFieldEdited('impact_factor') ? 'text-red-500' : ''" />
        </div>

        <div class="flex flex-row">
          <CheckInput label="SJR ได้รับการจัดลำดับ Quartile " value="SJR" customDiv="max-w-72 flex items-center"
            v-model="formData.pageChange.quality_journal"
            :class="isFieldEdited('quality_journal') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="ปี" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
            v-model="formData.pageChange.pc_sjr_year" :class="isFieldEdited('pc_sjr_year') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="ลำดับ Quartile" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
            v-model="formData.pageChange.qt_sjr" :class="isFieldEdited('qt_sjr') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="SJR Score" customLabel="w-28 mx-2" customInput="max-w-max" customDiv="max-w-max"
            v-model="formData.pageChange.sjr_score" :class="isFieldEdited('sjr_score') ? 'text-red-500' : ''" />
        </div>

        <div class="flex flex-row">
          <CheckInput label="Scopus ได้รับการจัดลำดับ Quartile " value="Scopus" customDiv="max-w-72 flex items-center"
            v-model="formData.pageChange.quality_journal"
            :class="isFieldEdited('quality_journal') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="ปี" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
            v-model="formData.pageChange.pc_scopus_year"
            :class="isFieldEdited('pc_scopus_year') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="ลำดับ Quartile" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
            v-model="formData.pageChange.qt_scopus" :class="isFieldEdited('qt_scopus') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="Cite Score" customLabel="w-28 mx-2" customInput="max-w-max" customDiv="max-w-max"
            v-model="formData.pageChange.cite_score" :class="isFieldEdited('cite_score') ? 'text-red-500' : ''" />
        </div>

        <div class="flex flex-row">
          <CheckInput label="Nature" value="nature" customDiv="max-w-72 flex items-center"
            v-model="formData.pageChange.quality_journal"
            :class="isFieldEdited('quality_journal') ? 'text-red-500' : ''" />
        </div>
        <label class="form-control">
          <div class="flex flex-row">
            <TextInputLabelLeft label="วงเงินตามเกณฑ์การให้การสนับสนุนไม่เกิน" customLabel="w-auto mx-2"
              customInput="max-w-max" customDiv="max-w-max" v-model="formData.pageChange.support_limit"
              :class="isFieldEdited('support_limit') ? 'text-red-500' : ''" />
            <span class="flex items-center">บาท</span>
          </div>
        </label>
      </SectionWrapper>
    </Mainbox>

    <!-- 2. รายละเอียดผลงานวิจัยที่ส่งเสนอพิจารณา / ได้รับการตอบรับให้ตีพิมพ์ -->
    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title leading-9 text-lg font-bold">
        2. รายละเอียดผลงานวิจัยที่ส่งเสนอพิจารณา / ได้รับการตอบรับให้ตีพิมพ์
      </p>
      <SectionWrapper class="collapse-content">
        <TextInputLabelLeft label="ชื่อบทความ" customLabel="w-auto min-w-fit"
          v-model="formData.pageChange.article_title" :class="isFieldEdited('article_title') ? 'text-red-500' : ''" />
        <TextInputLabelLeft label="จำนวนนักวิจัยร่วม" customLabel="w-[10%]"
          v-model="formData.pageChange.num_co_researchers" />
        <div v-for="(index) in parseInt(formData.pageChange.num_co_researchers) || 0" :key="index">
          <div class="flex flex-row gap-4">
            <p class="pt-2">{{ index }}.</p>
            <TextInputLabelLeft label="ชื่อ-นามสกุลของนักวิจัยร่วม" customLabel="w-[100%]" customDiv="max-w-[30%]"
              v-model="formData.pageChange.name_co_researchers[index]" />
            <TextInputLabelLeft label="หลักสูตรของนักวิจัยร่วม" customLabel="w-[100%]" customDiv="max-w-[25%]"
              v-model="formData.pageChange.course_co_researchers[index]" />
          </div>
        </div>
        <p>กำหนดการที่คาดว่าจะได้รับการลงตีพิมพ์ในวารสาร</p>
        <div class="flex flex-row mt-2 justify-between">
          <TextInputLabelLeft label="ปีที่ (Vol.)" customLabel="w-auto min-w-fit" customDiv="max-w-fit"
            v-model="formData.pageChange.vol_journal" :class="isFieldEdited('vol_journal') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="ฉบับที่ (Issue)" customLabel="w-auto min-w-fit" customDiv="max-w-fit"
            v-model="formData.pageChange.issue_journal" :class="isFieldEdited('issue_journal') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="เดือน" customLabel="w-auto min-w-fit" customDiv="max-w-fit"
            v-model="formData.pageChange.month" :class="isFieldEdited('month') ? 'text-red-500' : ''" />
          <div class="flex flex-row">
            <TextInputLabelLeft label="ปี ค.ศ./พ.ศ." customLabel="w-auto min-w-fit" customDiv="max-w-fit"
              v-model="formData.pageChange.year" :class="isFieldEdited('year') ? 'text-red-500' : ''" />
            <TextInputLabelLeft label="เลขที่ ISSN/ISBN (อื่นๆ)" customLabel="w-auto min-w-fit" customDiv="max-w-fit"
              v-model="formData.pageChange.ISSN_ISBN" :class="isFieldEdited('ISSN_ISBN') ? 'text-red-500' : ''" />
          </div>
        </div>

        <div class="flex flex-row mt-4 justify-between">
          <TextInputLabelLeft label="วันที่ส่งบทความไปยังสำนักพิมพ์เจ้าของวารสาร" type="date"
            customLabel="w-auto min-w-fit" customDiv="max-w-fit" v-model="formData.pageChange.submission_date"
            :class="isFieldEdited('submission_date') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="วันประกาศผลการพิจารณา" type="date" customLabel="w-auto min-w-fit"
            customDiv="max-w-fit" v-model="formData.pageChange.date_review_announce"
            :class="isFieldEdited('date_review_announce') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="วันสุดท้ายของการจ่ายค่าตีพิมพ์" type="date" customLabel="w-auto min-w-fit"
            customDiv="max-w-fit" v-model="formData.pageChange.final_date"
            :class="isFieldEdited('final_date') ? 'text-red-500' : ''" />
        </div>

        <SectionWrapper>
          <div class="flex flex-row mt-3">
            <p class="flex text-blue-500 w-12 items-center">(ถ้ามี)</p>
            <TextInputLabelLeft label="บทความวิจัยนี้เป็นผลงานจากโครงการวิจัยเรื่อง" customLabel="w-auto min-w-fit"
              customDiv="max-w-fit" v-model="formData.pageChange.article_research_ject" :class="isFieldEdited('article_research_ject') ? 'text-red-500' : ''
                " />
          </div>
          <p>ประเภทโครงการวิจัย</p>
          <div class="flex flex-row ml-5">
            <RadioInput label="วิจัยพื้นฐาน" value="basic" name="type" customDiv="max-w-fit mr-10 flex items-center"
              v-model="formData.pageChange.research_type"
              :class="isFieldEdited('research_type') ? 'text-red-500' : ''" />
            <RadioInput label="วิจัยประยุกต์" value="applied" name="type" customDiv="max-w-fit mr-10 flex items-center"
              v-model="formData.pageChange.research_type"
              :class="isFieldEdited('research_type') ? 'text-red-500' : ''" />
            <RadioInput label="วิจัยและพัฒนา" value="research&development" name="type"
              customDiv="max-w-fit mr-10 flex items-center" v-model="formData.pageChange.research_type"
              :class="isFieldEdited('research_type') ? 'text-red-500' : ''" />
            <div class="flex flex-row">
              <RadioInput label="วิจัยอื่น ๆ " value="วิจัยother" name="type"
                customDiv="max-w-fit mr-2 flex items-center" v-model="formData.pageChange.research_type"
                :class="isFieldEdited('research_type') ? 'text-red-500' : ''" />
              <TextInputLabelLeft v-if="formData.pageChange.research_type == 'วิจัยother '" label="(ระบุ)" name="type"
                customDiv="max-w-fit flex items-center" v-model="formData.pageChange.research_type2"
                :class="isFieldEdited('research_type2') ? 'text-red-500' : ''" />
            </div>
          </div>

          <TextInputLabelLeft label="ชื่อแหล่งทุนวิจัย" customLabel="w-auto min-w-fit"
            v-model="formData.pageChange.name_funding_source"
            :class="isFieldEdited('name_funding_source') ? 'text-red-500' : ''" />
          <div class="flex flex-row">
            <TextInputLabelLeft label="วงเงินงบประมาณการวิจัย" customLabel="w-auto min-w-fit"
              customDiv="max-w-max mr-10" v-model="formData.pageChange.budget_limit"
              :class="isFieldEdited('budget_limit') ? 'text-red-500' : ''" />
            <TextInputLabelLeft label="ประจำปี" customLabel="w-auto min-w-fit" customDiv="max-w-max mr-10"
              v-model="formData.pageChange.annual" :class="isFieldEdited('annual') ? 'text-red-500' : ''" />
          </div>
        </SectionWrapper>
      </SectionWrapper>
    </Mainbox>
    <!-- 3. ผู้ขอรับการสนับสนุน -->
    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title text-lg font-bold">3. ผู้ขอรับการสนับสนุน</p>
      <SectionWrapper class="collapse-content">
        <RadioInput label="ผู้ประพันธ์อันดับแรก First Author" value="First Author" name="Author"
          v-model="formData.pageChange.presenter_type" :class="isFieldEdited('presenter_type') ? 'text-red-500' : ''" />
        <RadioInput label="ผู้ประพันธ์บรรณกิจ Corresponding Author" value="Corresponding Author"
          v-model="formData.pageChange.presenter_type" :class="isFieldEdited('presenter_type') ? 'text-red-500' : ''" />
      </SectionWrapper>
    </Mainbox>
    <!-- 4. ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge) -->
    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title leading-9 text-lg font-bold">
        4. ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge)
      </p>
      <SectionWrapper class="collapse-content">
        <TextInputLabelLeft label="จำนวนเงิน" customLabel="w-auto min-w-fit" customInput="max-w-fit"
          v-model="formData.pageChange.request_support"
          :class="isFieldEdited('request_support') ? 'text-red-500' : ''" />
      </SectionWrapper>
    </Mainbox>

    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title text-lg font-bold">เอกสารหลักฐานที่แนบ</p>
      <SectionWrapper class="collapse-content">
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>
                หลักฐานแสดงการอยู่ในฐานข้อมูลสากล ISI หรือ SJR หรือ Scopus
                หรือ Nature
              </p>
            </div>
            <div>
              <button @click="getFile(formData.file.file_pc_proof)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'pc_proof')" class="hidden" ref="pc_proof" />
              <button @click="$refs.pc_proof.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
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
            <div>
              <button @click="getFile(formData.file.file_q_pc_proof)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'q_pc_proof')" class="hidden" ref="q_pc_proof" />
              <button @click="$refs.q_pc_proof.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
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
            <div>
              <button @click="getFile(formData.file.file_invoice_public)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'invoice_public')" class="hidden" ref="invoice_public" />
              <button @click="$refs.invoice_public.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>หลักฐานการส่งบทความ หนังสือตอบรับบทความ</p>
            </div>
            <div>
              <button @click="getFile(formData.file.file_accepted)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'accepted')" class="hidden" ref="accepted" />
              <button @click="$refs.accepted.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>สำเนาบทความ</p>
            </div>
            <div>
              <button @click="getFile(formData.file.file_copy_article)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'copy_article')" class="hidden" ref="copy_article" />
              <button @click="$refs.copy_article.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>หลักฐานการ Upload บทความเข้าระบบ IT Scholar</p>
            </div>
            <div>
              <button @click="getFile(formData.file.file_upload_article)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'upload_article')" class="hidden" ref="upload_article" />
              <button @click="$refs.upload_article.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Mainbox>
    <div class="flex justify-end gap-4 mb-70">
      <button @click="handleSubmit" class="btn btn-success text-white">
        ยืนยัน
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRaw, computed } from "vue";
import { useUserStore } from "@/store/userStore";
import { useRouter, useRoute } from "vue-router";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import CheckInput from "@/components/Input/CheckInput.vue";
import FileInput from "@/components/Input/FileInput.vue";

// จัดการข้อมูลหลัก
const formData = reactive({
  pageChange: {},
  originPc: {},
  user: [],
  editForm: [],

  check: [],
  checkISI: "",
  checkSJR: "",
  checkScopus: "",
  nature: "",

  file: {},
  originFile: {},

  f_pc_proof: null,
  f_q_pc_proof: null,
  f_invoice_public: null,
  f_accepted: null,
  f_copy_article: null,
  f_upload_article: null,

  pc_proof: null,
  q_pc_proof: null,
  invoice_public: null,
  accepted: null,
  copy_article: null,
  upload_article: null,
});

const userStore = useUserStore();
const user = computed(() => userStore.user);

//isLoading เพื่อแสดงสถานะว่ากำลังโหลดข้อมูล
const isLoading = ref(true);
// Access route parameters
const router = useRouter();
const route = useRoute();
const id = route.params.id;
console.log("params.id", id);

const onFileChange = (event, field) => {
  const file = event.target.files[0];
  if (file) {
    formData.file[field] = file;
  }
  console.log("edit formData[field]", field)
  console.log("edit file", file)
  console.log(formData)
}

const getChangedFields = () => {
  const current = toRaw(formData.pageChange);
  const originalPageChange = formData.originPc;
  const changedFields = [];
  console.log("changedFields", changedFields);
  console.log("current", current);
  console.log("originalPageChange", originalPageChange);
  for (const key in current) {
    if (current[key] !== originalPageChange[key]) {
      changedFields.push({
        field: key,
        oldValue: originalPageChange[key],
        newValue: current[key],
      });
    }
  }
  return changedFields;
};

const getChangedFieldsFile = () => {
  const current = toRaw(formData.file);
  const originalFile = formData.originFile;
  const changedFields = [];
  console.log("current file", current);
  console.log("ori file", originalFile);
  for (const key in current) {
    if (JSON.stringify(current[key]) !== JSON.stringify(originalFile[key])) {
      changedFields.push({
        field: key,
        oldValue: originalFile[key],
        newValue: current[key],
      });
    }
  }
  return changedFields;
};

const handleSubmit = async () => {
  const changed = getChangedFields();
  const changedFile = getChangedFieldsFile();

  if (changed.length === 0 && changedFile.length === 0) {
    alert("ไม่มีการเปลี่ยนแปลงข้อมูล");
    return;
  }
  console.log("ฟิลด์ที่ถูกแก้ไข:", changed);
  console.log("ฟิลด์ที่ถูกแก้ไข changedFile:", changedFile);

  const formData = new FormData();
  formData.append("pageC_id", id);
  formData.append("edit_data", JSON.stringify(changed));
  formData.append("editor", userStore.user.user_nameth);
  formData.append("professor_reedit", true);

  // แนบไฟล์จริง
  changedFile.forEach((item) => {
    if (item.newValue instanceof File) {
      formData.append(item.field, item.newValue);
    }
  });

  try {
    console.log("dataForBackend: ", formData);
    await api.put(`/editedFormPageChage/${id}`, formData);
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
    router.push("/myHistory");
  } catch (error) {
    console.log("Error saving code : ", error);
    alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
  }
};

const getFile = async (fileUrl) => {
  formData.file = fileUrl;
  window.open(formData.file, "_blank");
};

// ตัวแปรสำหรับเก็บข้อมูลจาก backend
const fetchProfessorData = async () => {
  try {
    const responsePC = await api.get(`/page_charge/${id}`);
    const userID = responsePC.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    formData.user = responseUser.data;

    formData.pageChange = responsePC.data;
    formData.originPc = JSON.parse(JSON.stringify(responsePC.data));
    console.log("pageChange", formData.pageChange);
    formData.check = formData.pageChange.quality_journal;
    const resEdit = await api.get(`/form/${userID}`);
    console.log("data", resEdit.data);
    for (let i = 0; i < resEdit.data.length; i++) {
      console.log("have edit ja", i);
      if (
        resEdit.data[i].form_type == "Page_Charge" &&
        resEdit.data[i].pageC_id == id
      ) {
        console.log("have edit ja", resEdit.data[i]);
        formData.status = resEdit.data[i].form_status;
        formData.editForm.push(resEdit.data[i].edit_data);
      }
    }
    const responsefile = await api.get(`/getFilepage_c?pageC_id=${id}`);
    console.log("responsefile", responsefile.data)
    formData.file = responsefile.data;
    formData.originFile = JSON.parse(JSON.stringify(responsefile.data));

    formData.f_pc_proof = responsefile.data.file_pc_proof;
    formData.f_q_pc_proof = responsefile.data.file_q_pc_proof;
    formData.f_invoice_public = responsefile.data.file_invoice_public;
    formData.f_accepted = responsefile.data.file_accepted;
    formData.f_copy_article = responsefile.data.file_copy_article;
    formData.f_upload_article = responsefile.data.file_upload_article;
    console.log("wow za", formData.editForm);
  } catch (error) {
    console.log("Error fetching professor data:", error);
  } finally {
    isLoading.value = false;
  }
  console.log("Fetching professor data...");
};

const loopdata = async () => {
  console.log("in loop");

  fetchProfessorData();

  console.log("formdata, ", formData.check);
  for (let i = 0; i < formData.check.length; i++) {
    console.log("checking journal", formData.check[i]);
    if (formData.check[i] == "nature") {
      formData.nature = "nature";
      console.log("Journal have 'nature'");
    }
    if (formData.check[i] == "ISI") {
      formData.checkISI = "ISI";
      console.log("Journal have 'ISI'");
    }
    if (formData.check[i] == "SJR") {
      formData.checkSJR = "SJR";
      console.log("Journal have 'SJR'");
    }
    if (formData.check[i] == "Scopus") {
      formData.checkScopus = "Scopus";
      console.log("Journal have 'Scopus'");
    }
  }
};

const isFieldEdited = (field) => {
  const editDataArray = toRaw(formData.editForm[0] || []);
  return editDataArray.some((item) => item.field === field);
};
// ดึงข้อมูลเมื่อ component ถูกโหลด
onMounted(async () => {
  await fetchProfessorData();
  loopdata();
  if (!userStore.user) {
    await userStore.fetchUser();
  }
  await userStore.fetchUser();
  data.id = user.value?.user_id;
  await getData();
});
</script>