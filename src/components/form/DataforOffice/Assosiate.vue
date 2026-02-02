<template>
    <div class="container my-10 mx-auto">
      <div v-if="props.type == 'Conference'">
        <Mainbox v-if="formData.offic.c_associate_result" class="collapse collapse-arrow collapse-open">
          <input type="checkbox" />
          <p class="collapse-title text-lg font-bold">รองคณบดีฝ่ายงานวิจัย</p>
            <SectionWrapper class="collapse-content">
              <div class="px-2">
                <RadioInput
                  label="เห็นชอบ"
                  value="approve"
                  name="commentAs"
                  :disabled="true"
                  v-model="formData.offic.c_associate_result"
                />
              </div>
              <div class="px-2">
                <RadioInput
                  label="ไม่เห็นชอบ"
                  value="notApproved"
                  name="commentAs"
                  :disabled="true"
                  v-model="formData.offic.c_associate_result"
                />
              </div>
            </SectionWrapper>
        </Mainbox>
        <Mainbox v-else>
          <p class="font-bold">รองคณบดีฝ่ายงานวิจัย</p>
          <p>เอกสารอยู่ในขั้นตอนการอนุมัติ</p>
        </Mainbox>
      </div>
    
      <div v-if="props.type == 'Page_Charge'">
        <Mainbox v-if="formData.offic.p_associate_result"  class="collapse collapse-arrow collapse-open">
          <input type="checkbox" />
          <p class="collapse-title text-lg font-bold">รองคณบดีฝ่ายงานวิจัย</p>
          <SectionWrapper class="collapse-content">
            <p v-if="formData.offic.p_associate_result == 'approve'">เห็นชอบ</p>
          </SectionWrapper>
        </Mainbox>
        <Mainbox v-else>
          <p class="font-bold">รองคณบดีฝ่ายงานวิจัย</p>
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

const formData = reactive({
  offic: [],
});

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