<template>
  <div>
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
            v-model="formData.userForm.user_nameth"
          />
          <TextInputLabelLeft
            label="ตำแหน่ง"
            customLabel="w-2/12 text-lg font-bold"
            v-model="formData.userForm.user_positionth"
            :disabled="true"
          />
          <div class="flex flex-row">
            <TextInputLabelLeft
              label="มีรายชื่ออยู่ใน List ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่"
              customLabel="w-auto"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.pageC_times"
            />
            <TextInputLabelLeft
              label="วันที่"
              type="date"
              customLabel="ml-2 w-10"
              customInput="max-w-max"
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
            v-model="formData.pageChange.journal_name"
          />
          <p>เป็นวารสารที่อยู่ในฐานข้อมูลสากล</p>

          <div class="flex flex-row">
            <CheckInput
              label="ISI ได้รับการจัดลำดับ Quartile "
              value="ISI"
              customDiv="max-w-72 flex items-center"
              v-model="formData.pageChange.quality_journal"
            />
            <TextInputLabelLeft
              label="ปี"
              customLabel="mr-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.pc_isi_year"
            />
            <TextInputLabelLeft
              label="ลำดับ Quartile"
              customLabel="mr-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.qt_isi"
            />
            <TextInputLabelLeft
              label="Impact Factor"
              customLabel="w-28 mx-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.impact_factor"
            />
          </div>

          <div class="flex flex-row">
            <CheckInput
              label="SJR ได้รับการจัดลำดับ Quartile "
              value="SJR"
              customDiv="max-w-72 flex items-center"
              v-model="formData.pageChange.quality_journal"
            />
            <TextInputLabelLeft
              label="ปี"
              customLabel="mr-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.pc_sjr_year"
            />
            <TextInputLabelLeft
              label="ลำดับ Quartile"
              customLabel="mr-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.qt_sjr"
            />
            <TextInputLabelLeft
              label="SJR Score"
              customLabel="w-28 mx-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.sjr_score"
            />
          </div>

          <div class="flex flex-row">
            <CheckInput
              label="Scopus ได้รับการจัดลำดับ Quartile "
              value="Scopus"
              customDiv="max-w-72 flex items-center"
              v-model="formData.pageChange.quality_journal"
            />
            <TextInputLabelLeft
              label="ปี"
              customLabel="mr-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.pc_scopus_year"
            />
            <TextInputLabelLeft
              label="ลำดับ Quartile"
              customLabel="mr-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.qt_scopus"
            />
            <TextInputLabelLeft
              label="Cite Score"
              customLabel="w-28 mx-2"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="formData.pageChange.cite_score"
            />
          </div>

          <div class="flex flex-row">
            <CheckInput
              label="Nature"
              value="nature"
              customDiv="max-w-72 flex items-center"
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
                v-model="formData.pageChange.support_limit"
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
            v-model="formData.pageChange.article_title"
          />
          <TextInputLabelLeft
            label="จำนวนนักวิจัยร่วม"
            customLabel="w-[10%]"
            v-model="formData.pageChange.num_co_researchers"
          />
          <div v-for="(index) in parseInt(formData.pageChange.num_co_researchers)  || 0" :key="index" >
            <div class="flex flex-row gap-4">
              <p class="pt-2">{{ index }}.</p>
              <TextInputLabelLeft
                label="ชื่อ-นามสกุลของนักวิจัยร่วม"
                customLabel="w-[100%]"
                customDiv="max-w-[30%]"
                v-model="formData.pageChange.name_co_researchers[index]"
              />
              <TextInputLabelLeft
                label="หลักสูตรของนักวิจัยร่วม"
                customLabel="w-[100%]"
                customDiv="max-w-[25%]"
                v-model="formData.pageChange.course_co_researchers[index]"
              />
            </div>
          </div>

          <p>กำหนดการที่คาดว่าจะได้รับการลงตีพิมพ์ในวารสาร</p>
          <div class="flex flex-row mt-2 justify-between">
            <TextInputLabelLeft
              label="ปีที่ (Vol.)"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-fit"
              v-model="formData.pageChange.vol_journal"
            />
            <TextInputLabelLeft
              label="ฉบับที่ (Issue)"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-fit"
              v-model="formData.pageChange.issue_journal"
            />
            <TextInputLabelLeft
              label="เดือน"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-fit"
              v-model="formData.pageChange.month"
            />
            <div class="flex flex-row">
              <TextInputLabelLeft
                label="ปี ค.ศ./พ.ศ."
                customLabel="w-auto min-w-fit"
                customDiv="max-w-fit"
                v-model="formData.pageChange.year"
              />
              <TextInputLabelLeft
                label="เลขที่ ISSN/ISBN (อื่นๆ)"
                customLabel="w-auto min-w-fit"
                customDiv="max-w-fit"
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
              v-model="formData.pageChange.submission_date"
            />
            <TextInputLabelLeft
              label="วันประกาศผลการพิจารณา"
              type="date"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-fit"
              v-model="formData.pageChange.date_review_announce"
            />
            <TextInputLabelLeft
              label="วันสุดท้ายของการจ่ายค่าตีพิมพ์"
              type="date"
              customLabel="w-auto min-w-fit"
              customDiv="max-w-fit"
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
                v-model="formData.pageChange.research_type"
              />
              <RadioInput
                label="วิจัยประยุกต์"
                value="applied"
                name="type"
                customDiv="max-w-fit mr-10 flex items-center"
                v-model="formData.pageChange.research_type"
              />
              <RadioInput
                label="วิจัยและพัฒนา"
                value="research&development"
                name="type"
                customDiv="max-w-fit mr-10 flex items-center"
                v-model="formData.pageChange.research_type"
              />
              <div class="flex flex-row">
                <RadioInput
                  label="วิจัยอื่น ๆ "
                  value="วิจัยother"
                  name="type"
                  customDiv="max-w-fit mr-2 flex items-center"
                  v-model="formData.pageChange.research_type"
                />
                <TextInputLabelLeft
                  v-if="formData.pageChange.research_type == 'วิจัยother '"
                  label="(ระบุ)"
                  name="type"
                  customDiv="max-w-fit flex items-center"
                  v-model="formData.pageChange.research_type2"
                />
              </div>
            </div>

            <TextInputLabelLeft
              label="ชื่อแหล่งทุนวิจัย"
              customLabel="w-auto min-w-fit"
              v-model="formData.pageChange.name_funding_source"
            />
            <div class="flex flex-row">
              <TextInputLabelLeft
                label="วงเงินงบประมาณการวิจัย"
                customLabel="w-auto min-w-fit"
                customDiv="max-w-max mr-10"
                v-model="formData.pageChange.budget_limit"
              />
              <TextInputLabelLeft
                label="ประจำปี"
                customLabel="w-auto min-w-fit"
                customDiv="max-w-max mr-10"
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
            v-model="formData.pageChange.presenter_type"
          />
          <RadioInput
            label="ผู้ประพันธ์บรรณกิจ Corresponding Author"
            value="Corresponding Author"
            name="Author"
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
            v-model="formData.pageChange.request_support"
          />
        </SectionWrapper>
      </Mainbox>
    </div>

    <div class="flex w-full ">
      <div class="flex flex-1 justify-start ">
        <button @click="saveDraft" class="bg-blue-500 text-white px-4 py-2 rounded mr-3">
          บันทึกแบบร่าง
        </button>
        <button @click="clearDraft" class="bg-red-500 text-white px-4 py-2 rounded mr-3">
          ลบแบบร่าง
        </button>
      </div>

      <div class="flex flex-1 justify-end">
        <button @click="handleSubmit" class="btn btn-success text-white">
          บันทึกข้อมูลที่แก้ไข
        </button>
      </div>
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

