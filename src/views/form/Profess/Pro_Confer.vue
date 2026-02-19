<template>
  <div>
    <div class="container my-10 mx-auto">
      <p class="text-xl font-bold mb-5">
        ขออนุมัติเดินทางไปเผยแพร่ผลงานในการประชุมทางวิชาการ
      </p>
      <Mainbox>
        <SectionWrapper>
          <TextInputLabelLeft label="ชื่อ" customLabel="w-2/12 text-lg font-bold" :disabled="true"
            :placeholder="formData.name" />
          <TextInputLabelLeft label="ตำแหน่ง" customLabel="w-2/12 text-lg font-bold" :placeholder="formData.position"
            :disabled="true" />

          <div class="flex flex-row">
            <TextInputLabelLeft label="มีรายชื่ออยู่ใน List ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่"
              customLabel="w-auto" customInput="max-w-max" customDiv="max-w-max" v-model="formData.textOther1"
              :required="true" />
            <TextInputLabelLeft label="วันที่" customLabel="ml-2 w-10" customInput="max-w-max" type="date"
              v-model="formData.textOther2" :required="true" />
          </div>
          <span v-if="v$.textOther1.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.textOther1.$errors[0].$message }}
          </span>
          <span v-if="v$.textOther2.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.textOther2.$errors[0].$message }}
          </span>

          <p class="text-blue-500 text-sm">
            สามารถตรวจสอบรายชื่อ List ของคณะได้ที่เว็บไซต์คณะที่ Share
            online-การวิจัย และ
            <a href="https://erp.it.kmitl.ac.th/journal_conf_list">https://erp.it.kmitl.ac.th/journal_conf_list</a>
          </p>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          1. รายละเอียดการขออนุมัติเดินทาง
        </p>
        <SectionWrapper class="collapse-content">
          <div class="flex flex-row">
            <TextInputLabelLeft label="เดินทางวันที่" customLabel="w-auto mr-2" customDiv="max-w-max"
              customInput="max-w-max" type="date" v-model="formData.travelStart" :required="true" />
            <TextInputLabelLeft label="ถึงวันที่" customLabel="w-auto mr-2" customDiv="max-w-max ml-[10%]"
              customInput="max-w-max" type="date" v-model="formData.travelEnd" :required="true" />
          </div>
          <span v-if="v$.travelStart.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.travelStart.$errors[0].$message }}
          </span>
          <span v-if="v$.travelEnd.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.travelEnd.$errors[0].$message }}
          </span>

          <TextInputLabelLeft label="ชื่อผลงานวิจัยที่นำเสนอ" customLabel="w-1/6" v-model="formData.research"
            :required="true" />
          <span v-if="v$.research.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.research.$errors[0].$message }}
          </span>

          <TextInputLabelLeft label="จำนวนนักวิจัยร่วม" customLabel="w-[10%]" v-model="formData.numcoResearchers" />

          <div v-for="(index) in parseInt(formData.numcoResearchers) || 0" :key="index">
            <div class="flex flex-row gap-4">
              <p class="pt-2">{{ index }}.</p>
              <TextInputLabelLeft label="ชื่อ-นามสกุลของนักวิจัยร่วม" customLabel="w-[100%]" customDiv="max-w-[30%]"
                v-model="formData.namecoResearchers[index]" />
              <TextInputLabelLeft label="หลักสูตรของนักวิจัยร่วม" customLabel="w-[100%]" customDiv="max-w-[25%]"
                v-model="formData.coursecoResearchers[index]" />
            </div>
          </div>

          <TextInputLabelLeft label="ชื่อการประชุมทางวิชาการ" customLabel="w-1/6" v-model="formData.conferenceName"
            :required="true" />

          <span v-if="v$.conferenceName.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.conferenceName.$errors[0].$message }}
          </span>

          <div class="flex flex-row w-full">
            <p class="w-1/4">การประชุมวิชาการจัดในประเทศ หรือต่างประเทศ <span class="text-red-500">*</span></p>
            <RadioInput label="ภายในประเทศ" name="Venue" value="domestic" customDiv="w-max mr-4"
              v-model="formData.venue" />
            <RadioInput customDiv="max-w-36" label="ณ ต่างประเทศ" name="Venue" value="abroad"
              v-model="formData.venue" />
          </div>
          <span v-if="v$.venue.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.venue.$errors[0].$message }}
          </span>

          <div class="flex flex-row">
            <TextInputLabelLeft label="วันที่จัด" customLabel="w-auto mr-9" customDiv="max-w-max mr-10"
              customInput="max-w-max" type="date" v-model="formData.meetingDate" :required="true" />
            <TextInputLabelLeft label="สถานที่จัด" customLabel="w-24" customInput="w-full"
              v-model="formData.meetingVenue" :required="true" />

            <div class="ml-10 w-full flex justify-center items-center" v-if="formData.venue == 'abroad'">
              <div class="flex flex-row w-full">
                <span class="flex mr-2 items-center"> ประเทศ <span class="text-red-500">*</span></span>
                <v-select class="w-full" :options="countries" v-model="formData.location"></v-select>
              </div>
            </div>
            <div class="ml-5 w-full flex justify-center items-center" v-if="formData.venue == 'domestic'">
              <div class="flex flex-row w-full">
                <span class="flex mr-2 items-center"> จังหวัด <span class="text-red-500">*</span></span>
                <v-select class="w-full" :options="provinces" v-model="formData.location"></v-select>
              </div>
            </div>
          </div>

          <span v-if="v$.meetingDate.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.meetingDate.$errors[0].$message }}
          </span>
          <span v-if="v$.meetingVenue.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.meetingVenue.$errors[0].$message }}
          </span>
          <span v-if="v$.location.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.location.$errors[0].$message }}
          </span>

          <div class="flex flex-row justify-between">
            <TextInputLabelLeft label="วันที่ส่งบทความไปยังผู้จัด" type="date" customDiv="max-w-max"
              customInput="max-w-max" v-model="formData.dateSubmitToOrganizer" :required="true" />
            <TextInputLabelLeft label="วันประกาศผลการพิจารณาบทความ" type="date" customDiv="max-w-max"
              customInput="max-w-max" v-model="formData.argumentDateReview" :required="true" />
            <TextInputLabelLeft label="วันสุดท้ายของการลงทะเบียน" type="date" customDiv="max-w-max"
              customInput="max-w-max" v-model="formData.lastDayRegister" :required="true" />
          </div>
          <span v-if="v$.dateSubmitToOrganizer.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.dateSubmitToOrganizer.$errors[0].$message }}
          </span>
          <span v-if="v$.argumentDateReview.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.argumentDateReview.$errors[0].$message }}
          </span>
          <span v-if="v$.lastDayRegister.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.lastDayRegister.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          2.  รายละเอียดการขออนุมัติเดินทาง
          <span class="text-red-500">*</span>
        </p>
        <SectionWrapper class="collapse-content">
          <RadioInput label="การประชุมทางวิชาการที่คณะจัดหรือร่วมจัดในประเทศ และไม่อยู่ในฐานข้อมูลสากล SCOPUS"
            name="Scopus" value="facultyHost" v-model="formData.meetingType" />
          <RadioInput label="การประชุมทางวิชาการที่อยู่ในฐานข้อมูลสากล SCOPUS โดยมีการกำหนดคุณภาพแบ่งเป็น 2 ระดับ "
            name="Scopus" value="inScopus" v-model="formData.meetingType" />
          <span v-if="v$.meetingType.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.meetingType.$errors[0].$message }}
          </span>

          <SectionWrapper>
            <RadioInput label="ระดับมาตรฐาน" name="Level" value="standard" v-model="formData.qualityMeeting" :disabled="!formData.meetingType || formData.meetingType !== 'inScopus'
              " />
            <RadioInput label="ระดับดีมาก" name="Level" value="good" v-model="formData.qualityMeeting" :disabled="!formData.meetingType || formData.meetingType !== 'inScopus'
              " />
            <span v-if="v$.qualityMeeting.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.qualityMeeting.$errors[0].$message }}
            </span>

            <SectionWrapper>
              <RadioInput
                label="ใช้คะแนนที่คำนวณจาก SJR indicator และ H Index ที่ได้มาจาก SCImago Journal & Country Rank"
                name="Score" value="SJR" v-model="formData.score" :disabled="!formData.qualityMeeting ||
                  formData.qualityMeeting !== 'good'
                  " />
              <div class="flex flex-row w-full px-7 my-2">
                <TextInputLabelLeft label="• ค่า SJR" customLabel="w-16 mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.sjr"
                  :disabled="!formData.score || formData.score !== 'SJR'" />
                <TextInputLabelLeft label="ปี" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.sjrYear"
                  :disabled="!formData.score || formData.score !== 'SJR'" />
                <TextInputLabelLeft label="x H-Index" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.sjrhIndex"
                  :disabled="!formData.score || formData.score !== 'SJR'" />
                <TextInputLabelLeft label="ปี" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.hIndexYear"
                  :disabled="!formData.score || formData.score !== 'SJR'" />
                <p v-if="formData.score == 'SJR'" class="place-self-center">
                  <span>มีค่าคะแนน {{ totalScore.total }} คะแนน และมี </span>
                  <span :class="{
                    'text-green-500': totalScore.result === 'good',
                    'text-red-500': totalScore.result !== 'good',
                  }">
                    {{ totalScore.result }}
                  </span>
                </p>
              </div>
              <span v-if="v$.sjr.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.sjr.$errors[0].$message }}
              </span>
              <span v-if="v$.sjrYear.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.sjrYear.$errors[0].$message }}
              </span>
              <span v-if="v$.sjrhIndex.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.sjrhIndex.$errors[0].$message }}
              </span>
              <span v-if="v$.hIndexYear.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.hIndexYear.$errors[0].$message }}
              </span>
              <span v-if="v$.result.$error && formData.score == 'SJR'"
                class="text-base font-bold text-red-500 text-left">
                {{ v$.result.$errors[0].$message }}
              </span>

              <RadioInput label="ใช้ผลการจัดระดับ CIF (Conference Impact Factor)" name="Score" value="CIF"
                v-model="formData.score" :disabled="!formData.qualityMeeting ||
                  formData.qualityMeeting !== 'good'
                  " />
              <div class="flex flex-row w-full px-7 my-2">
                <TextInputLabelLeft label="• ค่า citation total" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.Citation"
                  :disabled="!formData.score || formData.score !== 'CIF'" />
                <TextInputLabelLeft label="x H-Index" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.hIndex"
                  :disabled="!formData.score || formData.score !== 'CIF'" />
                <p v-if="formData.score == 'CIF'" class="place-self-center">
                  <span>มีค่าคะแนน {{ totalScore.total }} คะแนน และมี </span>
                  <span :class="{
                    'text-green-500': totalScore.result === 'good',
                    'text-red-500': totalScore.result !== 'good',
                  }">
                    {{ totalScore.result }}
                  </span>
                </p>
              </div>
              <span v-if="v$.Citation.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.Citation.$errors[0].$message }}
              </span>
              <span v-if="v$.hIndex.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.hIndex.$errors[0].$message }}
              </span>
              <span v-if="v$.result.$error && formData.score == 'CIF'"
                class="text-base font-bold text-red-500 text-left">
                {{ v$.result.$errors[0].$message }}
              </span>

              <RadioInput label="ใช้ผลการจัดระดับ CORE Conference Ranking" name="Score" value="CORE"
                v-model="formData.score" :disabled="!formData.qualityMeeting ||
                  formData.qualityMeeting !== 'good'
                  " />
              <div class="flex flex-row w-full px-7 my-2">
                <TextInputLabelLeft label="• ค่า" customLabel="w-auto mr-1" customDiv="max-w-max"
                  customInput="max-w-max mr-3" v-model="formData.coreConf"
                  :disabled="!formData.score || formData.score !== 'CORE'" />
                <span class="place-self-center">(ตั้งแต่ A ขึ้นไป)</span>
              </div>
              <p class="px-7 text-sm text-red-500">
                เช็คคะแนนได้จาก http://portal.core.edu.au/conf-ranks
              </p>

              <span v-if="v$.coreConf.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.coreConf.$errors[0].$message }}
              </span>
              <span v-if="v$.score.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.score.$errors[0].$message }}
              </span>
            </SectionWrapper>
          </SectionWrapper>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">3. ผู้ขอรับการสนับสนุน <span class="text-red-500">*</span></p>
        <SectionWrapper class="collapse-content">
          <RadioInput label="ผู้ประพันธ์อันดับแรก First Author" value="First Author" name="Author"
            v-model="formData.radioAuth" />
          <RadioInput label="ผู้ประพันธ์บรรณกิจ Corresponding Author" value="Corresponding Author" name="Author"
            v-model="formData.radioAuth" />
          <span v-if="v$.radioAuth.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.radioAuth.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">
          4.  การลาและการขอเบิกค่าลงทะเบียนและค่าใช้จ่ายอื่น ๆ
          <span class="text-red-500">*</span>
        </p>
        <SectionWrapper class="collapse-content">
          <p class="font-bold text-base pt-3">4.1 ครั้งที่ในการลา</p>
          <SectionWrapper>
            <RadioInput label="ครั้งที่ 1" name="timeLeave" value="1" v-model="formData.timeLeave" />
            <RadioInput label="ครั้งที่ 2" name="timeLeave" value="2" v-model="formData.timeLeave" />
            <span v-if="v$.timeLeave.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.timeLeave.$errors[0].$message }}
            </span>

            <p class="py-1 px-7">
              ในกรณีลาครั้งที่ 2 (การประชุมฯ ณ ต่างประเทศ)
              มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล
            </p>
            <div class="flex flex-row px-7 mt-1">
              <RadioInput label="WoS-Q1" name="wos" value="WoS-Q1" v-model="formData.wos" :disabled="!(
                  formData.timeLeave === '2' &&
                  formData.venue === 'abroad'
                )
                " />
              <RadioInput label="WoS-Q2" name="wos" value="WoS-Q2" v-model="formData.wos" :disabled="!(
                  formData.timeLeave === '2' &&
                  formData.venue === 'abroad'
                )
                " />
            </div>
            <span v-if="v$.wos.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.wos.$errors[0].$message }}
            </span>

            <div class="px-7 py-2">
              <TextInputLabelLeft label="เรื่อง" customLabel="pr-2" v-model="formData.nameWos" :disabled="!(
                  formData.timeLeave === '2' &&
                  formData.venue === 'abroad'
                )
                " />
              <span v-if="v$.nameWos.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.nameWos.$errors[0].$message }}
              </span>
            </div>
          </SectionWrapper>

          <p class="font-bold text-base pt-3">
            4.2 กรณีที่จัดการประชุมฯ ณ ต่างประเทศ
          </p>
          <SectionWrapper>
            <p>ขอเบิกค่าลงทะเบียนตามที่จ่ายจริง และค่าใช้จ่ายอื่น ๆ</p>
            <RadioInput label="ไม่เกิน 50%" name="withdraw" value="50%" v-model="formData.withdraw"
              :disabled="formData.venue !== 'abroad'" />
            <RadioInput label="ไม่เกิน 100% มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล" name="withdraw" value="100%"
              v-model="formData.withdraw" :disabled="formData.venue !== 'abroad'" />
            <span v-if="v$.withdraw.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.withdraw.$errors[0].$message }}
            </span>

            <div class="flex flex-row px-7 mt-1">
              <RadioInput label="WoS-Q1" name="quality100" value="WoS-Q1" v-model="formData.quality100"
                :disabled="formData.withdraw !== '100%'" />
              <RadioInput label="WoS-Q2" name="quality100" value="WoS-Q2" v-model="formData.quality100"
                :disabled="formData.withdraw !== '100%'" />
              <RadioInput label="WoS-Q3" name="quality100" value="WoS-Q3" v-model="formData.quality100"
                :disabled="formData.withdraw !== '100%'" />
              <RadioInput label="SJR-Q1" name="quality100" value="SJR-Q1" v-model="formData.quality100"
                :disabled="formData.withdraw !== '100%'" />
              <RadioInput label="SJR-Q2" name="quality100" value="SJR-Q2" v-model="formData.quality100"
                :disabled="formData.withdraw !== '100%'" />
            </div>
            <span v-if="v$.quality100.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.quality100.$errors[0].$message }}
            </span>
            <div class="px-7 py-2">
              <TextInputLabelLeft label="เรื่อง" customLabel="pr-2" v-model="formData.name100"
                :disabled="formData.withdraw !== '100%'" />
              <span v-if="v$.name100.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.name100.$errors[0].$message }}
              </span>
            </div>
          </SectionWrapper>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title leading-9 text-lg font-bold">
          รายการค่าใช้จ่ายที่ขอเบิกจ่าย
        </p>
        <SectionWrapper class="collapse-content">
          <SectionWrapper>
            <div class="flex flex-row mb-2 justify-between">
              <div class="flex flex-row">
                <p class="pt-2 pr-2">1. ค่าลงทะเบียน (ตามที่จ่ายจริง) <span class="text-red-500">*</span></p>
                <TextInputLabelLeft label="จำนวน" customLabel="w-auto pr-2" customDiv="max-w-max"
                  customInput="max-w-max" v-model="formData.numberArticles" />
                <TextInputLabelLeft label="บทความ ๆ ละ" customLabel="w-auto px-2" customDiv="max-w-max"
                  customInput="max-w-max" v-model="formData.amount1article" />
                <p class="flex items-center pl-2">บาท</p>
              </div>
              <p class="flex items-center">รวม {{ totalAmount }} บาท</p>
            </div>
            <span v-if="v$.numberArticles.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.numberArticles.$errors[0].$message }}
            </span>
            <span v-if="v$.amount1article.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.amount1article.$errors[0].$message }}
            </span>

            <p>2. ค่าพาหนะเดินทาง <span class="text-red-500">*</span></p>
            <div class="flex flex-col px-5">
              <div class="flex flex-row mb-2">
                <TextInputLabelLeft label="• เดินทางในประเทศ" customLabel="w-64 pr-2" customDiv="max-w-[50rem]"
                  customInput="max-w-[50rem]" v-model="formData.domesticExpenses" />
                <p class="flex items-center pl-2">บาท</p>
              </div>
              <span v-if="v$.domesticExpenses.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.domesticExpenses.$errors[0].$message }}
              </span>

              <div class="flex flex-row mb-2">
                <TextInputLabelLeft label="• เดินทางในต่างประเทศ" customLabel="w-64 pr-2" customDiv="max-w-[50rem]"
                  customInput="max-w-[50rem]" v-model="formData.overseasExpenses" />
                <p class="flex items-center pl-2">บาท</p>
              </div>
              <span v-if="v$.overseasExpenses.$error" class="text-base font-bold text-red-500 text-left">
                {{ v$.overseasExpenses.$errors[0].$message }}
              </span>
              <div class="flex flex-row">
                <TextInputLabelLeft label="• เดินทางระหว่างประเทศ กรุงเทพฯ -" customLabel="w-22 pr-2"
                  customDiv="max-w-[31rem]" customInput="max-w-[14rem]" :disabled="true"
                  :placeholder="computedPlaceholder" />
                <TextInputLabelLeft label="- กรุงเทพฯ" customLabel="w-22 pr-2" customDiv="max-w-[20rem]"
                  customInput="max-w-[14rem]" v-model="formData.interExpenses" />
                <p class="flex items-center pl-2">บาท</p>
              </div>
            </div>
            <span v-if="v$.interExpenses.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.interExpenses.$errors[0].$message }}
            </span>

            <div class="flex flex-row">
              <TextInputLabelLeft label="3. ค่าภาษีสนามบิน (ถ้ามี)" customLabel="w-auto pr-2" customDiv="max-w-[52rem]"
                customInput="max-w-[40rem]" v-model="formData.airplaneTax" />
              <p class="flex items-center pl-2">บาท</p>
            </div>
            <span v-if="v$.airplaneTax.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.airplaneTax.$errors[0].$message }}
            </span>

            <div class="flex flex-row mb-2 justify-between">
              <div class="flex flex-row w-5/6">
                <TextInputLabelLeft label="4. ค่าเช่าที่พัก" customLabel="w-auto pr-2" customDiv="max-w-[27rem]"
                  customInput="max-w-[19rem]" v-model="formData.numberDaysRoom" :required="true" />
                <TextInputLabelLeft label="คืน ๆ ละ" customLabel="w-auto pr-2" customDiv="max-w-[26rem]"
                  customInput="max-w-[20rem]" v-model="formData.roomCostPerNight" />
                <p class="flex items-center pl-2">บาท</p>
              </div>
              <p class="flex items-center">รวม {{ totalRoom }} บาท</p>
            </div>
            <span v-if="v$.numberDaysRoom.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.numberDaysRoom.$errors[0].$message }}
            </span>
            <span v-if="v$.roomCostPerNight.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.roomCostPerNight.$errors[0].$message }}
            </span>

            <div class="flex flex-row mb-2 justify-between">
              <div class="flex flex-row w-5/6">
                <TextInputLabelLeft label="5. ค่าเบี้ยเลี้ยงเดินทาง" customLabel="w-auto pr-2" customDiv="max-w-[27rem]"
                  customInput="max-w-[16rem]" v-model="formData.numTravelDays" :required="true" />
                <TextInputLabelLeft label="วัน ๆ ละ" customLabel="w-auto pr-2" customDiv="max-w-[26rem]"
                  customInput="max-w-[20rem]" v-model="formData.dailyAllowance" />
                <p class="flex items-center pl-2">บาท</p>
              </div>
              <p class="flex items-center">รวม {{ totalAllowance }} บาท</p>
            </div>
            <span v-if="v$.numTravelDays.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.numTravelDays.$errors[0].$message }}
            </span>
            <span v-if="v$.dailyAllowance.$error" class="text-base font-bold text-red-500 text-left">
              {{ v$.dailyAllowance.$errors[0].$message }}
            </span>
            <p class="font-bold text-2xl pt-5 text-right">
              รวมทั้งสิ้น {{ allTotal }} บาท
            </p>
          </SectionWrapper>
        </SectionWrapper>
      </Mainbox>

      <Mainbox class="collapse collapse-arrow collapse-open">
        <input type="checkbox" />
        <p class="collapse-title text-lg font-bold">เอกสารหลักฐานที่แนบ</p>
        <SectionWrapper class="collapse-content">
          <span class="text-gray-500">ขนาดไฟล์สูงสุด 10 MB </span>
          <FileInput label="สำเนาบทความ (Full Paper)" name="First" type="file" :required="true"
            @change="handleFile($event, 'file1')" />
          <span v-if="v$.file1.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file1.$errors[0].$message }}
          </span>

          <TextInputLabelLeft
            label="*กรณีเบิกค่าใช้จ่ายเต็มวงเงิน* (Full Paper ประกอบการเบิก) มีผลงานตีพิมพ์ในวารสารในฐานข้อมูล WoS/SJR ซึ่งได้รับการตีพิมพ์ไม่เกิน 2 ปี ก่อนการประชุม เมื่อ"
            customLabel="w-[290%]" customInput="w-1/6" v-model="formData.inputFile2"
            :disabled="formData.withdraw !== '100%'" />
          <FileInput name="Second" type="file" :disabled="formData.withdraw !== '100%'"
            @change="handleFile($event, 'file2')" />
          <span v-if="v$.inputFile2.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.inputFile2.$errors[0].$message }}
          </span>
          <span v-if="v$.file2.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file2.$errors[0].$message }}
          </span>

          <FileInput label="*กรณีเบิกค่าใช้จ่ายเต็มวงเงิน* หลักฐานเอกสาร Quartile ของ Paper ที่ใช้ประกอบการเบิก"
            name="Third" type="file" :disabled="formData.withdraw !== '100%'" @change="handleFile($event, 'file3')" />
          <span v-if="v$.file3.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file3.$errors[0].$message }}
          </span>

          <FileInput label="เอกสารประชาสัมพันธ์การจัดการประชุมทางวิชาการ (Call for paper)" name="Fourth" type="file"
            :required="true" @change="handleFile($event, 'file4')" />
          <span v-if="v$.file4.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file4.$errors[0].$message }}
          </span>

          <FileInput label="จดหมายการตอบรับเข้าร่วมประชุม (Accepted)" name="Fifth" type="file" :required="true"
            @change="handleFile($event, 'file5')" />
          <span v-if="v$.file5.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file5.$errors[0].$message }}
          </span>

          <FileInput label="เอกสารแสดงค่าลงทะเบียน" name="Sixth" type="file" :required="true"
            @change="handleFile($event, 'file6')" />
          <span v-if="v$.file6.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file6.$errors[0].$message }}
          </span>

          <FileInput label="เอกสารแสดงอัตราแลกเปลี่ยน (ณ วันที่ยื่น)" name="Seventh" type="file" :required="true"
            @change="handleFile($event, 'file7')" />
          <span v-if="v$.file7.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file7.$errors[0].$message }}
          </span>

          <FileInput label="หลักฐานการประชุมวิชาการอยู่ในฐาน Scopus" name="Eighth" type="file" :required="true"
            @change="handleFile($event, 'file8')" />
          <span v-if="v$.file8.$error" class="text-base font-bold text-red-500 text-left">
            {{ v$.file8.$errors[0].$message }}
          </span>
        </SectionWrapper>
      </Mainbox>

      <div class="flex justify-end">
        <button @click="saveDraft" class="bg-blue-500 text-white px-4 py-2 rounded mr-3">
          บันทึกแบบร่าง
        </button>
        <button 
          @click="newConfer" 
          :disabled="loading"
          class="btn btn-success text-white">
          {{ loading ? "กำลังบันทึก..." : "บันทึก" }}
        </button>
      </div>
    </div>
    <!-- Popup Loading -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl p-6 flex flex-col items-center gap-4 shadow-lg">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <p class="text-gray-700 font-medium">กำลังบันทึกข้อมูล...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  numeric,
  minValue,
  integer,
  helpers,
  requiredIf,
  maxValue,
  decimal,
  sameAs,
} from "@vuelidate/validators";
import { DateTime } from "luxon";

