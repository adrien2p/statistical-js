'use strict';

export default class Hook {
    constructor() {}

    /**
     * Create a proxy to wrap a class method and intercept each call.
     *
     * @param {object} target
     * @param {object} cacheManager
     */
    cache(target, cacheManager) {
        return new Proxy(target, {
            get: (target, property) => {
                if (property in target && typeof target[property] === 'function') {
                    return (...args) => {
                        let res;
                        if (cacheManager.settings.enabled) {
                            const cache = cacheManager.find(property, args[0]);
                            if (cache) return cache.result;

                            res = target[property](...args);
                            cacheManager.update(property, {dataSet: args[0], result: res});
                        } else {
                            res = target[property](...args);
                        }

                        return res;
                    };
                } else {
                    return Reflect.get(target, property);
                }
            }
        });
    }
}

export const hook = new Hook();