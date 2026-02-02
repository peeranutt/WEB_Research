<template>
  <div class="container my-10 mx-auto">
    <h1 class="text-xl font-bold pb-5">
      เอกสารที่รออนุมัติใน E-Office หรือ รอเข้าที่ประชุม
    </h1>
    <div v-for="form in data.allForm" :key="form.form_id">
      <div v-if="userStore.user.user_role == 'research'">
        <div class="p-5 shadow m-5 rounded-xl hover:cursor-pointer mb-2" v-if="form.form_type == 'Research_KRIS'">
          <router-link :to="`/history/kris/${form.kris_id}`">
            <h2 class="text-lg font-bold">
              แบบเสนอโครงการวิจัย ทุนวิจัยส่งเสริมส่วนงานวิชาการ
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อผู้ขออนุมัติ : {{ form.user_nameth }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อโครงการวิจัย : {{ form.article_title }}
                  </h4>
                </div>
              </div>
            </div>
            <div class="flex justify-end mr-5">
              <button @click="addapproved(form.form_id)" class="btn btn-success text-white">
                เอกสารได้รับการอนุมัติแล้ว
              </button>
            </div>
          </router-link>
        </div>

        <div class="p-5 shadow m-5 rounded-xl hover:cursor-pointer mb-2" v-if="form.form_type == 'Page_Charge'">
          <router-link :to="`/history/pageCharge/${form.pageC_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติค่า Page
              Chargeเพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อผู้ขออนุมัติ : {{ form.user_nameth }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">ชื่อวารสาร : {{ form.article_name }}</h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">ชื่อบทความ : {{ form.article_title }}</h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    วงเงินที่เบิกได้ : {{ form.amount_approval }} บาท
                  </h4>
                </div>
                <div class="flex justify-end mr-5">
                  <button @click="addapproved(form.form_id)" class="btn btn-success text-white">
                    เอกสารได้รับการอนุมัติแล้ว
                  </button>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="userStore.user.user_role == 'hr'">
        <div class="p-5 shadow m-5 rounded-xl hover:cursor-pointer mb-2" v-if="form.form_type == 'Conference'">
          <router-link :to="`/history/conference/${form.conf_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อผู้ขออนุมัติ : {{ form.user_nameth }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">ชื่องานประชุม : {{ form.article_name }}</h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">ชื่อบทความ : {{ form.article_title }}</h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    วงเงินที่เบิกได้ : {{ form.amount_approval }} บาท
                  </h4>
                </div>
                <div class="flex justify-end mr-5">
                  <button @click="addapproved(form.form_id)" class="btn btn-success text-white">
                    เอกสารได้รับการอนุมัติแล้ว
                  </button>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive } from "vue";
import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

const data = reactive({
  userID: "",
  userRole: "",
  allForm: [],
  status: "approve",
});

const userStore = useUserStore();
const user = computed(() => userStore.user);
//pull data

const pulldata = async () => {
  try {
    const now = new Date();
    let fiscalYear = now.getFullYear() + 543;
    if (now.getMonth() + 1 >= 10) fiscalYear += 1;
    let typeStatus =  "waitingApproval" 
    const responseOffice = await api.get("/allForms", {
      params: {
        fiscalYear,
        type: "all",
        typeStatus,
      },
    });
    console.log("res", responseOffice);

    // ปรับเปลี่ยนเงื่อนไข filter ให้เหลือแค่ "waitingApproval"
    // const filteredForms = res.data
    //   .filter(
    //     (form) =>
    //       form.form_status === "waitingApproval" 
    //   )
    //   .sort((a, b) => b.form_id - a.form_id);
    // console.log("filteredForms", filteredForms);

    data.allForm = responseOffice.data.map(form => {
      return {
        ...form, // คัดลอกทุกค่าในออบเจกต์ `form` มา
        amount_approval: parseFloat(form.amount_approval).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        }) //แทนที่เฉพาะ `amount_approval`
      };
    });
    console.log("Updated allForm:", data.allForm);

  } catch (error) {
    console.log(error);
  }
};

// const pulldata = async () => {
//   try {
//     const res = await api.get(`/allForms`);
//     console.log("res", res.data);

//     const filteredForms = res.data
//       .filter(
//         (form) =>
//           form.form_status === "waitingApproval" ||
//           form.form_status === "attendMeeting"
//       )
//       .sort((a, b) => b.form_id - a.form_id);
//     console.log("filteredForms", filteredForms);

//     data.allForm = filteredForms.map(form => {
//       return {
//         ...form, // คัดลอกทุกค่าในออบเจกต์ `form` มา
//         amount_approval: parseFloat(form.amount_approval).toLocaleString("en-US", {
//           minimumFractionDigits: 2,
//         }) //แทนที่เฉพาะ `amount_approval`
//       };
//     });
//     console.log("Updated allForm:", data.allForm);

//   } catch (error) {
//     console.log(error);
//   }
// };

const addapproved = async (formId) => {
  console.log("formId", formId);
  console.log("data.allForm", data.allForm);
  console.log("form_status", data.allForm.form_status);
  // Check if data.allForm is an array and get the correct item
  const formData = Array.isArray(data.allForm)
    ? data.allForm.find((f) => f.form_id === formId)
    : null;

  if (!formData) {
    console.log("Form data not found for formId:", formId);
    alert("ไม่พบข้อมูลเอกสาร");
    return;
  }
  console.log("Selected Form Data: ", formData);
  console.log("form_status", formData.form_status);
  try {
    alert("เอกสารนี้ได้รับการอนุมัติในระบบ E-Office แล้ว");
    const updateStatus = {
      form_id: formId,
      form_type: formData.form_type,
      conf_id: formData.conf_id,
      pageC_id: formData.pageC_id,
      kris_id: formData.kris_id,
      form_status: data.status,
    };
    console.log("updateStatus: ", updateStatus);
    const response = await api.put(
      `/form/${formId}`,
      updateStatus,
      {
        headers: {
          "Content-Type": "application/json", // Required for file uploads
        },
      }
    );
    console.log("res: ", response);
    alert("เอกสารได้รับการอนุมัติแล้ว");
  } catch (error) {
    console.log("Error saving code : ", error);
    alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
  }
};

onMounted(async () => {
  await userStore.fetchUser();

  data.userID = user.value?.user_id;

  pulldata();
});
</script>
