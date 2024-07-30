module.exports = function(logger) {
    return {
        sum,
    }

    function sum(a, b) {
        logger.info(`Start summing numbers ${a} and ${b}`);
        const result = a + b;
        logger.info(`Finish summing, result was ${result}`);
        return result;
    }
}
