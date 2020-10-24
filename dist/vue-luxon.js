'use strict';

var luxon = require('luxon');

var vueLuxon = {
    vueluxon: function (optionsUser) {
        var extend = function () {
            var arguments$1 = arguments;

            var out = {};
            for (var i = 0, len = arguments.length; i < len; ++i) {
                var obj = arguments$1[i];
                if (!obj) { continue; }
                for (var key in obj) {
                    if (!obj.hasOwnProperty(key) || !obj[key]) { continue; }
                    if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
                        out[key] = extend(out[key], obj[key]);
                        continue;
                    }
                    out[key] = obj[key];
                }
            }
            return out;
        };

        var optionsGlobal = extend({
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
                invalid: function (reason) {
                    return ("invalid: " + reason);
                }
            },
            optionsUser
        );

        var formatTemplates = {
            full: luxon.DateTime.DATETIME_FULL,
            fulls: luxon.DateTime.DATETIME_FULL_WITH_SECONDS,
            huge: luxon.DateTime.DATETIME_HUGE,
            huges: luxon.DateTime.DATETIME_HUGE_WITH_SECONDS,
            med: luxon.DateTime.DATETIME_MED,
            meds: luxon.DateTime.DATETIME_MED_WITH_SECONDS,
            short: luxon.DateTime.DATETIME_SHORT,
            shorts: luxon.DateTime.DATETIME_SHORT_WITH_SECONDS,

            date_full: luxon.DateTime.DATE_FULL,
            date_huge: luxon.DateTime.DATE_HUGE,
            date_med: luxon.DateTime.DATE_MED,
            date_short: luxon.DateTime.DATE_SHORT,

            time24simple: luxon.DateTime.TIME_24_SIMPLE,
            time24longoffset: luxon.DateTime.TIME_24_WITH_LONG_OFFSET,
            time24seconds: luxon.DateTime.TIME_24_WITH_SECONDS,
            //name: DateTime.TIME_24_WITH_SHORT_OFFSET,
            time_simple: luxon.DateTime.TIME_SIMPLE,
            //name: DateTime.TIME_WITH_LONG_OFFSET,
            //name: DateTime.TIME_WITH_SECONDS,
            //name: DateTime.TIME_WITH_SHORT_OFFSET,
        };

        var parse = function (str, options) {
            if (!str) { return "never"; }
            var a = str,
                sf = options.serverFormat,
                sz = options.serverZone;

            switch (sf.toLowerCase()) {
                case "sql":
                    return luxon.DateTime.fromSQL(a, {
                        zone: sz
                    });
                case "iso":
                    return luxon.DateTime.fromISO(a, {
                        zone: sz
                    });
                case "http":
                    return luxon.DateTime.fromHTTP(a, {
                        zone: sz
                    });
                case "jsdate":
                    return luxon.DateTime.fromJSDate(a, {
                        zone: sz
                    });
                case "rfc2822":
                    return luxon.DateTime.fromRFC2822(a, {
                        zone: sz
                    });
                case "millis":
                    return luxon.DateTime.fromMillis(a, {
                        zone: sz
                    });
                case "seconds":
                case "unix":
                    return luxon.DateTime.fromSeconds(a, {
                        zone: sz
                    });
                default:
                    return luxon.DateTime.fromFormat(a, sf, {
                        zone: sz
                    });
            }
        };

        var parseLocaleLang = function (str) {
            if (!str || str == "locale" || str == "local") { return null; }
            return str;
        };

        var parseLocaleFormat = function (str) {
            if (typeof str == "string") {
                return formatTemplates[str.toLowerCase()] || formatTemplates[0];
            }
            return str;
        };

        var parseClientFormat = function (str) {
            return str;
        };

        var format = function (str, options) {
            if ( options === void 0 ) options = optionsGlobal;

            options.value = str;
            var dt = parse(str, options);
            if (dt.isValid == false) { return optionsGlobal.invalid(dt.invalid); }
            var a = str,
                cf = parseClientFormat(options.clientFormat),
                cz = options.clientZone,
                ll = parseLocaleLang(options.localeLang),
                lf = parseLocaleFormat(options.localeFormat);
            if (dt == 'never') { return null; }
            if (options.clientZone != "locale" || options.clientZone != "local") { dt = dt.setZone(cz); }
            switch (cf.toLowerCase()) {
                case "relative":
                    return dt.setLocale(ll).toRelative(options.relativeFormat || {});
                case "local":
                case "locale":
                    return dt.setLocale(ll).toLocaleString(lf);
                case "sql":
                    return dt.toSQL(a);
                case "iso":
                    return dt.toISO(a);
                case "http":
                    return dt.toHTTP(a);
                case "jsdate":
                    return dt.toJSDate(a);
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

        return function (str, optionsFilter, optionsForce) {
            if (str && typeof str == "object") {
                optionsFilter = str;
                str = str.value;
            }

            var options = extend(
                optionsGlobal,
                optionsFilter,
                optionsForce
            );

            return format(str, options);
        };
    },
    install: function (Vue, optionsUser) {
        var vueluxon = this.vueluxon(optionsUser);

        Vue.filter("luxon", function () {
            return vueluxon(arguments[0], arguments[1]);
        });

        var Format = function () {
            return vueluxon(arguments[0], arguments[2], {
                clientFormat: arguments[1]
            });
        };
        Vue.filter("luxonFormat", Format);

        var Locale = function () {
            return vueluxon(arguments[0], arguments[2], {
                clientFormat: "locale",
                localeFormat: arguments[1]
            });
        };
        Vue.filter("luxonLocale", Locale);

        var Local = function () {
            return vueluxon(arguments[0], arguments[2], {
                clientFormat: "locale",
                clientZone: "local",
                localeLang: "local",
                localeFormat: arguments[1]
            });
        };
        Vue.filter("luxonLocal", Local);

        var RelativeFormat = function () {
            return vueluxon(arguments[0], arguments[2], {
                clientFormat: "relative",
                relativeFormat: arguments[1]
            });
        };        Vue.filter("luxonRelative", RelativeFormat);
    }
};

module.exports = vueLuxon;
