'use strict';

class Statistical {

    constructor() {}

    /**
     * Take array and return sum of each elements
     *
     * @param {Array} set
     * @returns {*}
     */
    sum(set) {
        return set.reduce((a, b) => {
            if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('dataSet must contain only numbers');
            return a + b;
        }, 0);
    }

    median(set) {

    }

    /**
     * Compute average for dataSet
     *
     * @param {Array} set
     * @returns {*}
     */
    average(set) {
        if (!set) throw new Error('Missing parameter set (average)');
        if (!Array.isArray(set)) throw new Error('dataSet must be an array (average)');

        return this.sum(set) / set.length;;
    }

    /**
     * Compute variance for dataSet
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
     * Compute standard deviation for dataSet
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
