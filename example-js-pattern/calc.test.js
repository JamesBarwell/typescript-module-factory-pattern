const assert = require('node:assert');
const test = require('node:test');

const Calc = require('./calc');

test('Javascript - it should sum two numbers', () => {
  const loggerMock = {
    info: () => {},
  }

  const calc = Calc(loggerMock);

  const result = calc.sum(1, 1);

  assert.equal(result, 2);
});
