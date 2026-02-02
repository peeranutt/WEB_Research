<template>
  <div class="container my-10 mx-auto">
    <ConferenceData :id="id" />
    <HR :id="id" />
    <Research :id="id" :type="'Conference'" />
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
              :placeholder="
                parseFloat(formData.numapproved).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                })
              "
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
              :placeholder="
                parseFloat(formData.totalapproved).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })
              "
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
            <!-- rule base -->
            <TextInputLabelLeft
              label="จำนวนเงินที่ขออนุมัติจัดสรรในครั้งนี้ เป็นจำนวนเงิน"
              customInput="max-w-max text-center"
              :placeholder="
                parseFloat(moneyRequested).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })
              "
              v-model="formData.newmoneyRequested"
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
              v-model="formData.caltotalFacultyNow"
            />
            <p class="flex items-center w-12">บาท</p>
          </div>
        </div>
        <span
          v-if="v$.year.$error"
          class="text-base font-bold text-red-500 text-left"
        >
          {{ v$.year.$errors[0].$message }}
        </span>
        <span
          v-if="v$.totalAll.$error"
          class="text-base font-bold text-red-500 text-left"
        >
          {{ v$.totalAll.$errors[0].$message }}
        </span>

        <div class="flex justify-end">
          <button
            @click="showCreditLimit = true"
            class="btn text-black btn-warning mr-5"
          >
            คำนวณ
          </button>
        </div>

        <div class="text-red-500 flex justify-end mt-5 mr-5">
          <div v-show="showCreditLimit" class="flex flex-col items-end">
            <p v-if="formData.canWithdrawn.inOutC == 'Out_Country'">
              วงเงินที่สามารถเบิกได้ {{ expenses.withdrawn }} บาท
            </p>
            <div
              v-if="formData.canWithdrawn.inOutC == 'In_Country'"
              class="flex flex-col items-end"
            >
              <p>วงเงินที่สามารถเบิกได้ {{ expenses.withdrawn }} บาท</p>
              <p>{{ formData.canWithdrawn.inthai }}</p>
            </div>
            <p>
              {{ formData.canWithdrawn.message }} ค่าลงทะเบียน
              {{ expenses.regits }} บาท
            </p>
            <div
              v-if="formData.canWithdrawn.inOutC == 'Out_Country'"
              class="flex flex-col items-end"
            >
              <p>ค่าเบี้ยเลี้ยงเดินทางไม่เกิน {{ expenses.allowance }} บาท</p>
              <p>ค่าที่พักไม่เกิน {{ expenses.accom }} บาท</p>
            </div>
          </div>
        </div>
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
            label="ตีกลับเจ้าหน้าที่ทรัพยากรบุคคลเพื่อแก้ไขข้อมูล"
            value="return_hr"
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
      <button @click="OfficerConfer" class="btn btn-success text-white">
        บันทึกข้อมูล
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
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
import ConferenceData from "@/components/form/DataforOffice/Conference.vue";
import HR from "@/components/form/DataforOffice/HR.vue";
import Research from "@/components/form/DataforOffice/Research.vue";

const formData = reactive({
  conference: [],
  offic: [],
  year: "",
  totalAll: 0,
  numapproved: 0,
  totalapproved: 0,
  creditLimit: 0,
  totalcreditLimit: 0,
  canWithdrawn: "",
  docSubmitDate: DateTime.now().toISODate(),
  form_id: 0,
  radioAuthOffic: null,
  comment_text: null,
  newmoneyRequested: null,

  oldData: {},
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
    parseFloat(formData.creditLimit) - parseFloat(moneyRequested.value);
  return formData.totalcreditLimit.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
});

const moneyRequested = computed(() => {
  console.log("formData.newmoneyRequested", formData.newmoneyRequested);

  if (!formData.newmoneyRequested) {
    return (
      parseFloat(formData.canWithdrawn.money) +
      parseFloat(formData.conference.total_amount)
    );
  } else if (formData.newmoneyRequested) {
    console.log("formData.newmoneyRequested !== 0", formData.newmoneyRequested);
    return formData.newmoneyRequested;
  }
});

