'use strict';

const assert = require('chai').assert;
const statistical = require('../src/statistical');

describe('Statistical class', function () {
    afterEach(() => {
        statistical.settings = {
            cache: {
                enabled: true,
                rootElementCount: 10,
                subElementCount: 30
            }
        };
    });

    it('should return settings', () => {
        assert.deepEqual(statistical.settings, {
            cache: {
                enabled: true,
                rootElementCount: 10,
                subElementCount: 30
            }
        });
    });

    it('should update settings', () => {
        statistical.settings = {
            cache: {
                enabled: false,
                rootElementCount: 100,
                subElementCount: 300
            }
        };

        assert.deepEqual(statistical.settings, {
            cache: {
                enabled: false,
                rootElementCount: 100,
                subElementCount: 300
            }
        });
    });

    it('should take less time with cache', () => {
        this.timeout(3000);
        const dataSet = Array.from({length: 1000000}, (v, k) => k);

        const t1 = new Date().getTime();
        const res = statistical.base.stdDeviation(dataSet);
        const t2 = new Date().getTime();

        const t3 = new Date().getTime();
        const res2 = statistical.base.stdDeviation(dataSet);
        const t4 = new Date().getTime();

        assert.isBelow(t4 - t3, t2 - t1);
    });

    it('should compute sum of an array of numbers', () => {
        const res = statistical.base.sum([1, 2, 3]);
        assert.equal(res, 6);
    });

    it('should return the median of an array of numbers (even)', () => {
        const dataSet = [1, 2, 3, 4];
        const res = statistical.base.median(dataSet);

        assert.equal(res, 2.5);
    });

    it('should return the median of an array of numbers (odd)', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.base.median(dataSet);

        assert.equal(res, 2);
    });

    it('should return the mode of an array of numbers', () => {
        const dataSet = [1, 2, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.base.mode(dataSet);

        assert.equal(res, 1);
    });

    it('should return multiple mode value of an array of numbers', () => {
        const dataSet = [1, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.base.mode(dataSet);

        assert.sameMembers(res, [1, 3]);
    });

    it('should compute mean of an array of numbers', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.base.mean(dataSet);

        assert.equal(res, 2);
    });

    it('should compute variance of an array of numbers', () => {
        const dataSet = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.base.variance(dataSet) * 100) / 100;

        assert.equal(res, 0.66);
    });

    it('should compute standard deviation of an array of numbers', () => {
        const dataSet = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.base.stdDeviation(dataSet) * 100) / 100;

        assert.equal(res, 0.81);
    });

    it('should return all quantile of an array of numbers', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.base.quantile(dataSet);

        assert.sameMembers(res, [3, 6, 19, 50]);
    });

    it('should return the quantile asked of an array of numbers', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.base.quantile(dataSet, 2);

        assert.equal(res, 6);
    });

    it('should return the percentile asked of an array of numbers', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.base.percentile(dataSet, 30);

        assert.equal(res, 5);
    });
});