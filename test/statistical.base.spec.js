'use strict';

const assert = require('chai').assert;
const statistical = require('../src/statistical');

describe('statistical.base', () => {
    it('should take less time with cache', () => {
        const dataSet = Array.from({length: 1000000}, (v, k) => k);

        const t1 = new Date().getTime();
        const res = statistical.base.stdDeviation(dataSet);
        const t2 = new Date().getTime();

        const t3 = new Date().getTime();
        const res2 = statistical.base.stdDeviation(dataSet);
        const t4 = new Date().getTime();

        assert.isBelow(t4 - t3, t2 - t1);
    });

    it('should return the smallest value of a dataSet', () => {
        const res = statistical.base.min([1, 2, 3]);

        assert.equal(res, 1);
    });

    it('should return the biggest value of a dataSet', () => {
        const res = statistical.base.max([1, 2, 3]);

        assert.equal(res, 3);
    });

    it('should compute sum of a dataSet', () => {
        const res = statistical.base.sum([1, 2, 3]);
        
        assert.equal(res, 6);
    });

    it('should return the median of a dataSet (even)', () => {
        const dataSet = [1, 2, 3, 4];
        const res = statistical.base.median(dataSet);

        assert.equal(res, 2.5);
    });

    it('should compute the median of a dataSet (odd)', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.base.median(dataSet);

        assert.equal(res, 2);
    });

    it('should compute the mode of a dataSet', () => {
        const dataSet = [1, 2, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.base.mode(dataSet);

        assert.equal(res, 1);
    });

    it('should compute multiple mode value of a dataSet', () => {
        const dataSet = [1, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.base.mode(dataSet);

        assert.sameMembers(res, [1, 3]);
    });

    it('should compute mean of a dataSet', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.base.mean(dataSet);

        assert.equal(res, 2);
    });

    it('should compute variance of a dataSet', () => {
        const dataSet = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.base.variance(dataSet) * 100) / 100;

        assert.equal(res, 0.66);
    });

    it('should compute standard deviation of a dataSet', () => {
        const dataSet = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.base.stdDeviation(dataSet) * 100) / 100;

        assert.equal(res, 0.81);
    });

    it('should compute all quantile of a dataSet', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.base.quantile(dataSet);

        assert.sameMembers(res, [3, 6, 19, 50]);
    });

    it('should compute and return the quantile asked of a dataSet', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.base.quantile(dataSet, 2);

        assert.equal(res, 6);
    });

    it('should compute and return the percentile asked of a dataSet', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.base.percentile(dataSet, 30);

        assert.equal(res, 5);
    });

    it('should compute summary with all descriptive statistics above', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const res = statistical.base.summary(dataSet);

        assert.equal(res.sum, 193);
        assert.equal(res.median, 6);
        assert.equal(res.mode, 6);
        assert.equal(Math.trunc(res.mean * 100) / 100, 14.84);
        assert.equal(Math.trunc(res.variance * 100) / 100, 238.28);
        assert.equal(Math.trunc(res.stdDeviation * 100) / 100, 15.43);
        assert.sameMembers(res.quantile,  [4, 6, 19, 50]);
    });
});