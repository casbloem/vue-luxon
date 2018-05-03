"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _require = require("luxon");

var DateTime = _require.DateTime;
var Interval = _require.Interval;

module.exports = {
  vueluxon: function vueluxon(optionsUser) {
    var extend = function extend() {
      var out = {};
      for (var i = 0, len = arguments.length; i < len; ++i) {
        var obj = arguments[i];
        if (!obj) continue;
        for (var key in obj) {
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

    var optionsGlobal = extend({
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
        durations: ["years", "months", "days", "hours", "minutes", "Seconds"]
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
      invalid: function invalid(reason) {
        return "invalid: " + reason;
      }
    }, optionsUser);

    var formatTemplates = {
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
      time24seconds: DateTime.TIME_24_WITH_SECONDS
    };

    var clientFormats = {};

    var trans = function trans(nameRaw, amountRaw, parser, options) {
      var amount = Math.round(amountRaw);
      var name = nameRaw.slice(0, -1);
      var variants = options.i18n[name].split("|");
      var amount_name = options.i18n.lang == "en-EN" ? amount == 1 ? "one" : "other" : new Intl.PluralRules(options.i18n.lang).select(amount);

      var str = "";
      for (var i = 0; variants.length > i; i++) {
        if (variants[i].match(/\[\w+\]/) == "[" + amount_name + "]") str = variants[i].replace(/\[\w+\]/, "");
      }
      return parser.replace(/\:a/, amount).replace(/\:ago/, options.i18n.ago).replace(/\:in/, options.i18n.in).replace(/\:w/, str);
    };

    var format_dfh = function format_dfh(cdt, options) {
      if (!cdt || !cdt.isValid) return optionsGlobal.invalid(cdt.invalid);

      var from = cdt;
      var till = DateTime.local().setLocale(options.serverZone);
      var p = from.until(till),
          f = till.until(from);
      var c = p.isValid ? p : f.isValid ? f : false;
      if (c == false) return optionsGlobal.invalid(cdt.invalid);
      var obj = c.toDuration(options.diffForHumans ? options.diffForHumans.durations : []).toObject();
      var closestName = Object.getOwnPropertyNames(obj)[0];
      var isNow = obj[closestName] < 1;
      return trans(closestName, obj[closestName], p.isValid && !isNow ? options.diffForHumans.past : !isNow ? options.diffForHumans.future : options.diffForHumans.now, options);
    };

    var parse = function parse(str, options) {
      if (!str) return "never";
      var a = str,
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

    var parseLocaleLang = function parseLocaleLang(str) {
      if (!str || str == "locale") return null;
      return str;
    };

    var parseLocaleFormat = function parseLocaleFormat(str) {
      if (typeof str == "string") {
        return formatTemplates[str.toLowerCase()] || formatTemplates[0];
      }
      return str;
    };

    var parseClientFormat = function parseClientFormat(str) {
      return str;
    };

    var argToOpts = function argToOpts(arg) {
      var argDown = arg.toLowerCase();
      if (formatTemplates.hasOwnProperty(argDown)) return { clientFormat: 'locale', localeFormat: argDown };
      if (argDown == 'humanize') return { humanize: { clientFormat: "dfh" } };
    };

    var modsToOpts = function modsToOpts(mods) {
      var r = {};
      var y = {
        endofday: "parseApply",
        endofmonth: "parseApply"
      };

      for (var i in mods) {
        if (y.hasOwnProperty(mods[i])) r[y[mods[i]]] = mods[i];
      }return r;
    };

    var format = function format(str) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? optionsGlobal : arguments[1];

      options.value = str;
      var dt = parse(str, options);
      var dtp = null;
      if (dt.isValid == false) return optionsGlobal.invalid(dt.invalid);
      var a = str,
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
        case "laravel":
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
        default:
          return dt.toFormat(cf);
          break;
      }
    };

    return function (str, optionsFilter, optionsForce) {
      var binding = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if ((typeof str === "undefined" ? "undefined" : _typeof(str)) == "object") {
        optionsFilter = str;
        str = str.value;
      }

      var optionsMods = {};
      var optionsArg = {};
      if (binding != false) {
        if (binding.modifiers) optionsMods = modsToOpts(Object.keys(binding.modifiers));
        if (binding.arg) optionsArg = argToOpts(binding.arg);
      }

      var options = extend(optionsGlobal, optionsFilter, optionsMods, optionsArg, optionsForce);
      return format(str, options);
    };
  },
  install: function install(Vue, optionsUser) {
    var vueluxon = module.exports.vueluxon(optionsUser);

    Vue.filter("luxon", function () {
      return vueluxon(arguments[0], arguments[1]);
    });
    Vue.filter("luxon:format", function () {
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: arguments[1]
      });
    });
    Vue.filter("luxon:locale", function () {
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: "locale",
        localeFormat: arguments[1]
      });
    });
    Vue.filter("luxon:diffForHumans", function () {
      return vueluxon(arguments[0], arguments[2], {
        clientFormat: "diffforhumans",
        diffForHumans: arguments[1]
      });
    });

    Vue.directive("luxon", function (el, binding) {
      el.innerHTML = vueluxon(binding.value, {}, {}, binding);
    });
  }
};