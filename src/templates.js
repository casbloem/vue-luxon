import {
    DateTime
} from "luxon";
const localeFormats = {
    full: DateTime.DATETIME_FULL,
    fulls: DateTime.DATETIME_FULL_WITH_SECONDS,
    huge: DateTime.DATETIME_HUGE,
    huges: DateTime.DATETIME_HUGE_WITH_SECONDS,
    med: DateTime.DATETIME_MED,
    meds: DateTime.DATETIME_MED_WITH_SECONDS,
    short: DateTime.DATETIME_SHORT,
    shorts: DateTime.DATETIME_SHORT_WITH_SECONDS,
    date_full: DateTime.DATE_FULL,
    date_huge: DateTime.DATE_HUGE,
    date_med: DateTime.DATE_MED,
    date_medd: DateTime.DATE_MED_WITH_WEEKDAY,
    date_short: DateTime.DATE_SHORT,
    time24: DateTime.TIME_24_SIMPLE,
    time24longoffset: DateTime.TIME_24_WITH_LONG_OFFSET,
    time24s: DateTime.TIME_24_WITH_SECONDS,
    //name: DateTime.TIME_24_WITH_SHORT_OFFSET,
    time: DateTime.TIME_SIMPLE,
    //name: DateTime.TIME_WITH_LONG_OFFSET,
    times: DateTime.TIME_WITH_SECONDS,
    //name: DateTime.TIME_WITH_SHORT_OFFSET,
};

let formats = {
    relative: {
        format: "relative"
    },
    server: {
        zone: "utc",
        format: "iso"
    },
    client: {
        zone: "local",
        format: "med"
    },
    inputdate: {
        zone: "client",
        format: "yyyy-MM-dd"
    }
};
Object.keys(localeFormats).forEach(k => {
    formats[k] = {
        format: localeFormats[k]
    }
});
export default formats;