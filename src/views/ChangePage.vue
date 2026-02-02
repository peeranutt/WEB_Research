<template>
  <div class="container my-10 mx-auto">
    <h1 class="text-xl font-bold mb-5">แก้ไขเงื่อนไขในการพิจารณาการสนับสนุน</h1>
    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title text-lg font-bold">Page Change</p>
      <SectionWrapper class="collapse-content">
        <TextInputLabelLeft label="จำนวนเงินที่เบิกได้เมื่ออยู่ใน Nature" customLabel="w-4/12 mr-2"
          v-model="formData.pageChange.natureAmount" />
        <SectionWrapper>
          <p>วารสารอยู่ในฐานข้อมูลสากล ISI, SJR หรือ Scopus</p>
          <SectionWrapper>
            <p>ถ้าวารสารเป็นของสำนักพิมพ์ MDPI, Frontiers, Hindawi</p>
            <TextInputLabelLeft label="จำนวนเงินที่เบิกได้เมื่ออยู่ใน Quartile 1" customLabel="w-4/12 mr-2"
              v-model="formData.pageChange.mdpiFrontiersHindawi.quartile1" />
            <TextInputLabelLeft label="จำนวนเงินที่เบิกได้เมื่ออยู่ใน Quartile 2" customLabel="w-4/12 mr-2"
              v-model="formData.pageChange.mdpiFrontiersHindawi.quartile2" />
          </SectionWrapper>
          <SectionWrapper>
            <p>ถ้าวารสารเป็นของสำนักพิมพ์other</p>
            <TextInputLabelLeft label="จำนวนเงินที่เบิกได้เมื่ออยู่ใน Quartile 1" customLabel="w-4/12 mr-2"
              v-model="formData.pageChange.otherPublisher.quartile1" />
            <TextInputLabelLeft label="จำนวนเงินที่เบิกได้เมื่ออยู่ใน Quartile 2" customLabel="w-4/12 mr-2"
              v-model="formData.pageChange.otherPublisher.quartile2" />
            <TextInputLabelLeft label="จำนวนเงินที่เบิกได้เมื่ออยู่ใน Quartile 3" customLabel="w-4/12 mr-2"
              v-model="formData.pageChange.otherPublisher.quartile3" />
            <TextInputLabelLeft label="จำนวนเงินที่เบิกได้เมื่ออยู่ใน Quartile 4" customLabel="w-4/12 mr-2"
              v-model="formData.pageChange.otherPublisher.quartile4" />
          </SectionWrapper>
        </SectionWrapper>
        <div class="flex justify-end mx-10">
          <button @click="submitPC" class="btn btn-success text-white">
            บันทึกข้อมูล
          </button>
        </div>
      </SectionWrapper>
    </Mainbox>

    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title text-lg font-bold">Conference</p>
      <SectionWrapper class="collapse-content">
        <TextInputLabelLeft label="จำนวนครั้งในการลามากที่สุด (ในประเทศไทย)" customLabel="w-4/12 mr-2"
          v-model="formData.conference.maxLeaveinThai" />
        <TextInputLabelLeft label="จำนวนครั้งในการลามากที่สุด (ต่างประเทศ)" customLabel="w-4/12 mr-2"
          v-model="formData.conference.maxLeaveoutThai" />
        <TextInputLabelLeft label="พนักงานที่ไม่เคยไปประชุมวิชาการ ต้องทำงานไม่เกินกี่ปี" customLabel="w-4/12 mr-2"
          v-model="formData.conference.workTimeYears" />
        <TextInputLabelLeft label="วารสารใน WOS Q1 ,2 ,3 หรือ SJR Q1, 2 ไม่เกินกี่ปี" customLabel="w-4/12 mr-2"
          v-model="formData.conference.journalYears" />
        <SectionWrapper>
          <p>ระดับคะแนนคุณภาพของการประชุมวิชาการ (ดีมาก)</p>
          <SectionWrapper>
            <p></p>
            <TextInputLabelLeft label="คำนวณแบบ SJR ได้คะแนนไม่ต่ำกว่า" customLabel="w-4/12 mr-2"
              v-model="formData.conference.qualityScoreSJR" />
            <TextInputLabelLeft label="คำนวณแบบ CIF ได้คะแนนไม่ต่ำกว่า" customLabel="w-4/12 mr-2"
              v-model="formData.conference.qualityScoreCIF" />
            <!-- <TextInputLabelLeft
              label="คำนวณแบบ CORE ได้คะแนนไม่ต่ำกว่า"
              customLabel="w-4/12 mr-2"
              v-model="formData.conference.qualityScoreCORE"
            /> -->
          </SectionWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <p>การเบิกค่าใช้จ่าย (100%)</p>
          <SectionWrapper>
            <p></p>
            <TextInputLabelLeft label="ประเทศใกล้เคียง (ASEAN) ได้เบิก" customLabel="w-4/12 mr-2"
              v-model="formData.conference.expense100ASEAN" />
            <TextInputLabelLeft label="ประเทศเอเชีย ได้เบิก" customLabel="w-4/12 mr-2"
              v-model="formData.conference.expense100Asia" />
            <TextInputLabelLeft
              label="ประเทศประเทศในโซนยุโรป หรือ อเมริกาเหนือ หรือ อเมริกาใต้ หรือ ออสเตรเลีย หรือ แอฟริกา ได้เบิก"
              customLabel="w-4/12 mr-2" v-model="formData.conference.expense100EuropeAmericaAustraliaAfrica" />
          </SectionWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <p>การเบิกค่าใช้จ่าย (50%)</p>
          <SectionWrapper>
            <p></p>
            <TextInputLabelLeft label="ประเทศใกล้เคียง (ASEAN) ได้เบิก" customLabel="w-4/12 mr-2"
              v-model="formData.conference.expense50ASEAN" />
            <TextInputLabelLeft label="ประเทศเอเชีย ได้เบิก" customLabel="w-4/12 mr-2"
              v-model="formData.conference.expense50Asia" />
            <TextInputLabelLeft
              label="ประเทศประเทศในโซนยุโรป, อเมริกาเหนือ, อเมริกาใต้, ออสเตรเลีย หรือ แอฟริกา ได้เบิก"
              customLabel="w-4/12 mr-2" v-model="formData.conference.expense50EuropeAmericaAustraliaAfrica" />
          </SectionWrapper>
        </SectionWrapper>
        <div class="flex justify-end mx-10">
          <button @click="submitCF" class="btn btn-success text-white">
            บันทึกข้อมูล
          </button>
        </div>
      </SectionWrapper>
    </Mainbox>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";