import { useUserStore } from "@/store/userStore";
import api from "@/setting/api";
import Mainbox from "@/components/form/Mainbox.vue";
import SectionWrapper from "@/components/form/SectionWrapper.vue";
import TextInputLabelLeft from "@/components/Input/TextInputLabelLeft.vue";
import RadioInput from "@/components/Input/RadioInput.vue";
import FileInput from "@/components/Input/FileInput.vue";
import location from "@/location.json";

const countries = location.countries;
const provinces = location.provinces;

const router = useRouter();

const userStore = useUserStore();
const user = computed(() => userStore.user);

const loading = ref(false)

// จัดการข้อมูลหลัก
const formData = reactive({
  user_id: null,
  name: "",
  position: "",
  textOther1: "",
  textOther2: "",
  travelStart: "",
  travelEnd: "",
  research: "",
  numcoResearchers: 0,
  namecoResearchers: [],
  coursecoResearchers: [],
  conferenceName: "",
  venue: "",
  meetingDate: "",
  meetingVenue: "",
  location: "",
  dateSubmitToOrganizer: "",
  argumentDateReview: "",
  lastDayRegister: "",
  meetingType: "",
  qualityMeeting: "",
  score: "",
  sjr: 0,
  sjrYear: 0,
  sjrhIndex: 0,
  hIndexYear: 0,
  total: 0,
  Citation: 0,
  hIndex: 0,
  coreConf: "",
  radioAuth: "",
  timeLeave: "",
  wos: "",
  nameWos: "",
  withdraw: "",
  quality100: "",
  name100: "",
  numberArticles: "",
  amount1article: "",
  totalAmount: "",
  domesticExpenses: "",
  overseasExpenses: "",
  travelCountry: "",
  interExpenses: "",
  airplaneTax: "",
  numberDaysRoom: "",
  roomCostPerNight: "",
  totalRoom: "",
  numTravelDays: "",
  dailyAllowance: "",
  totalAllowance: "",
  all_money: "",
  file1: "",
  file2: null,
  inputFile2: "",
  file3: null,
  file4: "",
  file5: "",
  file6: "",
  file7: "",
  file8: "",
  result: "ระดับstandard",
});

