const assert = require('chai').assert;
const statistical = require('../src/statistical');

describe('Statistical class', function () {
    it('should compute sum of an array of numbers', () => {
        const res = statistical.sum([1, 2, 3]);
        assert.equal(res, 6);
    });

    it('should return the central value of an array of numbers (even)', () => {
        const data = [1, 2, 3, 4];
        const res = statistical.median(data);

        assert.equal(res, 2.5);
    });

    it('should return the median of an array of numbers (odd)', () => {
        const data = [1, 2, 3];
        const res = statistical.median(data);

        assert.equal(res, 2);
    });

    it('should return the median of an array of numbers (odd)', () => {
        const data = [1, 2, 3];
        const res = statistical.median(data);

        assert.equal(res, 2);
    });

    it('should return the mode of an array of numbers', () => {
        const data = [1, 2, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.mode(data);

        assert.equal(res, 1);
    });

    it('should return multiple mode value of an array of numbers', () => {
        const data = [1, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.mode(data);

        assert.sameMembers(res, [1, 3]);
    });

    it('should compute average of an array of numbers', () => {
        const data = [1, 2, 3];
        const res = statistical.average(data);

        assert.equal(res, 2);
    });

    it('should compute variance of an array of numbers', () => {
        const data = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.variance(data) * 100) / 100;

        assert.equal(res, 0.66);
    });

    it('should compute standard deviation of an array of numbers', () => {
        const data = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.stdDeviation(data) * 100) / 100;

        assert.equal(res, 0.81);
    });
});