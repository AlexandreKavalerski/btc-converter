const request = require('request');

/* eslint consistent-return: 0 */
function convertBTC(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
  request(url, (error, response, body) => {
    let apiResponse;
    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log('Something went wrong with the API. Try in a few minutes.');
      return parseError;
    }
    console.log(`${amount} BTC to ${currency} = ${apiResponse.price}`);
  });
}

module.exports = convertBTC;
