<template>
  <div class="container my-10 mx-auto">
    <div v-if="props.type == 'Conference'">
      <Mainbox v-if="formData.offic.c_dean_result" class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">คณบดี</p>
        <SectionWrapper class="collapse-content">
          <p class="text-lg">
            เพื่อโปรดทราบการจัดสรรวงเงิน ก่อนการตอบรับบทความจากผู้จัด
          </p>
          <RadioInput
            label="รับทราบ"
            :disabled="true"
            value="approve"
            v-model="formData.offic.c_dean_result"
          />
        </SectionWrapper>
      </Mainbox>
      <Mainbox v-else>
        <p class="font-bold">คณบดี</p>
        <p>เอกสารอยู่ในขั้นตอนการอนุมัติ</p>
      </Mainbox>
    </div>

    <div v-if="props.type == 'Page_Charge'">
      <div v-if="formData.offic.p_dean_acknowledge">
        <Mainbox class="collapse collapse-arrow collapse-open">
          <input type="checkbox" />
          <p class="collapse-title text-lg font-bold">คณบดี</p>
          <SectionWrapper class="collapse-content">
            <p class="text-lg font-bold">
              เรียน คณบดีคณะเทคโนโลยีสารสนเทศ (ครั้งที่ 1)
            </p>
            <p class="text-base mt-1">
              เพื่อโปรดทราบการจัดสรรวงเงิน ก่อนการตอบรับบทความ
            </p>
            <RadioInput
              label="รับทราบ"
              value="acknowledge"
              :disabled="true"
              v-model="formData.offic.p_dean_acknowledge"
            />
          </SectionWrapper>
        </Mainbox>

        <Mainbox class="collapse collapse-arrow collapse-open">
          <input type="checkbox" />
          <p class="collapse-title text-lg font-bold">คณบดี</p>
          <SectionWrapper class="collapse-content">
            <p class="text-lg font-bold">
              เรียน คณบดีคณะเทคโนโลยีสารสนเทศ (ครั้งที่ 2)
            </p>
            <!-- <p class="text-base mt-1">
              ขณะนี้บทความได้รับการตอบรับแล้ว (Letter of acceptance) เมื่อวันที่
              <b>{{ formatThaiDate(formData.offic.p_date_accepted_approve) }} </b>
              ตามหลักฐานที่แนบจึงเรียนมาเพื่อโปรดพิจารณา
            </p> -->
            <div class="px-2">
              <RadioInput
                label="อนุมัติ"
                value="approve"
                name="comment"
                :disabled="true"
                v-model="formData.offic.p_dean_result"
              />
            </div>
            <div class="px-2">
              <RadioInput
                label="ไม่อนุมัติ"
                value="notApproved"
                name="comment"
                :disabled="true"
                v-model="formData.offic.p_dean_result"
              />
            </div>
            <div>
              <TextArea
                label="เนื่องจาก"
                :disabled="true"
                :placeholder="formData.offic.p_dean_reason"
              />
            </div>
          </SectionWrapper>
        </Mainbox>
      </div>
      <Mainbox v-else>
        <p class="font-bold">คณบดี</p>
        <p>เอกสารอยู่ในขั้นตอนการอนุมัติ</p>
      </Mainbox>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import TextArea from "@/components/Input/TextArea.vue";

// จัดการข้อมูลหลัก
const formData = reactive({
  offic: [],
});

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear() + 543;
  return `${day} ${month} ${year}`;
};

const props = defineProps(["id", "type"]);
const isLoading = ref(true);
console.log("params.id", props.id);
console.log("params.type", props.type);

const fetchOfficerData = async () => {
  try {
    if (props.type == "Conference") {
      const responseoffic = await api.get(`/opinionConf/${props.id}`);
      formData.offic = responseoffic.data;
    } else if (props.type == "Page_Charge") {
      const responseoffic = await api.get(`/opinionPC/${props.id}`);
      formData.offic = responseoffic.data;
    }
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchOfficerData();
});
</script>
