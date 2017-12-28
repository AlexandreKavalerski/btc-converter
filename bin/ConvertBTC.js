'use strict';

var request = require('request');
var chalk = require('chalk');

/* eslint consistent-return: 0 */
function convertBTC() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var url = 'https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=' + currency + '&amount=' + amount;
  request(url, function (error, response, body) {
    var apiResponse = void 0;
    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong with the API. Try in a few minutes.'));
      return parseError;
    }
    console.log(chalk.magenta(amount) + ' BTC to ' + chalk.cyan(currency) + ' = ' + chalk.blue(apiResponse.price));
  });
}

module.exports = convertBTC;