'use strict';

import Validator from './utils/validator';
import epsilon from './probability/epsilon';
import chiSquaredTable from './probability/chiSquaredTable';

export default class StatisticalMethod {
    constructor() {
        this._validator = new Validator();
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
     * Return the smallest value of the sample.
     *
     * @param {Array} sample
     * @returns {Number}
     */
    min(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        return sample.sort((a, b) => a - b)[0];
    }

    /**
     * Return the biggest value of the sample.
     *
     * @param {Array} sample
     * @returns {Number}
     */
    max(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        return sample.sort((a, b) => a + b)[0];
    }


    /**
     * The [Sum](https://en.wikipedia.org/wiki/Sum).
     *
     * @param sample
     * @returns {*}
     */
    sum(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        return sample.reduce((accumulator, current) => accumulator + current, 0);
    }

    /**
     * The [Median](https://en.wikipedia.org/wiki/Median).
     *
     * @param {Array} sample
     * @returns {Number}
     */
    median(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);

        const middle = Math.floor(sample.length / 2);
        const isEven = sample.length % 2 === 0;

        sample = sample.sort((a, b) => a - b);

        return isEven ? (sample[middle - 1] + sample[middle]) / 2 : sample[middle];
    }

    /**
     * The [Mode](https://en.wikipedia.org/wiki/Mode).
     *
     * @param {Array} sample
     * @returns {*}
     */
    mode(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);

        const counter = {};
        let mode = [];
        let max = 0;

        sample.map((value, index) => {
            if (!(sample[index] in counter)) counter[sample[index]] = 0;

            counter[sample[index]]++;

            if (counter[sample[index]] === max) mode.push(sample[index]);
            if (counter[sample[index]] > max) {
                max = counter[sample[index]];
                mode = [sample[index]];
            }
        });

