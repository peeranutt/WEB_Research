<template>
  <router-link :to="getLink(form) || '#'">
    <div
      class="my-2 p-4 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer hover:border-gray-400 hover:shadow-sm transition-all duration-150"
    >
      <h2 class="text-lg font-bold">{{ getTitle(form) }}</h2>

      <div class="flex flex-row w-full justify-between pt-2 items-center gap-4">
        <!-- Info -->
        <div class="flex flex-col gap-1.5 flex-1 min-w-0">
          <InfoRow
            v-if="typeHistory === 'all'"
            label="ชื่อผู้ขออนุมัติ"
            :value="form.user_nameth"
          />
          <InfoRow
            v-if="form.article_name"
            :label="
              form.form_type === 'Page_Charge' ? 'ชื่อวารสาร' : 'ชื่องานประชุม'
            "
            :value="form.article_name"
            truncate
          />
          <InfoRow
            v-if="form.article_title"
            :label="
              form.form_type === 'Research_KRIS'
                ? 'ชื่อโครงงานวิจัย'
                : 'ชื่อบทความ'
            "
            :value="form.article_title"
            truncate
          />
          <InfoRow
            label="วันที่ส่งเอกสาร"
            :value="formatThaiDate(form.doc_submit_date)"
          />
          <InfoRow
            v-if="showAmount"
            label="วงเงินที่เบิกได้"
            :value="`${form.form_type === 'Research_KRIS' ? form.Research_kris_amount : form.amount_approval} บาท`"
          />
          <InfoRow
            v-if="comment"
            label="เหตุผลที่ถูกตีกลับ"
            :value="
              comment + (roleinThai(who) ? ` ( โดย ${roleinThai(who)} )` : '')
            "
            truncate
          />
        </div>

        <!-- Status -->
        <div
          v-if="showStatus"
          class="flex-shrink-0 text-right flex flex-col gap-1"
          :class="{
            'text-green-500': form.form_status === 'approve',
            'text-red-500': form.form_status === 'notApproved',
            'text-yellow-500':
              form.form_status !== 'approve' &&
              form.form_status !== 'notApproved',
          }"
        >
          <p class="text-base">สถานะ{{ showTHstatus(form.form_status) }}</p>
          <p class="text-base text-gray-400">
            อัปเดตเมื่อ {{ formatThaiDate(form.date_form_edit) }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { useUserStore } from "@/store/userStore";
import InfoRow from "@/components/form/InfoRow.vue";

/* -------------------- props -------------------- */
const props = defineProps({
  form: { type: Object, required: true },
  page: { type: String, default: "history" },
  roleConferenceMap: { type: Object, default: () => ({}) },
  rolePageChargeMap: { type: Object, default: () => ({}) },
  roleResearchKRISMap: { type: Object, default: () => ({}) },
  showAmount: { type: Boolean, default: true },
  showStatus: { type: Boolean, default: true },
  comment: { type: String, default: "" },
  who: { type: String, default: "" },
  typeHistory: { type: String, default: "" },
});

/* -------------------- store -------------------- */
const userStore = useUserStore();

/* -------------------- constants -------------------- */
const ID_FIELD = {
  Conference: "conf_id",
  Page_Charge: "pageC_id",
  Research_KRIS: "kris_id",
};

const HISTORY_PATH = {
  Conference: "/history/conference/",
  Page_Charge: "/history/pageCharge/",
  Research_KRIS: "/history/kris/",
};

const TITLES = {
  Conference: "ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ",
  Page_Charge: "ขออนุมัติค่า Page Charge",
  Research_KRIS: "แบบเสนอโครงการวิจัย",
};

const STATUS_TH = {
  approve: "อนุมัติ",
  notApproved: "ไม่อนุมัติ",
  return: "ถูกตีกลับ",
};

const ROLE_TH = {
  hr: "ฝ่ายบริหารทรัพยากรบุคคล",
  research: "ฝ่ายบริหารงานวิจัย",
  finance: "ฝ่ายบริหารการเงิน",
  associate: "รองคณบดี",
  dean: "คณบดี",
  professor: "อาจารย์ผู้เสนอขออนุมัติ",
  officer: "เจ้าหน้าที่",
};

const MONTHS_TH = [
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

/* -------------------- methods -------------------- */
const getLink = (form) => {
  const { form_type } = form;
  const idField = ID_FIELD[form_type];
  if (!idField) return "#";

  if (props.page === "officer") {
    const roleMap = {
      Conference: props.roleConferenceMap,
      Page_Charge: props.rolePageChargeMap,
      Research_KRIS: props.roleResearchKRISMap,
    }[form_type];
    const role = userStore.user?.user_role;
    return roleMap?.[role] ? roleMap[role] + form[idField] : "#";
  }

  return (HISTORY_PATH[form_type] ?? "#") + form[idField];
};

const getTitle = (form) => TITLES[form.form_type] ?? "";
const showTHstatus = (status) => STATUS_TH[status] ?? "รออนุมัติ";
const roleinThai = (who) => ROLE_TH[who] ?? "";
const formatThaiDate = (dateString) => {
  if (!dateString) return "ไม่พบวันที่";
  const d = new Date(dateString);
  return `${d.getUTCDate()} ${MONTHS_TH[d.getUTCMonth()]} ${d.getUTCFullYear() + 543}`;
};
</script>
