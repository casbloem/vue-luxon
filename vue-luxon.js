import { DateTime, Interval } from "luxon";
export default (Vue, options) => {
      let opts = Object(options);
      let optionsDefault = {
        serverZone: 'UTC',
        serverFormat: 'U',
        clientZone: 'local',
        clientFormat: 'local',
        beforeParse: (str) => {},
        i18n: {
          year: ['year', 'years'],
          month: ['month', 'months'],
          day: ["day", "days"],
          hour: ["hour", "hours"],
          minute: ["minute", "minutes"],
          second: ["second", "seconds"],
          ago: "ago"
        }
      };
      for (const key in optionsDefault) {
        const value = opts[key];
        if (value === undefined || !hasOwnProperty.call(opts, key)) {
          opts[key] = optionsDefault[key];
        }
      }

      let parse = (str) => {
        let a = str,
            sf = opts.serverFormat,
            sz = opts.serverZone;

        switch(sf.toLowerCase()) {
          case 'sql':
          case 'laravel':
            return DateTime.fromSQL(a, { zone: sz });
          case 'iso':
            return DateTime.fromISO(a, { zone: sz });
          case 'http':
            return DateTime.fromHTTP(a, { zone: sz });
          case 'jsdate':
            return DateTime.fromJSDate(a, { zone: sz });
          default:
            return DateTime.fromFormat(a, sf, { zone: sz });
        }
      }
    
      let dtObj = {
        toFormat(string, format) {
          return parse(string).toFormat(format);
        },
        toLocale(string) {
          return parse(string).toLocaleString();
        },
        diffForHumans(string) {
          let cdt = parse(string);
          if (!cdt || !cdt.isValid) return null;
          let obj = cdt
            .until(DateTime.local())
            .toDuration(["years", "months", "days", "hours", "minutes", "seconds"])
            .toObject();
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
        }
      };

      Vue.filter("format", function(d, format) {
        return dtObj.toFormat(d, format);
      });

      Vue.filter("locale", function(d) {
        return dtObj.toLocale(d);
      });

      Vue.filter("diffForHumans", function(d) {
        return dtObj.diffForHumans(d);
      });
}
    