const expenses = computed(() => {
  const withdrawn = parseFloat(formData.canWithdrawn.money).toLocaleString(
    "en-US",
    { minimumFractionDigits: 2 }
  );
  const regits = parseFloat(formData.conference.total_amount).toLocaleString(
    "en-US",
    { minimumFractionDigits: 2 }
  );
  const allowance = parseFloat(
    3500 * formData.conference.num_travel_days
  ).toLocaleString("en-US", { minimumFractionDigits: 2 });
  const accom = parseFloat(
    8000 * formData.conference.num_days_room
  ).toLocaleString("en-US", { minimumFractionDigits: 2 });

  return { withdrawn, regits, allowance, accom };
});

const showCreditLimit = ref(false);

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const user = computed(() => userStore.user);

const fetchOfficerData = async () => {
  try {
    const responseBudget = await api.get(`/budgetsConfer`);
    formData.numapproved = responseBudget.data.numapproved;
    formData.totalapproved = responseBudget.data.totalapproved == null ? 0 : responseBudget.data.totalapproved;

    const responseFormConfer = await api.get(`/formConference/${id}`);
    formData.form_id = responseFormConfer.data.form_id;
    formData.oldData = responseFormConfer.data;

    const responseCalConfer = await api.get(`/confer/calc/${id}`);
    formData.canWithdrawn = responseCalConfer.data;

    const responseConfer = await api.get(`/conference/${id}`);
    formData.conference = responseConfer.data;

    const responseoldBudget = await api.get(`/budget/conference/${id}`);
    formData.bud = responseoldBudget.data;
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  }
};

const now = new Date();
    let fiscalYear = now.getFullYear() + 543;
    if (now.getMonth() + 1 >= 10) fiscalYear += 1;

const rules = computed(() => ({
  year: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลปีงบประมาณเป็นพ.ศ. *",required
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
    minValue: helpers.withMessage("* ไม่ต่ำกว่า 1 *",minValue(1)),
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
  return_hr: "return",
  return_research: "return",
  pending: "pending",
};

const returnMap = {
  approved: null,
  notApproved: null,
  return_professor: "professor",
  return_hr: "hr",
  return_research: "research",
  pending: null,
};

const OfficerConfer = async () => {
  const result = await v$.value.$validate();
  if (result) {
    if (confirm("ยืนยันข้อมูลถูกต้อง") == false) {
      return false;
    }

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

      if (formData.oldData.form_status !== "return" &&  (!formData.bud || Object.keys(formData.bud).length === 0)) {      
        try {
        const dataForBackend = {
          user_id: user.value?.user_id,
          form_id: formData.form_id,
          budget_year: formData.year,
          Conference_amount: formData.totalAll,
          num_expenses_approved: formData.numapproved,
          total_amount_approved: formData.totalapproved,
          remaining_credit_limit: formData.creditLimit,
          amount_approval: moneyRequested.value,
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
    } else if (formData.oldData.form_status === "return") {
      try {
        const dataForBackend = {
          user_id: user.value?.user_id,
          form_id: formData.form_id,
          budget_year: formData.year,
          Conference_amount: formData.totalAll,
          num_expenses_approved: formData.numapproved,
          total_amount_approved: formData.totalapproved,
          remaining_credit_limit: formData.creditLimit,
          amount_approval: moneyRequested.value,
          total_remaining_credit_limit: formData.totalcreditLimit,
          doc_submit_date: formData.docSubmitDate,

          form_status:
            formData.radioAuthOffic === null
              ? formData.oldData?.past_return
              : statusMap[formData.radioAuthOffic],
          returnto: null,
          return_note: formData.comment_text || null,
          past_return: null,
        };

        await api.put(`/updateBudget/${formData.form_id}`, dataForBackend);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      }
    } else if (formData.oldData.form_status !== "return" && JSON.stringify(formData.bud)) {
      try {
        const dataForBackend = {
          user_id: user.value?.user_id,
          form_id: formData.form_id,
          budget_year: formData.year,
          Conference_amount: formData.totalAll,
          num_expenses_approved: formData.numapproved,
          total_amount_approved: formData.totalapproved,
          remaining_credit_limit: formData.creditLimit,
          amount_approval: moneyRequested.value,
          total_remaining_credit_limit: formData.totalcreditLimit,
          doc_submit_date: formData.docSubmitDate,

          form_status:
            formData.radioAuthOffic === null
              ? formData.oldData?.past_return
              : statusMap[formData.radioAuthOffic],
          returnto: null,
          return_note: formData.comment_text || null,
          past_return: null,
        };

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

    console.log("Validation failed:", v$.value.$errors);
  }
};

onMounted(async () => {
  await fetchOfficerData();
});
</script>
