<template>
  <div class="container my-10 mx-auto">
    <div class="flex flex-row mb-4">
      <span class="flex mr-2 items-center">ปีงบประมาณ</span>
      <select class="select select-bordered w-1/6" v-model="data.findFiscalYear">
        <option v-for="n in 5" :key="n" :value="fiscalYear - (n - 1)">
          {{ fiscalYear - (n - 1) }}
        </option>
      </select>
    </div>

    <div class="tabs tabs-lift">
      <input type="radio" name="mytabs" class="tab" aria-label="การประชุมวิชาการแยกขอเบิก และเอกสารทั้งหมด"
        checked="checked" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2>
          ข้อมูลการประชุมวิชาการ
          แยกการขอเบิกและแสดงเอกสารทั้งหมดที่ได้รับอนุมัติ
        </h2>
        <div class="overflow-x-auto mt-2">
          <div class="flex justify-end">
            <button class="btn bg-[#E85F19] text-white" @click="exportExcel('dataconfer1_1')">
              Export to Excel
            </button>
          </div>
          <table class="table w-full mt-2" ref="dataconfer1_1">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2">ขอเบิก</th>
                <th class="border px-3 py-2">จำนวน</th>
                <th class="border px-3 py-2">ค่าลงทะเบียน</th>
                <th class="border px-3 py-2">ค่าตั๋วเครื่องบิน</th>
                <th class="border px-3 py-2">ค่าที่พัก</th>
                <th class="border px-3 py-2">ค่าเบี้ยเลี้ยง</th>
                <th class="border px-3 py-2">ค่าใช้จ่ายอื่น ๆ</th>
                <th class="border px-3 py-2">รวม</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th class="border px-3 py-2">ร้อยละ 50</th>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw50?.total_withdraws || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw50?.total_registration || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw50?.total_ticket || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw50?.total_room || 0).toLocaleString("en-US")
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw50?.total_allowance || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw50?.total_other || 0).toLocaleString("en-US")
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw50?.all_total || 0).toLocaleString("en-US")
                  }}
                </td>
              </tr>
              <tr>
                <th class="border px-3 py-2">เต็มวงเงิน</th>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw100?.total_withdraws || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw100?.total_registration || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw100?.total_ticket || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw100?.total_room || 0).toLocaleString("en-US")
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw100?.total_allowance || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw100?.total_other || 0).toLocaleString(
                      "en-US"
                    )
                  }}
                </td>
                <td class="border px-3 py-2">
                  {{
                    Number(withdraw100?.all_total || 0).toLocaleString("en-US")
                  }}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex justify-end mt-2">
            <button class="btn bg-[#E85F19] text-white" @click="exportExcel('dataconfer1_2')">
              Export to Excel
            </button>
          </div>
          <table class="table w-full mt-2" ref="dataconfer1_2">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2">ลำดับที่</th>
                <th class="border px-3 py-2">ชื่อ</th>
                <th class="border px-3 py-2">ผู้วิจัยร่วม</th>
                <th class="border px-3 py-2">หลักสูตรผู้วิจัยร่วม</th>
                <th class="border px-3 py-2">ชื่อผลงานวิจัย</th>
                <th class="border px-3 py-2">ชื่อการประชุม</th>
                <th class="border px-3 py-2">จังหวัด/ประเทศ</th>
                <th class="border px-3 py-2">คุณภาพการประชุม</th>
                <th class="border px-3 py-2">ขอเบิก</th>
                <th class="border px-3 py-2">ค่าลงทะเบียน</th>
                <th class="border px-3 py-2">ค่าตั๋วเครื่องบิน</th>
                <th class="border px-3 py-2">ค่าที่พัก</th>
                <th class="border px-3 py-2">ค่าเบี้ยเลี้ยง</th>
                <th class="border px-3 py-2">ค่าอื่น ๆ</th>
                <th class="border px-3 py-2">รวม</th>
                <th class="border px-3 py-2">สิทธิ์ที่ได้</th>
                <th class="border px-3 py-2">ส่วนต่าง</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in conferenceData" :key="index" class="text-center">
                <td class="border px-3 py-2">{{ index + 1 }}</td>
                <td class="border px-3 py-2">{{ row.user_nameth }}</td>
                <td class="border px-3 py-2">{{(row.name_co_researchers ?? []).filter(name => name !== "").join(", ")
                  }}</td>
                <td class="border px-3 py-2">{{(row.course_co_researchers ?? []).filter(name => name !== "").join(", ")
                  }}</td>
                <td class="border px-3 py-2">{{ row.conf_name }}</td>
                <td class="border px-3 py-2">{{ row.conf_research }}</td>
                <td class="border px-3 py-2">{{ row.location }}</td>
                <td class="border px-3 py-2">
                  {{ row.meeting_type }}
                  {{ row.quality_meeting ? `, ${row.quality_meeting}` : "" }}
                </td>
                <td class="border px-3 py-2">{{ row.withdraw ? `${row.withdraw}` : "-" }}</td>
                <td class="border px-3 py-2">
                  {{ Number(row.total_amount || 0).toLocaleString("en-US") }}
                </td>
                <td class="border px-3 py-2">
                  {{ Number(row.inter_expenses || 0).toLocaleString("en-US") }}
                </td>
                <td class="border px-3 py-2">
                  {{ Number(row.total_room || 0).toLocaleString("en-US") }}
                </td>
                <td class="border px-3 py-2">
                  {{ Number(row.total_allowance || 0).toLocaleString("en-US") }}
                </td>
                <td class="border px-3 py-2">
                  {{ Number(row.total_other || 0).toLocaleString("en-US") }}
                </td>
                <td class="border px-3 py-2">
                  {{ Number(row.all_money || 0).toLocaleString("en-US") }}
                </td>
                <td class="border px-3 py-2">
                  {{ Number(row.amount_approval - row.total_amount || 0).toLocaleString("en-US") }}
                </td>
                <td class="border px-3 py-2">
                  {{ Number(row.amount_approval - row.total_amount - row.all_money || 0).toLocaleString("en-US") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <input type="radio" name="mytabs" class="tab" aria-label="การประชุมวิชาการ (ต่างประเทศ)" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2>ข้อมูลการประชุมวิชาการ (ต่างประเทศ)</h2>
        <div class="flex justify-end mt-2">
          <button class="btn bg-[#E85F19] text-white" @click="exportExcel('dataconfer2')">
            Export to Excel
          </button>
        </div>
        <div class="overflow-x-auto mt-2">
          <table class="table w-full" ref="dataconfer2">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2" rowspan="2">ทวีป</th>
                <th class="border px-3 py-2" rowspan="2">จำนวน</th>
                <th class="border px-3 py-2" rowspan="2">ประเทศ</th>
                <th class="border px-3 py-2" rowspan="2">จำนวน</th>
                <th class="border px-3 py-2" colspan="7">ร้อยละ 50</th>
                <th class="border px-3 py-2" colspan="7">เต็มวงเงิน</th>
              </tr>
              <tr class="text-center">
                <!-- 50% columns -->
                <th class="border px-3 py-2">ค่าลงทะเบียน</th>
                <th class="border px-3 py-2">ค่าตั๋วเครื่องบิน</th>
                <th class="border px-3 py-2">ค่าที่พัก</th>
                <th class="border px-3 py-2">ค่าเบี้ยเลี้ยง</th>
                <th class="border px-3 py-2">อื่น ๆ</th>
                <th class="border px-3 py-2">รวม</th>
                <th class="border px-3 py-2">สิทธิ์ที่ได้</th>
                <!-- 100% columns -->
                <th class="border px-3 py-2">ค่าลงทะเบียน</th>
                <th class="border px-3 py-2">ค่าตั๋วเครื่องบิน</th>
                <th class="border px-3 py-2">ค่าที่พัก</th>
                <th class="border px-3 py-2">ค่าเบี้ยเลี้ยง</th>
                <th class="border px-3 py-2">อื่น ๆ</th>
                <th class="border px-3 py-2">รวม</th>
                <th class="border px-3 py-2">สิทธิ์ที่ได้</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <!-- ASIA Row -->
              <template v-if="countryData.ASIA == 0">
                <tr>
                  <td class="border px-3 py-2">ASIA</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                </tr>
              </template>
              <template v-if="countryData.ASIA == 1">
                <tr>
                  <td class="border px-3 py-2">ASIA</td>
                  <td class="border px-3 py-2">{{ countryData.ASIA }}</td>
                  <template v-for="(row, index) in countryData.ASIA_data" :key="index">
                    <td class="border px-3 py-2">{{ row.location }}</td>
                    <td class="border px-3 py-2">{{ row.count }}</td>
                    <template v-for="(row, index) in row.details" :key="index">
                      <template v-if="row.withdraw === '50%'">
                        <td class="border px-3 py-2">
                          {{ row.total_registration }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_ticket }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_room }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_other }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_amount_approval }}
                        </td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                      </template>
                      <template v-if="row.withdraw === '100%'">
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">
                          {{ row.total_registration }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_ticket }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_room }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_other }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_amount_approval }}
                        </td>
                      </template>
                    </template>
                  </template>
                </tr>
              </template>
              <template v-if="countryData.ASIA > 1">
                <tr>
                  <td class="border px-3 py-2">ASIA</td>
                  <td class="border px-3 py-2">{{ countryData.ASIA }}</td>
                  <template v-for="(row, index) in countryData.ASIA_data" :key="index">
                    <td class="border px-3 py-2">{{ row.location }}</td>
                    <td class="border px-3 py-2">{{ row.count }}</td>
                    <template v-for="(row, index) in row.details" :key="index">
                      <template v-if="index % 2 != 0">
                        <template v-if="row.withdraw === '50%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                        <template v-if="row.withdraw === '100%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                      </template>
                      <template v-if="index % 2 === 0">
                        <template v-if="row.withdraw === '50%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                        <template v-if="row.withdraw === '100%'">
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                      </template>
                    </template>
                  </template>
                </tr>
              </template>

              <!-- SEA Row -->
              <template v-if="countryData.SEA == 0">
                <tr>
                  <td class="border px-3 py-2">SEA</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                </tr>
              </template>
              <template v-if="countryData.SEA == 1">
                <tr>
                  <td class="border px-3 py-2">SEA</td>
                  <td class="border px-3 py-2">{{ countryData.SEA }}</td>
                  <template v-for="(row, index) in countryData.SEA_data" :key="index">
                    <td class="border px-3 py-2">{{ row.location }}</td>
                    <td class="border px-3 py-2">{{ row.count }}</td>
                    <template v-for="(row, index) in row.details" :key="index">
                      <template v-if="row.withdraw === '50%'">
                        <td class="border px-3 py-2">
                          {{ row.total_registration }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_ticket }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_room }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_other }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_amount_approval }}
                        </td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                      </template>
                      <template v-if="row.withdraw === '100%'">
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">
                          {{ row.total_registration }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_ticket }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_room }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_other }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_amount_approval }}
                        </td>
                      </template>
                    </template>
                  </template>
                </tr>
              </template>
              <template v-if="countryData.SEA > 1">
                <tr>
                  <td class="border px-3 py-2">SEA</td>
                  <td class="border px-3 py-2">{{ countryData.SEA }}</td>
                  <template v-for="(row, index) in countryData.SEA_data" :key="index">
                    <td class="border px-3 py-2">{{ row.location }}</td>
                    <td class="border px-3 py-2">{{ row.count }}</td>
                    <template v-for="(row, index) in row.details" :key="index">
                      <template v-if="index % 2 != 0">
                        <template v-if="row.withdraw === '50%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                        <template v-if="row.withdraw === '100%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                      </template>
                      <template v-if="index % 2 === 0">
                        <template v-if="row.withdraw === '50%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                        <template v-if="row.withdraw === '100%'">
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                      </template>
                    </template>
                  </template>
                </tr>
              </template>

              <!-- EUA Row -->
              <template v-if="countryData.EUA == 0">
                <tr>
                  <td class="border px-3 py-2">EUA</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                  <td class="border px-3 py-2">-</td>
                </tr>
              </template>
              <template v-if="countryData.EUA == 1">
                <tr>
                  <td class="border px-3 py-2">EUA</td>
                  <td class="border px-3 py-2">{{ countryData.EUA }}</td>
                  <template v-for="(row, index) in countryData.EUA_data" :key="index">
                    <td class="border px-3 py-2">{{ row.location }}</td>
                    <td class="border px-3 py-2">{{ row.count }}</td>
                    <template v-for="(row, index) in row.details" :key="index">
                      <template v-if="row.withdraw === '50%'">
                        <td class="border px-3 py-2">
                          {{ row.total_registration }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_ticket }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_room }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_other }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_amount_approval }}
                        </td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                      </template>
                      <template v-if="row.withdraw === '100%'">
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">-</td>
                        <td class="border px-3 py-2">
                          {{ row.total_registration }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_ticket }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_room }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_other }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_allowance }}
                        </td>
                        <td class="border px-3 py-2">
                          {{ row.total_amount_approval }}
                        </td>
                      </template>
                    </template>
                  </template>
                </tr>
              </template>
              <template v-if="countryData.EUA > 1">
                <tr>
                  <td class="border px-3 py-2">EUA</td>
                  <td class="border px-3 py-2">{{ countryData.EUA }}</td>
                  <template v-for="(row, index) in countryData.EUA_data" :key="index">
                    <td class="border px-3 py-2">{{ row.location }}</td>
                    <td class="border px-3 py-2">{{ row.count }}</td>
                    <template v-for="(row, index) in row.details" :key="index">
                      <template v-if="index % 2 != 0">
                        <template v-if="row.withdraw === '50%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                        <template v-if="row.withdraw === '100%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                      </template>
                      <template v-if="index % 2 === 0">
                        <template v-if="row.withdraw === '50%'">
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                        <template v-if="row.withdraw === '100%'">
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">-</td>
                          <td class="border px-3 py-2">
                            {{ row.total_registration }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_ticket }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_room }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_other }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_allowance }}
                          </td>
                          <td class="border px-3 py-2">
                            {{ row.total_amount_approval }}
                          </td>
                        </template>
                      </template>
                    </template>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <input type="radio" name="mytabs" class="tab" aria-label="การประชุมวิชาการ (ในประเทศ)" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2>ข้อมูลการประชุมวิชาการ (ในประเทศ)</h2>
        <div class="flex justify-end mt-2">
          <button class="btn bg-[#E85F19] text-white" @click="exportExcel('dataconfer3')">
            Export to Excel
          </button>
        </div>
        <div class="overflow-x-auto mt-2">
          <table class="table w-full" ref="dataconfer3">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2">จังหวัด</th>
                <th class="border px-3 py-2">จำนวน</th>
                <th class="border px-3 py-2">ค่าลงทะเบียน</th>
                <th class="border px-3 py-2">ค่าตั๋วเครื่องบิน</th>
                <th class="border px-3 py-2">ค่าที่พัก</th>
                <th class="border px-3 py-2">ค่าเบี้ยเลี้ยง</th>
                <th class="border px-3 py-2">อื่น ๆ</th>
                <th class="border px-3 py-2">รวม</th>
                <th class="border px-3 py-2">สิทธิ์ที่ได้</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <template v-for="(row, index) in inThai" :key="index">
                <tr>
                  <th class="border px-3 py-2">{{ row.location }}</th>
                  <td class="border px-3 py-2">{{ row.total_count }}</td>
                  <td class="border px-3 py-2">{{ Number(row.total_registration || 0).toLocaleString("en-US") }}</td>
                  <td class="border px-3 py-2">{{ Number(row.total_ticket || 0).toLocaleString("en-US") }}</td>
                  <td class="border px-3 py-2">{{ Number(row.total_room || 0).toLocaleString("en-US") }}</td>
                  <td class="border px-3 py-2">{{ Number(row.total_allowance || 0).toLocaleString("en-US") }}</td>
                  <td class="border px-3 py-2">{{ Number(row.total_other || 0).toLocaleString("en-US") }}</td>
                  <td class="border px-3 py-2">{{ Number(row.all_total - row.total_registration ||
                    0).toLocaleString("en-US") }}</td>
                  <td class="border px-3 py-2">
                    {{ Number(row.total_amount_approval - row.total_registration || 0).toLocaleString("en-US") }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <input type="radio" name="mytabs" class="tab" aria-label="โครงงานวิชาการ" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2>ข้อมูลทั้งหมดของโครงงานวิชาการ</h2>
        <div class="flex justify-end mt-2">
          <button class="btn bg-[#E85F19] text-white" @click="exportExcel('datakris')">
            Export to Excel
          </button>
        </div>
        <div class="overflow-x-auto mt-2">
          <table class="table w-full" ref="datakris">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2">ลำดับที่</th>
                <th class="border px-3 py-2">ชื่อ</th>
                <th class="border px-3 py-2">ชื่อผลงานวิจัย</th>
                <th class="border px-3 py-2">กลุ่มวิจัย</th>
                <th class="border px-3 py-2">มาตรฐานการวิจัย</th>
                <th class="border px-3 py-2">มาตราทางการค้า</th>
                <th class="border px-3 py-2">ระยะเวลาโครงการ(ปี)</th>
                <th class="border px-3 py-2">วันที่เริ่ม</th>
                <th class="border px-3 py-2">วันสิ้นสุด</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in krisData" :key="index" class="text-center">
                <td class="border px-3 py-2">{{ row.kris_id }}</td>
                <td class="border px-3 py-2">{{ row.user_nameth }}</td>
                <td class="border px-3 py-2">{{ row.name_research_th }}</td>
                <td class="border px-3 py-2">
                  {{ row.formattedResearch_cluster }},
                  {{ row.res_cluster_other }}
                </td>
                <td class="border px-3 py-2 w-1/6">
                  {{ row.formattedres_standard }}
                </td>
                <td class="border px-3 py-2" v-if="row.res_standard_trade == '52'">
                  มาตรา 52 (เพื่อประโยชน์ทางการค้า)
                </td>
                <td class="border px-3 py-2" v-if="row.res_standard_trade == '53'">
                  มาตรา 53 (ไม่มีวัตถุประสงค์เพื่อประโยชน์ทางการค้า)
                </td>
                <td class="border px-3 py-2" v-if="
                  row.res_standard_trade == '' ||
                  row.res_standard_trade == null
                ">
                  {{ row.res_standard_trade }}
                </td>
                <td class="border px-3 py-2">{{ row.year }}</td>
                <td class="border px-3 py-2">{{ row.formattedStartDate }}</td>
                <td class="border px-3 py-2">{{ row.formattedEndDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <input type="radio" name="mytabs" class="tab" aria-label="สรุปผลการขอสนับสนุนทั้งหมด" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2>การสรุปผลภาพรวมการขอเบิกค่าสนับสนุนการประชุมวิชาการ และ Page Charge </h2>
        <!-- must edit -->
        <div class="flex justify-end mt-2">
          <button class="btn bg-[#E85F19] text-white" @click="exportExcel('datauser')">
            Export to Excel
          </button>
        </div>
        <div class="overflow-x-auto mt-2">
          <!-- must edit ref -->
          <table class="table w-full" ref="datasumnat">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2" rowspan="2">ปีงบประมาณ</th>
                <th class="border px-3 py-2" colspan="3">เบิกค่าสนับสนุน Conference</th>
                <th class="border px-3 py-2" colspan="3">เบิกค่าสนับสนุน Page Charge</th>
              </tr>
              <tr class="text-center">
                <th class="border px-3 py-2">จำนวนอาจารย์</th>
                <th class="border px-3 py-2">จำนวนผลงาน</th>
                <th class="border px-3 py-2">วงเงินสนับสนุน</th>

                <th class="border px-3 py-2">จำนวนอาจารย์</th>
                <th class="border px-3 py-2">จำนวนผลงาน</th>
                <th class="border px-3 py-2">วงเงินสนับสนุน</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(row, index) in sumnat" :key="index">
                <td class="border px-3 py-2">{{ row.budget_year }}</td>
                <template v-for="(form, idx) in row.forms" :key="idx">
                  <template v-if="form.form_type === 'Conference' || form.form_type === 'Page_Charge'">
                    <td class="border px-3 py-2">{{ form.total_users_approved ? `${form.total_users_approved}` : "-" }}
                    </td>
                    <td class="border px-3 py-2">{{ form.total_forms_approved ? `${form.total_forms_approved}` : "-" }}
                    </td>
                    <td class="border px-3 py-2">{{ form.total_amount_approved ? `${form.total_amount_approved}` : "-"
                    }}</td>
                  </template>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <input type="radio" name="mytabs" class="tab" aria-label="ค่าใช้จ่ายสำหรับการนำเสนอบทความวิจัย" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2>ค่าใช้จ่ายสำหรับการนำเสนอบทความวิจัยลงตีพิมพ์ในวารสารวิชาการ</h2>
        <div class="flex justify-end mt-2">
          <button class="btn bg-[#E85F19] text-white" @click="exportExcel('datauser')">
            Export to Excel
          </button>
        </div>
        <div class="overflow-x-auto mt-2">
          <table class="table w-full" ref="datauser">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2">ลำดับที่</th>
                <th class="border px-3 py-2">ผู้เข้าร่วม</th>
                <th class="border px-3 py-2">ผู้วิจัยร่วม</th>
                <th class="border px-3 py-2">หลักสูตรผู้วิจัยร่วม</th>
                <th class="border px-3 py-2">ชื่อบทความ</th>
                <th class="border px-3 py-2">วันประกาศผลพิจารณา</th>
                <th class="border px-3 py-2">Quartile</th>
                <th class="border px-3 py-2">จำนวนเงิน/บ.</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(row, index) in SummaryPc" :key="index">
                <td class="border px-3 py-2">{{ index + 1 }}</td>
                <td class="border px-3 py-2">{{ row.user_nameth }}</td>
                <td class="border px-3 py-2">{{(row.name_co_researchers ?? []).filter(name => name !== "").join(", ")
                  }}</td>
                <td class="border px-3 py-2">{{(row.course_co_researchers ?? []).filter(name => name !== "").join(", ")
                  }}
                </td>
                <td class="border px-3 py-2">{{ row.article_title }}</td>
                <td class="border px-3 py-2">{{ DateTime.fromISO(row.date_review_announce).toFormat("dd-MM-yyyy") }}
                </td>
                <td class="border px-3 py-2">{{ getBestQt(row) }}</td>
                <td class="border px-3 py-2">{{ Number(row.withdraw || 0).toLocaleString("en-US") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <input type="radio" name="mytabs" class="tab" aria-label="การอบรม/สัมมนา/ดูงาน ทั้งภายในและต่างประเทศ" />
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <h2>การอบรม/สัมมนา/ดูงาน ของเจ้าหน้าที่คณะเทคโนโลยีสารสนเทศ ทั้งภายในและต่างประเทศ</h2>
        <div class="flex justify-end mt-2">
          <button class="btn bg-[#E85F19] text-white" @click="exportExcel('datauser')">
            Export to Excel
          </button>
        </div>
        <div class="overflow-x-auto mt-2">
          <table class="table w-full" ref="datauser">
            <thead>
              <tr class="text-center">
                <th class="border px-3 py-2">ลำดับที่</th>
                <th class="border px-3 py-2">ผู้เข้าร่วม</th>
                <th class="border px-3 py-2">ผู้วิจัยร่วม</th>
                <th class="border px-3 py-2">หลักสูตรผู้วิจัยร่วม</th>
                <th class="border px-3 py-2">หัวข้อ</th>
                <th class="border px-3 py-2">วดป.</th>
                <th class="border px-3 py-2">ผู้จัด/สถานที่</th>
                <th class="border px-3 py-2">จำนวนเงิน/บ.</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(row, index) in conferenceData" :key="index">
                <td class="border px-3 py-2">{{ index + 1 }}</td>
                <td class="border px-3 py-2">{{ row.user_nameth }}</td>
                <td class="border px-3 py-2">{{(row.name_co_researchers ?? []).filter(name => name !== "").join(", ")
                  }}</td>
                <td class="border px-3 py-2">{{(row.course_co_researchers ?? []).filter(name => name !== "").join(", ")
                  }}
                </td>
                <td class="border px-3 py-2">{{ row.conf_research }}</td>
                <td class="border px-3 py-2">{{ DateTime.fromISO(row.trav_dateStart).toFormat("dd-MM-yyyy") + " ถึง " +
                  DateTime.fromISO(row.trav_dateEnd).toFormat("dd-MM-yyyy") }}</td>
                <td class="border px-3 py-2">{{ row.location }}</td>
                <td class="border px-3 py-2">{{ Number(row.withdraw || 0).toLocaleString("en-US") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, reactive, watch, watchEffect } from "vue";
import api from "@/setting/api";
import { DateTime } from "luxon";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

const conferenceData = ref([]);
const SummaryPc = ref([]);
const krisData = ref([]);
const withdraw50 = ref([]);
const withdraw100 = ref([]);
const inThai = ref([]);
const countryData = reactive({
  ASIA: 0,
  ASIA_data: "",
  SEA: 0,
  SEA_data: "",
  EUA: 0,
  EUA_data: "",
});

const sumnat = ref([]);

const dataconfer1_1 = ref(null);
const dataconfer1_2 = ref(null);
const dataconfer2 = ref(null);
const dataconfer3 = ref(null);
const datapc1 = ref(null);
const datapc2 = ref(null);
const datakris = ref(null);

// Function to get the current Thai fiscal year
const getThaiFiscalYear = () => {
  const now = DateTime.now();
  const year = now.year + 543;
  return now.month >= 10 ? year + 1 : year;
};

const fiscalYear = getThaiFiscalYear();

const data = reactive({
  findFiscalYear: fiscalYear, // set default fiscal year
});

const getConferenceData = async (year) => {
  const response = await api.get(`/all_summary_conference/${year}`);

  conferenceData.value = response.data;
};

const getPageChargeData = async (year) => {
  const response = await api.get(`/all_summary_page_charge/${year}`);

  SummaryPc.value = response.data[0];
};

const getKrisData = async () => {
  const response = await api.get("/all_summary_kris");

  krisData.value = response.data.map((item) => ({
    ...item,
    formattedStartDate: item.project_periodStart
      ? DateTime.fromISO(item.project_periodStart).toFormat("dd-MM-yyyy")
      : "N/A",
    formattedEndDate: item.project_periodEnd
      ? DateTime.fromISO(item.project_periodEnd).toFormat("dd-MM-yyyy")
      : "N/A",
    formattedResearch_cluster: item.research_cluster
      .filter((item) => item !== "อื่น ๆ")
      .join(", "),
    formattedres_standard: item.res_standard.join(", "),
  }));
};

const getConfer_countwithdraw = async (year) => {
  const response = await api.get(`/count_confer_withdraw/${year}`);

  withdraw50.value = response.data[0];
  withdraw100.value = response.data[1];
};

const getConfer_country = async (year) => {
  try {
    const response = await api.get(`/count_confer_country/${year}`);
    const data = response.data; // JSON ที่ได้จาก API

    // ฟังก์ชันจัดกลุ่มข้อมูลตาม location และลบ location ออกจาก details
    const groupByLocation = (regionData) => {
      const grouped = {};
      regionData.data.forEach((item) => {
        const { location, ...detailWithoutLocation } = item; // ลบ location ออกจาก details

        if (!grouped[location]) {
          grouped[location] = {
            location: location,
            count: 0,
            details: [],
          };
        }
        grouped[location].count += 1;
        grouped[location].details.push(detailWithoutLocation);
      });

      return Object.values(grouped);
    };

    countryData.ASIA = data.ASIA?.count || 0;
    countryData.ASIA_data = data.ASIA ? groupByLocation(data.ASIA) : [];

    countryData.SEA = data.SEA?.count || 0;
    countryData.SEA_data = data.SEA ? groupByLocation(data.SEA) : [];

    countryData.EUA = data.EUA?.count || 0;
    countryData.EUA_data = data.EUA ? groupByLocation(data.EUA) : [];
  } catch (error) {
    console.log("Failed to fetch country data:", error);
  }
};

const getConfer_thai = async (year) => {
  const response = await api.get(`/count_confer_thai/${year}`);

  inThai.value = response.data;
};

const getSumnat = async () => {
  const response = await api.get("/all_sum");

  sumnat.value = response.data;
};

const getBestQt = (row) => {
  if (row.quality_journal.includes("nature")) {
    return "nature";
  }

  const qtOptions = [
    { name: "ISI", value: row.qt_isi },
    { name: "SJR", value: row.qt_sjr },
    { name: "Scopus", value: row.qt_scopus }
  ];

  // กรองเฉพาะค่าที่มี (ไม่ null หรือ 0)
  const valid = qtOptions
    .filter(opt => opt.value !== null && opt.value !== undefined)
    .sort((a, b) => a.value - b.value); // เรียงจากน้อยไปมาก

  return valid.length > 0 ? `${valid[0].name} (${valid[0].value})` : "-";
};


const exportExcel = (tableRefName) => {
  let table = null;
  let name = null

  if (tableRefName === "dataconfer1_1") {
    table = dataconfer1_1.value;
    name = "ข้อมูลการประชุมวิชาการแยกจากการขอเบิก"
  } else if (tableRefName === "dataconfer1_2") {
    table = dataconfer1_2.value;
    name = "ข้อมูลการประชุมวิชาการทั้งหมด"
  } else if (tableRefName === "dataconfer2") {
    table = dataconfer2.value;
    name = "ข้อมูลการประชุมวิชาการในต่างประเทศแยกด้วยทวีป"
  } else if (tableRefName === "dataconfer3") {
    table = dataconfer3.value;
    name = "ข้อมูลการประชุมวิชาการในประเทศแยกด้วยจังหวัด"
  } else if (tableRefName === "datapc1") {
    table = datapc1.value;
    name = "ข้อมูลการขอการสนับสนุนการตีพิมพ์แยกด้วย Quartile"
  } else if (tableRefName === "datapc2") {
    table = datapc2.value;
    name = "ข้อมูลการขอการสนับสนุนการตีพิมพ์ทั้ง"
  } else if (tableRefName === "datakris") {
    table = datakris.value;
    name = "ข้อมูลโครงงานวิชาการทั้งหมด"
  } else if (tableRefName === "datauser") {
    table = datauser.value;
    name = "ข้อมูลทั้งหมดของยอดการขอสนับสนุนและคงเหลือของผู้ใช้ในระบบ"
  }

  if (!table || !(table instanceof HTMLElement)) {
    console.log("Table reference is invalid:", tableRefName);
    return;
  }

  //ดึงข้อมูลจากตาราง HTML
  let rows = Array.from(table.querySelectorAll("tr")).map((row) =>
    Array.from(row.querySelectorAll("th, td")).map((cell) => cell.innerText)
  );

  //สร้าง Sheet ใหม่จากข้อมูลที่ได้
  let worksheet = XLSX.utils.aoa_to_sheet(rows);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // ปรับความกว้างของคอลัมน์
  worksheet["!cols"] = new Array(rows[0].length).fill({ wch: 20 });

  //บันทึกไฟล์ Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, `${name}.xlsx`);
};

const loadAllData = async (year) => {
  if (!year) return;
  await Promise.all([
    getConferenceData(year),
    getPageChargeData(year),
    getConfer_countwithdraw(year),
    getConfer_country(year),
    getConfer_thai(year),
  ]);
}

watch(
  () => data.findFiscalYear,
  (newVal, oldVal) => {
    loadAllData(newVal);
  },
  { immediate: true }
);

onMounted(() => {
  getKrisData();
  getSumnat();
});
</script>
