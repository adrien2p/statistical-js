'use strict';
const validator = require('./utils/validator');
const epsilon = require('./probability/epsilon');
const chiSquaredTable = require('./probability/chiSquaredTable');
const StatisticalBase = require('./statistical.base');


class StatisticalDistribution {
    constructor() {
        this._validator = validator;
        this._epsilon = epsilon;
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
     * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution)
     *
     * @param {number} trials
     * @param {number} probability
     * @returns {{}}
     */
    binomial(trials, probability) {
        this._validator.validate('trials', trials, ['isNumber']);
        this._validator.validate('probability', probability, ['isNumber', [0, 1]]);

        let x = 0;
        let cumulativeProbability = 0;
        const cells = {};

        do {
            cells[x] = this._base.factorial(trials) / (this._base.factorial(x) * this._base.factorial(trials - x)) * (Math.pow(probability, x) * Math.pow(1 - probability, trials - x));
            cumulativeProbability += cells[x];
            x++;
        } while (cumulativeProbability < 1 - this._epsilon);

        return cells;
    }

    /**
     * The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution)
     *
     * @param {number} p
     * @returns {Object}
     */
    bernoulli(p) {
        this._validator.validate('p', p, ['isNumber', [0, 1]]);
        return this.binomial(1, p);
    }

    /**
     * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution)
     *
     * @param {number} lambda
     * @returns {{}}
     */
    poisson(lambda) {
        this._validator.validate('lambda', lambda, ['strictlyPositive']);

        let x = 0;
        let cumulativeProbability = 0;
        let cells = {};

        do {
            cells[x] = (Math.pow(Math.E, -lambda) * Math.pow(lambda, x)) / this._base.factorial(x);
            cumulativeProbability += cells[x];
            x++;
        } while (cumulativeProbability < 1 - this._epsilon);

        return cells;
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
            accumulator[val] +=1 ;
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

module.exports = StatisticalDistribution;
