'use strict';

const interceptor = require('./utils/interceptor');
const cacheManager = require('./utils/cacheManager');
const StatisticalMethod = require('./statistical.method');

class Statistical extends StatisticalMethod {
    constructor() {
        super();
        this._settings = {
            cache: {
                enabled: true,
                rootElementCount: 10,
                subElementCount: 30
            }
        };
        return interceptor.cacheBefore(this, cacheManager, [
            /* Excluded from the proxy */
            '_settings',
            'settings',
            'chiSquaredProbTable'
        ]);
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
