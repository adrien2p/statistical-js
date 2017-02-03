'use strict';

const assert = require('chai').assert;
const statistical = require('../src/statistical');

describe('StatisticalTest', () => {
    it('should return boolean for chiSquaredGoodnessOfFit to valid a hypothesis distribution', () => {
        const dataSet = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];
        const distributionType = statistical.distribution.poisson;
        const res = statistical.test.chiSquaredGoodnessOfFit(dataSet, distributionType, 0.005);

        assert.deepEqual(res, false);
    });
});