//manage data
const formData = reactive({
  pageChange: {
    natureAmount: "",
    mdpiFrontiersHindawi: {
      quartile1: "",
      quartile2: "",
    },
    otherPublisher: {
      quartile1: "",
      quartile2: "",
      quartile3: "",
      quartile4: "",
    },
  },

  conference: {
    maxLeaveinThai: "",
    maxLeaveoutThai: "",
    workTimeYears: "",
    journalYears: "",
    qualityScoreSJR: "",
    qualityScoreCIF: "",
    qualityScoreCORE: null,
    expense100ASEAN: "",
    expense100Asia: "",
    expense100EuropeAmericaAustraliaAfrica: "",
    expense50ASEAN: "",
    expense50Asia: "",
    expense50EuropeAmericaAustraliaAfrica: "",
  },
});

const fetchData = async () => {
  try {
    const response = await api.get("/getConditionPC");
    const data = response.data[0] || {};
    formData.pageChange.natureAmount = data.natureAmount || "";
    formData.pageChange.mdpiFrontiersHindawi.quartile1 =
      data.mdpiQuartile1 || "";
    formData.pageChange.mdpiFrontiersHindawi.quartile2 =
      data.mdpiQuartile2 || "";
    formData.pageChange.otherPublisher.quartile1 =
      data.otherQuartile1 || "";
    formData.pageChange.otherPublisher.quartile2 =
      data.otherQuartile2 || "";
    formData.pageChange.otherPublisher.quartile3 =
      data.otherQuartile3 || "";
    formData.pageChange.otherPublisher.quartile4 =
      data.otherQuartile4 || "";

    const responseCF = await api.get("/getConditionCF");
    const dataCF = responseCF.data[0] || {};
    formData.conference.maxLeaveinThai = dataCF.maxLeaveinThai || "";
    formData.conference.maxLeaveoutThai = dataCF.maxLeaveoutThai || "";
    formData.conference.workTimeYears = dataCF.workTimeYears || "";
    formData.conference.journalYears = dataCF.journalYears || "";
    formData.conference.qualityScoreSJR = dataCF.qualityScoreSJR || "";
    formData.conference.qualityScoreCIF = dataCF.qualityScoreCIF || "";
    formData.conference.qualityScoreCORE = dataCF.qualityScoreCORE || "";
    formData.conference.expense100ASEAN = dataCF.expense100ASEAN || "";
    formData.conference.expense100Asia = dataCF.expense100Asia || "";
    formData.conference.expense100EuropeAmericaAustraliaAfrica =
      dataCF.expense100EuropeAmericaAustraliaAfrica || "";
    formData.conference.expense50ASEAN = dataCF.expense50ASEAN || "";
    formData.conference.expense50Asia = dataCF.expense50Asia || "";
    formData.conference.expense50EuropeAmericaAustraliaAfrica =
      dataCF.expense50EuropeAmericaAustraliaAfrica || "";

  } catch (error) {
    console.error("Error fetching condition data:", error);
  }
};

