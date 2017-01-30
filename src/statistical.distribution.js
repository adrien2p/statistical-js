'use strict';

const StatisticalBase = require('./statistical.base');

class StatisticalDistribution extends StatisticalBase {
    constructor() {
        super();
    }

    /**
     * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution)
     *
     * @param {number} trials number of trials to simulate
     * @param {number} probability
     * @returns {Object} output
     */
    binomial(trials, probability) {
        if (!trials) throw new Error('Missing parameter trials (Statistical.distribution:binomial).');
        if (!probability) throw new Error('Missing parameter probability (Statistical.distribution:binomial).');
        if (probability < 0 || probability > 1 || trials <= 1) {
            throw new Error('probability must fall between 0 - 1 and trials gretter than 1');
        }

        let x = 0;
        let cells = {};
        let cumulativeProbability = 0;

        do {
            cells[x] = this.factorial(trials) / (this.factorial(x) * this.factorial(trials - x)) * (Math.pow(probability, x) * Math.pow(1 - probability, trials - x));
            cumulativeProbability += cells[x];
            x++;
        } while (cumulativeProbability < 1 - this._epsilon);

        return cells;
    }


}


module.exports = StatisticalDistribution;
