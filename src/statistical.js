'use strict';

class Statistical {

    constructor() {}

    /**
     * Return the execution time of the method asked by methodName with the param given
     *
     * @param {String} methodName
     * @param {Array} param
     * @returns {string}
     */
    performance(methodName, param) {
        if (!methodName) throw new Error('Missing parameter methodName (performance).');
        if (!this[methodName]) throw new Error(`Method ${methodName} doesn't exist in statistical (performance).`);

        const t = () => new Date().getTime();

        const begining = t();
        this[methodName](param);
        const end = t();

        return (end - begining) + 'ms';
    }

    /**
     * Take array and return sum of each elements.
     *
     * @param dataSet
     * @returns {*}
     */
    sum(dataSet) {
        return dataSet.reduce((res, val) => {
            if (Number.isNaN(val)) throw new Error('dataSet must contain only numbers.');
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
        if (!dataSet) throw new Error('Missing parameter dataSet (median).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (median).');

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

        return mode;
    }

    /**
     * Compute average for dataSet.
     *
     * @param {Array} dataSet
     * @returns {Number}
     */
    average(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (average).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (average).');

        return this.sum(dataSet) / dataSet.length;
    }

    /**
     * Compute variance for dataSet.
     *
     * @param {Array} dataSet
     * @returns {Number}
     */
    variance(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (variance).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (variance).');

        const avg = this.average(dataSet);
        const n = dataSet.length;

        return this.sum(dataSet.map(value => Math.pow(value - avg, 2))) / n;
    }

    /**
     * Compute standard deviation for dataSet.
     *
     * @param {Array} dataSet
     * @returns {Number}
     */
    stdDeviation(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (stdDeviation).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (stdDeviation).');

        return Math.sqrt(this.variance(dataSet));
    }

    /**
     * Provided the quantile asked by the index given, if no index given, return all quantile of the dataSet.
     *
     * @param {Array} dataSet
     * @param {Number} index
     * @returns {Array}
     */
    quantile(dataSet, index = null) {
        if (!dataSet) throw new Error('Missing parameter dataSet (stdDeviation).');
        if (index && (Number.isNaN(index) || index < 0 || index > 4)) throw new Error('index must be a number and between 1 - 4');

        dataSet = dataSet.sort((a, b) => a - b);
        return !index ?
            [1, 2, 3, 4].map(i => dataSet[Math.ceil((dataSet.length * (i / 4))) - 1]) :
            dataSet[Math.ceil((dataSet.length * (index / 4)) - 1)];
    }

    /**
     * Provided the percentile asked by the index given, if no index given, return all percentile of the dataSet.
     *
     * @param {Array} dataSet
     * @param {Number} index
     * @returns {Array}
     */
    percentile(dataSet, index = null) {
        if (!dataSet) throw new Error('Missing parameter dataSet (stdDeviation).');
        if (index && (Number.isNaN(index) || index < 0 || index > 100)) throw new Error('index must be a number and between 1 - 100');

        dataSet = dataSet.sort((a, b) => a - b);
        return !index ? Array.from({length: 99}, (v, k) => k + 1).map(i => dataSet[i]) : dataSet[Math.ceil((index / 100) * dataSet.length)];
    }
}

module.exports = new Statistical();
