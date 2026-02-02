<template>
  <router-link v-if="getLink(form) || true" :to="getLink(form) || '#'">
    <div
      class="my-2 p-4 border border-[#D9D9D9] rounded-md text-black hover:cursor-pointer"
    >
      <h2 class="text-lg font-bold">{{ getTitle(form) }}</h2>
      <div class="flex flex-row w-full justify-between pt-2">
        <div>
          <div class="flex">
            <h4 class="mr-5">ชื่อผู้ขออนุมัติ : {{ form.user_nameth }}</h4>
          </div>

          <div class="flex" v-if="form.article_name">
            <h4 class="mr-5 truncate">
              {{
                form.form_type === "Page_Charge"
                  ? "ชื่อวารสาร"
                  : "ชื่องานประชุม"
              }}
              : {{ form.article_name }}
            </h4>
          </div>

          <div
            class="flex"
            v-if="form.article_title && form.form_type !== 'Research_KRIS'"
          >
            <h4 class="mr-5 truncate">ชื่อบทความ : {{ form.article_title }}</h4>
          </div>

          <div class="flex" v-if="form.form_type === 'Research_KRIS'">
            <h4 class="mr-5 truncate">
              ชื่อโครงงานวิจัย : {{ form.article_title }}
            </h4>
          </div>

          <div class="flex">
            <h4 class="mr-5">
              วันที่ส่งเอกสาร : {{ formatThaiDate(form.doc_submit_date) }}
            </h4>
          </div>

          <div class="flex" v-if="showAmount">
            <h4 class="mr-5">
              วงเงินที่เบิกได้ :
              {{
                form.form_type === "Research_KRIS"
                  ? form.Research_kris_amount
                  : form.amount_approval
              }}
              บาท
            </h4>
          </div>

          <div class="flex" v-if="comment">
            <h4 class="mr-5">
              เหตุผลที่ถูกตีกลับ : {{ comment }}
              {{ roleinThai(who) ? `( โดย ${roleinThai(who)} )` : "" }}
            </h4>
          </div>
        </div>

        <!-- Status -->
        <div v-if="showStatus" class="flex justify-end items-center">
          <p class="text-red-500 mr-5" v-if="form.form_status == 'notApproved'">
            สถานะ{{ showTHstatus(form.form_status) }}
          </p>
          <p
            class="text-green-500 mr-5"
            v-else-if="form.form_status == 'approve'"
          >
            สถานะ{{ showTHstatus(form.form_status) }}
          </p>
          <p class="text-yellow-500 mr-5" v-else>
            สถานะ{{ showTHstatus(form.form_status) }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { useUserStore } from "@/store/userStore";

const props = defineProps({
  form: { type: Object, required: true },
  page: { type: String, default: "history" },
  roleConferenceMap: { type: Object, required: false, default: () => ({}) },
  rolePageChargeMap: { type: Object, required: false, default: () => ({}) },
  roleResearchKRISMap: { type: Object, required: false, default: () => ({}) },
  showAmount: { type: Boolean, default: true },
  showStatus: { type: Boolean, default: true },
  comment: { type: String, default: "" },
  who: { type: String, default: "" },
});

const formatThaiDate = (dateString) => {
  if (!dateString) return "ไม่พบวันที่";

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

const userStore = useUserStore();

const getLink = (form) => {
  const role = userStore.user.user_role;

  /// เลือก map ตามหน้า
  let roleMapByType;
  if (props.page === "officer") {
    roleMapByType = {
      Conference: props.roleConferenceMap,
      Page_Charge: props.rolePageChargeMap,
      Research_KRIS: props.roleResearchKRISMap,
    };
  } else {
    roleMapByType = {
      Conference: { default: "/history/conference/" },
      Page_Charge: { default: "/history/pageCharge/" },
      Research_KRIS: { default: "/history/kris/" },
    };
  }

  const idFieldByType = {
    Conference: "conf_id",
    Page_Charge: "pageC_id",
    Research_KRIS: "kris_id",
  };

  const roleMap = roleMapByType[form.form_type];
  const idField = idFieldByType[form.form_type];

  console.log("roleMap:", roleMap);
  console.log("idField:", idField);

  if (!roleMap || !idField) return "#";

  // officer → ใช้ role ของ user
  // history → fallback default
  if (props.page === "officer") {
    return roleMap[role] ? roleMap[role] + form[idField] : "#";
  } else {
    return roleMap.default + form[idField];
  }
};

const getTitle = (form) => {
  switch (form.form_type) {
    case "Conference":
      return "ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ";
    case "Page_Charge":
      return "ขออนุมัติค่า Page Charge";
    case "Research_KRIS":
      return "แบบเสนอโครงการวิจัย";
    default:
      return "";
  }
};

const roleinThai = (who) => {
  if (who == "hr") {
    return "ฝ่ายบริหารทรัพยากรบุคคล";
  } else if (who == "research") {
    return "ฝ่ายบริหารงานวิจัย";
  } else if (who == "finance") {
    return "ฝ่ายบริหารการเงิน";
  } else if (who == "associate") {
    return "รองคณบดี";
  } else if (who == "dean") {
    return "คณบดี";
  } else if (who == "professor") {
    return "อาจารย์ผู้เสนอขออนุมัติ";
  } else if (who == "officer") {
    return "เจ้าหน้าที่";
  }
};

const showTHstatus = (status) => {
  if (status == "approve") {
    return "อนุมัติ";
  } else if (status == "notApproved") {
    return "ไม่อนุมัติ";
  } else if (status == "hr") {
    return "ฝ่ายบริหารทรัพยากรบุคคล";
  } else if (status == "research") {
    return "ฝ่ายบริหารงานวิจัย";
  } else if (status == "finance" || status == "pending") {
    return "ฝ่ายบริหารการเงิน";
  } else if (status == "associate") {
    return "รองคณบดี";
  } else if (status == "dean") {
    return "คณบดี";
  } else if (status == "waitingApproval") {
    return "รออนุมัติ";
  } else if (status == "return") {
    return "ถูกตีกลับ";
  }
};
</script>
