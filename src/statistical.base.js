'use strict';

class StatisticalBase {
    constructor() {
        /**
         * We use `ε`, epsilon, as a stopping criterion when we want to iterate
         * until we're "close enough". Epsilon is a very small number: for
         * simple statistics, that number is **0.0001**
         *
         * This is used in calculations like the binomialDistribution, in which
         * the process of finding a value is [iterative](https://en.wikipedia.org/wiki/Iterative_method):
         * it progresses until it is close enough.
         *
         * @type {number}
         */
        this._epsilon = 0.0001;
    }

    /**
     * Return the smallest value of the dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    min(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:min).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:min).');

        return dataSet.sort((a, b) => a - b)[0];
    }

    /**
     * Return the biggest value of the dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    max(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:max).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:max).');

        return dataSet.sort((a, b) => a + b)[0];
    }


    /**
     * Take array and return sum of each elements.
     *
     * @param dataSet
     * @returns {*}
     */
    sum(dataSet) {
        return dataSet.reduce((res, val) => {
            if (Number.isNaN(val)) throw new Error('dataSet must contain only numbers (Statistical.base:sum).');
            return res + val;
        }, 0);
    }

    /**
     * Compute median for dataSet, the central value.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    median(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:median).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:median).');

        const middle = Math.floor(dataSet.length / 2);
        const isEven = dataSet.length % 2 === 0;

        dataSet = dataSet.sort((a, b) => a - b);

        return isEven ? (dataSet[middle - 1] + dataSet[middle]) / 2 : dataSet[middle];
    }

    /**
     * Get the value wit the miximum occurence.
     *
     * @param {Array} dataSet
     * @returns {*}
     */
    mode(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:mode).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:mode).');

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
     * Compute mean for dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    mean(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:mean).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:mean).');

        return this.sum(dataSet) / dataSet.length;
    }

    /**
     * Compute variance for dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    variance(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:variance).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:variance).');

        const avg = this.mean(dataSet);
        const n = dataSet.length;

        return this.sum(dataSet.map(value => Math.pow(value - avg, 2))) / n;
    }

    /**
     * Compute standard deviation for dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    stdDeviation(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:stdDeviation).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:stdDeviation).');

        return Math.sqrt(this.variance(dataSet));
    }

    /**
     * Provided the quantile asked by the index given, if no index given, return all quantile of the dataSet.
     *
     * @param {Array} dataSet
     * @param {number} index
     * @returns {Array}
     */
    quantile(dataSet, index = null) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:quantile).');
        if (index && (Number.isNaN(index) || index < 0 || index > 4)) throw new Error('index must be a number and between 1 - 4 (Statistical.base:quantile).');

        dataSet = dataSet.sort((a, b) => a - b);
        return !index ?
            [1, 2, 3, 4].map(i => dataSet[Math.ceil((dataSet.length * (i / 4))) - 1]) :
            dataSet[Math.ceil((dataSet.length * (index / 4)) - 1)];
    }

    /**
     * Provided the percentile asked by the index given, if no index given, return all percentile of the dataSet.
     *
     * @param {Array} dataSet
     * @param {number} index
     * @returns {Array}
     */
    percentile(dataSet, index = null) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:percentile).');
        if (index && (Number.isNaN(index) || index < 0 || index > 100)) throw new Error('index must be a number and between 1 - 100 (Statistical.base:percentile)');

        dataSet = dataSet.sort((a, b) => a - b);
        return !index ? Array.from({length: 99}, (v, k) => k + 1).map(i => dataSet[i]) : dataSet[Math.ceil((index / 100) * dataSet.length)];
    }

    /**
     * Return the entire result of descriptives statistics above
     *
     * @param {Array} dataSet
     * @returns {{min: number, max: number, sum: *, median: number, mode: *, mean: number, variance: number, stdDeviation: number, quantile: Array}}
     */
    summary(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical.base:summary).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical.base:summary).');

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
     * Return factorial of n (each number multiply the previous)
     *
     * @param {number} n
     * @returns {number}
     */
    factorial(n) {
        if (Number.isNaN(n)) throw new Error('Missing parameter n and must be a number (Statistical.base:factorial).');
        if (n < 0) throw new Error('n must be positive');

        let factorialResult = 1;
        for (let i = 2; i <= n; i++) {
            factorialResult *= i;
        }

        return factorialResult;
    }
}


module.exports = StatisticalBase;
