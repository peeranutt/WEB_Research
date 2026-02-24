<template>
  <div class="container my-10 mx-auto">
    <PageChageData :id="id" />
    <Research :id="id" :type="'Page_Charge'" />
    <FinanceAll :id="id" :type="'Page_Charge'" />
    <Mainbox>
      <SectionWrapper>
        <p class="text-lg font-bold">รองคณบดีฝ่ายงานวิจัย</p>
        <RadioInput label="เห็นชอบ" value="approve" name="comment" v-model="formData.agree" />
        <RadioInput label="ไม่เห็นชอบ" value="notApproved" name="comment" v-model="formData.agree" />
        <div v-if="formData.olddata.form_status !== 'return'">
          <RadioInput label="ตีกลับอาจารย์เพื่อแก้ไขข้อมูล" value="return_professor" name="comment"
            v-model="formData.agree" />
          <RadioInput label="ตีกลับเจ้าหน้าที่งานวิจัยเพื่อแก้ไขข้อมูล" value="return_research" name="comment"
            v-model="formData.agree" />
          <RadioInput label="ตีกลับเจ้าหน้าที่การเงินเพื่อแก้ไขข้อมูล" value="return_finance" name="comment"
            v-model="formData.agree" />
        </div>
        <span v-if="v$.agree.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.agree.$errors[0].$message }}
        </span>

        <textarea class="textarea textarea-bordered w-full"
          @input="handleInput('commentReason', $event.target.value)"></textarea>
        <span v-if="v$.commentReason.$error" class="text-base font-bold text-red-500 text-left">
          {{ v$.commentReason.$errors[0].$message }}
        </span>
      </SectionWrapper>
    </Mainbox>

    <div class="flex justify-end">
      <button 
        @click="OfficerPC"
        :disabled="loading" 
        class="btn btn-success text-white rounded">
        {{ loading ? "กำลังบันทึก..." : "บันทึก" }}
      </button>
    </div>
    <!-- Popup Loading -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl p-6 flex flex-col items-center gap-4 shadow-lg">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <p class="text-gray-700 font-medium">กำลังบันทึกข้อมูล...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, requiredIf } from "@vuelidate/validators";
import { DateTime } from "luxon";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import PageChageData from "@/components/form/DataforOffice/PageChage.vue";
import Research from "@/components/form/DataforOffice/Research.vue";
import FinanceAll from "@/components/form/DataforOffice/FinanceAll.vue";

const loading = ref(false);

const formData = reactive({
  docSubmitDate: DateTime.now().toISODate(),
  agree: "",
  commentReason: "",
  return_to: "",

  olddata: {}
});

const handleInput = (key, value) => {
  formData[key] = value;
};

const rules = computed(() => ({
  agree: {
    required: helpers.withMessage("* กรุณาเลือกข้อมูล *", required),
  },
  commentReason: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูล *",
      requiredIf(() => formData.agree !== "approve")
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const user = computed(() => userStore.user);

const statusMap = {
  approve: "dean",
  notApproved: "notApproved",
  return_professor: "return",
  return_research: "return",
  return_finance: "return",
}

const returnMap = {
  approve: null,
  notApproved: null,
  return_professor: "professor",
  return_research: "research",
  return_finance: "finance",
}

const resultMap = {
  approve: "approve",
  notApproved: "notApproved",
  return_professor: "return",
  return_research: "return",
  return_finance: "return",
}

const getDataPc = async () => {
  if (id == null || id == "") {
    alert("โปรดเข้าสู่ระบบใหม่อีกครั้ง");
  }
  try {
    const responseData = await api.get(`/formPageCharge/${id}`);
    formData.olddata = responseData.data;
  } catch (error) {
    console.log("Error", error);
  }
};

const OfficerPC = async () => {
  if (loading.value) return;
  const result = await v$.value.$validate();

  if (result) {
    if (confirm("ยืนยันข้อมูลถูกต้อง") == false) {
      return false;
    }

    if (formData.olddata.form_status != "return") {
      try {
        loading.value = true
        const dataForBackend = {
          pageC_id: id,
          updated_data: [
            { field: 'associate_id', value: user.value?.user_id },
            { field: 'p_associate_result', value: resultMap[formData.agree] },
            { field: 'p_associate_reason', value: formData.commentReason },
            { field: 'associate_doc_submit_date', value: formData.docSubmitDate },
          ],
          form_status: statusMap[formData.agree],
          return_to: returnMap[formData.agree],
          return_note: formData.commentReason || null,
          past_return: statusMap[formData.agree] == 'return' ? user.value?.user_role : null
        };

        await api.put(`/opinionPC/${id}`, dataForBackend);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      } finally {
        loading.value = false;
      }
    } else if (formData.olddata.form_status === "return") {
      try {
        loading.value = true
        const dataForBackend = {
          pageC_id: id,
          updated_data: [
            { field: 'associate_id', value: user.value?.user_id },
            { field: 'p_associate_result', value: resultMap[formData.agree] },
            { field: 'p_associate_reason', value: formData.commentReason },
            { field: 'associate_doc_submit_date', value: formData.docSubmitDate },
          ],
          form_status: formData.agree === "approve" ? formData.olddata?.past_return : formData.agree,
          return_to: null,
          return_note: formData.commentReason || null,
          past_return: null
        };

        await api.put(`/opinionPC/${id}`, dataForBackend);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        router.push("/officer");
      } catch (error) {
        console.log("Error saving code : ", error);
        alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
      } finally {
        loading.value = false;
      }
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");
    console.log("Validation failed:", v$.value.$errors);
  }
};

onMounted(async () => {
  await getDataPc();
});
</script>
