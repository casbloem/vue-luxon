const Vue = require('vue');
const vueLuxon = require('../vue-luxon.js');

Vue.use(vueLuxon);

   
const app = new Vue({
    el: '#vue',
    data() {
        return {
            datetimeObject: {
                value: '1994-05-10 21:08',
                serverZone: 'utc',
                serverFormat: 'sql',
                clientZone: 'America/New_York',
                clientFormat: 'locale',
                localeLang: null,
                localeFormat: 'dd-MM',
            },
            datetimeVariable: '2019-02-23T03:32',
            localeFormatKeys: ["short", "med", "timesimple", "timewithseconds", "timeWithShortOffset", "timeWithLongOffset", "time24Simple", "time24WithSeconds", "time24WithShortOffset", "time24WithLongOffset", "datetimeShort", "datetimeShortWithSeconds", "datetimeMed", "medWithSeconds", "full", "fullWithSeconds", "huge", "hugeWithSeconds"],
            
        }
    }
});

// to compile:    browserify index.js -o build.js

