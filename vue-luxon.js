let {
  DateTime,
  Interval
} = require("luxon");
module.exports = {
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
        clientZone: "locale",
        clientFormat: "locale",
        localeLang: null,
        localeFormat: {
          year: "numeric",
          month: "long",
          day: "numeric"
        },
        parseApply: null,
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
          second: "[one]second|[other]Seconds",
          ago: "ago",
          in: "in"
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

    const clientFormats = {};

    const trans = (nameRaw, amountRaw, parser, options) => {
      let amount = Math.round(amountRaw);
      let name = nameRaw.slice(0, -1);
      let variants = options.i18n[name].split("|");
      let amount_name =
        options.i18n.lang == "en-EN" ?
        amount == 1 ? "one" : "other" :
        new Intl.PluralRules(options.i18n.lang).select(amount);

      let str = "";
      for (let i = 0; variants.length > i; i++) {
        if (variants[i].match(/\[\w+\]/) == "[" + amount_name + "]")
          str = variants[i].replace(/\[\w+\]/, "");
      }
      return parser
        .replace(/\:ago/, options.i18n.ago)
        .replace(/\:in/, options.i18n.in)
        .replace(/\:a/, amount)
        .replace(/\:w/, str);
    };

    const format_dfh = (cdt, options) => {
      if (!cdt || !cdt.isValid) return optionsGlobal.invalid(cdt.invalid);

      let from = cdt;
      let till = DateTime.local().setZone(options.serverZone);
      let p = from.until(till),
        f = till.until(from);
      let c = p.isValid ? p : f.isValid ? f : false;
      if (c == false) return optionsGlobal.invalid(cdt.invalid);
      let obj_u = c
        .toDuration(
          options.diffForHumans ? options.diffForHumans.durations : []
        )
        .toObject();
      let obj = {};
      for (key in obj_u) {
        if (obj_u[key] > 0) obj[key] = obj_u[key];
      }
      let closestName = Object.getOwnPropertyNames(obj)[0];
      let isNow = obj[closestName] < 1;
      return trans(
        closestName,
        obj[closestName],
        p.isValid && !isNow ?
        options.diffForHumans.past :
        !isNow ? options.diffForHumans.future : options.diffForHumans.now,
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
      if (!str || str == "locale") return null;
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


    const argToOpts = arg => {
      let argDown = arg.toLowerCase();
      if (formatTemplates.hasOwnProperty(argDown)) return {
        clientFormat: 'locale',
        localeFormat: argDown
      };
      if (argDown == 'humanize') return {
        humanize: {
          clientFormat: "dfh"
        }
      };
    };

    const modsToOpts = mods => {
      let r = {};
      let y = {
        endofday: "parseApply",
        endofmonth: "parseApply"
      };


      for (let i in mods)
        if (y.hasOwnProperty(mods[i])) r[y[mods[i]]] = mods[i];

      return r;
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

      if (options.parseApply != null) {
        switch (options.parseApply.toLowerCase()) {
          case "endofday":
            dt = dt.endOf("day");
            break;
          case "endofmonth":
            dt = dt.endOf("month");
            break;
        }
      }

      if (dt == 'never') return '[invalid]';


      if (options.clientZone != "locale") dt = dt.setZone(cz);
      switch (cf.toLowerCase()) {
        case "diffforhumans":
        case "dfh":
          return format_dfh(dt, options);
          break;
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

    return (str, optionsFilter, optionsForce, binding = false) => {
      if (str && typeof str == "object") {
        optionsFilter = str;
        str = str.value;
      }

      let optionsMods = {};
      let optionsArg = {};
      if (binding != false) {
        if (binding.modifiers)
          optionsMods = modsToOpts(Object.keys(binding.modifiers));
        if (binding.arg) optionsArg = argToOpts(binding.arg);
      }

      let options = extend(
        optionsGlobal,
        optionsFilter,
        optionsMods,
        optionsArg,
        optionsForce
      );
      return format(str, options);
    };
  },
  install: function (Vue, optionsUser) {
    let vueluxon = module.exports.vueluxon(optionsUser);

    Vue.filter("luxon", function () {
      return vueluxon(arguments[0], arguments[1]);
    });

    const Format = function () {
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: arguments[1]
      });
    };
    Vue.filter("luxon:format", Format);
    Vue.filter("luxonFormat", Format);

    const Locale = function () {
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: "locale",
        localeFormat: arguments[1]
      });
    };
    Vue.filter("luxon:locale", Locale);
    Vue.filter("luxonLocale", Locale);

    const RelativeFormat = function () {
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: "diffforhumans",
        diffForHumans: arguments[1]
      });
    };
    Vue.filter("luxon:diffForHumans", RelativeFormat);
    Vue.filter("luxonDiffForHumans", RelativeFormat);
    Vue.filter("luxonRelative", RelativeFormat);

    Vue.directive("luxon", (el, binding) => {
      el.innerHTML = vueluxon(binding.value, {}, {}, binding);
    });
  }
};