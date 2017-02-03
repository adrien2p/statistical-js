'use strict';

const assert = require('chai').assert;
const statistical = require('../src/statistical');

describe('StatisticalDistribution', () => {
    it('should compute binomial probability distribution', () => {
        const res = statistical.distribution.binomial(10, 0.5);

        assert.equal(Object.keys(res).length === 11, true);
        Object.keys(res).forEach(k => {
            assert.equal(res[k] > 0 && res[k] < 1, true);
        });
    });

    it('should return bernoulli probability based on binomial with 1 trials', () => {
        const res = statistical.distribution.bernoulli(0.5);

        assert.equal(Object.keys(res).length === 2, true);
        Object.keys(res).forEach(k => {
            assert.equal(res[k], 0.5);
        });
    });

    it('should compute poisson probability distribution', () => {
        const res = statistical.distribution.poisson(0.85);

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
});