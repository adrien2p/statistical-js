'use strict';

const validator = require('./utils/validator');
const epsilon = require('./probability/epsilon');
const chiSquaredTable = require('./probability/chiSquaredTable');

class StatisticalMethod {
    constructor() {
        this._validator = validator;
        this._chiSquaredProbTable = chiSquaredTable;
        this._epsilon = epsilon;
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
     * Return the smallest value of the dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    min(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        return dataSet.sort((a, b) => a - b)[0];
    }

    /**
     * Return the biggest value of the dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    max(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        return dataSet.sort((a, b) => a + b)[0];
    }


    /**
     * The [Sum](https://en.wikipedia.org/wiki/Sum).
     *
     * @param dataSet
     * @returns {*}
     */
    sum(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        return dataSet.reduce((accumulator, current) => accumulator + current, 0);
    }

    /**
     * The [Median](https://en.wikipedia.org/wiki/Median).
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    median(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        const middle = Math.floor(dataSet.length / 2);
        const isEven = dataSet.length % 2 === 0;

        dataSet = dataSet.sort((a, b) => a - b);

        return isEven ? (dataSet[middle - 1] + dataSet[middle]) / 2 : dataSet[middle];
    }

    /**
     * The [Mode](https://en.wikipedia.org/wiki/Mode).
     *
     * @param {Array} dataSet
     * @returns {*}
     */
    mode(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        const counter = {};
        let mode = [];
        let max = 0;

        dataSet.map((value, index) => {
            if (!(dataSet[index] in counter)) counter[dataSet[index]] = 0;

            counter[dataSet[index]]++;

            if (counter[dataSet[index]] === max) mode.push(dataSet[index]);
            if (counter[dataSet[index]] > max) {
                max = counter[dataSet[index]];
                mode = [dataSet[index]];
            }
        });

        return mode.length > 1 ? mode : mode[0];
    }

    /**
     * The [Mean](https://en.wikipedia.org/wiki/Mean).
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    mean(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        return this.sum(dataSet) / dataSet.length;
    }

    /**
     * The [Variance](https://en.wikipedia.org/wiki/Variance).
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    variance(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        const avg = this.mean(dataSet);
        const n = dataSet.length;

        return this.sum(dataSet.map(value => Math.pow(value - avg, 2))) / n;
    }

    /**
     * The [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation).
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    stdDeviation(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        return Math.sqrt(this.variance(dataSet));
    }

    /**
     * The [Quantile](http://en.wikipedia.org/wiki/Quantile).
     *
     * @param {Array} dataSet
     * @param {number} index
     * @returns {Array}
     */
    quantile(dataSet, index = null) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        dataSet = dataSet.sort((a, b) => a - b);
        return !index ?
            [1, 2, 3, 4].map(i => dataSet[Math.ceil((dataSet.length * (i / 4))) - 1]) :
            dataSet[Math.ceil((dataSet.length * (index / 4)) - 1)];
    }

    /**
     * The [Percentile](https://en.wikipedia.org/wiki/Percentile).
     *
     * @param {Array} dataSet
     * @param {number} index
     * @returns {Array}
     */
    percentile(dataSet, index = null) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        dataSet = dataSet.sort((a, b) => a - b);
        return !index ? Array.from({length: 99}, (v, k) => k + 1).map(i => dataSet[i]) : dataSet[Math.ceil((index / 100) * dataSet.length)];
    }

    /**
     * Return the entire result of descriptives statistics above.
     *
     * @param {Array} dataSet
     * @returns {{min: number, max: number, sum: *, median: number, mode: *, mean: number, variance: number, stdDeviation: number, quantile: Array}}
     */
    summary(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        return {
            min: this.min(dataSet),
            max: this.max(dataSet),
            sum: this.sum(dataSet),
            median: this.median(dataSet),
            mode: this.mode(dataSet),
            mean: this.mean(dataSet),
            variance: this.variance(dataSet),
            stdDeviation: this.stdDeviation(dataSet),
            quantile: this.quantile(dataSet)
        };
    }

    /**
     * The [Factorial](https://en.wikipedia.org/wiki/Factorial).
     *
     * @param {number} n
     * @returns {number}
     */
    factorial(n) {
        this._validator.validate('n', n, ['isNumber', 'positive']);

        let factorialResult = 1;
        for (let i = 2; i <= n; i++) {
            factorialResult *= i;
        }

        return factorialResult;
    }

    /**
     * The [Geometric Mean](https://en.wikipedia.org/wiki/Geometric_mean).
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    geometricMean(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        return Math.pow(dataSet.reduce((accumulator, current) => accumulator * current, 1), 1 / dataSet.length);
    }

    /**
     * The [Harmonic Mean](https://en.wikipedia.org/wiki/Harmonic_mean).
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    harmonicMean(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        return dataSet.length / dataSet.reduce((accumulator, current) => accumulator + (1 / current), 0);
    }

    /**
     * The [Variance](https://en.wikipedia.org/wiki/Harmonic_mean).
     * The [Biais](https://fr.wikipedia.org/wiki/Estimateur_(statistique)#Biais).
     *
     * Non biased variance
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    sampleVariance(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        const avg = this.mean(dataSet);
        const n = dataSet.length - 1;

        return this.sum(dataSet.map(value => Math.pow(value - avg, 2))) / n;
    }

    /**
     * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution).
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
     * The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution).
     *
     * @param {number} p
     * @returns {Object}
     */
    bernoulli(p) {
        this._validator.validate('p', p, ['isNumber', [0, 1]]);
        return this.binomial(1, p);
    }

    /**
     * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution).
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
     * The [χ2 (Chi-Squared) Goodness-of-Fit Test](http://en.wikipedia.org/wiki/Goodness_of_fit#Pearson.27s_chi-squared_test).
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
        const dataSetMean = this.mean(dataSet);

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

    /**
     * The [a one-sample t-test](https://en.wikipedia.org/wiki/Student%27s_t-test#One-sample_t-test).
     *
     * @param {Array} dataSet
     * @param {number} mu
     * @returns {number}
     */
    tTestOneSample(dataSet, mu) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        this._validator.validate('mu', mu, ['isNumber']);

        const mean = this.mean(dataSet);
        const sd = this.stdDeviation(dataSet);
        const sqrtSampleSize = Math.sqrt(dataSet.length);

        /* t-value */
        return (mean - mu) / (sd / sqrtSampleSize);
    }

    /**
     * The [two sample t-test](http://en.wikipedia.org/wiki/Student's_t-test).
     *
     * @param {Array} dataSet1
     * @param {Array} dataSet2
     * @returns {number}
     */
    tTestTwoSample(dataSet1, dataSet2) {
        this._validator.validate('dataSet1', dataSet1, ['isArray', 'length > 0']);
        this._validator.validate('dataSet2', dataSet2, ['isArray', 'length > 0']);

        const n = dataSet1.length;
        const m = dataSet2.length;
        const meanX = this.mean(dataSet1);
        const meanY = this.mean(dataSet2);
        const sampleVarianceX = this.sampleVariance(dataSet1);
        const sampleVarianceY = this.sampleVariance(dataSet2);

        const weightedVariance = (((n - 1) * sampleVarianceX) + ((m - 1) * sampleVarianceY)) / (n + m - 2);

        /* t-value */
        return (meanX - meanY) / Math.sqrt(weightedVariance * (1 / (n + 1) / m));
    }
}

module.exports = StatisticalMethod;
