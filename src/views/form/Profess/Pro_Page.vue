<template>
  <div>
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold mb-5">
        ขออนุมัติค่า Page Charge เพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
      </p>
      <Mainbox>
        <SectionWrapper>
          <TextInputLabelLeft label="ชื่อ" customLabel="w-2/12 text-lg font-bold" :disabled="true"
            :placeholder="formData.name" />
          <TextInputLabelLeft label="ตำแหน่ง" customLabel="w-2/12 text-lg font-bold" :placeholder="formData.position"
            :disabled="true" />

          <div class="flex flex-row">
            <TextInputLabelLeft label="มีรายชื่ออยู่ใน List ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่"
              customLabel="w-auto" customInput="max-w-max" customDiv="max-w-max" v-model="formData.textOther1pc"
              :required="true" />
            <TextInputLabelLeft label="วันที่" customLabel="ml-2 w-10" customInput="max-w-max" customDiv="max-w-max"
              type="date" v-model="formData.textOther2pc" :required="true" />
          </div>
          <span v-if="v$.textOther1pc.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.textOther1pc.$errors[0].$message }}
          </span>
          <span v-if="v$.textOther2pc.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.textOther2pc.$errors[0].$message }}
          </span>

          <p class="text-blue-500 text-sm">
            สามารถตรวจสอบรายชื่อ List ของคณะได้ที่เว็บไซต์คณะที่ Share
            online-การวิจัย และ
            <a href="https://erp.it.kmitl.ac.th/journal_conf_list">https://erp.it.kmitl.ac.th/journal_conf_list</a>
          </p>
        </SectionWrapper>
      </Mainbox>
      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          1.  รายละเอียดวารสารที่ส่งเสนอพิจารณา / การตอบรับให้ลงตีพิมพ์
        </p>
        <SectionWrapper class="collapse-content">
          <TextInputLabelLeft label="ชื่อวารสาร" customLabel="w-24" v-model="formData.nameJournal" :required="true" />
          <span v-if="v$.nameJournal.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.nameJournal.$errors[0].$message }}
          </span>

          <p>เป็นวารสารที่อยู่ในฐานข้อมูลสากล <span class="text-red-500">*</span></p>
          <div class="flex flex-row">
            <CheckInput label="ISI ได้รับการจัดลำดับ Quartile " customDiv="max-w-72 flex items-center"
              v-model="formData.check" value="ISI" />
            <TextInputLabelLeft label="ปี" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
              v-model="formData.yearISI" />
            <TextInputLabelLeft label="ลำดับ Quartile" customLabel="ml-4 mr-2" customInput="max-w-max"
              customDiv="max-w-max" v-model="formData.quartileISI" />
            <TextInputLabelLeft label="Impact Factor" customLabel="w-28 mx-2" customInput="max-w-max"
              customDiv="max-w-max" v-model="formData.scoreISI" />
          </div>
          <span v-if="v$.yearISI.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.yearISI.$errors[0].$message }}
          </span>
          <span v-if="v$.quartileISI.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.quartileISI.$errors[0].$message }}
          </span>
          <span v-if="v$.scoreISI.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.scoreISI.$errors[0].$message }}
          </span>

          <div class="flex flex-row">
            <CheckInput label="SJR ได้รับการจัดลำดับ Quartile " customDiv="max-w-72 flex items-center"
              v-model="formData.check" value="SJR" />
            <TextInputLabelLeft label="ปี" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
              v-model="formData.yearSJR" />
            <TextInputLabelLeft label="ลำดับ Quartile" customLabel="ml-4 mr-2" customInput="max-w-max"
              customDiv="max-w-max" v-model="formData.quartileSJR" />
            <TextInputLabelLeft label="SJR Score" customLabel="w-28 mx-2" customInput="max-w-max" customDiv="max-w-max"
              v-model="formData.scoreSJR" />
          </div>
          <span v-if="v$.yearSJR.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.yearSJR.$errors[0].$message }}
          </span>
          <span v-if="v$.quartileSJR.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.quartileSJR.$errors[0].$message }}
          </span>
          <span v-if="v$.scoreSJR.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.scoreSJR.$errors[0].$message }}
          </span>

          <div class="flex flex-row">
            <CheckInput label="Scopus ได้รับการจัดลำดับ Quartile " customDiv="max-w-72 flex items-center"
              v-model="formData.check" value="Scopus" />
            <TextInputLabelLeft label="ปี" customLabel="mr-2" customInput="max-w-max" customDiv="max-w-max"
              v-model="formData.yearScopus" />
            <TextInputLabelLeft label="ลำดับ Quartile" customLabel="ml-4 mr-2" customInput="max-w-max"
              customDiv="max-w-max" v-model="formData.quartileScopus" />
            <TextInputLabelLeft label="Cite Score" customLabel="w-28 mx-2" customInput="max-w-max" customDiv="max-w-max"
              v-model="formData.scoreScopus" />
          </div>
          <span v-if="v$.yearScopus.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.yearScopus.$errors[0].$message }}
          </span>
          <span v-if="v$.quartileScopus.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.quartileScopus.$errors[0].$message }}
          </span>
          <span v-if="v$.scoreScopus.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.scoreScopus.$errors[0].$message }}
          </span>

          <div class="flex flex-row">
            <CheckInput label="Nature" customDiv="max-w-72 flex items-center" v-model="formData.check" value="nature" />
          </div>
          <span v-if="v$.check.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.check.$errors[0].$message }}
          </span>

          <label class="form-control">
            <div class="flex flex-row">
              <span class="flex mr-2 items-center">
                วงเงินตามเกณฑ์การให้การสนับสนุนไม่เกิน
                <span class="text-red-500">*</span>
              </span>
              <select class="select select-bordered w-3/12" v-model="formData.moneyOp">
                <option disabled value="">เลือกวงเงินสนับสนุน</option>
                <option :value="20000">20,000 บาท</option>
                <option :value="30000">30,000 บาท</option>
                <option :value="40000">40,000 บาท</option>
                <option :value="60000">60,000 บาท</option>
                <option :value="70000">70,000 บาท</option>
              </select>
            </div>
          </label>
          <span v-if="v$.moneyOp.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.moneyOp.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          2. รายละเอียดผลงานวิจัยที่ส่งเสนอพิจารณา / ได้รับการตอบรับให้ตีพิมพ์
        </p>
        <SectionWrapper class="collapse-content">
          <TextInputLabelLeft label="ชื่อบทความ" customLabel="w-24" v-model="formData.nameReach" :required="true" />
          <span v-if="v$.nameReach.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.nameReach.$errors[0].$message }}
          </span>

          <TextInputLabelLeft label="จำนวนนักวิจัยร่วม" customLabel="w-[10%]" v-model="formData.numcoResearchers" />

          <div v-for="(index) in parseInt(formData.numcoResearchers) || 0" :key="index">
            <div class="flex flex-row gap-4">
              <p class="pt-2">{{ index }}.</p>
              <TextInputLabelLeft label="ชื่อ-นามสกุลของนักวิจัยร่วม" customLabel="w-[100%]" customDiv="max-w-[30%]"
                v-model="formData.namecoResearchers[index]" />
              <TextInputLabelLeft label="หลักสูตรของนักวิจัยร่วม" customLabel="w-[100%]" customDiv="max-w-[25%]"
                v-model="formData.coursecoResearchers[index]" />
            </div>
          </div>
          <p>กำหนดการที่คาดว่าจะได้รับการลงตีพิมพ์ในวารสาร</p>
          <div class="flex flex-row mt-2 justify-between">
            <TextInputLabelLeft label="ปีที่ (Vol.)" customLabel="w-[50%]" customInput="w-[50%]" customDiv="max-w-[15%]"
              v-model="formData.schedule" />
            <TextInputLabelLeft label="ฉบับที่ (Issue)" customLabel="w-[50%]" customInput="w-[49%]"
              customDiv="max-w-[15%]" v-model="formData.issue" />
            <label class="form-control w-full max-w-[20%]">
              <div class="flex flex-row w-full">
                <span class="flex mr-2 items-center"> เดือน </span>
                <select class="select select-bordered flex-1" v-model="formData.months">
                  <option disabled value="">เลือกเดือน</option>
                  <option value="มกราคม">มกราคม</option>
                  <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                  <option value="มีนาคม">มีนาคม</option>
                  <option value="เมษายน">เมษายน</option>
                  <option value="พฤษภาคม">พฤษภาคม</option>
                  <option value="มิถุนายน">มิถุนายน</option>
                  <option value="กรกฎาคม">กรกฎาคม</option>
                  <option value="สิงหาคม">สิงหาคม</option>
                  <option value="กันยายน">กันยายน</option>
                  <option value="ตุลาคม">ตุลาคม</option>
                  <option value="พฤศจิกายน">พฤศจิกายน</option>
                  <option value="ธันวาคม">ธันวาคม</option>
                </select>
              </div>
            </label>

            <TextInputLabelLeft label="ปี ค.ศ." customLabel="w-[50%]" customInput="w-[50%]" customDiv="max-w-[15%]"
              v-model="formData.year" />

            <TextInputLabelLeft label="เลขที่ ISSN/ISBN (อื่นๆ)" customLabel="w-[60%]" customInput="w-[50%]"
              customDiv="max-w-[30%]" v-model="formData.ISSN" />
          </div>

          <span v-if="v$.schedule.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.schedule.$errors[0].$message }}
          </span>
          <span v-if="v$.issue.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.issue.$errors[0].$message }}
          </span>
          <span v-if="v$.year.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.year.$errors[0].$message }}
          </span>

          <div class="flex flex-row mt-2 justify-between w-[100%]">
            <TextInputLabelLeft label="วันที่ส่งบทความไปยังสำนักพิมพ์เจ้าของวารสาร" type="date" customLabel="w-[100%]"
              customInput="w-[35%]" customDiv="max-w-[35%]" v-model="formData.submitReach" :required="true" />
            <TextInputLabelLeft label="วันประกาศผลการพิจารณา" type="date" customLabel="w-[100%]" customDiv="max-w-[30%]"
              v-model="formData.announce" :required="true" />
            <TextInputLabelLeft label="วันสุดท้ายของการจ่ายค่าตีพิมพ์" type="date" customInput="w-[35%]"
              customDiv="max-w-[30%]" v-model="formData.latePay" :required="true" />
          </div>
          <span v-if="v$.submitReach.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.submitReach.$errors[0].$message }}
          </span>
          <span v-if="v$.announce.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.announce.$errors[0].$message }}
          </span>
          <span v-if="v$.latePay.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.latePay.$errors[0].$message }}
          </span>

          <SectionWrapper>
            <div class="flex flex-row mt-3">
              <p class="flex text-blue-500 w-12 items-center">(ถ้ามี)</p>
              <TextInputLabelLeft label="บทความวิจัยนี้เป็นผลงานจากโครงการวิจัยเรื่อง" customLabel="w-[30%]"
                v-model="formData.reachOther" />
            </div>

            <p>ประเภทโครงการวิจัย</p>
            <div class="flex flex-row ml-5">
              <RadioInput label="วิจัยพื้นฐาน" value="basic" name="type" customDiv="max-w-fit mr-10 flex items-center"
                v-model="formData.radioResearch" />
              <RadioInput label="วิจัยประยุกต์" value="applied" name="type"
                customDiv="max-w-fit mr-10 flex items-center" v-model="formData.radioResearch" />
              <RadioInput label="วิจัยและพัฒนา" value="research&development" name="type"
                customDiv="max-w-fit mr-10 flex items-center" v-model="formData.radioResearch" />
              <div class="flex flex-row">
                <RadioInput label="วิจัยอื่น ๆ " value="other" name="type" customDiv="max-w-fit mr-2 flex items-center"
                  v-model="formData.radioResearch" />
                <TextInputLabelLeft label="(ระบุ)" name="type" customDiv="max-w-fit flex items-center"
                  v-model="formData.otherInput" />
              </div>
            </div>

            <span v-if="v$.radioResearch.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.radioResearch.$errors[0].$message }}
            </span>
            <span v-if="v$.otherInput.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.otherInput.$errors[0].$message }}
            </span>

            <TextInputLabelLeft label="ชื่อแหล่งทุนวิจัย" customLabel="w-auto min-w-fit" v-model="formData.source" />
            <span v-if="v$.source.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.source.$errors[0].$message }}
            </span>

            <div class="flex flex-row">
              <TextInputLabelLeft label="วงเงินงบประมาณการวิจัย" customLabel="w-auto min-w-fit"
                customDiv="max-w-max mr-10" v-model="formData.credit" />
              <TextInputLabelLeft label="ประจำปี" customLabel="w-auto min-w-fit" customDiv="max-w-max mr-10"
                v-model="formData.inYears" />
            </div>
            <span v-if="v$.credit.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.credit.$errors[0].$message }}
            </span>
            <span v-if="v$.inYears.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.inYears.$errors[0].$message }}
            </span>
          </SectionWrapper>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">3. ผู้ขอรับการสนับสนุน <span class="text-red-500">*</span></p>
        <SectionWrapper class="collapse-content">
          <RadioInput label="ผู้ประพันธ์อันดับแรก First Author" value="First Author" name="Author"
            v-model="formData.radioAuth" />
          <RadioInput label="ผู้ประพันธ์บรรณกิจ Corresponding Author" value="Corresponding Author" name="Author"
            v-model="formData.radioAuth" />
          <span v-if="v$.radioAuth.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.radioAuth.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          4. ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge)
          <span class="text-red-500">*</span>
        </p>
        <SectionWrapper class="collapse-content">
          <TextInputLabelLeft label="จำนวนเงิน" customLabel="w-auto min-w-fit" customInput="max-w-fit"
            v-model="formData.moneyPG" />
          <span v-if="v$.moneyPG.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.moneyPG.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">เอกสารหลักฐานที่แนบ</p>

        <SectionWrapper class="collapse-content">
          <span class="text-gray-500">ขนาดไฟล์สูงสุด 10 MB </span>
          <FileInput label="หลักฐานแสดงการอยู่ในฐานข้อมูลสากล ISI หรือ SJR หรือ Scopus หรือ Nature" name="First"
            type="file" :required="true" @change="handleFile($event, 'file1')" />
          <span v-if="v$.file1.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file1.$errors[0].$message }}
          </span>

          <FileInput label="หลักฐานแสดงการจัดลำดับ Quartile ของฐานข้อมูลสากล ISI หรือ SJR หรือ Scopus" name="Second"
            type="file" :required="true" @change="handleFile($event, 'file2')" />
          <span v-if="v$.file2.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file2.$errors[0].$message }}
          </span>

          <FileInput label="ใบแจ้งหนี้ค่าใช้จ่ายสำหรับการตีพิมพ์ / อัตราค่าใช้จ่ายที่ประกาศบนหน้าเว็บไซต์" name="Third"
            type="file" :required="true" @change="handleFile($event, 'file3')" />
          <span v-if="v$.file3.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file3.$errors[0].$message }}
          </span>

          <FileInput label="หลักฐานการส่งบทความ หนังสือตอบรับบทความ" name="Fourth" type="file" :required="true"
            @change="handleFile($event, 'file4')" />
          <span v-if="v$.file4.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file4.$errors[0].$message }}
          </span>

          <FileInput label="สำเนาบทความ" name="Fifth" type="file" :required="true"
            @change="handleFile($event, 'file5')" />
          <span v-if="v$.file5.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file5.$errors[0].$message }}
          </span>

          <FileInput label="หลักฐานการ Upload บทความเข้าระบบ IT Scholar" name="six" type="file" :required="true"
            @change="handleFile($event, 'file6')" />
          <span v-if="v$.file6.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file6.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </Mainbox>
      <div class="flex justify-end">
        <button @click="saveDraft" class="bg-blue-500 text-white px-4 py-2 rounded mr-3">
          บันทึกแบบร่าง
        </button>
        <button @click="NewPC" class="btn btn-success text-white">
          บันทึกข้อมูล
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  numeric,
  minValue,
  maxValue,
  between,
  helpers,
  requiredIf,
  integer,
} from "@vuelidate/validators";
import { DateTime } from "luxon";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";
import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import CheckInput from "@/components/Input/CheckInput.vue";
import FileInput from "@/components/Input/FileInput.vue";

