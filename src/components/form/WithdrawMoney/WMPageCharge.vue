<template>
  <div class="container my-10 mx-auto">
    <p class="text-2xl font-bold text-center my-10">ขออนุมัติเบิกเงินรายได้</p>
    <p class="text-xl font-bold mb-5">
      Page Charge เพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
    </p>
    <Mainbox>
      <SectionWrapper>
        <TextInputLabelLeft
          label="ชื่อ"
          customLabel="w-2/12 text-lg font-bold"
          :disabled="true"
          v-model="formData.user.user_nameth"
        />
        <TextInputLabelLeft
          label="ตำแหน่ง"
          customLabel="w-2/12 text-lg font-bold"
          :disabled="true"
          v-model="formData.user.user_positionth"
        />

        <div class="flex flex-row">
          <TextInputLabelLeft
            label="มีรายชื่ออยู่ใน List ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่"
            customLabel="w-auto"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.pageC_times"
          />
          <TextInputLabelLeft
            label="วันที่"
            type="date"
            customLabel="ml-2 w-10"
            customInput="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.pageC_days"
          />
        </div>
      </SectionWrapper>
    </Mainbox>
    <!-- 1.  รายละเอียดวารสารที่ส่งเสนอพิจารณา / การตอบรับให้ลงตีพิมพ์  -->
    <Mainbox>
      <p class="leading-9 text-lg font-bold">
        รายละเอียดวารสารที่ส่งเสนอพิจารณา / การตอบรับให้ลงตีพิมพ์
      </p>
      <SectionWrapper>
        <TextInputLabelLeft
          label="ชื่อวารสาร"
          name="Input"
          customLabel="w-24"
          :disabled="true"
          v-model="formData.pageChange.journal_name"
        />
        <p>เป็นวารสารที่อยู่ในฐานข้อมูลสากล</p>

        <div class="flex flex-row">
          <CheckInput
            label="ISI ได้รับการจัดลำดับ Quartile "
            value="ISI"
            customDiv="max-w-72 flex items-center"
            v-model="formData.pageChange.quality_journal"
            :disabled="true"
          />
          <TextInputLabelLeft
            v-if="formData.checkISI == 'ISI'"
            label="ปี"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.pc_isi_year"
          />
          <TextInputLabelLeft
            v-if="formData.checkISI == 'ISI'"
            label="ลำดับ Quartile"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.qt_isi"
          />
          <TextInputLabelLeft
            v-if="formData.checkISI == 'ISI'"
            label="Impact Factor"
            customLabel="w-28 mx-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.impact_factor"
          />
        </div>

        <div class="flex flex-row">
          <CheckInput
            label="SJR ได้รับการจัดลำดับ Quartile "
            value="SJR"
            customDiv="max-w-72 flex items-center"
            v-model="formData.pageChange.quality_journal"
            :disabled="true"
          />
          <TextInputLabelLeft
            v-if="formData.checkSJR == 'SJR'"
            label="ปี"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.pc_sjr_year"
          />
          <TextInputLabelLeft
            v-if="formData.checkSJR == 'SJR'"
            label="ลำดับ Quartile"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.qt_sjr"
          />
          <TextInputLabelLeft
            v-if="formData.checkSJR == 'SJR'"
            label="SJR Score"
            customLabel="w-28 mx-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.sjr_score"
          />
        </div>

        <div class="flex flex-row">
          <CheckInput
            label="Scopus ได้รับการจัดลำดับ Quartile "
            value="Scopus"
            customDiv="max-w-72 flex items-center"
            v-model="formData.pageChange.quality_journal"
            :disabled="true"
          />
          <TextInputLabelLeft
            v-if="formData.checkScopus == 'Scopus'"
            label="ปี"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.pc_scopus_year"
          />
          <TextInputLabelLeft
            v-if="formData.checkScopus == 'Scopus'"
            label="ลำดับ Quartile"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.qt_scopus"
          />
          <TextInputLabelLeft
            v-if="formData.checkScopus == 'Scopus'"
            label="Cite Score"
            customLabel="w-28 mx-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.cite_score"
          />
        </div>

        <div class="flex flex-row">
          <CheckInput
            label="Nature"
            value="nature"
            customDiv="max-w-72 flex items-center"
            v-model="formData.pageChange.quality_journal"
            :disabled="true"
          />
        </div>
        <label class="form-control">
          <div class="flex flex-row">
            <TextInputLabelLeft
              label="วงเงินตามเกณฑ์การให้การสนับสนุนไม่เกิน"
              customLabel="w-auto mx-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              :disabled="true"
              v-model="formData.pageChange.request_support"
            />
            <span class="flex items-center">บาท</span>
          </div>
        </label>
      </SectionWrapper>
    </Mainbox>
    <!-- ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge) -->
    <Mainbox>
      <p class="leading-9 text-lg font-bold">
        ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge)
      </p>
      <SectionWrapper>
        <TextInputLabelLeft
          label="จำนวนเงิน"
          customLabel="w-auto min-w-fit"
          customInput="max-w-fit"
          v-model="formData.pageChange.request_support"
          :disabled="true"
        />
      </SectionWrapper>
    </Mainbox>
    <!-- ตั้งเบิก -->
    <Mainbox>
      <p class="leading-9 text-lg font-bold">อนุมัติเบิกเงินรายได้</p>
      <SectionWrapper>
        <div class="flex flex-row">
          <p class="w-2/12">กองทุน</p>
          <p class="w-2/12">พัฒนาบุคคลกร</p>
        </div>

        <div class="flex flex-row">
          <p class="w-2/12">งบรายจ่าย</p>
          <p class="w-2/12">งบดำเนินงาน</p>
        </div>

        <div class="flex flex-row">
          <p class="w-2/12">ประเภทรายจ่าย</p>
          <p class="w-2/12">ค่าใช้สอย</p>
        </div>

        <div class="flex flex-row">
          <p class="w-2/12">ค่าใช้จ่าย</p>
          <p class="w-6/12">
            ค่าตีพิมพ์บทความในวารสารนานาชาติ (Page Charge)
          </p>
        </div>

        <div class="flex flex-row">
          <TextInputLabelLeft
              label="จำนวน"
              customLabel="w-6/12 mr-4"
              customInput="max-w-max"
              customDiv="max-w-[30%]"
              v-model="formData.withdraw"
            />
            <span class="flex items-center">บาท</span>
        </div>
      </SectionWrapper>
    </Mainbox>
    <div class="flex justify-end mb-70">
      <button @click="submitWithdrawMoney" class="btn btn-success text-white">
        บันทึกข้อมูล
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import CheckInput from "@/components/Input/CheckInput.vue";

