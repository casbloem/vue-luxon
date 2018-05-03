module.exports = {
  initialStarter() {
    const log = str => {
      console.log(str);
    };
    log("js-tester 0.0.1 by cblm dev\n");
    log("starting setup...");
    log("importing package(s)\n");
    const vueLuxon = require("./vue-luxon.js").vueluxon();

    log("setup completed, starting tests now...");

    const tests = [
      {
        input: vueLuxon("2012", {
          serverZone: "UTC",
          serverFormat: "yyyy",
          clientZone: "UTC",
          clientFormat: "yyyy"
        }),
        expected_output: "2012"
      },
      {
        input: vueLuxon("2011-04-02", {
          serverZone: "UTC",
          serverFormat: "yyyy-MM-dd",
          clientZone: "Europe/Amsterdam",
          clientFormat: "yy-dd-MM"
        }),
        expected_output: "11-02-04"
      },
      {
        input: vueLuxon('2011-04-09 03:42', {
          serverZone: "UTC",
          serverFormat: "yyyy-MM-dd hh:mm",
          clientZone: "UTC",
          clientFormat: "dfh"
        }),
        expected_output: "7 years ago"//iknow
      }
    ];

    log("---------------------------------------");

    var fails = 0;
    for (var i = 0; i < tests.length; i++) {
      let test = tests[i];
      log("> expects: " + test.expected_output);
      log("> gets: " + test.input);
      if (test.input == test.expected_output) log("TEST " + i + " SUCCESS");
      else {
        fails++;
        log("TEST " + i + " FAILED");
      }
      log("---------------------------------------");
    }

    return "Testing completed! (" + i + " tests, " + fails + " failed)";
  }
};
