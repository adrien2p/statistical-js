'use strict';

const validator = require('./utils/validator');
const epsilon = require('./probability/epsilon');

class StatisticalBase {
    constructor() {
        this._validator = validator;
        this._epsilon = epsilon;
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
     * Take array and return sum of each elements.
     *
     * @param dataSet
     * @returns {*}
     */
    sum(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
        return dataSet.reduce((accumulator, current) => accumulator + current, 0);
    }

    /**
     * Compute median for dataSet, the central value.
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
     * Get the value wit the miximum occurence.
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
     * Compute mean for dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    mean(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

        return this.sum(dataSet) / dataSet.length;
    }

    /**
     * Compute variance for dataSet.
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
     * Compute standard deviation for dataSet.
     *
     * @param {Array} dataSet
     * @returns {number}
     */
    stdDeviation(dataSet) {
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);
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
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

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
        this._validator.validate('dataSet', dataSet, ['isArray', 'length > 0']);

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
     * Return factorial of n (each number multiply the previous)
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
}

module.exports = StatisticalBase;
