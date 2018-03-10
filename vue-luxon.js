let { DateTime, Interval } = require("luxon");
module.exports = {
  install: function(Vue, optionsUser) {
    let extend = function() {
      var extended = {};
      var deep = false;
      var i = 0;
      var length = arguments.length;
      if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
        deep = arguments[0];
        i++;
      }
      var merge = function(obj) {
        for (var prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            if (
              deep &&
              Object.prototype.toString.call(obj[prop]) === "[object Object]"
            ) {
              extended[prop] = extend(true, extended[prop], obj[prop]);
            } else {
              extended[prop] = obj[prop];
            }
          }
        }
      };
      for (; i < length; i++) {
        var obj = arguments[i];
        merge(obj);
      }
      return extended;
    };
    const optionsGlobal = extend({
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
        ago: "ago"
      }
    }, optionsUser);

    

    let localFormatTemplates = {
      // Next Update
    };

    let format_dfh = cdt => {
      if (!cdt || !cdt.isValid) return null;
      let obj = cdt
        .until(DateTime.local())
        .toDuration(["years", "months", "days", "hours", "minutes", "seconds"])
        .toObject();
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
      if (a == false) return null;
      return `${a[0]} ${a[1][a[0] > 1 ? 1 : 0]} ${opts.i18n.ago}`;
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
        case "rfc2822": return DateTime.fromRFC2822(a, { zone: sz });
        default: return DateTime.fromFormat(a, sf, { zone: sz });
      }
    };

    const format = (str, optionsFilter = {}, optionsForce = {}) => {
      let options = extend(optionsGlobal, optionsFilter, optionsForce);
      let dt = parse(str, options);
      let a = str,
        cf = options.clientFormat,
        cz = options.clientZone,
        lf = options.localeFormat;
      switch (cf.toLowerCase()) {
        case "diffforhumans":
        case "dfh": return format_dfh(dt);
        case "locale": return dt.toLocaleString(lf);
        case "sql":
        case "laravel": return DateTime.toSQL(a, { zone: sz });
        case "iso": return DateTime.toISO(a, { zone: sz });
        case "http": return DateTime.toHTTP(a, { zone: sz });
        case "jsdate": return DateTime.toJSDate(a, { zone: sz });
        case "rfc2822": return DateTime.toRFC2822(a, { zone: sz });
        default: return dt.toFormat(cf, { zone: cz });
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
      return vueluxon(arguments[0], arguments[1], { clientFormat: "locale" });
    });
    Vue.filter("luxon:diffForHumans", function() {
      return vueluxon(arguments[0], {}, { clientFormat: "diffforhumans" });
    });

    return parse;
  }
};
