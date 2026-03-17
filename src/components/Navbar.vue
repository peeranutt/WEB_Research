<template>
  <div class="navbar bg-base-100 px-10 py-1 shadow-sm sticky top-0 z-40">
    <!-- logo -->
    <div class="navbar-start grow gap-5">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li
            v-if="hasRole(['hr', 'research', 'finance', 'associate', 'dean'])"
          >
            <router-link to="/HomePage/officer">ตรวจสอบเอกสาร</router-link>
          </li>
          <li
            v-if="
              hasRole([
                'professor',
                'hr',
                'research',
                'finance',
                'associate',
                'dean',
              ])
            "
          >
            <details>
              <summary>ยื่นการขอรับการสนับสนุน</summary>
              <ul class="p-2 bg-base-100 w-fit z-1">
                <li><router-link to="/HomePage/professor">ยื่นเอกสาร</router-link></li>
                <li>
                  <router-link to="/myHistory"
                    >สถานะ และประวัติการยื่นเอกสาร</router-link
                  >
                </li>
              </ul>
            </details>
          </li>
          <li v-if="hasRole(['hr', 'research'])">
            <router-link to="/eOffice">เอกสารรออนุมัติ</router-link>
          </li>
          <li
            v-if="hasRole(['hr', 'research', 'finance', 'associate', 'dean'])"
          >
            <router-link to="/allHistory">สถานะ และประวัติเอกสาร</router-link>
          </li>
          <li v-if="hasRole(['finance'])">
            <router-link to="/allWithdrawMoney"
              >ขออนุมัติเบิกเงินรายได้</router-link
            >
          </li>
          <li v-if="hasRole(['admin'])">
            <router-link to="/changePage"
              >เปลี่ยนเงื่อนไขการพิจารณา</router-link
            >
          </li>
          <li><router-link to="/">สรุปผลแบบสถิติ</router-link></li>
        </ul>
      </div>

      <router-link :to="logoRoute">
        <img
          class="max-w-14"
          src="https://scholar.it.kmitl.ac.th/images/it-kmitl.png"
          alt="LOGO IT KMITL"
        />
      </router-link>

      <div class="hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li
            v-if="hasRole(['hr', 'research', 'finance', 'associate', 'dean'])"
          >
            <router-link to="/HomePage/officer">ตรวจสอบเอกสาร</router-link>
          </li>
          <li
            v-if="
              hasRole([
                'professor',
                'hr',
                'research',
                'finance',
                'associate',
                'dean',
              ])
            "
          >
            <details>
              <summary>ยื่นการขอรับการสนับสนุน</summary>
              <ul class="p-2 bg-base-100 w-fit z-1">
                <li><router-link to="/HomePage/professor">ยื่นเอกสาร</router-link></li>
                <li>
                  <router-link to="/myHistory"
                    >สถานะ และประวัติการยื่นเอกสาร</router-link
                  >
                </li>
              </ul>
            </details>
          </li>
          <li v-if="hasRole(['hr', 'research'])">
            <router-link to="/eOffice">เอกสารรออนุมัติ</router-link>
          </li>
          <li
            v-if="hasRole(['hr', 'research', 'finance', 'associate', 'dean'])"
          >
            <router-link to="/allHistory">สถานะ และประวัติเอกสาร</router-link>
          </li>
          <li v-if="hasRole(['finance'])">
            <router-link to="/allWithdrawMoney"
              >ขออนุมัติเบิกเงินรายได้</router-link
            >
          </li>
          <li v-if="hasRole(['admin'])">
            <router-link to="/changePage"
              >เปลี่ยนเงื่อนไขการพิจารณา</router-link
            >
          </li>
          <li><router-link to="/">สรุปผลแบบสถิติ</router-link></li>
        </ul>
      </div>
    </div>

    <div class="navbar-end flex-1">
      <div v-if="!user">
        <router-link
          to="/login"
          class="btn w-fit bg-[#4285F4] hover:bg-[#4285F4] text-white"
        >
          เข้าสู่ระบบ
        </router-link>
      </div>

      <ul class="menu menu-horizontal px-1" v-if="user">
        <li>
          <details>
            <summary
              class="btn w-fit bg-[#4285F4] hover:bg-[#4285F4] text-white content-center"
            >
              {{ userStore.user.user_nameth }}
            </summary>
            <ul class="p-2 bg-base-100 w-fit z-1">
              <li><router-link to="/profile">ข้อมูลส่วนตัว</router-link></li>
              <li @click="logout">
                <router-link to="/">ออกจากระบบ</router-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const user = computed(() => userStore.user);

// ปิด details ทั้งหมด
const closeAllDetails = () => {
  document.querySelectorAll("details[open]").forEach((el) => {
    el.removeAttribute("open");
  });
};

// ปิดเมื่อเปลี่ยนหน้า
watch(() => route.path, closeAllDetails);

// ปิดเมื่อคลิกข้างนอก
const handleClickOutside = (e) => {
  if (!e.target.closest("details")) {
    closeAllDetails();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const logoRoute = computed(() => {
  if (!user.value) return "/";
  const role = user.value.user_role;
  if (role === "professor") return "/HomePage/professor";
  if (["hr", "research", "finance", "associate", "dean"].includes(role))
    return "/HomePage/officer";
  if (role === "admin") return "/HomePage/admin";
  return "/";
});

const role = computed(() => user.value?.user_role);
const hasRole = (roles) => {
  if (!role.value) return false;
  return roles.includes(role.value);
};

const logout = async () => {
  await userStore.logout();
  router.push("/login");
};
</script>
