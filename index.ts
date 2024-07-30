import { LoggerInit } from "./logger.js";
import { CalcInit } from "./calc.js";

const logger = LoggerInit();

const calc = CalcInit(logger)

console.log(calc.sum(1, 2))
