const assert = require('chai').assert;
const statistical = require('../src/statistical');

describe('Statistical', function () {
    describe('should compute sum', () => {
        it('of an array of numbers', () => {
            const res = statistical.sum([1, 2, 3]);

            assert.equal(res, 6);
        });
    });

    describe('should compute average', () => {
        it('of an array of numbers', () => {
            const data = [1, 2, 3];
            const res = statistical.average(data);

            assert.equal(res, 2);
        });
    });

    describe('should compute variance', () => {
        it('of an array of numbers', () => {
            const data = [1, 2, 3];
            /* Trunc result and keep two decimals without rounded to keep period */
            const res = Math.trunc(statistical.variance(data) * 100) / 100;

            assert.equal(res, 0.66);
        });
    });

    describe('should compute standard deviation', () => {
        it('of an array of numbers', () => {
            const data = [1, 2, 3];
            /* Trunc result and keep two decimals without rounded to keep period */
            const res = Math.trunc(statistical.stdDeviation(data) * 100) / 100;

            assert.equal(res, 0.81);
        });
    });
});