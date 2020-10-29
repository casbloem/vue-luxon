import {
    DateTime
} from "luxon";
export default (str, inputFormat, inputZone) => {
    if (!str) return "never";
    let a = str,
        sf = inputFormat,
        sz = inputZone;

    switch (sf.toLowerCase()) {
        case "sql":
            return DateTime.fromSQL(a, {
                zone: sz
            });
        case "iso":
            return DateTime.fromISO(a, {
                zone: sz
            });
        case "http":
            return DateTime.fromHTTP(a, {
                zone: sz
            });
        case "jsdate":
            return DateTime.fromJSDate(a, {
                zone: sz
            });
        case "rfc2822":
            return DateTime.fromRFC2822(a, {
                zone: sz
            });
        case "millis":
            return DateTime.fromMillis(a, {
                zone: sz
            });
        case "seconds":
        case "unix":
            return DateTime.fromSeconds(a, {
                zone: sz
            });
        default:
            return DateTime.fromFormat(a, sf, {
                zone: sz
            });
    }
};