const totalScore = computed(() => {
  if (formData.score == "SJR") {
    if (formData.sjr !== null && formData.sjrhIndex !== null) {
      const total = formData.sjr * formData.sjrhIndex;
      let result = "ระดับstandard";
      if (total >= 4) {
        result = "good";
      }
      formData.result = result;
      return { total, result };
    }
    return null;
  } else if (formData.score == "CIF") {
    if (formData.Citation != null && formData.hIndex != null) {
      const total = 0.5 * (formData.Citation / 200 + formData.hIndex);
      let result = "ระดับมาตรฐาน";
      if (total >= 9.38) {
        result = "good";
      }
      formData.result = result;
      return { total, result };
    }
    return null;
  } else if (formData.score == "CORE") {
    if (formData.coreConf) {
      const total = 0;
      let result = "ระดับมาตรฐาน";
      if (
        formData.coreConf == "A" ||
        formData.coreConf == "A+" ||
        formData.coreConf == "A*"
      ) {
        result = "good";
      }
      formData.result = result;
      return { total, result };
    }
    return null;
  }
  return null;
});

//score
watch(totalScore, (newValue) => {
  formData.total = newValue;
});

// ตรวจสอบปีและวันที่นี้
const currentYear = computed(() => DateTime.now().year);
const currentDate = computed(() => DateTime.now().toISODate());