const router = useRouter();

const userStore = useUserStore();
const user = computed(() => userStore.user);

if (!userStore.user.user_signature) {
  alert("กรุณาอัปโหลดลายเซ็น");
  router.push("/profile");
}

// จัดการข้อมูลหลัก
const formData = reactive({
  userID: null,
  name: null,
  position: null,
  textOther1pc: null,
  textOther2pc: null,
  nameJournal: null,
  check: [],
  yearISI: null,
  quartileISI: null,
  scoreISI: null,
  yearSJR: null,
  quartileSJR: null,
  scoreSJR: null,
  yearScopus: null,
  quartileScopus: null,
  scoreScopus: null,
  moneyOp: null,
  nameReach: null,
  numcoResearchers: null,
  namecoResearchers: null,
  coursecoResearchers: null,
  schedule: null,
  issue: null,
  months: null,
  year: null,
  ISSN: null,
  submitReach: null,
  announce: null,
  latePay: null,
  reachOther: null,
  radioResearch: null,
  otherInput: null,
  source: null,
  credit: null,
  inYears: null,
  radioAuth: null,
  moneyPG: null,
  file1: null,
  file2: null,
  file3: null,
  file4: null,
  file5: null,
  file6: null,
});

const inputTypes = {
  userID: "string",
  name: "string",
  position: "string",
  textOther1pc: "string",
  textOther2pc: "date",
  nameJournal: "string",
  check: "array",
  yearISI: "number",
  quartileISI: "number",
  scoreISI: "number",
  yearSJR: "number",
  quartileSJR: "number",
  scoreSJR: "number",
  yearScopus: "number",
  quartileScopus: "number",
  scoreScopus: "number",
  moneyOp: "number",
  nameReach: "string",
  numcoResearchers: "number",
  namecoResearchers: "array",
  coursecoResearchers: "array",
  schedule: "number",
  issue: "number",
  months: "string",
  year: "number",
  ISSN: "string",
  submitReach: "date",
  announce: "date",
  latePay: "date",
  reachOther: "string",
  radioResearch: "string",
  otherInput: "string",
  source: "string",
  credit: "number",
  inYears: "number",
  radioAuth: "string",
  moneyPG: "number",
  file1: "string",
  file2: "string",
  file3: "string",
  file4: "string",
  file5: "string",
  file6: "string",
};

