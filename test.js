const chalk = require('chalk');

module.exports = {
    initialStarter() {
        const log = (str) => {
            console.log(chalk.blue.bgWhite(str+'\n'));
        }
        log('js-tester 0.0.1 by cblm dev\n');
        log('starting setup...');
        log('importing package(s)\n');
        // import package
        const vueLuxon = require('./vue-luxon.js').vueluxon();



        log('setup completed, starting tests now...');

        const tests = [
            {
                input: vueLuxon('2012', {
                    serverZone: "UTC",
                    serverFormat: "yyyy",
                    clientZone: "UTC",
                    clientFormat: "yyyy", }),
                expected_output: '2012',
            }
        ]
        
        for(let i = 0; i < tests.length; i++) {
            let test = tests[i];
            if (test.input == test.expected_output) log('TEST '+ i +' SUCCESS');
            else log('TEST '+key+' FAILED');
        }
    

        

        console.log('Testing completed!');

        return true;
    }
}