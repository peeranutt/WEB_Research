<template>
  <div class="container my-10 mx-auto">
    <p class="text-xl font-bold mb-5">
      แบบเสนอโครงการวิจัย ทุนวิจัยส่งเสริมส่วนงานวิชาการ
    </p>
    <Mainbox>
      <p class="text-lg font-bold">รายละเอียดเบื้องต้น</p>

      <div class="py-2 px-5">
        <p class="font-bold">1. ชื่อโครงการวิจัย</p>
        <SectionWrapper>
          <TextInputLabelLeft label="(ภาษาไทย)" customLabel="w-64" v-model="formData.projectTH" :required="true" />

          <span v-if="v$.projectTH.$error" class="text-base ml-56 text-red-500">
            {{ v$.projectTH.$errors[0].$message }}
          </span>

          <TextInputLabelLeft label="(ภาษาอังกฤษ)" customLabel="w-64" v-model="formData.projectENG" :required="true" />

          <span v-if="v$.projectENG.$error" class="text-base ml-56 text-red-500">
            {{ v$.projectENG.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </div>

      <div class="py-2 px-5">
        <p class="font-bold">
          2. สอดคล้องกับกลุ่มวิจัย (Research Cluster) ของ สจล.
          <span class="text-red-500">*</span>
        </p>

        <SectionWrapper>
          <div class="flex flex-row w-full">
            <div class="flex flex-col w-2/3">
              <CheckInput class="pb-3" label="ICT: Robotics & Automation" v-model="formData.resCluster"
                value="ICT: Robotics & Automation" />

              <CheckInput class="pb-3" label="ICT: Smart City & IoT" v-model="formData.resCluster"
                value="ICT: Smart City & IoT" />

              <CheckInput class="pb-3" label="Battery & EV" v-model="formData.resCluster" value="Battery & EV" />

              <CheckInput class="pb-3" label="Renewable Energy" v-model="formData.resCluster"
                value="Renewable Energy" />

              <CheckInput class="pb-3" label="Biomedical" v-model="formData.resCluster" value="Biomedical" />
            </div>

            <div class="flex flex-col w-full">
              <CheckInput class="pb-3" label="Agriculture & Food" v-model="formData.resCluster"
                value="Agriculture & Food" />

              <CheckInput class="pb-3" label="Future Mobility & Logistic" v-model="formData.resCluster"
                value="Future Mobility & Logistic" />

              <CheckInput class="pb-3" label="Materials" v-model="formData.resCluster" value="Materials" />

              <CheckInput class="pb-3" label="Creative Economy" v-model="formData.resCluster"
                value="Creative Economy" />

              <div class="flex flex-row items-center">
                <CheckInput class="flex items-center w-[125px]" label="อื่น ๆ ระบุ" customDiv="max-w-32"
                  v-model="formData.resCluster" value="other" />
                <TextInputLabelLeft label="" v-model="formData.resClusterOther"
                  :disabled="!formData.resCluster.includes('other')" />
              </div>
            </div>
          </div>

          <span v-if="v$.resCluster.$error" class="ml-3 text-base w-2/6 text-red-500">
            * กรุณาเลือกข้อมูลอย่างน้อย 1 ตัวเลือก *
          </span>

          <span v-if="v$.resClusterOther.$error" class="ml-2 text-base text-red-500">
            * กรุณาระบุข้อมูลเพิ่มเติม *
          </span>
        </SectionWrapper>
      </div>

      <div class="py-2 px-5">
        <p class="font-bold">3. มาตรฐานการวิจัย <span class="text-red-500">*</span></p>
        <SectionWrapper>
          <div class="flex flex-col w-full">
            <CheckInput class="pb-3" label="มีการใช้สัตว์ทดลอง" v-model="formData.resStandards"
              value="มีการใช้สัตว์ทดลอง" />

            <CheckInput class="pb-3" label="มีการวิจัยในมนุษย์" v-model="formData.resStandards"
              value="มีการวิจัยในมนุษย์" />

            <CheckInput class="pb-3" label="มีการวิจัยด้านเทคโนโลยีชีวภาพสมัยใหม่หรือพันธุวิศวกรรม"
              v-model="formData.resStandards" value="มีการวิจัยด้านเทคโนโลยีชีวภาพสมัยใหม่หรือพันธุวิศวกรรม" />

            <CheckInput class="pb-3" label="มีการใช้พันธุ์พืช" v-model="formData.resStandards"
              value="มีการใช้พันธุ์พืช" />

            <div class="flex flex-row items-center ml-10">
              <RadioInput class="flex items-center w-1/3" label="มาตรา 52 (เพื่อประโยชน์ทางการค้า)" customDiv="max-w-80"
                name="trade" v-model="formData.resStandardsTrade"
                :disabled="!formData.resStandards.includes('มีการใช้พันธุ์พืช')" value="52" />
              <RadioInput class="flex items-center" label="มาตรา 53 (ไม่มีวัตถุประสงค์เพื่อประโยชน์ทางการค้า)"
                name="trade" v-model="formData.resStandardsTrade"
                :disabled="!formData.resStandards.includes('มีการใช้พันธุ์พืช')" value="53" />
            </div>
          </div>
          <span v-if="v$.resStandards.$error" class="ml-3 text-base w-2/6 text-red-500">
            * กรุณาเลือกข้อมูลอย่างน้อย 1 ตัวเลือก *
          </span>

          <span v-if="v$.resStandardsTrade.$error" class="ml-12 text-base w-2/6 text-red-500">
            * กรุณาเลือกข้อมูลมาตรา *
          </span>
        </SectionWrapper>
      </div>

      <div class="py-5 px-5">
        <p class="font-bold">4. ข้อมูลนักวิจัย</p>
        <SectionWrapper>
          <p>ข้อมูลผู้ขอทุน (หัวหน้าโครงการ)</p>
          <div class="grid px-5 gap-3">
            <TextInputLabelLeft label="ชื่อ - สกุล (ภาษาไทย)" customLabel="w-64"
              :placeholder="formData.positionTH + ' ' + formData.nameTH" :disabled="true" :required="true" />
            <TextInputLabelLeft label="ชื่อ - สกุล (ภาษาอังกฤษ)" customLabel="w-64"
              :placeholder="formData.positionENG + ' ' + formData.nameENG" :disabled="true" :required="true" />
            <div class="flex flex-col">
              <TextInputLabelLeft label="ดัชนี H-Index" customLabel="w-64" v-model="formData.Hindex" :required="true" />
              <p class="text-sm text-blue-500 py-2 ml-[14rem]">
                (search ชื่อตนเองในฐาน https://www.scopus.com/)
              </p>
            </div>
            <span v-if="v$.Hindex.$error" class="text-base ml-[14rem] text-red-500">
              {{ v$.Hindex.$errors[0].$message }}
            </span>

            <TextInputLabelLeft label="ประวัติด้านสิ่งประดิษฐ์ หรือ นวัตกรรม" customLabel="w-3/12"
              v-model="formData.invention" :required="true" />
            <span v-if="v$.invention.$error" class="text-base ml-[17rem] text-red-500">
              {{ v$.invention.$errors[0].$message }}
            </span>

            <div class="flex flex-row">
              <TextInputLabelLeft label="ร้อยละการมีส่วนร่วมในโครงการ" customLabel="w-[530px]" customDiv="max-w-[600px]"
                customInput="w-32" v-model="formData.participation" :required="true" />
              <span class="text-sm text-red-500 w-1/6 flex items-center">(สัดส่วนการวิจัย)</span>
            </div>
            <span v-if="v$.participation.$error" class="text-base ml-[17rem] text-red-500">
              {{ v$.participation.$errors[0].$message }}
            </span>
            <div class="flex flex-row">
              <TextInputLabelLeft label="งบประมาณที่เสนอขอ" customLabel="w-[530px]" customDiv="max-w-[600px]"
                customInput="w-32" v-model="formData.proposedBudget" :required="true" />
            </div>
          </div>
        </SectionWrapper>
      </div>

      <div class="py-2 px-5">
        <p class="font-bold">
          5. ระยะเวลาโครงการ<span class="font-bold text-red-500">(ระบุจำนวนปีและระยะเริ่มต้นจนสิ้นสุดโครงการ)</span>
        </p>

        <SectionWrapper>
          <div class="flex flex-row w-full">
            <TextInputLabelLeft label="จำนวนปี" customLabel="w-fit" customDiv="max-w-fit" customInput="max-w-24"
              v-model="formData.periodYear" :required="true" />
            <TextInputLabelLeft label="เริ่ม" type="date" customLabel="w-fit pl-5 mr-2" customDiv="max-w-fit"
              customInput="max-w-fit" v-model="formData.periodStart" :required="true" />
            <TextInputLabelLeft label="สิ้นสุด" type="date" customLabel="w-fit pl-5 mr-2" customDiv="max-w-fit"
              customInput="max-w-fit" v-model="formData.periodEnd" :required="true" />
          </div>
          <span v-if="v$.periodYear.$error" class="text-base ml-2 text-red-500">
            {{ v$.periodYear.$errors[0].$message }}
          </span>
          <span v-if="v$.periodStart.$error" class="text-base ml-2 text-red-500">
            {{ v$.periodStart.$errors[0].$message }}
          </span>
          <span v-if="v$.periodEnd.$error" class="text-base ml-2 text-red-500">
            {{ v$.periodEnd.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </div>
    </Mainbox>
    <Mainbox>
      <p class="text-lg font-bold">เอกสารหลักฐานที่แนบ</p>
      <SectionWrapper>
        <span class="text-gray-500">ขนาดไฟล์สูงสุด 10 MB </span>
        <FileInput label="แบบเสนอโครงการวิจัย (Research Project)" type="file" :required="true"
          @change="handleFile($event, 'file')" />
        <span v-if="v$.file.$error" class="text-base ml-2 text-red-500">
          {{ v$.file.$errors[0].$message }}
        </span>
      </SectionWrapper>
    </Mainbox>

    <div class="flex justify-end">
      <button @click="saveDraft" class="bg-blue-500 text-white px-4 py-2 rounded mr-3">
        บันทึกแบบร่าง
      </button>
      <button @click="NewKris" class="btn btn-success text-white rounded">
        บันทึกข้อมูล
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import {
  helpers,
  maxValue,
  minValue,
  numeric,
  required,
  requiredIf,
} from "@vuelidate/validators";
import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import CheckInput from "@/components/Input/CheckInput.vue";
import FileInput from "@/components/Input/FileInput.vue";

const router = useRouter();

const userStore = useUserStore();
const user = computed(() => userStore.user);

if (!userStore.user.user_signature) {
  alert("กรุณาอัปโหลดลายเซ็น");
  router.push("/profile");
}

const formData = reactive({
  projectTH: "",
  projectENG: "",
  resCluster: [],
  resClusterOther: "",
  resStandards: [],
  resStandardsTrade: "",
  userID: "",
  positionTH: "",
  nameTH: "",
  positionENG: "",
  nameENG: "",
  Hindex: "",
  invention: "",
  participation: "",
  proposedBudget: "",
  periodYear: "",
  periodStart: "",
  periodEnd: "",
  file: null,
});

const isThai = helpers.withMessage(
  "* กรุณากรอกข้อมูลเป็นภาษาไทย สามารถมีตัวเลขและอักขระพิเศษได้ *",
  (value) =>
    !!value && /^[ก-๙0-9!@#$%^&*()_+\-=<>?/.,;:'"[\]{}\\|`~ ]+$/u.test(value)
);

const isEng = helpers.withMessage(
  "* กรุณากรอกข้อมูลเป็นภาษาอังกฤษ สามารถมีตัวเลขและอักขระพิเศษได้ *",
  (value) => /^[a-zA-Z0-9!@#$%^&*()_+\-=<>?/.,;:'"[\]{}\\|`~ ]+$/.test(value)
);

const validDate = helpers.withMessage(
  "* วันที่สิ้นสุดไม่สามารถเกิดขึ้นก่อนวันเริ่มต้นได้ *",
  () => {
    if (!formData.periodStart || !formData.periodEnd) return true;
    return new Date(formData.periodEnd) > new Date(formData.periodStart);
  }
);

//validate rule
const rules = {
  projectTH: {
    required: helpers.withMessage("* กรุณากรอกข้อมูล *", required),
    isThai,
  },
  projectENG: {
    required: helpers.withMessage("* กรุณากรอกข้อมูล *", required),
    isEng,
  },
  resCluster: {
    required: helpers.withMessage("* กรุณากรอกข้อมูล *", required),
  },
  resClusterOther: {
    required: requiredIf(() => formData.resCluster.includes("other")),
  },
  resStandards: {
    required: helpers.withMessage("* กรุณากรอกข้อมูล *", required),
  },
  resStandardsTrade: {
    required: requiredIf(() =>
      formData.resStandards.includes("มีการใช้พันธุ์พืช")
    ),
  },
  Hindex: {
    required: helpers.withMessage("* กรุณากรอกข้อมูล *", required),
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    minValue: helpers.withMessage(
      "* กรุณาตรวจสอบคะแนน คะแนนไม่สามารถต่ำกว่า 0 ได้ *",
      minValue(0)
    ),
  },
  invention: {
    required: helpers.withMessage("* กรุณากรอกข้อมูล *", required),
  },
  participation: {
    required: helpers.withMessage("* กรุณากรอกข้อมูล *", required),
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
    maxValue: helpers.withMessage(
      "* กรุณาตรวจสอบ การมีส่วนร่วมไม่สามารถกรอกได้มากกว่า 100 *",
      maxValue(100)
    ),
  },
  periodYear: {
    required: helpers.withMessage("* กรุณากรอกข้อมูล *", required),
    numeric: helpers.withMessage("* กรุณากรอกข้อมูลเป็นตัวเลข *", numeric),
  },
  periodStart: {
    required: helpers.withMessage("* กรุณากรอกวันที่เริ่มต้น *", required),
  },
  periodEnd: {
    required: helpers.withMessage("* กรุณากรอกวันที่สิ้นสุด *", required),
    validDate,
  },
  file: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
};

const v$ = useVuelidate(rules, formData);

onMounted(async () => {
  await userStore.fetchUser();

  formData.userID = user.value?.user_id;
  formData.nameTH = user.value?.user_nameth || "";
  formData.nameENG = user.value?.user_nameeng || "";
  formData.positionTH = user.value?.user_positionth || "";
  formData.positionENG = user.value?.user_positioneng || "";
});

const saveDraft = () => {
  localStorage.setItem("formDraft", JSON.stringify(formData));
  alert("บันทึกแบบร่างเรียบร้อยแล้ว");
};

onMounted(() => {
  console.log("formDraft", localStorage.getItem("formDraft"));
  const draft = localStorage.getItem("formDraft");
  if (draft) {
    console.log("have draft", JSON.parse(draft));
    Object.assign(formData, JSON.parse(draft));
  }
});

const handleFile = (event, fieldName) => {
  const file = event.target.files[0];

  if (!file) {
    console.log(`No file selected for ${fieldName}.`);
    return;
  }

  // ตรวจสอบประเภทไฟล์ (PDF เท่านั้น)
  if (file.type !== "application/pdf") {
    alert("กรุณาอัพโหลดไฟล์ PDF เท่านั้น");
    event.target.value = ""; // ล้างค่า input
    return;
  }

  // ตรวจสอบขนาดไฟล์ (ไม่เกิน 100MB)
  const maxSize = 10 * 1024 * 1024; // 100 MB
  if (file.size > maxSize) {
    alert("ไฟล์มีขนาดเกิน 10 MB กรุณาเลือกไฟล์ที่เล็กกว่า");
    event.target.value = ""; // ล้างค่า input
    return;
  }

  // ถ้าผ่านเงื่อนไขทั้งหมด เก็บไฟล์ลง formData
  formData[fieldName] = file;
};

const NewKris = async () => {
  console.log("NewKris", JSON.stringify(formData));
  const result = await v$.value.$validate();

  if (result) {
    try {
      const Dataforbackend = {
        user_id: user.value?.user_id,
        name_research_th: formData.projectTH,
        name_research_en: formData.projectENG,
        research_cluster: formData.resCluster,
        res_cluster_other: formData.resClusterOther,
        res_standard: formData.resStandards,
        res_standard_trade: formData.resStandardsTrade,
        h_index: formData.Hindex,
        his_invention: formData.invention,
        participation_percent: formData.participation,
        Research_kris_amount: formData.proposedBudget,
        year: formData.periodYear,
        project_periodStart: formData.periodStart,
        project_periodEnd: formData.periodEnd,
        kris_file: formData.file,
      };

      console.log("Dataforbackend : ", Dataforbackend);

      const response = await api.post("/kris", Dataforbackend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      router.push("/myHistory");
      localStorage.removeItem("formDraft");
    } catch (error) {
      console.log(
        "Error saving code : ",
        error.response?.data || error.message
      );

      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");
  }
};
</script>