// ตรวจสอบปีและวันที่นี้
const currentYear = computed(() => DateTime.now().year);
const currentDate = computed(() => DateTime.now().toISODate());

// ตรวจว่าวันที่ไม่อยู่หลัง value <= x
const beforeDate = (value, date) => {
  return (
    DateTime.fromISO(value).toISODate() <= DateTime.fromISO(date).toISODate()
  );
};

//ตรวจว่าวันที่ไม่เกิดก่อน value >= x
const afterDate = (value, date) => {
  return (
    DateTime.fromISO(value).toISODate() >= DateTime.fromISO(date).toISODate()
  );
};

//validate rule
const rules = computed(() => ({
  textOther1pc: {
    required: helpers.withMessage("* กรุณากรอกข้อมูลครั้งที่ *", required),
  },
  textOther2pc: {
    required: helpers.withMessage("* กรุณากรอกข้อมูลวันที่ *", required),
    beforeDate: helpers.withMessage("* วันที่ต้องไม่เกินวันนี้ *", (value) =>
      beforeDate(value, currentDate.value)
    ),
  },
  nameJournal: {
    required: helpers.withMessage("* กรุณากรอกข้อมูลชื่อวารสาร *", required),
  },
  check: {
    required: helpers.withMessage("* กรุณาเลือกฐานข้อมูลสากล *", required),
  },
  yearISI: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    maxValue: helpers.withMessage(
      "* ปีไม่สามารถมากกว่าปีปัจจุบันได้ *",
      maxValue(currentYear.value)
    ),
    minValue: helpers.withMessage(
      "* ปีไม่สามารถย้อนหลังเกิน 6 ปี *",
      minValue(currentYear.value - 6)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลปีที่ได้รับการจัดลำดับ Quartile *",
      requiredIf(() => formData.check.includes("ISI"))
    ),
  },
  quartileISI: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    between: helpers.withMessage(
      "* Quartile สามารถเลือกได้เพียง 1-4 *",
      between(1, 4)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลลำดับ Quartile *",
      requiredIf(() => formData.check.includes("ISI"))
    ),
  },
  scoreISI: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    minValue: helpers.withMessage(
      "* กรุณาตรวจสอบคะแนน คะแนนไม่สามารถต่ำกว่า 0 ได้ *",
      minValue(0.1)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลคะแนน Impact Factor *",
      requiredIf(() => formData.check.includes("ISI"))
    ),
  },
  yearSJR: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    minValue: helpers.withMessage(
      "* ปีไม่สามารถย้อนหลังเกิน 6 ปี *",
      minValue(currentYear.value - 6)
    ),
    maxValue: helpers.withMessage(
      "* ปีไม่สามารถมากกว่าปีปัจจุบันได้ *",
      maxValue(currentYear.value)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลปีที่ได้รับการจัดลำดับ Quartile *",
      requiredIf(() => formData.check.includes("SJR"))
    ),
  },
  quartileSJR: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    between: helpers.withMessage(
      "* Quartile สามารถเบือกได้เพียง 1-4 *",
      between(1, 4)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลลำดับ Quartile *",
      requiredIf(() => formData.check.includes("SJR"))
    ),
  },
  scoreSJR: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    minValue: helpers.withMessage(
      "* กรุณาตรวจสอบคะแนน คะแนนไม่สามารถต่ำกว่า 0 ได้ *",
      minValue(0.1)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลคะแนน SJR Score *",
      requiredIf(() => formData.check.includes("SJR"))
    ),
  },
  yearScopus: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    maxValue: helpers.withMessage(
      "* ปีไม่สามารถมากกว่าปีปัจจุบันได้ *",
      maxValue(currentYear.value)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลปีที่ได้รับการจัดลำดับ Quartile *",
      requiredIf(() => formData.check.includes("Scopus"))
    ),
  },
  quartileScopus: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    between: helpers.withMessage(
      "* Quartile สามารถเบือกได้เพียง 1-4 *",
      between(1, 4)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลลำดับ Quartile *",
      requiredIf(() => formData.check.includes("Scopus"))
    ),
  },
  scoreScopus: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    minValue: helpers.withMessage(
      "* กรุณาตรวจสอบคะแนน คะแนนไม่สามารถต่ำกว่า 0 ได้ *",
      minValue(0.1)
    ),
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลคะแนน Cite Score *",
      requiredIf(() => formData.check.includes("Scopus"))
    ),
  },
  moneyOp: {
    required: helpers.withMessage(
      "* กรุณาเลือกวงเงินตามเกณฑ์การให้การสนับสนุน *",
      required
    ),
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
  },
  nameReach: {
    required: helpers.withMessage("* กรุณากรอกชื่อบทความ *", required),
  },
  schedule: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    minValue: helpers.withMessage(
      "* ปีไม่สามารถน้อยกว่าปีปัจจุบันได้ *",
      minValue(currentYear.value)
    ),
  },
  issue: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    minValue: helpers.withMessage(
      "* ฉบับที่ไม่สามารถน้อยกว่า 1 *",
      minValue(1)
    ),
  },
  year: {
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    minValue: helpers.withMessage(
      "* ปีไม่สามารถน้อยกว่าปีปัจจุบันได้ *",
      minValue(currentYear.value)
    ),
  },
  submitReach: {
    required: helpers.withMessage(
      "* กรุณากรอกวันที่ส่งบทความไปยังสำนักพิมพ์เจ้าของวารสาร *",
      required
    ),
    afterDate: helpers.withMessage(
      "วันที่ไม่สามารถเกิดก่อนวันที่ส่งงานวิจัยได้",
      (value) => afterDate(value, formData.submitReach)
    ),
  },
  announce: {
    required: helpers.withMessage(
      "* กรุณากรอกวันประกาศผลการพิจารณา *",
      required
    ),
    afterDate: helpers.withMessage(
      "วันที่ไม่สามารถเกิดก่อนวันที่ส่งงานวิจัยได้",
      (value) => afterDate(value, formData.submitReach)
    ),
  },
  latePay: {
    required: helpers.withMessage(
      "* กรุณากรอกวันสุดท้ายของการจ่ายค่าตีพิมพ์ *",
      required
    ),
    afterDate: helpers.withMessage(
      "วันที่ไม่สามารถเกิดก่อนวันที่ส่งงานวิจัย และวันประกาศผลได้",
      (value) =>
        afterDate(
          value,
          DateTime.min(
            DateTime.fromISO(formData.announce),
            DateTime.fromISO(currentDate.value)
          )
        )
    ),
  },
  radioResearch: {
    required: helpers.withMessage(
      "* กรุณาเลือกประเภทโครงการวิจัย*",
      requiredIf(() => formData.reachOther && formData.reachOther.trim() !== "")
    ),
  },
  otherInput: {
    required: helpers.withMessage(
      "* กรุณากรอกประเภทงานวิจัย *",
      requiredIf(() => formData.radioResearch === "other")
    ),
  },
  source: {
    required: helpers.withMessage(
      "* กรุณากรอกชื่อแหล่งทุนวิจัย *",
      requiredIf(() => formData.reachOther && formData.reachOther.trim() !== "")
    ),
  },
  credit: {
    required: helpers.withMessage(
      "* กรุณากรอกวงเงินงบประมาณการวิจัย *",
      requiredIf(() => formData.reachOther && formData.reachOther.trim() !== "")
    ),
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
  },
  inYears: {
    required: helpers.withMessage(
      "* กรุณากรอกปี *",
      requiredIf(() => formData.reachOther && formData.reachOther.trim() !== "")
    ),
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    maxValue: helpers.withMessage(
      "* ปีไม่สามารถมากกว่าปีปัจจุบันได้ *",
      maxValue(currentYear.value)
    ),
  },
  radioAuth: {
    required: helpers.withMessage("* กรุณากรอกผู้ขอรับการสนับสนุน *", required),
  },
  moneyPG: {
    required: helpers.withMessage(
      "* กรุณากรอกขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge) *",
      required
    ),
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
  },
  file1: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  file2: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  file3: {
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return true;
        return value.type === "application/pdf";
      }
    ),
  },
  file4: {
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return true;
        return value.type === "application/pdf";
      }
    ),
  },
  file5: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  file6: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

