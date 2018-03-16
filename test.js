const chalk = require('chalk');

module.exports = {
    initialStarter() {
        console.log(chalk.green(chalk.blue.underline.bold('js-tester 0.0.1') + ' by cblm dev\n\n'));
        console.log(chalk.blue.bgBlue.bold('starting setup...\n'));
        console.log(chalk.blue.bgWhite.bold('importing package(s)\n'));
        // import package
        const vueLuxon = require('./vue-luxon.js').vueluxon();



        console.log(chalk.blue.bgBlue.bold('Setup completed, starting tests now...\n\n'));

        console.log(
            vueLuxon('2012')
        );

        

        console.log(chalk.blue.bgGreen.bold('Testing completed!'));

        return true;
    }
}