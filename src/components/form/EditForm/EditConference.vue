<template>
  <div>
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold mb-5">
        ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
      </p>
      <Mainbox>
        <SectionWrapper>
          <TextInputLabelLeft
            label="ชื่อ"
            customLabel="w-2/12 text-lg font-bold"
            :disabled="true"
            v-model="data.userForm.user_nameth"
          />
          <TextInputLabelLeft
            label="ตำแหน่ง"
            customLabel="w-2/12 text-lg font-bold"
            :disabled="true"
            v-model="data.userForm.user_positionth"
          />

          <div class="flex flex-row">
            <TextInputLabelLeft
              label="มีรายชื่ออยู่ใน List ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่"
              customLabel="w-auto"
              customInput="max-w-max"
              customDiv="max-w-max"
              v-model="data.conference.conf_times"
            />
            <TextInputLabelLeft
              label="วันที่"
              type="date"
              customLabel="ml-2 w-10"
              customInput="max-w-max"
              v-model="data.conference.conf_days"
            />
          </div>
          <p class="text-blue-500 text-sm">
            สามารถตรวจสอบรายชื่อ List ของคณะได้ที่เว็บไซต์คณะที่ Share
            online-การวิจัย และ
            <a href="https://erp.it.kmitl.ac.th/journal_conf_list"
              >https://erp.it.kmitl.ac.th/journal_conf_list</a
            >
          </p>
        </SectionWrapper>
      </Mainbox>

      <!-- 1.  รายละเอียดการขออนุมัติเดินทาง -->
      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          1. รายละเอียดการขออนุมัติเดินทาง
        </p>
        <SectionWrapper class="collapse-content">
          <div class="flex flex-row">
            <TextInputLabelLeft
              label="เดินทางวันที่"
              type="date"
              customLabel="w-auto mr-1"
              customDiv="max-w-max"
              customInput="max-w-max"
              v-model="data.conference.trav_dateStart"
            />
            <TextInputLabelLeft
              label="ถึงวันที่"
              type="date"
              customLabel="w-auto mr-8"
              customDiv="max-w-max ml-36"
              customInput="max-w-max"
              v-model="data.conference.trav_dateEnd"
            />
          </div>

          <TextInputLabelLeft
            label="ชื่อผลงานวิจัยที่นำเสนอ"
            customLabel="w-1/6"
            v-model="data.conference.conf_research"
          />
          <TextInputLabelLeft
            label="จำนวนนักวิจัยร่วม"
            customLabel="w-[10%]"
            v-model="data.conference.num_co_researchers"
          />
          <div v-for="(index) in parseInt(data.conference.num_co_researchers)  || 0" :key="index" >
            <div class="flex flex-row gap-4">
              <p class="pt-2">{{ index }}.</p>
              <TextInputLabelLeft
                label="ชื่อ-นามสกุลของนักวิจัยร่วม"
                customLabel="w-[100%]"
                customDiv="max-w-[30%]"
                v-model="data.conference.name_co_researchers[index]"
              />
              <TextInputLabelLeft
                label="หลักสูตรของนักวิจัยร่วม"
                customLabel="w-[100%]"
                customDiv="max-w-[25%]"
                v-model="data.conference.course_co_researchers[index]"
              />
            </div>
          </div>
          <TextInputLabelLeft
            label="ชื่อการประชุมทางวิชาการ"
            customLabel="w-1/6"
            v-model="data.conference.conf_name"
          />
          <div class="flex flex-row w-full">
            <p class="w-1/4">การประชุมวิชาการจัดในประเทศ หรือต่างประเทศ</p>
            <RadioInput
              label="ภายในประเทศ"
              name="Venue"
              value="domestic"
              customDiv="w-max mr-4"
              v-model="data.conference.country_conf"
            />
            <RadioInput
              label="ณ ต่างประเทศ"
              name="Venue"
              value="abroad"
              customDiv="max-w-36"
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
              v-model="data.conference.meeting_date"
            />
            <TextInputLabelLeft
              label="สถานที่จัด"
              customLabel="w-24"
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
              v-model="data.conference.date_submit_organizer"
            />
            <TextInputLabelLeft
              label="วันประกาศผลการพิจารณาบทความ"
              type="date"
              customLabel="w-auto mr-1"
              customDiv="max-w-max"
              customInput="max-w-max"
              v-model="data.conference.argument_date_review"
            />
            <TextInputLabelLeft
              label="วันสุดท้ายของการลงทะเบียน"
              type="date"
              customLabel="w-auto mr-1"
              customDiv="max-w-max"
              customInput="max-w-max"
              v-model="data.conference.last_day_register"
            />
          </div>
        </SectionWrapper>
      </Mainbox>

      <!-- 2.  รายละเอียดการขออนุมัติเดินทาง -->
      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          2.  รายละเอียดการขออนุมัติเดินทาง
        </p>
        <SectionWrapper class="collapse-content">
          <RadioInput
            label="การประชุมทางวิชาการที่คณะจัดหรือร่วมจัดในประเทศ และไม่อยู่ในฐานข้อมูลสากล SCOPUS"
            name="Scopus"
            value="facultyHost"
            v-model="data.conference.meeting_type"
          />
          <RadioInput
            label="การประชุมทางวิชาการที่อยู่ในฐานข้อมูลสากล SCOPUS โดยมีการกำหนดคุณภาพแบ่งเป็น 2 ระดับ "
            name="Scopus"
            value="inScopus"
            v-model="data.conference.meeting_type"
          />

          <SectionWrapper>
            <RadioInput
              label="ระดับมาตรฐาน"
              name="Level"
              value="standard"
              v-model="data.conference.quality_meeting"
            />
            <RadioInput
              label="ระดับดีมาก"
              name="Level"
              value="good"
              v-model="data.conference.quality_meeting"
            />
            <SectionWrapper>
              <RadioInput
                label="ใช้คะแนนที่คำนวณจาก SJR indicator และ H Index ที่ได้มาจาก SCImago Journal & Country Rank"
                name="Score"
                value="SJR"
                v-model="data.score.score_type"
              />
              <div v-if="data.score.score_type == 'SJR'">
                <div class="flex flex-row w-full px-7 my-2">
                  <TextInputLabelLeft
                    label="• ค่า SJR"
                    customLabel="w-auto mr-1"
                    customDiv="max-w-max"
                    customInput="max-w-max mr-3"
                    v-model="data.score.sjr_score"
                  />
                  <TextInputLabelLeft
                    label="ปี"
                    customLabel="w-auto mr-1"
                    customDiv="max-w-max"
                    customInput="max-w-max mr-3"
                    v-model="data.score.sjr_year"
                  />
                  <TextInputLabelLeft
                    label="x H-Index"
                    customLabel="w-auto mr-1"
                    customDiv="max-w-max"
                    customInput="max-w-max mr-3"
                    v-model="data.score.hindex_score"
                  />
                  <TextInputLabelLeft
                    label="ปี"
                    customLabel="w-auto mr-1"
                    customDiv="max-w-max"
                    customInput="max-w-max mr-3"
                    v-model="data.score.hindex_year"
                  />
                </div>
                <span class="place-self-center"
                  >มีค่าคะแนน = {{ data.score.score_result }} คะแนน</span
                >
              </div>

              <RadioInput
                label="ใช้ผลการจัดระดับ CIF (Conference Impact Factor)"
                name="Score"
                value="CIF"
                v-model="data.score.score_type"
              />
              <div v-if="data.score.score_type == 'CIF'">
                <div class="flex flex-row w-full px-7 my-2">
                  <TextInputLabelLeft
                    label="• ค่า citation total"
                    customLabel="w-auto mr-1"
                    customDiv="max-w-max"
                    customInput="max-w-max mr-3"
                    v-model="data.score.Citation"
                  />
                  <TextInputLabelLeft
                    label="x H-Index"
                    customLabel="w-auto mr-1"
                    customDiv="max-w-max"
                    customInput="max-w-max mr-3"
                    v-model="data.score.hindex_score"
                  />
                </div>
                <span class="place-self-center"
                  >มีค่าคะแนน = {{ data.score.score_result }} คะแนน</span
                >
              </div>
              <RadioInput
                label="ใช้ผลการจัดระดับ CORE Conference Ranking"
                name="Score"
                value="CORE"
                v-model="data.score.score_type"
              />
              <div v-if="data.score.score_type == 'CORE'">
                <div class="flex flex-row w-full px-7 my-2">
                  <TextInputLabelLeft
                    label="• ค่า"
                    customLabel="w-auto mr-1"
                    customDiv="max-w-max"
                    customInput="max-w-max mr-3"
                    v-model="data.score.core_rank"
                  />
                  <span class="place-self-center">(ตั้งแต่ A ขึ้นไป)</span>
                </div>
                <p class="px-7 text-sm text-red-500">
                  เช็คคะแนนได้จาก http://portal.core.edu.au/conf-ranks
                </p>
              </div>
            </SectionWrapper>
          </SectionWrapper>
        </SectionWrapper>
      </Mainbox>

      <!-- 3. ผู้ขอรับการสนับสนุน -->
      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">3. ผู้ขอรับการสนับสนุน</p>
        <SectionWrapper class="collapse-content">
          <RadioInput
            label="ผู้ประพันธ์อันดับแรก First Author"
            value="First Author"
            name="Author"
            v-model="data.conference.presenter_type"
          />
          <RadioInput
            label="ผู้ประพันธ์บรรณกิจ Corresponding Author"
            value="Corresponding Author"
            name="Author"
            v-model="data.conference.presenter_type"
          />
        </SectionWrapper>
      </Mainbox>

      <!-- 4.  การลาและการขอเบิกค่าลงทะเบียนและค่าใช้จ่ายอื่น ๆ -->
      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">
          4.  การลาและการขอเบิกค่าลงทะเบียนและค่าใช้จ่ายอื่น ๆ
        </p>
        <SectionWrapper class="collapse-content">
          <p class="font-bold text-base pt-3">4.1 ครั้งที่ในการลา</p>
          <SectionWrapper>
            <RadioInput
              label="ครั้งที่ 1"
              name="TimeLeave"
              value="1"
              v-model="data.conference.time_of_leave"
            />
          </SectionWrapper>

          <SectionWrapper>
            <RadioInput
              label="ครั้งที่ 2"
              name="TimeLeave"
              value="2"
              v-model="data.conference.time_of_leave"
            />
            <p class="py-1 px-7">
              ในกรณีลาครั้งที่ 2 (การประชุมฯ ณ ต่างประเทศ)
              มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล
            </p>
            <div
              v-if="data.conference.time_of_leave == 2"
              class="flex flex-row px-7 mt-1"
            >
              <RadioInput
                label="WoS-Q1"
                name="WoS"
                value="WoS-Q1"
                v-model="data.conference.wos_2_leave"
              />
              <RadioInput
                label="WoS-Q2"
                name="WoS"
                value="WoS-Q2"
                v-model="data.conference.wos_2_leave"
              />
            </div>
            <div v-if="data.conference.time_of_leave == 2" class="px-7 py-2">
              <TextInputLabelLeft
                label="เรื่อง"
                customLabel="pr-2"
                v-model="data.conference.name_2_leave"
              />
            </div>
          </SectionWrapper>

          <p class="font-bold text-base pt-3">
            4.2 กรณีที่จัดการประชุมฯ ณ ต่างประเทศ
          </p>
          <SectionWrapper>
            <p>ขอเบิกค่าลงทะเบียนตามที่จ่ายจริง และค่าใช้จ่ายอื่น ๆ</p>
            <RadioInput
              label="ไม่เกิน 50%"
              name="withdraw"
              value="50%"
              v-model="data.conference.withdraw"
            />
            <RadioInput
              label="ไม่เกิน 100% มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล"
              name="withdraw"
              value="100%"
              v-model="data.conference.withdraw"
            />
            <div
              v-if="data.conference.withdraw == '100%'"
              class="flex flex-row px-7 mt-1"
            >
              <RadioInput
                label="WoS-Q1"
                name="WoS"
                value="WoS-Q1"
                v-model="data.conference.wd_100_quality"
              />
              <RadioInput
                label="WoS-Q2"
                name="WoS"
                value="WoS-Q2"
                v-model="data.conference.wd_100_quality"
              />
              <RadioInput
                label="WoS-Q3"
                name="WoS"
                value="WoS-Q3"
                v-model="data.conference.wd_100_quality"
              />
              <RadioInput
                label="SJR-Q1"
                name="WoS"
                value="SJR-Q1"
                v-model="data.conference.wd_100_quality"
              />
              <RadioInput
                label="SJR-Q2"
                name="WoS"
                value="SJR-Q2"
                v-model="data.conference.wd_100_quality"
              />
            </div>
            <div class="px-7 py-2">
              <TextInputLabelLeft
                label="เรื่อง"
                customLabel="pr-2"
                v-model="data.conference.wd_name_100"
              />
            </div>
          </SectionWrapper>
        </SectionWrapper>
      </Mainbox>

      <!-- รายการค่าใช้จ่ายที่ขอเบิกจ่าย -->
      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          รายการค่าใช้จ่ายที่ขอเบิกจ่าย
        </p>
        <SectionWrapper class="collapse-content">
          <SectionWrapper>
            <div class="flex flex-row mb-2 justify-between">
              <div class="flex flex-row">
                <TextInputLabelLeft
                  label="1. ค่าลงทะเบียน (ตามที่จ่ายจริง) จำนวน"
                  customLabel="w-auto pr-2"
                  customDiv="max-w-max"
                  customInput="max-w-max"
                  v-model="data.conference.num_register_articles"
                />
                <TextInputLabelLeft
                  label="บทความ ๆ ละ"
                  customLabel="w-auto px-2"
                  customDiv="max-w-max"
                  customInput="max-w-max"
                  v-model="data.conference.regist_amount_1_article"
                />
                <p class="flex items-center pl-2">บาท</p>
              </div>
              <p class="flex items-center">
                รวม
                {{
                  parseFloat(totalAmount).toLocaleString(
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
                  v-model="data.conference.travel_country"
                />
                <TextInputLabelLeft
                  label="- กรุงเทพฯ"
                  customLabel="w-22 px-2"
                  customDiv="max-w-[20rem]"
                  customInput="max-w-[14rem]"
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
                  v-model="data.conference.num_days_room"
                />
                <TextInputLabelLeft
                  label="คืน ๆ ละ"
                  customLabel="w-auto pr-2"
                  customDiv="max-w-[26rem]"
                  customInput="max-w-[20rem]"
                  v-model="data.conference.room_cost_per_night"
                />
                <p class="flex items-center pl-2">บาท</p>
              </div>
              <p class="flex items-center">
                รวม
                {{
                  totalRoom == null
                    ? 0
                    : parseFloat(totalRoom).toLocaleString(
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
                  v-model="data.conference.num_travel_days"
                />
                <TextInputLabelLeft
                  label="วัน ๆ ละ"
                  customLabel="w-auto pr-2"
                  customDiv="max-w-[26rem]"
                  customInput="max-w-[20rem]"
                  v-model="data.conference.daily_allowance"
                />
                <p class="flex items-center pl-2">บาท</p>
              </div>
              <p class="flex items-center">
                รวม
                {{
                  totalAllowance == null
                    ? 0
                    : parseFloat(
                        totalAllowance
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })
                }}
                บาท
              </p>
            </div>
            <p class="font-bold text-2xl pt-5 text-right">
              รวมทั้งสิ้น
              {{
                parseFloat(allTotal).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })
              }}
              บาท
            </p>
          </SectionWrapper>
        </SectionWrapper>
      </Mainbox>
    </div>

    <div class="flex w-full ">
      <div class="flex flex-1 justify-start ">
        <button @click="saveDraft" class="bg-blue-500 text-white px-4 py-2 rounded mr-3">
          บันทึกแบบร่าง
        </button>
        <button @click="clearDraft" class="bg-red-500 text-white px-4 py-2 rounded mr-3">
          ลบแบบร่าง
        </button>
      </div>

      <div class="flex flex-1 justify-end">
        <button @click="handleSubmit" class="btn btn-success text-white">
          บันทึกข้อมูลที่แก้ไข
        </button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRaw, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);

const data = reactive({
  conference: {},
  originCofer: {},
  userForm: {},
  score: {},
  originScore: {},
  name: "",
});

const isLoading = ref(true);
// Access route parameters
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const fetchOfficerData = async () => {
  try {
    const responseConfer = await api.get(`/conference/${id}`);
    data.conference = responseConfer.data;

    const userID = responseConfer.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    data.userForm = responseUser.data;

    const responseScore = await api.get(`/score/${id}`);
    data.score = responseScore.data;
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

const fetchOfficerDataorigin = async () => {
  try {
    const responseConfer = await api.get(`/conference/${id}`);
    data.originCofer = JSON.parse(JSON.stringify(responseConfer.data));

    const responseScore = await api.get(`/score/${id}`);
    data.originScore = JSON.parse(JSON.stringify(responseScore.data));
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};

const totalAmount = computed(() => {
  data.conference.total_amount = data.conference.num_register_articles * data.conference.regist_amount_1_article;
  return data.conference.total_amount;
});
const totalRoom = computed(() => {
  data.conference.total_room = data.conference.num_days_room * data.conference.room_cost_per_night;
  return data.conference.total_room;
});
const totalAllowance = computed(() => {
  data.conference.total_allowance = data.conference.num_travel_days * data.conference.daily_allowance;
  return data.conference.total_allowance;
});

const allTotal = computed(() => {
  data.conference.all_money =
    (parseFloat(data.conference.total_amount) || 0) +
    (parseFloat(data.conference.domestic_expenses) || 0) +
    (parseFloat(data.conference.overseas_expenses) || 0) +
    (parseFloat(data.conference.inter_expenses) || 0) +
    (parseFloat(data.conference.airplane_tax) || 0) +
    (parseFloat(data.conference.total_room) || 0) +
    (parseFloat(data.conference.total_allowance) || 0);

  return data.conference.all_money;
});

// โหลด draft จาก localStorage ถ้ามี
const loadDraft = () => {
  const draftKey = `draft-form-CF-${id}`;
  console.log("draftKey",draftKey)
  const draft = localStorage.getItem(draftKey);
  console.log("draft",draft)
  if (draft) {
    try {
    const parsed = JSON.parse(draft);
    console.log("parsed",parsed)
    if (parsed) {
      data.conference = parsed.conference;
      data.userForm = parsed.userForm;
      data.score = parsed.score;
      console.log("โหลดข้อมูลจาก draft:", data);
      return true;
    }
  }catch (e) {
      console.warn("Draft format ผิดพลาด:", e);
    }
  }
  return false;
};

const saveDraft = () => {
  const rawData = toRaw(data);
  const draftKey = `draft-form-CF-${id}`;
  localStorage.setItem(draftKey, JSON.stringify(rawData));
  alert("บันทึกแบบร่างเรียบร้อยแล้ว");
};

const clearDraft = () => {
  const draftKey = `draft-form-CF-${id}`;
  localStorage.removeItem(draftKey);
  alert("ลบแบบร่างสำเร็จ");
};

const getChangedFields = () => {
  const current = toRaw(data.conference);
  const originalConference = data.originCofer;
  const changedFields = [];
  
  for (const key in current) {
    if (current[key] !== originalConference[key]) {
      changedFields.push({
        field: key,
        oldValue: originalConference[key],
        newValue: current[key],
      });
    }
  }
  return changedFields;
};
const getChangedFieldsScore = () => {
  const current = toRaw(data.score);
  const originalScore = data.originScore;
  const changedFields = [];
  console.log("changedFields", changedFields);
  console.log("current", current);
  console.log("originalConference", originalScore);
  for (const key in current) {
    if (current[key] !== originalScore[key]) {
      changedFields.push({
        field: key,
        oldValue: originalScore[key],
        newValue: current[key],
      });
    }
  }
  return changedFields;
};

const handleSubmit = async() => {
  const changed = getChangedFields();
  const changedScore = getChangedFieldsScore();
  console.log("changed confer", changed)
  console.log("changed score", changedScore)

  if (changed.length === 0 && changedScore.length === 0) {
    alert("ไม่มีการเปลี่ยนแปลงข้อมูล");
    return;
  }

  console.log("ฟิลด์ที่ถูกแก้ไข:", changed);
  console.log("ฟิลด์ที่ถูกแก้ไข changedScore:", changedScore);

  // ถ้าต้องการส่งเฉพาะที่เปลี่ยน:
  const payload = {};
  changed.forEach((item) => {
    payload[item.field] = item.newValue;
  });
  changedScore.forEach((item) => {
    payload[item.field] = item.newValue;
  });

  try{
    const dataForBackend = {
      conf_id: id,
      edit_data: changed,
      score: changedScore,
      editor: data.name,
      professor_reedit: false,
    }
    console.log("dataForBackend: ",dataForBackend)
    await api.put(`/editedFormConfer/${id}`, dataForBackend)
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");

    const draftKey = `draft-form-CF-${id}`;
    localStorage.removeItem(draftKey);

    router.push("/officer");
  }catch (error) {
      console.log("Error saving code : ", error);
      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    }
};

onMounted(async () => {
  fetchOfficerDataorigin();
  const draftLoaded = loadDraft(); // คืนค่า true ถ้ามี draft
  if (!draftLoaded) {
    await fetchOfficerData(); // โหลดจากฐานข้อมูลเฉพาะถ้าไม่มี draft
  }
  await userStore.fetchUser();
  data.name = user.value?.user_nameth || "";
});
</script>
