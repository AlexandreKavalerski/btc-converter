const request = require('request');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'yellow',
});

/* eslint consistent-return: 0 */
function convertBTC(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
  spinner.start();
  request(url, (error, response, body) => {
    let apiResponse;
    spinner.stop();
    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong with the API. Try in a few minutes.'));
      return parseError;
    }
    console.log(`${chalk.magenta(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.blue(apiResponse.price)}`);
  });
}

module.exports = convertBTC;
