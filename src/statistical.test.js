'use strict';

const validator = require('./utils/validator');
const chiSquaredTable = require('./probability/chiSquaredTable');
const StatisticalBase = require('./statistical.base');

class StatisticalTest {
    constructor() {
        this._validator = validator;
        this._chiSquaredProbTable = chiSquaredTable;
        this._base = new StatisticalBase();
    }

    /**
     * Return table of chi squared prob.
     *
     * @returns {*}
     */
    get chiSquaredProbTable() {
        return this._chiSquaredProbTable;
    }

    /**
     * The [χ2 (Chi-Squared) Goodness-of-Fit Test](http://en.wikipedia.org/wiki/Goodness_of_fit#Pearson.27s_chi-squared_test)
     * return if data follow a specified distribution
     *
     * @param {Array} dataSet
     * @param {Function} distributionType
     * @param {number} significance
     * @returns {boolean}
     *
     * @exemple
     * chiSquaredGoodnessOfFit(dataSet, 'poisson', 0.05)); //= false
     */
    chiSquaredGoodnessOfFit(dataSet, distributionType, significance) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        this._validator.validate('distributionType', distributionType, ['isFunction']);
        this._validator.validate('significance', significance, ['isNumber', 'positive']);

        /* Generate an array with number of ocurences for each data in dataSet. */
        let observedFrequencies = [];
        observedFrequencies = dataSet.reduce((accumulator, val) => {
            if (accumulator[val] === undefined) accumulator[val] = 0;
            accumulator[val] += 1;
            return accumulator;
        }, []).filter(v => v !== undefined);

        /* Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test. */
        /* Lose one degree of freedom for estimating `lambda` from the sample data. */
        const dataSetMean = this._base.mean(dataSet);

        /* The hypothesized distribution. Generate the hypothesized distribution. */
        const hypothesizedDistribution = distributionType(dataSetMean);

        /* Create an array holding a histogram of expected data given the */
        /* sample size and hypothesized distribution. */
        let expectedFrequencies = [];
        expectedFrequencies = Object.entries(hypothesizedDistribution).reduce((accumulator, current, i) => {
            if (observedFrequencies[i]) accumulator[i] = current[1] * dataSet.length;
            return accumulator;
        }, []);

        /* Concat frequencies < 3 with the previous one */
        expectedFrequencies = Object.entries(expectedFrequencies).reduceRight((previous, current) => {
            if (previous[1] < 3) current[1] += previous[1];
            return current;
        });

        /* Compute chiSquared value */
        let chiSquared = 0;
        chiSquared = Object.entries(observedFrequencies).reduce((accumulator, current, i) => {
            accumulator += Math.pow((current[1] - expectedFrequencies[i]), 2) / expectedFrequencies[i];
            return accumulator;
        }, chiSquared);

        const c = 1;
        const degreesOfFreedom = Object.keys(observedFrequencies).length - c - 1;

        return this._chiSquaredProbTable[degreesOfFreedom][significance] < chiSquared;
    }
}

module.exports = StatisticalTest;
