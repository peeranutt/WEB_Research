<template>
  <div class="container my-10 mx-auto">
    <p class="text-2xl font-bold text-center no-print">นำออกเอกสาร</p>
    <div class="flex flex-col gap-1">
      <div class="flex flex-col justify-center items-center gap-1">
        <p class="text-[15px] font-bold pt-7">
          แบบขอรับการสนับสนุนค่าใช้จ่ายในการเผยแพร่ผลงานทางวิชาการ
        </p>
        <p class="text-[11px]">
          ตามประกาศคณะฯ เรื่อง
          การสนับสนุนค่าใช้จ่ายในการเผยแพร่ผลงานทางวิชาการของอาจารย์ประจำคณะเทคโนโลยีสารสนเทศ
          พ.ศ. 2567
        </p>
      </div>
      <div class="flex mt-1 mx-5 py-2 border border-black justify-center">
        <p class="text-[14px] font-bold pr-3">
          แบบที่ 1 ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
        </p>
      </div>
      <div class="text-[12px]">
        <div class="flex flex-row mx-8 pt-1">
          <p>ข้าพเจ้า {{ formData.user.user_nameth }}</p>
          <p class="pl-5">ตำแหน่ง {{ formData.user.user_positionth }}</p>
        </div>
        <p>
          มีความประสงค์ขออนุมัติไปเผยแพร่ผลงานในการประชุมทางวิชาการ
          ซึ่งมีรายชื่ออยู่ใน List* ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่
          {{ formData.confer.conf_times }} เมื่อวันที่
          {{ formatThaiDate(formData.confer.conf_days) }}
        </p>
        <p>
          ขออนุมัติเดินทางในระหว่างวันที่
          {{ formatThaiDate(formData.confer.trav_dateStart) }} -
          {{ formatThaiDate(formData.confer.trav_dateEnd) }} มีรายละเอียดดังนี้
        </p>
        <p>1. ชื่อผลงานวิจัยที่นำเสนอ: {{ formData.confer.conf_research }}</p>
        <p>2. ชื่อการประชุมทางวิชาการ: {{ formData.confer.conf_name }}</p>
        <div class="flex flex-row gap-4">
          <p>3. การประชุมวิชาการจัดในประเทศ หรือต่างประเทศ</p>
          <input type="radio" :disabled="true" :checked="formData.confer.country_conf == 'domestic' ? true : false" />
          <span>ภายในประเทศ</span>
          <input type="radio" :disabled="true" :checked="formData.confer.country_conf == 'abroad' ? true : false" />
          <span>ณ ต่างประเทศ</span>
        </div>
        <div class="flex flex-row gap-4">
          <p>
            4. วันที่จัด: {{ formatThaiDate(formData.confer.meeting_date) }}
          </p>
          <p>สถานที่จัด: {{ formData.confer.meeting_venue }}</p>
          <p v-if="formData.confer.country_conf == 'abroad'">
            ประเทศ{{ formData.confer.location }}
          </p>
          <p v-if="formData.confer.country_conf == 'domestic'">
            จังหวัด{{ formData.confer.location }}
          </p>
        </div>
        <div class="flex flex-row gap-4">
          <p>
            5. วันที่ส่งบทความไปยังผู้จัด:
            {{ formatThaiDate(formData.confer.date_submit_organizer) }}
          </p>
          <p>
            วันประกาศผลการพิจารณาบทความ:
            {{ formatThaiDate(formData.confer.argument_date_review) }}
          </p>
        </div>
        <p>
          6. วันสุดท้ายของการลงทะเบียน:
          {{ formatThaiDate(formData.confer.last_day_register) }}
        </p>
        <p>7. คุณภาพของการประชุมทางวิชาการ</p>
        <div class="flex flex-col ml-4 gap-1 my-1">
          <div class="flex flex-row gap-3">
            <input type="radio" :disabled="true" :checked="formData.confer.meeting_type == 'facultyHost' ? true : false
              " />
            <span>การประชุมทางวิชาการที่คณะจัดหรือร่วมจัดในประเทศ
              และไม่อยู่ในฐานข้อมูลสากล SCOPUS</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="radio" :disabled="true" :checked="formData.confer.meeting_type == 'inScopus' ? true : false
              " />
            <span>การประชุมทางวิชาการที่อยู่ในฐานข้อมูลสากล SCOPUS
              โดยมีการกำหนดคุณภาพแบ่งเป็น 2 ระดับ</span>
          </div>
        </div>

        <div class="flex flex-col ml-10 gap-1 my1">
          <div class="flex flex-row gap-3">
            <input type="radio" :disabled="true" :checked="formData.confer.quality_meeting == 'standard' ? true : false
              " />
            <span>ระดับมาตรฐาน</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="radio" :disabled="true" :checked="formData.confer.quality_meeting == 'good' ? true : false
              " />
            <span>ระดับดีมาก</span>
          </div>
        </div>
        <div class="flex flex-col ml-[60px] gap-1 my-1">
          <div class="flex flex-row gap-3">
            <input type="radio" :disabled="true" :checked="formData.score.score_type == 'SJR' ? true : false" />
            <span>ใช้คะแนนที่คำนวณจาก SJR indicator และ H Index ที่ได้มาจาก SCImago
              Journal & Country Rank</span>
          </div>
          <div v-if="formData.score.score_type == 'SJR'" class="flex flex-row ml-10 gap-4">
            <p>
              ค่า SJR = {{ formData.score.sjr_score }} (ปี
              {{ formData.score.sjr_year }})
            </p>
            <p>
              ค่า H-Index = {{ formData.score.hindex_score }} (ปี
              {{ formData.score.hindex_year }})
            </p>
            <p>มีค่าคะแนน = {{ formData.score.score_result }}</p>
          </div>
          <div class="flex flex-row gap-3">
            <input type="radio" :disabled="true" :checked="formData.score.score_type == 'CIF' ? true : false" />
            <span>ใช้ผลการจัดระดับ CIF (Conference Impact Factor)</span>
          </div>
          <div v-if="formData.score.score_type == 'CIF'" class="flex flex-row ml-10 gap-4">
            <p>ค่า Citation total = {{ formData.score.sjr_score }}</p>
            <p>ค่า H-Index = {{ formData.score.hindex_score }}</p>
            <p>มีค่าคะแนน = {{ formData.score.score_result }}</p>
          </div>
          <div class="flex flex-row gap-3">
            <input type="radio" :disabled="true" :checked="formData.score.score_type == 'CORE' ? true : false" />
            <span>ใช้ผลการจัดระดับ CORE Conference Ranking</span>
          </div>
          <div v-if="formData.score.score_type == 'CORE'" class="flex flex-row ml-10 gap-4">
            <p>ค่า CORE = {{ formData.score.core_rank }}</p>
          </div>
        </div>

        <div class="flex flex-row gap-3">
          <p>8. ผู้ขอรับการสนับสนุนเป็นผู้นำเสนอผลงานและผู้วิจัยหลัก</p>
          <input type="radio" :disabled="true" :checked="formData.confer.presenter_type == 'First Author' ? true : false
            " />
          <span>First Author</span>
          <input type="radio" :disabled="true" :checked="formData.confer.presenter_type == 'Corresponding Author'
              ? true
              : false
            " />
          <span>Corresponding Author</span>
        </div>
        <p>9. การลาและการขอเบิกค่าลงทะเบียนและค่าใช้จ่ายอื่น ๆ</p>
        <div class="flex flex-row gap-3">
          <p class="ml-4">9.1 ครั้งที่ในการลา</p>
          <input type="radio" :disabled="true" :checked="formData.confer.time_of_leave == '1' ? true : false" />
          <span>ครั้งที่ 1</span>
          <input type="radio" :disabled="true" :checked="formData.confer.time_of_leave == '2' ? true : false" />
          <span>ครั้งที่ 2</span>
        </div>
        <div v-if="
          formData.confer.time_of_leave == '2' &&
          formData.confer.country_conf == 'abroad'
        " class="ml-12">
          <p>
            ในกรณีลาครั้งที่ 2 (การประชุมฯ ณ ต่างประเทศ)
            มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล
          </p>
          <div class="flex flex-row gap-3 ml-4">
            <input type="radio" :disabled="true" :checked="formData.confer.wos_2_leave == 'WoS-Q1' ? true : false" />
            <span>WoS-Q1</span>
            <input type="radio" :disabled="true" :checked="formData.confer.wos_2_leave == 'WoS-Q2' ? true : false" />
            <span>WoS-Q2</span>
          </div>
          <p class="ml-4">เรื่อง: {{ formData.confer.name_2_leave }}</p>
        </div>
        <p class="ml-4">9.2 กรณีที่จัดการประชุมฯ ณ ต่างประเทศ</p>
        <p class="ml-10">
          ขอเบิกค่าลงทะเบียนตามที่จ่ายจริง และค่าใช้จ่ายอื่น ๆ
        </p>
        <div class="flex flex-row gap-3 ml-10">
          <input type="radio" :disabled="true" :checked="formData.confer.withdraw == '50%' ? true : false" />
          <span>ไม่เกิน 50%</span>
        </div>
        <div class="flex flex-row gap-3 ml-10">
          <input type="radio" :disabled="true" :checked="formData.confer.withdraw == '100%' ? true : false" />
          <span>ไม่เกิน 100%</span>
        </div>
        <div v-if="formData.confer.withdraw == '100%'" class="ml-16">
          <p>มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล</p>
          <div class="flex flex-row gap-3">
            <input type="radio" :disabled="true" :checked="formData.confer.wd_100_quality == 'WoS-Q1' ? true : false
              " />
            <span>WoS-Q1</span>
            <input type="radio" :disabled="true" :checked="formData.confer.wd_100_quality == 'WoS-Q2' ? true : false
              " />
            <span>WoS-Q2</span>
            <input type="radio" :disabled="true" :checked="formData.confer.wd_100_quality == 'WoS-Q3' ? true : false
              " />
            <span>WoS-Q3</span>
            <input type="radio" :disabled="true" :checked="formData.confer.wd_100_quality == 'SJR-Q1' ? true : false
              " />
            <span>SJR-Q1</span>
            <input type="radio" :disabled="true" :checked="formData.confer.wd_100_quality == 'SJR-Q2' ? true : false
              " />
            <span>SJR-Q2</span>
          </div>
          <p>เรื่อง: {{ formData.confer.wd_name_100 }}</p>
        </div>

        <p class="underline">รายการค่าใช้จ่ายที่ขอเบิกจ่าย</p>

        <div class="flex flex-row justify-between my-1">
          <div class="flex flex-row max-w-max">
            <p>1) ค่าลงทะเบียน (ตามที่จ่ายจริง) จำนวน</p>
            <p class="px-2">{{ formData.confer.num_register_articles }}</p>
            <p>บทความ ๆ ละ</p>
            <p class="px-2">
              {{ formData.formattedNumbers.regist_amount_1_article }}
            </p>
            <p class="flex pl-2">บาท</p>
          </div>
          <p>รวม {{ formData.formattedNumbers.total_amount }} บาท</p>
        </div>
        <p>2. ค่าพาหนะเดินทาง</p>
        <div class="flex flex-col my-1 ml-4">
          <div class="flex flex-row mb-1">
            <p>- เดินทางในประเทศ</p>
            <p class="px-2">
              {{ formData.formattedNumbers.domestic_expenses ?? 0 }}
            </p>
            <p class="flex pl-2">บาท</p>
          </div>
          <div class="flex flex-row mb-1">
            <p>- เดินทางในต่างประเทศ</p>
            <p class="px-2">
              {{ formData.formattedNumbers.overseas_expenses ?? 0 }}
            </p>
            <p class="flex pl-2">บาท</p>
          </div>
          <div class="flex flex-row mb-1">
            <p>- เดินทางระหว่างประเทศ กรุงเทพฯ -</p>
            <p class="px-2">{{ formData.confer.travel_country ?? "-" }}</p>
            <p>- กรุงเทพฯ</p>
            <p class="px-2">
              {{ formData.formattedNumbers.inter_expenses ?? 0 }}
            </p>
            <p class="flex pl-2">บาท</p>
          </div>
        </div>
        <div class="flex flex-row gap-3">
          <p>3) ค่าภาษีสนามบิน (ถ้ามี)</p>
          <p>{{ formData.formattedNumbers.airplane_tax ?? 0 }}</p>
          <p class="flex items-center pl-2">บาท</p>
        </div>
        <div class="flex flex-row justify-between my-1">
          <div class="flex flex-row max-w-max">
            <p>4) ค่าเช่าที่พัก</p>
            <p class="px-2">{{ formData.confer.num_days_room ?? 0 }}</p>
            <p>คืน ๆ ละ</p>
            <p class="px-2">
              {{ formData.formattedNumbers.room_cost_per_night ?? 0 }}
            </p>
            <p class="flex pl-2">บาท</p>
          </div>
          <p>รวม {{ formData.formattedNumbers.total_room ?? 0 }} บาท</p>
        </div>
        <div class="flex flex-row justify-between my-1">
          <div class="flex flex-row max-w-max">
            <p>5) ค่าเบี้ยเลี้ยงเดินทาง</p>
            <p class="px-2">{{ formData.confer.num_travel_days ?? 0 }}</p>
            <p>วัน ๆ ละ</p>
            <p class="px-2">
              {{ formData.formattedNumbers.daily_allowance ?? 0 }}
            </p>
            <p class="flex pl-2">บาท</p>
          </div>
          <p>รวม {{ formData.formattedNumbers.total_allowance ?? 0 }} บาท</p>
        </div>
        <div class="flex flex-row pt-1 justify-end gap-3">
          <p>รวมทั้งสิ้น</p>
          <p class="underline">{{ formData.formattedNumbers.all_money }}</p>
          <p>บาท</p>
        </div>
        <div class="flex flex-row pt-3 justify-end gap-2">
          <p>ลงนาม</p>
          <img :src="getUploadURL(formData.user.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
          <p>ผู้เสนอขออนุมัติ</p>
          <p>ลงวันที่</p>
          <p>{{ formatThaiDate(formData.confer.doc_submit_date) }}</p>
        </div>
      </div>
    </div>

    <div class="page-break"></div>
    <div class="flex flex-col gap-1 text-[12px]">
      <p class="underline font-bold pr-2 mt-10">ตรวจข้อมูลและหลักฐาน</p>
      <div class="flex flex-col divide-y divide-black border border-black mt-3">
        <div class="flex flex-col mt-1 py-2 px-2">
          <div class="flex flex-row underline">
            <p class="pr-2">ขั้นตอนที่ 1</p>
            <p>งานบริหารทรัพยากรบุคคล</p>
          </div>
          <p>รับยื่นแบบฯ ตรวจรายการค่าใช้จ่ายที่ขอเบิกจ่ายและหลักฐาน</p>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.file.full_page != null ? true : false"
              :disabled="true" />
            <span>สำเนาบทความ (Full Paper)</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.file.published_journals != null ? true : false"
              :disabled="true" />
            <span class="mt-2">*กรณีเบิกค่าใช้จ่ายเต็มวงเงิน* (Full Paper ประกอบการเบิก)
              มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล WoS/SJR
              ซึ่งได้รับการตีพิมพ์ไม่เกิน 2 ปี ก่อนการประชุม เมื่อ
              {{ formData.file.date_published_journals }}</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.file.q_proof != null ? true : false"
              :disabled="true" />
            <span class="mt-1">
              *กรณีเบิกค่าใช้จ่ายเต็มวงเงิน* หลักฐานเอกสาร Q ของ Paper
              ที่ใช้ประกอบการเบิก</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.file.call_for_paper != null ? true : false"
              :disabled="true" />
            <span>เอกสารประชาสัมพันธ์การจัดการประชุมทางวิชาการ (Call for
              paper)</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.file.accepted != null ? true : false"
              :disabled="true" />
            <span>จดหมายการตอบรับเข้าร่วมประชุม (Accepted)</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.file.fee_receipt != null ? true : false"
              :disabled="true" />
            <span>เอกสารแสดงค่าลงทะเบียน</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.file.fx_rate_document != null ? true : false"
              :disabled="true" />
            <span>เอกสารแสดงอัตราแลกเปลี่ยน (ณ วันที่ยื่น)</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.file.conf_proof != null ? true : false"
              :disabled="true" />
            <span>หลักฐานการประชุมวิชาการอยู่ในฐาน Scopus</span>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" class="pt-1 px-5" :checked="formData.user.user_confer == false ? true : false"
              :disabled="true" />
            <span>เป็นพนักงานสถาบันที่ปฏิบัติงานมาแล้วไม่เกิน 3
              ปีนับตั้งแต่วันบรรจุและยังไม่เคยลาเข้าร่วมประชุมทางวิชาการ ณ
              ต่างประเทศ</span>
          </div>
          <div class="flex flex-row gap-3">
            <p>ผู้ขอรับการสนับสนุนเป็น</p>
            <input type="checkbox" class="pt-1 px-5" :checked="formData.confer.presenter_type == 'First Author' ? true : false
              " :disabled="true" />
            <span>First Author</span>
            <input type="checkbox" class="pt-1 px-5" :checked="formData.confer.presenter_type == 'Corresponding Author'
                ? true
                : false
              " :disabled="true" />
            <span>Corresponding Author</span>
          </div>
          <p>อื่น ๆ ต้องเพิ่มดาต้าเบส</p>
          <div class="flex flex-col text-[13px] pt-3 items-end">
            <div class="flex flex-row gap-1 py-3">
              <p>ลงนาม</p>
              <div v-for="item in formData.signatureOffice" :key="item" class="-mt-4">
                <img v-if="
                  item.user_role == 'hr' &&
                  item.user_id == formData.offic.hr_id
                " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
              </div>
              <p>เจ้าหน้าที่บริหารทรัพยากรบุคคล</p>
            </div>
            <p>ลงวันที่</p>
            <p>{{ formatThaiDate(formData.offic.hr_doc_submit_date) }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 divide-x divide-black border border-black mt-5 text-[11px]">
          <div class="px-2 py-3">
            <p class="underline">ขั้นตอนที่ 2 งานบริหารงานวิจัย</p>
            <p>ตรวจหลักฐานคุณภาพของการจัดประชุมทางวิชาการ</p>
            <p>- คุณภาพของการประชุมฯ</p>
            <div class="flex flex-row gap-2 pl-4">
              <input type="radio" :disabled="true" :checked="formData.confer.quality_meeting == 'standard' ? true : false
                " />
              <span>ระดับมาตรฐาน</span>
              <input type="radio" :disabled="true" :checked="formData.confer.quality_meeting == 'good' ? true : false
                " />
              <span>ระดับดีมาก</span>
            </div>
            <div v-if="formData.confer.quality_meeting == 'good'">
              <p>
                - กรณีที่เป็นการประชุมวิชาการ
                <b>ระดับดีมาก</b> เลือกวิธีคิดค่าคะแนนคุณภาพ และมีระดับคะแนน
                คุณภาพของการประชุมฯ ดังนี้
              </p>
              <p v-if="formData.score.score_type == 'CORE'" class="pl-3">
                คำนวณจาก {{ formData.score.score_type }} มีค่าคะแนน
                {{ formData.score.core_rank }}
              </p>
              <p v-else class="pl-3">
                คำนวณจาก {{ formData.score.score_type }} มีค่าคะแนน
                {{ formData.score.score_result }}
              </p>
            </div>
            <p v-else-if="formData.confer.quality_meeting == 'standard'" class="px-2">
              • อยู่ในระดับมาตรฐาน
            </p>
            <p v-else-if="formData.confer.quality_meeting == ''" class="px-2">
              • ประชุมทางวิชาการที่คณะจัดหรือร่วมจัดในประเทศ
              และไม่อยู่ในฐานข้อมูลสากล SCOPUS
            </p>
            <div class="flex flex-col pt-3 items-end">
              <div class="flex flex-row gap-1 mt-3">
                <p>ลงนาม</p>
                <div v-for="item in formData.signatureOffice" :key="item" class="-mt-4">
                  <img v-if="
                    item.user_role == 'research' &&
                    item.user_id == formData.offic.research_id
                  " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
                </div>
              </div>
              <p>เจ้าหน้าที่บริหารงานวิจัย</p>
              <p>
                {{ formatThaiDate(formData.offic.research_doc_submit_date) }}
              </p>
            </div>
          </div>
          <div class="px-2 py-3">
            <p class="underline">ขั้นตอนที่ 3 งานการเงิน</p>
            <p>
              ตรวจสอบเงินงบประมาณประจำปีที่คณะจัดสรรในการเผยแพร่ผลงานวิชาการ
            </p>
            <p>ปีงบประมาณ พ.ศ. {{ formData.budget.budget_year }}</p>
            <div class="flex flex-col items-end">
              <div class="flex flex-row justify-between gap-3 pt-2">
                <p>วงเงินที่คณะจัดสรรไว้ จำนวนเงินทั้งสิ้น</p>
                <p>{{ formData.formattedBudget.Conference_amount }}</p>
                <p>บาท</p>
              </div>
              <div class="flex flex-row justify-between gap-3 pt-2">
                <p>โดยคณะได้อนุมัติค่าใช้จ่ายไปแล้ว จำนวน</p>
                <p>{{ formData.budget.num_expenses_approved }}</p>
                <p>รายการ</p>
              </div>
              <div class="flex flex-row justify-between gap-3 pt-2">
                <p>รวมเป็นเงิน</p>
                <p>{{ formData.formattedBudget.total_amount_approved }}</p>
                <p>บาท</p>
              </div>
              <div class="flex flex-row justify-between gap-3 pt-2">
                <p>วงเงินที่คณะจัดสรรไว้ คงเหลือ</p>
                <p>{{ formData.formattedBudget.remaining_credit_limit }}</p>
                <p>บาท</p>
              </div>
              <div class="flex flex-row justify-between gap-3 pt-2">
                <p>จำนวนเงินที่ขออนุมัติจัดสรรในครั้งนี้ เป็นจำนวน</p>
                <p>{{ formData.formattedBudget.amount_approval }}</p>
                <p>บาท</p>
              </div>
              <div class="flex flex-row justify-between gap-3 pt-2">
                <p>วงเงินที่คณะจัดสรรไว้ คงเหลือทั้งสิ้น</p>
                <p>
                  {{ formData.formattedBudget.total_remaining_credit_limit }}
                </p>
                <p>บาท</p>
              </div>
            </div>
            <div class="flex flex-col mt-3 items-end">
              <div class="flex flex-row gap-1">
                <p>ลงนาม</p>
                <div v-for="item in formData.signatureOffice" :key="item.user_id" class="-mt-2">
                  <img v-show="item.user_role == 'finance' &&
                    item.user_id == formData.budget.user_id
                    " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
                </div>
              </div>
              <p>เจ้าหน้าที่การเงิน</p>
              <p>
                {{ formatThaiDate(formData.budget.doc_submit_date) }}
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 divide-x divide-black border border-black text-[12px]">
          <div class="px-2 py-3">
            <p class="underline">ความเห็นรองคณบดี (กำกับดูแลด้านงานวิจัย)</p>
            <p class="pt-4 pl-3">เห็นชอบ</p>
            <div class="flex flex-col pt-3 items-end">
              <div class="flex flex-row gap-1">
                <p>ลงนาม</p>
                <div v-for="item in formData.signatureOffice" :key="item" class="-mt-3">
                  <img v-if="
                    item.user_role == 'associate' &&
                    item.user_id == formData.offic.associate_id
                  " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
                </div>
              </div>

              <p>
                {{ formatThaiDate(formData.offic.associate_doc_submit_date) }}
              </p>
            </div>
          </div>
          <div class="px-2 py-3">
            <p class="font-bold">เรียน คณบดีคณะเทคโนโลยีสารสนเทศ</p>
            <p class="pt-1 px-8">
              เพื่อโปรดทราบการจัดสรรวงเงิน ก่อนการตอบรับบทความจากผู้จัด
            </p>
            <p v-if="formData.offic.c_approve_result == 'acknowledge'" class="flex font-bold justify-end">
              รับทราบ
            </p>
            <div class="flex flex-col mt-5 items-end">
              <div class="flex flex-row gap-1">
                <p>ลงนาม</p>
                <div v-for="item in formData.signatureOffice" :key="item" class="-mt-4">
                  <img v-if="
                    item.user_role == 'dean' &&
                    item.user_id == formData.offic.dean_id
                  " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
                </div>
                <p>คณบดี</p>
              </div>
              <div v-for="item in formData.signatureOffice" :key="item">
                <p v-if="
                  item.user_role == 'dean' &&
                  item.user_id == formData.offic.dean_id
                ">
                  ({{ item.user_position }} {{ item.user_name }})
                </p>
              </div>
              <p>{{ formatThaiDate(formData.offic.dean_doc_submit_date) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row container my-10 mx-auto gap-3 justify-end">
      <div class="flex no-print">
        <router-link :to="`/myHistory`">
          <button class="btn text-black border-[#4285F4] hover:bg-[#4285F4]">
            ไปยังหน้าประวัติทั้งหมด
          </button>
        </router-link>
      </div>
      <div class="flex no-print">
        <button onclick="window.print()" class="btn text-white bg-[#4285F4] hover:bg-[#4285F4]">
          พิมพ์แบบฟอร์ม
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";

const userStore = useUserStore();

const user = computed(() => userStore.user);

// จัดการข้อมูลหลัก
const formData = reactive({
  confer: [],
  score: [],
  user: [],
  offic: [],
  budget: [],
  formattedNumbers: "",
  formattedBudget: "",
  file: [],
  signatureOffice: [],
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

//isLoading เพื่อแสดงสถานะว่ากำลังโหลดข้อมูล
const isLoading = ref(true);
// Access route parameters
const route = useRoute();
const id = route.params.id;

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "0.00";
  const num = parseFloat(value);
  if (isNaN(num)) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
// ตัวแปรสำหรับเก็บข้อมูลจาก backend
const fetchProfessorData = async () => {
  try {
    const responseConfer = await api.get(`/conference/${id}`);
    formData.confer = responseConfer.data;
    formData.formattedNumbers = {
      regist_amount_1_article: formatNumber(
        formData.confer.regist_amount_1_article
      ),
      total_amount: formatNumber(formData.confer.total_amount),
      domestic_expenses: formatNumber(formData.confer.domestic_expenses),
      overseas_expenses: formatNumber(formData.confer.overseas_expenses),
      inter_expenses: formatNumber(formData.confer.inter_expenses),
      airplane_tax: formatNumber(formData.confer.airplane_tax),
      room_cost_per_night: formatNumber(formData.confer.room_cost_per_night),
      total_room: formatNumber(formData.confer.total_room),
      daily_allowance: formatNumber(formData.confer.daily_allowance),
      total_allowance: formatNumber(formData.confer.total_allowance),
      all_money: formatNumber(formData.confer.all_money),
    };

    const userID = responseConfer.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    formData.user = responseUser.data;

    const responseScore = await api.get(`/score/${id}`);
    formData.score = responseScore.data;

    const responseoffic = await api.get(`/opinionConf/${id}`);
    formData.offic = responseoffic.data;

    const responsebudget = await api.get(`/budget/conference/${id}`);
    formData.budget = responsebudget.data;
    formData.formattedBudget = {
      Conference_amount: formatNumber(formData.budget.Conference_amount),
      total_amount_approved: formatNumber(
        formData.budget.total_amount_approved
      ),
      remaining_credit_limit: formatNumber(
        formData.budget.remaining_credit_limit
      ),
      amount_approval: formatNumber(formData.budget.amount_appr),
      total_remaining_credit_limit: formatNumber(
        formData.budget.total_remaining_credit_limit
      ),
    };

    const responseFile = await api.get(`/pdfConfer/${id}`);
    formData.file = responseFile.data;

    const responseSignature = await api.get("/users");

    for (let i = 0; i < responseSignature.data.length; i++) {
      if (
        ["hr", "research", "finance", "associate", "dean"].includes(
          responseSignature.data[i].user_role
        )
      ) {
        const signature = {
          user_id: responseSignature.data[i].user_id,
          user_name: responseSignature.data[i].user_nameth,
          user_position: responseSignature.data[i].user_positionth,
          user_role: responseSignature.data[i].user_role,
          user_signature: responseSignature.data[i].user_signature,
        };
        formData.signatureOffice.push(signature);
      }
    }
    console.log("formData.signatureOffice", formData.signatureOffice);
  } catch (error) {
    console.log("Error fetching professor data:", error);
  } finally {
    isLoading.value = false;
  }
};

const getUploadURL = (filename) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  return `${baseURL}/uploads/${filename}`;
};

// ดึงข้อมูลเมื่อ component ถูกโหลด
onMounted(async () => {
  await fetchProfessorData();
  await userStore.fetchUser();
});
</script>

<style>
@media print {
  img {
    object-fit: cover;
  }

  .no-print {
    display: none !important;
  }

  @page {
    margin: 0;
  }

  body {
    margin: 0;
  }

  header,
  footer {
    display: none;
  }

  .page-break {
    page-break-before: always;
  }
}
</style>