        return mode.length > 1 ? mode : mode[0];
    }

    /**
     * The [Mean](https://en.wikipedia.org/wiki/Mean).
     *
     * @param {Array} sample
     * @returns {Number}
     */
    mean(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);

        return this.sum(sample) / sample.length;
    }

    /**
     * The [Variance](https://en.wikipedia.org/wiki/Variance).
     *
     * @param {Array} sample
     * @returns {Number}
     */
    variance(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);

        const avg = this.mean(sample);
        const n = sample.length;

        return this.sum(sample.map(value => Math.pow(value - avg, 2))) / n;
    }

    /**
     * The [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation).
     *
     * @param {Array} sample
     * @returns {Number}
     */
    stdDeviation(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        return Math.sqrt(this.variance(sample));
    }

    /**
     * The [Quantile](http://en.wikipedia.org/wiki/Quantile).
     *
     * @param {Array} sample
     * @param {Number} index
     * @returns {Array}
     */
    quantile(sample, index) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        this._validator.validate('index', index, ['isNumber', [0, 1]]);

        const sortedSample = sample.sort((a, b) => a - b);

        return sortedSample[Math.ceil((sample.length * index) - 1)];
    }

    /**
     * The [Percentile](https://en.wikipedia.org/wiki/Percentile).
     *
     * @param {Array} sample
     * @param {Number} index
     * @returns {Array}
     */
    percentile(sample, index) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        this._validator.validate('index', index, ['isNumber', [0, 100]]);

        const sortedSample = sample.sort((a, b) => a - b);
        return  sortedSample[Math.ceil((index / 100) * sample.length)];
    }

    /**
     * Return the entire result of descriptives statistics above.
     *
     * @param {Array} sample
     * @returns {{min: number, max: number, sum: *, median: number, mode: *, mean: number, variance: number, stdDeviation: number, quantile: Array}}
     */
    summary(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);

        return {
            min: this.min(sample),
            max: this.max(sample),
            sum: this.sum(sample),
            median: this.median(sample),
            mode: this.mode(sample),
            mean: this.mean(sample),
            variance: this.variance(sample),
            stdDeviation: this.stdDeviation(sample),
            quantile: {
                q1: this.quantile(sample, 0.25),
                q3: this.quantile(sample, 0.75)
            }
        };
    }

    /**
     * The [Factorial](https://en.wikipedia.org/wiki/Factorial).
     *
     * @param {Number} n
     * @returns {Number}
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
     * @param {Array} sample
     * @returns {Number}
     */
    geometricMean(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        return Math.pow(sample.reduce((accumulator, current) => accumulator * current, 1), 1 / sample.length);
    }

    /**
     * The [Harmonic Mean](https://en.wikipedia.org/wiki/Harmonic_mean).
     *
     * @param {Array} sample
     * @returns {Number}
     */
    harmonicMean(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        return sample.length / sample.reduce((accumulator, current) => accumulator + (1 / current), 0);
    }

    /**
     * The [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range)
     *
     * @param sample
     * @returns {Number}
     */
    interQuartileRange(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        return this.quantile(sample, 0.75) - this.quantile(sample, 0.25);
    }

    /**
     * The [Variance](https://en.wikipedia.org/wiki/Harmonic_mean).
     * The [Biais](https://fr.wikipedia.org/wiki/Estimateur_(statistique)#Biais).
     *
     * Non biased variance
     *
     * @param {Array} sample
     * @returns {Number}
     */
    sampleVariance(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);

        const avg = this.mean(sample);
        const n = sample.length - 1;

        return this.sum(sample.map(value => Math.pow(value - avg, 2))) / n;
    }

    /**
     * The [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation).
     * The [Biais](https://fr.wikipedia.org/wiki/Estimateur_(statistique)#Biais).
     *
     * Non biased std deviation
     *
     * @param {Array} sample
     * @returns {Number}
     */
    sampleStdDeviation(sample) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        return Math.sqrt(this.sampleVariance(sample));
    }

    /**
     * The [Sample covariance](https://en.wikipedia.org/wiki/Sample_mean_and_sampleCovariance) of two datasets:
     *
     * @param {Array} sample1
     * @param {Array} sample2
     * @returns {number}
     */
    covariance(sample1, sample2) {
        this._validator.validate('sample1', sample1, ['isArray', 'length > 0']);
        this._validator.validate('sample2', sample2, ['isArray', 'length > 0']);
        this._validator.validate('sample1 and sample2', [sample1, sample2], ['length =']);

        const meanX = this.mean(sample1);
        const meanY = this.mean(sample2);

        const numerator = sample1.reduce((accumulator, current, i) => {
            accumulator += (current - meanX) * (sample2[i] - meanY);
            return accumulator;
        }, 0);

        const besselsCorrection = sample1.length - 1;

        return numerator / besselsCorrection;
    }

    /**
     * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution).
     *
     * @param {Number} trials
     * @param {Number} probability
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
     * @param {Number} p
     * @returns {Object}
     */
    bernoulli(p) {
        this._validator.validate('p', p, ['isNumber', [0, 1]]);
        return this.binomial(1, p);
    }

    /**
     * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution).
     *
     * @param {Number} lambda
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
     * @param {Array} sample
     * @param {Function} distributionType
     * @param {Number} significance
     * @returns {boolean}
     *
     * @exemple
     * chiSquaredGoodnessOfFit(sample, 'poisson', 0.05)); //= false
     */
    chiSquaredGoodnessOfFit(sample, distributionType, significance) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        this._validator.validate('distributionType', distributionType, ['isFunction']);
        this._validator.validate('significance', significance, ['isNumber', 'positive']);

        /* Generate an array with number of ocurences for each data in sample. */
        let observedFrequencies = [];
        observedFrequencies = sample.reduce((accumulator, val) => {
            if (accumulator[val] === undefined) accumulator[val] = 0;
            accumulator[val] += 1;
            return accumulator;
        }, []).filter(v => v !== undefined);

        /* Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test. */
        /* Lose one degree of freedom for estimating `lambda` from the sample data. */
        const sampleMean = this.mean(sample);

        /* The hypothesized distribution. Generate the hypothesized distribution. */
        const hypothesizedDistribution = distributionType(sampleMean);

        /* Create an array holding a histogram of expected data given the */
        /* sample size and hypothesized distribution. */
        let expectedFrequencies = [];
        expectedFrequencies = Object.entries(hypothesizedDistribution).reduce((accumulator, current, i) => {
            if (observedFrequencies[i]) accumulator[i] = current[1] * sample.length;
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
     * @param {Array} sample
     * @param {Number} mu
     * @returns {Number}
     */
    tTestOneSample(sample, mu) {
        this._validator.validate('sample', sample, ['isArray', 'length > 0']);
        this._validator.validate('mu', mu, ['isNumber']);

        const mean = this.mean(sample);
        const sd = this.stdDeviation(sample);
        const sqrtSampleSize = Math.sqrt(sample.length);

        /* t-value */
        return (mean - mu) / (sd / sqrtSampleSize);
    }

    /**
     * The [two sample t-test](http://en.wikipedia.org/wiki/Student's_t-test).
     *
     * @param {Array} sample1
     * @param {Array} sample2
     * @returns {Number}
     */
    tTestTwoSample(sample1, sample2) {
        this._validator.validate('sample1', sample1, ['isArray', 'length > 0']);
        this._validator.validate('sample2', sample2, ['isArray', 'length > 0']);

        const n = sample1.length;
        const m = sample2.length;
        const meanX = this.mean(sample1);
        const meanY = this.mean(sample2);
        const sampleVarianceX = this.sampleVariance(sample1);
        const sampleVarianceY = this.sampleVariance(sample2);

        const weightedVariance = (((n - 1) * sampleVarianceX) + ((m - 1) * sampleVarianceY)) / (n + m - 2);

        /* t-value */
        return (meanX - meanY) / Math.sqrt(weightedVariance * (1 / (n + 1) / m));
    }


    /**
     * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
     *
     * @param {Array<Array<Number>>} data
     * @returns {*}
     */
    linearRegression(data) {
        this._validator.validate('data', data, ['isArray']);

        const dataLength = data.length;

        /* 1 element, the result will be a slope to 0 and an intersect ot the second coordinate elements */
        if (dataLength === 1) return { slope, intersect: data[0][1] };

        /* Compute all sum, and finally the slope and intersect */
        let sum_x = 0, sum_y = 0, sum_xx = 0, sum_xy = 0;

        data.forEach(element => {
            sum_x += element[0];
            sum_y += element[1];

            sum_xx += Math.pow(element[0], 2);
            sum_xy += element[0] * element[1];
        });

        const slope = ((dataLength * sum_xy) - (sum_x * sum_y)) / ((dataLength * sum_xx) - (sum_x * sum_x));
        const intersect = (sum_y / dataLength) - ((slope * sum_x) / dataLength);

        // Return both values as an object.
        return { slope, intersect };
    }
}