onMounted(async () => {
  await userStore.fetchUser();

  formData.userID = user.value?.user_id;
  formData.name = user.value?.user_nameth || "";
  formData.position = user.value?.user_positionth || "";
});

const saveDraft = () => {
  localStorage.setItem("formDraft", JSON.stringify(formData));
  alert("บันทึกแบบร่างเรียบร้อยแล้ว");
};

onMounted(() => {
  console.log("formDraft", localStorage.getItem("formDraft"));
  const draft = localStorage.getItem("formDraft");
  if (draft) {
    console.log("have draft", JSON.parse(draft));
    Object.assign(formData, JSON.parse(draft));
  }
});

watch(() => formData.numcoResearchers, (newVal) => {
  const num = parseInt(newVal) || 0;

  // ถ้ายังไม่เป็น array ให้กำหนดก่อน
  if (!Array.isArray(formData.namecoResearchers)) {
    formData.namecoResearchers = [];
  }
  if (!Array.isArray(formData.coursecoResearchers)) {
    formData.coursecoResearchers = [];
  }

  formData.namecoResearchers.length = num;
  formData.coursecoResearchers.length = num;

  for (let i = 0; i < num; i++) {
    if (formData.namecoResearchers[i] === undefined) {
      formData.namecoResearchers[i] = '';
    }
    if (formData.coursecoResearchers[i] === undefined) {
      formData.coursecoResearchers[i] = '';
    }
  }
});

