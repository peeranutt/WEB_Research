<template>
  <div class="container my-10 mx-auto">
    <p class="text-2xl font-bold text-center my-10">ขออนุมัติเบิกเงินรายได้</p>
    <p class="text-xl font-bold mb-5">
      การเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
    </p>
    <Mainbox>
      <SectionWrapper>
        <TextInputLabelLeft
          label="ชื่อ"
          customLabel="w-2/12 text-lg font-bold"
          :disabled="true"
          v-model="data.user.user_nameth"
        />
        <TextInputLabelLeft
          label="ตำแหน่ง"
          customLabel="w-2/12 text-lg font-bold"
          :disabled="true"
          v-model="data.user.user_positionth"
        />

        <div class="flex flex-row">
          <TextInputLabelLeft
            label="มีรายชื่ออยู่ใน List ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่"
            customLabel="w-auto"
            customInput="max-w-max"
            customDiv="max-w-max"
            :disabled="true"
            v-model="data.conference.conf_times"
          />
          <TextInputLabelLeft
            label="วันที่"
            type="date"
            customLabel="ml-2 w-10"
            customInput="max-w-max"
            :disabled="true"
            v-model="data.conference.conf_days"
          />
        </div>
      </SectionWrapper>
    </Mainbox>
    <!-- 1.  รายละเอียดการขออนุมัติเดินทาง -->
    <Mainbox>
      <p class="leading-9 text-lg font-bold">รายละเอียดการขออนุมัติเดินทาง</p>
      <SectionWrapper>
        <div class="flex flex-row">
          <TextInputLabelLeft
            label="เดินทางวันที่"
            type="date"
            customLabel="w-auto mr-1"
            customDiv="max-w-max"
            customInput="max-w-max"
            :disabled="true"
            v-model="data.conference.trav_dateStart"
          />
          <TextInputLabelLeft
            label="ถึงวันที่"
            type="date"
            customLabel="w-auto mr-8"
            customDiv="max-w-max ml-36"
            customInput="max-w-max"
            :disabled="true"
            v-model="data.conference.trav_dateEnd"
          />
        </div>

        <TextInputLabelLeft
          label="ชื่อผลงานวิจัยที่นำเสนอ"
          customLabel="w-1/6"
          :disabled="true"
          v-model="data.conference.conf_research"
        />
        <TextInputLabelLeft
          label="ชื่อการประชุมทางวิชาการ"
          customLabel="w-1/6"
          :disabled="true"
          v-model="data.conference.conf_name"
        />
        <div class="flex flex-row w-full">
          <p class="w-1/4">การประชุมวิชาการจัดในประเทศ หรือต่างประเทศ</p>
          <RadioInput
            label="ภายในประเทศ"
            name="Venue"
            value="domestic"
            customDiv="w-max mr-4"
            :disabled="true"
            v-model="data.conference.country_conf"
          />
          <RadioInput
            label="ณ ต่างประเทศ"
            name="Venue"
            value="abroad"
            customDiv="max-w-36"
            :disabled="true"
            v-model="data.conference.country_conf"
          />
        </div>
        <div class="flex flex-row">
          <TextInputLabelLeft
            label="วันที่จัด"
            type="date"
            customLabel="w-auto mr-9"
            customDiv="max-w-max mr-10"
            customInput="max-w-max"
            :disabled="true"
            v-model="data.conference.meeting_date"
          />
          <TextInputLabelLeft
            label="สถานที่จัด"
            customLabel="w-24"
            :disabled="true"
            v-model="data.conference.meeting_venue"
          />
          <div
            class="ml-10 w-full flex justify-center items-center"
            v-if="data.conference.country_conf == 'abroad'"
          >
            <div class="flex flex-row w-full">
              <TextInputLabelLeft
                label="ประเทศ"
                customLabel="w-24"
                :disabled="true"
                v-model="data.conference.location"
              />
            </div>
          </div>

          <div
            class="ml-5 w-full flex justify-center items-center"
            v-if="data.conference.country_conf == 'domestic'"
          >
            <div class="flex flex-row w-full">
              <TextInputLabelLeft
                label="จังหวัด"
                customLabel="w-24"
                :disabled="true"
                v-model="data.conference.location"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <TextInputLabelLeft
            label="วันที่ส่งบทความไปยังผู้จัด"
            type="date"
            customLabel="w-auto mr-1"
            customDiv="max-w-max"
            customInput="max-w-max"
            :disabled="true"
            v-model="data.conference.date_submit_organizer"
          />
          <TextInputLabelLeft
            label="วันประกาศผลการพิจารณาบทความ"
            type="date"
            customLabel="w-auto mr-1"
            customDiv="max-w-max"
            customInput="max-w-max"
            :disabled="true"
            v-model="data.conference.argument_date_review"
          />
          <TextInputLabelLeft
            label="วันสุดท้ายของการลงทะเบียน"
            type="date"
            customLabel="w-auto mr-1"
            customDiv="max-w-max"
            customInput="max-w-max"
            :disabled="true"
            v-model="data.conference.last_day_register"
          />
        </div>
      </SectionWrapper>
    </Mainbox>
    <!-- รายการค่าใช้จ่ายที่ขอเบิกจ่าย -->
    <Mainbox>
      <p class="leading-9 text-lg font-bold">รายการค่าใช้จ่ายที่ขอเบิกจ่าย</p>
      <SectionWrapper>
        <SectionWrapper>
          <div class="flex flex-row mb-2 justify-between">
            <div class="flex flex-row">
              <TextInputLabelLeft
                label="1. ค่าลงทะเบียน (ตามที่จ่ายจริง) จำนวน"
                customLabel="w-auto pr-2"
                customDiv="max-w-max"
                customInput="max-w-max"
                :disabled="true"
                v-model="data.conference.num_register_articles"
              />
              <TextInputLabelLeft
                label="บทความ ๆ ละ"
                customLabel="w-auto px-2"
                customDiv="max-w-max"
                customInput="max-w-max"
                :disabled="true"
                v-model="data.conference.regist_amount_1_article"
              />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <p class="flex items-center">
              รวม
              {{
                parseFloat(data.conference.total_amount).toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                  }
                )
              }}
              บาท
            </p>
          </div>

          <p>2. ค่าพาหนะเดินทาง</p>
          <div class="flex flex-col px-5">
            <div class="flex flex-row mb-2">
              <TextInputLabelLeft
                label="• เดินทางในประเทศ"
                customLabel="w-64 pr-2"
                customDiv="max-w-[50rem]"
                customInput="max-w-[50rem]"
                :disabled="true"
                v-model="data.conference.domestic_expenses"
              />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <div class="flex flex-row mb-2">
              <TextInputLabelLeft
                label="• เดินทางในต่างประเทศ"
                customLabel="w-64 pr-2"
                customDiv="max-w-[50rem]"
                customInput="max-w-[50rem]"
                :disabled="true"
                v-model="data.conference.overseas_expenses"
              />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <div class="flex flex-row">
              <TextInputLabelLeft
                label="• เดินทางระหว่างประเทศ กรุงเทพฯ -"
                customLabel="w-96 pr-2"
                customDiv="max-w-[30rem]"
                customInput="max-w-[14rem]"
                :disabled="true"
                v-model="data.conference.travel_country"
              />
              <TextInputLabelLeft
                label="- กรุงเทพฯ"
                customLabel="w-22 px-2"
                customDiv="max-w-[20rem]"
                customInput="max-w-[14rem]"
                :disabled="true"
                v-model="data.conference.inter_expenses"
              />
              <p class="flex items-center pl-2">บาท</p>
            </div>
          </div>

          <div class="flex flex-row">
            <TextInputLabelLeft
              label="3. ค่าภาษีสนามบิน (ถ้ามี)"
              customLabel="w-auto pr-2"
              customDiv="max-w-[52rem]"
              customInput="max-w-[40rem]"
              :disabled="true"
              v-model="data.conference.airplane_tax"
            />
            <p class="flex items-center pl-2">บาท</p>
          </div>

          <div class="flex flex-row mb-2 justify-between">
            <div class="flex flex-row w-5/6">
              <TextInputLabelLeft
                label="4. ค่าเช่าที่พัก"
                customLabel="w-auto pr-2"
                customDiv="max-w-[26rem]"
                customInput="max-w-[19rem]"
                :disabled="true"
                v-model="data.conference.num_days_room"
              />
              <TextInputLabelLeft
                label="คืน ๆ ละ"
                customLabel="w-auto pr-2"
                customDiv="max-w-[26rem]"
                customInput="max-w-[20rem]"
                :disabled="true"
                v-model="data.conference.room_cost_per_night"
              />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <p class="flex items-center">
              รวม
              {{
                data.conference.total_room == null
                  ? 0
                  : parseFloat(data.conference.total_room).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )
              }}
              บาท
            </p>
          </div>

          <div class="flex flex-row mb-2 justify-between">
            <div class="flex flex-row w-5/6">
              <TextInputLabelLeft
                label="5. ค่าเบี้ยเลี้ยงเดินทาง"
                customLabel="w-auto pr-2"
                customDiv="max-w-[26rem]"
                customInput="max-w-[16rem]"
                :disabled="true"
                v-model="data.conference.num_travel_days"
              />
              <TextInputLabelLeft
                label="วัน ๆ ละ"
                customLabel="w-auto pr-2"
                customDiv="max-w-[26rem]"
                customInput="max-w-[20rem]"
                :disabled="true"
                v-model="data.conference.daily_allowance"
              />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <p class="flex items-center">
              รวม
              {{
                data.conference.total_allowance == null
                  ? 0
                  : parseFloat(data.conference.total_allowance).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )
              }}
              บาท
            </p>
          </div>
          <p class="font-bold text-2xl pt-5 text-right">
            รวมทั้งสิ้น
            {{
              parseFloat(data.conference.all_money).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })
            }}
            บาท
          </p>
        </SectionWrapper>
      </SectionWrapper>
    </Mainbox>
    <!-- ตั้งเบิก -->
    <Mainbox>
      <p class="leading-9 text-lg font-bold">อนุมัติเบิกเงินรายได้</p>
      <SectionWrapper>
        <div class="flex flex-row">
          <p class="w-2/12">กองทุน</p>
          <p class="w-2/12">พัฒนาบุคคลกร</p>
        </div>

        <div class="flex flex-row">
          <p class="w-2/12">งบรายจ่าย</p>
          <p class="w-2/12">ค่าใช้จ่ายงบเงินอุดหนุน</p>
        </div>

        <div class="flex flex-row">
          <p class="w-2/12">ประเภทรายจ่าย</p>
          <p class="max-w-max">ทุนอุดหนุนการเดินทางไปเสนอบทความทางวิชาการ</p>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex flex-row">
            <p class="w-1/12 mt-2">ค่าใช้จ่าย</p>
            <TextInputLabelLeft
              label="ค่าเดินทาง"
              customLabel="w-3/12 mr-10"
              customInput="max-w-max"
              customDiv="max-w-[21%]"
              v-model="data.travelExpenses"
            />
            <span class="flex items-center">บาท</span>
          </div>

          <div class="flex flex-row">
            <p class="w-1/12"></p>
            <TextInputLabelLeft
              label="ค่าเบี้ยเลี้ยง"
              customLabel="w-3/12 mr-10"
              customInput="max-w-max"
              customDiv="max-w-[21%]"
              v-model="data.allowance"
            />
            <span class="flex items-center">บาท</span>
          </div>
        </div>

        <div class="flex flex-row">
          <TextInputLabelLeft
            label="จำนวน"
            customLabel="w-6/12 mr-6"
            customInput="max-w-max"
            customDiv="max-w-[29%]"
            v-model="sumWithdraw"
          />
          <span class="flex items-center">บาท</span>
        </div>
      </SectionWrapper>
    </Mainbox>
    <div class="flex justify-end mb-70">
      <button @click="submitWithdrawMoney" class="btn btn-success text-white">
        บันทึกข้อมูล
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";

const data = reactive({
  conference: [],
  user: [],
  score: [],

  travelExpenses: 0,
  allowance: 0,
  withdraw: 0,
});

const isLoading = ref(true);
// Access route parameters
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const sumWithdraw =computed(() => {
  data.withdraw = parseFloat(data.travelExpenses) + parseFloat(data.allowance)
  return data.withdraw
})

const fetchOfficerData = async () => {
  try {
    const responseConfer = await api.get(`/conference/${id}`);
    data.conference = responseConfer.data;

    const userID = responseConfer.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    data.user = responseUser.data;

    const responseScore = await api.get(`/score/${id}`);
    data.score = responseScore.data;
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

const submitWithdrawMoney = async () => {
  try {
    const dataForBackend = {
      travelExpenses: parseFloat(data.travelExpenses),
      allowance: parseFloat(data.allowance),
      withdraw: data.withdraw,
    };
    console.log("dataForBackend: ", dataForBackend);
    await api.put(`/withdraw/conference/${id}`, dataForBackend);
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
    router.push("/allWithdrawMoney");
  } catch (error) {
    console.log("Error saving code : ", error);
    alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
  }
};

onMounted(() => {
  fetchOfficerData();
});
</script>
