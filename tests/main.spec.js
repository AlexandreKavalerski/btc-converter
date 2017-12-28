const expect = require('chai').expect;
const exec = require('child_process').exec;
const pkg = require('../package.json');

const btcConverter = 'node.exe ./src/main.js';
describe('Main CLI', () => {
  it('should return version when btc-conv --version', (done) => {
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });

  it('should return the description when btc-conv --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('A CLI to convert Bitcoin to any currency')).to.be.true;
      done();
    });
  });

  it('should return the currency option when btc-conv --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--currency')).to.be.true;
      done();
    });
  });
  
  it('should return the amount option when btc-conv --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--amount')).to.be.true;
      done();
    });
  });
});
