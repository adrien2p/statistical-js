'use strict';

import Validator from './validator';

export default class CacheManager {
    constructor() {
        this._validator = new Validator();
        this._cache = {};
        this._settings = {
            enabled: true,
            rootElementCount: 10,
            subElementCount: 30
        };
    }

    /**
     * Return CacheManager settings.
     *
     * @returns {{maxLength: number}|*}
     */
    get settings() {
        return this._settings;
    }

    /**
     * Return the entire cache
     *
     * @returns {{}|*}
     */
    get cache() {
        return this._cache;
    }

    /**
     * Update existing settings to manage cache.
     *
     * @param {*} options
     */
    set settings(options) {
        this._settings = {
            enabled: options.enabled,
            rootElementCount: options.rootElementCount || this._settings.rootElementCount,
            subElementCount: options.subElementCount || this._settings.subElementCount
        };
    }

    /**
     * Update the cache saved with new results.
     *
     * @param {string} method
     * @param {Object} options
     */
    update(method, options) {
        if (Object.keys(this._cache).length >= this._settings.rootElementCount) delete this._cache[Object.keys(this._cache)[0]];
        if (this._cache[method] && this._cache[method].length >= this._settings.subElementCount) this._cache[method].splice(0, 1);

        this._cache[method] = this._cache[method] || [];
        this._cache[method].push({
            date: new Date().getTime(),
            dataSet: options.dataSet,
            result: options.result
        });
    }

    /**
     * Find an existing dataSet in the cache and return it.
     *
     * @param {String} method
     * @param {Array} dataSet
     * @returns {Object}
     */
    find(method, dataSet) {
        const cache = this._cache[method] || [];

        let res = null;
        cache.some(v => {
            if (v.dataSet === dataSet) {
                res = v;
                return true;
            }

            return false;
        });

        return res;
    }

    /**
     * Reset the cache to be empty.
     */
    reset() {
        this._cache = {};
    }
}

export const cacheManager = new CacheManager();
