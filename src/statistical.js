'use strict';

import hook from './utils/hook';
import cacheManager from './utils/cacheManager';
import Validator from './utils/validator';
import StatisticalMethod from './methods/statistical.method';


class Statistical {
    constructor() {
        this._validator = new Validator();
        this._settings = {
            cache: {
                enabled: true,
                rootElementCount: 10,
                subElementCount: 30
            }
        };
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
        this._settings = {
            cache: {
                enabled: options.cache.enabled,
                rootElementCount: options.cache.rootElementCount || this._settings.cache.rootElementCount,
                subElementCount: options.cache.subElementCount || this._settings.cache.subElementCount
            }
        };
        cacheManager.settings = this._settings.cache;
    }

    get methods() {
        return hook.cache(new StatisticalMethod(), cacheManager);
    }
}

const statistical = new Statistical();
export default statistical;