const submitPC = async () => {
  try {
    const dataForBackend = {
      natureAmount: parseInt(formData.pageChange.natureAmount),
      mdpiQuartile1: parseInt(formData.pageChange.mdpiFrontiersHindawi.quartile1),
      mdpiQuartile2: parseInt(formData.pageChange.mdpiFrontiersHindawi.quartile2),
      otherQuartile1: parseInt(formData.pageChange.otherPublisher.quartile1),
      otherQuartile2: parseInt(formData.pageChange.otherPublisher.quartile2),
      otherQuartile3: parseInt(formData.pageChange.otherPublisher.quartile3),
      otherQuartile4: parseInt(formData.pageChange.otherPublisher.quartile4),
    };

    console.log("Submitting page change data:", dataForBackend);
    const response = await api.post("/ConditionPC", dataForBackend);
    alert("บันทึกข้อมูลสำเร็จ");
  } catch (error) {
    console.error("Error submitting page change:", error);
    alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
  }
};
const submitCF = async () => {
  try {
    const dataForBackend = {
      maxLeaveinThai: parseInt(formData.conference.maxLeaveinThai),
      maxLeaveoutThai: parseInt(formData.conference.maxLeaveoutThai),
      workTimeYears: parseInt(formData.conference.workTimeYears),
      journalYears: parseInt(formData.conference.journalYears),
      qualityScoreSJR: parseFloat(formData.conference.qualityScoreSJR),
      qualityScoreCIF: parseFloat(formData.conference.qualityScoreCIF),
      qualityScoreCORE: parseFloat(formData.conference.qualityScoreCORE),
      expense100ASEAN: parseFloat(formData.conference.expense100ASEAN),
      expense100Asia: parseFloat(formData.conference.expense100Asia),
      expense100EuropeAmericaAustraliaAfrica: parseFloat(
        formData.conference.expense100EuropeAmericaAustraliaAfrica
      ),
      expense50ASEAN: parseFloat(formData.conference.expense50ASEAN),
      expense50Asia: parseFloat(formData.conference.expense50Asia),
      expense50EuropeAmericaAustraliaAfrica: parseFloat(
        formData.conference.expense50EuropeAmericaAustraliaAfrica
      ),
    };


    console.log("Submitting page change data:", dataForBackend);

    const response = await api.post("/ConditionCF", dataForBackend);
    alert("บันทึกข้อมูลสำเร็จ");
  } catch (error) {
    console.error("Error submitting conference data:", error);
    alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");

  }
}

onMounted(() => {
  fetchData();
});
</script>
