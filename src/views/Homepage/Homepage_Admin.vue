<template>
  <div class="relative">
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold pb-5">การจัดการผู้ใช้</p>

      <div class="flex justify-end">
        <div class="add_user">
          <button class="btn bg-[#FF7518] text-white text-base mx-2" onclick="Add_user.showModal()">
            เพิ่มผู้ใช้
          </button>
          <dialog id="Add_user" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 class="text-lg font-bold">เพิ่มผู้ใช้</h3>
              <SectionWrapper>
                <TextInputLabelLeft label="ชื่อ (ภาษาไทย)" customLabel="mr-2 w-1/4" customInput="max-w-1/2"
                  @input="handleInputUser('nameth', $event)" />
                <span v-if="v$.nameth.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.nameth.$errors[0].$message }}
                </span>
                <TextInputLabelLeft label="ชื่อ (ภาษาอังกฤษ)" customLabel="mr-2 w-1/4" customInput="max-w-1/2"
                  @input="handleInputUser('nameeng', $event)" />
                <span v-if="v$.nameeng.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.nameeng.$errors[0].$message }}
                </span>
                <div class="form-control w-full">
                  <label class="w-full flex items-center">
                    <span class="mr-2 w-1/4">หน้าที่</span>
                    <select class="select select-bordered mx-1 w-full" @change="handleInputUser('role', $event)">
                      <option disabled selected>เลือกหน้าที่ผู้ใช้</option>
                      <option :value="'professor'">อาจารย์</option>
                      <option :value="'hr'">
                        เจ้าหน้าที่บริหารทรัพยากรบุคคล
                      </option>
                      <option :value="'research'">เจ้าหน้าที่งานวิจัย</option>
                      <option :value="'finance'">เจ้าหน้าที่การเงิน</option>
                      <option :value="'associate'">รองคณบดี</option>
                      <option :value="'dean'">คณบดี</option>
                      <option :value="'admin'">ผู้ดูแล</option>
                    </select>
                  </label>
                </div>
                <span v-if="v$.role.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.role.$errors[0].$message }}
                </span>
                <TextInputLabelLeft label="อีเมล" customLabel="mr-2 w-1/4" customInput="max-w-1/2"
                  @input="handleInputUser('email', $event)" />
                <span v-if="v$.email.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.email.$errors[0].$message }}
                </span>
                <TextInputLabelLeft label="ตำแหน่ง (ภาษาไทย)" customLabel="mr-2 w-1/4" customInput="max-w-1/2"
                  @input="handleInputUser('positionth', $event)" />
                <span v-if="v$.positionth.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.positionth.$errors[0].$message }}
                </span>
                <TextInputLabelLeft label="ตำแหน่ง (ภาษาอังกฤษ)" customLabel="mr-2 w-1/4" customInput="max-w-1/2"
                  @input="handleInputUser('positioneng', $event)" />
                <span v-if="v$.positioneng.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.positioneng.$errors[0].$message }}
                </span>
                <TextInputLabelLeft label="วันที่เริ่มทำงาน" type="date" customLabel="mr-2 w-1/4"
                  customInput="max-w-1/2" @input="handleInputUser('startwork', $event)" />
                <span v-if="v$.startwork.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.startwork.$errors[0].$message }}
                </span>
                <TextInputLabelLeft label="จำนวนปีที่เริ่มทำงาน" customLabel="mr-2 w-1/4" customInput="max-w-1/2"
                  @input="handleInputUser('year', $event)" />
                <span v-if="v$.year.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.year.$errors[0].$message }}
                </span>
                <TextInputLabelLeft label="ยอดเงินการขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมวิชาการ"
                  customLabel="mr-2 w-1/2" customInput="max-w-max" @input="handleInputUser('moneyCF', $event)" />
                <span v-if="v$.moneyCF.$error" class="text-base font-bold text-red-500 text-left">
                  {{ v$.moneyCF.$errors[0].$message }}
                </span>
                <div class="modal-action">
                  <button @click="addUser" class="btn bg-[#2E8B57] text-white text-base">
                    เพิ่มผู้ใช้
                  </button>
                  <form method="dialog">
                    <button class="btn bg-[#FF0038] text-white text-base">
                      ยกเลิก
                    </button>
                  </form>
                </div>
              </SectionWrapper>
            </div>
          </dialog>
        </div>

        <div class="edit_user">
          <button class="btn bg-[#6F4E37] text-white text-base mx-2" onclick="edit_user.showModal()">
            แก้ไข
          </button>
          <dialog id="edit_user" class="modal">
            <div class="modal-box w-11/12 max-w-[90%] max-h-[90%]">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 class="text-lg font-bold pb-5">แก้ไขข้อมูล</h3>

              <SectionWrapper>
                <div class="max-h-[650px] overflow-y-auto rounded-box border border-base-content/5 bg-base-100">
                  <table class="table text-center w-full">
                    <thead>
                      <tr class="text-base text-black">
                        <th>ลำดับ</th>
                        <th>ชื่อผู้ใช้</th>
                        <th>หน้าที่ของผู้ใช้เดิม</th>
                        <th>แก้ไขหน้าที่ของผู้ใช้</th>
                        <th>ยอดเงินในการประชุมวิชาการ</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, index) in formData.users" :key="user.user_id">
                        <th>{{ index + 1 }}</th>
                        <td>{{ user.user_nameth }}</td>
                        <td>{{ user.user_role }}</td>
                        <td>
                          <select class="select select-bordered flex-1"
                            @change="handleInput(user.user_id, $event, 'role')">
                            <option disabled selected>
                              เลือกหน้าที่ผู้ใช้
                            </option>
                            <option value="professor">อาจารย์</option>
                            <option value="hr">
                              เจ้าหน้าที่บริหารทรัพยากรบุคคล
                            </option>
                            <option value="research">
                              เจ้าหน้าที่งานวิจัย
                            </option>
                            <option value="finance">เจ้าหน้าที่การเงิน</option>
                            <option value="associate">รองคณบดี</option>
                            <option value="dean">คณบดี</option>
                            <option value="admin">ผู้ดูแล</option>
                          </select>
                        </td>
                        <td class="flex justify-center">
                          <TextInputLabelLeft customLabel="w-auto min-w-fit" customDiv="max-w-max mr-10"
                            :placeholder="user.user_moneyCF" @input="handleInput(user.user_id, $event, 'money')" />
                        </td>
                        <td>
                          <button @click="deleteSignat(user.user_id)" class="btn btn-error text-base text-white">
                            ลบลายเซ็นผู้ใช้
                          </button>
                        </td>
                        <td>
                          <button @click="deleteUser(user.user_id)" class="btn btn-error text-base text-white">
                            ลบผู้ใช้
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="modal-action">
                  <button @click="updateUserRoles" class="btn bg-[#2E8B57] text-white text-base">
                    อัปเดตข้อมูล
                  </button>
                  <form method="dialog">
                    <button class="btn bg-[#FF0038] text-white text-base">
                      ยกเลิก
                    </button>
                  </form>
                </div>
              </SectionWrapper>
            </div>
          </dialog>
        </div>
      </div>

      <!-- หน้าจอ -->
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-5">
        <table class="table text-center">
          <thead>
            <tr class="text-base text-black">
              <th>ลำดับ</th>
              <th>ชื่อผู้ใช้</th>
              <th>หน้าที่ของผู้ใช้</th>
              <th>ยอดเงินในการประชุมวิชาการ</th>
              <th>ยอดเงินในการตีพิมพ์วารสาร</th>
            </tr>
          </thead>
          <tbody v-for="(user, index) in formData.users" :key="user.user_id">
            <tr>
              <th class="text-center">{{ index + 1 }}</th>
              <td class="text-center">{{ user.user_nameth }}</td>

              <td class="text-center">
                <span v-if="user.user_role == 'professor'">อาจารย์</span>
                <span v-else-if="user.user_role == 'hr'">เจ้าหน้าที่บริหารทรัพยากรบุคคล</span>
                <span v-else-if="user.user_role == 'research'">เจ้าหน้าที่งานวิจัย</span>
                <span v-else-if="user.user_role == 'finance'">เจ้าหน้าที่การเงิน</span>
                <span v-else-if="user.user_role == 'associate'">รองคณบดี</span>
                <span v-else-if="user.user_role == 'dean'">คณบดี</span>
                <span v-else-if="user.user_role == 'admin'">ผู้ดูแล</span>
                <span v-else>-</span>
              </td>
              <td class="text-center">{{ Number(user.user_moneyCF).toLocaleString("en-US") }}</td>
              <td class="text-center">{{ Number(user.user_moneyPC).toLocaleString("en-US") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import {
  required,
  numeric,
  minValue,
  integer,
  helpers,
  decimal,
  email,
} from "@vuelidate/validators";
import api from "@/setting/api";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import useVuelidate from "@vuelidate/core";

const formData = reactive({
  users: [],
  userRoles: [],
  userMoneyCF: [],

  role: "",
  nameth: "",
  nameeng: "",
  email: "",
  moneyCF: "",
  positionth: "",
  positioneng: "",
  startwork: "",
  year: "",
});

const inputTypes = {
  role: "string",
  nameth: "string",
  nameeng: "string",
  email: "string",
  moneyCF: "number",
  positionth: "string",
  positioneng: "string",
  startwork: "date",
  year: "number",
};

const thaiOnly = helpers.withMessage(
  "* กรุณากรอกเป็นภาษาไทย ไม่มีอักขระพิเศษนอกจาก ' ' และ '.' *",
  (value) => {
    return /^[ก-๛\s.]+$/.test(value);
  }
);

const englishOnly = helpers.withMessage(
  "* กรุณากรอกเป็นภาษาอังกฤษ ไม่มีอักขระพิเศษนอกจาก ' ' และ '.' *",
  (value) => {
    return /^[A-Za-z\s.]+$/.test(value);
  }
);

// const emailDomain = helpers.withMessage(
//   "* อีเมลต้องเป็น @it.kmitl.ac.th เท่านั้น *",
//   (value) => {
//     return /^[a-zA-Z0-9._%+-]+@it\.kmitl\.ac\.th$/.test(value);
//   }
// );

const rules = computed(() => ({
  role: {
    required: helpers.withMessage("* กรุณาเลือกหน้าที่ *", required),
  },
  nameth: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลชื่อ (ภาษาไทย) *",
      required
    ),
    thaiOnly,
  },
  nameeng: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลชื่อ (ภาษาอังกฤษ) *",
      required
    ),
    englishOnly,
  },
  email: {
    required: helpers.withMessage("* กรุณากรอกอีเมล *", required),
    email: helpers.withMessage("* กรุณากรอกเป็นอีเมล *", email),
    // emailDomain,
  },
  moneyCF: {
    required: helpers.withMessage(
      "* กรุณากรอกยอดที่สามารถเบิกขอไปประชุมวิชาการ *",
      required
    ),
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", decimal),
  },
  positionth: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลตำแหน่ง (ภาษาไทย) *",
      required
    ),
    // thaiOnly,
  },
  positioneng: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลตำแหน่ง (ภาษาอังกฤษ) *",
      required
    ),
    // englishOnly,
  },
  startwork: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลวันที่เริ่มงาน *",
      required
    ),
  },
  year: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลจำนวนปีที่ทำงาน *",
      required
    ),
    numeric: helpers.withMessage("* กรุณากรอกเป็นตัวเลข *", numeric),
    integer: helpers.withMessage("* กรอกได้แต่จำนวนเต็ม *", integer),
  },
}));

