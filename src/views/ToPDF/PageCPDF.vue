<template>
  <div class="container my-10 mx-auto">
    <p class="text-2xl font-bold text-center no-print">นำออกเอกสาร</p>
    <div class="flex flex-col">
      <div class="flex flex-col justify-center items-center">
        <p class="text-[15px] font-bold pt-7">
          แบบขอรับการสนับสนุนค่าใช้จ่ายในการเผยแพร่ผลงานทางวิชาการ
        </p>
        <p class="text-[11px]">
          ตามประกาศคณะฯ เรื่อง
          การสนับสนุนค่าใช้จ่ายในการเผยแพร่ผลงานทางวิชาการของอาจารย์ประจำคณะเทคโนโลยีสารสนเทศ
          พ.ศ. 2567
        </p>
        <p class="text-[11px]">
          และประกาศ สจล. เรื่อง
          การสนับสนุนค่าใช้จ่ายสำหรับการนำเสนอบทความวิจัยลงตีพิมพ์
        </p>
        <p class="text-[11px]">
          ในวารสารวิชาการระดับนานาชาติ ด้วยเงินรายได้ ลงวันที่ 11 กรกฎาคม 2565
          และฉบับที่ 2 ลงวันที่ 19 กรกฎาคม 2565
        </p>
      </div>
      <div class="flex mt-1 mx-5 py-2 border border-black justify-center">
        <p class="text-[14px] font-bold pr-3">
          แบบที่ 2 ขออนุมัติค่า Page Charge
          เพื่อตีพิมพ์ผลงานในวารสารวิชาการระดับนานาชาติ
        </p>
      </div>
      <div class="flex flex-row mx-8 pt-2">
        <p class="text-[13px]">ข้าพเจ้า {{ formData.user.user_nameth }}</p>
        <p class="text-[13px] pl-5">
          ตำแหน่ง {{ formData.user.user_positionth }}
        </p>
      </div>
      <p class="text-[13px]">
        มีความประสงค์ขออนุมัติค่าใช้จ่ายในการเผยแพร่บทความวิจัยลงตีพิมพ์ (Page
        Charge) ในวารสารทางวิชาการระดับนานาชาติ ด้วยเงินรายได้
        ซึ่งมีรายชื่ออยู่ใน List* ที่คณะได้ให้การรับรองแล้ว โดยมติคณะ ครั้งที่
        {{ formData.pageChange.pageC_times }} เมื่อวันที่
        {{ formatThaiDate(formData.pageChange.pageC_days) }}
      </p>
      <!-- 1. รายละเอียดวารสารที่ส่งเสนอพิจารณา / การตอบรับให้ลงตีพิมพ์-->
      <p class="text-[13px] font-bold pt-3">
        1. รายละเอียดวารสารที่ส่งเสนอพิจารณา / การตอบรับให้ลงตีพิมพ์
      </p>
      <p class="text-[13px] pt-1 px-4">
        ชื่อวารสาร: {{ formData.pageChange.journal_name }}
      </p>
      <p class="text-[13px] pt-1 px-4">เป็นวารสารที่อยู่ในฐานข้อมูลสากล :</p>
      <div class="flex flex-row pt-1 px-5">
        <!-- checkbox edit -->
        <input type="checkbox" class="pt-1 px-5" v-model="formData.checkISI"
          :checked="formData.checkISI == 'ISI' ? true : false" disabled="false" />
        <span class="text-[13px] px-4"> ISI ได้รับการจัดลำดับ Quartile </span>
        <div v-if="formData.checkISI == 'ISI'" class="flex flex-row">
          <p class="text-[13px] px-4">
            ปี {{ formData.pageChange.pc_isi_year }}
          </p>
          <p class="text-[13px] px-4">
            ลำดับ Quartile {{ formData.pageChange.qt_isi }}
          </p>
          <p class="text-[13px] px-4">
            Impact Factor {{ formData.pageChange.impact_factor }}
          </p>
        </div>
      </div>

      <div class="flex flex-row pt-1 px-5">
        <input type="checkbox" class="pt-1 px-5" v-model="formData.checkSJR"
          :checked="formData.checkSJR == 'SJR' ? true : false" disabled="false" />
        <span class="text-[13px] px-4"> SJR ได้รับการจัดลำดับ Quartile </span>
        <div v-if="formData.checkSJR == 'SJR'" class="flex flex-row">
          <p class="text-[13px] px-4">
            ปี {{ formData.pageChange.pc_sjr_year }}
          </p>
          <p class="text-[13px] px-4">
            ลำดับ Quartile {{ formData.pageChange.qt_sjr }}
          </p>
          <p class="text-[13px] px-4">
            SJR Score {{ formData.pageChange.sjr_score }}
          </p>
        </div>
      </div>

      <div class="flex flex-row pt-1 px-5">
        <input type="checkbox" v-model="formData.checkScopus" :checked="formData.checkScopus == 'Scopus' ? true : false"
          disabled="false" />
        <span class="text-[13px] px-4">
          Scopus ได้รับการจัดลำดับ Quartile
        </span>
        <div v-if="formData.checkScopus == 'Scopus'" class="flex flex-row">
          <p class="text-[13px] px-4">
            ปี {{ formData.pageChange.pc_scopus_year }}
          </p>
          <p class="text-[13px] px-4">
            ลำดับ Quartile {{ formData.pageChange.qt_scopus }}
          </p>
          <p class="text-[13px] px-4">
            Cite Score{{ formData.pageChange.cite_score }}
          </p>
        </div>
      </div>

      <div class="flex flex-row pt-1 px-5">
        <input type="checkbox" class="pt-1 px-5" v-model="formData.nature"
          :checked="formData.nature == 'nature' ? true : false" disabled="false" />
        <span class="text-[13px] px-4"> Nature </span>
      </div>
    </div>
    <p class="text-[13px] px-4 pt-1">
      วงเงินตามเกณฑ์การให้การสนับสนุน ไม่เกิน
      {{ formData.formattedNumbers.support_limit }} บาท
    </p>
    <!-- 2.	รายละเอียดผลงานวิจัยที่ส่งเสนอพิจารณา / ได้รับการตอบรับให้ตีพิมพ์ -->
    <p class="text-[13px] font-bold pt-3">
      2. รายละเอียดผลงานวิจัยที่ส่งเสนอพิจารณา / ได้รับการตอบรับให้ตีพิมพ์
    </p>

    <p class="text-[13px] px-4 pt-1">
      ชื่อบทความ: {{ formData.pageChange.article_title }}
    </p>
    <p class="text-[13px] px-4 pt-1">
      กำหนดการที่คาดว่าจะได้รับการลงตีพิมพ์ในวารสาร:
    </p>
    <div class="flex flex-row text-[13px] pt-1 px-8 gap-x-5">
      <p>ปีที่ (Vol.) {{ formData.pageChange.vol_journal }}</p>
      <p>ฉบับที่ (Issue) {{ formData.pageChange.issue_journal }}</p>
      <p>เดือน {{ formData.pageChange.month }}</p>
      <p>ปี ค.ศ. {{ formData.pageChange.year }}</p>
      <p>เลขที่ ISSN/ISBN (อื่นๆ) {{ formData.pageChange.ISSN_ISBN }}</p>
    </div>
    <div class="flex flex-row text-[13px] px-4 pt-1 gap-x-5">
      <p>
        วันที่ส่งบทความไปยังสำนักพิมพ์เจ้าของวารสาร:
        {{ formatThaiDate(formData.pageChange.submission_date) }}
      </p>
      <p>
        วันประกาศผลการพิจารณา:
        {{ formatThaiDate(formData.pageChange.date_review_announce) }}
      </p>
    </div>
    <p class="text-[13px] px-4 pt-1">
      วันสุดท้ายของการจ่ายค่าตีพิมพ์:
      {{ formatThaiDate(formData.pageChange.final_date) }}
    </p>

    <p class="text-[13px] px-4 pt-1">
      (ถ้ามี) บทความวิจัยนี้เป็นผลงานจากโครงการวิจัยเรื่อง
      {{ formData.pageChange.article_research_ject }}
    </p>
    <div class="flex flex-row text-[13px] px-[50px] pt-1 gap-x-3">
      <p>ประเภทโครงการวิจัย:</p>
      <input type="radio" disabled="false" :checked="formData.pageChange.research_type == 'basic' ? true : false" />
      <span>วิจัยพื้นฐาน</span>
      <input type="radio" disabled="false" :checked="formData.pageChange.research_type == 'applied' ? true : false" />
      <span>วิจัยประยุกต์</span>
      <input type="radio" disabled="false" :checked="formData.pageChange.research_type == 'research&development'
          ? true
          : false
        " />
      <div class="flex flex-row gap-x-4">
        <span>วิจัยและพัฒนา</span>
        <input type="radio" disabled="false" :checked="formData.pageChange.research_type == 'other' ? true : false" />
        <span>วิจัยอื่น ๆ</span>
        <p v-if="formData.pageChange.research_type == 'other '">
          {{ formData.pageChange.research_type2 }}
        </p>
      </div>
    </div>
    <p class="text-[13px] px-[50px] pt-1">
      ชื่อแหล่งทุนวิจัย: {{ formData.pageChange.name_funding_source }}
    </p>
    <div class="flex flex-row text-[13px] px-[50px] pt-1 gap-x-4">
      <p>วงเงินงบประมาณการวิจัย: {{ formData.pageChange.budget_limit }}</p>
      <p>ประจำปี: {{ formData.pageChange.annual }}</p>
    </div>

    <!-- 3.	ผู้ขอรับการสนับสนุน -->
    <p class="text-[13px] font-bold pt-3">3. ผู้ขอรับการสนับสนุน</p>
    <div class="flex flex-row text-[13px] pt-1 gap-x-4 px-5">
      <input type="radio" disabled="false" :checked="formData.pageChange.presenter_type == 'First Author' ? true : false
        " />
      <span>ผู้ประพันธ์บรรณกิจ Corresponding Author</span>
      <input type="radio" disabled="false" :checked="formData.pageChange.presenter_type == 'Corresponding Author'
          ? true
          : false
        " />
      <span>ผู้ประพันธ์บรรณกิจ Corresponding Author</span>
    </div>
    <!-- 4. เอกสารหลักฐานที่แนบมาพร้อมนี้ -->
    <p class="text-[13px] font-bold pt-3">4. เอกสารหลักฐานที่แนบมาพร้อมนี้</p>
    <div class="flex flex-col text-[13px] px-5 pt-1">
      <div>
        <input type="checkbox" class="pt-1 px-5" :checked="formData.file.pc_proof != null ? true : false"
          disabled="false" />
        <span class="text-[13px] px-4">
          หลักฐานแสดงการอยู่ในฐานข้อมูลสากล ISI หรือ SJR หรือ Scopus หรือ Nature
        </span>
      </div>
      <div>
        <input type="checkbox" class="pt-1 px-5" :checked="formData.file.q_pc_proof != null ? true : false"
          disabled="false" />
        <span class="text-[13px] px-4">
          หลักฐานแสดงการจัดลำดับ Quartile ของฐานข้อมูลสากล ISI หรือ SJR หรือ
          Scopus
        </span>
      </div>
      <div>
        <input type="checkbox" class="pt-1 px-5" :checked="formData.file.invoice_public != null ? true : false"
          disabled="false" />
        <span class="text-[13px] px-4">
          ใบแจ้งหนี้ค่าใช้จ่ายสำหรับการตีพิมพ์ /
          อัตราค่าใช้จ่ายที่ประกาศบนหน้าเว็บไซต์</span>
      </div>
      <div>
        <input type="checkbox" class="pt-1 px-5" :checked="formData.file.accepted != null ? true : false"
          disabled="false" />
        <span class="text-[13px] px-4">
          หลักฐานการส่งบทความ หนังสือตอบรับบทความ</span>
      </div>
      <div>
        <input type="checkbox" class="pt-1 px-5" :checked="formData.file.copy_article != null ? true : false"
          disabled="false" />
        <span class="text-[13px] px-4">
          สำเนาบทความ</span>
      </div>
      <div>
        <input type="checkbox" class="pt-1 px-5" :checked="formData.file.upload_article != null ? true : false"
          disabled="false" />
        <span class="text-[13px] px-4">
          หลักฐานการ Upload บทความเข้าระบบ IT Scholar</span>
      </div>
    </div>
    <!-- 5.	ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge)  -->
    <div class="flex flex-row gap-x-4">
      <p class="text-[13px] font-bold pt-3">
        5. ขอรับการสนับสนุนค่าใช้จ่ายในการลงตีพิมพ์ (Page Charge)
      </p>
      <p class="text-[13px] pt-3">
        เป็นจำนวนเงิน {{ formData.formattedNumbers.request_support }} บาท
      </p>
    </div>
    <div class="flex flex-col text-[13px] pt-3 items-end">
      <p>ลงชื่อ ผู้เสนอขออนุมัติ</p>
      <img :src="getUploadURL(formData.user.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
      <p>{{ formatThaiDate(formData.pageChange.doc_submit_date) }}</p>
    </div>

    <div class="page-break"></div>
    <div class="flex flex-row mt-10">
      <p class="underline font-bold pr-2">ตรวจสอบข้อมูล ผลงาน และหลักฐาน</p>
      <p>(ตามประกาศ สจล. และประกาศคณะ ที่อ้างอิง)</p>
    </div>
    <div class="flex flex-col divide-y divide-black border border-black mt-3">
      <div class="flex flex-col mt-1 py-2 text-[13px] px-2">
        <div class="flex flex-row">
          <p class="underline pr-2">ขั้นตอนที่ 1</p>
          <p>งานบริหารงานวิจัย</p>
        </div>
        <p>ตรวจหลักฐานตามหลักเกณฑ์ที่กำหนดในประกาศ สจล. และประกาศคณะ</p>
        <div class="flex flex-row gap-4">
          <input type="radio" disabled="false" :checked="formData.offic.p_research_result == 'approve' ? true : false
            " />
          <span>ถูกต้องตามเงื่อนไขการสนับสนุน ดังนี้</span>
          <p v-if="formData.offic.p_research_result == 'approve'">
            {{ formData.offic.p_reason }}
          </p>
        </div>
        <div class="flex flex-row gap-4">
          <input type="radio" disabled="false" :checked="formData.offic.p_research_result == 'other' ? true : false" />
          <span>อื่น ๆ</span>
          <p v-if="formData.offic.p_research_result == 'other'">
            {{ formData.offic.p_reason }}
          </p>
        </div>
        <div class="flex flex-col text-[13px] pt-3 items-end">
          <div class="flex flex-row gap-1">
            <p>ลงนาม</p>
            <div v-for="item in formData.signatureOffice" :key="item" class="-mt-4">
              <img v-if="
                item.user_role == 'research' &&
                item.user_id == formData.offic.research_id
              " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
            </div>
            <p>เจ้าหน้าที่บริหารงานวิจัย</p>
          </div>

          <p>{{ formatThaiDate(formData.offic.research_doc_submit_date) }}</p>
        </div>
      </div>
      <div class="flex flex-col py-2 text-[13px] px-2">
        <div class="flex flex-row">
          <p class="underline pr-2">ขั้นตอนที่ 2</p>
          <p>งานการเงิน</p>
        </div>
        <p>ตรวจสอบเงินงบประมาณประจำปีที่จัดสรรในการเผยแพร่ผลงานวิชาการ</p>
        <p>ปีงบประมาณ พ.ศ. {{ formData.budget.budget_year }}</p>
        <div class="flex flex-col items-end">
          <div class="flex flex-row justify-between gap-3 pt-2">
            <p>วงเงินที่คณะจัดสรรไว้ จำนวนเงินทั้งสิ้น</p>
            <p>{{ formData.formattedBudget.Page_Charge_amount }}</p>
            <p>บาท</p>
          </div>
          <div class="flex flex-row justify-between gap-3 pt-2">
            <p>โดยคณะได้อนุมัติค่าใช้จ่ายในการเสนอผลงานวิชาการไปแล้ว จำนวน</p>
            <p>{{ formData.budget.num_expenses_approved }}</p>
            <p>รายการ</p>
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
            <p>จำนวนเงินที่ขออนุมัติค่า Page Charge ในครั้งนี้ เป็นจำนวนเงิน</p>
            <p>{{ formData.formattedBudget.amount_approval }}</p>
            <p>บาท</p>
          </div>
          <div class="flex flex-row justify-between gap-3 pt-2">
            <p>วงเงินที่คณะจัดสรรไว้ คงเหลือทั้งสิ้น</p>
            <p>{{ formData.formattedBudget.total_remaining_credit_limit }}</p>
            <p>บาท</p>
          </div>
        </div>

        <div class="flex flex-col text-[13px] pt-10 items-end px-10">
          <div class="flex flex-row gap-1">
            <p>ลงนาม</p>
            <div v-for="item in formData.signatureOffice" :key="item" class="-mt-4">
              <img v-show="item.user_role == 'finance' &&
                item.user_id == formData.budget.user_id
                " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
            </div>
            <p>เจ้าหน้าที่การเงิน</p>
          </div>

          <p>{{ formatThaiDate(formData.budget.doc_submit_date) }}</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 divide-x divide-black border border-black mt-5">
      <div class="text-[13px] px-2 py-3">
        <p class="underline">ความเห็นรองคณบดี (กำกับดูแลด้านงานวิจัย)</p>
        <p class="pt-4">เห็นชอบ</p>
        <div class="flex flex-col text-[13px] pt-3 items-end">
          <div class="flex flex-row gap-1">
            <p>ลงนาม</p>
            <div v-for="item in formData.signatureOffice" :key="item" class="-mt-4">
              <img v-if="
                item.user_role == 'associate' &&
                item.user_id == formData.offic.associate_id
              " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
            </div>
          </div>

          <p>{{ formatThaiDate(formData.offic.associate_doc_submit_date) }}</p>
        </div>
      </div>
      <div class="text-[13px] px-2">
        <div class="flex flex-row gap-2 py-3">
          <p class="font-bold">เรียน คณบดีคณะเทคโนโลยีสารสนเทศ</p>
          <p>(ครั้งที่ 1)</p>
        </div>
        <p class="pt-1 px-8">
          เพื่อโปรดทราบการจัดสรรวงเงิน ก่อนการตอบรับบทความ
        </p>
        <p class="flex justify-end font-bold pr-10">รับทราบ</p>
        <div class="flex flex-col text-[13px] pt-3 items-end">
          <div class="flex flex-row gap-1 py-3">
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
              ({{ item.user_position }} {{ item.user_name }}) </p>
          </div>
          <p>{{ formatThaiDate(formData.offic.dean_doc_submit_date) }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-3 pr-10 pt-4 text-[13px]">
      <p class="font-bold">เรียน</p>
      <p class="font-bold">คณบดีคณะเทคโนโลยีสารสนเทศ</p>
      <p>(ครั้งที่ 2)</p>
    </div>
    <!-- <p class="text-[13px] pl-10">
      ขณะนี้บทความได้รับการตอบรับแล้ว (Letter of acceptance) เมื่อวันที่
      {{ formatThaiDate(formData.offic.p_date_accepted_approve) }}
      ตามหลักฐานที่แนบ
    </p> -->
    <p class="text-[13px]">จึงเรียนมาเพื่อโปรดพิจารณา</p>

    <div class="flex flex-row text-[13px] pt-3 gap-4">
      <p class="font-bold">ผลการพิจารณา</p>
      <input type="radio" disabled="false" :checked="formData.offic.p_dean_result == 'approve' ? true : false" />
      <span>อนุมัติ</span>
      <input type="radio" disabled="false" :checked="formData.offic.p_dean_result == 'notApproved' ? true : false
        " />
      <span>ไม่อนุมัติ</span>
      <p v-if="formData.offic.p_dean_result == 'notApproved'">เนื่องจาก</p>
    </div>
    <div class="flex flex-col text-[13px] pt-3 items-end">
      <div class="flex flex-row gap-1 py-3">
        <p>ลงนาม</p>
        <div v-for="item in formData.signatureOffice" :key="item" class="-mt-4">
          <img v-if="
            item.user_role == 'dean' && item.user_id == formData.offic.dean_id
          " :src="getUploadURL(item.user_signature)" class="h-[50px] w-[170px]" alt="user signature" />
        </div>
        <p>คณบดี</p>
      </div>
      <div v-for="item in formData.signatureOffice" :key="item">
        <p v-if="
          item.user_role == 'dean' &&
          item.user_id == formData.offic.dean_id
        ">
          ({{ item.user_position }} {{ item.user_name }}) </p>
      </div>
      <p>{{ formatThaiDate(formData.offic.dean_doc_submit_date) }}</p>
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
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import api from "@/setting/api";

// จัดการข้อมูลหลัก
const formData = reactive({
  pageChange: [],
  user: [],
  offic: [],
  budget: [],
  formattedNumbers: "",
  formattedBudget: "",
  file: [],
  signatureOffice: [],

  check: [],
  checkISI: "",
  checkSJR: "",
  checkScopus: "",
  nature: "",
});

const formatThaiDate = (dateString) => {
  if (!dateString) return "ไม่พบวันที่";

  const date = new Date(dateString);
  const months = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
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
  if (value === null || value === undefined || value === '') return '0.00';
  const num = parseFloat(value);
  if (isNaN(num)) return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ตัวแปรสำหรับเก็บข้อมูลจาก backend
const fetchProfessorData = async () => {
  try {
    const responsePC = await api.get(`/page_charge/${id}`);
    const userID = responsePC.data.user_id;
    const responseUser = await api.get(`/user/${userID}`);
    formData.user = responseUser.data;

    formData.pageChange = responsePC.data;
    formData.check = formData.pageChange.quality_journal;

    formData.formattedNumbers = {
      support_limit: formatNumber(formData.pageChange.support_limit),
      request_support: formatNumber(formData.pageChange.request_support),
    };
    const responseoffic = await api.get(`/opinionPC/${id}`);
    console.log("responseoffic", responseoffic.data);
    formData.offic = responseoffic.data;

    const responsebudget = await api.get(`/budget/pageCharge/${id}`);
    console.log("responsebudget", responsebudget.data);
    formData.budget = responsebudget.data;
    formData.formattedBudget = {
      Page_Charge_amount: formatNumber(formData.budget.Page_Charge_amount),
      total_amount_approved: formatNumber(formData.budget.total_amount_approved),
      remaining_credit_limit: formatNumber(formData.budget.remaining_credit_limit),
      amount_approval: formatNumber(formData.budget.amount_approval),
      total_remaining_credit_limit: formatNumber(formData.budget.total_remaining_credit_limit),
    };

    const responseFile = await api.get(`/pdfPC/${id}`);
    formData.file = responseFile.data;

    const responseSignature = await api.get("/users");

    for (let i = 0; i < responseSignature.data.length; i++) {
      if (
        ["research", "finance", "associate", "dean"].includes(
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
  } catch (error) {
    console.log("Error fetching professor data:", error);
  } finally {
    isLoading.value = false;
  }
};

const loopdata = async () => {
  for (let i = 0; i < formData.check.length; i++) {
    if (formData.check[i] == "nature") {
      formData.nature = "nature";
    }
    if (formData.check[i] == "ISI") {
      formData.checkISI = "ISI";
    }
    if (formData.check[i] == "SJR") {
      formData.checkSJR = "SJR";
    }
    if (formData.check[i] == "Scopus") {
      formData.checkScopus = "Scopus";
    }
  }
};

const getUploadURL = (filename) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  return `${baseURL}/uploads/${filename}`;
};

// ดึงข้อมูลเมื่อ component ถูกโหลด
onMounted(async () => {
  await fetchProfessorData();
  loopdata();
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
