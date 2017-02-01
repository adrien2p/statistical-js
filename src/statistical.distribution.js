'use strict';

const chiSquaredTable = require('./probability/chiSquaredTable');
const StatisticalBase = require('./statistical.base');


class StatisticalDistribution extends StatisticalBase {
    constructor() {
        super();
        this._chiSquaredProbTable = chiSquaredTable;
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
            cells[x] = this.factorial(trials) / (this.factorial(x) * this.factorial(trials - x)) * (Math.pow(probability, x) * Math.pow(1 - probability, trials - x));
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
            cells[x] = (Math.pow(Math.E, -lambda) * Math.pow(lambda, x)) / this.factorial(x);
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

        const dataSetMean = this.mean(dataSet);

        /* Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test. */
        /* Lose one degree of freedom for estimating `lambda` from the sample data. */
        const c = 1;

        /* The hypothesized distribution. Generate the hypothesized distribution. */
        const hypothesizedDistribution = distributionType(dataSetMean);

        let chiSquared = 0;
        let degreesOfFreedom;

        /* Generate an array with number of ocurences for each data in dataSet. */
        const observedFrequencies = dataSet.reduce((res, val) => {
            if (!res[val]) res[val] = 0;
            return res[val]++;
        }, {});

        /* Create an array holding a histogram of expected data given the */
        /* sample size and hypothesized distribution. */
        let expectedFrequencies = hypothesizedDistribution.reduce((res, val) => {
            if (observedFrequencies[val]) expectedFrequencies[+val] = val * dataSet.length;
        }, {});

        /* Concat frequencies < 3 with the previous one */
        expectedFrequencies = expectedFrequencies.reduceRight((previous, current, i) => {
            if (previous < 3) current += previous;
            return current;
        });

        /* Compute chiSquared value */
        observedFrequencies.reduce((accumulator, current, i) => {
            accumulator += Math.pow((current - expectedFrequencies[i]), 2) / expectedFrequencies[i];
            return accumulator;
        }, chiSquared);

        degreesOfFreedom = observedFrequencies.length - c - 1;

        return this._chiSquaredProbTable[degreesOfFreedom][significance] < chiSquared;
    }
}

module.exports = StatisticalDistribution;
