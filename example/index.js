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
                clientFormat: 'locale'
            },
            datetimeVariable: '2019',
            datetimeVariable: '2019',
        }
    }
});

// to compile:    browserify index.js -o build.js