const v$ = useVuelidate(rules, formData);

const handleInputUser = (key, event) => {
  const value = event.target.value.trim();
  const type = inputTypes[key];

  if (type === "number") {
    formData[key] = value === "" ? null : parseInt(value, 10);
  } else {
    formData[key] = value;
  }
};

const handleInput = (id, event, type) => {
  let value = event.target.value.trim();
  let targetArray =
    type === "money" ? formData.userMoneyCF : formData.userRoles;

  // แปลงค่าเป็นตัวเลขถ้าเป็น `money`
  if (type === "money") {
    value = value ? parseInt(value, 10) : 0; // ถ้าเป็นค่าว่างให้เป็น `0`
  }
  // ตรวจสอบว่ามี `id` นี้อยู่แล้วหรือไม่
  const index = targetArray.findIndex((item) => item.id === id);
  console.log("index", index);
  if (index !== -1) {
    // ถ้ามีแล้วให้อัปเดตค่าใหม่
    targetArray[index].value = value;
  } else {
    // ถ้ายังไม่มีให้เพิ่ม Object ใหม่เข้าไป
    targetArray.push({ id, value });
  }

  console.log(`Updated ${type} ${index}:`, JSON.stringify(targetArray));
};

const isLoading = ref(true);

const fetchOfficerData = async () => {
  try {
    const responseUser = await api.get(`/users`);
    formData.users = responseUser.data;
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

const updateUserRoles = async () => {
  try {
    const mergedData = [...formData.userRoles, ...formData.userMoneyCF];
    console.log("mergedData", mergedData);
    const response = await api.put("/updateRoles", {
      userUpdates: mergedData, // ส่ง userRoles [{ id: 1, value: 'admin' }, ...]
    });

    console.log("Response from server:", response.data);

    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
    await fetchOfficerData();
  } catch (error) {
    console.log("Error updating user roles:", error);
    alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
  }
};
const addUser = async () => {
  const result = await v$.value.$validate();

  if (result) {
    try {
      const dataForBackend = {
        user_role: formData.role,
        user_nameth: formData.nameth,
        user_nameeng: formData.nameeng,
        user_email: formData.email,
        user_moneyCF: formData.moneyCF,
        user_positionth: formData.positionth,
        user_positioneng: formData.positioneng,
        user_startwork: formData.startwork,
        user_year: formData.year,
      };
      await api.post("/user", dataForBackend);
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      await fetchOfficerData();
    } catch (error) {
      console.log("Error saving code : ", error);
      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน");
    console.log(v$.value.$errors);
  }
};

const deleteSignat = async (id) => {
  try {
    await api.put(`/userSignat/${id}`);

    alert("ลบลายเซ็นผู้ใช้เรียบร้อย");
    await fetchOfficerData();
  } catch (error) {
    console.log("Error updating user roles:", error);
    alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
  }
};

const deleteUser = async (id) => {
  try {
    await api.delete(`/user/${id}`);

    alert("ลบผู้ใช้เรียบร้อย");
    await fetchOfficerData();
  } catch (error) {
    console.log("Error updating user roles:", error);
    alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
  }
};

onMounted(async () => {
  await fetchOfficerData();
});
</script>
