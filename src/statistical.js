'use strict';

const interceptor = require('./utils/interceptor');
const cacheManager = require('./utils/cacheManager');
const StatisticalBase = require('./statistical.base');
const StatisticalTest = require('./statistical.test');
const StatisticalDistribution = require('./statistical.distribution');

class Statistical {
    constructor() {
        this._settings = {
            cache: {
                enabled: true,
                rootElementCount: 10,
                subElementCount: 30
            }
        };
        this._base = interceptor.cacheBefore(new StatisticalBase(), cacheManager);
        this._test = interceptor.cacheBefore(new StatisticalTest(), cacheManager);
        this._distribution = interceptor.cacheBefore(new StatisticalDistribution(), cacheManager);
    }

    /**
     * Return _base object to provide basic statistics methods
     *
     * @returns {*}
     */
    get base() {
        return this._base;
    }

    /**
     * Return _distribution object to provide distribution statistics methods
     *
     * @returns {*}
     */
    get distribution() {
        return this._distribution;
    }

    /**
     * Return _test object to provide test statistics methods
     *
     * @returns {*}
     */
    get test() {
        return this._test;
    }

    /**
     * Return settings used in statistical class.
     *
     * @returns {*}
     */
    get settings() {
        return this._settings;
    }

    /**
     * Allow to updates statistical settings.
     *
     * @param {*|object} options
     */
    set settings(options) {
        if (!options && !options.cache) throw new Error('Missing parameter options (Statistical:settings');
        if (isNaN(options.cache.rootElementCount)) throw new Error('rootElementCount must be a number (Statistical:settings');
        if (isNaN(options.cache.subElementCount)) throw new Error('subElementCount must be a number (Statistical:settings');

        this._settings = {
            cache: {
                enabled: options.cache.enabled,
                rootElementCount: options.cache.rootElementCount || 10,
                subElementCount: options.cache.subElementCount || 30
            }
        };
        cacheManager.settings = this._settings.cache;
    }
}

module.exports = new Statistical();
