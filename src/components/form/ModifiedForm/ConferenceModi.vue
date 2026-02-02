<template>
  <div class="container my-10 mx-auto">
    <p class="text-xl font-bold mb-5">
      ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
    </p>
    <Mainbox>
      <SectionWrapper>
        <TextInputLabelLeft label="ชื่อ" customLabel="w-2/12 text-lg font-bold" :disabled="true"
          v-model="formData.userForm.user_nameth" />
        <TextInputLabelLeft label="ตำแหน่ง" customLabel="w-2/12 text-lg font-bold" :disabled="true"
          v-model="formData.userForm.user_positionth" />

        <div class="flex flex-row">
          <TextInputLabelLeft label="มีรายชื่ออยู่ใน List ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่"
            customLabel="w-auto" customInput="max-w-max" customDiv="max-w-max" name="conf_times"
            v-model="formData.conference.conf_times" :class="isFieldEdited('conf_times') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="วันที่" type="date" customLabel="ml-2 w-10" customInput="max-w-max"
            name="conf_days" v-model="formData.conference.conf_days"
            :class="isFieldEdited('conf_days') ? 'text-red-500' : ''" />
        </div>
        <p class="text-blue-500 text-sm">
          สามารถตรวจสอบรายชื่อ List ของคณะได้ที่เว็บไซต์คณะที่ Share online-การวิจัย และ
          <a href="https://erp.it.kmitl.ac.th/journal_conf_list">https://erp.it.kmitl.ac.th/journal_conf_list</a>
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
          <TextInputLabelLeft label="เดินทางวันที่" type="date" customLabel="w-auto mr-1" customDiv="max-w-max"
            customInput="max-w-max" name="trav_dateStart" v-model="formData.conference.trav_dateStart"
            :class="isFieldEdited('trav_dateStart') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="ถึงวันที่" type="date" customLabel="w-auto mr-8" customDiv="max-w-max ml-36"
            customInput="max-w-max" name="trav_dateEnd" v-model="formData.conference.trav_dateEnd"
            :class="isFieldEdited('trav_dateEnd') ? 'text-red-500' : ''" />
        </div>

        <TextInputLabelLeft label="ชื่อผลงานวิจัยที่นำเสนอ" customLabel="w-1/6" name="conf_research"
          v-model="formData.conference.conf_research" :class="isFieldEdited('conf_research') ? 'text-red-500' : ''" />
        <TextInputLabelLeft label="จำนวนนักวิจัยร่วม" customLabel="w-[10%]" name="num_co_researchers"
          v-model="formData.conference.num_co_researchers"
          :class="isFieldEdited('num_co_researchers') ? 'text-red-500' : ''" />
        <div v-for="(index) in parseInt(formData.conference.num_co_researchers) || 0" :key="index">
          <div class="flex flex-row gap-4">
            <p class="pt-2">{{ index }}.</p>
            <TextInputLabelLeft label="ชื่อ-นามสกุลของนักวิจัยร่วม" customLabel="w-[100%]" customDiv="max-w-[30%]"
              name="name_co_researchers" v-model="formData.conference.name_co_researchers[index]"
              :class="isFieldEdited('name_co_researchers') ? 'text-red-500' : ''" />
            <TextInputLabelLeft label="หลักสูตรของนักวิจัยร่วม" customLabel="w-[100%]" customDiv="max-w-[25%]"
              name="course_co_researchers" v-model="formData.conference.course_co_researchers[index]"
              :class="isFieldEdited('course_co_researchers') ? 'text-red-500' : ''" />
          </div>
        </div>
        <TextInputLabelLeft label="ชื่อการประชุมทางวิชาการ" customLabel="w-1/6" name="conf_name"
          v-model="formData.conference.conf_name" :class="isFieldEdited('conf_name') ? 'text-red-500' : ''" />
        <div class="flex flex-row w-full">
          <p class="w-1/4">การประชุมวิชาการจัดในประเทศ หรือต่างประเทศ</p>
          <RadioInput label="ภายในประเทศ" name="Venue" value="domestic" customDiv="w-max mr-4"
            v-model="formData.conference.country_conf" :class="isFieldEdited('country_conf') ? 'text-red-500' : ''" />
          <RadioInput label="ณ ต่างประเทศ" name="Venue" value="abroad" customDiv="max-w-36"
            v-model="formData.conference.country_conf" :class="isFieldEdited('country_conf') ? 'text-red-500' : ''" />
        </div>
        <div class="flex flex-row">
          <TextInputLabelLeft label="วันที่จัด" type="date" customLabel="w-auto mr-9" customDiv="max-w-max mr-10"
            customInput="max-w-max" v-model="formData.conference.meeting_date"
            :class="isFieldEdited('meeting_date') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="สถานที่จัด" customLabel="w-24" v-model="formData.conference.meeting_venue"
            :class="isFieldEdited('meeting_venue') ? 'text-red-500' : ''" />
          <div class="ml-10 w-full flex justify-center items-center"
            v-if="formData.conference.country_conf == 'abroad'">
            <div class="flex flex-row w-full">
              <TextInputLabelLeft label="ประเทศ" customLabel="w-24" v-model="formData.conference.location"
                :class="isFieldEdited('location') ? 'text-red-500' : ''" />
            </div>
          </div>

          <div class="ml-5 w-full flex justify-center items-center"
            v-if="formData.conference.country_conf == 'domestic'">
            <div class="flex flex-row w-full">
              <TextInputLabelLeft label="จังหวัด" customLabel="w-24" v-model="formData.conference.location"
                :class="isFieldEdited('location') ? 'text-red-500' : ''" />
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <TextInputLabelLeft label="วันที่ส่งบทความไปยังผู้จัด" type="date" customLabel="w-auto mr-1"
            customDiv="max-w-max" customInput="max-w-max" v-model="formData.conference.date_submit_organizer"
            :class="isFieldEdited('date_submit_organizer') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="วันประกาศผลการพิจารณาบทความ" type="date" customLabel="w-auto mr-1"
            customDiv="max-w-max" customInput="max-w-max" v-model="formData.conference.argument_date_review"
            :class="isFieldEdited('argument_date_review') ? 'text-red-500' : ''" />
          <TextInputLabelLeft label="วันสุดท้ายของการลงทะเบียน" type="date" customLabel="w-auto mr-1"
            customDiv="max-w-max" customInput="max-w-max" v-model="formData.conference.last_day_register"
            :class="isFieldEdited('last_day_register') ? 'text-red-500' : ''" />
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
        <RadioInput label="การประชุมทางวิชาการที่คณะจัดหรือร่วมจัดในประเทศ และไม่อยู่ในฐานข้อมูลสากล SCOPUS"
          name="Scopus" value="facultyHost" v-model="formData.conference.meeting_type"
          :class="isFieldEdited('meeting_type') ? 'text-red-500' : ''" />
        <RadioInput label="การประชุมทางวิชาการที่อยู่ในฐานข้อมูลสากล SCOPUS โดยมีการกำหนดคุณภาพแบ่งเป็น 2 ระดับ "
          name="Scopus" value="inScopus" v-model="formData.conference.meeting_type"
          :class="isFieldEdited('meeting_type') ? 'text-red-500' : ''" />

        <SectionWrapper>
          <RadioInput label="ระดับมาตรฐาน" name="Level" value="standard" v-model="formData.conference.quality_meeting"
            :class="isFieldEdited('quality_meeting') ? 'text-red-500' : ''" />
          <RadioInput label="ระดับดีมาก" name="Level" value="good" v-model="formData.conference.quality_meeting"
            :class="isFieldEdited('quality_meeting') ? 'text-red-500' : ''" />
          <SectionWrapper>
            <RadioInput label="ใช้คะแนนที่คำนวณจาก SJR indicator และ H Index ที่ได้มาจาก SCImago Journal & Country Rank"
              name="Score" value="SJR" v-model="formData.score.score_type"
              :class="isFieldEdited('score_type') ? 'text-red-500' : ''" />
            <div v-if="formData.score.score_type == 'SJR'">
              <div class="flex flex-row w-full px-7 my-2">
                <TextInputLabelLeft label="• ค่า SJR" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.score.sjr_score"
                  :class="isFieldEdited('sjr_score') ? 'text-red-500' : ''" />
                <TextInputLabelLeft label="ปี" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.score.sjr_year"
                  :class="isFieldEdited('sjr_year') ? 'text-red-500' : ''" />
                <TextInputLabelLeft label="x H-Index" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.score.hindex_score"
                  :class="isFieldEdited('hindex_score') ? 'text-red-500' : ''" />
                <TextInputLabelLeft label="ปี" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.score.hindex_year"
                  :class="isFieldEdited('hindex_year') ? 'text-red-500' : ''" />
              </div>
              <span class="place-self-center">
                มีค่าคะแนน = {{ formData.score.score_result }} คะแนน
              </span>
            </div>

            <RadioInput label="ใช้ผลการจัดระดับ CIF (Conference Impact Factor)" name="Score" value="CIF"
              v-model="formData.score.score_type" :class="isFieldEdited('score_type') ? 'text-red-500' : ''" />
            <div v-if="formData.score.score_type == 'CIF'">
              <div class="flex flex-row w-full px-7 my-2">
                <TextInputLabelLeft label="• ค่า citation total" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.score.Citation"
                  :class="isFieldEdited('Citation') ? 'text-red-500' : ''" />
                <TextInputLabelLeft label="x H-Index" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.score.hindex_score"
                  :class="isFieldEdited('hindex_score') ? 'text-red-500' : ''" />
              </div>
              <span class="place-self-center">
                มีค่าคะแนน = {{ formData.score.score_result }} คะแนน
              </span>
            </div>
            <RadioInput label="ใช้ผลการจัดระดับ CORE Conference Ranking" name="Score" value="CORE"
              v-model="formData.score.score_type" :class="isFieldEdited('score_type') ? 'text-red-500' : ''" />
            <div v-if="formData.score.score_type == 'CORE'">
              <div class="flex flex-row w-full px-7 my-2">
                <TextInputLabelLeft label="• ค่า" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.score.core_rank"
                  :class="isFieldEdited('core_rank') ? 'text-red-500' : ''" />
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
        <RadioInput label="ผู้ประพันธ์อันดับแรก First Author" value="First Author" name="Author"
          v-model="formData.conference.presenter_type" :class="isFieldEdited('presenter_type') ? 'text-red-500' : ''" />
        <RadioInput label="ผู้ประพันธ์บรรณกิจ Corresponding Author" value="Corresponding Author" name="Author"
          v-model="formData.conference.presenter_type" :class="isFieldEdited('presenter_type') ? 'text-red-500' : ''" />
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
          <RadioInput label="ครั้งที่ 1" name="TimeLeave" value="1" v-model="formData.conference.time_of_leave"
            :class="isFieldEdited('time_of_leave') ? 'text-red-500' : ''" />
        </SectionWrapper>

        <SectionWrapper>
          <RadioInput label="ครั้งที่ 2" name="TimeLeave" value="2" v-model="formData.conference.time_of_leave" />
          <p class="py-1 px-7">
            ในกรณีลาครั้งที่ 2 (การประชุมฯ ณ ต่างประเทศ) มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล
          </p>
          <div v-if="formData.conference.time_of_leave == 2" class="flex flex-row px-7 mt-1">
            <RadioInput label="WoS-Q1" name="WoS" value="WoS-Q1" v-model="formData.conference.wos_2_leave"
              :class="isFieldEdited('wos_2_leave') ? 'text-red-500' : ''" />
            <RadioInput label="WoS-Q2" name="WoS" value="WoS-Q2" v-model="formData.conference.wos_2_leave"
              :class="isFieldEdited('wos_2_leave') ? 'text-red-500' : ''" />
          </div>
          <div v-if="formData.conference.time_of_leave == 2" class="px-7 py-2">
            <TextInputLabelLeft label="เรื่อง" customLabel="pr-2" v-model="formData.conference.name_2_leave"
              :class="isFieldEdited('name_2_leave') ? 'text-red-500' : ''" />
          </div>
        </SectionWrapper>

        <p class="font-bold text-base pt-3">
          4.2 กรณีที่จัดการประชุมฯ ณ ต่างประเทศ
        </p>
        <SectionWrapper>
          <p>ขอเบิกค่าลงทะเบียนตามที่จ่ายจริง และค่าใช้จ่ายอื่น ๆ</p>
          <RadioInput label="ไม่เกิน 50%" name="withdraw" value="50%" v-model="formData.conference.withdraw"
            :class="isFieldEdited('withdraw') ? 'text-red-500' : ''" />
          <RadioInput label="ไม่เกิน 100% มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล" name="withdraw" value="100%"
            v-model="formData.conference.withdraw" :class="isFieldEdited('withdraw') ? 'text-red-500' : ''" />
          <div v-if="formData.conference.withdraw == '100%'" class="flex flex-row px-7 mt-1">
            <RadioInput label="WoS-Q1" name="WoS" value="WoS-Q1" v-model="formData.conference.wd_100_quality"
              :class="isFieldEdited('wd_100_quality') ? 'text-red-500' : ''" />
            <RadioInput label="WoS-Q2" name="WoS" value="WoS-Q2" v-model="formData.conference.wd_100_quality"
              :class="isFieldEdited('wd_100_quality') ? 'text-red-500' : ''" />
            <RadioInput label="WoS-Q3" name="WoS" value="WoS-Q3" v-model="formData.conference.wd_100_quality"
              :class="isFieldEdited('wd_100_quality') ? 'text-red-500' : ''" />
            <RadioInput label="SJR-Q1" name="WoS" value="SJR-Q1" v-model="formData.conference.wd_100_quality"
              :class="isFieldEdited('wd_100_quality') ? 'text-red-500' : ''" />
            <RadioInput label="SJR-Q2" name="WoS" value="SJR-Q2" v-model="formData.conference.wd_100_quality"
              :class="isFieldEdited('wd_100_quality') ? 'text-red-500' : ''" />
          </div>
          <div class="px-7 py-2">
            <TextInputLabelLeft label="เรื่อง" customLabel="pr-2" v-model="formData.conference.wd_name_100"
              :class="isFieldEdited('wd_100_quality') ? 'text-red-500' : ''" />
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
              <TextInputLabelLeft label="1. ค่าลงทะเบียน (ตามที่จ่ายจริง) จำนวน" customLabel="w-auto pr-2"
                customDiv="max-w-max" customInput="max-w-max" v-model="formData.conference.num_register_articles"
                :class="isFieldEdited('num_register_articles') ? 'text-red-500' : ''" />
              <TextInputLabelLeft label="บทความ ๆ ละ" customLabel="w-auto px-2" customDiv="max-w-max"
                customInput="max-w-max" v-model="formData.conference.regist_amount_1_article"
                :class="isFieldEdited('regist_amount_1_article') ? 'text-red-500' : ''" />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <p class="flex items-center">
              รวม {{ parseFloat(totalAmount).toLocaleString("en-US", { minimumFractionDigits: 2 }) }} บาท
            </p>
          </div>

          <p>2. ค่าพาหนะเดินทาง</p>
          <div class="flex flex-col px-5">
            <div class="flex flex-row mb-2">
              <TextInputLabelLeft label="• เดินทางในประเทศ" customLabel="w-64 pr-2" customDiv="max-w-[50rem]"
                customInput="max-w-[50rem]" v-model="formData.conference.domestic_expenses"
                :class="isFieldEdited('domestic_expenses') ? 'text-red-500' : ''" />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <div class="flex flex-row mb-2">
              <TextInputLabelLeft label="• เดินทางในต่างประเทศ" customLabel="w-64 pr-2" customDiv="max-w-[50rem]"
                customInput="max-w-[50rem]" v-model="formData.conference.overseas_expenses"
                :class="isFieldEdited('overseas_expenses') ? 'text-red-500' : ''" />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <div class="flex flex-row">
              <TextInputLabelLeft label="• เดินทางระหว่างประเทศ กรุงเทพฯ -" customLabel="w-96 pr-2"
                customDiv="max-w-[30rem]" customInput="max-w-[14rem]" v-model="formData.conference.travel_country"
                :class="isFieldEdited('travel_country') ? 'text-red-500' : ''" />
              <TextInputLabelLeft label="- กรุงเทพฯ" customLabel="w-22 px-2" customDiv="max-w-[20rem]"
                customInput="max-w-[14rem]" v-model="formData.conference.inter_expenses"
                :class="isFieldEdited('inter_expenses') ? 'text-red-500' : ''" />
              <p class="flex items-center pl-2">บาท</p>
            </div>
          </div>

          <div class="flex flex-row">
            <TextInputLabelLeft label="3. ค่าภาษีสนามบิน (ถ้ามี)" customLabel="w-auto pr-2" customDiv="max-w-[52rem]"
              customInput="max-w-[40rem]" v-model="formData.conference.airplane_tax"
              :class="isFieldEdited('airplane_tax') ? 'text-red-500' : ''" />
            <p class="flex items-center pl-2">บาท</p>
          </div>

          <div class="flex flex-row mb-2 justify-between">
            <div class="flex flex-row w-5/6">
              <TextInputLabelLeft label="4. ค่าเช่าที่พัก" customLabel="w-auto pr-2" customDiv="max-w-[26rem]"
                customInput="max-w-[19rem]" v-model="formData.conference.num_days_room"
                :class="isFieldEdited('num_days_room') ? 'text-red-500' : ''" />
              <TextInputLabelLeft label="คืน ๆ ละ" customLabel="w-auto pr-2" customDiv="max-w-[26rem]"
                customInput="max-w-[20rem]" v-model="formData.conference.room_cost_per_night"
                :class="isFieldEdited('room_cost_per_night') ? 'text-red-500' : ''" />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <p class="flex items-center">
              รวม {{ totalRoom == null ? 0 : parseFloat(totalRoom).toLocaleString("en-US", { minimumFractionDigits: 2 })
              }} บาท
            </p>
          </div>

          <div class="flex flex-row mb-2 justify-between">
            <div class="flex flex-row w-5/6">
              <TextInputLabelLeft label="5. ค่าเบี้ยเลี้ยงเดินทาง" customLabel="w-auto pr-2" customDiv="max-w-[26rem]"
                customInput="max-w-[16rem]" v-model="formData.conference.num_travel_days"
                :class="isFieldEdited('num_travel_days') ? 'text-red-500' : ''" />
              <TextInputLabelLeft label="วัน ๆ ละ" customLabel="w-auto pr-2" customDiv="max-w-[26rem]"
                customInput="max-w-[20rem]" v-model="formData.conference.daily_allowance"
                :class="isFieldEdited('daily_allowance') ? 'text-red-500' : ''" />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <p class="flex items-center">
              รวม {{ totalAllowance == null ? 0 : parseFloat(totalAllowance).toLocaleString("en-US", {
              minimumFractionDigits: 2 }) }} บาท
            </p>
          </div>
          <p class="font-bold text-2xl pt-5 text-right">
            รวมทั้งสิ้น {{ parseFloat(allTotal).toLocaleString("en-US", { minimumFractionDigits: 2 }) }} บาท
          </p>
        </SectionWrapper>
      </SectionWrapper>
    </Mainbox>
    <!-- เอกสารหลักฐานที่แนบ -->
    <Mainbox class="collapse collapse-arrow collapse-open">
      <input type="checkbox" />
      <p class="collapse-title text-lg font-bold">เอกสารหลักฐานที่แนบ</p>
      <SectionWrapper class="collapse-content">
        <!-- 1 -->
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>สำเนาบทความ (Full Paper)</p>
            </div>
            <div class="">
              <button @click="getFile(formData.file.file_full_page)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'full_page')" class="hidden" ref="full_page" />
              <button @click="$refs.full_page.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
        <!-- 2 -->
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <span class="w-[15rem] flex items-center text-blue-500 mr-2">
                *กรณีเบิกค่าใช้จ่ายเต็มวงเงิน*
              </span>
              <TextInputLabelLeft customInput="max-w-24"
                label="(Full Paper ประกอบการเบิก) มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล WoS/SJR ซึ่งได้รับการตีพิมพ์ไม่เกิน 2 ปี ก่อนการประชุม เมื่อ"
                :disabled="true" :placeholder="formData.date_journals" />
            </div>
            <div class="">
              <button @click="getFile(formData.file.file_published_journals)" class="btn bg-[#E85F19] text-white mr-5"
                disabled="!isValidFile(formData.file.file_published_journals)">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'published_journals')" class="hidden"
                ref="published_journals" />
              <button @click="$refs.published_journals.click()" class="btn bg-blue-500 text-white"
                disabled="!isValidFile(formData.file.file_published_journals)">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
        <!-- 3 -->
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <span class="text-blue-500 mr-2">
                "*กรณีเบิกค่าใช้จ่ายเต็มวงเงิน*
              </span>
              <p>หลักฐานเอกสาร Quartile ของ Paper ที่ใช้ประกอบการเบิก</p>
            </div>
            <div class="">
              <button @click="getFile(formData.file.file_q_proof)" class="btn bg-[#E85F19] text-white mr-5"
                disabled="!isValidFile(formData.file.file_q_proof)">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'q_proof')" class="hidden" ref="q_proof" />
              <button @click="$refs.q_proof.click()" class="btn bg-blue-500 text-white"
                disabled="!isValidFile(formData.file.file_q_proof)">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
        <!-- 4 -->
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>
                เอกสารประชาสัมพันธ์การจัดการประชุมทางวิชาการ (Call for paper)
              </p>
            </div>
            <div class="">
              <button @click="getFile(formData.file.file_call_for_paper)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'call_for_paper')" class="hidden" ref="call_for_paper" />
              <button @click="$refs.call_for_paper.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
        <!-- 5 -->
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>จดหมายการตอบรับเข้าร่วมประชุม (Accepted)</p>
            </div>
            <div class="">
              <button @click="getFile(formData.file.file_accepted)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'accepted')" class="hidden" ref="accepted" />
              <button @click="$refs.accepted.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
        <!-- 6 -->
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>เอกสารแสดงค่าลงทะเบียน</p>
            </div>
            <div class="">
              <button @click="getFile(formData.file.file_fee_receipt)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'fee_receipt')" class="hidden" ref="fee_receipt" />
              <button @click="$refs.fee_receipt.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
        <!-- 7 -->
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>เอกสารแสดงอัตราแลกเปลี่ยน (ณ วันที่ยื่น)</p>
            </div>
            <div class="">
              <button @click="getFile(formData.file.file_fx_rate_document)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'fx_rate_document')" class="hidden"
                ref="fx_rate_document" />
              <button @click="$refs.fx_rate_document.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
        <!-- 8 -->
        <div class="flex flex-row items-center w-full">
          <div class="flex flex-row items-center w-full justify-between">
            <div class="flex flex-row">
              <p>หลักฐานการประชุมวิชาการอยู่ในฐาน Scopus</p>
            </div>
            <div class="">
              <button @click="getFile(formData.file.file_conf_proof)" class="btn bg-[#E85F19] text-white mr-5">
                ดูเอกสาร
              </button>

              <input type="file" @change="onFileChange($event, 'conf_proof')" class="hidden" ref="conf_proof" />
              <button @click="$refs.conf_proof.click()" class="btn bg-blue-500 text-white">
                แก้ไขไฟล์
              </button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Mainbox>
    <div class="flex justify-end gap-4 mb-70">
      <button @click="handleSubmit" class="btn btn-success text-white">
        ยืนยัน
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRaw, computed } from "vue";
import { useUserStore } from "@/store/userStore";
import { useRouter, useRoute } from "vue-router";
import api from "@/setting/api";

