import { Logger } from "./logger.js";

function CalcInit(logger: Logger) {
    return {
        sum,
    }

    function sum(a: number, b: number): number {
        logger.info(`Start summing numbers ${a} and ${b}`);
        const result = a + b;
        logger.info(`Finish summing, result was ${result}`);
        return result;
    }
}

export { CalcInit };
export type Calc = ReturnType<typeof CalcInit>;
