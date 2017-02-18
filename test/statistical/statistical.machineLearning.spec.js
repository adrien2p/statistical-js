'use strict';

const assert = require('chai').assert;
const statistical = require('../../src/statistical');

describe('statistical', () => {
    describe('machine learning provide', () => {
        it('perceptron and should predict result with linear model', () => {
            const perceptron = new statistical.ml.Perceptron();

            for (let i = 0; i < 10; i++) {
                perceptron.train({ in: [1, 1], out: 1 });
                perceptron.train({ in: [0, 1], out: 0 });
                perceptron.train({ in: [1, 0], out: 0 });
                perceptron.train({ in: [0, 0], out: 0 });
            }

            assert.equal(perceptron.predict([0.2, 1]), 0);
        });
    });
});