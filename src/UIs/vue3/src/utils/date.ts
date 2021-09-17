import dayjs from "dayjs";

export function displayFullTime(dateStr: string) : string {
    return dayjs(dateStr).format("YYYY-MM-DD hh:mm:ss a");
}

export function displayRangeTime(start: string | dayjs.Dayjs, end: string | dayjs.Dayjs) {
    let transTypes = ["string", "date"];
    if (transTypes.includes(typeof start)) {
        start = dayjs(start);
    }

    if (transTypes.includes(typeof end)) {
        end = dayjs(end);
    }

    // same year month day

    // same year month
    
    // same year

    // totally diferent
}