// จัดการข้อมูลหลัก
const formData = reactive({
  pageChange: [],
  user: [],

  check: [],
  checkISI: "",
  checkSJR: "",
  checkScopus: "",
  nature: "",

  withdraw: 0,
});

//isLoading เพื่อแสดงสถานะว่ากำลังโหลดข้อมูล
const isLoading = ref(true);
// Access route parameters
const router = useRouter();
const route = useRoute();
const id = route.params.id;
console.log("params.id", id);
// ตัวแปรสำหรับเก็บข้อมูลจาก backend
const fetchProfessorData = async () => {
  try {
    const responsePC = await api.get(`/page_charge/${id}`);
    const userID = responsePC.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    formData.user = responseUser.data;

    formData.pageChange = responsePC.data;
    console.log("pageChange", formData.pageChange);
    formData.check = formData.pageChange.quality_journal;
  } catch (error) {
    console.log("Error fetching professor data:", error);
  } finally {
    isLoading.value = false;
  }
  console.log("Fetching professor data...");
};

const loopdata = async () => {
  console.log("in loop");
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

const submitWithdrawMoney = async () => {
  try {
    const dataForBackend = {
      withdraw: formData.withdraw,
    };
    console.log("dataForBackend: ", dataForBackend);
    await api.put(`/withdraw/pageCharge/${id}`, dataForBackend);
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
    router.push("/allWithdrawMoney");
  } catch (error) {
    console.log("Error saving code : ", error);
    alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
  }
};

// ดึงข้อมูลเมื่อ component ถูกโหลด
onMounted(async () => {
  await fetchProfessorData();
  loopdata();
});
</script>
