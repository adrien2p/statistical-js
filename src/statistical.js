'use strict';

class Statistical {

    constructor() {}

    /**
     * Take array and return sum of each elements.
     *
     * @param {Array} set
     * @returns {*}
     */
    sum(set) {
        return set.reduce((res, val) => {
            if (Number.isNaN(val)) throw new Error('dataSet must contain only numbers');
            return res + val;
        }, 0);
    }

    /**
     * Compute median for dataSet, the central value.
     *
     * @param {Array} set
     * @returns {number}
     */
    median(set) {
        if (!set) throw new Error('Missing parameter set (median)');
        if (!Array.isArray(set)) throw new Error('dataSet must be an array (median)');

        const middle = Math.floor(set.length / 2);
        const isEven = set.length % 2 === 0;

        set.sort((a, b) => a - b);

        return isEven ? (set[middle - 1] + set[middle]) / 2 : set[middle];
    }

    /**
     * Get the value wit the miximum occurence.
     *
     * @param {Array} set
     * @returns {*}
     */
    mode(set) {
        const counter = {};
        let mode = [];
        let max = 0;

        for (const index in set) {
            if (!(set[index] in counter)) counter[set[index]] = 0;

            counter[set[index]]++;

            if (counter[set[index]] === max) mode.push(set[index]);
            if (counter[set[index]] > max) {
                max = counter[set[index]];
                mode = [set[index]];
            }
        }

        return mode;
    }

    /**
     * Compute average for dataSet.
     *
     * @param {Array} set
     * @returns {*}
     */
    average(set) {
        if (!set) throw new Error('Missing parameter set (average)');
        if (!Array.isArray(set)) throw new Error('dataSet must be an array (average)');

        return this.sum(set) / set.length;
    }

    /**
     * Compute variance for dataSet.
     *
     * @param {Array} set
     * @returns {*}
     */
    variance(set) {
        if (!set) throw new Error('Missing parameter set (variance)');
        if (!Array.isArray(set)) throw new Error('dataSet must be an array (variance)');

        const avg = this.average(set);
        const n = set.length;

        return this.sum(set.map(value => Math.pow(value - avg, 2))) / n;
    }

    /**
     * Compute standard deviation for dataSet.
     *
     * @param {Array} set
     * @returns {*}
     */
    stdDeviation(set) {
        if (!set) throw new Error('Missing parameter sets (stdDeviation)');
        if (!Array.isArray(set)) throw new Error('dataSet must be an array (stdDeviation)');

        return Math.sqrt(this.variance(set));
    }
}

module.exports = new Statistical();
