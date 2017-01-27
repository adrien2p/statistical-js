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
            if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('data set must contain only numbers');
            return a + b;
        }, 0);
    }

    /**
     * Compute average for each data set provided in the object parameter
     *
     * @param {object} sets
     * @returns {*}
     */
    average(sets) {
        if (!sets) throw new Error('Missing parameter sets (average)');

        const avg = Object.values(sets).map(set => {
            if (!Array.isArray(set)) throw new Error('data set must be an array');
            return this.sum(set) / set.length;
        });

        if (avg.length === 1) return avg[0];
        return avg;
    }

    /**
     * Compute variance for each data set provided in the object parameter
     *
     * @param {object} sets
     * @returns {*}
     */
    variance(sets) {
        if (!sets) throw new Error('Missing parameter sets (variance)');

        const avg = Object.keys(sets).length > 1 ? this.average(sets) : [this.average(sets)];
        const n = Object.values(sets).map(set => set.length);

        const variances = Object.values(sets).map((set, i) => {
            if (!Array.isArray(set)) throw new Error('data set must be an array');
            return this.sum(set.map(value => Math.pow(value - avg[i], 2))) / n[i];
        });

        if (variances.length === 1) return variances[0];
        return variances;
    }

    /**
     * Compute standard deviation for each data set provided in the object parameter
     *
     * @param {object} sets
     * @returns {*}
     */
    stdDeviation(sets) {
        if (!sets) throw new Error('Missing parameter sets (variance)');

        const variances = Object.keys(sets).length > 1 ? this.variance(sets) : [this.variance(sets)];
        const stdDeviations = Object.keys(sets).map((set, i) => {
            if (!Array.isArray(set)) throw new Error('data set must be an array');
            return Math.sqrt(variances[i]);
        });

        if (stdDeviations.length === 1) return stdDeviations[0];
        return stdDeviations;
    }
}

module.exports = new Statistical();
