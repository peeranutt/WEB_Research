<template>
  <div class="Main">
    <!-- Main in page -->
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold pb-5">เอกสารที่ต้องการยื่น</p>
      <!-- box first -->
      <div class="my-5 py-2 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer" :class="{
        'hover:cursor-pointer': data.formConfer < 2,
        'opacity-50 pointer-events-none': data.formConfer >= 2,
      }">
        <router-link v-if="data.formConfer < 2" to="/formConference">
          <p class="text-base px-5 py-1">
            ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
          </p>
        </router-link>
        <p v-else class="text-base px-5 py-1">
          ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
          <span class="flex justify-end text-red-600">ยื่นขอรับการสนับสนุน 2 ครั้ง</span>
        </p>
      </div>
      <div class="my-5 py-2 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer">
        <router-link to="/formPageCharge">
          <p class="text-base px-5 py-1">
            ขออนุมัติค่า Page Charge
            เพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
          </p>
        </router-link>
      </div>
      <div class="my-5 py-2 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer">
        <router-link to="/formKris">
          <p class="text-base px-5 py-1">
            แบบเสนอโครงการวิจัย ทุนวิจัยส่งเสริมส่วนงานวิชาการ
          </p>
        </router-link>
      </div>
    </div>

    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold pb-5">
        เอกสารที่มีการตีกลับ
      </p>
      <div v-for="editForm in data.editForm" :key="editForm.form_id">
        <div class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2" v-if="editForm.form_type == 'Research_KRIS'">
          <router-link :to="`/modifiedKris/${editForm.kris_id}`">
            <h2 class="text-lg font-bold">
              แบบเสนอโครงการวิจัย ทุนวิจัยส่งเสริมส่วนงานวิชาการ
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อโครงการวิจัย : {{ editForm.article_title }}
                  </h4>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2" v-if="editForm.form_type == 'Page_Charge'">
          <router-link :to="`/modifiedPageCharge/${editForm.pageC_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติค่า Page
              Chargeเพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ <span class="text-orange-500">(ได้รับการแก้ไข)</span>
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">ชื่อวารสาร : {{ editForm.article_name }}</h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อบทความ : {{ editForm.article_title }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">ผู้แก้ไขเอกสาร : {{ editForm.editor }}</h4>
                  <h4 class="mr-5">
                    วันที่แก้ไข : {{ formatThaiDate(editForm.date_form_edit) }}
                  </h4>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2" v-if="editForm.form_type == 'Conference'">
          <router-link :to="`/modifiedConference/${editForm.conf_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ <span class="text-orange-500">(ได้รับการแก้ไข)</span>
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่องานประชุม : {{ editForm.article_name }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อบทความ : {{ editForm.article_title }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">ผู้แก้ไขเอกสาร : {{ editForm.editor }}</h4>
                  <h4 class="mr-5">
                    วันที่แก้ไข : {{ formatThaiDate(editForm.date_form_edit) }}
                  </h4>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div v-for="returnForm in data.returnForm" :key="returnForm.form_id">
        <div class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2" v-if="returnForm.form_type == 'Page_Charge'">
          <router-link :to="`/modifiedPageCharge/${returnForm.pageC_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติค่า Page
              Chargeเพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ <span class="text-red-500">(ได้รับการตีกลับ)</span>
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">ชื่อวารสาร : {{ returnForm.article_name }}</h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อบทความ : {{ returnForm.article_title }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    เหตุผลการตีกลับ : {{ returnForm.return_note }}
                  </h4>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2" v-if="returnForm.form_type == 'Conference'">
          <router-link :to="`/modifiedConference/${returnForm.conf_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ <span class="text-red-500">(ได้รับการตีกลับ)</span>
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่องานประชุม : {{ returnForm.article_name }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อบทความ : {{ returnForm.article_title }}
                  </h4>
                </div>
                <div class="flex">
                  <h4 class="mr-5">
                    เหตุผลที่ถูกตีกลับ : {{ returnForm.return_note }}
                  </h4>
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
import { onMounted, reactive, computed } from "vue";
import { DateTime } from "luxon";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import api from "@/setting/api";

const data = reactive({
  id: "",
  formConfer: 0,
  editForm: [],
  returnForm: []
});

const getThaiFiscalYear = () => {
  const now = DateTime.now();
  const year = now.year;
  return now.month >= 10 ? year + 1 : year;
};
const fiscalYear = getThaiFiscalYear();

const router = useRouter();

const userStore = useUserStore();
const user = computed(() => userStore.user);

if (!userStore.user.user_signature) {
  alert("กรุณาอัปโหลดลายเซ็น");
  router.push("/profile");
}

const formatThaiDate = (dateString) => {
  if (!dateString) return "ไม่พบวันที่";

  const date = new Date(dateString);
  const months = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear() + 543;
  return `${day} ${month} ${year}`;
};

const getData = async () => {
  console.log("id", data.id);
  const res = await api.get(`/sumBudgets/${user.value?.user_id}`);
  // console.log("res sumBudgets", res.data);
  data.approvedConfer = res.data.sumConfer.length;

  // response เรียก all form ของ user
  const response = await api.get(`/form/${data.id}`);
  // หาจำนวนที่ส่ง conference
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].form_type == "Conference") {
      const docDateStr = response.data[i].doc_submit_date;
      if (docDateStr != null) {
        // แปลงวันที่เป็น DateTime
        const docDate = DateTime.fromISO(docDateStr);
        // คำนวณปีงบของ doc_submit_date
        const docFiscalYear =
          docDate.month >= 10 ? docDate.year + 1 : docDate.year;
        // เปรียบเทียบกับ fiscalYear ปัจจุบัน
        if (docFiscalYear === fiscalYear) {
          data.formConfer++;
        }
      }
    }
  }
  // หาเอกสารที่มีการแก้ไข
  for (let i = 0; i < response.data.length; i++) {
    if (
      response.data[i].edit_data != null &&
      response.data[i].professor_reedit != true
    ) {
      data.editForm.push(response.data[i]);
    }

    data.returnForm = response.data.filter(
      (form) => form.form_status === "return" && form.return_to === user.value?.user_role
    );
  }
};


onMounted(async () => {
  if (!userStore.user) {
    await userStore.fetchUser();
  }
  await userStore.fetchUser();
  data.id = user.value?.user_id;
  await getData();
});
</script>
