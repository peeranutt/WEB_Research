<template>
  <div class="Main">
    <!-- Main in page -->
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold pb-5">เอกสารที่ต้องการยื่น</p>
      <!-- box first -->
      <div
        class="my-5 py-2 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer"
        :class="{
          'hover:cursor-pointer': data.formConfer < 2,
          'opacity-50 pointer-events-none': data.formConfer >= 2,
        }"
      >
        <router-link v-if="data.formConfer < 2" to="/formConference">
          <p class="text-base px-5 py-1">
            ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
          </p>
        </router-link>
        <p v-else class="text-base px-5 py-1">
          ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
          <span class="flex justify-end text-red-600"
            >ยื่นขอรับการสนับสนุน 2 ครั้ง</span
          >
        </p>
      </div>
      <div
        class="my-5 py-2 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer"
      >
        <router-link to="/formPageCharge">
          <p class="text-base px-5 py-1">
            ขออนุมัติค่า Page Charge
            เพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
          </p>
        </router-link>
      </div>
      <div
        class="my-5 py-2 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer"
      >
        <router-link to="/formKris">
          <p class="text-base px-5 py-1">
            แบบเสนอโครงการวิจัย ทุนวิจัยส่งเสริมส่วนงานวิชาการ
          </p>
        </router-link>
      </div>
    </div>

    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold pb-5">เอกสารที่มีการตีกลับ</p>
      <div v-for="editForm in data.editForm" :key="editForm.form_id">
        <div
          class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2"
          v-if="editForm.form_type == 'Research_KRIS'"
        >
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

        <div
          class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2"
          v-if="editForm.form_type == 'Page_Charge'"
        >
          <router-link :to="`/modifiedPageCharge/${editForm.pageC_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติค่า Page
              Chargeเพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
              <span class="text-orange-500">(ได้รับการแก้ไข)</span>
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

        <div
          class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2"
          v-if="editForm.form_type == 'Conference'"
        >
          <router-link :to="`/modifiedConference/${editForm.conf_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
              <span class="text-orange-500">(ได้รับการแก้ไข)</span>
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
        <div
          class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2"
          v-if="returnForm.form_type == 'Page_Charge'"
        >
          <router-link :to="`/modifiedPageCharge/${returnForm.pageC_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติค่า Page
              Chargeเพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
              <span class="text-red-500">(ได้รับการตีกลับ)</span>
            </h2>
            <div class="mt-2 ml-5">
              <div>
                <div class="flex">
                  <h4 class="mr-5">
                    ชื่อวารสาร : {{ returnForm.article_name }}
                  </h4>
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

        <div
          class="p-5 shadow my-5 rounded-xl hover:cursor-pointer mb-2"
          v-if="returnForm.form_type == 'Conference'"
        >
          <router-link :to="`/modifiedConference/${returnForm.conf_id}`">
            <h2 class="text-lg font-bold">
              ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
              <span class="text-red-500">(ได้รับการตีกลับ)</span>
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
import { onMounted, reactive, computed, ref } from "vue";
import { DateTime } from "luxon";
import { useRouter, useRoute } from "vue-router";

import { useUserStore } from "@/store/userStore";
import { getThaiFiscalYear } from "@/utils/date";
import api from "@/setting/api";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const data = reactive({
  id: "",
  editForm: [],
  returnForm: [],
});

const isLoading = ref(true);
const fiscalYear = getThaiFiscalYear();
const user = computed(() => userStore.user);

/**
 *
 * Helper function
 */
const getFromTitle = (type) => {
  if (type === "Conference")
    return "ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ";
  if (type === "Page_Charge")
    return "ขออนุมัติค่า Page Chargeเพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ";
  if (type === "Research_KRIS")
    return "แบบเสนอโครงการวิจัย ทุนวิจัยส่งเสริมส่วนงานวิชาการ";
  return "";
};

const getEditPath = (form) => {
  if (form.form_type === "Conference") {
    return `/modifiedConference/${form.conf_id}`;
  }
  if (form.form_type === "Page_Charge") {
    return `/modifiedPageCharge/${form.pageC_id}`;
  }
  if (form.form_type === "Research_KRIS") {
    return `/modifiedKris/${form.kris_id}`;
  }
};

/**
 * Main Function
 */
const getData = async () => {
  const response = await api.get(`/form/${data.id}`);

  data.formConfer = res.data.filter((f) => {
    if (f.form_type !== "Conference" || !f.doc_submit_date) return false;

    const date = DateTime.fromISO(f.doc_submit_date);
    const fy = date.month >= 10 ? date.year + 1 : date.year;

    return fy === fiscalYear;
  }).length;

  data.returnForm = res.data.filter(
    (f) => f.form_status === "return" && f.return_to === user.value.user_role,
  );
};

onMounted(async () => {
  if (!userStore.user) {
    await userStore.fetchUser();
  }

  await getData();

  if (route.query.reason === "signature") {
    alert("กรุณาอัปโหลดลายเซ็นต์");

    router.replace({ path: route.path });
  }

  isLoading.value = false
});
</script>

<route>
  {
    meta: {
      requiresAuth: true,
      requiresSignature: true,
      role: ["professor", "hr", "research", "finance", "associate", "dean"],
    }
  }
  </route>
