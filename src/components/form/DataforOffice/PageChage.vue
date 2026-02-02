<template>
  <div class="container my-10 mx-auto">
    <p class="text-xl font-bold mb-5">
      ขออนุมัติค่า Page Charge เพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
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
          v-model="formData.user.user_positionth"
          :disabled="true"
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
        <p class="text-blue-500 text-sm">
          สามารถตรวจสอบรายชื่อ List ของคณะได้ที่เว็บไซต์คณะที่ Share
          online-การวิจัย และ
          <a href="https://erp.it.kmitl.ac.th/journal_conf_list"
            >https://erp.it.kmitl.ac.th/journal_conf_list</a
          >
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
            :disabled="true"
            v-model="formData.pageChange.quality_journal"
          />
          <TextInputLabelLeft
            label="ปี"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.pc_isi_year"
          />
          <TextInputLabelLeft
            label="ลำดับ Quartile"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.qt_isi"
          />
          <TextInputLabelLeft
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
            :disabled="true"
            v-model="formData.pageChange.quality_journal"
          />
          <TextInputLabelLeft
            label="ปี"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.pc_sjr_year"
          />
          <TextInputLabelLeft
            label="ลำดับ Quartile"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.qt_sjr"
          />
          <TextInputLabelLeft
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
            :disabled="true"
            v-model="formData.pageChange.quality_journal"
          />
          <TextInputLabelLeft
            label="ปี"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.pc_scopus_year"
          />
          <TextInputLabelLeft
            label="ลำดับ Quartile"
            customLabel="mr-2"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="formData.pageChange.qt_scopus"
          />
          <TextInputLabelLeft
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
            :disabled="true"
            v-model="formData.pageChange.quality_journal"
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
              v-model="formattedBudget.support_limit"
            />
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
        <TextInputLabelLeft
          label="ชื่อบทความ"
          customLabel="w-auto min-w-fit"
          :disabled="true"
          v-model="formData.pageChange.article_title"
        />
        <TextInputLabelLeft
            label="จำนวนนักวิจัยร่วม"
            customLabel="w-[10%]"
            v-model="formData.pageChange.num_co_researchers"
            :disabled="true"
          />
          <div v-for="(index) in parseInt(formData.pageChange.num_co_researchers)  || 0" :key="index" >
            <div class="flex flex-row gap-4">
              <p class="pt-2">{{ index }}.</p>
              <TextInputLabelLeft
                label="ชื่อ-นามสกุลของนักวิจัยร่วม"
                customLabel="w-[100%]"
                customDiv="max-w-[30%]"
                v-model="formData.pageChange.name_co_researchers[index]"
                :disabled="true"
              />
              <TextInputLabelLeft
                label="หลักสูตรของนักวิจัยร่วม"
                customLabel="w-[100%]"
                customDiv="max-w-[25%]"
                v-model="formData.pageChange.course_co_researchers[index]"
                :disabled="true"
              />
            </div>
          </div>
        <p>กำหนดการที่คาดว่าจะได้รับการลงตีพิมพ์ในวารสาร</p>
        <div class="flex flex-row mt-2 justify-between">
          <TextInputLabelLeft
            label="ปีที่ (Vol.)"
            customLabel="w-auto min-w-fit"
            customDiv="max-w-fit"
            :disabled="true"
            v-model="formData.pageChange.vol_journal"
          />
          <TextInputLabelLeft
            label="ฉบับที่ (Issue)"
            customLabel="w-auto min-w-fit"
            customDiv="max-w-fit"
            :disabled="true"
            v-model="formData.pageChange.issue_journal"
          />
          <TextInputLabelLeft
            label="เดือน"
            customLabel="w-auto min-w-fit"
            customDiv="max-w-fit"
            :disabled="true"
            v-model="formData.pageChange.month"
          />
          <div class="flex flex-row">
            <TextInputLabelLeft
              label="ปี ค.ศ./พ.ศ."
              customLabel="w-auto min-w-fit"
              customDiv="max-w-fit"
              :disabled="true"
              v-model="formData.pageChange.year"
            />
            <TextInputLabelLeft
              label="เลขที่ ISSN/ISBN (อื่นๆ)"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-fit"
              :disabled="true"
              v-model="formData.pageChange.ISSN_ISBN"
            />
          </div>
        </div>

        <div class="flex flex-row mt-4 justify-between">
          <TextInputLabelLeft
            label="วันที่ส่งบทความไปยังสำนักพิมพ์เจ้าของวารสาร"
            type="date"
            customLabel="w-auto min-w-fit"
            customDiv="max-w-fit"
            :disabled="true"
            v-model="formData.pageChange.submission_date"
          />
          <TextInputLabelLeft
            label="วันประกาศผลการพิจารณา"
            type="date"
            customLabel="w-auto min-w-fit"
            customDiv="max-w-fit"
            :disabled="true"
            v-model="formData.pageChange.date_review_announce"
          />
          <TextInputLabelLeft
            label="วันสุดท้ายของการจ่ายค่าตีพิมพ์"
            type="date"
            customLabel="w-auto min-w-fit"
            customDiv="max-w-fit"
            :disabled="true"
            v-model="formData.pageChange.final_date"
          />
        </div>

        <SectionWrapper>
          <div class="flex flex-row mt-3">
            <p class="flex text-blue-500 w-12 items-center">(ถ้ามี)</p>
            <TextInputLabelLeft
              label="บทความวิจัยนี้เป็นผลงานจากโครงการวิจัยเรื่อง"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-fit"
              :disabled="true"
              v-model="formData.pageChange.article_research_ject"
            />
          </div>
          <p>ประเภทโครงการวิจัย</p>
          <div class="flex flex-row ml-5">
            <RadioInput
              label="วิจัยพื้นฐาน"
              value="basic"
              name="type"
              customDiv="max-w-fit mr-10 flex items-center"
              :disabled="true"
              v-model="formData.pageChange.research_type"
            />
            <RadioInput
              label="วิจัยประยุกต์"
              value="applied"
              name="type"
              customDiv="max-w-fit mr-10 flex items-center"
              :disabled="true"
              v-model="formData.pageChange.research_type"
            />
            <RadioInput
              label="วิจัยและพัฒนา"
              value="research&development"
              name="type"
              customDiv="max-w-fit mr-10 flex items-center"
              :disabled="true"
              v-model="formData.pageChange.research_type"
            />
            <div class="flex flex-row">
              <RadioInput
                label="วิจัยอื่น ๆ "
                value="วิจัยother"
                name="type"
                customDiv="max-w-fit mr-2 flex items-center"
                :disabled="true"
                v-model="formData.pageChange.research_type"
              />
              <TextInputLabelLeft
                v-if="formData.pageChange.research_type == 'วิจัยother '"
                label="(ระบุ)"
                name="type"
                customDiv="max-w-fit flex items-center"
                :disabled="true"
                v-model="formData.pageChange.research_type2"
              />
            </div>
          </div>

          <TextInputLabelLeft
            label="ชื่อแหล่งทุนวิจัย"
            customLabel="w-auto min-w-fit"
            :disabled="true"
            v-model="formData.pageChange.name_funding_source"
          />
          <div class="flex flex-row">
            <TextInputLabelLeft
              label="วงเงินงบประมาณการวิจัย"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-max mr-10"
              :disabled="true"
              v-model="formattedBudget.budget_limit"
            />
            <TextInputLabelLeft
              label="ประจำปี"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-max mr-10"
              :disabled="true"
              v-model="formData.pageChange.annual"
            />
          </div>
        </SectionWrapper>
      </SectionWrapper>
    </Mainbox>
    <!-- 3. ผู้ขอรับการสนับสนุน -->
    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title text-lg font-bold">3. ผู้ขอรับการสนับสนุน</p>
      <SectionWrapper class="collapse-content">
        <RadioInput
          label="ผู้ประพันธ์อันดับแรก First Author"
          value="First Author"
          name="Author"
          :disabled="true"
          v-model="formData.pageChange.presenter_type"
        />
        <RadioInput
          label="ผู้ประพันธ์บรรณกิจ Corresponding Author"
          value="Corresponding Author"
          name="Author"
          :disabled="true"
          v-model="formData.pageChange.presenter_type"
        />
      </SectionWrapper>
    </Mainbox>
    <!-- 4. ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge) -->
    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title leading-9 text-lg font-bold">
        4. ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge)
      </p>
      <SectionWrapper class="collapse-content">
        <TextInputLabelLeft
          label="จำนวนเงิน"
          customLabel="w-auto min-w-fit"
          customInput="max-w-fit"
          :disabled="true"
          v-model="formattedBudget.request_support"
        />
      </SectionWrapper>
    </Mainbox>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";
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
});

//isLoading เพื่อแสดงสถานะว่ากำลังโหลดข้อมูล
const isLoading = ref(true);
// Access route parameters
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

const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') return '0.00';
  const num = parseFloat(value);
  if (isNaN(num)) return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const formattedBudget = computed(() => {
  const b = formData.pageChange;
  return {
    ...b,
    support_limit: formatNumber(b.support_limit),
    budget_limit: formatNumber(b.budget_limit),
    request_support: formatNumber(b.request_support),
  };
});

// ดึงข้อมูลเมื่อ component ถูกโหลด
onMounted(async () => {
  await fetchProfessorData();
  loopdata();
});
</script>
