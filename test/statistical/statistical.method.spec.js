'use strict';

const assert = require('chai').assert;
const chiTable = require('../../src/constante/chiSquaredTable');
const statistical = require('../../src/statistical');

describe('statistical', () => {
    it('should return the chi squared probability table', () => {
        assert.deepEqual(statistical.methods.chiSquaredProbTable, chiTable);
    });

    describe('should take', () => {
        afterEach(() => statistical.settings = { cache: { enabled: true }});

        it('less time to compute with cache', () => {
            const sample = Array.from({length: 1000000}, (v, k) => k);

            const t1 = new Date().getTime();
            const res = statistical.methods.stdDeviation(sample);
            const t2 = new Date().getTime();

            const t3 = new Date().getTime();
            const res2 = statistical.methods.stdDeviation(sample);
            const t4 = new Date().getTime();

            assert.isBelow(t4 - t3, 10);
            assert.isBelow(t4 - t3, t2 - t1);
        });

        it('more time to compute without cache', () => {
            const settings = statistical.settings;
            
            settings.cache.enabled = false;
            statistical.settings = settings;

            const sample = Array.from({length: 1000000}, (v, k) => k);

            const t1 = new Date().getTime();
            const res = statistical.methods.stdDeviation(sample);
            const t2 = new Date().getTime();

            const t3 = new Date().getTime();
            const res2 = statistical.methods.stdDeviation(sample);
            const t4 = new Date().getTime();

            assert.isAbove(t4 - t3, 200);
        });
    });

    it('should return the smallest value of a sample', () => {
        const res = statistical.methods.min([1, 2, 3]);

        assert.equal(res, 1);
    });

    it('should return the biggest value of a sample', () => {
        const res = statistical.methods.max([1, 2, 3]);

        assert.equal(res, 3);
    });

    it('should compute sum of a sample', () => {
        const res = statistical.methods.sum([1, 2, 3]);
        
        assert.equal(res, 6);
    });

    it('should return the median of a sample (even)', () => {
        const sample = [1, 2, 3, 4];
        const res = statistical.methods.median(sample);

        assert.equal(res, 2.5);
    });

    it('should compute the median of a sample (odd)', () => {
        const sample = [1, 2, 3];
        const res = statistical.methods.median(sample);

        assert.equal(res, 2);
    });

    it('should compute the mode of a sample', () => {
        const sample = [1, 2, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.methods.mode(sample);

        assert.equal(res, 1);
    });

    it('should compute multiple mode value of a sample', () => {
        const sample = [1, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1];
        const res = statistical.methods.mode(sample);

        assert.sameMembers(res, [1, 3]);
    });

    it('should compute mean of a sample', () => {
        const sample = [1, 2, 3];
        const res = statistical.methods.mean(sample);

        assert.equal(res, 2);
    });

    it('should compute variance of a sample', () => {
        const sample = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.methods.variance(sample) * 100) / 100;

        assert.equal(res, 0.66);
    });

    it('should compute standard deviation of a sample', () => {
        const sample = [1, 2, 3];
        /* Trunc result and keep two decimals without rounded to keep periodicity */
        const res = Math.trunc(statistical.methods.stdDeviation(sample) * 100) / 100;

        assert.equal(res, 0.81);
    });

    it('should compute and return the quantile asked of a sample', () => {
        const sample = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.methods.quantile(sample, 0.5);

        assert.equal(res, 6);
    });

    it('should compute and return the percentile asked of a sample', () => {
        const sample = [1, 2, 3, 4, 19, 5, 6, 15, 50, 23, 14, 45];
        const res = statistical.methods.percentile(sample, 30);

        assert.equal(res, 5);
    });

    it('should compute summary with all descriptive statistics above', () => {
        const sample = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const res = statistical.methods.summary(sample);

        assert.equal(res.sum, 193);
        assert.equal(res.median, 6);
        assert.equal(res.mode, 6);
        assert.equal(Math.trunc(res.mean * 100) / 100, 14.84);
        assert.equal(Math.trunc(res.variance * 100) / 100, 238.28);
        assert.equal(Math.trunc(res.stdDeviation * 100) / 100, 15.43);
        assert.deepEqual(res.quantile,  {
            q1: 4,
            q3: 19
        });
    });

    it('should compute the factorial of any number', () => {
        const res = statistical.methods.factorial(5);

        assert.equal(res, 120);
    });

    it('should compute the geometric mean of a sample', () => {
        const sample = [1, 2, 3, 4];
        const res = statistical.methods.geometricMean(sample);

        assert.equal(Math.trunc(res * 100) / 100, 2.21);
    });

    it('should compute the harmonic mean of a sample', () => {
        const sample = [1, 2, 3, 4];
        const res = statistical.methods.harmonicMean(sample);

        assert.equal(Math.trunc(res * 100) / 100, 1.92);
    });

    it('should compute the interquartile range of a sample', () => {
        const sample = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const res = statistical.methods.interQuartileRange(sample);

        assert.equal(res, 15);
    });

    it('should compute the non biased variance of a sample', () => {
        const sample = [1, 2, 3, 4];
        const res = statistical.methods.sampleVariance(sample);

        assert.equal(Math.trunc(res * 100) / 100, 1.66);
    });

    it('should compute the non biased std deviation of a sample', () => {
        const sample = [1, 2, 3, 4];
        const res = statistical.methods.sampleStdDeviation(sample);

        assert.equal(Math.trunc(res * 100) / 100, 1.29);
    });

    it('should compute covariance of two sample', () => {
        const sample1 = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const sample2 = [1, 2, 30, 10, 19, 50, 6, 2, 15, 5, 3, 4, 5];
        const res = statistical.methods.covariance(sample1, sample2);

        assert.equal(Math.trunc(res * 100) / 100, -53.13);
    });

    it('should compute binomial probability distribution', () => {
        const res = statistical.methods.binomial(10, 0.5);

        assert.equal(Object.keys(res).length === 11, true);
        Object.keys(res).forEach(k => {
            assert.equal(res[k] > 0 && res[k] < 1, true);
        });
    });

    it('should return bernoulli probability based on binomial with 1 trials', () => {
        const res = statistical.methods.bernoulli(0.5);

        assert.equal(Object.keys(res).length === 2, true);
        Object.keys(res).forEach(k => {
            assert.equal(res[k], 0.5);
        });
    });

    it('should compute poisson probability distribution', () => {
        const res = statistical.methods.poisson(0.85);

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
        const sample = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const distributionType = statistical.methods.poisson;
        const res = statistical.methods.chiSquaredGoodnessOfFit(sample, distributionType, 0.005);

        assert.deepEqual(res, false);
    });

    it('should return t-value for a t-test with one sample', () => {
        const sample = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const res = statistical.methods.tTestOneSample(sample, 15);

        assert.equal(Math.trunc(res * 100) / 100, -0.03);
    });

    it('should return t-value for a t-test with one sample', () => {
        const sample1 = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const sample2 = [2, 3, 4, 5, 20, 6, 7, 7, 15, 50, 23, 14, 45];
        const res = statistical.methods.tTestTwoSample(sample1, sample2);

        assert.equal(Math.trunc(res * 100) / 100, -0.52);
    });

    it('should return slope and intersect for a linear regression', () => {
        const data = [[1, 2], [0, 1]];
        const res = statistical.methods.linearRegression(data);

        assert.deepEqual(res, { slope: 1, intersect: 1 });
    });
});