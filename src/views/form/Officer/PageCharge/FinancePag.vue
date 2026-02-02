<template>
  <div class="container my-10 mx-auto">
    <PageChageData :id="id" />
    <Research :id="id" :type="'Page_Charge'" />
    <Mainbox>
      <SectionWrapper>
        <p>ตรวจสอบเงินงบประมาณประจำปีที่จัดสรรในการเผยแพร่ผลงานวิชาการ</p>
        <TextInputLabelLeft
          label="ปีงบประมาณ พ.ศ."
          customInput="max-w-max text-center"
          v-model="formData.year"
          @input="handleInput('year', $event.target.value)"
        />
        <div class="flex justify-end">
          <div class="flex flex-row justify-between">
            <TextInputLabelLeft
              label="วงเงินที่คณะจัดสรรไว้ จำนวนเงินทั้งสิ้น"
              customInput="max-w-max text-center"
              v-model="formData.totalAll"
              @input="handleInput('totalAll', $event.target.value)"
            />
            <p class="flex items-center w-12">บาท</p>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="flex flex-row justify-between">
            <TextInputLabelLeft
              label="โดยคณะได้อนุมัติค่าใช้จ่ายในการเสนอผลงานวิชาการไปแล้ว จำนวน"
              customInput="max-w-max text-center"
              :placeholder="parseFloat(formData.numapproved).toLocaleString('en-US', {minimumFractionDigits: 0})"
              v-model="formData.numapproved"
            />
            <p class="flex items-center w-12">รายการ</p>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="flex flex-row justify-between">
            <TextInputLabelLeft
              label="รวมเป็นเงิน"
              customInput="max-w-max text-center"
              :placeholder="parseFloat(formData.totalapproved).toLocaleString('en-US', {minimumFractionDigits: 0})"
              v-model="formData.totalapproved"
            />
            <p class="flex items-center w-12">บาท</p>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="flex flex-row justify-between">
            <TextInputLabelLeft
              label="วงเงินที่คณะจัดสรรไว้ คงเหลือ"
              customInput="max-w-max text-center"
              :placeholder="caltotalFaculty"
              v-model="formData.caltotalFaculty"
            />
            <p class="flex items-center w-12">บาท</p>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="flex flex-row justify-between">
            <TextInputLabelLeft
              label="จำนวนเงินที่ขออนุมัติค่า Page Charge ในครั้งนี้ เป็นจำนวนเงิน"
              customInput="max-w-max text-center"
              :placeholder="parseFloat(formData.canWithdrawn).toLocaleString('en-US', {minimumFractionDigits: 0})"
              v-model="formData.canWithdrawn"
            />
            <p class="flex items-center w-12">บาท</p>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="flex flex-row justify-between">
            <TextInputLabelLeft
              label="วงเงินที่คณะจัดสรรไว้ คงเหลือทั้งสิ้น"
              customInput="max-w-max text-center"
              :placeholder="caltotalFacultyNow"
              v-model="formData.totalcreditLimit"
            />
            <p class="flex items-center w-12">บาท</p>
          </div>
        </div>
        <span v-if="v$.year.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.year.$errors[0].$message }}
        </span>
        <span v-if="v$.totalAll.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.totalAll.$errors[0].$message }}
        </span>
      </SectionWrapper>
    </Mainbox>

    <Mainbox>
      <SectionWrapper>
        <RadioInput
          label="อนุมัติ"
          value="approved"
          name="recheckinfo"
          v-model="formData.radioAuthOffic"
        />
        <RadioInput
          label="เงินสำรองไม่เพียงพอ"
          value="pending"
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
        <RadioInput
          label="ตีกลับเจ้าหน้าที่งานวิจัยเพื่อแก้ไขข้อมูล"
          value="return_research"
          name="recheckinfo"
          v-model="formData.radioAuthOffic"
        />
        <textarea
          class="textarea textarea-bordered w-full"
          @input="handleInput('comment_text', $event.target.value)"
        ></textarea>
        <span
          v-if="v$.comment_text.$error"
          class="text-base font-bold text-red-500 text-left"
        >
          {{ v$.comment_text.$errors[0].$message }}
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
import { onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  maxValue,
  minValue,
  numeric,
  decimal,
  requiredIf,
} from "@vuelidate/validators";
import { DateTime } from "luxon";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";
import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import PageChageData from "@/components/form/DataforOffice/PageChage.vue";
import Research from "@/components/form/DataforOffice/Research.vue";

const formData = reactive({
  offic: [],
  year: "",
  totalAll: 0,
  numapproved: 0,
  totalapproved: 0,
  creditLimit: 0,
  canWithdrawn: 0,
  totalcreditLimit: 0,
  docSubmitDate: DateTime.now().toISODate(),
  typeFile: "Page_Charge",
  form_id: 0,
  radioAuthOffic: null,
  comment_text: null,
  newmoneyRequested: null,

  olddata: {},
  bud: {}
});

const handleInput = (key, value) => {
  formData[key] = value;
};

const caltotalFaculty = computed(() => {
  formData.creditLimit =
    parseFloat(formData.totalAll) - parseFloat(formData.totalapproved);
  return formData.creditLimit.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
});

const caltotalFacultyNow = computed(() => {
  formData.totalcreditLimit =
    parseFloat(formData.creditLimit) - parseFloat(formData.canWithdrawn);
  return formData.totalcreditLimit.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
});

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const user = computed(() => userStore.user);

