import { Datetime } from "luxon";

export function formatThaiDate(dateString) {
    if (!dateString) return "ไม่พบวันที่";

    const date = Datetime.fromISO(dateString);
    if (!date.isValid) return "ไม่พบวันที่";

    return date.setLocale("th").toFormat("d LLL yyyy");
}

export function getThaiFiscalYear(date = Datetime.now()) {
    const year = date.year;
    return date.moth >= 10 ? year + 1 : year;
}