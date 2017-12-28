const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

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

  // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
  it('should use USD as currency and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);
    convertBTC();
    setTimeout(() => {
      expect(consoleStub).to.be.calledWith('1 BTC to USD = 14325.57');
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
      expect(consoleStub).to.be.calledWith('10 BTC to USD = 14325.57');
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
      expect(consoleStub).to.be.calledWith('1 BTC to BRL = 14325.57');
      done();
    }, 300);
  });
});
