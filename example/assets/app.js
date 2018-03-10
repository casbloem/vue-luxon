

window.Vue = require('vue');


const vueLuxon = require('../../vue-luxon.js');


Vue.use(vueLuxon, {
  serverFormat: 'ISO',
});

const app = new Vue({
  el: '#app',
  data() {
    return {
      fakeServerTime: '2017-04-20T11:32:00.000-04:00', //UTC ISO,
      fakeServerTimeSQL: '2017-04-20 11:32:00', //UTC SQL,
      fakedatetimeString: '2017-04-20 11:32:00',
      sformat: 'sql',
      cformat: 'dd-MM-yyyy',
    }
  }
});

