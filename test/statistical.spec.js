'use strict';

const assert = require('chai').assert;
const statistical = require('../src/statistical');
const StatisticalBase = require('../src/statistical.base');
const StatisticalDistribution = require('../src/statistical.distribution');

describe('Statistical', () => {
    afterEach(() => {
        statistical.settings = {
            cache: {
                enabled: true,
                rootElementCount: 10,
                subElementCount: 30
            }
        };
    });

    it('should return StatisticalBase instance', () => {
        const obj = statistical.base;

        assert.equal(obj instanceof StatisticalBase, true);
    });

    it('should return StatisticalDistribution instance', () => {
        const obj = statistical.distribution;

        assert.equal(obj instanceof StatisticalDistribution, true);
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
});