'use strict';

const assert = require('chai').assert;
const cacheManager = require('../../src/utils/cacheManager');
const statistical = require('../../src/statistical');

describe('CacheManager', () => {
    beforeEach(() => {
        cacheManager.settings = {
            enabled: true,
            rootElementCount: 10,
            subElementCount: 30
        };
        cacheManager.reset();
    });

    it('should return cache', () => {
        assert.deepEqual(cacheManager.cache, {});
    });

    it('should return settings', () => {
        assert.deepEqual(cacheManager.settings, {
            enabled: true,
            rootElementCount: 10,
            subElementCount: 30
        });
    });

    it('should set settings', () => {
        cacheManager.settings = {
            enabled: false,
            rootElementCount: 20,
            subElementCount: 60
        };

        assert.deepEqual(cacheManager.settings, {
            enabled: false,
            rootElementCount: 20,
            subElementCount: 60
        });
    });

    it('should find result in the cache by the dataSet', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.stdDeviation(dataSet);
        const cache = cacheManager.find('stdDeviation', dataSet);

        assert.equal(cache.dataSet, dataSet);
        assert.equal(cache.result, res);
    });

    it('should update the cache', () => {
        const dataSet = [1, 2, 3, 4];

        cacheManager.update('stdDeviation', {
            dataSet: dataSet,
            result: 1
        });

        const cache = cacheManager.find('stdDeviation', dataSet);

        assert.equal(cache.dataSet, dataSet);
        assert.equal(cache.result, 1);
    });

    it('should reset the cache', () => {
        cacheManager.reset();
        assert.deepEqual(cacheManager.cache, {});
    });
});
