'use strict';

const assert = require('chai').assert;
const cacheManager = require('../src/utils/cacheManager');
const statistical = require('../src/statistical');

describe('CacheManager', () => {
    after(() => {
        cacheManager.settings = {
            rootElementCount: 10,
            subElementCount: 30
        }
    });

    it('should return settings', () => {
       assert.deepEqual(cacheManager.settings, {
           enabled: true,
           rootElementCount: 10,
           subElementCount: 30
       });
    });

    it('should return cache', () => {
        assert.deepEqual(cacheManager.cache, {});
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

    it('should update the cache', () => {
        const dataSet = [1, 2, 3];
        const res = statistical.base.stdDeviation(dataSet);
        const cache = cacheManager.find('stdDeviation', dataSet);

        assert.equal(cache.dataSet, dataSet);
        assert.equal(cache.result, res);
    });
});