import { DateTime, Interval } from "luxon";
export default (Vue, Options) => {
      let objns = Object(options);
      let optionsDefault = {
        i18n: {
          year: ["jaar", "jaar"],
          month: ["maand", "maanden"],
          day: ["dag", "dagen"],
          hour: ["uur", "uren"],
          minute: ["minuut", "minuten"],
          second: ["seconden", "seconden"],
          ago: "geleden"
        }
      };
      for (const key in optionsDefault) {
        const value = options[key];
        if (value === undefined || !hasOwnProperty.call(options, key)) {
          options[key] = optionsDefault[key];
        }
      }
    
      let dtObj = {
        cdt: null,
        parseString(string) {
          this.cdt = DateTime.fromISO(string);
          return this;
        },
        diffForHumans() {
          let cdt = this.cdt;
          if (!cdt || !cdt.isValid) return null;
          let obj = cdt
            .until(DateTime.local())
            .toDuration(["years", "months", "days", "hours", "minutes", "seconds"])
            .toObject();
          let a = obj.years
            ? [obj.years, objns.i18n.year]
            : obj.months
              ? [obj.months, objns.i18n.month]
              : obj.days
                ? [obj.days, objns.i18n.day]
                : obj.hours
                  ? [obj.hours, objns.i18n.hour]
                  : obj.minutes
                    ? [obj.minutes, objns.i18n.minute]
                    : obj.seconds ? [obj.seconds, objns.i18n.second] : false;
          if (a == false) return null;
    
          return `${a[0]} ${a[1][a[0] > 1 ? 1 : 0]} ${objns.i18n.ago}`;
        }
      };
      Vue.filter("diffForHumans", function(d) {
        let dt = dtObj.parseString(d);
        return dt.diffForHumans();
      });
}
    
