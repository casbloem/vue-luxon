let { DateTime, Interval } = require("luxon");
module.exports = {
  install: function(Vue, optionsUser) {
<<<<<<< HEAD
    const extend = function() {
      let out = {};
      for (let i = 0, len = arguments.length; i < len; ++i) {
        let obj = arguments[i];
=======
   const extend = function() {
      let out = {};
      for (var i = 0, len = arguments.length; i < len; ++i) {
        var obj = arguments[i];
>>>>>>> 2a9be10d70e96d6ca02b581ef40350c839225b0c
        if (!obj) continue;
        for (let key in obj) {
          if (!obj.hasOwnProperty(key)) continue;
          if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
            out[key] = extend(out[key], obj[key]);
            continue;
          }
          out[key] = obj[key];
        }
      }
      return out;
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
        diffForHumans: {
          past: ":a :w :ago",
          now: "just now",
          future: ":in :a :w",
          durations: ["years", "months", "days", "hours", "minutes", "seconds"]
        },
        i18n: {
          lang: "en-EN",
          year: "[one]year|[other]years",
          month: "[one]month|[other]months",
          week: "[one]week|[other]weeks",
          day: "[one]day|[other]days",
          hour: "[one]hour|[other]hours",
          minute: "[one]minute|[other]minutes",
          second: "[one]second|[other]seconds",
          ago: "ago",
          in: "in"
        },
        invalid: reason => {
          return `invalid: ${reason}`;
        }
      },
      optionsUser
    );

    const trans = (nameRaw, amountRaw, parser, options) => {
      let amount = Math.round(amountRaw);
      let name = nameRaw.slice(0, -1);
      let variants = options.i18n[name].split("|");
      let amount_name =
        options.i18n.lang == "en-EN"
          ? amount == 1 ? "one" : "other"
          : new Intl.PluralRules(options.i18n.lang).select(amount);

      let str = "";
      for (let i = 0; variants.length > i; i++) {
        if (variants[i].match(/\[\w+\]/) == "[" + amount_name + "]")
          str = variants[i].replace(/\[\w+\]/, "");
      }
      return parser
        .replace(/\:a/, amount)
        .replace(/\:ago/, options.i18n.ago)
        .replace(/\:in/, options.i18n.in)
        .replace(/\:w/, str);
    };

    const format_dfh = (cdt, options) => {
      if (!cdt || !cdt.isValid) return optionsGlobal.invalid(cdt.invalid);

      let from = cdt;
      let till = DateTime.local();
      let p = from.until(till),
        f = till.until(from);
      let c = p.isValid ? p : f.isValid ? f : false;
      if (c == false) return optionsGlobal.invalid(cdt.invalid);
      let obj = c
        .toDuration(
          options.diffForHumans ? options.diffForHumans.durations : []
        )
        .toObject();
      let closestName = Object.getOwnPropertyNames(obj)[0];
      let isNow = obj[closestName] < 1;
      return trans(
        closestName,
        obj[closestName],
        p.isValid && !isNow
          ? options.diffForHumans.past
          : !isNow ? options.diffForHumans.future : options.diffForHumans.now,
        options
      );
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
          return format_dfh(dt, options);
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
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: "diffforhumans",
        diffForHumans: extend(optionsGlobal.diffForHumans, arguments[1])
      });
    });

    //return DateTime;
  }
};
