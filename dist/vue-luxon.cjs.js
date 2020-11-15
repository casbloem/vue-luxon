'use strict';

var luxon = require('luxon');

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

var localeFormats = {
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
    date_medd: luxon.DateTime.DATE_MED_WITH_WEEKDAY,
    date_short: luxon.DateTime.DATE_SHORT,
    time24: luxon.DateTime.TIME_24_SIMPLE,
    time24longoffset: luxon.DateTime.TIME_24_WITH_LONG_OFFSET,
    time24s: luxon.DateTime.TIME_24_WITH_SECONDS,
    //name: DateTime.TIME_24_WITH_SHORT_OFFSET,
    time: luxon.DateTime.TIME_SIMPLE,
    //name: DateTime.TIME_WITH_LONG_OFFSET,
    times: luxon.DateTime.TIME_WITH_SECONDS,
    //name: DateTime.TIME_WITH_SHORT_OFFSET,
};

var formats = {
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
Object.keys(localeFormats).forEach(function (k) {
    formats[k] = {
        format: localeFormats[k]
    };
});

var defaultSettings = {
    templates: {},
    input: {
        zone: "utc",
        format: "iso"
    },
    output: {
        zone: "local",
        format: {
            year: "numeric",
            month: "long",
            day: "numeric"
        },
        locale: null,
        relative: {
            round: true,
            unit: null
        }
    },
    parse: false

};

function formatSettings (settings) {
    if (typeof settings != 'object') { throw "formatSettings.js: `settings` is not an object"; }
    //if (!settings.input || !settings.output) throw "formatSettings.js: `settings.input` or `settings.output` is undefined";

    var temps = extend(formats, settings.templates);



    if (typeof settings.input == "string") {
        var inputTemplateName = settings.input.toLowerCase();
        if (temps[inputTemplateName]) { settings.input = temps[inputTemplateName]; }
        else { settings.input = {
            format: settings.input
        }; }
    }

    if (typeof settings.output == "string") {
        var outputTemplateName = settings.output.toLowerCase();
        if (temps[outputTemplateName]) { settings.output = temps[outputTemplateName]; }
        else { settings.output = {
            format: settings.output
        }; }
    }

    if (settings.relative) { settings.output.relative = settings.relative; }
    if (settings.locale) { settings.output.locale = settings.locale; }

    var getFormat = function (obj) {
        if (typeof obj == 'object') { return obj; }
        var format = obj.toLowerCase();
        return temps[format] ? temps[format].format : obj;
    };

    var getZone = function (obj) {
        var zone = obj.toLowerCase();
        return temps[zone] ? temps[zone].zone : obj;
    };

    var getRelativeFormat = function (obj) {
        if (typeof obj == 'object') { return obj; }
        var RelativeFormat = obj.toLowerCase();
        return temps[RelativeFormat] ? temps[RelativeFormat].relative : obj;
    };

    settings = extend(defaultSettings, settings);

    settings.input.format = getFormat(settings.input.format);
    settings.output.format = getFormat(settings.output.format);
    settings.input.zone = getZone(settings.input.zone);
    settings.output.zone = getZone(settings.output.zone);
    settings.output.relative = getRelativeFormat(settings.output.relative);


    return settings;
}

function parse (str, inputFormat, inputZone) {
    if (!str) { return "never"; }
    var a = str,
        sf = inputFormat,
        sz = inputZone;

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
}

function format (str, options) {

    var parseLocale = function (str) {
        if (!str || str == "locale" || str == "local") { return null; }
        return str;
    };

    if (typeof options.input !== "object") { throw "`input` is not an object, but: " + options.input; }
    if (typeof options.output !== "object") { throw "`output` is not an object, but: " + options.output; }

    var dt = parse(str, options.input.format, options.input.zone);
    if (dt.isValid == false) { throw dt.invalidReason; }
    var a = str,
        cf = options.output.format,
        cz = options.output.zone,
        ll = parseLocale(options.output.locale ? options.output.locale : null);


    if (dt == 'never') { return null; }
    if (options.parse) { dt = options.parse.call(dt); }
    if (cz != "locale" && cz != "local") { dt = dt.setZone(cz); }
    else { dt = dt.setZone("local"); }

    dt = dt.setLocale(ll);

    if (typeof cf == 'object') { return dt.toLocaleString(cf); }

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
}

var main = {
    vueluxon: function (optionsUser) {
        return function (str, optionsFilter, optionsForce) {
            if (str && typeof str == "object") {
                optionsFilter = str;
                if (!str.value) { throw "The first parameter should be a string, or the object should contain a `value` property" }
                str = str.value;
            }

            if (typeof optionsFilter == "string") {
                optionsFilter = {
                    output: {
                        format: optionsFilter
                    }
                };
            }

            return format(str, formatSettings(extend(optionsUser, optionsFilter, optionsForce)));
        };
    },
    install: function (Vue, optionsUser) {
        var vueluxon = this.vueluxon(optionsUser);

        var method_name = optionsUser && optionsUser.methodName ? optionsUser.methodName : "$luxon";
        Vue.prototype[method_name] = vueluxon;

        Vue.filter("luxon", function () {
            if (typeof arguments[1] == 'string')
                { return vueluxon(arguments[0], arguments[2], {
                    output: {
                        format: arguments[1]
                    }
                }); }
            return vueluxon(arguments[0], arguments[1]);
        });

        var RelativeFormat = function () {
            return vueluxon(arguments[0], arguments[2], {
                output: {
                    format: "relative",
                    relative: arguments[1]
                }
            });
        };
        
        Vue.filter("luxonRelative", RelativeFormat);
    }
};

module.exports = main;
