const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chalk = require('chalk');
const ora = require('ora');

const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require('../src/ConvertBTC');

describe('ConvertBTC', () => {

  let consoleStub;
  const responseMock = {
    success: true,
    time: '2017-12-28 17:57:58',
    price: 14325.57,
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should use USD as currency and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);
    convertBTC();
    setTimeout(() => {
      expect(consoleStub).to.be.calledWith(`${chalk.magenta(1)} BTC to ${chalk.cyan('USD')} = ${chalk.blue(14325.57)}`);
      done();
    }, 300);
  });

  it('should use USD as currency and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);
    convertBTC('USD', 10);
    setTimeout(() => {
      expect(consoleStub).to.be.calledWith(`${chalk.magenta(10)} BTC to ${chalk.cyan('USD')} = ${chalk.blue(14325.57)}`);
      done();
    }, 300);
  });

  it('should use BRL as currency and 1 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);
    convertBTC('BRL');
    setTimeout(() => {
      expect(consoleStub).to.be.calledWith(`${chalk.magenta(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.blue(14325.57)}`);
      done();
    }, 300);
  });

  it('should message user when api reply with error', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error');

    convertBTC('BRL');
    setTimeout(() => {
      expect(consoleStub).to.be.calledWith(chalk.red('Something went wrong with the API. Try in a few minutes.'));
      done();
    }, 300);
  });
});