import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";

const formData = reactive({
  conference: {},
  originCofer: {},
  userForm: [],
  score: {},
  originScore: {},
  editForm: [],
  status: "",
  //url
  file: {},
  originFile: {},
});

const totalAmount = computed(() => {
  formData.conference.total_amount =
    formData.conference.num_register_articles *
    formData.conference.regist_amount_1_article;
  return formData.conference.total_amount;
});
const totalRoom = computed(() => {
  formData.conference.total_room =
    formData.conference.num_days_room * formData.conference.room_cost_per_night;
  return formData.conference.total_room;
});
const totalAllowance = computed(() => {
  formData.conference.total_allowance =
    formData.conference.num_travel_days * formData.conference.daily_allowance;
  return formData.conference.total_allowance;
});

const allTotal = computed(() => {
  formData.conference.all_money =
    (parseFloat(formData.conference.total_amount) || 0) +
    (parseFloat(formData.conference.domestic_expenses) || 0) +
    (parseFloat(formData.conference.overseas_expenses) || 0) +
    (parseFloat(formData.conference.inter_expenses) || 0) +
    (parseFloat(formData.conference.airplane_tax) || 0) +
    (parseFloat(formData.conference.total_room) || 0) +
    (parseFloat(formData.conference.total_allowance) || 0);

  return formData.conference.all_money;
});

