let { DateTime, Interval } = require("luxon");
module.exports = {
  install: function(Vue, optionsUser) {
   const extend = function() {
      let out = {};
      for (var i = 0, len = arguments.length; i < len; ++i) {
        var obj = arguments[i];
        if (!obj) continue;
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) continue;
          if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
            out[key] = extend(out[key], obj[key]); continue;
          } out[key] = obj[key];
        }
      } return out;
    };

    const optionsGlobal = extend(
      {
        serverZone: "UTC",
        serverFormat: "ISO",
        clientZone: "locale",
        clientFormat: "locale",
        localeFormat: {
          year: "numeric",
          month: "long",
          day: "numeric"
        },
        i18n: {
          year: ["year", "years"],
          month: ["month", "months"],
          day: ["day", "days"],
          hour: ["hour", "hours"],
          minute: ["minute", "minutes"],
          second: ["second", "seconds"],
          ago: "ago",
          in: "in"
        },
        invalid: reason => {
          return `invalid: ${reason}`;
        }
      },
      optionsUser
    );

    let localFormatTemplates = {
      // Next Update
    };

    let format_dfh = cdt => {
      if (!cdt || !cdt.isValid) return optionsGlobal.invalid(cdt.invalid);
      let obj = cdt
        .until(DateTime.local())
        .toDuration(["years", "months", "days", "hours", "minutes", "seconds"])
        .toObject();
      let txt = {};
      let opts = optionsGlobal;
      let a = obj.years
        ? [obj.years, opts.i18n.year]
        : obj.months
          ? [obj.months, opts.i18n.month]
          : obj.days
            ? [obj.days, opts.i18n.day]
            : obj.hours
              ? [obj.hours, opts.i18n.hour]
              : obj.minutes
                ? [obj.minutes, opts.i18n.minute]
                : obj.seconds ? [obj.seconds, opts.i18n.second] : false;
      (txt.in = null), (txt.ago = opts.i18n.ago);
      if (a == false) {
        obj = DateTime.local()
          .until(cdt)
          .toDuration([
            "years",
            "months",
            "days",
            "hours",
            "minutes",
            "seconds"
          ])
          .toObject();
        a = obj.years
          ? [obj.years, opts.i18n.year]
          : obj.months
            ? [obj.months, opts.i18n.month]
            : obj.days
              ? [obj.days, opts.i18n.day]
              : obj.hours
                ? [obj.hours, opts.i18n.hour]
                : obj.minutes
                  ? [obj.minutes, opts.i18n.minute]
                  : obj.seconds ? [obj.seconds, opts.i18n.second] : false;
        (txt.in = opts.i18n.in), (txt.ago = null);
      }

      return `${txt.in || ""} ${a[0]} ${a[1][a[0] > 1 ? 1 : 0]} ${txt.ago ||
        ""}`;
    };

    const parse = (str, options) => {
      if (!str) return "never";
      let a = str,
        sf = options.serverFormat,
        sz = options.serverZone;

      switch (sf.toLowerCase()) {
        case "sql":
        case "laravel":
          return DateTime.fromSQL(a, { zone: sz });
        case "iso":
          return DateTime.fromISO(a, { zone: sz });
        case "http":
          return DateTime.fromHTTP(a, { zone: sz });
        case "jsdate":
          return DateTime.fromJSDate(a, { zone: sz });
        case "rfc2822":
          return DateTime.fromRFC2822(a, { zone: sz });
        default:
          return DateTime.fromFormat(a, sf, { zone: sz });
      }
    };

    const format = (str, optionsFilter = {}, optionsForce = {}) => {
      let options = extend(optionsGlobal, optionsFilter, optionsForce);
      let dt = parse(str, options);
      if (dt.isValid == false) return optionsGlobal.invalid(dt.invalid);
      let a = str,
        cf = options.clientFormat,
        cz = options.clientZone,
        lf = options.localeFormat;
      switch (cf.toLowerCase()) {
        case "diffforhumans":
        case "dfh":
          return format_dfh(dt);
        case "locale":
          return dt.toLocaleString(lf);
        case "sql":
        case "laravel":
          return dt.toSQL(a, { zone: cz });
        case "iso":
          return dt.toISO(a, { zone: cz });
        case "http":
          return dt.toHTTP(a, { zone: cz });
        case "jsdate":
          return dt.toJSDate(a, { zone: cz });
        case "rfc2822":
          return dt.toRFC2822(a, { zone: cz });
        default:
          return dt.toFormat(cf, { zone: cz });
      }
    };

    const vueluxon = (str, optionsFilter, optionsForce) => {
      return format(str, optionsFilter, optionsForce);
    };

    Vue.filter("luxon", function() {
      return vueluxon(arguments[0], arguments[1]);
    });
    Vue.filter("luxon:format", function() {
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: arguments[1]
      });
    });
    Vue.filter("luxon:locale", function() {
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: "locale",
        localeFormat: arguments[1]
      });
    });
    Vue.filter("luxon:diffForHumans", function() {
      return vueluxon(arguments[0], arguments[1], {
        clientFormat: "diffforhumans"
      });
    });
  }
};
