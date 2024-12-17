import dayjs from "dayjs";

export class DateUtils {
    static isDateValid(date: string) {
        return dayjs(date).isValid();
    }
    static isDateAfter(date1: string, date2: string) {
        return dayjs(date1).isAfter(dayjs(date2));
    }
    static isDateBefore(date1: string, date2: string) {
        return dayjs(date1).isBefore(dayjs(date2));
    }
    static getTotalDays(date1: string, date2: string) {
        return dayjs(date2).diff(dayjs(date1), 'day');
    }

}
