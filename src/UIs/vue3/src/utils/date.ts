import dayjs from "dayjs";

export function displayFullTime(dateStr: string) : string {
    return dayjs(dateStr).format("YYYY-MM-DD hh:mm a");
}

export function displayRangeTime(start: string | dayjs.Dayjs, end: string | dayjs.Dayjs, isAllDay: boolean) {
    let transTypes = ["string", "date"];
    if (transTypes.includes(typeof start)) {
        start = dayjs(start);
    }

    if (transTypes.includes(typeof end)) {
        end = dayjs(end);
    }

    let startDay = start as dayjs.Dayjs;
    let endDay = end as dayjs.Dayjs;

    // same year month day - YY-MM-DD hh:mm - hh:mm 
    if (startDay.isSame(endDay, "date")) {
        return isAllDay ? `${startDay.format("YYYY-MM-DD")}` : `${startDay.format("YYYY-MM-DD HH:mm")} - ${endDay.format("HH:mm")}`;
    }

    // same year month - YY-MM-DD hh:mm - DD hh:mm 
    if (startDay.isSame(endDay, "months")) {
        return isAllDay ? `${startDay.format("YYYY-MM-DD")} - ${endDay.format("DD")}` : `${startDay.format("YYYY-MM-DD HH:mm")} - ${endDay.format("DD HH:mm")}`;
    }

    // same year - YY-MM-DD hh:mm - MM-DD hh:mm 
    if (startDay.isSame(endDay, "year")) {
        return isAllDay ? `${startDay.format("YYYY-MM-DD")} - ${endDay.format("MM-DD")}` : `${startDay.format("YYYY-MM-DD HH:mm")} - ${endDay.format("MM-DD HH:mm")}`;
    }
    
    // totally diferent - YY-MM-DD hh:mm - YY-MM-DD hh:mm 
    return isAllDay ? `${startDay.format("YYYY-MM-DD")} - ${endDay.format("YY-MM-DD")}` : `${startDay.format("YYYY-MM-DD HH:mm")} - ${endDay.format("YY-MM-DD HH:mm")}`;
}