// ตรวจเงื่อนไข 2 อัน
const isRequiredForWos = () =>
  formData.timeLeave.includes("2") && formData.venue.includes("abroad");

// ตรวจว่าวันที่ไม่อยู่หลัง value <= x
const beforeDate = (value, date) => {
  return (
    DateTime.fromISO(value).toISODate() <= DateTime.fromISO(date).toISODate()
  );
};

//ตรวจว่าวันที่ไม่เกิดก่อน value >= x
const afterDate = (value, date) => {
  return (
    DateTime.fromISO(value).toISODate() >= DateTime.fromISO(date).toISODate()
  );
};

// ตรวจว่าวันที่ไม่อยู่หลัง value < x
const beforeDatenoteqal = (value, date) => {
  return (
    DateTime.fromISO(value).toISODate() < DateTime.fromISO(date).toISODate()
  );
};

//ตรวจว่าวันที่ไม่เกิดก่อน value > x
const afterDatenoteqal = (value, date) => {
  return (
    DateTime.fromISO(value).toISODate() > DateTime.fromISO(date).toISODate()
  );
};

const computedPlaceholder = computed(() => {
  return formData.venue === "abroad" ? formData.location : "";
});

const rules = computed(() => ({
  textOther1: {
    required: helpers.withMessage("* กรุณากรอกข้อมูลครั้งที่ *", required),
  },
  textOther2: {
    required: helpers.withMessage("* กรุณากรอกข้อมูลวันที่ *", required),
    beforeDate: helpers.withMessage("* วันที่ต้องไม่เกินวันนี้ *", (value) =>
      beforeDate(value, currentDate.value)
    ),
  },
  travelStart: {
    required: helpers.withMessage("* กรุณากรอกข้อมูลเดินทาง *", required),
    afterDatenoteqal: helpers.withMessage(
      "* วันเดินทางไม่สามารถเกิดก่อน หรือเป็นวันนี้ได้ *",
      (value) => afterDatenoteqal(value, currentDate.value)
    ),
  },
  travelEnd: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลวันเดินทางกลับ *",
      required
    ),
    afterDate: helpers.withMessage(
      "* วันเดินทางกลับไม่สามารถเกิดก่อนวันไปได้ *",
      (value) => afterDate(value, formData.travelStart)
    ),
  },
  research: {
    required: helpers.withMessage("* กรุณากรอกชื่อผลงานวิจัย *", required),
  },
  conferenceName: {
    required: helpers.withMessage(
      "* กรุณากรอกชื่องานประชุมวิชาการ *",
      required
    ),
  },
  venue: {
    required: helpers.withMessage(
      "* กรุณาเลือกว่าไปต่างประเทศ หรือในประเทศ *",
      required
    ),
  },
  meetingDate: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลวันที่จัดข้อมูลการประชุมวิชาการ *",
      required
    ),
    afterDate: helpers.withMessage(
      "* วันที่จัดการประชุมวิชาการไม่สามารถจัดก่อนวันที่จะเดินทางได้ *",
      (value) => afterDate(value, formData.travelStart)
    ),
    beforeDate: helpers.withMessage(
      "* วันที่จัดการประชุมวิชาการไม่สามารถจัดหลังจากที่เดินทางกลับได้ *",
      (value) => beforeDate(value, formData.travelEnd)
    ),
  },
  meetingVenue: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลสถานที่จัดงานประชุมวิชาการ *",
      required
    ),
  },
  location: {
    required: helpers.withMessage(
      "* กรุณากรอกประเทศ หรือจังหวัดที่ไปประชุมวิชาการ *",
      required
    ),
  },
  dateSubmitToOrganizer: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลวันที่ส่งข้อมูลงานวิชาการ *",
      required
    ),
    beforeDate: helpers.withMessage(
      "* ไม่สามารถส่งงานวิจัยหลังจากวันที่กรอกข้อมูลแบบฟอร์มนี้ *",
      (value) => beforeDate(value, currentDate.value)
    ),
  },
  argumentDateReview: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลวันที่ประกาศผลการคัดเลือก *",
      required
    ),
    afterDatenoteqal: helpers.withMessage(
      "* ไม่สามารถกรอกวันประกาศผลก่อน หรือวันสมัคร *",
      (value) => afterDatenoteqal(value, formData.dateSubmitToOrganizer)
    ),
    beforeDatenoteqal: helpers.withMessage(
      "* ไม่สามารถกรอกวันประกาศผลหลังจากวันที่เดินทางได้ *",
      (value) => beforeDatenoteqal(value, formData.travelStart)
    ),
  },
  lastDayRegister: {
    required: helpers.withMessage(
      "* กรุณากรอกข้อมูลวันที่วันสุดท้ายที่สามารถลงทะเบียนได้ *",
      required
    ),
    afterDatenoteqal: helpers.withMessage(
      "* วันสุดท้ายของการลงทะเบียนไม่สามารถเกิดก่อนวันที่ส่งงาน หรือประกาศผลได้ *",
      (value) =>
        afterDatenoteqal(
          value,
          DateTime.min(
            DateTime.fromISO(formData.dateSubmitToOrganizer),
            DateTime.fromISO(formData.argumentDateReview)
          )
        )
    ),
    beforeDatenoteqal: helpers.withMessage(
      "* วันสุดท้ายของการลงทะเบียนไม่สามารถเกิดหลังจากวันเดินทาง หรือวันที่จัดงานได้ *",
      (value) =>
        beforeDatenoteqal(
          value,
          DateTime.min(
            DateTime.fromISO(formData.travelStart),
            DateTime.fromISO(formData.meetingDate)
          )
        )
    ),
  },
  meetingType: {
    required: helpers.withMessage(
      "* กรุณาเลือกว่าการประชุมมีอยู่ใน Scopus หรือคณะเป็นผู้ร่วมจัด *",
      required
    ),
  },
  qualityMeeting: {
    required: helpers.withMessage(
      "* กรุณาเลือกระดับคุณภาพ *",
      requiredIf(() => formData.meetingDate.includes("inScopus"))
    ),
  },
  score: {
    required: helpers.withMessage(
      "* กรุณาเลือกสูตรที่ใช้ในการคำนวณ *",
      requiredIf(() => formData.qualityMeeting.includes("good"))
    ),
  },
  sjr: {
    required: helpers.withMessage(
      "* กรุณากรอกค่า SJR *",
      requiredIf(() => formData.score.includes("SJR"))
    ),
    decimal: helpers.withMessage(
      "* กรุณากรอกข้อมูลครั้งที่เป็นตัวเลข *",
      decimal
    ),
  },
  sjrYear: {
    required: helpers.withMessage(
      "* กรุณากรอกปีที่นำมาคำนวณ *",
      requiredIf(() => formData.score.includes("SJR"))
    ),
    numeric: helpers.withMessage(
      "* กรุณากรอกข้อมูลครั้งที่เป็นตัวเลข *",
      numeric
    ),
    integer: helpers.withMessage("* กรุณากรอกเป็นจำนวนเต็ม *", integer),
    sameAs: helpers.withMessage(
      "* กรุณากรอกปีให้ตรงกันกับปีของ H-index *",
      sameAs(formData.hIndexYear)
    ),
    maxValue: helpers.withMessage(
      "* ปีไม่สามารถเป็นปีที่มากกว่าปีนี้ *",
      maxValue(currentYear.value)
    ),
  },
  sjrhIndex: {
    required: helpers.withMessage(
      "* กรุณากรอก H-Index *",
      requiredIf(() => formData.score.includes("SJR"))
    ),
    numeric: helpers.withMessage(
      "* กรุณากรอกข้อมูลครั้งที่เป็นตัวเลข *",
      numeric
    ),
    decimal: helpers.withMessage(
      "* กรุณากรอกข้อมูลครั้งที่เป็นตัวเลข *",
      decimal
    ),
  },
  hIndexYear: {
    required: helpers.withMessage(
      "* กรุณกรอกปีของ H-Index *",
      requiredIf(() => formData.score.includes("SJR"))
    ),
    numeric: helpers.withMessage(
      "* กรุณากรอกข้อมูลครั้งที่เป็นตัวเลข *",
      numeric
    ),
    integer: helpers.withMessage("* กรุณากรอกเป็นจำนวนเต็ม *", integer),
    sameAs: helpers.withMessage(
      "* กรุณากรอกปีให้ตรงกันกับปีของค่า SJR *",
      sameAs(formData.sjrYear)
    ),
    maxValue: helpers.withMessage(
      "* ปีไม่สามารถเป็นปีที่มากกว่าปีนี้ *",
      maxValue(currentYear.value)
    ),
  },
  Citation: {
    required: helpers.withMessage(
      "* กรุณากรอกค่า SJR *",
      requiredIf(() => formData.score.includes("CIF"))
    ),
    decimal: helpers.withMessage(
      "* กรุณากรอกข้อมูลครั้งที่เป็นตัวเลข *",
      decimal
    ),
  },
  hIndex: {
    required: helpers.withMessage(
      "* กรุณากรอก H-Index *",
      requiredIf(() => formData.score.includes("CIF"))
    ),
    numeric: helpers.withMessage(
      "* กรุณากรอกข้อมูลครั้งที่เป็นตัวเลข *",
      numeric
    ),
    decimal: helpers.withMessage(
      "* กรุณากรอกข้อมูลครั้งที่เป็นตัวเลข *",
      decimal
    ),
  },
  coreConf: {
    required: helpers.withMessage(
      "* กรุณากรอกค่า CORE Conference Ranking *",
      requiredIf(() => formData.score.includes("CORE"))
    ),
    value: helpers.withMessage(
      "* กรุณากรอกค่าเป็น A หรือ A* เท่านั้น *",
      helpers.regex(/^A[\*\+]?$/)
    ),
  },
  radioAuth: {
    required: helpers.withMessage(
      "* กรุณาเลือกว่ารูปแบบผู้ประพันธ์ *",
      required
    ),
  },
  timeLeave: {
    required: helpers.withMessage("* กรุณาเลือกครั้งที่ที่ลา *", required),
    regex: helpers.withMessage(
      "* เลือกได้แค่ครั้งที่ 1 หรือ ครั้งที่ 2 *",
      helpers.regex(/^[12]$/)
    ),
  },
  wos: {
    required: helpers.withMessage(
      "* กรุณาเลือก WoS-Q1 หรือ WoS-Q2 *",
      requiredIf(isRequiredForWos)
    ),
  },
  nameWos: {
    required: helpers.withMessage(
      "* กรุณากรอกชื่อผลงานตีพิมพ์ *",
      requiredIf(isRequiredForWos)
    ),
  },
  withdraw: {
    required: helpers.withMessage(
      "* กรุณาเลือกจำนวนค่าใช้จ่ายที่เบิกได้ *",
      requiredIf(() => formData.timeLeave && formData.venue === "abroad")
    ),
  },
  quality100: {
    required: helpers.withMessage(
      "* กรุณาเลือก Quartile ของงานวิจัย *",
      requiredIf(() => formData.withdraw.includes("100%"))
    ),
  },
  name100: {
    required: helpers.withMessage(
      "* กรุณากรอกชื่อผลงานตีพิมพ์ *",
      requiredIf(() => formData.withdraw.includes("100%"))
    ),
  },
  numberArticles: {
    required: helpers.withMessage("* กรุณากรอกจำนวนบทความ *", required),
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    integer: helpers.withMessage("* กรุณาระบุเป็นจำนวนจริง *", integer),

  },
  amount1article: {
    required: helpers.withMessage(
      "* กรุณากรอกจำนวนค่าลงทะเบียน 1 บทความ *",
      required
    ),
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", decimal),

  },
  domesticExpenses: {
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", decimal),

    required: helpers.withMessage(
      "* กรุณากรอกค่าพาหนะเดินทาง *",
      requiredIf(() => formData.venue == "domestic")
    ),
  },
  overseasExpenses: {
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", decimal),

    required: helpers.withMessage(
      "* กรุณากรอกค่าพาหนะเดินทาง *",
      requiredIf(() => formData.venue == "abroad")
    ),
  },
  interExpenses: {
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", decimal),

  },
  airplaneTax: {
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", decimal),

  },
  numberDaysRoom: {
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    integer: helpers.withMessage("* กรุณาระบุเป็นจำนวนจริง *", integer),

  },
  roomCostPerNight: {
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", decimal),

  },

  numTravelDays: {
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    integer: helpers.withMessage("* กรุณาระบุเป็นจำนวนจริง *", integer),

  },
  dailyAllowance: {
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    decimal: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", decimal),

  },
  file1: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  file2: {
    required: helpers.withMessage(
      "* กรุณาอัปโหลดไฟล์ *",
      requiredIf(() => formData.withdraw.includes("100%"))
    ),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return true;
        return value.type === "application/pdf";
      }
    ),
  },
  inputFile2: {
    required: helpers.withMessage(
      "* กรุณาระบุปี *",
      requiredIf(() => formData.withdraw.includes("100%"))
    ),
    numeric: helpers.withMessage("* กรุณาระบุเป็นตัวเลข *", numeric),
    integer: helpers.withMessage("* กรุณาระบุเป็นจำนวนเต็ม *", integer),
    minValue: helpers.withMessage(
      "* ต้องอยู่ในช่วง 2 ปี *",
      minValue(currentYear.value - 2)
    ),
    maxValue: helpers.withMessage(
      "* ไม่สามารถยื่นเอกสารที่ปีมากกว่าปัจจุบันได้ห *",
      maxValue(currentYear.value)
    ),
  },
  file3: {
    required: helpers.withMessage(
      "* กรุณาอัปโหลดไฟล์ *",
      requiredIf(() => formData.withdraw.includes("100%"))
    ),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return true;
        return value.type === "application/pdf";
      }
    ),
  },
  file4: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  file5: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  file6: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  file7: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  file8: {
    required: helpers.withMessage("* กรุณาอัปโหลดไฟล์ *", required),
    fileType: helpers.withMessage(
      "* อัปโหลดได้เฉพาะไฟล์ PDF เท่านั้น *",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["application/pdf"];
        return allowedTypes.includes(value.type);
      }
    ),
  },
  result: {
    notStandard: helpers.withMessage(
      "* กรอกคะแนนไม่ถูกต้อง ระดับต้องเป็นระดับดีมาก *",
      (value) => {
        // ถ้า qualityMeeting เป็น "ดีมาก" แต่ result เป็น "ได้ระดับมาตรฐาน" -> Error
        return !(
          formData.qualityMeeting === "good" && value === "ได้ระดับมาตรฐาน"
        );
      }
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

onMounted(async () => {
  await userStore.fetchUser();

  formData.user_id = user.value?.user_id;
  formData.name = user.value?.user_nameth || "";
  console.log("user123", user)
  formData.position = user.value?.user_positionth || "";
});

const saveDraft = () => {
  localStorage.setItem("formDraft", JSON.stringify(formData));
  alert("บันทึกแบบร่างเรียบร้อยแล้ว");
};

onMounted(() => {
  console.log("formDraft", localStorage.getItem("formDraft"));
  const draft = localStorage.getItem("formDraft");
  if (draft) {
    console.log("have draft", JSON.parse(draft));
    Object.assign(formData, JSON.parse(draft));
  }
});

watch(() => formData.numcoResearchers, (newVal) => {
  const num = parseInt(newVal) || 0;

  // ถ้ายังไม่เป็น array ให้กำหนดก่อน
  if (!Array.isArray(formData.namecoResearchers)) {
    formData.namecoResearchers = [];
  }
  if (!Array.isArray(formData.coursecoResearchers)) {
    formData.coursecoResearchers = [];
  }

  while (formData.namecoResearchers.length < num) {
    formData.namecoResearchers.push('');
  }
  while (formData.coursecoResearchers.length < num) {
    formData.coursecoResearchers.push('');
  }

  formData.namecoResearchers.length = num;
  formData.coursecoResearchers.length = num;
});

const handleFile = (event, fieldName) => {
  const file = event.target.files[0];

  if (!file) {
    console.log(`No file selected for ${fieldName}.`);
    return;
  }

  // ตรวจสอบประเภทไฟล์ (PDF เท่านั้น)
  if (file.type !== "application/pdf") {
    alert("กรุณาอัพโหลดไฟล์ PDF เท่านั้น");
    event.target.value = ""; // ล้างค่า input
    return;
  }

  // ตรวจสอบขนาดไฟล์ (ไม่เกิน 100MB)
  const maxSize = 10 * 1024 * 1024; // 100 MB
  if (file.size > maxSize) {
    alert("ไฟล์มีขนาดเกิน 10 MB กรุณาเลือกไฟล์ที่เล็กกว่า");
    event.target.value = ""; // ล้างค่า input
    return;
  }

  // ถ้าผ่านเงื่อนไขทั้งหมด เก็บไฟล์ลง formData
  formData[fieldName] = file;
};

const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') return '0.00';
  const num = parseFloat(value);
  if (isNaN(num)) return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const totalAmount = computed(() => {
  formData.totalAmount = formData.numberArticles * formData.amount1article;
  return formatNumber(formData.totalAmount);
});
const totalRoom = computed(() => {
  formData.totalRoom = formData.numberDaysRoom * formData.roomCostPerNight;
  return formatNumber(formData.totalRoom);
});
const totalAllowance = computed(() => {
  formData.totalAllowance = formData.numTravelDays * formData.dailyAllowance;
  return formatNumber(formData.totalAllowance);
});

const allTotal = computed(() => {
  formData.all_money =
    (parseFloat(formData.totalAmount) || 0) +
    (parseFloat(formData.domesticExpenses) || 0) +
    (parseFloat(formData.overseasExpenses) || 0) +
    (parseFloat(formData.interExpenses) || 0) +
    (parseFloat(formData.airplaneTax) || 0) +
    (parseFloat(formData.totalRoom) || 0) +
    (parseFloat(formData.totalAllowance) || 0);

  return formatNumber(formData.all_money);
});

const newConfer = async () => {
  if (loading.value) return;

  const result = await v$.value.$validate();

  if (result) {
    try {
      loading.value = true

      const dataForBackend = {
        user_id: formData.user_id,
        conf_times: formData.textOther1,
        conf_days: formData.textOther2,
        trav_dateStart: formData.travelStart,
        trav_dateEnd: formData.travelEnd,
        conf_research: formData.research,
        num_co_researchers: formData.numcoResearchers,
        name_co_researchers: formData.namecoResearchers,
        course_co_researchers: formData.coursecoResearchers,
        conf_name: formData.conferenceName,
        meeting_date: formData.meetingDate,
        meeting_venue: formData.meetingVenue,
        date_submit_organizer: formData.dateSubmitToOrganizer,
        argument_date_review: formData.argumentDateReview,
        last_day_register: formData.lastDayRegister,
        meeting_type: formData.meetingType,
        quality_meeting: formData.qualityMeeting,
        presenter_type: formData.radioAuth,
        time_of_leave: formData.timeLeave,
        location: formData.location,
        wos_2_leave: formData.wos,
        name_2_leave: formData.nameWos,
        withdraw: formData.withdraw,
        wd_100_quality: formData.quality100,
        wd_name_100: formData.name100,
        country_conf: formData.venue,
        num_register_articles: formData.numberArticles,
        regist_amount_1_article: formData.amount1article,
        total_amount: formData.totalAmount,
        domestic_expenses: formData.domesticExpenses,
        overseas_expenses: formData.overseasExpenses,
        travel_country: formData.location, //ดูตรงนี้
        inter_expenses: formData.interExpenses,
        airplane_tax: formData.airplaneTax,
        num_days_room: formData.numberDaysRoom,
        room_cost_per_night: formData.roomCostPerNight,
        total_room: formData.totalRoom,
        num_travel_days: formData.numTravelDays,
        daily_allowance: formData.dailyAllowance,
        total_allowance: formData.totalAllowance,
        all_money: formData.all_money,
        score_type: formData.score,
        sjr_score: formData.sjr,
        sjr_year: formData.sjrYear,
        hindex_score: formData.sjrhIndex || formData.hIndex,
        hindex_year: formData.hIndexYear,
        Citation: formData.Citation,
        score_result: formData.total.total,
        core_rank: formData.coreConf,
        type: formData.typeFile,
        full_page: formData.file1,
        date_published_journals: formData.inputFile2,
        published_journals: formData.file2,
        q_proof: formData.file3,
        call_for_paper: formData.file4,
        accepted: formData.file5,
        fee_receipt: formData.file6,
        fx_rate_document: formData.file7,
        conf_proof: formData.file8,
      };
      const response = await api.post("/conference", dataForBackend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      router.push("/myHistory");
      localStorage.removeItem("formDraft");
    } catch (error) {
      console.log("Error saving code : ", error);
      alert("ไม่สามารถส่งข้อมูล โปรดลองอีกครั้งในภายหลัง");
    } finally {
      loading.value = false;
    }
  } else {
    alert("โปรดกรอกข้อมูลให้ครบถ้วน และถูกต้อง");

    console.log("Validation failed:", v$.value.$errors);
  }
};
</script>
