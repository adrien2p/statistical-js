'use strict';

const assert = require('chai').assert;
const statistical = require('../src/statistical');

describe('Statistical class', function () {
    it('should return the time in ms to execute method', () => {
        const dataSet = Array.from({length: 1000000}, (v, k) => Math.floor(Math.random() * 1000));
        const res = statistical.performance('stdDeviation', dataSet);

        assert.isString(res);

        console.log(`\nbelow (perf) ==> res : ${res} (${dataSet.length} elements)\n`);
    });

    it('should compute sum of an array of numbers', () => {
        const res = statistical.sum([1, 2, 3]);
        assert.equal(res, 6);
    });

    it('should return the median of an array of numbers (even)', () => {
        const dataSet = [1, 2, 3, 4];
        const res = statistical.median(dataSet);

        assert.equal(res, 2.5);
    });

    it('should return the median of an array of numbers (odd)', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.median(dataSet);

        assert.equal(res, 2);
    });

    it('should return the mode of an array of numbers', () => {
        const dataSet = [1, 2, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.mode(dataSet);

        assert.equal(res, 1);
    });

    it('should return multiple mode value of an array of numbers', () => {
        const dataSet = [1, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.mode(dataSet);

        assert.sameMembers(res, [1, 3]);
    });

    it('should compute average of an array of numbers', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.average(dataSet);

        assert.equal(res, 2);
    });

    it('should compute variance of an array of numbers', () => {
        const dataSet = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.variance(dataSet) * 100) / 100;

        assert.equal(res, 0.66);
    });

    it('should compute standard deviation of an array of numbers', () => {
        const dataSet = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.stdDeviation(dataSet) * 100) / 100;

        assert.equal(res, 0.81);
    });

    it('should return all quantile of an array of numbers', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.quantile(dataSet);

        assert.sameMembers(res, [3, 6, 19, 50]);
    });

    it('should return the quantile asked of an array of numbers', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.quantile(dataSet, 2);

        assert.equal(res, 6);
    });

    it('should return the percentile asked of an array of numbers', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.percentile(dataSet, 30);

        assert.equal(res, 5);
    });
});