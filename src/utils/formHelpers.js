import { DateTime } from "luxon";

/**
 * คืนค่าปีงบประมาณไทยปัจจุบัน
 */
export const getThaiFiscalYear = () => {
  const now = DateTime.now();
  const year = now.year + 543;
  return now.month >= 10 ? year + 1 : year;
};

/**
 * แปลง raw form จาก API ให้พร้อมแสดงผล
 * @param {Object} form
 * @param {Object} [options]
 * @param {boolean} [options.myHistory] - ใส่ flag myHistory ให้ form card
 */
export const formatForm = (form) => ({
  ...form,
  amount_approval: Number(form.amount_approval || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  }),
  Research_kris_amount: Number(form.Research_kris_amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  }),
});
