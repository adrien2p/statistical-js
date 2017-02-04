'use strict';

const assert = require('chai').assert;
const statistical = require('../../src/statistical');
const StatisticalMethod = require('../../src/statistical.method');

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