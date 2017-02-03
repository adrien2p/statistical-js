'use strict';
const validator = require('./utils/validator');
const epsilon = require('./probability/epsilon');

class StatisticalDistribution {
    constructor() {
        this._validator = validator;
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

    /**
     * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution)
     *
     * @param {number} trials
     * @param {number} probability
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
     * The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution)
     *
     * @param {number} p
     * @returns {Object}
     */
    bernoulli(p) {
        this._validator.validate('p', p, ['isNumber', [0, 1]]);
        return this.binomial(1, p);
    }

    /**
     * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution)
     *
     * @param {number} lambda
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
}

module.exports = StatisticalDistribution;
