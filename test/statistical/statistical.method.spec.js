'use strict';

const assert = require('chai').assert;
const chiTable = require('../../src/probability/chiSquaredTable');
const statistical = require('../../src/statistical').statistical;

describe('statistical', () => {
    it('should return the chi squared probability table', () => {
        assert.deepEqual(statistical.chiSquaredProbTable, chiTable);
    });

    it('should take less time with cache', () => {
        const dataSet = Array.from({length: 1000000}, (v, k) => k);

        const t1 = new Date().getTime();
        const res = statistical.stdDeviation(dataSet);
        const t2 = new Date().getTime();

        const t3 = new Date().getTime();
        const res2 = statistical.stdDeviation(dataSet);
        const t4 = new Date().getTime();

        assert.isBelow(t4 - t3, t2 - t1);
    });

    it('should return the smallest value of a dataSet', () => {
        const res = statistical.min([1, 2, 3]);

        assert.equal(res, 1);
    });

    it('should return the biggest value of a dataSet', () => {
        const res = statistical.max([1, 2, 3]);

        assert.equal(res, 3);
    });

    it('should compute sum of a dataSet', () => {
        const res = statistical.sum([1, 2, 3]);
        
        assert.equal(res, 6);
    });

    it('should return the median of a dataSet (even)', () => {
        const dataSet = [1, 2, 3, 4];
        const res = statistical.median(dataSet);

        assert.equal(res, 2.5);
    });

    it('should compute the median of a dataSet (odd)', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.median(dataSet);

        assert.equal(res, 2);
    });

    it('should compute the mode of a dataSet', () => {
        const dataSet = [1, 2, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.mode(dataSet);

        assert.equal(res, 1);
    });

    it('should compute multiple mode value of a dataSet', () => {
        const dataSet = [1, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.mode(dataSet);

        assert.sameMembers(res, [1, 3]);
    });

    it('should compute mean of a dataSet', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.mean(dataSet);

        assert.equal(res, 2);
    });

    it('should compute variance of a dataSet', () => {
        const dataSet = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.variance(dataSet) * 100) / 100;

        assert.equal(res, 0.66);
    });

    it('should compute standard deviation of a dataSet', () => {
        const dataSet = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.stdDeviation(dataSet) * 100) / 100;

        assert.equal(res, 0.81);
    });

    it('should compute all quantile of a dataSet', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.quantile(dataSet);

        assert.sameMembers(res, [3, 6, 19, 50]);
    });

    it('should compute and return the quantile asked of a dataSet', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.quantile(dataSet, 2);

        assert.equal(res, 6);
    });

    it('should compute and return the percentile asked of a dataSet', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.percentile(dataSet, 30);

        assert.equal(res, 5);
    });

    it('should compute summary with all descriptive statistics above', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const res = statistical.summary(dataSet);

        assert.equal(res.sum, 193);
        assert.equal(res.median, 6);
        assert.equal(res.mode, 6);
        assert.equal(Math.trunc(res.mean * 100) / 100, 14.84);
        assert.equal(Math.trunc(res.variance * 100) / 100, 238.28);
        assert.equal(Math.trunc(res.stdDeviation * 100) / 100, 15.43);
        assert.sameMembers(res.quantile,  [4, 6, 19, 50]);
    });

    it('should compute the factorial of any number', () => {
        const res = statistical.factorial(5);

        assert.equal(res, 120);
    });

    it('should compute the geometric mean of a dataSet', () => {
        const dataSet = [1, 2, 3, 4];
        const res = statistical.geometricMean(dataSet);

        assert.equal(Math.trunc(res * 100) / 100, 2.21);
    });

    it('should compute the harmonic mean of a dataSet', () => {
        const dataSet = [1, 2, 3, 4];
        const res = statistical.harmonicMean(dataSet);

        assert.equal(Math.trunc(res * 100) / 100, 1.92);
    });

    it('should compute the non biased variance of a dataSet', () => {
        const dataSet = [1, 2, 3, 4];
        const res = statistical.sampleVariance(dataSet);

        assert.equal(Math.trunc(res * 100) / 100, 1.66);
    });

    it('should compute binomial probability distribution', () => {
        const res = statistical.binomial(10, 0.5);

        assert.equal(Object.keys(res).length === 11, true);
        Object.keys(res).forEach(k => {
            assert.equal(res[k] > 0 && res[k] < 1, true);
        });
    });

    it('should return bernoulli probability based on binomial with 1 trials', () => {
        const res = statistical.bernoulli(0.5);

        assert.equal(Object.keys(res).length === 2, true);
        Object.keys(res).forEach(k => {
            assert.equal(res[k], 0.5);
        });
    });

    it('should compute poisson probability distribution', () => {
        const res = statistical.poisson(0.85);

        assert.deepEqual(res, {
            '0': 0.4274149319487267,
            '1': 0.3633026921564177,
            '2': 0.1544036441664775,
            '3': 0.043747699180501955,
            '4': 0.009296386075856667,
            '5': 0.001580385632895633,
            '6': 0.00022388796466021467
        });
    });

    it('should return boolean for chiSquaredGoodnessOfFit to valid a hypothesis distribution', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const distributionType = statistical.poisson;
        const res = statistical.chiSquaredGoodnessOfFit(dataSet, distributionType, 0.005);

        assert.deepEqual(res, false);
    });

    it('should return t-value for a t-test with one dataSet', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const res = statistical.tTestOneSample(dataSet, 15);

        assert.equal(Math.trunc(res * 100) / 100, -0.03);
    });

    it('should return t-value for a t-test with one dataSet', () => {
        const dataSet1 = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const dataSet2 = [2, 3, 4, 5, 20, 6, 7, 7, 15, 50, 23, 14, 45];
        const res = statistical.tTestTwoSample(dataSet1, dataSet2);

        assert.equal(Math.trunc(res * 100) / 100, -0.52);
    });
});