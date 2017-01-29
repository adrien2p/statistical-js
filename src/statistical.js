'use strict';

const interceptor = require('./utils/interceptor');
const cacheManager = require('./utils/cacheManager');

class Statistical {

    constructor() {
        this._settings = {
            cache: {
                enabled: true,
                rootElementCount: 10,
                subElementCount: 30
            }
        };
        return interceptor.cacheBefore(this, cacheManager, [
            'settings',
            'cacheSettings'
        ]);
    }

    /**
     * Return settings used in statistical class.
     *
     * @returns {*}
     */
    get settings() {
        return this._settings;
    }

    /**
     * Allow to updates statistical settings.
     *
     * @param {*|object} options
     */
    set settings(options) {
        if (!options && !options.cache) throw new Error('Missing parameter options (Statistical:settings');
        if (!Number.isNumber(options.cache.rootElementCount)) throw new Error('rootElementCount must be a number (Statistical:settings');
        if (!Number.isNumber(options.cache.subElementCount)) throw new Error('subElementCount must be a number (Statistical:settings');

        this._settings = {
            cache: {
                enabled: options.cache.enabled,
                rootElementCount: options.cache.rootElementCount || 10,
                subElementCount: options.cache.subElementCount || 30
            }
        };
        cacheManager.settings = this._settings.cache;
    }

    /**
     * Take array and return sum of each elements.
     *
     * @param dataSet
     * @returns {*}
     */
    sum(dataSet) {
        return dataSet.reduce((res, val) => {
            if (Number.isNaN(val)) throw new Error('dataSet must contain only numbers (Statistical:sum).');
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
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical:median).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical:median).');

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
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical:mode).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical:mode).');

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
     * Compute mean for dataSet.
     *
     * @param {Array} dataSet
     * @returns {Number}
     */
    mean(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical:mean).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical:mean).');

        return this.sum(dataSet) / dataSet.length;
    }

    /**
     * Compute variance for dataSet.
     *
     * @param {Array} dataSet
     * @returns {Number}
     */
    variance(dataSet) {
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical:variance).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical:variance).');

        const avg = this.mean(dataSet);
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
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical:stdDeviation).');
        if (!Array.isArray(dataSet)) throw new Error('dataSet must be an array (Statistical:stdDeviation).');

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
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical:quantile).');
        if (index && (Number.isNaN(index) || index < 0 || index > 4)) throw new Error('index must be a number and between 1 - 4 (Statistical:quantile).');

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
        if (!dataSet) throw new Error('Missing parameter dataSet (Statistical:percentile).');
        if (index && (Number.isNaN(index) || index < 0 || index > 100)) throw new Error('index must be a number and between 1 - 100 (Statistical:percentile)');

        dataSet = dataSet.sort((a, b) => a - b);
        return !index ? Array.from({length: 99}, (v, k) => k + 1).map(i => dataSet[i]) : dataSet[Math.ceil((index / 100) * dataSet.length)];
    }
}


module.exports = new Statistical();
