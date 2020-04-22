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
            localeFormatKeys: ['full', 'fullS', 'huge', 'hugeS', 'med', 'medS', 'short', 'shortS', 'date_full', 'date_huge', 'date_med', 'dateShort'
                                    , 'time24simple', 'time24longoffset' ],
            
        }
    }
});

// to compile:    npm run dev
// or		  npm run prod