const fetchProfessorData = async () => {
  try {
    const responseBudget = await api.get(`/budgetsPC`);
    formData.numapproved = responseBudget.data.numapproved;
    formData.totalapproved = responseBudget.data.totalapproved == null ? 0 : responseBudget.data.totalapproved;

    const responseFormPC = await api.get(`/formPageCharge/${id}`);
    formData.form_id = responseFormPC.data.form_id;
    formData.olddata = responseFormPC.data;

    const responseoldBudget = await api.get(`/budget/pageCharge/${id}`);
    formData.bud = responseoldBudget.data;
  } catch (error) {
    console.log("Error fetching professor data:", error);
  }
};

const cal = async () => {
  try {
    const responseCalPC = await api.get(`/page_charge/calc/${id}`);
    formData.canWithdrawn = responseCalPC.data.withdrawn;
    return formData.canWithdrawn;
  } catch (error) {
    console.log("Error fetching professor data:", error);
  }
};


const now = new Date();
    let fiscalYear = now.getFullYear() + 543;
    if (now.getMonth() + 1 >= 10) fiscalYear += 1;

const rules = computed(() => ({
  year: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลปีงบประมาณเป็นพ.ศ. *",
      required
    ),
    minValue: helpers.withMessage(
      `* ปีงบประมาณต้องไม่ต่ำกว่า ${fiscalYear - 1} *`,
      minValue(fiscalYear - 1)
    ),
    maxValue: helpers.withMessage(
      `* ปีงบประมาณต้องไม่เกิน ${fiscalYear} *`,
      maxValue(fiscalYear)
    ),
  },
  totalAll: {
    required: helpers.withMessage("* กรุณากรอกจำนวนเงิน *",
      requiredIf(() => formData.radioAuthOffic === "approved")),
    numeric: helpers.withMessage("* กรุณากรอกตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณากรอกตัวเลข *", decimal),
    minValue: helpers.withMessage("* ไม่ต่ำกว่า 1 *",minValue(1))
  },
  comment_text: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูล *",
      requiredIf(() => formData.radioAuthOffic !== "approved")
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

const statusMap = {
  approved: "associate",
  notApproved: "notApproved",
  return_professor: "return",
  return_research: "return",
  pending: "pending",
};

const returnMap = {
  approved: null,
  notApproved: null,
  return_professor: "professor",
  return_research: "research",
  pending: null,
};

const OfficerPC = async () => {
  const result = await v$.value.$validate();
  if (result) {
    if (confirm("ยืนยันข้อมูลถูกต้อง") == false) {
      return false;
    }

    console.log("formData", formData);
    console.log("formData.bud", formData.bud);

    if (
      formData.radioAuthOffic === "pending" &&
      formData.comment_text != null
    ) {
      const dataForBackend = {
        form_id: formData.form_id,
        form_status: formData.radioAuthOffic,
        comment_pending: formData.comment_text,
      };
      await api.post(`/budget`, dataForBackend);
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      router.push("/officer");
    }
    if (formData.olddata.form_status !== "return" &&  (!formData.bud || Object.keys(formData.bud).length === 0)) {
      try {
        const dataForBackend = {
          user_id: user.value?.user_id,
          form_id: formData.form_id,
          budget_year: formData.year,
          Page_Charge_amount: formData.totalAll,
          num_expenses_approved: formData.numapproved,
          total_amount_approved: formData.totalapproved,
          remaining_credit_limit: formData.creditLimit,
          amount_approval: formData.canWithdrawn,
          total_remaining_credit_limit: formData.totalcreditLimit,
          doc_submit_date: formData.docSubmitDate,

          form_status: statusMap[formData.radioAuthOffic],
          returnto: returnMap[formData.radioAuthOffic],
          return_note: formData.comment_text || null,
          past_return:
            statusMap[formData.radioAuthOffic] == "return"
              ? user.value?.user_role
              : null,
        };

        await api.post(`/budget`, dataForBackend);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    } else if (formData.olddata.form_status === "return") {
      try {
        const dataForBackend = {
          user_id: user.value?.user_id,
          form_id: formData.form_id,
          budget_year: formData.year,
          Page_Charge_amount: formData.totalAll,
          num_expenses_approved: formData.numapproved,
          total_amount_approved: formData.totalapproved,
          remaining_credit_limit: formData.creditLimit,
          amount_approval: formData.canWithdrawn,
          total_remaining_credit_limit: formData.totalcreditLimit,
          doc_submit_date: formData.docSubmitDate,

          form_status: formData.radioAuthOffic === null ? formData.olddata?.past_return : statusMap[formData.radioAuthOffic],
          returnto: null,
          return_note: formData.comment_text,
          past_return: null
        };

        await api.put(`/updateBudget/${formData.form_id}`, dataForBackend);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    } else if (formData.olddata.form_status !== "return" && JSON.stringify(formData.bud)) {
      try {
        const dataForBackend = {
          user_id: user.value?.user_id,
          form_id: formData.form_id,
          budget_year: formData.year,
          Page_Charge_amount: formData.totalAll,
          num_expenses_approved: formData.numapproved,
          total_amount_approved: formData.totalapproved,
          remaining_credit_limit: formData.creditLimit,
          amount_approval: formData.canWithdrawn,
          total_remaining_credit_limit: formData.totalcreditLimit,
          doc_submit_date: formData.docSubmitDate,

          form_status: statusMap[formData.radioAuthOffic],
          returnto: returnMap[formData.radioAuthOffic],
          return_note: formData.comment_text || null,
          past_return:
            statusMap[formData.radioAuthOffic] == "return"
              ? user.value?.user_role
              : null,
        };

        console.log("dataForBackend", dataForBackend);

        await api.put(`/updateBudget/${formData.form_id}`, dataForBackend);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");
  }
};

onMounted(async () => {
  await fetchProfessorData();
  cal();
});
</script>
