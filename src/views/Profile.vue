<template>
  <div class="container my-10 mx-auto">
    <div role="tablist" class="tabs tabs-lift">
      <input type="radio" name="mytabs" class="tab" aria-label="ข้อมูลส่วนตัว" checked="checked" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <div class="my-5">
          <TextInputLabelLeft label="ชื่อ (ภาษาไทย)" customLabel="w-4/12" customInput="w-full"
            :placeholder="user.user_nameth" disabled="true" />
        </div>

        <div class="my-5">
          <TextInputLabelLeft label="ชื่อ (ภาษาอังกฤษ)" customLabel="w-4/12" customInput="w-full"
            :placeholder="user.user_nameeng" disabled="true" />
        </div>

        <div class="my-5">
          <TextInputLabelLeft label="ตำแหน่ง (ภาษาไทย)" customLabel="w-4/12" customInput="w-full"
            :placeholder="user.user_positionth" disabled="true" />
        </div>

        <div class="my-5">
          <TextInputLabelLeft label="ตำแหน่ง (ภาษาอังกฤษ)" customLabel="w-4/12" customInput="w-full"
            :placeholder="user.user_positioneng" disabled="true" />
        </div>

        <div class="my-5">
          <TextInputLabelLeft label="อีเมล" customLabel="w-4/12" customInput="w-full" :placeholder="user.user_email"
            disabled="true" />
        </div>

        <div class="my-10 flex flex-col">
          <h1 class="text-xl font-bold">ลายเซ็น</h1>

          <div v-if="user.user_signature == null || user.user_signature == ''">
            <p class="text-red-600">
              สามารถอัปโหลดลายเซ็นได้เพียง 1 ครั้งเท่านั้น และสกุลไฟล์เป็น png
              กรุณาตรวจสอบความถูกต้องก่อนกดยืนยัน
            </p>

            <div class="my-5">
              <input type="file" class="file-input file-input-bordered w-full max-w-xs"
                @change="handleFile($event, 'signature')" />
            </div>

            <span v-if="v$.signature.$error" class="text-base ml-2 text-red-500">
              {{ v$.signature.$errors[0].$message }}
            </span>

            <div class="flex justify-end mr-5">
              <button @click="updatesignature" class="btn bg-blue-500 text-white">
                ตกลง
              </button>
            </div>
          </div>

          <div v-else>
            <p class="text-red-600">
              หากมีข้อผิดพลาดโปรดติดต่อเจ้าหน้าที่ที่เกี่ยวข้อง เพื่อแก้ไข
            </p>
            <div class="flex flex-row items-center w-full">
              <div class="flex flex-row items-center w-full">
                <div class="flex flex-row">
                  <p>ดูลายเซ็นที่อัปโหลด</p>
                </div>
                <div class="">
                  <button @click="getSignature" class="btn bg-[#E85F19] text-white ml-10">
                    ดูเอกสาร
                  </button>
                </div>
              </div>
            </div>

            <img v-if="data.signature" :src="data.signature" class="w-64 h-64 mt-5 object-contain" alt="signature" />
          </div>
        </div>
      </div>

      <input type="radio" name="mytabs" class="tab" aria-label="วงเงินที่ใช้ไปแล้ว" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <div class="overflow-x-auto mt-2">
          <p class="pb-2 text-lg font-bold">ปีงบประมาณ {{ fiscalYear }}</p>
          <p class="pb-2 font-bold">วงเงินที่ใช้ไปแล้วทั้งหมด {{ data.totalAll }} บาท</p>
          <p>การประชุมวิชาการ</p>
          <table class="table w-full" ref="dataconfer2">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2">ครั้งที่</th>
                <th class="border px-3 py-2">รวม</th>
              </tr>
            </thead>
            <tbody v-for="(data, index) in data.approvedConfer" :key="data.form_id" class="text-center">
              <tr>
                <td class="border px-3 py-2">{{ index + 1 }}</td>
                <td class="border px-3 py-2">{{ data.money }}</td>
              </tr>
              <tr>
                <td class="border px-3 py-2 text-center font-bold">รวม</td>
                <td class="border px-3 py-2 text-center">{{ data.totalConfer }}</td>
              </tr>
            </tbody>
          </table>

          <p>Page Charge</p>
          <table class="table w-full" ref="dataconfer2">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2">ครั้งที่</th>
                <th class="border px-3 py-2">รวม</th>
              </tr>
            </thead>
            <tbody v-for="(data, index) in data.approvedPC" :key="data.form_id" class="text-center">
              <tr>
                <td class="border px-3 py-2">{{ index + 1 }}</td>
                <td class="border px-3 py-2">{{ data.money }}</td>
              </tr>

              <tr>
                <td class="border px-3 py-2 text-center font-bold">รวม</td>
                <td class="border px-3 py-2 text-center">{{ data.totalPC }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { DateTime } from "luxon";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useRouter } from "vue-router";

import { useUserStore } from "@/store/userStore";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import api from "@/setting/api";

const userStore = useUserStore();

const user = computed(() => userStore.user);
console.log("user", user.value)

const data = reactive({
  id: "",
  signature: null,
  approvedConfer: [],
  approvedPC: [],
  totalAll: 0,
  totalPC: 0,
  totalConfer: 0,
});

const getThaiFiscalYear = () => {
  const now = DateTime.now();
  const year = now.year + 543;
  return now.month >= 10 ? year + 1 : year;
};
const fiscalYear = getThaiFiscalYear();

//validate rule
const rules = {
  signature: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ png เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["image/png"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
};

const v$ = useVuelidate(rules, data);

const getDataMoney = async () => {
  console.log("id", data.id);
  const res = await api.get(`/sumBudgets/${user.value?.user_id}`);
  console.log("res", res.data);
  data.approvedPC = res.data.sumPC;
  data.approvedConfer = res.data.sumConfer;
  data.totalAll = res.data.totalMoney;
  data.totalPC = res.data.totalPC;
  data.totalConfer = res.data.totalConfer;
}

onMounted(async () => {
  await userStore.fetchUser();
  await getDataMoney();
  data.id = user.value?.user_id;
});

const handleFile = (event, fieldName) => {
  const signature = event.target.files[0];
  if (signature) {
    data[fieldName] = signature;
    console.log(`File assigned to ${fieldName}:`, data[fieldName]);
    console.log("Updated data:", data);
  } else {
    console.log(`No file selected for ${fieldName}.`);
  }
};

const router = useRouter();

const updatesignature = async () => {
  const result = await v$.value.$validate();

  if (result) {
    try {
      const DataforUpdate = {
        user_id: data.id,
        user_signature: data.signature,
      };

      console.log("DataforUpdate : ", DataforUpdate);

      const response = await api.put("/uploadSignature", DataforUpdate, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      console.log(response);

      alert("อัปโหลดลายเซ็นเรียบร้อยแล้ว");

      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน");
  }
};

const getSignature = async () => {
  const user_id = data.id;
  const res = await api.get(`/mySignature?user_id=${user_id}`);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  data.signature = `${baseURL}/uploads/${res.data.fileUrl}`;
};
</script>
