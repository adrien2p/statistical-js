'use strict';

export default class Statistical {

    constructor() {}

    /**
     * Take array and return sum of each elements
     *
     * @param {Array} set
     * @returns {*}
     */
    sum(set) {
        return set.reduce((a, b) => {
            if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('Set of data must contain only numbers');
            return a + b;
        }, 0);
    }

    /**
     * Compute average for each set of data provided in the object parameter
     *
     * @param {object} sets
     * @returns {*}
     */
    average(sets) {
        if (!sets) throw new Error('Missing parameter sets (average)');

        const avg = [];
        Object.values(sets).forEach(set => {
            if (!Array.isArray(set)) throw new Error('Set of data must be an array');
            avg.push(this.sum(set) / set.length);
        });

        if (avg.length === 1) return avg[0];
        return avg;
    }

    /**
     * Compute variance for each set of data provided in the object parameter
     *
     * @param {object} sets
     * @returns {*}
     */
    variance(sets) {
        if (!sets) throw new Error('Missing parameter sets (variance)');

        const avg = Object.keys(sets).length > 1 ? this.average(sets) : [this.average(sets)];
        const n = Object.values(sets).map(set => set.length);
        const v = [];

        Object.values(sets).forEach((set, i) => {
            if (!Array.isArray(set)) throw new Error('Set of data must be an array');
            v.push((this.sum(set.map(value => Math.pow(value - avg[i], 2))) / n[i]));
        });

        if (v.length === 1) return v[0];
        return v;
    }
}