// จัดการข้อมูลหลัก
const formData = reactive({
  pageChange: {},
  originPc: {},
  userForm: {},
  name: "",

  check: [],
  checkISI: "",
  checkSJR: "",
  checkScopus: "",
  nature: "",
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
// ตัวแปรสำหรับเก็บข้อมูลจาก backend


// โหลด draft จาก localStorage ถ้ามี
const loadDraft = () => {
  const draftKey = `draft-form-PC-${id}`;
  console.log("draftKey",draftKey)
  const draft = localStorage.getItem(draftKey);
  console.log("draft",draft)
  if (draft) {
    try {
    const parsed = JSON.parse(draft);
    console.log("parsed",parsed)
    if (parsed) {
      formData.pageChange = parsed.pageChange;
      formData.userForm = parsed.userForm;
      console.log("โหลดข้อมูลจาก draft:", formData);
      return true;
    }
  }catch (e) {
      console.warn("Draft format ผิดพลาด:", e);
    }
  }
  return false;
};

const saveDraft = () => {
  const rawData = toRaw(formData);
  const draftKey = `draft-form-PC-${id}`;
  localStorage.setItem(draftKey, JSON.stringify(rawData));
  alert("บันทึกแบบร่างเรียบร้อยแล้ว");
};

const clearDraft = () => {
  const draftKey = `draft-form-PC-${id}`;
  localStorage.removeItem(draftKey);
  alert("ลบแบบร่างสำเร็จ");
};

const isEqual = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
};

const getChangedFields = () => {
  const current = toRaw(formData.pageChange);
  const originalPageChange = formData.originPc;
  const changedFields = [];

  for (const key in current) {
    if (!isEqual(current[key], originalPageChange[key])) {
      changedFields.push({
        field: key,
        oldValue: originalPageChange[key],
        newValue: current[key],
      });
    }
  }
  return changedFields;
};

const handleSubmit = async() => {
  const changed = getChangedFields();

  if (changed.length === 0) {
    alert("ไม่มีการเปลี่ยนแปลงข้อมูล");
    return;
  }
  console.log("ฟิลด์ที่ถูกแก้ไข:", changed);

  // ถ้าต้องการส่งเฉพาะที่เปลี่ยน:
  const payload = {};
  changed.forEach((item) => {
    payload[item.field] = item.newValue;
  });

  try{
    const dataForBackend = {
      pageC_id: id,
      edit_data: changed,
      editor: formData.name,
      professor_reedit: false,
    }
    console.log("dataForBackend: ",dataForBackend)
    await api.put(`/editedFormPageChage/${id}`, dataForBackend)
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");

    const draftKey = `draft-form-PC-${id}`;
    localStorage.removeItem(draftKey);

    router.push("/officer");
  }catch (error) {
      console.log("Error saving code : ", error);
      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    }
};

const fetchOfficerData = async () => {
  try {
    const responsePC = await api.get(`/page_charge/${id}`);
    const userID = responsePC.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    formData.userForm = responseUser.data;

    formData.pageChange = responsePC.data;
    formData.check = formData.pageChange.quality_journal;
  } catch (error) {
    console.log("Error fetching professor data:", error);
  } finally {
    isLoading.value = false;
  }
  console.log("Fetching professor data...");
};

const fetchOfficerDataorigin = async () => {
  try {
    const responsePC = await api.get(`/page_charge/${id}`);
    formData.originPc = JSON.parse(JSON.stringify(responsePC.data));
  } catch (error) {
    console.log("Error fetching professor data:", error);
  } finally {
    isLoading.value = false;
  }
  console.log("Fetching professor data...");
};

const loopdata = async () => {
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

// ดึงข้อมูลเมื่อ component ถูกโหลด
onMounted(async () => {
  fetchOfficerDataorigin();
  const draftLoaded = loadDraft(); // คืนค่า true ถ้ามี draft
  if (!draftLoaded) {
    await fetchOfficerData(); // โหลดจากฐานข้อมูลเฉพาะถ้าไม่มี draft
  }
  loopdata();
  await userStore.fetchUser();
  formData.name = user.value?.user_nameth || "";
});
</script>
