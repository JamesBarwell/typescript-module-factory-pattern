import assert from 'node:assert';
import test from 'node:test';

import { Logger } from "./logger.js";
import { CalcInit }  from './calc.js';

test('Typescript - it should sum two numbers', () => {
  const loggerMock = {
    info: () => {},
  } as Logger

  const calc = CalcInit(loggerMock);

  const result = calc.sum(1, 1);

  assert.equal(result, 2);
});
