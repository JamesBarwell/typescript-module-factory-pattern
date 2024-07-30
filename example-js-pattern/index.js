const Logger = require('./logger');
const Calc = require('./calc');

// Initialise logger
const logger = Logger();

// Initialise module, injecting the logger dependency
const calc = Calc(logger);

// Run module
console.log(calc.sum(1, 2))