const userStore = useUserStore();
const user = computed(() => userStore.user);

const isLoading = ref(true);
// Access route parameters
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const onFileChange = (event, field) => {
  const file = event.target.files[0];
  if (file) {
    formData.file[field] = file;
  }
  console.log("edit formData[field]", field)
  console.log("edit file", file)
  console.log(formData)
}

const getChangedFields = () => {
  const current = toRaw(formData.conference);
  const originalConference = formData.originCofer;
  const changedFields = [];
  console.log("current", current);
  console.log("originalConference", originalConference);
  for (const key in current) {
    if (
      JSON.stringify(current[key]) !== JSON.stringify(originalConference[key])
    ) {
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
  const current = toRaw(formData.score);
  const originalScore = formData.originScore;
  const changedFields = [];
  console.log("current", current);
  console.log("originalConference", originalScore);
  for (const key in current) {
    if (JSON.stringify(current[key]) !== JSON.stringify(originalScore[key])) {
      changedFields.push({
        field: key,
        oldValue: originalScore[key],
        newValue: current[key],
      });
    }
  }
  return changedFields;
};

const getChangedFieldsFile = () => {
  const current = toRaw(formData.file);
  const originalFile = formData.originFile;
  const changedFields = [];
  console.log("current file", current);
  console.log("ori file", originalFile);
  for (const key in current) {
    if (JSON.stringify(current[key]) !== JSON.stringify(originalFile[key])) {
      changedFields.push({
        field: key,
        oldValue: originalFile[key],
        newValue: current[key],
      });
    }
  }
  return changedFields;
};

const handleSubmit = async () => {
  const changed = getChangedFields();
  const changedScore = getChangedFieldsScore();
  const changedFile = getChangedFieldsFile();

  if (changed.length === 0 && changedScore.length === 0 && changedFile.length === 0) {
    alert("ไม่มีการเปลี่ยนแปลงข้อมูล");
    return;
  }

  console.log("ฟิลด์ที่ถูกแก้ไข:", changed);
  console.log("ฟิลด์ที่ถูกแก้ไข changedScore:", changedScore);
  console.log("ฟิลด์ที่ถูกแก้ไข changedFile:", changedFile);

  const formData = new FormData();
  formData.append("conf_id", id);
  formData.append("edit_data", JSON.stringify(changed));
  formData.append("score", JSON.stringify(changedScore));
  formData.append("editor", userStore.user.user_nameth);
  formData.append("professor_reedit", true);

  // แนบไฟล์จริง
  changedFile.forEach((item) => {
    if (item.newValue instanceof File) {
      formData.append(item.field, item.newValue);
    }
  });

  try {
    console.log("dataForBackend: ", formData);
    await api.put(`/editedFormConfer/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
    router.push("/myHistory");
  } catch (error) {
    console.error("Error saving:", error);
    alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
  }
};

const getFile = async (fileUrl) => {
  formData.file = fileUrl;
  window.open(formData.file, "_blank");
};

const fetchOfficerData = async () => {
  try {
    const responseConfer = await api.get(`/conference/${id}`);
    formData.conference = responseConfer.data;
    formData.originCofer = JSON.parse(JSON.stringify(responseConfer.data));

    const userID = responseConfer.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    formData.userForm = responseUser.data;
    console.log("formData.user", formData.user);

    const responseScore = await api.get(`/score/${id}`);
    formData.score = responseScore.data;
    formData.originScore = JSON.parse(JSON.stringify(responseScore.data));

    const resEdit = await api.get(`/form/${userID}`);
    console.log("data", resEdit.data);
    for (let i = 0; i < resEdit.data.length; i++) {
      console.log("have edit ja", i);
      if (
        resEdit.data[i].form_type == "Conference" &&
        resEdit.data[i].conf_id == id
      ) {
        console.log("have edit ja", resEdit.data[i]);
        console.log("have edit ja", resEdit.data[i].form_status);
        formData.status = resEdit.data[i].form_status;
        formData.editForm.push(resEdit.data[i].edit_data);
      }
    }
    console.log("wow za", formData.editForm);

    const responsefile = await api.get(`/getFileConf?conf_id=${id}`);
    formData.file = responsefile.data;
    formData.originFile = JSON.parse(JSON.stringify(responsefile.data));

    formData.date_journals = responsefile.data.date_published_journals,
    formData.f_full_page = responsefile.data.file_full_page;
    formData.f_published_journals = responsefile.data.file_published_journals;
    formData.f_q_proof = responsefile.data.file_q_proof;
    formData.f_call_for_paper = responsefile.data.file_call_for_paper;
    formData.f_accepted = responsefile.data.file_accepted;
    formData.f_fee_receipt = responsefile.data.file_fee_receipt;
    formData.f_fx_rate_document = responsefile.data.file_fx_rate_document;
    formData.f_conf_proof = responsefile.data.file_conf_proof;
  } catch (error) {
    console.log("Error fetching Officer data:", error);
  } finally {
    isLoading.value = false;
  }
};
const isFieldEdited = (field) => {
  const editDataArray = toRaw(formData.editForm[0] || []);
  const allEdit = [
    ...(editDataArray.edit_data || []),
    ...(editDataArray.score || []),
  ];
  return allEdit.some((item) => item.field === field);
};

onMounted(() => {
  fetchOfficerData();
});
</script>