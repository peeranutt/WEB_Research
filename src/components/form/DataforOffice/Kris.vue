<template>
  <div>
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold mb-5">
        แบบเสนอโครงการวิจัย ทุนวิจัยส่งเสริมส่วนงานวิชาการ
      </p>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">รายละเอียดเบื้องต้น</p>
        <div class="collapse-content">
          <div class="py-2 px-5">
            <p class="font-bold">1. ชื่อโครงการวิจัย</p>
            <SectionWrapper>
              <TextInputLabelLeft
                label="(ภาษาไทย)"
                customLabel="w-64"
                v-model="formData.kris.name_research_th"
                :disabled="true"
              />
              <TextInputLabelLeft
                label="(ภาษาอังกฤษ)"
                customLabel="w-64"
                v-model="formData.kris.name_research_en"
                :disabled="true"
              />
            </SectionWrapper>
          </div>

          <div class="py-2 px-5">
            <p class="font-bold">
              2. สอดคล้องกับกลุ่มวิจัย (Research Cluster) ของ สจล.
            </p>

            <SectionWrapper>
              <div class="flex flex-row w-full">
                <div class="flex flex-col w-2/3">
                  <CheckInput
                    class="pb-3"
                    label="ICT: Robotics & Automation"
                    value="ICT: Robotics & Automation"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />
                  <CheckInput
                    class="pb-3"
                    label="ICT: Smart City & IoT"
                    value="ICT: Smart City & IoT"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />
                  <CheckInput
                    class="pb-3"
                    label="Battery & EV"
                    value="Battery & EV"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />
                  <CheckInput
                    class="pb-3"
                    label="Renewable Energy"
                    value="Renewable Energy"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />
                  <CheckInput
                    class="pb-3"
                    label="Biomedical"
                    value="Biomedical"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />
                </div>

                <div class="flex flex-col w-full">
                  <CheckInput
                    class="pb-3"
                    label="Agriculture & Food"
                    value="Agriculture & Food"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />
                  <CheckInput
                    class="pb-3"
                    label="Future Mobility & Logistic"
                    value="Future Mobility & Logistic"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />
                  <CheckInput
                    class="pb-3"
                    label="Materials"
                    value="Materials"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />
                  <CheckInput
                    class="pb-3"
                    label="Creative Economy"
                    value="Creative Economy"
                    v-model="formData.research_cluster"
                    :disabled="true"
                  />

                  <div class="flex flex-row items-center">
                    <CheckInput
                      class="flex items-center w-[125px]"
                      label="อื่น ๆ ระบุ"
                      value="other"
                      customDiv="max-w-32"
                      v-model="formData.research_cluster"
                      :disabled="true"
                    />
                    <TextInputLabelLeft
                      v-if="formData.other == 'other' ? true : false"
                      label=""
                      v-model="formData.kris.res_cluster_other"
                      :disabled="true"
                    />
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>

          <div class="py-2 px-5">
            <p class="font-bold">3. มาตรฐานการวิจัย</p>
            <SectionWrapper>
              <div class="flex flex-col w-full">
                <CheckInput
                  class="pb-3"
                  label="มีการใช้สัตว์ทดลอง"
                  value="มีการใช้สัตว์ทดลอง"
                  v-model="formData.res_standard"
                  :disabled="true"
                />
                <CheckInput
                  class="pb-3"
                  label="มีการวิจัยในมนุษย์"
                  value="มีการวิจัยในมนุษย์"
                  v-model="formData.res_standard"
                  :disabled="true"
                />
                <CheckInput
                  class="pb-3"
                  label="มีการวิจัยด้านเทคโนโลยีชีวภาพสมัยใหม่หรือพันธุวิศวกรรม"
                  value="มีการวิจัยด้านเทคโนโลยีชีวภาพสมัยใหม่หรือพันธุวิศวกรรม"
                  v-model="formData.res_standard"
                  :disabled="true"
                />
                <CheckInput
                  class="pb-3"
                  label="มีการใช้พันธุ์พืช"
                  value="มีการใช้พันธุ์พืช"
                  v-model="formData.res_standard"
                  :disabled="true"
                />
                <div class="flex flex-row items-center ml-10">
                  <RadioInput
                    class="flex items-center w-1/3"
                    label="มาตรา 52 (เพื่อประโยชน์ทางการค้า)"
                    value="52"
                    customDiv="max-w-80"
                    :disabled="true"
                    v-model="formData.kris.res_standard_trade"
                  />
                  <RadioInput
                    class="flex items-center"
                    label="มาตรา 53 (ไม่มีวัตถุประสงค์เพื่อประโยชน์ทางการค้า)"
                    value="53"
                    :disabled="true"
                    v-model="formData.kris.res_standard_trade"
                  />
                </div>
              </div>
            </SectionWrapper>
          </div>

          <div class="py-5 px-5">
            <p class="font-bold">4. ข้อมูลนักวิจัย</p>
            <SectionWrapper>
              <p>ข้อมูลผู้ขอทุน (หัวหน้าโครงการ)</p>
              <div class="grid px-5 gap-3">
                <TextInputLabelLeft
                  label="ชื่อ - สกุล (ภาษาไทย)"
                  customLabel="w-64"
                  v-model="formData.user.user_nameth"
                  :disabled="true"
                />
                <TextInputLabelLeft
                  label="ชื่อ - สกุล (ภาษาอังกฤษ)"
                  customLabel="w-64"
                  v-model="formData.user.user_nameeng"
                  :disabled="true"
                />

                <div class="flex flex-col">
                  <TextInputLabelLeft
                    label="ดัชนี H-Index"
                    customLabel="w-64"
                    v-model="formData.kris.h_index"
                    :disabled="true"
                  />
                  <p class="text-sm text-blue-500 py-2 mx-52">
                    (search ชื่อตนเองในฐาน https://www.scopus.com/)
                  </p>
                </div>
                <TextInputLabelLeft
                  label="ประวัติด้านสิ่งประดิษฐ์ หรือ นวัตกรรม"
                  customLabel="w-3/12"
                  v-model="formData.kris.his_invention"
                  :disabled="true"
                />
                <div class="flex flex-row">
                  <TextInputLabelLeft
                    label="ร้อยละการมีส่วนร่วมในโครงการ"
                    customLabel="w-[530px]"
                    customDiv="max-w-[600px]"
                    customInput="w-32"
                    v-model="formData.kris.participation_percent"
                    :disabled="true"
                  />
                  <span class="text-sm text-red-500 w-1/6 flex items-center">(สัดส่วนการวิจัย)</span>
                </div>
                <div class="flex flex-row">
              <TextInputLabelLeft
                label="งบประมาณที่เสนอขอ"
                customLabel="w-[530px]"
                customDiv="max-w-[600px]"
                customInput="w-32"
                v-model="formData.budget"
                :disabled="true"
              />
            </div>
              </div>
            </SectionWrapper>
          </div>

          <div class="py-2 px-5">
          <p class="font-bold">
            5. ระยะเวลาโครงการ
            <span class="font-bold text-red-500">
              (ระบุจำนวนปีและระยะเริ่มต้นจนสิ้นสุดโครงการ)
            </span>
          </p>
          <SectionWrapper>
            <div class="flex flex-row w-full">
              <TextInputLabelLeft
                label="ปี"
                customLabel="w-fit"
                customDiv="max-w-32"
                customInput="max-w-24"
                v-model="formData.kris.year"
                :disabled="true"
              />
              <TextInputLabelLeft
                label="เริ่ม"
                type="date"
                customLabel="w-fit pl-5 mr-2"
                customDiv="max-w-fit"
                customInput="max-w-fit"
                v-model="formData.kris.project_periodStart"
                :disabled="true"
              />
              <TextInputLabelLeft
                label="สิ้นสุด"
                type="date"
                customLabel="w-fit pl-5 mr-2"
                customDiv="max-w-fit"
                customInput="max-w-fit"
                v-model="formData.kris.project_periodEnd"
                :disabled="true"
              />
            </div>
          </SectionWrapper>
        </div>
        </div>
      </Mainbox>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import CheckInput from "@/components/Input/CheckInput.vue";
import RadioInput from "@/components/Input/RadioInput.vue";

const formData = reactive({
  kris: [],
  user: [],
  research_cluster: [],
  other: "",
  res_standard: [],
  budget: "",

  animal: "",
  human: "",
  tech: "",
  plants: "",
});

const isLoading = ref(true);
// Access route parameters
const route = useRoute();
const id = route.params.id;

const fetchOfficerData = async () => {
  try {
    const response = await api.get(`/kris/${id}`);
    formData.kris = response.data;
    formData.research_cluster = formData.kris.research_cluster;
    formData.res_standard = formData.kris.res_standard;
    const userID = response.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    formData.user = responseUser.data;
    const responseBudget = await api.get(`/budget/kris/${id}`)
    formData.budget = parseFloat(
      responseBudget.data.Research_kris_amount
    ).toLocaleString("en-US", { minimumFractionDigits: 2 })
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

const loopCluster = async () => {
  // await fetchOfficerData();

  for (let i = 0; i < formData.research_cluster.length; i++) {
    if (formData.research_cluster[i] == "other") {
      formData.other = "other";
    }
  }
};

const loopStandard = async () => {
  // await fetchOfficerData();

  for (let i = 0; i < formData.res_standard.length; i++) {
    if (formData.res_standard[i] == "มีการใช้พันธุ์พืช") {
      formData.plants = "มีการใช้พันธุ์พืช";
    }
  }
};

onMounted(async () => {
  await fetchOfficerData();
  loopCluster();
  loopStandard();
});
</script>
