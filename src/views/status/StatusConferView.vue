<template>
  <div class="container my-10 mx-auto">
    <h1 class="text-xl font-bold p-5">สถานะเอกสาร</h1>
    <Mainbox>
      <h2 class="text-lg font-bold mb-5">
        ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
      </h2>
      <p class="ml-5">ชื่อการประชุม : {{ data.confer_name }}</p>
      <p class="ml-5">ชื่อบทความ : {{ data.name }}</p>

      <div class="flex justify-center" v-if="data.form.form_status == 'notApproved'">
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li data-content="" class="step w-40">ฝ่ายบริหารทรัพยากรบุคคล</li>
          <li data-content="" class="step w-40">ฝ่ายบริหารงานวิจัย</li>
          <li data-content="" class="step w-40">ฝ่ายบริหารการเงิน</li>
          <li data-content="" class="step w-40">รองคณบดี</li>
          <li data-content="" class="step w-40">คณบดี</li>
          <li data-content="" class="step w-40">รออนุมัติ</li>
          <li data-content="✗" class="step step-error w-40">ไม่อนุมัติ</li>
        </ul>
      </div>

      <div class="flex justify-center" v-if="data.form.form_status == 'approve'">
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารทรัพยากรบุคคล
          </li>
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารงานวิจัย
          </li>
          <li data-content="✓" class="step step-primary w-40">ฝ่ายบริหารการเงิน</li>
          <li data-content="✓" class="step step-primary w-40">รองคณบดี</li>
          <li data-content="✓" class="step step-primary w-40">คณบดี</li>
          <li data-content="✓" class="step step-primary w-40">รออนุมัติ</li>
          <li data-content="✓" class="step step-primary w-40">อนุมัติ</li>
        </ul>
      </div>

      <div class="flex justify-center" v-if="data.form.form_status == 'waitingApproval'">
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารทรัพยากรบุคคล
          </li>
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารงานวิจัย
          </li>
          <li data-content="✓" class="step step-primary w-40">ฝ่ายบริหารการเงิน</li>
          <li data-content="✓" class="step step-primary w-40">รองคณบดี</li>
          <li data-content="✓" class="step step-primary w-40">คณบดี</li>
          <li data-content="✓" class="step step-primary w-40">รออนุมัติ</li>
          <li data-content="" class="step  w-40">อนุมัติ</li>
        </ul>
      </div>

      <div class="flex justify-center" v-if="data.form.form_status == 'dean'">
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารทรัพยากรบุคคล
          </li>
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารงานวิจัย
          </li>
          <li data-content="✓" class="step step-primary w-40">ฝ่ายบริหารการเงิน</li>
          <li data-content="✓" class="step step-primary w-40">รองคณบดี</li>
          <li data-content="✓" class="step step-primary w-40">คณบดี</li>
          <li data-content="" class="step w-40">รออนุมัติ</li>
          <li data-content="" class="step w-40">อนุมัติ</li>
        </ul>
      </div>

      <div class="flex justify-center" v-if="data.form.form_status == 'associate'">
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารทรัพยากรบุคคล
          </li>
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารงานวิจัย
          </li>
          <li data-content="✓" class="step step-primary w-40">ฝ่ายบริหารการเงิน</li>
          <li data-content="✓" class="step step-primary w-40">รองคณบดี</li>
          <li data-content="" class="step w-40">คณบดี</li>
          <li data-content="" class="step w-40">รออนุมัติ</li>
          <li data-content="" class="step w-40">อนุมัติ</li>
        </ul>
      </div>

      <div class="flex justify-center" v-if="data.form.form_status == 'finance'">
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารทรัพยากรบุคคล
          </li>
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารงานวิจัย
          </li>
          <li data-content="✓" class="step step-primary w-40">ฝ่ายบริหารการเงิน</li>
          <li data-content="" class="step w-40">รองคณบดี</li>
          <li data-content="" class="step w-40">คณบดี</li>
          <li data-content="" class="step w-40">รออนุมัติ</li>
          <li data-content="" class="step w-40">อนุมัติ</li>
        </ul>
      </div>

      <div class="flex justify-center" v-if="data.form.form_status == 'research'">
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารทรัพยากรบุคคล
          </li>
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารงานวิจัย
          </li>
          <li data-content="" class="step w-40">ฝ่ายบริหารการเงิน</li>
          <li data-content="" class="step w-40">รองคณบดี</li>
          <li data-content="" class="step w-40">คณบดี</li>
          <li data-content="" class="step w-40">รออนุมัติ</li>
          <li data-content="" class="step w-40">อนุมัติ</li>
        </ul>
      </div>

      <div class="flex justify-center" v-if="data.form.form_status == 'hr'">
        <ul class="steps steps-vertical lg:steps-horizontal">
          <li data-content="✓" class="step step-primary w-40">
            ฝ่ายบริหารทรัพยากรบุคคล
          </li>
          <li data-content="" class="step w-40">ฝ่ายบริหารงานวิจัย</li>
          <li data-content="" class="step w-40">ฝ่ายบริหารการเงิน</li>
          <li data-content="" class="step w-40">รองคณบดี</li>
          <li data-content="" class="step w-40">คณบดี</li>
          <li data-content="" class="step w-40">รออนุมัติ</li>
          <li data-content="" class="step w-40">อนุมัติ</li>
        </ul>
      </div>
    </Mainbox>

    <div class="flex justify-end mr-5">
      <button @click="showData = !showData" class="btn text-black border-[#4285F4] hover:bg-[#4285F4]">
        ข้อมูลแบบฟอร์ม
      </button>
    </div>

    <div v-if="showData" class="showData">
      <ConferenceData :id="id" />
      <HR :id="id" />
      <Research :id="id" :type="'Conference'" />
      <FinanceAll :id="id" :type="'Conference'" />
      <Assosiate :id="id" :type="'Conference'" />
      <Dean :id="id" :type="'Conference'" />
      <WithdrawMoney :id="id" :type="'Conference'" />
    </div>
  </div>
