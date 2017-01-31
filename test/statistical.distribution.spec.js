'use strict';

const assert = require('chai').assert;
const statisticalDistribution = require('../src/statistical').distribution;

describe('StatisticalDistribution', () => {
    it('should return binomial probability result for each value', () => {
        const res = statisticalDistribution.binomial(10, 0.5);

        assert.equal(Object.keys(res).length === 11, true);
        Object.keys(res).forEach(k => {
            assert.equal(res[k] > 0 && res[k] < 1, true);
        });
    });
});