import { displayRangeTime } from "../../utils/date"

test("displayRangeTime", async () => {
    expect(displayRangeTime("2021-01-01 08:00:00", "2021-01-01 09:00:00", true)).toEqual("2021-01-01");
    expect(displayRangeTime("2021-01-01 08:00:00", "2021-01-02 09:00:00", true)).toEqual("2021-01-01 - 02");
    expect(displayRangeTime("2021-01-01 08:00:00", "2021-02-02 09:00:00", true)).toEqual("2021-01-01 - 02-02");
    expect(displayRangeTime("2021-01-01 08:00:00", "2022-02-02 09:00:00", true)).toEqual("2021-01-01 - 22-02-02");
    
    expect(displayRangeTime("2021-01-01 08:00:00", "2021-01-01 09:00:00", false)).toEqual("2021-01-01 08:00 - 09:00");
    expect(displayRangeTime("2021-01-01 08:00:00", "2021-01-02 09:00:00", false)).toEqual("2021-01-01 08:00 - 02 09:00");
    expect(displayRangeTime("2021-01-01 08:00:00", "2021-02-02 09:00:00", false)).toEqual("2021-01-01 08:00 - 02-02 09:00");
    expect(displayRangeTime("2021-01-01 08:00:00", "2022-02-02 09:00:00", false)).toEqual("2021-01-01 08:00 - 22-02-02 09:00");

    expect(displayRangeTime("2021-01-01 08:00:00", "2021-01-01 23:00:00", false)).toEqual("2021-01-01 08:00 - 23:00");
    expect(displayRangeTime("2021-01-01 08:00:00", "2021-01-02 23:00:00", false)).toEqual("2021-01-01 08:00 - 02 23:00");
    expect(displayRangeTime("2021-01-01 08:00:00", "2021-02-02 23:00:00", false)).toEqual("2021-01-01 08:00 - 02-02 23:00");
    expect(displayRangeTime("2021-01-01 08:00:00", "2022-02-02 23:00:00", false)).toEqual("2021-01-01 08:00 - 22-02-02 23:00");
})