</template>

<script setup>
import Mainbox from "@/components/form/Mainbox.vue";

import api from "@/setting/api";

import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import ConferenceData from "@/components/form/DataforOffice/Conference.vue";
import HR from "@/components/form/DataforOffice/HR.vue";
import Research from "@/components/form/DataforOffice/Research.vue";
import FinanceAll from "@/components/form/DataforOffice/FinanceAll.vue";
import Assosiate from "@/components/form/DataforOffice/Assosiate.vue";
import Dean from "@/components/form/DataforOffice/Dean.vue";
import WithdrawMoney from "@/components/form/DataforOffice/WithdrawMoney.vue";

const route = useRoute();
const id = route.params.id;

const data = reactive({
  form: "",
  conf: "",
  name: "",
  confer_name: "",
  withdraw: "",

  //file
  full_page: null,
  published_journals: null,
  q_proof: null,
  call_for_paper: null,
  accepted: null,
  fee_receipt: null,
  fx_rate_document: null,
  conf_proof: null,

  //url
  f_full_page: null,
  f_published_journals: null,
  f_q_proof: null,
  f_call_for_paper: null,
  f_accepted: null,
  f_fee_receipt: null,
  f_fx_rate_document: null,
  f_conf_proof: null,

  //setfile
  file: "",

  check: false,
});

const showData = ref(true)

//ดึงข้อมูล
const getDataConf = async () => {
  if (id == null || id == "") {
    alert("โปรดเข้าสู่ระบบใหม่อีกครั้ง");
  }

  try {
    const response = await api.get(`/form/confer/${id}`);

    data.form = response.data.form;
    data.conf = response.data.conf;
    data.confer_name = response.data.confer_name;
    data.name = response.data.name;
    data.withdraw = response.data.withdraw;
  } catch (error) {
    console.log("Error", error);
  }
};

//update file
const updateFile = async () => {
  const result = await v$.value.$validate();

  // ตรวจสอบว่าทุกค่ามีข้อมูล ไม่ใช่ "" หรือ null
  const requiredFields = [
    data.full_page,
    data.call_for_paper,
    data.accepted,
    data.fee_receipt,
    data.fx_rate_document,
    data.conf_proof,
  ];

  const hasEmptyField = requiredFields.some((field) => !field || field === "");

  if (hasEmptyField) {
    alert("กรุณาอัปโหลดไฟล์ให้ครบทุกช่องก่อนบันทึกข้อมูล");
    return;
  }

  if (result) {
    try {
      const dataforupdate = {
        conf_id: id,
        full_page: data.full_page,
        call_for_paper: data.call_for_paper,
        accepted: data.accepted,
        fee_receipt: data.fee_receipt,
        fx_rate_document: data.fx_rate_document,
        conf_proof: data.conf_proof,
        published_journals: data.published_journals,
        q_proof: data.q_proof,
      };

      const response = await api.put("updateFileConf", dataforupdate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      alert("บันทึกข้อมูลเรียบร้อย");

      location.reload();
    } catch (error) {
      console.log(error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  } else {
    alert("กรุณาอัปโหลดไฟล์ PDF");
  }
};

onMounted(async () => {
  await getDataConf();
});
</script>