const handleFile = (event, fieldName) => {
  const file = event.target.files[0];

  if (!file) {
    console.log(`No file selected for ${fieldName}.`);
    return;
  }

  // ตรวจสอบประเภทไฟล์ (PDF เท่านั้น)
  if (file.type !== "application/pdf") {
    alert("กรุณาอัพโหลดไฟล์ PDF เท่านั้น");
    event.target.value = ""; // ล้างค่า input
    return;
  }

  // ตรวจสอบขนาดไฟล์ (ไม่เกิน 100MB)
  const maxSize = 10 * 1024 * 1024; // 100 MB
  if (file.size > maxSize) {
    alert("ไฟล์มีขนาดเกิน 10 MB กรุณาเลือกไฟล์ที่เล็กกว่า");
    event.target.value = ""; // ล้างค่า input
    return;
  }

  // ถ้าผ่านเงื่อนไขทั้งหมด เก็บไฟล์ลง formData
  formData[fieldName] = file;
};

const NewPC = async () => {
  const result = await v$.value.$validate();

  if (result) {
    try {
      const dataForBackend = {
        user_id: formData.userID,
        pageC_times: formData.textOther1pc,
        pageC_days: formData.textOther2pc,
        journal_name: formData.nameJournal,
        quality_journal: formData.check,
        pc_isi_year: formData.yearISI,
        pc_sjr_year: formData.yearSJR,
        pc_scopus_year: formData.yearScopus,
        impact_factor: formData.scoreISI,
        sjr_score: formData.scoreSJR,
        cite_score: formData.scoreScopus,
        qt_isi: formData.quartileISI,
        qt_sjr: formData.quartileSJR,
        qt_scopus: formData.quartileScopus,
        support_limit: formData.moneyOp,
        article_title: formData.nameReach,
        num_co_researchers: formData.numcoResearchers,
        name_co_researchers: formData.namecoResearchers,
        course_co_researchers: formData.coursecoResearchers,
        vol_journal: formData.schedule || null,
        issue_journal: formData.issue || null,
        month: formData.months || null,
        year: formData.year || null,
        ISSN_ISBN: formData.ISSN || null,
        submission_date: formData.submitReach,
        date_review_announce: formData.announce,
        final_date: formData.latePay,
        article_research_ject: formData.reachOther,
        research_type: formData.radioResearch,
        research_type2: formData.otherInput,
        name_funding_source: formData.source,
        budget_limit: formData.credit,
        annual: formData.inYears,
        presenter_type: formData.radioAuth,
        request_support: formData.moneyPG,
        pc_proof: formData.file1,
        q_pc_proof: formData.file2,
        invoice_public: formData.file3,
        accepted: formData.file4,
        copy_article: formData.file5,
        upload_article: formData.file6
      };

      console.log("postPC: ", JSON.stringify(dataForBackend));
      const response = await api.post("/page_charge", dataForBackend, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      router.push("/myHistory");
      localStorage.removeItem("formDraft");
    } catch (error) {
      console.log("Error saving code : ", error);

      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");
  }
};
</script>
