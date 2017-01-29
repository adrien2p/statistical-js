'use strict';

class Interceptor {
    constructor() {}

    /**
     * Create a proxy to wrap a class method and intercept each call.
     *
     * @param {object} object
     * @param {object} cacheManager
     * @param {Array} propertyExcluded
     */
    cacheBefore(object, cacheManager, propertyExcluded) {
        return new Proxy(object, {
            get: (target, propKey) => {
                const isExcluded = propertyExcluded.some(p => propKey.includes(p));

                if (propKey in Object.getPrototypeOf(target) && !isExcluded) {
                    return (...args) => {
                        let res;
                        if (!object._settings.enabled) {
                            const cache = cacheManager.find(propKey, args[0]);
                            if (cache) return cache.result;

                            res = target[propKey](...args);
                            cacheManager.update(propKey, {dataSet: args[0], result: res});
                        } else {
                            res = target[propKey](...args);
                        }

                        return res;
                    };
                } else {
                    return Reflect.get(target, propKey);
                }
            }
        });
    }
}

module.exports = new Interceptor();
