import parse from "./parse";
export default (str, options) => {

    const parseLocale = str => {
        if (!str || str == "locale" || str == "local") return null;
        return str;
    };

    if (typeof options.input !== "object") throw "`input` is not an object, but: " + options.input;
    if (typeof options.output !== "object") throw "`output` is not an object, but: " + options.output;

    var dt = parse(str, options.input.format, options.input.zone);
    if (dt.isValid == false) throw dt.invalidReason;
    var a = str,
        cf = options.output.format,
        cz = options.output.zone,
        ll = parseLocale(options.output.locale ? options.output.locale : null);


    if (dt == 'never') return null;
    if (options.parse) dt = options.parse.call(dt);
    if (cz != "locale" && cz != "local") dt = dt.setZone(cz);
    else dt = dt.setZone("local");

    dt = dt.setLocale(ll);

    if (typeof cf == 'object') return dt.toLocaleString(cf);

    switch (cf.toLowerCase()) {
        case "relative":
            return dt.toRelative(options.output.relative);
        case "sql":
            return dt.toSQL(a);
        case "iso":
            return dt.toISO(a);
        case "http":
            return dt.toHTTP(a);
        case "jsdate":
            return dt.toJSDate(a);
        case "rfc":
        case "rfc2822":
            return dt.toRFC2822(a);
        case "millis":
            return dt.toMillis(a);
        case "unix":
        case "seconds":
            return dt.toSeconds(a);
        default:
            return dt.toFormat(cf);
    }
};