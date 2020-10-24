import {
    DateTime
} from "luxon";
export default {
    vueluxon: function (optionsUser) {
        const extend = function () {
            let out = {};
            for (let i = 0, len = arguments.length; i < len; ++i) {
                let obj = arguments[i];
                if (!obj) continue;
                for (let key in obj) {
                    if (!obj.hasOwnProperty(key) || !obj[key]) continue;
                    if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
                        out[key] = extend(out[key], obj[key]);
                        continue;
                    }
                    out[key] = obj[key];
                }
            }
            return out;
        };

        const optionsGlobal = extend({
                value: null,
                lxn: null,
                serverZone: "UTC",
                serverFormat: "ISO",
                clientZone: "local",
                clientFormat: "locale",
                localeLang: null,
                localeFormat: {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                },
                parseApply: null,
                relativeFormat: {
                    round: true,
                    unit: null
                },
                invalid: reason => {
                    return `invalid: ${reason}`;
                }
            },
            optionsUser
        );

        const formatTemplates = {
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
            date_short: DateTime.DATE_SHORT,

            time24simple: DateTime.TIME_24_SIMPLE,
            time24longoffset: DateTime.TIME_24_WITH_LONG_OFFSET,
            time24seconds: DateTime.TIME_24_WITH_SECONDS,
            //name: DateTime.TIME_24_WITH_SHORT_OFFSET,
            time_simple: DateTime.TIME_SIMPLE,
            //name: DateTime.TIME_WITH_LONG_OFFSET,
            //name: DateTime.TIME_WITH_SECONDS,
            //name: DateTime.TIME_WITH_SHORT_OFFSET,
        };

        const parse = (str, options) => {
            if (!str) return "never";
            let a = str,
                sf = options.serverFormat,
                sz = options.serverZone;

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

        const parseLocaleLang = str => {
            if (!str || str == "locale" || str == "local") return null;
            return str;
        };

        const parseLocaleFormat = str => {
            if (typeof str == "string") {
                return formatTemplates[str.toLowerCase()] || formatTemplates[0];
            }
            return str;
        };

        const parseClientFormat = str => {
            return str;
        };

        const format = (str, options = optionsGlobal) => {
            options.value = str;
            let dt = parse(str, options);
            let dtp = null;
            if (dt.isValid == false) return optionsGlobal.invalid(dt.invalid);
            let a = str,
                cf = parseClientFormat(options.clientFormat),
                cz = options.clientZone,
                ll = parseLocaleLang(options.localeLang),
                lf = parseLocaleFormat(options.localeFormat);
            if (dt == 'never') return null;
            if (options.clientZone != "locale" && options.clientZone != "local") dt = dt.setZone(cz);
            else dt = dt.setZone("local");
            switch (cf.toLowerCase()) {
                case "relative":
                    return dt.setLocale(ll).toRelative(options.relativeFormat || {});
                    break;
                case "local":
                case "locale":
                    return dt.setLocale(ll).toLocaleString(lf);
                    break;
                case "sql":
                    return dt.toSQL(a);
                    break;
                case "iso":
                    return dt.toISO(a);
                    break;
                case "http":
                    return dt.toHTTP(a);
                    break;
                case "jsdate":
                    return dt.toJSDate(a);
                    break;
                case "rfc2822":
                    return dt.toRFC2822(a);
                    break;
                case "millis":
                    return dt.toMillis(a);
                    break;
                case "unix":
                case "seconds":
                    return dt.toSeconds(a);
                    break;
                default:
                    return dt.toFormat(cf);
                    break;
            }
        };

        return (str, optionsFilter, optionsForce) => {
            if (str && typeof str == "object") {
                optionsFilter = str;
                str = str.value;
            }

            let options = extend(
                optionsGlobal,
                optionsFilter,
                optionsForce
            );

            return format(str, options);
        };
    },
    install: function (Vue, optionsUser) {
        const vueluxon = this.vueluxon(optionsUser);

        Vue.filter("luxon", function () {
            return vueluxon(arguments[0], arguments[1]);
        });

        const Format = function () {
            return vueluxon(arguments[0], arguments[2], {
                clientFormat: arguments[1]
            });
        };
        Vue.filter("luxonFormat", Format);

        const Locale = function () {
            return vueluxon(arguments[0], arguments[2], {
                clientFormat: "locale",
                localeFormat: arguments[1]
            });
        };
        Vue.filter("luxonLocale", Locale);

        const Local = function () {
            return vueluxon(arguments[0], arguments[2], {
                clientFormat: "locale",
                clientZone: "local",
                localeLang: "local",
                localeFormat: arguments[1]
            });
        };
        Vue.filter("luxonLocal", Local);

        const RelativeFormat = function () {
            return vueluxon(arguments[0], arguments[2], {
                clientFormat: "relative",
                relativeFormat: arguments[1]
            });
        };;
        Vue.filter("luxonRelative", RelativeFormat);
    }
};