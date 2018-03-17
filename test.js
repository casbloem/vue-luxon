const chalk = require('chalk');

module.exports = {
    initialStarter() {
        const log = (str) => {
            console.log(chalk.blue.bgWhite(str+'\n'));
        }
        log(chalk.green(chalk.blue.underline.bold('js-tester 0.0.1') + ' by cblm dev\n'));
        log(chalk.blue.bgBlue.bold('starting setup...'));
        log(chalk.blue.bgWhite.bold('importing package(s)\n'));
        // import package
        const vueLuxon = require('./vue-luxon.js').vueluxon();



        console.log(chalk.blue.bgBlue.bold('Setup completed, starting tests now...'));

        console.log(
            vueLuxon('2012')
        );

        

        console.log(chalk.blue.bgGreen.bold('Testing completed!'));

        return true;
    }
}