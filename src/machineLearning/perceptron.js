'use strict';

/**
 * single-layer [Perceptron Classifier](http://en.wikipedia.org/wiki/Perceptron)
 */
export default class Perceptron {
    /**
     * Create a new Perceptron.
     *
     * @param {object} options
     * @param {number} options.bias
     * @param {number} options.learningRate
     */
    constructor(options = {}) {
        this._bias = options._bias || 1;
        this._learningRate = options._learningRate || 0.2;
        this._weights = [];
    }

    /**
     * predict result from input data.
     *
     * @param {Array} input - input value to predict [1, 1]
     * @returns {number}
     */
    predict(input) {
        if (!input) throw new Error('Missing parameter input.');

        let score = 0;
        this._weights.map((weight, i) => {
            score += weight * input[i];
        });

        return (score + this._bias) > 0 ? 1 : 0;
    }

    /**
     * train data to adjust weight for future prediction.
     *
     * @param {Array} data - Contain input - output values { in: [1, 1], out: 1 }
     */
    train(data) {
        if (!data.in) throw new Error('Missing parameter input.');

        this._weights = this._weights.length ? this._weights : data.in;

        const prediction = this.predict(data.in);

        if (prediction !== data.out) {
            const error = data.out - prediction;

            /* Adjust new weight */
            this._weights = this._weights.map((weight, i) => {
                weight += this._learningRate * error * data.in[i];
                return weight
            });
            this._bias += error;
        }

        return this;
    }
}
